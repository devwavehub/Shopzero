import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Store, 
  Menu, 
  X, 
  ChevronDown,
  User,
  ShoppingBag,
  Shield,
  ArrowUp
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const StaticHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();
  const { user } = useAuthStore();

  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
  ];

  const authLinks = [
    { name: 'Terms', href: '/terms' },
    { name: 'Privacy', href: '/privacy' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-50">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-2">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm font-medium">
              🎉 Welcome to Shopzero - Your Zero Stress Shopping Destination!
            </p>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-2 group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="bg-primary-500 text-white p-2 rounded-lg group-hover:bg-primary-600 transition-colors">
                <Store className="h-6 w-6" />
              </div>
              <span className="text-2xl font-heading font-bold text-accent-500">
                Shop<span className="text-primary-500">zero</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors relative group ${
                    isActive(item.href)
                      ? 'text-primary-500'
                      : 'text-gray-700 hover:text-primary-500'
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full ${
                    isActive(item.href) ? 'w-full' : ''
                  }`} />
                </Link>
              ))}
              
              {/* More Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-primary-500 font-medium text-sm">
                  <span>More</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-2">
                    {authLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                      >
                        {link.name}
                      </Link>
                    ))}
                    <Link
                      to="/newsletter"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                    >
                      Newsletter
                    </Link>
                    <Link
                      to="/app-download"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                    >
                      Mobile App
                    </Link>
                  </div>
                </div>
              </div>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* User Actions */}
              {user ? (
                <div className="hidden md:flex items-center space-x-4">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-500 transition-colors"
                  >
                    <User className="h-5 w-5" />
                    <span className="text-sm">Profile</span>
                  </Link>
                  <Link
                    to="/cart"
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-500 transition-colors"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    <span className="text-sm">Cart</span>
                  </Link>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-primary-500 transition-colors font-medium text-sm"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors font-medium text-sm"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Admin Link (Hidden) */}
              <Link
                to="/admin"
                className="hidden text-gray-400 hover:text-red-500 transition-colors"
                title="Admin Access"
              >
                <Shield className="h-5 w-5" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-gray-700 hover:text-primary-500 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="container mx-auto px-4 py-4 space-y-4">
                {/* Mobile Navigation Links */}
                <div className="space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`block py-2 px-4 rounded-lg transition-colors ${
                        isActive(item.href)
                          ? 'bg-primary-50 text-primary-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Mobile Auth Links */}
                <div className="border-t pt-4 space-y-2">
                  {authLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="block py-2 px-4 text-gray-600 hover:bg-gray-50 rounded-lg"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link
                    to="/newsletter"
                    className="block py-2 px-4 text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    Newsletter
                  </Link>
                  <Link
                    to="/app-download"
                    className="block py-2 px-4 text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    Mobile App
                  </Link>
                </div>

                {/* Mobile User Actions */}
                <div className="border-t pt-4">
                  {user ? (
                    <div className="space-y-2">
                      <Link
                        to="/profile"
                        className="flex items-center space-x-2 py-2 px-4 text-gray-700 hover:bg-gray-50 rounded-lg"
                      >
                        <User className="h-5 w-5" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/cart"
                        className="flex items-center space-x-2 py-2 px-4 text-gray-700 hover:bg-gray-50 rounded-lg"
                      >
                        <ShoppingBag className="h-5 w-5" />
                        <span>Cart</span>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        to="/login"
                        className="block py-2 px-4 text-center border border-primary-500 text-primary-500 rounded-lg hover:bg-primary-50 transition-colors"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/signup"
                        className="block py-2 px-4 text-center bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-primary-500 text-white p-3 rounded-full shadow-lg hover:bg-primary-600 transition-colors z-40"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default StaticHeader;