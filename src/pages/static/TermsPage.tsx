import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  FileText, 
  Users, 
  CreditCard, 
  Truck, 
  AlertCircle,
  CheckCircle,
  Scale
} from 'lucide-react';

const TermsPage: React.FC = () => {
  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: CheckCircle,
      content: `By accessing and using Shopzero, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`
    },
    {
      id: 'definitions',
      title: 'Definitions',
      icon: FileText,
      content: `"Shopzero" refers to our company, website, mobile application, and services. "User" refers to anyone who accesses our platform. "Vendor" refers to sellers who list products on our marketplace. "Customer" refers to buyers who purchase products through our platform.`
    },
    {
      id: 'user-accounts',
      title: 'User Accounts',
      icon: Users,
      content: `You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.`
    },
    {
      id: 'vendor-terms',
      title: 'Vendor Terms',
      icon: Shield,
      content: `Vendors must provide accurate product information, maintain adequate inventory, and fulfill orders promptly. All products must comply with applicable laws and regulations. Vendors are responsible for product quality and customer service.`
    },
    {
      id: 'payments',
      title: 'Payments and Fees',
      icon: CreditCard,
      content: `All payments are processed securely through our payment partners. Vendors agree to pay applicable commission fees. Customers are responsible for all charges incurred on their accounts. Refunds are subject to our refund policy.`
    },
    {
      id: 'shipping',
      title: 'Shipping and Delivery',
      icon: Truck,
      content: `Delivery times are estimates and may vary. Risk of loss and title for products pass to customers upon delivery. We are not responsible for delays caused by shipping carriers or circumstances beyond our control.`
    },
    {
      id: 'prohibited',
      title: 'Prohibited Uses',
      icon: AlertCircle,
      content: `You may not use our platform for any unlawful purpose, to transmit harmful content, to infringe on intellectual property rights, or to engage in fraudulent activities. We reserve the right to terminate accounts that violate these terms.`
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      icon: Scale,
      content: `Shopzero shall not be liable for any indirect, incidental, special, consequential, or punitive damages. Our total liability shall not exceed the amount paid by you for the specific product or service that gave rise to the claim.`
    }
  ];

  const lastUpdated = 'December 1, 2024';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent-50 to-accent-100 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="bg-accent-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-heading font-bold text-gray-900 mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Please read these terms carefully before using Shopzero
            </p>
            <p className="text-sm text-gray-500">
              Last updated: {lastUpdated}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-12"
            >
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">Welcome to Shopzero</h2>
              <p className="text-blue-800 leading-relaxed">
                These Terms of Service ("Terms") govern your use of the Shopzero website and mobile application 
                (collectively, the "Service") operated by Shopzero Limited ("us", "we", or "our"). By accessing 
                or using our Service, you agree to be bound by these Terms. If you disagree with any part of 
                these terms, then you may not access the Service.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-8"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg flex-shrink-0">
                    <section.icon className="h-6 w-6 text-primary-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {section.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Terms */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-heading font-bold text-gray-900 text-center mb-12">
                Additional Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Intellectual Property</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    The Service and its original content, features, and functionality are and will remain 
                    the exclusive property of Shopzero and its licensors. The Service is protected by 
                    copyright, trademark, and other laws.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Policy</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Your privacy is important to us. Please review our Privacy Policy, which also governs 
                    your use of the Service, to understand our practices regarding your personal information.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Termination</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We may terminate or suspend your account and bar access to the Service immediately, 
                    without prior notice or liability, under our sole discretion, for any reason whatsoever.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Governing Law</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    These Terms shall be interpreted and governed by the laws of the Federal Republic of Nigeria, 
                    without regard to its conflict of law provisions.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl font-heading font-bold mb-6">
              Questions About Our Terms?
            </h2>
            <p className="text-primary-100 mb-8">
              If you have any questions about these Terms of Service, please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-primary-500 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                Contact Us
              </a>
              <a
                href="/faq"
                className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-primary-500 transition-colors font-semibold"
              >
                View FAQ
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;