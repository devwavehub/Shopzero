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
  CreditCard,
  Shield,
  Truck,
  HeadphonesIcon
} from 'lucide-react';

const CustomerFooter: React.FC = () => {
  return (
    <footer className="bg-accent-500 text-white">
      {/* Features Section */}
      <div className="border-b border-accent-600">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-500 p-3 rounded-lg">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Free Delivery</h3>
                <p className="text-sm text-gray-300">On orders above ₦50,000</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-primary-500 p-3 rounded-lg">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Secure Payment</h3>
                <p className="text-sm text-gray-300">100% secure transactions</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-primary-500 p-3 rounded-lg">
                <HeadphonesIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">24/7 Support</h3>
                <p className="text-sm text-gray-300">Dedicated customer service</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-primary-500 p-3 rounded-lg">
                <CreditCard className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Easy Returns</h3>
                <p className="text-sm text-gray-300">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-primary-500 text-white p-2 rounded-lg">
                <Store className="h-6 w-6" />
              </div>
              <span className="text-2xl font-heading font-bold">
                Shop<span className="text-primary-500">zero</span>
              </span>
            </Link>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted multi-vendor marketplace for zero stress shopping. 
              Discover thousands of products from verified vendors with secure 
              checkout and fast delivery.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-500 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary-500 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary-500 transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-primary-500 transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="text-gray-300 hover:text-primary-500 transition-colors text-sm">
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/sell-on-shopzero" className="text-gray-300 hover:text-primary-500 transition-colors text-sm">
                  Sell on Shopzero
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-primary-500 transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-primary-500 transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-500 transition-colors text-sm">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-500 transition-colors text-sm">
                  Shipping Info
                </a>
              </li>
              <li>
                <Link to="/newsletter" className="text-gray-300 hover:text-primary-500 transition-colors text-sm">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-300">
                    123 Commerce Street, Victoria Island<br />
                    Lagos, Nigeria
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-500" />
                <p className="text-sm text-gray-300">+234 (0) 800 SHOPZERO</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-500" />
                <p className="text-sm text-gray-300">support@shopzero.ng</p>
              </div>
            </div>

            {/* App Download */}
            <div className="pt-4">
              <h4 className="font-medium mb-2">Download Our App</h4>
              <Link
                to="/app-download"
                className="inline-block bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors text-sm"
              >
                Get Mobile App
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-accent-600">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-300">
              © 2024 Shopzero. All rights reserved. | Built with ❤️ in Nigeria
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">We accept:</span>
              <div className="flex items-center space-x-2">
                <div className="bg-white px-2 py-1 rounded text-xs font-semibold text-gray-800">
                  PAYSTACK
                </div>
                <div className="bg-white px-2 py-1 rounded text-xs font-semibold text-gray-800">
                  VISA
                </div>
                <div className="bg-white px-2 py-1 rounded text-xs font-semibold text-gray-800">
                  MASTERCARD
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CustomerFooter;