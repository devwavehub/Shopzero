import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  UserCheck,
  Zap,
  Settings,
  Store
} from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin-dashboard' },
    { icon: Package, label: 'Products', path: '/admin-dashboard/products' },
    { icon: UserCheck, label: 'Vendors', path: '/admin-dashboard/vendors' },
    { icon: ShoppingCart, label: 'Orders', path: '/admin-dashboard/orders' },
    { icon: Users, label: 'Users', path: '/admin-dashboard/users' },
    { icon: Zap, label: 'Flash Sales', path: '/admin-dashboard/flash-sales' },
    { icon: Settings, label: 'Settings', path: '/admin-dashboard/settings' },
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
        <p className="text-sm text-gray-500 mt-1">Admin Panel</p>
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

export default AdminSidebar;