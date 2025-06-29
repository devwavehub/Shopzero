import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  Truck, 
  X,
  Eye,
  Search,
  Filter
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';
import { formatPrice, formatDateTime } from '../../utils/helpers';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const OrdersPage: React.FC = () => {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user, filter]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('orders')
        .select(`
          *,
          order_items(
            *,
            product:products(name, images)
          ),
          vendor:vendors(business_name)
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;
      if (error) throw error;

      setOrders(data || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
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

  const filteredOrders = orders.filter(order => {
    if (searchQuery) {
      return order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
             order.vendor?.business_name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">My Orders</h1>
            <p className="text-gray-600">Track and manage your order history</p>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="text-gray-600">
                {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} found
              </div>
            </div>
          </div>

          {/* Orders List */}
          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-lg shadow-md p-12">
                <Package className="h-24 w-24 text-gray-300 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
                <p className="text-gray-600 mb-6">
                  {filter === 'all' 
                    ? "You haven't placed any orders yet." 
                    : `No ${filter} orders found.`
                  }
                </p>
                <Link
                  to="/products"
                  className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Start Shopping
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(order.status)}
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              Order #{order.id.slice(-8)}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {formatDateTime(order.created_at)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                        <Link
                          to={`/order/${order.id}`}
                          className="text-primary-500 hover:text-primary-600 flex items-center space-x-1"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View Details</span>
                        </Link>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
                        <div className="space-y-3">
                          {order.order_items?.slice(0, 3).map((item: any) => (
                            <div key={item.id} className="flex items-center space-x-3">
                              <img
                                src={item.product?.images?.[0] || 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg'}
                                alt={item.product?.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="flex-1">
                                <p className="font-medium text-gray-900 line-clamp-1">
                                  {item.product?.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Qty: {item.quantity} × {formatPrice(item.price)}
                                </p>
                              </div>
                            </div>
                          ))}
                          {order.order_items?.length > 3 && (
                            <p className="text-sm text-gray-500">
                              +{order.order_items.length - 3} more item{order.order_items.length - 3 !== 1 ? 's' : ''}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3">Order Summary</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Vendor:</span>
                              <span className="font-medium">{order.vendor?.business_name}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Items:</span>
                              <span>{order.order_items?.length || 0}</span>
                            </div>
                            <div className="flex justify-between font-semibold text-lg border-t pt-2">
                              <span>Total:</span>
                              <span className="text-primary-600">{formatPrice(order.total_amount)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;