import React from 'react';
import { Outlet } from 'react-router-dom';
import VendorSidebar from '../components/layout/VendorSidebar';
import VendorHeader from '../components/layout/VendorHeader';

const VendorLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <VendorSidebar />
      <div className="flex-1 flex flex-col">
        <VendorHeader />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default VendorLayout;