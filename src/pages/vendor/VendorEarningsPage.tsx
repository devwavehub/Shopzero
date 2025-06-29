import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Download,
  Eye,
  CreditCard
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';
import { formatPrice, formatDateTime } from '../../utils/helpers';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const VendorEarningsPage: React.FC = () => {
  const { vendor } = useAuthStore();
  const [earnings, setEarnings] = useState<any>({
    total: 0,
    thisMonth: 0,
    lastMonth: 0,
    pending: 0,
    paid: 0
  });
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('all');

  useEffect(() => {
    if (vendor) {
      loadEarningsData();
    }
  }, [vendor, timeRange]);

  const loadEarningsData = async () => {
    try {
      setLoading(true);
      
      // Load all orders for this vendor
      const { data: orders, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items(
            *,
            product:products(name)
          )
        `)
        .eq('vendor_id', vendor?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Calculate earnings
      const totalEarnings = orders?.reduce((sum, order) => sum + order.total_amount, 0) || 0;
      
      // This month earnings
      const currentMonth = new Date().toISOString().slice(0, 7);
      const thisMonthOrders = orders?.filter(order => 
        order.created_at.startsWith(currentMonth)
      ) || [];
      const thisMonthEarnings = thisMonthOrders.reduce((sum, order) => sum + order.total_amount, 0);

      // Last month earnings
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      const lastMonthStr = lastMonth.toISOString().slice(0, 7);
      const lastMonthOrders = orders?.filter(order => 
        order.created_at.startsWith(lastMonthStr)
      ) || [];
      const lastMonthEarnings = lastMonthOrders.reduce((sum, order) => sum + order.total_amount, 0);

      // Pending vs Paid (simplified - in real app this would be based on payout status)
      const paidEarnings = orders?.filter(order => 
        order.status === 'delivered'
      ).reduce((sum, order) => sum + order.total_amount, 0) || 0;
      
      const pendingEarnings = totalEarnings - paidEarnings;

      setEarnings({
        total: totalEarnings,
        thisMonth: thisMonthEarnings,
        lastMonth: lastMonthEarnings,
        pending: pendingEarnings,
        paid: paidEarnings
      });

      // Set transactions (orders as transactions)
      setTransactions(orders || []);
    } catch (error) {
      console.error('Error loading earnings data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getGrowthPercentage = () => {
    if (earnings.lastMonth === 0) return earnings.thisMonth > 0 ? 100 : 0;
    return Math.round(((earnings.thisMonth - earnings.lastMonth) / earnings.lastMonth) * 100);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.created_at);
    const now = new Date();
    
    switch (timeRange) {
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return transactionDate >= weekAgo;
      case 'month':
        const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        return transactionDate >= monthAgo;
      case 'quarter':
        const quarterAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
        return transactionDate >= quarterAgo;
      default:
        return true;
    }
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900">Earnings</h1>
          <p className="text-gray-600">Track your sales performance and earnings</p>
        </div>
        <button className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2">
          <Download className="h-5 w-5" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-900">{formatPrice(earnings.total)}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">{formatPrice(earnings.thisMonth)}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className={`h-4 w-4 ${getGrowthPercentage() >= 0 ? 'text-green-500' : 'text-red-500'}`} />
                <span className={`text-sm ml-1 ${getGrowthPercentage() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {getGrowthPercentage() >= 0 ? '+' : ''}{getGrowthPercentage()}%
                </span>
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Payout</p>
              <p className="text-2xl font-bold text-gray-900">{formatPrice(earnings.pending)}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Eye className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Paid Out</p>
              <p className="text-2xl font-bold text-gray-900">{formatPrice(earnings.paid)}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <CreditCard className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Earnings Chart Placeholder */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Earnings Overview</h2>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Time</option>
            <option value="quarter">Last 3 Months</option>
            <option value="month">Last Month</option>
            <option value="week">Last Week</option>
          </select>
        </div>
        
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Earnings chart would be displayed here</p>
            <p className="text-sm text-gray-400">Integration with charting library needed</p>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
        </div>
        
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <DollarSign className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions yet</h3>
            <p className="text-gray-600">Transactions will appear here when you make sales</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payout Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.slice(0, 10).map((transaction, index) => (
                  <motion.tr
                    key={transaction.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{transaction.id.slice(-8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDateTime(transaction.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.order_items?.length || 0} item(s)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatPrice(transaction.total_amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        transaction.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        transaction.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        transaction.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        transaction.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {transaction.status === 'delivered' ? 'Paid' : 'Pending'}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Payout Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Payout Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-1">Payout Schedule</h4>
            <p>Payouts are processed every Tuesday for orders delivered in the previous week.</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Processing Time</h4>
            <p>Funds typically arrive in your account within 2-3 business days after processing.</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Minimum Payout</h4>
            <p>Minimum payout amount is ₦5,000. Smaller amounts will be carried over to the next payout.</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Commission</h4>
            <p>Shopzero charges a 5% commission on each successful sale.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorEarningsPage;