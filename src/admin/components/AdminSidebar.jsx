import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, Stethoscope, FileText, Star,
  Image, Settings, ChevronLeft, ChevronRight, X, LogOut, Briefcase, Users2, Calendar, Radio, HeartHandshake,
  BadgeCheck
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

const NAV_ITEMS = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { path: '/admin/marquee', label: 'Marquee News', icon: Radio },
  { path: '/admin/events', label: 'Upcoming Events', icon: Calendar },
  { path: '/admin/camps', label: 'Camps', icon: HeartHandshake },
  { path: '/admin/staff-profiles', label: 'Staff Profiles', icon: BadgeCheck },
  { path: '/admin/doctors', label: 'Doctors', icon: Users },
  { path: '/admin/treatments', label: 'Treatments', icon: Stethoscope },
  { path: '/admin/blog', label: 'Blog', icon: FileText },
  { path: '/admin/reviews', label: 'Reviews', icon: Star },
  { path: '/admin/gallery', label: 'Gallery', icon: Image },
  { path: '/admin/careers', label: 'Careers', icon: Briefcase },
  { path: '/admin/team',    label: 'Team',    icon: Users2 },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const location = useLocation();
  const { logout } = useAdminAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full bg-slate-900 border-r border-slate-800 z-50
          flex flex-col transition-all duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          ${collapsed ? 'lg:w-[72px]' : 'lg:w-[260px]'}
          w-[260px]
        `}
      >
        {/* Logo / Brand */}
        <div className={`h-16 flex items-center border-b border-slate-800 shrink-0 ${collapsed ? 'justify-center px-2' : 'px-5'}`}>
          {!collapsed ? (
            <div className="flex items-center gap-2.5">
              <img src="/images/logo/jerush-logo.webp" alt="Jerush Logo" className="h-7 w-auto object-contain brightness-0 invert" />
              <div className="text-left">
                <h1 className="font-headline font-extrabold text-xs text-white tracking-tight leading-none">JERUSH</h1>
                <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Control Panel</p>
              </div>
            </div>
          ) : (
            <img src="/images/logo/jerush-logo.webp" alt="J" className="w-7 h-7 object-contain brightness-0 invert" />
          )}

          {/* Mobile close */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden ml-auto text-slate-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive
                  ? 'bg-brandBlue/15 text-brandSky border border-brandBlue/20 shadow-sm shadow-brandBlue/5'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
                }
                ${collapsed ? 'justify-center px-2' : ''}
              `}
            >
              <item.icon className={`w-[18px] h-[18px] shrink-0 ${collapsed ? '' : ''}`} />
              {!collapsed && <span className="font-headline font-bold text-[13px]">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className={`border-t border-slate-800 p-3 space-y-2`}>
          {/* Collapse Toggle (desktop only) */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center w-full py-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-all text-xs gap-2"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span className="font-medium">Collapse</span>
              </>
            )}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 ${collapsed ? 'justify-center px-2' : ''}`}
          >
            <LogOut className="w-[18px] h-[18px] shrink-0" />
            {!collapsed && <span className="font-headline font-bold text-[13px]">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
