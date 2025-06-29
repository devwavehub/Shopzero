import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign,
  TrendingUp,
  UserCheck,
  AlertCircle,
  Calendar
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { formatPrice } from '../../utils/helpers';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

interface AdminStats {
  totalUsers: number;
  totalVendors: number;
  pendingVendors: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  monthlyRevenue: number;
  monthlyOrders: number;
}

const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalVendors: 0,
    pendingVendors: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    monthlyOrders: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Load users count
      const { count: usersCount } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });

      // Load vendors data
      const { count: vendorsCount } = await supabase
        .from('vendors')
        .select('*', { count: 'exact', head: true });

      const { count: pendingVendorsCount } = await supabase
        .from('vendors')
        .select('*', { count: 'exact', head: true })
        .eq('is_approved', false);

      // Load products count
      const { count: productsCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      // Load orders data
      const { data: orders, count: ordersCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact' });

      // Calculate revenue
      const totalRevenue = orders?.reduce((sum, order) => sum + order.total_amount, 0) || 0;

      // Monthly data
      const currentMonth = new Date().toISOString().slice(0, 7);
      const { data: monthlyOrders } = await supabase
        .from('orders')
        .select('*')
        .gte('created_at', `${currentMonth}-01`);

      const monthlyRevenue = monthlyOrders?.reduce((sum, order) => sum + order.total_amount, 0) || 0;

      // Recent activity (recent orders, new vendors, etc.)
      const { data: recentOrders } = await supabase
        .from('orders')
        .select(`
          *,
          user:users(full_name),
          vendor:vendors(business_name)
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      setStats({
        totalUsers: usersCount || 0,
        totalVendors: vendorsCount || 0,
        pendingVendors: pendingVendorsCount || 0,
        totalProducts: productsCount || 0,
        totalOrders: ordersCount || 0,
        totalRevenue,
        monthlyRevenue,
        monthlyOrders: monthlyOrders?.length || 0,
      });

      setRecentActivity(recentOrders || []);
    } catch (error) {
      console.error('Error loading admin dashboard data:', error);
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
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      title: 'Active Vendors',
      value: stats.totalVendors,
      icon: UserCheck,
      color: 'bg-green-500',
      change: '+8%',
    },
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-purple-500',
      change: '+25%',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'bg-orange-500',
      change: '+15%',
    },
    {
      title: 'Total Revenue',
      value: formatPrice(stats.totalRevenue),
      icon: DollarSign,
      color: 'bg-emerald-500',
      change: '+18%',
    },
    {
      title: 'Pending Vendors',
      value: stats.pendingVendors,
      icon: AlertCircle,
      color: 'bg-red-500',
      change: stats.pendingVendors > 0 ? 'Needs attention' : 'All clear',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="opacity-90">Monitor and manage your Shopzero marketplace.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <div className="mt-4">
              <span className="text-sm text-gray-500">{card.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Monthly Overview and Recent Activity */}
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
                  <p className="font-medium text-gray-900">Monthly Revenue</p>
                  <p className="text-sm text-gray-500">Total revenue this month</p>
                </div>
              </div>
              <span className="text-xl font-bold text-gray-900">
                {formatPrice(stats.monthlyRevenue)}
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

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <button className="text-primary-500 hover:text-primary-600 text-sm font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivity.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No recent activity</p>
            ) : (
              recentActivity.map((order) => (
                <div key={order.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <ShoppingCart className="h-5 w-5 text-primary-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      Order from {order.user?.full_name || 'Unknown User'}
                    </p>
                    <p className="text-sm text-gray-500">
                      Vendor: {order.vendor?.business_name || 'Unknown Vendor'}
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <UserCheck className="h-6 w-6 text-primary-500" />
            <span className="font-medium">Approve Vendors</span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Package className="h-6 w-6 text-primary-500" />
            <span className="font-medium">Manage Products</span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <TrendingUp className="h-6 w-6 text-primary-500" />
            <span className="font-medium">View Analytics</span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="h-6 w-6 text-primary-500" />
            <span className="font-medium">Flash Sales</span>
          </button>
        </div>
      </div>

      {/* Alerts */}
      {stats.pendingVendors > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
            <p className="text-yellow-800">
              You have {stats.pendingVendors} vendor application{stats.pendingVendors !== 1 ? 's' : ''} pending approval.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;