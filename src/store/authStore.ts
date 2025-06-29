import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase, User, Vendor } from '../lib/supabase';
import toast from 'react-hot-toast';

interface AuthState {
  user: User | null;
  vendor: Vendor | null;
  isAdmin: boolean;
  loading: boolean;
  initialized: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signInWithGoogle: () => Promise<boolean>;
  signInWithFacebook: () => Promise<boolean>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (password: string) => Promise<boolean>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  becomeVendor: (vendorData: Omit<Vendor, 'id' | 'user_id' | 'is_approved' | 'created_at' | 'updated_at'>) => Promise<boolean>;
  adminLogin: (password: string) => Promise<boolean>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      vendor: null,
      isAdmin: false,
      loading: false,
      initialized: false,

      signUp: async (email: string, password: string, fullName: string) => {
        set({ loading: true });
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: fullName,
              },
            },
          });

          if (error) throw error;

          if (data.user) {
            // Create user profile
            const { error: profileError } = await supabase
              .from('users')
              .insert({
                id: data.user.id,
                email: data.user.email!,
                full_name: fullName,
              });

            if (profileError) throw profileError;

            toast.success('Account created successfully!');
            return true;
          }
          return false;
        } catch (error: any) {
          toast.error(error.message || 'Failed to create account');
          return false;
        } finally {
          set({ loading: false });
        }
      },

      signIn: async (email: string, password: string) => {
        set({ loading: true });
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) throw error;

          if (data.user) {
            await get().loadUserProfile(data.user.id);
            toast.success('Welcome back!');
            return true;
          }
          return false;
        } catch (error: any) {
          toast.error(error.message || 'Failed to sign in');
          return false;
        } finally {
          set({ loading: false });
        }
      },

      signInWithGoogle: async () => {
        set({ loading: true });
        try {
          const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: `${window.location.origin}/`,
            },
          });

          if (error) throw error;
          return true;
        } catch (error: any) {
          toast.error(error.message || 'Failed to sign in with Google');
          return false;
        } finally {
          set({ loading: false });
        }
      },

      signInWithFacebook: async () => {
        set({ loading: true });
        try {
          const { error } = await supabase.auth.signInWithOAuth({
            provider: 'facebook',
            options: {
              redirectTo: `${window.location.origin}/`,
            },
          });

          if (error) throw error;
          return true;
        } catch (error: any) {
          toast.error(error.message || 'Failed to sign in with Facebook');
          return false;
        } finally {
          set({ loading: false });
        }
      },

      signOut: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
          toast.error('Failed to sign out');
        } else {
          set({ user: null, vendor: null, isAdmin: false });
          toast.success('Signed out successfully');
        }
      },

      forgotPassword: async (email: string) => {
        try {
          const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
          });

          if (error) throw error;

          toast.success('Password reset link sent to your email');
          return true;
        } catch (error: any) {
          toast.error(error.message || 'Failed to send reset email');
          return false;
        }
      },

      resetPassword: async (password: string) => {
        try {
          const { error } = await supabase.auth.updateUser({
            password,
          });

          if (error) throw error;

          toast.success('Password updated successfully');
          return true;
        } catch (error: any) {
          toast.error(error.message || 'Failed to update password');
          return false;
        }
      },

      updateProfile: async (data: Partial<User>) => {
        const { user } = get();
        if (!user) return false;

        try {
          const { error } = await supabase
            .from('users')
            .update(data)
            .eq('id', user.id);

          if (error) throw error;

          set({
            user: { ...user, ...data },
          });

          toast.success('Profile updated successfully');
          return true;
        } catch (error: any) {
          toast.error(error.message || 'Failed to update profile');
          return false;
        }
      },

      becomeVendor: async (vendorData) => {
        const { user } = get();
        if (!user) return false;

        try {
          const { data, error } = await supabase
            .from('vendors')
            .insert({
              ...vendorData,
              user_id: user.id,
            })
            .select()
            .single();

          if (error) throw error;

          set({ vendor: data });
          toast.success('Vendor application submitted! Awaiting approval.');
          return true;
        } catch (error: any) {
          toast.error(error.message || 'Failed to submit vendor application');
          return false;
        }
      },

      adminLogin: async (password: string) => {
        try {
          const { data, error } = await supabase
            .from('admin_settings')
            .select('admin_password')
            .single();

          if (error) throw error;

          if (data.admin_password === password) {
            set({ isAdmin: true });
            toast.success('Admin login successful');
            return true;
          } else {
            toast.error('Invalid admin password');
            return false;
          }
        } catch (error: any) {
          toast.error('Failed to verify admin credentials');
          return false;
        }
      },

      loadUserProfile: async (userId: string) => {
        try {
          // Load user profile
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

          if (userError) throw userError;

          // Load vendor profile if exists
          const { data: vendorData } = await supabase
            .from('vendors')
            .select('*')
            .eq('user_id', userId)
            .single();

          set({
            user: userData,
            vendor: vendorData || null,
          });
        } catch (error) {
          console.error('Failed to load user profile:', error);
        }
      },

      initialize: async () => {
        if (get().initialized) return;

        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          await get().loadUserProfile(session.user.id);
        }

        // Listen for auth changes
        supabase.auth.onAuthStateChange(async (event, session) => {
          if (event === 'SIGNED_IN' && session?.user) {
            await get().loadUserProfile(session.user.id);
          } else if (event === 'SIGNED_OUT') {
            set({ user: null, vendor: null, isAdmin: false });
          }
        });

        set({ initialized: true });
      },
    }),
    {
      name: 'shopzero-auth',
      partialize: (state) => ({
        isAdmin: state.isAdmin,
      }),
    }
  )
);