import React from 'react';
import { Outlet } from 'react-router-dom';
import CustomerHeader from '../components/layout/CustomerHeader';
import CustomerFooter from '../components/layout/CustomerFooter';
import CartSidebar from '../components/cart/CartSidebar';

const CustomerLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <CustomerHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <CustomerFooter />
      <CartSidebar />
    </div>
  );
};

export default CustomerLayout;