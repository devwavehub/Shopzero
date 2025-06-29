import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check, Gift, Zap, Users, Bell } from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

const NewsletterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubscribed(true);
      setLoading(false);
      toast.success('Successfully subscribed to our newsletter!');
    }, 1500);
  };

  const benefits = [
    {
      icon: Gift,
      title: 'Exclusive Deals',
      description: 'Get access to subscriber-only discounts and special offers'
    },
    {
      icon: Zap,
      title: 'Flash Sale Alerts',
      description: 'Be the first to know about flash sales and limited-time offers'
    },
    {
      icon: Users,
      title: 'New Vendor Spotlights',
      description: 'Discover amazing new vendors and their unique products'
    },
    {
      icon: Bell,
      title: 'Product Updates',
      description: 'Stay informed about new product launches and categories'
    }
  ];

  if (subscribed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center"
        >
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome to the Family!
          </h2>
          <p className="text-gray-600 mb-6">
            You've successfully subscribed to the Shopzero newsletter. Get ready for amazing deals and updates!
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors font-semibold"
          >
            Continue Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center space-x-3 mb-6"
            >
              <div className="bg-white text-primary-500 p-3 rounded-lg">
                <Mail className="h-8 w-8" />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-heading font-bold mb-6"
            >
              Stay in the Loop
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl opacity-90 mb-8"
            >
              Subscribe to our newsletter and never miss out on exclusive deals, new products, and exciting updates from Shopzero.
            </motion.p>

            {/* Newsletter Signup */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="max-w-md mx-auto"
            >
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-white text-primary-500 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold disabled:opacity-50 flex items-center justify-center"
                >
                  {loading ? <LoadingSpinner size="sm" /> : 'Subscribe'}
                </button>
              </form>
              <p className="text-sm opacity-75 mt-4">
                Join over 10,000 subscribers. Unsubscribe anytime.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
              What You'll Get
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our newsletter is packed with value. Here's what you can expect when you subscribe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Newsletter */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
                Sample Newsletter
              </h2>
              <p className="text-gray-600">
                Here's a preview of what our weekly newsletter looks like
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-primary-500 text-white p-6 text-center">
                <h3 className="text-2xl font-bold mb-2">Shopzero Weekly</h3>
                <p className="opacity-90">Your dose of deals and discoveries</p>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🔥 Flash Sale Alert</h4>
                  <p className="text-gray-600 text-sm">
                    Electronics flash sale starts tomorrow at 9 AM - Up to 70% off on smartphones, laptops, and accessories!
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🆕 New Vendor Spotlight</h4>
                  <p className="text-gray-600 text-sm">
                    Meet TechHub Lagos - Your new go-to destination for premium tech gadgets and accessories.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">💡 Product Recommendation</h4>
                  <p className="text-gray-600 text-sm">
                    This week's top pick: Wireless Bluetooth Earbuds - Perfect sound quality at an unbeatable price.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">📈 Trending Categories</h4>
                  <p className="text-gray-600 text-sm">
                    Fashion and Home & Garden are trending this week. Discover the latest styles and home essentials.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of smart shoppers who never miss a deal
          </p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-primary-500 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? <LoadingSpinner size="sm" /> : 'Subscribe Now'}
            </button>
          </form>
          <p className="text-sm opacity-75 mt-4">
            No spam, ever. Unsubscribe with one click.
          </p>
        </div>
      </section>
    </div>
  );
};

export default NewsletterPage;