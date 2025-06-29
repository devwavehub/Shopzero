import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  Star, 
  Heart, 
  ShoppingCart,
  Filter,
  Grid,
  List,
  X
} from 'lucide-react';
import { supabase, Product } from '../../lib/supabase';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { formatPrice } from '../../utils/helpers';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    brand: '',
  });

  const { addItem } = useCartStore();
  const { addItem: addToWishlist, isInWishlist } = useWishlistStore();

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [searchParams]);

  const performSearch = async (query: string) => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      let supabaseQuery = supabase
        .from('products')
        .select(`
          *,
          vendor:vendors(business_name, logo_url)
        `)
        .eq('is_active', true)
        .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%,brand.ilike.%${query}%`);

      // Apply filters
      if (filters.category) {
        supabaseQuery = supabaseQuery.eq('category', filters.category);
      }
      if (filters.brand) {
        supabaseQuery = supabaseQuery.eq('brand', filters.brand);
      }
      if (filters.minPrice) {
        supabaseQuery = supabaseQuery.gte('price', parseFloat(filters.minPrice));
      }
      if (filters.maxPrice) {
        supabaseQuery = supabaseQuery.lte('price', parseFloat(filters.maxPrice));
      }

      // Apply sorting
      switch (sortBy) {
        case 'price_low':
          supabaseQuery = supabaseQuery.order('price', { ascending: true });
          break;
        case 'price_high':
          supabaseQuery = supabaseQuery.order('price', { ascending: false });
          break;
        case 'name':
          supabaseQuery = supabaseQuery.order('name', { ascending: true });
          break;
        case 'newest':
          supabaseQuery = supabaseQuery.order('created_at', { ascending: false });
          break;
        default:
          // Relevance - prioritize exact matches in name, then description
          supabaseQuery = supabaseQuery.order('created_at', { ascending: false });
      }

      const { data, error } = await supabaseQuery;
      if (error) throw error;

      setProducts(data || []);
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
      performSearch(searchQuery.trim());
    }
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      brand: '',
    });
    if (searchQuery) {
      performSearch(searchQuery);
    }
  };

  const categories = [
    'Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 
    'Health & Beauty', 'Toys', 'Automotive', 'Food & Beverages'
  ];

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
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-4">Search Products</h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for products, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button
              type="submit"
              className="bg-primary-500 text-white px-8 py-3 rounded-r-lg hover:bg-primary-600 transition-colors font-semibold"
            >
              Search
            </button>
          </form>

          {searchParams.get('q') && (
            <p className="text-gray-600">
              Search results for: <span className="font-semibold">"{searchParams.get('q')}"</span>
            </p>
          )}
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
            <select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Brand"
              value={filters.brand}
              onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />

            <input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />

            <input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />

            <button
              onClick={clearFilters}
              className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <X className="h-4 w-4" />
              <span>Clear</span>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="relevance">Most Relevant</option>
                <option value="newest">Newest First</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>

              <button
                onClick={() => searchQuery && performSearch(searchQuery)}
                className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
              >
                Apply Filters
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                {products.length} results found
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

        {/* Search Results */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : !searchParams.get('q') ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Start your search</h3>
            <p className="text-gray-600">Enter keywords to find products you're looking for</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">Try different keywords or adjust your filters</p>
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

export default SearchPage;