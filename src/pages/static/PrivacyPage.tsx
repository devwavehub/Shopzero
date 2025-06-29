import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Eye, 
  Lock, 
  Database, 
  Share2, 
  UserCheck,
  Cookie,
  Settings,
  Mail,
  Phone
} from 'lucide-react';

const PrivacyPage: React.FC = () => {
  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: Database,
      content: `We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us. This includes your name, email address, phone number, shipping address, and payment information. We also collect information automatically when you use our services, including device information, IP address, and browsing behavior.`
    },
    {
      id: 'how-we-use',
      title: 'How We Use Your Information',
      icon: Settings,
      content: `We use your information to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, communicate with you about products and services, and protect against fraud and abuse. We may also use your information for marketing purposes with your consent.`
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing',
      icon: Share2,
      content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with service providers who assist us in operating our platform, vendors to fulfill your orders, and law enforcement when required by law. All third parties are bound by confidentiality agreements.`
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: Lock,
      content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security assessments. However, no method of transmission over the internet is 100% secure.`
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking',
      icon: Cookie,
      content: `We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and personalize content. You can control cookie settings through your browser preferences. Some features of our service may not function properly if cookies are disabled.`
    },
    {
      id: 'your-rights',
      title: 'Your Rights',
      icon: UserCheck,
      content: `You have the right to access, update, or delete your personal information. You can also opt out of marketing communications and request data portability. To exercise these rights, please contact us using the information provided below. We will respond to your request within a reasonable timeframe.`
    },
    {
      id: 'data-retention',
      title: 'Data Retention',
      icon: Eye,
      content: `We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. When we no longer need your information, we will securely delete or anonymize it.`
    },
    {
      id: 'international-transfers',
      title: 'International Transfers',
      icon: Shield,
      content: `Your information may be transferred to and processed in countries other than your own. We ensure that such transfers are subject to appropriate safeguards and comply with applicable data protection laws. By using our services, you consent to such transfers.`
    }
  ];

  const lastUpdated = 'December 1, 2024';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-heading font-bold text-gray-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
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
              className="bg-green-50 border border-green-200 rounded-lg p-8 mb-12"
            >
              <h2 className="text-2xl font-semibold text-green-900 mb-4">Our Commitment to Privacy</h2>
              <p className="text-green-800 leading-relaxed">
                At Shopzero, we are committed to protecting your privacy and ensuring the security of your 
                personal information. This Privacy Policy explains how we collect, use, disclose, and 
                safeguard your information when you visit our website or use our mobile application. 
                Please read this privacy policy carefully.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Privacy Sections */}
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
                  <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                    <section.icon className="h-6 w-6 text-blue-500" />
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

      {/* Data Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
                Types of Data We Collect
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-purple-50 rounded-lg p-6 text-center"
              >
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
                <p className="text-gray-600 text-sm">
                  Name, email address, phone number, shipping address, and payment information
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-green-50 rounded-lg p-6 text-center"
              >
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Usage Information</h3>
                <p className="text-gray-600 text-sm">
                  Pages visited, time spent, clicks, searches, and other interaction data
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-orange-50 rounded-lg p-6 text-center"
              >
                <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Device Information</h3>
                <p className="text-gray-600 text-sm">
                  IP address, browser type, device type, operating system, and unique identifiers
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Your Choices */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
                Your Privacy Choices
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                You have control over your personal information. Here are the choices available to you.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Update your personal information</li>
                  <li>• Change your password</li>
                  <li>• Manage communication preferences</li>
                  <li>• Delete your account</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Marketing Communications</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Opt out of promotional emails</li>
                  <li>• Unsubscribe from newsletters</li>
                  <li>• Control push notifications</li>
                  <li>• Manage SMS preferences</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cookie Preferences</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Manage cookie settings</li>
                  <li>• Disable tracking cookies</li>
                  <li>• Control analytics cookies</li>
                  <li>• Opt out of advertising cookies</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Requests</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Request a copy of your data</li>
                  <li>• Correct inaccurate information</li>
                  <li>• Request data deletion</li>
                  <li>• Data portability requests</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl font-heading font-bold mb-6">
              Questions About Your Privacy?
            </h2>
            <p className="text-blue-100 mb-8">
              If you have any questions about this Privacy Policy or our data practices, 
              please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="/contact"
                className="bg-white text-blue-500 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                Contact Us
              </a>
              <a
                href="mailto:privacy@shopzero.ng"
                className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-500 transition-colors font-semibold"
              >
                Email Privacy Team
              </a>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-blue-100">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>privacy@shopzero.ng</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+234 (0) 800 SHOPZERO</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;