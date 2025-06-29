import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, HelpCircle, MessageSquare, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      title: "General Questions",
      faqs: [
        {
          question: "What is Shopzero?",
          answer: "Shopzero is Nigeria's leading multi-vendor eCommerce marketplace that connects buyers with verified vendors. We offer a wide range of products with secure payment processing and reliable delivery services."
        },
        {
          question: "How do I create an account?",
          answer: "Click on 'Sign Up' in the top right corner of our website. Fill in your details including name, email, and password. You can also sign up using your Google or Facebook account for faster registration."
        },
        {
          question: "Is Shopzero free to use?",
          answer: "Yes, creating an account and browsing products on Shopzero is completely free. We only charge small fees to vendors for successful sales to maintain our platform and services."
        }
      ]
    },
    {
      title: "Orders & Shipping",
      faqs: [
        {
          question: "How long does shipping take?",
          answer: "Shipping times vary by location and vendor. Typically, orders within Lagos are delivered in 2-5 business days, while nationwide delivery takes 3-7 business days. Express shipping options are available for faster delivery."
        },
        {
          question: "How can I track my order?",
          answer: "Once your order is shipped, you'll receive a tracking number via email and SMS. You can track your order in your account dashboard or use our dedicated order tracking page."
        },
        {
          question: "What if my order is damaged or incorrect?",
          answer: "We have a 30-day return policy for damaged or incorrect items. Contact our customer support immediately with photos of the issue, and we'll arrange for a replacement or refund."
        },
        {
          question: "Do you offer free shipping?",
          answer: "Yes! We offer free shipping on orders above ₦50,000. For orders below this amount, standard shipping fees apply based on your location and the vendor's shipping policy."
        }
      ]
    },
    {
      title: "Payments & Security",
      faqs: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major debit cards (Visa, Mastercard, Verve), bank transfers, and mobile money payments through our secure payment partner, Paystack. All transactions are encrypted and secure."
        },
        {
          question: "Is my payment information secure?",
          answer: "Absolutely. We use industry-standard SSL encryption and partner with Paystack, a PCI DSS compliant payment processor. We never store your card details on our servers."
        },
        {
          question: "Can I get a refund?",
          answer: "Yes, refunds are available for eligible returns within our 30-day return window. Refunds are processed back to your original payment method within 5-7 business days after we receive the returned item."
        }
      ]
    },
    {
      title: "Vendor Questions",
      faqs: [
        {
          question: "How do I become a vendor on Shopzero?",
          answer: "Visit our 'Sell on Shopzero' page and fill out the vendor application form. Our team will review your application within 24-48 hours. Once approved, you can start listing your products."
        },
        {
          question: "What are the fees for selling on Shopzero?",
          answer: "It's free to list your products. We charge a small commission only on successful sales. The exact commission rate depends on your product category and sales volume. Contact our vendor support for detailed pricing."
        },
        {
          question: "How do I get paid as a vendor?",
          answer: "Payments are processed automatically through Paystack and transferred to your registered bank account within 2-3 business days after order confirmation. You can track all your earnings in your vendor dashboard."
        }
      ]
    },
    {
      title: "Account & Technical",
      faqs: [
        {
          question: "I forgot my password. How do I reset it?",
          answer: "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password."
        },
        {
          question: "How do I update my account information?",
          answer: "Log into your account and go to 'Profile' or 'Settings' to update your personal information, shipping address, and preferences. Changes are saved automatically."
        },
        {
          question: "Why can't I access my account?",
          answer: "This could be due to an incorrect password, suspended account, or technical issues. Try resetting your password first. If the problem persists, contact our support team for assistance."
        }
      ]
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

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
                <HelpCircle className="h-8 w-8" />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-heading font-bold mb-6"
            >
              Frequently Asked Questions
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl opacity-90 mb-8"
            >
              Find answers to common questions about Shopzero
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">Try searching with different keywords</p>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredFAQs.map((category, categoryIndex) => (
                  <motion.div
                    key={categoryIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: categoryIndex * 0.1 }}
                  >
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                      {category.title}
                    </h2>
                    <div className="space-y-4">
                      {category.faqs.map((faq, faqIndex) => {
                        const globalIndex = categoryIndex * 100 + faqIndex;
                        const isOpen = openItems.includes(globalIndex);
                        
                        return (
                          <div
                            key={faqIndex}
                            className="bg-gray-50 rounded-lg overflow-hidden"
                          >
                            <button
                              onClick={() => toggleItem(globalIndex)}
                              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                            >
                              <span className="font-medium text-gray-900">
                                {faq.question}
                              </span>
                              <ChevronDown
                                className={`h-5 w-5 text-gray-500 transition-transform ${
                                  isOpen ? 'transform rotate-180' : ''
                                }`}
                              />
                            </button>
                            <AnimatePresence>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                                    {faq.answer}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
              Still Need Help?
            </h2>
            <p className="text-gray-600 mb-8">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                to="/contact"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-6 w-6 text-primary-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Contact Form</h3>
                <p className="text-gray-600 text-sm">Send us a detailed message</p>
              </Link>

              <a
                href="tel:+2348000000000"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6 text-primary-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600 text-sm">+234 800 SHOPZERO</p>
              </a>

              <a
                href="mailto:support@shopzero.ng"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-primary-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600 text-sm">support@shopzero.ng</p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;