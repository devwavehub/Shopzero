import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../lib/supabase';
import toast from 'react-hot-toast';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedImage?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getShippingFee: () => number;
  getFinalTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: Product, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find(item => item.product.id === product.id);

        if (existingItem) {
          const newQuantity = existingItem.quantity + quantity;
          if (newQuantity <= product.stock_quantity) {
            set({
              items: items.map(item =>
                item.product.id === product.id
                  ? { ...item, quantity: newQuantity }
                  : item
              ),
            });
            toast.success('Item quantity updated in cart');
          } else {
            toast.error('Not enough stock available');
          }
        } else {
          if (quantity <= product.stock_quantity) {
            set({
              items: [...items, { product, quantity, selectedImage: product.images[0] }],
            });
            toast.success('Item added to cart');
          } else {
            toast.error('Not enough stock available');
          }
        }
      },

      removeItem: (productId: string) => {
        set({
          items: get().items.filter(item => item.product.id !== productId),
        });
        toast.success('Item removed from cart');
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        const items = get().items;
        const item = items.find(item => item.product.id === productId);
        
        if (item && quantity <= item.product.stock_quantity) {
          set({
            items: items.map(item =>
              item.product.id === productId
                ? { ...item, quantity }
                : item
            ),
          });
        } else {
          toast.error('Not enough stock available');
        }
      },

      clearCart: () => {
        set({ items: [] });
        toast.success('Cart cleared');
      },

      toggleCart: () => {
        set({ isOpen: !get().isOpen });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.is_flash_sale && item.product.flash_sale_price
            ? item.product.flash_sale_price
            : item.product.price;
          return total + (price * item.quantity);
        }, 0);
      },

      getShippingFee: () => {
        const totalPrice = get().getTotalPrice();
        return totalPrice > 50000 ? 0 : 2500; // Free shipping above ₦50,000
      },

      getFinalTotal: () => {
        return get().getTotalPrice() + get().getShippingFee();
      },
    }),
    {
      name: 'shopzero-cart',
    }
  )
);