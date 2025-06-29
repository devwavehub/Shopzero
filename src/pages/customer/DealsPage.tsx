import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Gift, 
  Star, 
  Heart, 
  ShoppingCart,
  TrendingDown,
  Grid,
  List,
  Calendar
} from 'lucide-react';
import { supabase, Product } from '../../lib/supabase';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { formatPrice } from '../../utils/helpers';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const DealsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('discount_high');

  const { addItem } = useCartStore();
  const { addItem: addToWishlist, isInWishlist } = useWishlistStore();

  useEffect(() => {
    loadDealsProducts();
  }, [sortBy]);

  const loadDealsProducts = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('products')
        .select(`
          *,
          vendor:vendors(business_name, logo_url)
        `)
        .eq('is_active', true)
        .not('compare_price', 'is', null);

      // Apply sorting
      switch (sortBy) {
        case 'discount_high':
          query = query.order('price', { ascending: false });
          break;
        case 'price_low':
          query = query.order('price', { ascending: true });
          break;
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        case 'popular':
          query = query.order('created_at', { ascending: false }); // Could be based on sales
          break;
      }

      const { data, error } = await query;
      if (error) throw error;

      // Filter products that have actual discounts
      const dealsData = data?.filter(product => 
        product.compare_price && product.compare_price > product.price
      ) || [];

      setProducts(dealsData);
    } catch (error) {
      console.error('Error loading deals products:', error);
    } finally {
      setLoading(false);
    }
  };

  const ProductCard: React.FC<{ product: Product; index: number }> = ({ product, index }) => {
    const discountPercentage = product.compare_price 
      ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
      : 0;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group ${
          viewMode === 'list' ? 'flex' : ''
        }`}
      >
        <div className={`relative ${viewMode === 'list' ? 'w-48' : ''}`}>
          <Link to={`/product/${product.id}`}>
            <img
              src={product.images[0] || 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg'}
              alt={product.name}
              className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                viewMode === 'list' ? 'w-48 h-32' : 'w-full h-48'
              }`}
            />
          </Link>
          
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
            <TrendingDown className="h-3 w-3" />
            <span>{discountPercentage}% OFF</span>
          </div>
          
          {product.is_featured && (
            <div className="absolute top-3 right-3 bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              FEATURED
            </div>
          )}
          
          <button
            onClick={() => addToWishlist(product)}
            className={`absolute ${product.is_featured ? 'top-12 right-3' : 'top-3 right-3'} p-2 rounded-full transition-colors ${
              isInWishlist(product.id)
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-600 hover:text-red-500'
            }`}
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>
        
        <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary-500 transition-colors">
              {product.name}
            </h3>
          </Link>
          
          {viewMode === 'list' && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
          )}
          
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-green-600 font-bold text-xl">
              {formatPrice(product.price)}
            </span>
            {product.compare_price && (
              <span className="text-gray-400 line-through">
                {formatPrice(product.compare_price)}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
              <span className="text-sm text-gray-500 ml-1">(4.5)</span>
            </div>
          </div>
          
          <button
            onClick={() => addItem(product)}
            className="w-full bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center space-x-1"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
          
          {product.vendor && (
            <div className="mt-3 pt-3 border-t">
              <p className="text-sm text-gray-500">
                by <span className="font-medium">{product.vendor.business_name}</span>
              </p>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-green-500 p-3 rounded-lg">
              <Gift className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-heading font-bold text-gray-900">Deals of the Day</h1>
          </div>
          <p className="text-xl text-gray-600 mb-6">
            Amazing daily deals with unbeatable prices - Updated every 24 hours!
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-green-800">
              <Calendar className="h-5 w-5" />
              <p className="font-semibold">
                Today's deals expire at midnight - Don't wait!
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="discount_high">Highest Discount</option>
                <option value="price_low">Lowest Price</option>
                <option value="newest">Newest Deals</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                {products.length} deals available today
              </span>
              
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-green-500 text-white' : 'bg-white text-gray-600'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-green-500 text-white' : 'bg-white text-gray-600'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Deal Products */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <Gift className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No deals available today</h3>
            <p className="text-gray-600 mb-6">Check back tomorrow for new amazing deals!</p>
            <Link
              to="/products"
              className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
              : 'space-y-6'
          }`}>
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}

        {/* Deal Categories */}
        <div className="mt-16">
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-8 text-center">
            Popular Deal Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Electronics', icon: '📱', color: 'bg-blue-500' },
              { name: 'Fashion', icon: '👕', color: 'bg-pink-500' },
              { name: 'Home & Garden', icon: '🏠', color: 'bg-green-500' },
              { name: 'Sports', icon: '⚽', color: 'bg-orange-500' },
            ].map((category) => (
              <Link
                key={category.name}
                to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl`}>
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-500">Great deals available</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Deal Info */}
        <div className="mt-16 bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">How Daily Deals Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Daily Updates</h3>
              <p className="text-sm opacity-90">New deals added every day at midnight</p>
            </div>
            <div>
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingDown className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Best Prices</h3>
              <p className="text-sm opacity-90">Guaranteed lowest prices on selected items</p>
            </div>
            <div>
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Gift className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Quality Products</h3>
              <p className="text-sm opacity-90">All deals feature high-quality verified products</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsPage;