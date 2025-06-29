import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Zap, 
  TrendingUp, 
  Users, 
  Shield,
  Truck,
  ArrowRight,
  Play
} from 'lucide-react';
import { supabase, Product } from '../../lib/supabase';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { formatPrice } from '../../utils/helpers';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [flashSaleProducts, setFlashSaleProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, isInWishlist } = useWishlistStore();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);

      // Load featured products
      const { data: featured, error: featuredError } = await supabase
        .from('products')
        .select(`
          *,
          vendor:vendors(business_name, logo_url)
        `)
        .eq('is_featured', true)
        .eq('is_active', true)
        .limit(8);

      if (featuredError) throw featuredError;

      // Load flash sale products
      const { data: flashSale, error: flashSaleError } = await supabase
        .from('products')
        .select(`
          *,
          vendor:vendors(business_name, logo_url)
        `)
        .eq('is_flash_sale', true)
        .eq('is_active', true)
        .gte('flash_sale_end', new Date().toISOString())
        .limit(6);

      if (flashSaleError) throw flashSaleError;

      setFeaturedProducts(featured || []);
      setFlashSaleProducts(flashSale || []);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const heroSlides = [
    {
      title: "Zero Stress Shopping",
      subtitle: "Discover thousands of products from verified vendors",
      image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg",
      cta: "Shop Now",
      link: "/products"
    },
    {
      title: "Flash Sales Live!",
      subtitle: "Up to 70% off on trending products",
      image: "https://images.pexels.com/photos/3962294/pexels-photo-3962294.jpeg",
      cta: "View Deals",
      link: "/flash-sales"
    },
    {
      title: "Become a Vendor",
      subtitle: "Start selling and reach thousands of customers",
      image: "https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg",
      cta: "Start Selling",
      link: "/sell-on-shopzero"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSlide === index ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40" />
              <div className="relative container mx-auto px-4 h-full flex items-center">
                <div className="max-w-2xl text-white">
                  <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl md:text-6xl font-heading font-bold mb-6"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl mb-8 leading-relaxed"
                  >
                    {slide.subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Link
                      to={slide.link}
                      className="bg-primary-500 text-white px-8 py-4 rounded-lg hover:bg-primary-600 transition-colors font-semibold text-lg inline-flex items-center space-x-2"
                    >
                      <span>{slide.cta}</span>
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index ? 'bg-primary-500' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Free Delivery</h3>
              <p className="text-gray-600">Free shipping on orders above ₦50,000</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% secure checkout with Paystack</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Verified Vendors</h3>
              <p className="text-gray-600">All vendors are verified and trusted</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive prices from multiple vendors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Sales Section */}
      {flashSaleProducts.length > 0 && (
        <section className="py-16 bg-red-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="bg-red-500 p-3 rounded-lg">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-heading font-bold text-gray-900">Flash Sales</h2>
                  <p className="text-gray-600">Limited time offers - Don't miss out!</p>
                </div>
              </div>
              <Link
                to="/flash-sales"
                className="text-red-600 hover:text-red-700 font-medium flex items-center space-x-1"
              >
                <span>View All</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flashSaleProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="relative">
                    <img
                      src={product.images[0] || 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg'}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      FLASH SALE
                    </div>
                    <button
                      onClick={() => addToWishlist(product)}
                      className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                        isInWishlist(product.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white text-gray-600 hover:text-red-500'
                      }`}
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-red-600 font-bold text-xl">
                        {formatPrice(product.flash_sale_price!)}
                      </span>
                      <span className="text-gray-400 line-through">
                        {formatPrice(product.price)}
                      </span>
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">
                        {Math.round(((product.price - product.flash_sale_price!) / product.price) * 100)}% OFF
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                        <span className="text-sm text-gray-500 ml-1">(4.5)</span>
                      </div>
                      <button
                        onClick={() => addItem(product)}
                        className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-1"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">Featured Products</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our handpicked selection of the best products from top vendors
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="relative">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.images[0] || 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg'}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    <div className="absolute top-3 left-3 bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      FEATURED
                    </div>
                    <button
                      onClick={() => addToWishlist(product)}
                      className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                        isInWishlist(product.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white text-gray-600 hover:text-red-500'
                      }`}
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary-500 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-gray-900 font-bold text-xl">
                        {formatPrice(product.price)}
                      </span>
                      {product.compare_price && (
                        <span className="text-gray-400 line-through">
                          {formatPrice(product.compare_price)}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                        <span className="text-sm text-gray-500 ml-1">(4.8)</span>
                      </div>
                      <button
                        onClick={() => addItem(product)}
                        className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-1"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/products"
                className="bg-primary-500 text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors font-semibold inline-flex items-center space-x-2"
              >
                <span>View All Products</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to Start Selling?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of vendors already selling on Shopzero
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/sell-on-shopzero"
              className="bg-white text-primary-500 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Become a Vendor
            </Link>
            <Link
              to="/about"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-primary-500 transition-colors font-semibold"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-500 mb-2">10,000+</div>
              <div className="text-gray-600">Active Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-500 mb-2">5,000+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-500 mb-2">1,000+</div>
              <div className="text-gray-600">Verified Vendors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-500 mb-2">50+</div>
              <div className="text-gray-600">Product Categories</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;