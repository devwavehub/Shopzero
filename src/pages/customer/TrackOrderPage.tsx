import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock,
  MapPin,
  Calendar,
  User
} from 'lucide-react';
import { formatPrice, formatDateTime } from '../../utils/helpers';

const TrackOrderPage: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) {
      setError('Please enter an order number');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      // Mock order data
      const mockOrder = {
        id: orderNumber,
        status: 'shipped',
        total_amount: 45000,
        created_at: '2024-01-15T10:30:00Z',
        shipping_address: '123 Lagos Street, Victoria Island, Lagos',
        tracking_number: 'SZ' + orderNumber.slice(-6),
        estimated_delivery: '2024-01-18',
        items: [
          {
            name: 'Wireless Bluetooth Headphones',
            quantity: 1,
            price: 25000,
            image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg'
          },
          {
            name: 'Smartphone Case',
            quantity: 2,
            price: 10000,
            image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg'
          }
        ],
        timeline: [
          {
            status: 'Order Placed',
            date: '2024-01-15T10:30:00Z',
            description: 'Your order has been placed successfully',
            completed: true
          },
          {
            status: 'Order Confirmed',
            date: '2024-01-15T14:20:00Z',
            description: 'Vendor has confirmed your order',
            completed: true
          },
          {
            status: 'Shipped',
            date: '2024-01-16T09:15:00Z',
            description: 'Your order is on its way',
            completed: true
          },
          {
            status: 'Out for Delivery',
            date: null,
            description: 'Your order is out for delivery',
            completed: false
          },
          {
            status: 'Delivered',
            date: null,
            description: 'Order delivered successfully',
            completed: false
          }
        ]
      };

      setOrderData(mockOrder);
      setLoading(false);
    }, 1500);
  };

  const getStatusIcon = (status: string, completed: boolean) => {
    if (completed) {
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    }
    
    switch (status) {
      case 'Order Placed':
        return <Package className="h-6 w-6 text-blue-500" />;
      case 'Order Confirmed':
        return <CheckCircle className="h-6 w-6 text-blue-500" />;
      case 'Shipped':
        return <Truck className="h-6 w-6 text-blue-500" />;
      case 'Out for Delivery':
        return <Truck className="h-6 w-6 text-orange-500" />;
      case 'Delivered':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      default:
        return <Clock className="h-6 w-6 text-gray-400" />;
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold text-gray-900 mb-4">Track Your Order</h1>
            <p className="text-gray-600">
              Enter your order number to get real-time updates on your delivery
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <form onSubmit={handleTrackOrder} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Order Number
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    id="orderNumber"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter your order number (e.g., SZ123456)"
                  />
                </div>
                {error && (
                  <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
              </div>
              <div className="sm:pt-7">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto bg-primary-500 text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors font-semibold disabled:opacity-50"
                >
                  {loading ? 'Tracking...' : 'Track Order'}
                </button>
              </div>
            </form>
          </div>

          {/* Order Results */}
          {orderData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Order #{orderData.id}
                    </h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Placed on {formatDateTime(orderData.created_at)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Package className="h-4 w-4" />
                        <span>Tracking: {orderData.tracking_number}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 lg:mt-0">
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(orderData.status)}`}>
                      {orderData.status.charAt(0).toUpperCase() + orderData.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Shipping Address</h3>
                    <div className="flex items-start space-x-2 text-gray-600">
                      <MapPin className="h-5 w-5 mt-0.5" />
                      <span>{orderData.shipping_address}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Order Total</h3>
                    <div className="text-2xl font-bold text-primary-600">
                      {formatPrice(orderData.total_amount)}
                    </div>
                    <p className="text-sm text-gray-600">
                      Estimated delivery: {orderData.estimated_delivery}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Timeline */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Timeline</h3>
                <div className="space-y-6">
                  {orderData.timeline.map((step: any, index: number) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {getStatusIcon(step.status, step.completed)}
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

              {/* Order Items */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Items</h3>
                <div className="space-y-4">
                  {orderData.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
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
            </motion.div>
          )}

          {/* Help Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Need Help?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div className="flex items-start space-x-2">
                <User className="h-4 w-4 mt-0.5 text-blue-600" />
                <div>
                  <p className="font-medium">Contact Customer Support</p>
                  <p>Call us at +234 (0) 800 SHOPZERO</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Package className="h-4 w-4 mt-0.5 text-blue-600" />
                <div>
                  <p className="font-medium">Order Issues</p>
                  <p>Report problems with your order</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;