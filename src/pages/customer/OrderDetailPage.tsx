import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Package, 
  Clock, 
  CheckCircle, 
  Truck, 
  X,
  MapPin,
  Calendar,
  User,
  Phone,
  Mail,
  Download
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';
import { formatPrice, formatDateTime } from '../../utils/helpers';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && user) {
      loadOrderDetails();
    }
  }, [id, user]);

  const loadOrderDetails = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items(
            *,
            product:products(name, images, category, brand)
          ),
          vendor:vendors(business_name, business_email, business_phone)
        `)
        .eq('id', id)
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      setOrder(data);
    } catch (error) {
      console.error('Error loading order details:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-6 w-6 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="h-6 w-6 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-6 w-6 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'cancelled':
        return <X className="h-6 w-6 text-red-500" />;
      default:
        return <Package className="h-6 w-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const orderTimeline = [
    {
      status: 'Order Placed',
      date: order?.created_at,
      description: 'Your order has been placed successfully',
      completed: true
    },
    {
      status: 'Order Confirmed',
      date: order?.status === 'pending' ? null : order?.created_at,
      description: 'Vendor has confirmed your order',
      completed: order?.status !== 'pending'
    },
    {
      status: 'Shipped',
      date: order?.status === 'shipped' || order?.status === 'delivered' ? order?.updated_at : null,
      description: 'Your order is on its way',
      completed: order?.status === 'shipped' || order?.status === 'delivered'
    },
    {
      status: 'Delivered',
      date: order?.status === 'delivered' ? order?.updated_at : null,
      description: 'Order delivered successfully',
      completed: order?.status === 'delivered'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Package className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Order not found</h2>
            <p className="text-gray-600 mb-6">
              The order you're looking for doesn't exist or you don't have permission to view it.
            </p>
            <Link
              to="/orders"
              className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
            >
              Back to Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/orders"
              className="inline-flex items-center space-x-2 text-primary-500 hover:text-primary-600 mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Orders</span>
            </Link>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
                  Order #{order.id.slice(-8)}
                </h1>
                <p className="text-gray-600">
                  Placed on {formatDateTime(order.created_at)}
                </p>
              </div>
              
              <div className="mt-4 lg:mt-0 flex items-center space-x-4">
                <span className={`inline-flex px-4 py-2 text-sm font-semibold rounded-full ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
                <button className="text-primary-500 hover:text-primary-600 flex items-center space-x-1">
                  <Download className="h-4 w-4" />
                  <span>Download Invoice</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Items */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Items</h3>
                <div className="space-y-4">
                  {order.order_items?.map((item: any) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <img
                        src={item.product?.images?.[0] || 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg'}
                        alt={item.product?.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{item.product?.name}</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>Category: {item.product?.category}</p>
                          {item.product?.brand && <p>Brand: {item.product.brand}</p>}
                          <p>Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 text-lg">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatPrice(item.price)} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Timeline */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Timeline</h3>
                <div className="space-y-6">
                  {orderTimeline.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {step.completed ? (
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        ) : (
                          <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-semibold ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                            {step.status}
                          </h4>
                          {step.date && (
                            <span className="text-sm text-gray-500">
                              {formatDateTime(step.date)}
                            </span>
                          )}
                        </div>
                        <p className={`text-sm ${step.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">{formatPrice(order.total_amount - 2500)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-medium">{formatPrice(2500)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-3">
                    <span>Total:</span>
                    <span className="text-primary-600">{formatPrice(order.total_amount)}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-gray-900">{user?.full_name}</p>
                    <p className="text-gray-600 text-sm">{order.shipping_address}</p>
                  </div>
                </div>
              </div>

              {/* Vendor Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Vendor Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-900">{order.vendor?.business_name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600 text-sm">{order.vendor?.business_email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600 text-sm">{order.vendor?.business_phone}</span>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Status:</span>
                    <span className={`font-medium ${
                      order.payment_status === 'paid' ? 'text-green-600' : 
                      order.payment_status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                    </span>
                  </div>
                  {order.payment_reference && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reference:</span>
                      <span className="font-medium text-sm">{order.payment_reference}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium">Paystack</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                {order.status === 'pending' && (
                  <button className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors">
                    Cancel Order
                  </button>
                )}
                
                <Link
                  to="/track-order"
                  className="block w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors text-center"
                >
                  Track Order
                </Link>
                
                <button className="w-full bg-gray-100 text-gray-900 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                  Contact Vendor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;