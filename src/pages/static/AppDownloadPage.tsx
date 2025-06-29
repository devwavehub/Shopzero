import React from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Download, 
  Star, 
  Shield, 
  Zap, 
  Bell,
  ShoppingCart,
  Heart,
  Search,
  User
} from 'lucide-react';

const AppDownloadPage: React.FC = () => {
  const features = [
    {
      icon: ShoppingCart,
      title: 'Easy Shopping',
      description: 'Browse and buy products with just a few taps'
    },
    {
      icon: Bell,
      title: 'Push Notifications',
      description: 'Get instant alerts for deals and order updates'
    },
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Find exactly what you need with our advanced search'
    },
    {
      icon: Heart,
      title: 'Wishlist Sync',
      description: 'Save items across all your devices seamlessly'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Safe and encrypted payment processing'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for speed and smooth performance'
    }
  ];

  const screenshots = [
    {
      title: 'Home Screen',
      image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg'
    },
    {
      title: 'Product Details',
      image: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg'
    },
    {
      title: 'Shopping Cart',
      image: 'https://images.pexels.com/photos/4065864/pexels-photo-4065864.jpeg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-white text-primary-500 p-3 rounded-lg">
                    <Smartphone className="h-8 w-8" />
                  </div>
                  <span className="text-2xl font-heading font-bold">Shopzero Mobile</span>
                </div>
                
                <h1 className="text-5xl font-heading font-bold mb-6">
                  Shop Smarter with Our Mobile App
                </h1>
                
                <p className="text-xl opacity-90 mb-8">
                  Get the full Shopzero experience in your pocket. Download our mobile app for faster shopping, exclusive mobile deals, and seamless checkout.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-3">
                    <Download className="h-5 w-5" />
                    <div className="text-left">
                      <div className="text-xs">Download on the</div>
                      <div className="font-semibold">App Store</div>
                    </div>
                  </button>
                  
                  <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-3">
                    <Download className="h-5 w-5" />
                    <div className="text-left">
                      <div className="text-xs">Get it on</div>
                      <div className="font-semibold">Google Play</div>
                    </div>
                  </button>
                </div>

                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>4.8 Rating</span>
                  </div>
                  <div>100K+ Downloads</div>
                  <div>Free Download</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="relative mx-auto w-64 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                    <img
                      src="https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg"
                      alt="Shopzero Mobile App"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-800 rounded-full"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
              Why Choose Our Mobile App?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the best of Shopzero with features designed specifically for mobile shopping
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
              App Screenshots
            </h2>
            <p className="text-gray-600">
              Take a look at our beautiful and intuitive mobile interface
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {screenshots.map((screenshot, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="relative mx-auto w-48 h-80 bg-gray-900 rounded-2xl p-1 shadow-lg">
                  <div className="w-full h-full bg-white rounded-xl overflow-hidden">
                    <img
                      src={screenshot.image}
                      alt={screenshot.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mt-4">
                  {screenshot.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-500 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">100K+</div>
              <div className="text-primary-100">Downloads</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8★</div>
              <div className="text-primary-100">App Store Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-primary-100">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-primary-100">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
              Coming Soon
            </h2>
            <p className="text-gray-600 mb-12">
              Exciting new features we're working on for future updates
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-6 w-6 text-primary-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Social Shopping
                </h3>
                <p className="text-gray-600 text-sm">
                  Share products with friends and get recommendations from your network
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-primary-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  AR Try-On
                </h3>
                <p className="text-gray-600 text-sm">
                  Try on clothes and accessories virtually before you buy
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Download the App Today
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join millions of users who love shopping with Shopzero mobile app
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-3">
              <Download className="h-6 w-6" />
              <div className="text-left">
                <div className="text-xs">Download on the</div>
                <div className="font-semibold text-lg">App Store</div>
              </div>
            </button>
            
            <button className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-3">
              <Download className="h-6 w-6" />
              <div className="text-left">
                <div className="text-xs">Get it on</div>
                <div className="font-semibold text-lg">Google Play</div>
              </div>
            </button>
          </div>

          <p className="text-sm opacity-75 mt-6">
            Available for iOS 12+ and Android 8+
          </p>
        </div>
      </section>
    </div>
  );
};

export default AppDownloadPage;