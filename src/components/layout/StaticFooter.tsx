import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Store, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  Heart,
  ExternalLink,
  Shield,
  Smartphone
} from 'lucide-react';

const StaticFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Track Order', href: '/track-order' },
  ];

  const legalLinks = [
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Return Policy', href: '/returns' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Refund Policy', href: '/refunds' },
  ];

  const businessLinks = [
    { name: 'Sell on Shopzero', href: '/sell-on-shopzero' },
    { name: 'Vendor Login', href: '/vendor-login' },
    { name: 'Become a Partner', href: '/partnership' },
    { name: 'Affiliate Program', href: '/affiliate' },
    { name: 'Bulk Orders', href: '/bulk-orders' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/shopzero', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/shopzero', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/shopzero', color: 'hover:text-pink-600' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/shopzero', color: 'hover:text-red-600' },
  ];

  return (
    <footer className="bg-accent-500 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-heading font-bold mb-4">
              Stay Updated with Shopzero
            </h3>
            <p className="text-primary-100 mb-6">
              Get the latest deals, new arrivals, and exclusive offers delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Link
                to="/newsletter"
                className="bg-white text-primary-500 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                Subscribe
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-primary-500 text-white p-2 rounded-lg">
                <Store className="h-6 w-6" />
              </div>
              <span className="text-2xl font-heading font-bold">
                Shop<span className="text-primary-500">zero</span>
              </span>
            </Link>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              Nigeria's premier multi-vendor marketplace offering zero stress shopping 
              with secure payments, fast delivery, and exceptional customer service.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-primary-500 flex-shrink-0" />
                <span className="text-gray-300">
                  123 Commerce Street, Victoria Island, Lagos, Nigeria
                </span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-primary-500 flex-shrink-0" />
                <span className="text-gray-300">+234 (0) 800 SHOPZERO</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-primary-500 flex-shrink-0" />
                <span className="text-gray-300">support@shopzero.ng</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-300 ${social.color} transition-colors`}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-primary-500 transition-colors text-sm flex items-center group"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Legal & Support</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-primary-500 transition-colors text-sm flex items-center group"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business & Apps */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Business & Apps</h3>
            <ul className="space-y-3">
              {businessLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-primary-500 transition-colors text-sm flex items-center group"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* App Download */}
            <div className="pt-4">
              <h4 className="font-medium mb-3 text-sm">Download Our App</h4>
              <Link
                to="/app-download"
                className="inline-flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors text-sm"
              >
                <Smartphone className="h-4 w-4" />
                <span>Get Mobile App</span>
              </Link>
            </div>

            {/* Admin Access (Hidden) */}
            <div className="pt-4">
              <Link
                to="/admin"
                className="inline-flex items-center space-x-2 text-gray-500 hover:text-red-400 transition-colors text-xs opacity-30 hover:opacity-100"
                title="Admin Access"
              >
                <Shield className="h-3 w-3" />
                <span>******</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="border-t border-accent-600">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-green-100 p-3 rounded-full">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Secure Payments</h4>
                <p className="text-xs text-gray-400">SSL Encrypted</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-blue-100 p-3 rounded-full">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">24/7 Support</h4>
                <p className="text-xs text-gray-400">Always Here</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-purple-100 p-3 rounded-full">
                <Store className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Trusted Vendors</h4>
                <p className="text-xs text-gray-400">Verified Sellers</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Heart className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Customer Love</h4>
                <p className="text-xs text-gray-400">5-Star Service</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-accent-600">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400 text-center md:text-left">
              © {currentYear} Shopzero. All rights reserved. | Built with{' '}
              <Heart className="h-3 w-3 inline text-red-500" /> in Nigeria
            </div>
            
            <div className="flex items-center space-x-6">
              <span className="text-sm text-gray-400">We accept:</span>
              <div className="flex items-center space-x-2">
                <div className="bg-white px-3 py-1 rounded text-xs font-bold text-gray-800">
                  PAYSTACK
                </div>
                <div className="bg-white px-3 py-1 rounded text-xs font-bold text-gray-800">
                  VISA
                </div>
                <div className="bg-white px-3 py-1 rounded text-xs font-bold text-gray-800">
                  MASTERCARD
                </div>
                <div className="bg-white px-3 py-1 rounded text-xs font-bold text-gray-800">
                  VERVE
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default StaticFooter;