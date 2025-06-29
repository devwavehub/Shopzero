import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Store, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Shield, 
  Truck,
  CheckCircle,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Building
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

const SellOnShopzeroPage: React.FC = () => {
  const { user, becomeVendor, loading } = useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    businessAddress: '',
    businessDescription: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to become a vendor');
      navigate('/login');
      return;
    }

    const success = await becomeVendor({
      business_name: formData.businessName,
      business_email: formData.businessEmail,
      business_phone: formData.businessPhone,
      business_address: formData.businessAddress,
      business_description: formData.businessDescription,
    });

    if (success) {
      navigate('/vendor-dashboard');
    }
  };

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Grow Your Business',
      description: 'Reach thousands of customers and scale your business with our platform'
    },
    {
      icon: Users,
      title: 'Large Customer Base',
      description: 'Access to our growing community of active shoppers'
    },
    {
      icon: DollarSign,
      title: 'Competitive Fees',
      description: 'Low commission rates and transparent pricing structure'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Fast and secure payment processing with Paystack integration'
    },
    {
      icon: Truck,
      title: 'Logistics Support',
      description: 'Integrated shipping solutions and delivery tracking'
    },
    {
      icon: CheckCircle,
      title: 'Easy Management',
      description: 'User-friendly dashboard to manage products, orders, and analytics'
    }
  ];

  const steps = [
    {
      step: 1,
      title: 'Apply to Sell',
      description: 'Fill out our vendor application form with your business details'
    },
    {
      step: 2,
      title: 'Get Approved',
      description: 'Our team will review your application within 24-48 hours'
    },
    {
      step: 3,
      title: 'Set Up Your Store',
      description: 'Add your products, set prices, and customize your store'
    },
    {
      step: 4,
      title: 'Start Selling',
      description: 'Go live and start receiving orders from customers'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-heading font-bold mb-6"
            >
              Sell on Shopzero
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl mb-8 opacity-90"
            >
              Join thousands of successful vendors and grow your business with Nigeria's fastest-growing marketplace
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="#apply"
                className="bg-white text-primary-500 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold inline-flex items-center space-x-2"
              >
                <span>Start Selling Today</span>
                <ArrowRight className="h-5 w-5" />
              </a>
              <Link
                to="/vendor-login"
                className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-primary-500 transition-colors font-semibold"
              >
                Vendor Login
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
              Why Sell on Shopzero?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join a platform designed to help your business thrive with powerful tools and dedicated support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting started is simple. Follow these easy steps to begin selling
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="bg-primary-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
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
              <div className="text-4xl font-bold mb-2">1,000+</div>
              <div className="text-primary-100">Active Vendors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-primary-100">Monthly Orders</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">₦2M+</div>
              <div className="text-primary-100">Monthly Sales</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8★</div>
              <div className="text-primary-100">Vendor Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
                Apply to Become a Vendor
              </h2>
              <p className="text-gray-600">
                Fill out the form below and we'll review your application within 24-48 hours
              </p>
            </div>

            {!user ? (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Sign In Required
                </h3>
                <p className="text-gray-600 mb-6">
                  You need to have an account to apply as a vendor
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/login"
                    className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors font-semibold"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="border border-primary-500 text-primary-500 px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors font-semibold"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name *
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter your business name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="email"
                        name="businessEmail"
                        value={formData.businessEmail}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="business@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Phone *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="tel"
                        name="businessPhone"
                        value={formData.businessPhone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="+234 800 000 0000"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Address *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                      <textarea
                        name="businessAddress"
                        value={formData.businessAddress}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter your business address"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Description
                    </label>
                    <textarea
                      name="businessDescription"
                      value={formData.businessDescription}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Tell us about your business, products, and what makes you unique"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <>
                        <Store className="h-5 w-5" />
                        <span>Submit Application</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">How much does it cost to sell on Shopzero?</h3>
                <p className="text-gray-600">
                  It's free to list your products. We only charge a small commission on successful sales, 
                  which helps us maintain the platform and provide excellent service.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">How long does the approval process take?</h3>
                <p className="text-gray-600">
                  Most applications are reviewed within 24-48 hours. We'll notify you via email once your application is approved.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">What products can I sell?</h3>
                <p className="text-gray-600">
                  You can sell most legal products. We have guidelines for prohibited items which will be shared upon approval.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">How do I get paid?</h3>
                <p className="text-gray-600">
                  Payments are processed securely through Paystack and transferred to your bank account within 2-3 business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SellOnShopzeroPage;