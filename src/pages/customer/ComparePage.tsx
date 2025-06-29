import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  GitCompare, 
  Star, 
  ShoppingCart, 
  X, 
  Check,
  Heart
} from 'lucide-react';
import { useWishlistStore } from '../../store/wishlistStore';
import { useCartStore } from '../../store/cartStore';
import { formatPrice } from '../../utils/helpers';

const ComparePage: React.FC = () => {
  // For demo purposes, we'll use wishlist items as comparison items
  // In a real app, you'd have a separate compare store
  const { items, removeItem } = useWishlistStore();
  const { addItem } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-md p-12">
              <GitCompare className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No products to compare</h2>
              <p className="text-gray-600 mb-8">
                Add products to your wishlist to compare their features and prices.
              </p>
              <Link
                to="/products"
                className="bg-primary-500 text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors font-semibold"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const compareProducts = items.slice(0, 4); // Limit to 4 products for comparison

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-4">Compare Products</h1>
          <p className="text-gray-600">Compare features, prices, and specifications side by side</p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-semibold text-gray-900 w-48">Product</th>
                  {compareProducts.map((product) => (
                    <th key={product.id} className="p-4 min-w-64">
                      <div className="relative">
                        <button
                          onClick={() => removeItem(product.id)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <img
                          src={product.images[0] || 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg'}
                          alt={product.name}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <Link
                          to={`/product/${product.id}`}
                          className="font-semibold text-gray-900 hover:text-primary-500 transition-colors line-clamp-2"
                        >
                          {product.name}
                        </Link>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Price */}
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">Price</td>
                  {compareProducts.map((product) => (
                    <td key={product.id} className="p-4">
                      <div className="space-y-1">
                        {product.is_flash_sale && product.flash_sale_price ? (
                          <>
                            <div className="text-red-600 font-bold text-lg">
                              {formatPrice(product.flash_sale_price)}
                            </div>
                            <div className="text-gray-400 line-through text-sm">
                              {formatPrice(product.price)}
                            </div>
                          </>
                        ) : (
                          <div className="text-gray-900 font-bold text-lg">
                            {formatPrice(product.price)}
                          </div>
                        )}
                        {product.compare_price && (
                          <div className="text-gray-400 line-through text-sm">
                            Was: {formatPrice(product.compare_price)}
                          </div>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Rating */}
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">Rating</td>
                  {compareProducts.map((product) => (
                    <td key={product.id} className="p-4">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                        <span className="text-sm text-gray-500 ml-2">(4.5)</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Category */}
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">Category</td>
                  {compareProducts.map((product) => (
                    <td key={product.id} className="p-4">
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                        {product.category}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Brand */}
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">Brand</td>
                  {compareProducts.map((product) => (
                    <td key={product.id} className="p-4">
                      <span className="text-gray-700">
                        {product.brand || 'N/A'}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Stock */}
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">Availability</td>
                  {compareProducts.map((product) => (
                    <td key={product.id} className="p-4">
                      {product.stock_quantity > 0 ? (
                        <div className="flex items-center space-x-1 text-green-600">
                          <Check className="h-4 w-4" />
                          <span>In Stock ({product.stock_quantity})</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1 text-red-600">
                          <X className="h-4 w-4" />
                          <span>Out of Stock</span>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Features */}
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">Features</td>
                  {compareProducts.map((product) => (
                    <td key={product.id} className="p-4">
                      <div className="space-y-1">
                        {product.is_featured && (
                          <div className="flex items-center space-x-1 text-primary-600">
                            <Check className="h-4 w-4" />
                            <span className="text-sm">Featured Product</span>
                          </div>
                        )}
                        {product.is_flash_sale && (
                          <div className="flex items-center space-x-1 text-red-600">
                            <Check className="h-4 w-4" />
                            <span className="text-sm">Flash Sale</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1 text-gray-600">
                          <Check className="h-4 w-4" />
                          <span className="text-sm">Free Shipping</span>
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Vendor */}
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">Vendor</td>
                  {compareProducts.map((product) => (
                    <td key={product.id} className="p-4">
                      <span className="text-gray-700">
                        {product.vendor?.business_name || 'Shopzero'}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Actions */}
                <tr>
                  <td className="p-4 font-medium text-gray-900">Actions</td>
                  {compareProducts.map((product) => (
                    <td key={product.id} className="p-4">
                      <div className="space-y-2">
                        <button
                          onClick={() => addItem(product)}
                          disabled={product.stock_quantity === 0}
                          className="w-full bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          <span>Add to Cart</span>
                        </button>
                        <Link
                          to={`/product/${product.id}`}
                          className="block w-full bg-gray-100 text-gray-900 text-center px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Comparison Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Comparison Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div className="flex items-start space-x-2">
              <Check className="h-4 w-4 mt-0.5 text-blue-600" />
              <span>Compare similar products for the best value</span>
            </div>
            <div className="flex items-start space-x-2">
              <Check className="h-4 w-4 mt-0.5 text-blue-600" />
              <span>Check vendor ratings and reviews</span>
            </div>
            <div className="flex items-start space-x-2">
              <Check className="h-4 w-4 mt-0.5 text-blue-600" />
              <span>Consider shipping costs and delivery time</span>
            </div>
            <div className="flex items-start space-x-2">
              <Check className="h-4 w-4 mt-0.5 text-blue-600" />
              <span>Look for flash sales and special offers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;