import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Search, 
  ShoppingBag, 
  ArrowLeft, 
  Package,
  Store,
  HelpCircle,
  RefreshCw
} from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const quickLinks = [
    {
      icon: Home,
      title: 'Go Home',
      description: 'Return to our homepage',
      href: '/',
      color: 'bg-primary-500 hover:bg-primary-600'
    },
    {
      icon: ShoppingBag,
      title: 'Browse Products',
      description: 'Explore our product catalog',
      href: '/products',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: Search,
      title: 'Search',
      description: 'Find what you\'re looking for',
      href: '/search',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: HelpCircle,
      title: 'Get Help',
      description: 'Contact our support team',
      href: '/contact',
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  const popularCategories = [
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Sports',
    'Health & Beauty'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center">
        {/* 404 Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="relative">
            {/* Large 404 Text */}
            <h1 className="text-9xl md:text-[12rem] font-bold text-gray-200 select-none">
              404
            </h1>
            
            {/* Floating Icons */}
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2"
            >
              <div className="bg-primary-500 p-4 rounded-full shadow-lg">
                <Package className="h-8 w-8 text-white" />
              </div>
            </motion.div>
            
            <motion.div
              animate={{ 
                y: [0, 15, 0],
                rotate: [0, -10, 10, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2"
            >
              <div className="bg-red-500 p-3 rounded-full shadow-lg">
                <Search className="h-6 w-6 text-white" />
              </div>
            </motion.div>
            
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 15, -15, 0]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 translate-y-1/2"
            >
              <div className="bg-yellow-500 p-3 rounded-full shadow-lg">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-2">
            The page you're looking for seems to have wandered off.
          </p>
          <p className="text-lg text-gray-500">
            Don't worry, even the best explorers get lost sometimes!
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {quickLinks.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={link.href}
                className={`${link.color} text-white p-6 rounded-lg shadow-lg transition-all duration-300 block group`}
              >
                <link.icon className="h-8 w-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-lg mb-1">{link.title}</h3>
                <p className="text-sm opacity-90">{link.description}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Or try these popular categories
          </h3>
          
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {popularCategories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + index * 0.1 }}
              >
                <Link
                  to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-gray-100 hover:bg-primary-50 hover:text-primary-600 text-gray-700 px-4 py-2 rounded-full transition-colors font-medium"
                >
                  {category}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg transition-colors font-medium"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Go Back</span>
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Refresh Page</span>
            </button>
          </div>
        </motion.div>

        {/* Shopzero Branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="flex items-center justify-center space-x-2 text-gray-500"
        >
          <div className="bg-primary-500 text-white p-2 rounded-lg">
            <Store className="h-5 w-5" />
          </div>
          <span className="text-lg font-heading font-bold">
            Shop<span className="text-primary-500">zero</span>
          </span>
          <span className="text-sm">- Zero Stress Shopping</span>
        </motion.div>

        {/* Fun Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-400 italic">
            "Not all who wander are lost, but this page definitely is!" 🧭
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;