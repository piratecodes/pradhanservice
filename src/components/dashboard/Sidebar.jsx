import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchClient } from '@/api/fetchClient';
import {  LayoutDashboard,  Users,  MapPin,  FileText, PackageSearch,  Image as ImageIcon,  Settings,  ShieldAlert, Truck, BookOpen } from 'lucide-react';

export default function Sidebar() {
  // Default to the lowest permission level while loading to be safe
  const [role, setRole] = useState('SALES_AGENT'); 

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const res = await fetchClient('/auth/me');
        const me = res.data?.admin || res.data?.user;
        if (me && me.role) {
          setRole(me.role);
        }
      } catch (error) {
        console.error("Could not verify role for sidebar", error);
      }
    };
    fetchUserRole();
  }, []);

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
    <aside className="w-64 bg-primary text-white flex flex-col h-full shadow-2xl z-20 hidden md:flex">
      {/* Brand Header */}
      <div className="h-16 flex items-center gap-3 px-6 bg-black/10 border-b border-white/10 shrink-0">
        <Truck className="text-secondary" size={24} />
        <span className="font-extrabold text-lg tracking-wide">Pradhan Services</span>
      </div>
      {console.log("role: ", role)}
      {/* Navigation Links */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        {visibleNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
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
  );
}