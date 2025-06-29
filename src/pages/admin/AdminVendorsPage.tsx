import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  UserCheck, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  X, 
  Clock,
  Building,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Package,
  DollarSign
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { formatDateTime } from '../../utils/helpers';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

const AdminVendorsPage: React.FC = () => {
  const [vendors, setVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [vendorStats, setVendorStats] = useState<any>({});

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('vendors')
        .select(`
          *,
          user:users(full_name, email, created_at)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Load stats for each vendor
      const vendorsWithStats = await Promise.all(
        (data || []).map(async (vendor) => {
          const [productsResult, ordersResult] = await Promise.all([
            supabase
              .from('products')
              .select('id', { count: 'exact', head: true })
              .eq('vendor_id', vendor.id),
            supabase
              .from('orders')
              .select('total_amount')
              .eq('vendor_id', vendor.id)
          ]);

          const totalEarnings = ordersResult.data?.reduce((sum, order) => sum + order.total_amount, 0) || 0;

          return {
            ...vendor,
            stats: {
              totalProducts: productsResult.count || 0,
              totalOrders: ordersResult.data?.length || 0,
              totalEarnings
            }
          };
        })
      );

      setVendors(vendorsWithStats);
    } catch (error) {
      console.error('Error loading vendors:', error);
      toast.error('Failed to load vendors');
    } finally {
      setLoading(false);
    }
  };

  const approveVendor = async (vendorId: string) => {
    try {
      const { error } = await supabase
        .from('vendors')
        .update({ is_approved: true })
        .eq('id', vendorId);

      if (error) throw error;
      
      toast.success('Vendor approved successfully');
      loadVendors();
    } catch (error) {
      console.error('Error approving vendor:', error);
      toast.error('Failed to approve vendor');
    }
  };

  const rejectVendor = async (vendorId: string) => {
    if (!confirm('Are you sure you want to reject this vendor? This action cannot be undone.')) return;

    try {
      const { error } = await supabase
        .from('vendors')
        .delete()
        .eq('id', vendorId);

      if (error) throw error;
      
      toast.success('Vendor rejected and removed');
      loadVendors();
    } catch (error) {
      console.error('Error rejecting vendor:', error);
      toast.error('Failed to reject vendor');
    }
  };

  const suspendVendor = async (vendorId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('vendors')
        .update({ is_approved: !currentStatus })
        .eq('id', vendorId);

      if (error) throw error;
      
      toast.success(`Vendor ${!currentStatus ? 'activated' : 'suspended'} successfully`);
      loadVendors();
    } catch (error) {
      console.error('Error updating vendor status:', error);
      toast.error('Failed to update vendor status');
    }
  };

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.business_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.user?.full_name?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'approved' && vendor.is_approved) ||
                         (statusFilter === 'pending' && !vendor.is_approved);

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: vendors.length,
    approved: vendors.filter(v => v.is_approved).length,
    pending: vendors.filter(v => !v.is_approved).length,
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
        <h1 className="text-3xl font-heading font-bold text-gray-900">Vendor Management</h1>
        <p className="text-gray-600">Manage vendor applications and accounts</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Vendors</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <UserCheck className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Approval</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
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
                placeholder="Search vendors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Vendors</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending Approval</option>
          </select>
        </div>
      </div>

      {/* Vendors Table */}
      {filteredVendors.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <UserCheck className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No vendors found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Business
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Products
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
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
                {filteredVendors.map((vendor, index) => (
                  <motion.tr
                    key={vendor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                          <Building className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {vendor.business_name}
                          </div>
                          <div className="text-sm text-gray-500">{vendor.business_email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{vendor.user?.full_name}</div>
                      <div className="text-sm text-gray-500">{vendor.user?.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{vendor.business_phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {vendor.stats?.totalProducts || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        vendor.is_approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {vendor.is_approved ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDateTime(vendor.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedVendor(vendor)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {!vendor.is_approved ? (
                          <>
                            <button
                              onClick={() => approveVendor(vendor.id)}
                              className="text-green-600 hover:text-green-900 text-xs px-2 py-1 border border-green-600 rounded"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => rejectVendor(vendor.id)}
                              className="text-red-600 hover:text-red-900 text-xs px-2 py-1 border border-red-600 rounded"
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => suspendVendor(vendor.id, vendor.is_approved)}
                            className="text-red-600 hover:text-red-900 text-xs px-2 py-1 border border-red-600 rounded"
                          >
                            Suspend
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Vendor Detail Modal */}
      {selectedVendor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Vendor Details</h3>
              <button
                onClick={() => setSelectedVendor(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Building className="h-5 w-5 mr-2" />
                    Business Information
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Business Name:</span>
                      <p className="text-gray-900">{selectedVendor.business_name}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Business Email:</span>
                      <p className="text-gray-900">{selectedVendor.business_email}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Business Phone:</span>
                      <p className="text-gray-900">{selectedVendor.business_phone}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Business Address:</span>
                      <p className="text-gray-900">{selectedVendor.business_address}</p>
                    </div>
                    {selectedVendor.business_description && (
                      <div>
                        <span className="font-medium text-gray-700">Description:</span>
                        <p className="text-gray-900">{selectedVendor.business_description}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <UserCheck className="h-5 w-5 mr-2" />
                    Account Owner
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Full Name:</span>
                      <p className="text-gray-900">{selectedVendor.user?.full_name}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Email:</span>
                      <p className="text-gray-900">{selectedVendor.user?.email}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Account Created:</span>
                      <p className="text-gray-900">{formatDateTime(selectedVendor.user?.created_at)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Business Statistics</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-600">Total Products</p>
                          <p className="text-2xl font-bold text-blue-900">{selectedVendor.stats?.totalProducts || 0}</p>
                        </div>
                        <Package className="h-8 w-8 text-blue-500" />
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-green-600">Total Orders</p>
                          <p className="text-2xl font-bold text-green-900">{selectedVendor.stats?.totalOrders || 0}</p>
                        </div>
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      </div>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-purple-600">Total Earnings</p>
                          <p className="text-2xl font-bold text-purple-900">
                            ₦{(selectedVendor.stats?.totalEarnings || 0).toLocaleString()}
                          </p>
                        </div>
                        <DollarSign className="h-8 w-8 text-purple-500" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Status & Dates</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Status:</span>
                      <div className="mt-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          selectedVendor.is_approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {selectedVendor.is_approved ? 'Approved' : 'Pending Approval'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Application Date:</span>
                      <p className="text-gray-900">{formatDateTime(selectedVendor.created_at)}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Last Updated:</span>
                      <p className="text-gray-900">{formatDateTime(selectedVendor.updated_at)}</p>
                    </div>
                  </div>
                </div>

                {!selectedVendor.is_approved && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h5 className="font-medium text-yellow-800 mb-2">Pending Actions</h5>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          approveVendor(selectedVendor.id);
                          setSelectedVendor(null);
                        }}
                        className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600 transition-colors"
                      >
                        Approve Vendor
                      </button>
                      <button
                        onClick={() => {
                          rejectVendor(selectedVendor.id);
                          setSelectedVendor(null);
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600 transition-colors"
                      >
                        Reject Application
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVendorsPage;