import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Eye, Lock, Database } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  const sections = [
    {
      title: "Information We Collect",
      icon: Database,
      content: `We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us. This includes:

      • Personal information (name, email, phone number, address)
      • Payment information (processed securely by our payment partners)
      • Account preferences and settings
      • Communication history with our support team`
    },
    {
      title: "How We Use Your Information",
      icon: Eye,
      content: `We use the information we collect to:

      • Provide, maintain, and improve our services
      • Process transactions and send related information
      • Send you technical notices, updates, and support messages
      • Respond to your comments, questions, and customer service requests
      • Communicate with you about products, services, and events
      • Monitor and analyze trends, usage, and activities`
    },
    {
      title: "Information Sharing",
      icon: Shield,
      content: `We do not sell, trade, or otherwise transfer your personal information to third parties except:

      • With vendors to fulfill your orders
      • With service providers who assist us in operating our platform
      • When required by law or to protect our rights
      • With your explicit consent
      • In connection with a business transfer or acquisition`
    },
    {
      title: "Data Security",
      icon: Lock,
      content: `We implement appropriate security measures to protect your personal information:

      • SSL encryption for all data transmission
      • Secure payment processing through certified partners
      • Regular security audits and updates
      • Access controls and authentication measures
      • Data backup and recovery procedures`
    }
  ];

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
                <Shield className="h-8 w-8" />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-heading font-bold mb-6"
            >
              Privacy Policy
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl opacity-90"
            >
              Your privacy is important to us. Last updated: January 2024
            </motion.p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <p className="text-lg text-gray-600 leading-relaxed">
                At Shopzero, we are committed to protecting your privacy and ensuring the security 
                of your personal information. This Privacy Policy explains how we collect, use, 
                disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-lg p-6"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-primary-100 p-2 rounded-lg">
                      <section.icon className="h-6 w-6 text-primary-500" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {section.title}
                    </h2>
                  </div>
                  <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Sections */}
            <div className="space-y-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Cookies and Tracking Technologies
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We use cookies and similar tracking technologies to track activity on our service 
                  and hold certain information. Cookies are files with small amounts of data which 
                  may include an anonymous unique identifier. You can instruct your browser to refuse 
                  all cookies or to indicate when a cookie is being sent.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Your Rights
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  You have the right to access, update, or delete your personal information. You may 
                  also have the right to restrict or object to certain processing of your data. To 
                  exercise these rights, please contact us using the information provided below.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Changes to This Privacy Policy
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We may update our Privacy Policy from time to time. We will notify you of any 
                  changes by posting the new Privacy Policy on this page and updating the "Last 
                  updated" date at the top of this Privacy Policy.
                </p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="mt-12 bg-primary-50 rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Questions About This Privacy Policy?
              </h2>
              <p className="text-gray-600 mb-6">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors font-semibold text-center"
                >
                  Contact Us
                </Link>
                <a
                  href="mailto:privacy@shopzero.ng"
                  className="border border-primary-500 text-primary-500 px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors font-semibold text-center"
                >
                  Email Privacy Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;