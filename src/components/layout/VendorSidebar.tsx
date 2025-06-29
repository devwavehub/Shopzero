import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  Settings, 
  MessageSquare,
  Store,
  Plus
} from 'lucide-react';

const VendorSidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/vendor-dashboard' },
    { icon: Package, label: 'Products', path: '/vendor-dashboard/products' },
    { icon: ShoppingCart, label: 'Orders', path: '/vendor-dashboard/orders' },
    { icon: DollarSign, label: 'Earnings', path: '/vendor-dashboard/earnings' },
    { icon: MessageSquare, label: 'Messages', path: '/vendor-dashboard/messages' },
    { icon: Settings, label: 'Settings', path: '/vendor-dashboard/settings' },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-primary-500 text-white p-2 rounded-lg">
            <Store className="h-6 w-6" />
          </div>
          <span className="text-xl font-heading font-bold text-accent-500">
            Shop<span className="text-primary-500">zero</span>
          </span>
        </Link>
        <p className="text-sm text-gray-500 mt-1">Vendor Dashboard</p>
      </div>

      {/* Quick Action */}
      <div className="p-4 border-b">
        <Link
          to="/vendor-dashboard/products/new"
          className="w-full bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-500'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        <Link
          to="/"
          className="text-sm text-gray-500 hover:text-primary-500 transition-colors"
        >
          ← Back to Store
        </Link>
      </div>
    </div>
  );
};

export default VendorSidebar;