import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react';
import { useWishlistStore } from '../../store/wishlistStore';
import { useCartStore } from '../../store/cartStore';
import { formatPrice } from '../../utils/helpers';

const WishlistPage: React.FC = () => {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-md p-12">
              <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-8">
                Save items you love to your wishlist and shop them later.
              </p>
              <Link
                to="/products"
                className="bg-primary-500 text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors font-semibold"
              >
                Start Shopping
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">My Wishlist</h1>
            <p className="text-gray-600">{items.length} item{items.length !== 1 ? 's' : ''} saved</p>
          </div>
          
          {items.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-red-500 hover:text-red-600 font-medium"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="relative">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.images[0] || 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg'}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                
                {product.is_featured && (
                  <div className="absolute top-3 left-3 bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    FEATURED
                  </div>
                )}
                
                {product.is_flash_sale && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    FLASH SALE
                  </div>
                )}
                
                <button
                  onClick={() => removeItem(product.id)}
                  className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              <div className="p-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary-500 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                
                <div className="flex items-center space-x-2 mb-3">
                  {product.is_flash_sale && product.flash_sale_price ? (
                    <>
                      <span className="text-red-600 font-bold text-xl">
                        {formatPrice(product.flash_sale_price)}
                      </span>
                      <span className="text-gray-400 line-through">
                        {formatPrice(product.price)}
                      </span>
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">
                        {Math.round(((product.price - product.flash_sale_price) / product.price) * 100)}% OFF
                      </span>
                    </>
                  ) : (
                    <span className="text-gray-900 font-bold text-xl">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-sm text-gray-500 ml-1">(4.5)</span>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => addItem(product)}
                    className="flex-1 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center space-x-1"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </button>
                  
                  <button
                    onClick={() => removeItem(product.id)}
                    className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
                
                {product.stock_quantity < 10 && product.stock_quantity > 0 && (
                  <p className="text-orange-600 text-sm mt-2">
                    Only {product.stock_quantity} left in stock!
                  </p>
                )}
                
                {product.stock_quantity === 0 && (
                  <p className="text-red-600 text-sm mt-2 font-medium">
                    Out of stock
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;