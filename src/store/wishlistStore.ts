import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../lib/supabase';
import toast from 'react-hot-toast';

interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product) => {
        const items = get().items;
        const exists = items.find(item => item.id === product.id);

        if (!exists) {
          set({
            items: [...items, product],
          });
          toast.success('Added to wishlist');
        } else {
          toast.error('Item already in wishlist');
        }
      },

      removeItem: (productId: string) => {
        set({
          items: get().items.filter(item => item.id !== productId),
        });
        toast.success('Removed from wishlist');
      },

      isInWishlist: (productId: string) => {
        return get().items.some(item => item.id === productId);
      },

      clearWishlist: () => {
        set({ items: [] });
        toast.success('Wishlist cleared');
      },
    }),
    {
      name: 'shopzero-wishlist',
    }
  )
);