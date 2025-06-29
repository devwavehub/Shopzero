import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { supabase, Product } from '../../lib/supabase';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { formatPrice } from '../../utils/helpers';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useCartStore();
  const { addItem: addToWishlist, isInWishlist } = useWishlistStore();

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      
      // Load product details
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select(`
          *,
          vendor:vendors(business_name, logo_url, business_description)
        `)
        .eq('id', id)
        .eq('is_active', true)
        .single();

      if (productError) throw productError;
      setProduct(productData);

      // Load related products
      if (productData) {
        const { data: relatedData } = await supabase
          .from('products')
          .select(`
            *,
            vendor:vendors(business_name, logo_url)
          `)
          .eq('category', productData.category)
          .neq('id', productData.id)
          .eq('is_active', true)
          .limit(4);

        setRelatedProducts(relatedData || []);
      }
    } catch (error) {
      console.error('Error loading product:', error);
      toast.error('Product not found');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          text: product?.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <Link to="/products" className="text-primary-500 hover:text-primary-600">
            Browse all products
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images.length > 0 ? product.images : ['https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link to="/" className="text-gray-500 hover:text-primary-500">Home</Link></li>
            <li><span className="text-gray-400">/</span></li>
            <li><Link to="/products" className="text-gray-500 hover:text-primary-500">Products</Link></li>
            <li><span className="text-gray-400">/</span></li>
            <li><Link to={`/category/${product.category.toLowerCase()}`} className="text-gray-500 hover:text-primary-500">{product.category}</Link></li>
            <li><span className="text-gray-400">/</span></li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src={images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {product.is_flash_sale && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  FLASH SALE
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index ? 'border-primary-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-heading font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-gray-600 ml-2">(4.8) • 124 reviews</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                {product.is_flash_sale && product.flash_sale_price ? (
                  <>
                    <span className="text-3xl font-bold text-red-600">
                      {formatPrice(product.flash_sale_price)}
                    </span>
                    <span className="text-xl text-gray-400 line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {Math.round(((product.price - product.flash_sale_price) / product.price) * 100)}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
            </div>

            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4 py-4 border-t border-b">
              <div>
                <span className="text-sm text-gray-500">Category:</span>
                <p className="font-medium">{product.category}</p>
              </div>
              {product.brand && (
                <div>
                  <span className="text-sm text-gray-500">Brand:</span>
                  <p className="font-medium">{product.brand}</p>
                </div>
              )}
              <div>
                <span className="text-sm text-gray-500">SKU:</span>
                <p className="font-medium">{product.sku}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Stock:</span>
                <p className="font-medium">{product.stock_quantity} available</p>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock_quantity === 0}
                  className="flex-1 bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
                
                <button
                  onClick={() => addToWishlist(product)}
                  className={`px-6 py-3 rounded-lg border-2 transition-colors flex items-center space-x-2 ${
                    isInWishlist(product.id)
                      ? 'border-red-500 bg-red-50 text-red-600'
                      : 'border-gray-300 hover:border-red-500 hover:text-red-500'
                  }`}
                >
                  <Heart className="h-5 w-5" />
                  <span>Wishlist</span>
                </button>
                
                <button
                  onClick={handleShare}
                  className="px-6 py-3 rounded-lg border-2 border-gray-300 hover:border-primary-500 hover:text-primary-500 transition-colors flex items-center space-x-2"
                >
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
              <div className="flex items-center space-x-3">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <Truck className="h-5 w-5 text-primary-500" />
                </div>
                <div>
                  <p className="font-medium text-sm">Free Delivery</p>
                  <p className="text-xs text-gray-500">On orders above ₦50,000</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <Shield className="h-5 w-5 text-primary-500" />
                </div>
                <div>
                  <p className="font-medium text-sm">Secure Payment</p>
                  <p className="text-xs text-gray-500">100% secure checkout</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <RotateCcw className="h-5 w-5 text-primary-500" />
                </div>
                <div>
                  <p className="font-medium text-sm">Easy Returns</p>
                  <p className="text-xs text-gray-500">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vendor Info */}
        {product.vendor && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-16">
            <h3 className="text-xl font-semibold mb-4">Sold by {product.vendor.business_name}</h3>
            <div className="flex items-start space-x-4">
              {product.vendor.logo_url && (
                <img
                  src={product.vendor.logo_url}
                  alt={product.vendor.business_name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              )}
              <div className="flex-1">
                <p className="text-gray-600 mb-4">{product.vendor.business_description}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">(4.9) • 1,234 reviews</span>
                  </div>
                  <button className="text-primary-500 hover:text-primary-600 font-medium">
                    View Store
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h3 className="text-2xl font-heading font-bold text-gray-900 mb-8">Related Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="relative">
                    <Link to={`/product/${relatedProduct.id}`}>
                      <img
                        src={relatedProduct.images[0] || 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg'}
                        alt={relatedProduct.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    <button
                      onClick={() => addToWishlist(relatedProduct)}
                      className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                        isInWishlist(relatedProduct.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white text-gray-600 hover:text-red-500'
                      }`}
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <Link to={`/product/${relatedProduct.id}`}>
                      <h4 className="font-semibold mb-2 line-clamp-2 hover:text-primary-500 transition-colors">
                        {relatedProduct.name}
                      </h4>
                    </Link>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 font-bold">
                        {formatPrice(relatedProduct.price)}
                      </span>
                      <button
                        onClick={() => addItem(relatedProduct)}
                        className="bg-primary-500 text-white px-3 py-1 rounded hover:bg-primary-600 transition-colors text-sm"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;