import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Plus, 
  Edit, 
  Trash2, 
  Calendar, 
  Clock,
  Package,
  DollarSign,
  Eye,
  EyeOff
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { formatPrice, formatDateTime } from '../../utils/helpers';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

const AdminFlashSalesPage: React.FC = () => {
  const [flashSales, setFlashSales] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    product_id: '',
    flash_sale_price: '',
    flash_sale_end: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load flash sale products
      const { data: flashSaleData, error: flashError } = await supabase
        .from('products')
        .select(`
          *,
          vendor:vendors(business_name)
        `)
        .eq('is_flash_sale', true)
        .order('flash_sale_end', { ascending: true });

      if (flashError) throw flashError;

      // Load all active products for the dropdown
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select(`
          id,
          name,
          price,
          vendor:vendors(business_name)
        `)
        .eq('is_active', true)
        .order('name');

      if (productsError) throw productsError;

      setFlashSales(flashSaleData || []);
      setProducts(productsData || []);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load flash sales data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      const updateData = {
        is_flash_sale: true,
        flash_sale_price: parseFloat(formData.flash_sale_price),
        flash_sale_end: formData.flash_sale_end,
      };

      if (editingItem) {
        const { error } = await supabase
          .from('products')
          .update(updateData)
          .eq('id', editingItem.id);

        if (error) throw error;
        toast.success('Flash sale updated successfully!');
      } else {
        const { error } = await supabase
          .from('products')
          .update(updateData)
          .eq('id', formData.product_id);

        if (error) throw error;
        toast.success('Flash sale created successfully!');
      }

      setShowModal(false);
      setEditingItem(null);
      setFormData({ product_id: '', flash_sale_price: '', flash_sale_end: '' });
      loadData();
    } catch (error) {
      console.error('Error saving flash sale:', error);
      toast.error('Failed to save flash sale');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      product_id: item.id,
      flash_sale_price: item.flash_sale_price?.toString() || '',
      flash_sale_end: item.flash_sale_end ? item.flash_sale_end.slice(0, 16) : '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this flash sale?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .update({
          is_flash_sale: false,
          flash_sale_price: null,
          flash_sale_end: null,
        })
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Flash sale removed successfully!');
      loadData();
    } catch (error) {
      console.error('Error removing flash sale:', error);
      toast.error('Failed to remove flash sale');
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_flash_sale: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      
      toast.success(`Flash sale ${!currentStatus ? 'activated' : 'deactivated'}!`);
      loadData();
    } catch (error) {
      console.error('Error toggling flash sale status:', error);
      toast.error('Failed to update flash sale status');
    }
  };

  const isExpired = (endDate: string) => {
    return new Date(endDate) < new Date();
  };

  if (loading && flashSales.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900">Flash Sales</h1>
          <p className="text-gray-600">Manage time-limited product deals</p>
        </div>
        <button
          onClick={() => {
            setEditingItem(null);
            setFormData({ product_id: '', flash_sale_price: '', flash_sale_end: '' });
            setShowModal(true);
          }}
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Create Flash Sale</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Flash Sales</p>
              <p className="text-2xl font-bold text-gray-900">
                {flashSales.filter(item => !isExpired(item.flash_sale_end)).length}
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <Zap className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Expired Sales</p>
              <p className="text-2xl font-bold text-gray-900">
                {flashSales.filter(item => isExpired(item.flash_sale_end)).length}
              </p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{flashSales.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Discount</p>
              <p className="text-2xl font-bold text-gray-900">
                {flashSales.length > 0 
                  ? Math.round(flashSales.reduce((acc, item) => 
                      acc + ((item.price - item.flash_sale_price) / item.price * 100), 0
                    ) / flashSales.length)
                  : 0}%
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Flash Sales Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Flash Sale Products</h2>
        </div>
        
        {flashSales.length === 0 ? (
          <div className="text-center py-12">
            <Zap className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No flash sales yet</h3>
            <p className="text-gray-600">Create your first flash sale to boost sales</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vendor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Original Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sale Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Discount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ends At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {flashSales.map((item, index) => {
                  const discount = Math.round(((item.price - item.flash_sale_price) / item.price) * 100);
                  const expired = isExpired(item.flash_sale_end);
                  
                  return (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={item.images[0] || 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg'}
                            alt={item.name}
                            className="w-10 h-10 rounded object-cover mr-3"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900 line-clamp-1">
                              {item.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.vendor?.business_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatPrice(item.price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                        {formatPrice(item.flash_sale_price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {discount}% OFF
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDateTime(item.flash_sale_end)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          expired 
                            ? 'bg-red-100 text-red-800' 
                            : item.is_flash_sale 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                        }`}>
                          {expired ? 'Expired' : item.is_flash_sale ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleStatus(item.id, item.is_flash_sale)}
                            className="text-blue-600 hover:text-blue-900"
                            title={item.is_flash_sale ? 'Deactivate' : 'Activate'}
                          >
                            {item.is_flash_sale ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingItem ? 'Edit Flash Sale' : 'Create Flash Sale'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {!editingItem && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product
                  </label>
                  <select
                    name="product_id"
                    value={formData.product_id}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    <option value="">Select a product</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} - {formatPrice(product.price)} ({product.vendor?.business_name})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Flash Sale Price
                </label>
                <input
                  type="number"
                  name="flash_sale_price"
                  value={formData.flash_sale_price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter sale price"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="flash_sale_end"
                  value={formData.flash_sale_end}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {loading ? <LoadingSpinner size="sm" /> : (editingItem ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFlashSalesPage;