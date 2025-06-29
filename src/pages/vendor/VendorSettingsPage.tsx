import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Save, 
  Building, 
  Mail, 
  Phone, 
  MapPin,
  Upload,
  X
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { supabase } from '../../lib/supabase';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

const VendorSettingsPage: React.FC = () => {
  const { vendor, user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [bannerPreview, setBannerPreview] = useState<string>('');
  const [formData, setFormData] = useState({
    business_name: '',
    business_email: '',
    business_phone: '',
    business_address: '',
    business_description: '',
  });

  useEffect(() => {
    if (vendor) {
      setFormData({
        business_name: vendor.business_name || '',
        business_email: vendor.business_email || '',
        business_phone: vendor.business_phone || '',
        business_address: vendor.business_address || '',
        business_description: vendor.business_description || '',
      });
      setLogoPreview(vendor.logo_url || '');
      setBannerPreview(vendor.banner_url || '');
    }
  }, [vendor]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'banner') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        if (type === 'logo') {
          setLogoPreview(event.target.result as string);
        } else {
          setBannerPreview(event.target.result as string);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (type: 'logo' | 'banner') => {
    if (type === 'logo') {
      setLogoPreview('');
    } else {
      setBannerPreview('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!vendor) {
      toast.error('Vendor information not found');
      return;
    }

    try {
      setLoading(true);

      const updateData = {
        ...formData,
        logo_url: logoPreview,
        banner_url: bannerPreview,
      };

      const { error } = await supabase
        .from('vendors')
        .update(updateData)
        .eq('id', vendor.id);

      if (error) throw error;

      toast.success('Settings updated successfully!');
    } catch (error) {
      console.error('Error updating vendor settings:', error);
      toast.error('Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-gray-900">Vendor Settings</h1>
        <p className="text-gray-600">Manage your business information and preferences</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Business Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Business Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Name *
              </label>
              <input
                type="text"
                name="business_name"
                value={formData.business_name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Your business name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  name="business_email"
                  value={formData.business_email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="business@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Phone *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="tel"
                  name="business_phone"
                  value={formData.business_phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="+234 800 000 0000"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                <textarea
                  name="business_address"
                  value={formData.business_address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Your business address"
                  required
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Description
              </label>
              <textarea
                name="business_description"
                value={formData.business_description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Tell customers about your business, what you sell, and what makes you unique"
              />
            </div>
          </div>
        </div>

        {/* Branding */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Upload className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Branding</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Logo
              </label>
              <div className="space-y-4">
                {logoPreview ? (
                  <div className="relative">
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="w-32 h-32 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage('logo')}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-gray-300 rounded-lg w-32 h-32 flex flex-col items-center justify-center cursor-pointer hover:border-primary-500 transition-colors">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Upload Logo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'logo')}
                      className="hidden"
                    />
                  </label>
                )}
                <p className="text-sm text-gray-500">
                  Recommended: Square image, 200x200px minimum
                </p>
              </div>
            </div>

            {/* Banner Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Banner
              </label>
              <div className="space-y-4">
                {bannerPreview ? (
                  <div className="relative">
                    <img
                      src={bannerPreview}
                      alt="Banner preview"
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage('banner')}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-gray-300 rounded-lg w-full h-32 flex flex-col items-center justify-center cursor-pointer hover:border-primary-500 transition-colors">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Upload Banner</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'banner')}
                      className="hidden"
                    />
                  </label>
                )}
                <p className="text-sm text-gray-500">
                  Recommended: 1200x400px, showcases your brand
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Owner
              </label>
              <input
                type="text"
                value={user?.full_name || ''}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Email
              </label>
              <input
                type="email"
                value={user?.email || ''}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vendor Status
              </label>
              <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                vendor?.is_approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {vendor?.is_approved ? 'Approved' : 'Pending Approval'}
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Member Since
              </label>
              <input
                type="text"
                value={vendor?.created_at ? new Date(vendor.created_at).toLocaleDateString() : ''}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                disabled
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary-500 text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {loading ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                <Save className="h-5 w-5" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Help Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Need Help?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-1">Business Verification</h4>
            <p>Ensure your business information is accurate for faster approval and customer trust.</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Branding Tips</h4>
            <p>Use high-quality images that represent your brand. Good visuals increase customer confidence.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorSettingsPage;