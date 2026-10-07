import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminTopbar from '../components/AdminTopbar';

export default function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-body text-left text-slate-850 dark:text-slate-100 transition-colors relative overflow-x-hidden">
      {/* Glassmorphic Background Glow Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 transform-gpu">
        {/* Blob 1: Brand Royal Blue */}
        <div className="absolute -top-[10%] left-[15%] w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full bg-brandBlue/8 dark:bg-brandBlue/12 blur-[100px] sm:blur-[130px] will-change-transform" />
        {/* Blob 2: Brand Sky Blue */}
        <div className="absolute bottom-[10%] -right-[5%] w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-brandSky/8 dark:bg-brandSky/12 blur-[110px] sm:blur-[140px] will-change-transform" />
        {/* Blob 3: Accent Purple */}
        <div className="absolute top-[35%] right-[25%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-purple-500/4 dark:bg-purple-500/8 blur-[90px] sm:blur-[120px] will-change-transform" />
      </div>

      <div className="relative z-20">
        <AdminSidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
      </div>

      {/* Main Content Area */}
      <div
        className={`transition-all duration-300 relative z-10 ${sidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-[260px]'}`}
      >
        <AdminTopbar onMenuClick={() => setMobileOpen(true)} />

        <main className="p-4 lg:p-6 min-h-[calc(100vh-64px)] relative z-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

