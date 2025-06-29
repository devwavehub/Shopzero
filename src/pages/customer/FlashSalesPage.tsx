import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Star, 
  Heart, 
  ShoppingCart,
  Clock,
  Grid,
  List
} from 'lucide-react';
import { supabase, Product } from '../../lib/supabase';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { formatPrice, getTimeRemaining } from '../../utils/helpers';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const FlashSalesPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('ending_soon');

  const { addItem } = useCartStore();
  const { addItem: addToWishlist, isInWishlist } = useWishlistStore();

  useEffect(() => {
    loadFlashSaleProducts();
  }, [sortBy]);

  const loadFlashSaleProducts = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('products')
        .select(`
          *,
          vendor:vendors(business_name, logo_url)
        `)
        .eq('is_active', true)
        .eq('is_flash_sale', true)
        .gte('flash_sale_end', new Date().toISOString());

      // Apply sorting
      switch (sortBy) {
        case 'ending_soon':
          query = query.order('flash_sale_end', { ascending: true });
          break;
        case 'discount_high':
          query = query.order('price', { ascending: false });
          break;
        case 'price_low':
          query = query.order('flash_sale_price', { ascending: true });
          break;
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
      }

      const { data, error } = await query;
      if (error) throw error;

      setProducts(data || []);
    } catch (error) {
      console.error('Error loading flash sale products:', error);
    } finally {
      setLoading(false);
    }
  };

  const CountdownTimer: React.FC<{ endDate: string }> = ({ endDate }) => {
    const [timeLeft, setTimeLeft] = useState(getTimeRemaining(endDate));

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(getTimeRemaining(endDate));
      }, 1000);

      return () => clearInterval(timer);
    }, [endDate]);

    if (timeLeft.total <= 0) {
      return <span className="text-red-600 font-semibold">Expired</span>;
    }

    return (
      <div className="flex items-center space-x-1 text-red-600 font-semibold">
        <Clock className="h-4 w-4" />
        <span>
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </span>
      </div>
    );
  };

  const ProductCard: React.FC<{ product: Product; index: number }> = ({ product, index }) => {
    const discountPercentage = product.flash_sale_price 
      ? Math.round(((product.price - product.flash_sale_price) / product.price) * 100)
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
          
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
            <Zap className="h-3 w-3" />
            <span>{discountPercentage}% OFF</span>
          </div>
          
          <button
            onClick={() => addToWishlist(product)}
            className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
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
            <span className="text-red-600 font-bold text-xl">
              {formatPrice(product.flash_sale_price!)}
            </span>
            <span className="text-gray-400 line-through">
              {formatPrice(product.price)}
            </span>
          </div>
          
          <div className="mb-3">
            {product.flash_sale_end && (
              <CountdownTimer endDate={product.flash_sale_end} />
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
            className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-1"
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
            <div className="bg-red-500 p-3 rounded-lg">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-heading font-bold text-gray-900">Flash Sales</h1>
          </div>
          <p className="text-xl text-gray-600 mb-6">
            Limited time offers with incredible discounts - Don't miss out!
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-red-800 font-semibold">
              ⚡ Flash sales are time-limited! Grab these deals before they expire.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="ending_soon">Ending Soon</option>
                <option value="discount_high">Highest Discount</option>
                <option value="price_low">Lowest Price</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                {products.length} flash deals available
              </span>
              
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-red-500 text-white' : 'bg-white text-gray-600'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-red-500 text-white' : 'bg-white text-gray-600'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Flash Sale Products */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <Zap className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No flash sales available</h3>
            <p className="text-gray-600 mb-6">Check back later for amazing flash deals!</p>
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

        {/* Flash Sale Info */}
        <div className="mt-16 bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">How Flash Sales Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Limited Time</h3>
              <p className="text-sm opacity-90">Flash sales run for a limited time only</p>
            </div>
            <div>
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Big Discounts</h3>
              <p className="text-sm opacity-90">Enjoy massive savings on selected products</p>
            </div>
            <div>
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShoppingCart className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Quick Checkout</h3>
              <p className="text-sm opacity-90">Fast and secure checkout process</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSalesPage;