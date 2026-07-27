import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { fetchClient } from '@/api/fetchClient';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { LayoutDashboard, Users, MapPin, FileText, PackageSearch, Image as ImageIcon, Settings, ShieldAlert, Truck, BookOpen, X } from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const { user: admin } = useAuth();

  // Default to the lowest permission level while loading to be safe
  const role = admin?.role || 'SALES_AGENT';

  // 🛡️ ROLE-BASED ACCESS CONTROL FOR THE MENU
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard, allowed: ['SUPER_ADMIN', 'ADMIN', 'SALES_AGENT'] },
    { name: 'CRM (Leads)', path: '/crm', icon: Users, allowed: ['SUPER_ADMIN', 'ADMIN', 'SALES_AGENT'] },
    { name: 'The Network', path: '/cities', icon: MapPin, allowed: ['SUPER_ADMIN', 'ADMIN', 'SALES_AGENT'] },
    { name: 'SEO Pages', path: '/seo-pages', icon: FileText, allowed: ['SUPER_ADMIN', 'ADMIN'] }, 
    { name: 'Blogs', path: '/blogs', icon: BookOpen, allowed: ['SUPER_ADMIN', 'ADMIN'] }, 
    { name: 'Fleet & Services', path: '/services', icon: PackageSearch, allowed: ['SUPER_ADMIN', 'ADMIN', 'SALES_AGENT'] },
    { name: 'Media Gallery', path: '/gallery', icon: ImageIcon, allowed: ['SUPER_ADMIN', 'ADMIN', 'SALES_AGENT'] },
    
    // 👇 STRICTLY FOR ADMINS & SUPER-ADMINS 👇
    { name: 'Company Settings', path: '/settings', icon: Settings, allowed: ['SUPER_ADMIN', 'ADMIN'] },
    { name: 'Staff & Team', path: '/team', icon: ShieldAlert, allowed: ['SUPER_ADMIN', 'ADMIN'] },
  ];

  // Filter out any pages the current user is not allowed to see
  const visibleNavItems = navItems.filter(item => item.allowed.includes(role));

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity" 
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside 
        className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-primary text-white flex flex-col h-full shadow-2xl z-50 md:z-20`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-6 bg-black/10 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <Truck className="text-secondary" size={24} />
            <span className="font-extrabold text-lg tracking-wide">Pradhan Services</span>
          </div>
          <button 
            className="md:hidden p-1 text-gray-300 hover:text-white transition-colors focus:outline-none" 
            onClick={() => setIsOpen(false)}
            aria-label="Close Sidebar"
          >
            <X size={20} />
          </button>
        </div>
      {console.log("role: ", role)}
      {/* Navigation Links */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        {visibleNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-xl transition-all font-medium ${
                isActive 
                  ? 'bg-white/10 text-secondary shadow-sm' 
                  : 'text-gray-300 hover:bg-white/5 hover:text-white' 
              }`
            }
          >
            <item.icon size={20} />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* 🌟 UPGRADED Footer Area */}
      <div className="p-5 border-t border-white/10 bg-black/20 shrink-0">
        <div className="flex flex-col items-center justify-center text-center gap-2">
          <p className="text-[11px] text-gray-400 font-medium">
            &copy; {new Date().getFullYear()} Pradhan Services. <br /> All rights reserved.
          </p>
          <div className="w-8 h-[1px] bg-white/10 my-1"></div>
          <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
            Developed By
          </p>
          <a 
            href="https://straxcel.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xs font-bold text-gray-300 hover:text-secondary transition-colors"
          >
            Straxcel Business Solutions
          </a>
        </div>
      </div>
      </aside>
    </>
  );
}