import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Database Types
export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  phone?: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

export interface Vendor {
  id: string;
  user_id: string;
  business_name: string;
  business_email: string;
  business_phone: string;
  business_address: string;
  business_description?: string;
  logo_url?: string;
  banner_url?: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  vendor_id: string;
  name: string;
  description: string;
  price: number;
  compare_price?: number;
  category: string;
  brand?: string;
  sku: string;
  stock_quantity: number;
  images: string[];
  is_featured: boolean;
  is_flash_sale: boolean;
  flash_sale_price?: number;
  flash_sale_end?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  vendor?: Vendor;
}

export interface Order {
  id: string;
  user_id: string;
  vendor_id: string;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address: string;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_reference?: string;
  order_items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  product?: Product;
}

export interface AdminSettings {
  id: string;
  admin_password: string;
  site_name: string;
  site_description?: string;
  contact_email: string;
  contact_phone?: string;
  paystack_public_key: string;
  paystack_secret_key: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}