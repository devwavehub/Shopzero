import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import LoadingSpinner from '../ui/LoadingSpinner';

interface VendorProtectedRouteProps {
  children: React.ReactNode;
}

const VendorProtectedRoute: React.FC<VendorProtectedRouteProps> = ({ children }) => {
  const { vendor, initialized } = useAuthStore();

  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!vendor) {
    return <Navigate to="/vendor-login" replace />;
  }

  if (!vendor.is_approved) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="bg-yellow-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
            <div className="text-yellow-600 text-2xl">⏳</div>
          </div>
          <h2 className="text-xl font-semibold mb-2">Pending Approval</h2>
          <p className="text-gray-600 mb-4">
            Your vendor application is under review. You'll be notified once approved.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default VendorProtectedRoute;