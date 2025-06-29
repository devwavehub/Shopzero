import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  Eye, 
  UserCheck, 
  UserX,
  Mail,
  Phone,
  Calendar,
  ShoppingCart,
  Package,
  X,
  AlertCircle
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { formatDateTime } from '../../utils/helpers';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      
      // Load users with their vendor status and stats
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (usersError) throw usersError;

      // Load vendor information for each user
      const usersWithDetails = await Promise.all(
        (usersData || []).map(async (user) => {
          // Check if user is a vendor
          const { data: vendorData } = await supabase
            .from('vendors')
            .select('*')
            .eq('user_id', user.id)
            .single();

          // Get user's order count and total spent
          const { data: ordersData } = await supabase
            .from('orders')
            .select('total_amount')
            .eq('user_id', user.id);

          const totalSpent = ordersData?.reduce((sum, order) => sum + order.total_amount, 0) || 0;
          const orderCount = ordersData?.length || 0;

          return {
            ...user,
            vendor: vendorData,
            stats: {
              totalOrders: orderCount,
              totalSpent,
            }
          };
        })
      );

      setUsers(usersWithDetails);
    } catch (error) {
      console.error('Error loading users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone and will also delete all associated data.')) return;

    try {
      // Note: In a real application, you might want to soft delete or archive users
      // instead of hard deleting them to preserve order history
      const { error } = await supabase.auth.admin.deleteUser(userId);

      if (error) throw error;
      
      toast.success('User deleted successfully');
      loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = userTypeFilter === 'all' || 
                       (userTypeFilter === 'customers' && !user.vendor) ||
                       (userTypeFilter === 'vendors' && user.vendor) ||
                       (userTypeFilter === 'approved_vendors' && user.vendor?.is_approved) ||
                       (userTypeFilter === 'pending_vendors' && user.vendor && !user.vendor.is_approved);

    return matchesSearch && matchesType;
  });

  const stats = {
    total: users.length,
    customers: users.filter(u => !u.vendor).length,
    vendors: users.filter(u => u.vendor).length,
    approvedVendors: users.filter(u => u.vendor?.is_approved).length,
    pendingVendors: users.filter(u => u.vendor && !u.vendor.is_approved).length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600">Manage all users and their accounts</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Customers</p>
              <p className="text-2xl font-bold text-gray-900">{stats.customers}</p>
            </div>
            <UserCheck className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Vendors</p>
              <p className="text-2xl font-bold text-gray-900">{stats.vendors}</p>
            </div>
            <Package className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved Vendors</p>
              <p className="text-2xl font-bold text-gray-900">{stats.approvedVendors}</p>
            </div>
            <UserCheck className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Vendors</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingVendors}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          
          <select
            value={userTypeFilter}
            onChange={(e) => setUserTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Users</option>
            <option value="customers">Customers Only</option>
            <option value="vendors">All Vendors</option>
            <option value="approved_vendors">Approved Vendors</option>
            <option value="pending_vendors">Pending Vendors</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      {filteredUsers.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Spent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                          {user.avatar_url ? (
                            <img
                              src={user.avatar_url}
                              alt={user.full_name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <Users className="h-5 w-5 text-gray-500" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.full_name || 'No name provided'}
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.phone || 'Not provided'}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {user.address || 'Not provided'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-1">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          Customer
                        </span>
                        {user.vendor && (
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.vendor.is_approved 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {user.vendor.is_approved ? 'Approved Vendor' : 'Pending Vendor'}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.stats?.totalOrders || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₦{(user.stats?.totalSpent || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDateTime(user.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete User"
                        >
                          <UserX className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">User Details</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Personal Information
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Full Name:</span>
                      <p className="text-gray-900">{selectedUser.full_name || 'Not provided'}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Email:</span>
                      <p className="text-gray-900">{selectedUser.email}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Phone:</span>
                      <p className="text-gray-900">{selectedUser.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Address:</span>
                      <p className="text-gray-900">{selectedUser.address || 'Not provided'}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Account Created:</span>
                      <p className="text-gray-900">{formatDateTime(selectedUser.created_at)}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Last Updated:</span>
                      <p className="text-gray-900">{formatDateTime(selectedUser.updated_at)}</p>
                    </div>
                  </div>
                </div>

                {selectedUser.vendor && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <Package className="h-5 w-5 mr-2" />
                      Vendor Information
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Business Name:</span>
                        <p className="text-gray-900">{selectedUser.vendor.business_name}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Business Email:</span>
                        <p className="text-gray-900">{selectedUser.vendor.business_email}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Business Phone:</span>
                        <p className="text-gray-900">{selectedUser.vendor.business_phone}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Business Address:</span>
                        <p className="text-gray-900">{selectedUser.vendor.business_address}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Status:</span>
                        <div className="mt-1">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            selectedUser.vendor.is_approved 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {selectedUser.vendor.is_approved ? 'Approved' : 'Pending Approval'}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Vendor Since:</span>
                        <p className="text-gray-900">{formatDateTime(selectedUser.vendor.created_at)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Activity Statistics</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-600">Total Orders</p>
                          <p className="text-2xl font-bold text-blue-900">{selectedUser.stats?.totalOrders || 0}</p>
                        </div>
                        <ShoppingCart className="h-8 w-8 text-blue-500" />
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-green-600">Total Spent</p>
                          <p className="text-2xl font-bold text-green-900">
                            ₦{(selectedUser.stats?.totalSpent || 0).toLocaleString()}
                          </p>
                        </div>
                        <Package className="h-8 w-8 text-green-500" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Account Status</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Account Type:</span>
                      <div className="flex flex-col space-y-1">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          Customer
                        </span>
                        {selectedUser.vendor && (
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            selectedUser.vendor.is_approved 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {selectedUser.vendor.is_approved ? 'Approved Vendor' : 'Pending Vendor'}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Profile Completion:</span>
                      <span className="text-sm text-gray-900">
                        {[
                          selectedUser.full_name,
                          selectedUser.phone,
                          selectedUser.address
                        ].filter(Boolean).length * 33}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h5 className="font-medium text-red-800 mb-2">Danger Zone</h5>
                  <p className="text-sm text-red-600 mb-3">
                    Deleting this user will permanently remove their account and all associated data.
                  </p>
                  <button
                    onClick={() => {
                      deleteUser(selectedUser.id);
                      setSelectedUser(null);
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600 transition-colors"
                  >
                    Delete User Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;