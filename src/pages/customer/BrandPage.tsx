import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Star, 
  Heart, 
  ShoppingCart,
  Grid,
  List,
  Award,
  Users,
  Package
} from 'lucide-react';
import { supabase, Product } from '../../lib/supabase';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { formatPrice } from '../../utils/helpers';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const BrandPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');

  const { addItem } = useCartStore();
  const { addItem: addToWishlist, isInWishlist } = useWishlistStore();

  const brandName = slug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';

  useEffect(() => {
    if (slug) {
      loadBrandProducts();
    }
  }, [slug, sortBy]);

  const loadBrandProducts = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('products')
        .select(`
          *,
          vendor:vendors(business_name, logo_url)
        `)
        .eq('is_active', true)
        .eq('brand', brandName);

      // Apply sorting
      switch (sortBy) {
        case 'price_low':
          query = query.order('price', { ascending: true });
          break;
        case 'price_high':
          query = query.order('price', { ascending: false });
          break;
        case 'name':
          query = query.order('name', { ascending: true });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;
      if (error) throw error;

      setProducts(data || []);
    } catch (error) {
      console.error('Error loading brand products:', error);
    } finally {
      setLoading(false);
    }
  };

  const ProductCard: React.FC<{ product: Product; index: number }> = ({ product, index }) => (
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
          onClick={() => addToWishlist(product)}
          className={`absolute ${viewMode === 'list' ? 'bottom-3 right-3' : 'top-3 right-3'} p-2 rounded-full transition-colors ${
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
          {product.is_flash_sale && product.flash_sale_price ? (
            <>
              <span className="text-red-600 font-bold text-xl">
                {formatPrice(product.flash_sale_price)}
              </span>
              <span className="text-gray-400 line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-gray-900 font-bold text-xl">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
            ))}
            <span className="text-sm text-gray-500 ml-1">(4.5)</span>
          </div>
          <button
            onClick={() => addItem(product)}
            className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-1"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add</span>
          </button>
        </div>
        
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link to="/" className="text-gray-500 hover:text-primary-500">Home</Link></li>
            <li><span className="text-gray-400">/</span></li>
            <li><Link to="/products" className="text-gray-500 hover:text-primary-500">Products</Link></li>
            <li><span className="text-gray-400">/</span></li>
            <li className="text-gray-900 font-medium">Brand: {brandName}</li>
          </ol>
        </nav>

        {/* Brand Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center space-x-6">
            <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center">
              <Award className="h-10 w-10 text-primary-500" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">{brandName}</h1>
              <p className="text-gray-600 mb-4">
                Discover premium {brandName} products from verified vendors on Shopzero
              </p>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Package className="h-4 w-4" />
                  <span>{products.length} Products</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>Multiple Vendors</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span>4.8 Average Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="newest">Newest First</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                {products.length} products found
              </span>
              
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'bg-white text-gray-600'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'bg-white text-gray-600'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No {brandName} products found</h3>
            <p className="text-gray-600">Check back later for new {brandName} products</p>
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
      </div>
    </div>
  );
};

export default BrandPage;