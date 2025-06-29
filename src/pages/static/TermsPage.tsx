import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Store, Shield, Users, FileText } from 'lucide-react';

const TermsPage: React.FC = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By accessing and using Shopzero, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`
    },
    {
      title: "2. Use License",
      content: `Permission is granted to temporarily download one copy of the materials on Shopzero's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
      
      • Modify or copy the materials
      • Use the materials for any commercial purpose or for any public display
      • Attempt to reverse engineer any software contained on the website
      • Remove any copyright or other proprietary notations from the materials`
    },
    {
      title: "3. User Accounts",
      content: `When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.`
    },
    {
      title: "4. Vendor Terms",
      content: `Vendors using our platform agree to:
      
      • Provide accurate product information and descriptions
      • Honor all sales and maintain adequate inventory
      • Comply with all applicable laws and regulations
      • Pay applicable fees and commissions as outlined in the vendor agreement`
    },
    {
      title: "5. Payment Terms",
      content: `All payments are processed securely through our payment partners. By making a purchase, you agree to pay all charges incurred by you or any users of your account and credit card at the price in effect when such charges are incurred.`
    },
    {
      title: "6. Privacy Policy",
      content: `Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our service. By using our service, you agree to the collection and use of information in accordance with our Privacy Policy.`
    },
    {
      title: "7. Prohibited Uses",
      content: `You may not use our service:
      
      • For any unlawful purpose or to solicit others to perform unlawful acts
      • To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances
      • To infringe upon or violate our intellectual property rights or the intellectual property rights of others
      • To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate
      • To submit false or misleading information`
    },
    {
      title: "8. Disclaimer",
      content: `The information on this website is provided on an 'as is' basis. To the fullest extent permitted by law, this Company excludes all representations, warranties, conditions and terms whether express or implied.`
    },
    {
      title: "9. Limitations",
      content: `In no event shall Shopzero or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Shopzero's website.`
    },
    {
      title: "10. Governing Law",
      content: `These terms and conditions are governed by and construed in accordance with the laws of Nigeria and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.`
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
                <FileText className="h-8 w-8" />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-heading font-bold mb-6"
            >
              Terms of Service
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl opacity-90"
            >
              Last updated: January 2024
            </motion.p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <p className="text-lg text-gray-600 leading-relaxed">
                Welcome to Shopzero. These terms and conditions outline the rules and regulations 
                for the use of Shopzero's Website, located at shopzero.ng. By accessing this website, 
                we assume you accept these terms and conditions. Do not continue to use Shopzero if 
                you do not agree to take all of the terms and conditions stated on this page.
              </p>
            </div>

            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-lg p-6"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    {section.title}
                  </h2>
                  <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact Section */}
            <div className="mt-12 bg-primary-50 rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Questions About These Terms?
              </h2>
              <p className="text-gray-600 mb-6">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors font-semibold text-center"
                >
                  Contact Us
                </Link>
                <a
                  href="mailto:legal@shopzero.ng"
                  className="border border-primary-500 text-primary-500 px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors font-semibold text-center"
                >
                  Email Legal Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;