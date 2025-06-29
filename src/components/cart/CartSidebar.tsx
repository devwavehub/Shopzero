import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { formatPrice } from '../../utils/helpers';

const CartSidebar: React.FC = () => {
  const { 
    items, 
    isOpen, 
    toggleCart, 
    updateQuantity, 
    removeItem, 
    getTotalPrice, 
    getShippingFee, 
    getFinalTotal 
  } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Shopping Cart ({items.length})</h2>
              <button
                onClick={toggleCart}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-6">Start shopping to add items to your cart</p>
                  <Link
                    to="/products"
                    onClick={toggleCart}
                    className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                      <img
                        src={item.selectedImage || item.product.images[0] || 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg'}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{item.product.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          {item.product.is_flash_sale && item.product.flash_sale_price ? (
                            <>
                              <span className="text-red-600 font-semibold text-sm">
                                {formatPrice(item.product.flash_sale_price)}
                              </span>
                              <span className="text-gray-400 line-through text-xs">
                                {formatPrice(item.product.price)}
                              </span>
                            </>
                          ) : (
                            <span className="text-gray-900 font-semibold text-sm">
                              {formatPrice(item.product.price)}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t p-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping:</span>
                    <span>{getShippingFee() === 0 ? 'Free' : formatPrice(getShippingFee())}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>{formatPrice(getFinalTotal())}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link
                    to="/cart"
                    onClick={toggleCart}
                    className="block w-full bg-gray-100 text-gray-900 text-center py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    View Cart
                  </Link>
                  <Link
                    to="/checkout"
                    onClick={toggleCart}
                    className="block w-full bg-primary-500 text-white text-center py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;