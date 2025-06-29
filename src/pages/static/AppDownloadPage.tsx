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
  User,
  CheckCircle,
  ArrowRight
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
      icon: Heart,
      title: 'Wishlist Sync',
      description: 'Save items and sync across all your devices'
    },
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Find products quickly with advanced search filters'
    },
    {
      icon: User,
      title: 'Profile Management',
      description: 'Manage your account and preferences on the go'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Safe and secure payment processing'
    }
  ];

  const benefits = [
    'Exclusive mobile-only deals and discounts',
    'Faster checkout with saved payment methods',
    'Real-time order tracking and updates',
    'Offline browsing of recently viewed items',
    'Biometric authentication for security',
    'One-tap reordering of favorite products'
  ];

  const stats = [
    { number: '4.8★', label: 'App Store Rating' },
    { number: '100K+', label: 'Downloads' },
    { number: '50%', label: 'Faster Checkout' },
    { number: '24/7', label: 'Mobile Support' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-5xl font-heading font-bold text-gray-900 mb-6">
                Shop Smarter with the Shopzero App
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Get the best shopping experience right in your pocket. Download our mobile app 
                for exclusive deals, faster checkout, and seamless shopping on the go.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2">
                  <Download className="h-5 w-5" />
                  <span>Download for iOS</span>
                </button>
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                  <Download className="h-5 w-5" />
                  <span>Download for Android</span>
                </button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span>4.8 Rating</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Download className="h-4 w-4" />
                  <span>100K+ Downloads</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="h-4 w-4" />
                  <span>Secure & Safe</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="relative mx-auto w-64 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                  <div className="bg-primary-500 h-20 flex items-center justify-center">
                    <div className="flex items-center space-x-2 text-white">
                      <Smartphone className="h-6 w-6" />
                      <span className="font-bold">Shopzero</span>
                    </div>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="bg-gray-100 h-8 rounded"></div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-gray-100 h-20 rounded"></div>
                      <div className="bg-gray-100 h-20 rounded"></div>
                    </div>
                    <div className="bg-gray-100 h-6 rounded w-3/4"></div>
                    <div className="bg-gray-100 h-6 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-red-500 text-white p-2 rounded-full"
              >
                <Bell className="h-4 w-4" />
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-green-500 text-white p-2 rounded-full"
              >
                <ShoppingCart className="h-4 w-4" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-indigo-500 mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-heading font-bold text-gray-900 mb-6">
              Powerful Features at Your Fingertips
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our mobile app is packed with features designed to make your shopping 
              experience faster, easier, and more enjoyable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-indigo-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-4xl font-heading font-bold text-gray-900 mb-6">
                Why Choose Our Mobile App?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Experience shopping like never before with features designed specifically 
                for mobile users. Get more value, convenience, and security.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Download Now & Save</h3>
                <p className="text-indigo-100 mb-6">
                  Get 20% off your first order when you download and shop through our mobile app.
                </p>
                
                <div className="space-y-3">
                  <button className="w-full bg-white text-indigo-600 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold flex items-center justify-center space-x-2">
                    <Download className="h-5 w-5" />
                    <span>Download for iOS</span>
                  </button>
                  <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold flex items-center justify-center space-x-2">
                    <Download className="h-5 w-5" />
                    <span>Download for Android</span>
                  </button>
                </div>
                
                <p className="text-xs text-indigo-200 text-center mt-4">
                  * Offer valid for new app users only
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Coming Soon Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-heading font-bold text-gray-900 mb-6">
              Coming Soon
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're constantly improving our app. Here's what's coming next.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'AR Try-On',
                description: 'Try products virtually before you buy'
              },
              {
                icon: Bell,
                title: 'Smart Notifications',
                description: 'AI-powered personalized alerts'
              },
              {
                icon: User,
                title: 'Social Shopping',
                description: 'Share and shop with friends'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-md text-center"
              >
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-heading font-bold mb-6">
              Ready to Shop Smarter?
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join millions of happy shoppers who have made the switch to mobile. 
              Download the Shopzero app today and start saving!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-indigo-500 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold flex items-center space-x-2">
                <Download className="h-5 w-5" />
                <span>Download for iOS</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold flex items-center space-x-2">
                <Download className="h-5 w-5" />
                <span>Download for Android</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AppDownloadPage;