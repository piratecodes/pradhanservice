import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchClient } from '@/api/fetchClient';
import { 
  LayoutDashboard, 
  Users, 
  MapPin, 
  FileText,
  PackageSearch, 
  Image as ImageIcon, 
  Settings, 
  ShieldAlert,
  Truck
} from 'lucide-react';

export default function Sidebar() {
  // Default to the lowest permission level while loading to be safe
  const [role, setRole] = useState('sales-agent'); 

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
    { name: 'Dashboard', path: '/', icon: LayoutDashboard, allowed: ['super-admin', 'admin', 'sales-agent'] },
    { name: 'CRM (Leads)', path: '/crm', icon: Users, allowed: ['super-admin', 'admin', 'sales-agent'] },
    { name: 'The Network', path: '/cities', icon: MapPin, allowed: ['super-admin', 'admin', 'sales-agent'] },
    { name: 'SEO Pages', path: '/seo-pages', icon: FileText, allowed: ['super-admin', 'admin'] }, // Protected from sales agents
    { name: 'Fleet & Services', path: '/services', icon: PackageSearch, allowed: ['super-admin', 'admin', 'sales-agent'] },
    { name: 'Media Gallery', path: '/gallery', icon: ImageIcon, allowed: ['super-admin', 'admin', 'sales-agent'] },
    
    // 👇 STRICTLY FOR ADMINS & SUPER-ADMINS 👇
    { name: 'Company Settings', path: '/settings', icon: Settings, allowed: ['super-admin', 'admin'] },
    { name: 'Staff & Team', path: '/team', icon: ShieldAlert, allowed: ['super-admin', 'admin'] },
  ];

  // Filter out any pages the current user is not allowed to see
  const visibleNavItems = navItems.filter(item => item.allowed.includes(role));

  return (
    <aside className="w-64 bg-primary text-white flex flex-col h-full shadow-2xl z-20 hidden md:flex">
      {/* Brand Header */}
      <div className="h-16 flex items-center gap-3 px-6 bg-black/10 border-b border-white/10">
        <Truck className="text-secondary" size={24} />
        <span className="font-extrabold text-lg tracking-wide">Pradhan Services</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
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

      {/* Footer Area */}
      <div className="p-4 border-t border-white/10 text-xs text-gray-400 text-center">
        v1.0.0 &copy; 2026
      </div>
    </aside>
  );
}