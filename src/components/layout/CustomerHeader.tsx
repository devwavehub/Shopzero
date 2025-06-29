import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Menu, 
  X,
  ChevronDown,
  Store,
  Zap
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';

const CustomerHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const { user, signOut } = useAuthStore();
  const { getTotalItems, toggleCart } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const categories = [
    'Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 
    'Health & Beauty', 'Toys', 'Automotive', 'Food & Beverages'
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Banner */}
      <div className="bg-primary-500 text-white py-2">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-medium">
            🎉 Free shipping on orders above ₦50,000 | Zero stress shopping!
          </p>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary-500 text-white p-2 rounded-lg">
              <Store className="h-6 w-6" />
            </div>
            <span className="text-2xl font-heading font-bold text-accent-500">
              Shop<span className="text-primary-500">zero</span>
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="flex w-full">
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-primary-500 text-white px-6 py-2 rounded-r-lg hover:bg-primary-600 transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative hidden md:flex items-center space-x-1 text-gray-700 hover:text-primary-500 transition-colors"
            >
              <Heart className="h-6 w-6" />
              <span className="text-sm">Wishlist</span>
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative flex items-center space-x-1 text-gray-700 hover:text-primary-500 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="hidden md:block text-sm">Cart</span>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* User Account */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-primary-500 transition-colors">
                  <User className="h-6 w-6" />
                  <span className="hidden md:block text-sm">{user.full_name?.split(' ')[0]}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-2">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                      My Profile
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                      My Orders
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                      Settings
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={signOut}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-500 transition-colors"
              >
                <User className="h-6 w-6" />
                <span className="hidden md:block text-sm">Sign In</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4">
          <nav className="hidden md:flex items-center justify-between h-12">
            <div className="flex items-center space-x-8">
              <Link to="/flash-sales" className="flex items-center space-x-1 text-red-600 hover:text-red-700 font-medium">
                <Zap className="h-4 w-4" />
                <span>Flash Sales</span>
              </Link>
              <Link to="/deals-of-the-day" className="text-gray-700 hover:text-primary-500 font-medium">
                Deals of the Day
              </Link>
              
              {/* Categories Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-primary-500 font-medium">
                  <span>Categories</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-2">
                    {categories.map((category) => (
                      <Link
                        key={category}
                        to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link
              to="/sell-on-shopzero"
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors font-medium text-sm"
            >
              Sell on Shopzero
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Search & Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t border-gray-200"
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="bg-primary-500 text-white px-4 py-2 rounded-r-lg"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>

            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              <Link to="/flash-sales" className="flex items-center space-x-2 text-red-600 font-medium py-2">
                <Zap className="h-4 w-4" />
                <span>Flash Sales</span>
              </Link>
              <Link to="/deals-of-the-day" className="block py-2 text-gray-700">
                Deals of the Day
              </Link>
              <Link to="/wishlist" className="block py-2 text-gray-700">
                Wishlist ({wishlistItems.length})
              </Link>
              <Link to="/sell-on-shopzero" className="block py-2 text-indigo-600 font-medium">
                Sell on Shopzero
              </Link>
            </div>

            {/* Mobile Categories */}
            <div className="border-t pt-4">
              <h3 className="font-medium text-gray-900 mb-2">Categories</h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm text-gray-600 py-1"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default CustomerHeader;