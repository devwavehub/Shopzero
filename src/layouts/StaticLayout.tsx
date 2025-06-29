import React from 'react';
import { Outlet } from 'react-router-dom';
import StaticHeader from '../components/layout/StaticHeader';
import StaticFooter from '../components/layout/StaticFooter';

const StaticLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <StaticHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <StaticFooter />
    </div>
  );
};

export default StaticLayout;