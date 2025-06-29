import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Send, 
  CheckCircle, 
  Gift, 
  Zap, 
  TrendingUp,
  Bell,
  Star,
  Users,
  Calendar
} from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

const NewsletterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState({
    deals: true,
    newProducts: true,
    flashSales: true,
    vendorUpdates: false,
    weeklyDigest: true
  });
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubscribed(true);
      toast.success('Successfully subscribed to our newsletter!');
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    {
      icon: Gift,
      title: 'Exclusive Deals',
      description: 'Get access to subscriber-only discounts and special offers before anyone else.'
    },
    {
      icon: Zap,
      title: 'Flash Sale Alerts',
      description: 'Be the first to know about lightning deals and limited-time offers.'
    },
    {
      icon: TrendingUp,
      title: 'New Product Updates',
      description: 'Discover the latest products and trending items from our vendors.'
    },
    {
      icon: Bell,
      title: 'Personalized Recommendations',
      description: 'Receive curated product suggestions based on your interests and purchase history.'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Active Subscribers' },
    { number: '25%', label: 'Average Savings' },
    { number: '3x', label: 'Weekly Updates' },
    { number: '4.9★', label: 'Subscriber Rating' }
  ];

  if (subscribed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full mx-4"
        >
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to the Shopzero Family!
            </h2>
            <p className="text-gray-600 mb-6">
              You've successfully subscribed to our newsletter. Get ready for amazing deals and updates!
            </p>
            <div className="space-y-3">
              <a
                href="/"
                className="block w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium"
              >
                Start Shopping
              </a>
              <a
                href="/products"
                className="block w-full border border-primary-500 text-primary-500 py-3 rounded-lg hover:bg-primary-50 transition-colors font-medium"
              >
                Browse Products
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="bg-primary-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-heading font-bold text-gray-900 mb-6">
              Stay in the Loop
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of smart shoppers who never miss a deal. Get exclusive offers, 
              new product alerts, and insider tips delivered straight to your inbox.
            </p>
          </motion.div>
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
                <div className="text-3xl font-bold text-primary-500 mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-heading font-bold text-gray-900 mb-6">
              Why Subscribe?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our newsletter isn't just another email in your inbox. It's your gateway to savings, 
              discoveries, and exclusive shopping experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-8 text-white"
            >
              <h2 className="text-3xl font-heading font-bold text-center mb-6">
                Subscribe Now
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-primary-100 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-100 mb-4">
                    What would you like to receive?
                  </label>
                  <div className="space-y-3">
                    {Object.entries(preferences).map(([key, value]) => (
                      <label key={key} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => setPreferences(prev => ({ ...prev, [key]: e.target.checked }))}
                          className="h-4 w-4 text-white focus:ring-white border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-primary-100">
                          {key === 'deals' && 'Exclusive deals and discounts'}
                          {key === 'newProducts' && 'New product announcements'}
                          {key === 'flashSales' && 'Flash sale notifications'}
                          {key === 'vendorUpdates' && 'Vendor spotlights and updates'}
                          {key === 'weeklyDigest' && 'Weekly shopping digest'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-primary-500 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Subscribe to Newsletter</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-primary-100 text-center">
                  By subscribing, you agree to receive marketing emails from Shopzero. 
                  You can unsubscribe at any time. View our{' '}
                  <a href="/privacy" className="underline hover:no-underline">Privacy Policy</a>.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-heading font-bold text-gray-900 mb-6">
              What Our Subscribers Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                comment: 'I save so much money thanks to the exclusive deals in the newsletter!',
                rating: 5
              },
              {
                name: 'Michael Chen',
                comment: 'Never miss a flash sale anymore. The alerts are perfectly timed.',
                rating: 5
              },
              {
                name: 'Aisha Okafor',
                comment: 'Love discovering new products through the weekly digest. Highly recommend!',
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-md"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                <p className="font-medium text-gray-900">{testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsletterPage;