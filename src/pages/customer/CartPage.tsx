import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Minus, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { formatPrice } from '../../utils/helpers';

const CartPage: React.FC = () => {
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    clearCart, 
    getTotalPrice, 
    getShippingFee, 
    getFinalTotal 
  } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-md p-12">
              <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link
                to="/products"
                className="bg-primary-500 text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors font-semibold inline-flex items-center space-x-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-4">Shopping Cart</h1>
          <p className="text-gray-600">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.selectedImage || item.product.images[0] || 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg'}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <Link
                      to={`/product/${item.product.id}`}
                      className="text-lg font-semibold text-gray-900 hover:text-primary-500 transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-gray-600 text-sm mt-1">
                      Category: {item.product.category}
                    </p>
                    {item.product.brand && (
                      <p className="text-gray-600 text-sm">
                        Brand: {item.product.brand}
                      </p>
                    )}
                    
                    <div className="flex items-center space-x-2 mt-2">
                      {item.product.is_flash_sale && item.product.flash_sale_price ? (
                        <>
                          <span className="text-red-600 font-bold text-lg">
                            {formatPrice(item.product.flash_sale_price)}
                          </span>
                          <span className="text-gray-400 line-through text-sm">
                            {formatPrice(item.product.price)}
                          </span>
                        </>
                      ) : (
                        <span className="text-gray-900 font-bold text-lg">
                          {formatPrice(item.product.price)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-2 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                {/* Item Total */}
                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {item.quantity} × {formatPrice(
                      item.product.is_flash_sale && item.product.flash_sale_price
                        ? item.product.flash_sale_price
                        : item.product.price
                    )}
                  </span>
                  <span className="font-bold text-lg">
                    {formatPrice(
                      (item.product.is_flash_sale && item.product.flash_sale_price
                        ? item.product.flash_sale_price
                        : item.product.price) * item.quantity
                    )}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Clear Cart */}
            <div className="flex justify-between items-center pt-4">
              <Link
                to="/products"
                className="text-primary-500 hover:text-primary-600 font-medium flex items-center space-x-1"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Continue Shopping</span>
              </Link>
              
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-600 font-medium"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">{formatPrice(getTotalPrice())}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium">
                    {getShippingFee() === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      formatPrice(getShippingFee())
                    )}
                  </span>
                </div>
                
                {getShippingFee() === 0 && (
                  <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                    🎉 You qualify for free shipping!
                  </div>
                )}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>{formatPrice(getFinalTotal())}</span>
                  </div>
                </div>
              </div>
              
              <Link
                to="/checkout"
                className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors font-semibold text-center block mt-6"
              >
                Proceed to Checkout
              </Link>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  Secure checkout powered by Paystack
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;