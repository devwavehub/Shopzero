import React from 'react';
import { motion } from 'framer-motion';
import { 
  Store, 
  Users, 
  Shield, 
  Truck, 
  Heart,
  Target,
  Award,
  Globe
} from 'lucide-react';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'We prioritize the security of your data and transactions with industry-leading protection.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Building a thriving community of buyers and sellers across Nigeria and beyond.'
    },
    {
      icon: Heart,
      title: 'Customer Satisfaction',
      description: 'Your happiness is our success. We go above and beyond to ensure great experiences.'
    },
    {
      icon: Globe,
      title: 'Innovation',
      description: 'Constantly evolving our platform with cutting-edge technology and user feedback.'
    }
  ];

  const team = [
    {
      name: 'Adebayo Johnson',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      description: 'Visionary leader with 10+ years in e-commerce and fintech.'
    },
    {
      name: 'Kemi Adebola',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg',
      description: 'Tech expert passionate about building scalable platforms.'
    },
    {
      name: 'Chidi Okafor',
      role: 'Head of Operations',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg',
      description: 'Operations specialist ensuring smooth marketplace experiences.'
    },
    {
      name: 'Fatima Aliyu',
      role: 'Head of Marketing',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg',
      description: 'Marketing strategist connecting brands with their audiences.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Active Products' },
    { number: '5,000+', label: 'Happy Customers' },
    { number: '1,000+', label: 'Verified Vendors' },
    { number: '50+', label: 'Product Categories' }
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
                <Store className="h-8 w-8" />
              </div>
              <span className="text-4xl font-heading font-bold">
                Shop<span className="text-white">zero</span>
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-heading font-bold mb-6"
            >
              About Shopzero
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl opacity-90 max-w-3xl mx-auto"
            >
              Nigeria's fastest-growing multi-vendor marketplace, connecting buyers and sellers 
              for a truly zero-stress shopping experience.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-600 text-lg">
                Born from a vision to revolutionize e-commerce in Nigeria
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Zero Stress, Maximum Value
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Founded in 2024, Shopzero emerged from a simple yet powerful idea: online shopping 
                  should be effortless, secure, and rewarding for everyone involved. We recognized 
                  the challenges faced by both buyers and sellers in the Nigerian e-commerce space 
                  and set out to create a solution.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Our platform brings together thousands of verified vendors and millions of products, 
                  creating a vibrant marketplace where quality meets affordability, and where every 
                  transaction is protected by our commitment to excellence.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Target className="h-6 w-6 text-primary-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Our Mission</h4>
                    <p className="text-gray-600 text-sm">
                      To democratize commerce and empower businesses across Nigeria
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg"
                  alt="Our Story"
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-6 -left-6 bg-primary-500 text-white p-4 rounded-lg">
                  <Award className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary-500 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-primary-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do and shape our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind Shopzero's success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary-500 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
                Why Choose Shopzero?
              </h2>
              <p className="text-gray-600">
                We're more than just a marketplace - we're your trusted partner in commerce
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Fast & Reliable</h3>
                <p className="text-gray-600">
                  Quick delivery, reliable service, and real-time tracking for all your orders.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure & Safe</h3>
                <p className="text-gray-600">
                  Advanced security measures and buyer protection for worry-free shopping.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Driven</h3>
                <p className="text-gray-600">
                  Built by Nigerians, for Nigerians, with local insights and global standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl mb-8 opacity-90">
            Whether you're looking to shop or sell, Shopzero is here for you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-500 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
              Start Shopping
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-primary-500 transition-colors font-semibold">
              Become a Vendor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;