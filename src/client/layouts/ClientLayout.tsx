import React from 'react';
import { Outlet } from 'react-router-dom';
import { TabNavigation } from '../components/TabNavigation';
import { ScrollToTop } from '../components/ScrollToTop';

export const ClientLayout = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 pb-20 max-w-md mx-auto relative shadow-2xl">
      <ScrollToTop />
      <main>
        <Outlet />
      </main>
      <TabNavigation />
    </div>
  );
};
