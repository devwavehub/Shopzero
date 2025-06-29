import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp,
  Eye,
  Users,
  Calendar,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';
import { formatPrice } from '../../utils/helpers';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalEarnings: number;
  pendingOrders: number;
  monthlyEarnings: number;
  monthlyOrders: number;
}

const VendorDashboardPage: React.FC = () => {
  const { vendor } = useAuthStore();
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalEarnings: 0,
    pendingOrders: 0,
    monthlyEarnings: 0,
    monthlyOrders: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    if (vendor) {
      loadDashboardData();
    }
  }, [vendor]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Load products count
      const { count: productsCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('vendor_id', vendor?.id);

      // Load orders data
      const { data: orders, count: ordersCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact' })
        .eq('vendor_id', vendor?.id);

      // Calculate earnings
      const totalEarnings = orders?.reduce((sum, order) => sum + order.total_amount, 0) || 0;

      // Pending orders
      const { count: pendingCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('vendor_id', vendor?.id)
        .eq('status', 'pending');

      // Monthly data
      const currentMonth = new Date().toISOString().slice(0, 7);
      const { data: monthlyOrders } = await supabase
        .from('orders')
        .select('*')
        .eq('vendor_id', vendor?.id)
        .gte('created_at', `${currentMonth}-01`);

      const monthlyEarnings = monthlyOrders?.reduce((sum, order) => sum + order.total_amount, 0) || 0;

      // Recent orders
      const { data: recent } = await supabase
        .from('orders')
        .select(`
          *,
          order_items(
            *,
            product:products(name, images)
          )
        `)
        .eq('vendor_id', vendor?.id)
        .order('created_at', { ascending: false })
        .limit(5);

      setStats({
        totalProducts: productsCount || 0,
        totalOrders: ordersCount || 0,
        totalEarnings,
        pendingOrders: pendingCount || 0,
        monthlyEarnings,
        monthlyOrders: monthlyOrders?.length || 0,
      });

      setRecentOrders(recent || []);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-blue-500',
      change: '+12%',
      isPositive: true,
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'bg-green-500',
      change: '+8%',
      isPositive: true,
    },
    {
      title: 'Total Earnings',
      value: formatPrice(stats.totalEarnings),
      icon: DollarSign,
      color: 'bg-purple-500',
      change: '+15%',
      isPositive: true,
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: Calendar,
      color: 'bg-orange-500',
      change: '-5%',
      isPositive: false,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {vendor?.business_name}!</h1>
        <p className="opacity-90">Here's what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {card.isPositive ? (
                <ArrowUp className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDown className="h-4 w-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ml-1 ${
                card.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {card.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">from last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Overview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Monthly Earnings</p>
                  <p className="text-sm text-gray-500">Revenue this month</p>
                </div>
              </div>
              <span className="text-xl font-bold text-gray-900">
                {formatPrice(stats.monthlyEarnings)}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <ShoppingCart className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Monthly Orders</p>
                  <p className="text-sm text-gray-500">Orders this month</p>
                </div>
              </div>
              <span className="text-xl font-bold text-gray-900">
                {stats.monthlyOrders}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <button className="text-primary-500 hover:text-primary-600 text-sm font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {recentOrders.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No recent orders</p>
            ) : (
              recentOrders.map((order) => (
                <div key={order.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                  <div className="flex-shrink-0">
                    {order.order_items?.[0]?.product?.images?.[0] ? (
                      <img
                        src={order.order_items[0].product.images[0]}
                        alt="Product"
                        className="w-10 h-10 rounded object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                        <Package className="h-5 w-5 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      Order #{order.id.slice(-8)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.order_items?.length || 0} item(s)
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {formatPrice(order.total_amount)}
                    </p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Package className="h-6 w-6 text-primary-500" />
            <span className="font-medium">Add New Product</span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Eye className="h-6 w-6 text-primary-500" />
            <span className="font-medium">View Analytics</span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="h-6 w-6 text-primary-500" />
            <span className="font-medium">Customer Messages</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboardPage;