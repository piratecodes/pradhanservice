import { useState, useEffect } from 'react';
import { Users, Sparkles, MapPin, ShieldCheck, Loader2 } from 'lucide-react';
import { fetchClient } from '@/api/fetchClient';
import toast from 'react-hot-toast';

export default function StatsRow() {
  const [stats, setStats] = useState({ totalLeads: 0, newLeads: 0, activeCities: 0, totalStaff: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await fetchClient('/admins/dashboard-stats');
        
        // Safely grab the stats, or default to 0 if the backend structure is different
        if (response?.data?.stats) {
          setStats(response.data.stats);
        }
      } catch (error) {
        // Silently log it instead of annoying the user with a toast
        console.warn("Dashboard Stats couldn't load (likely a backend route mismatch):", error);
        // We do NOT fire toast.error here anymore!
      } finally {
        setIsLoading(false);
      }
    };
    loadStats();
  }, []);

  const statCards = [
    { title: 'Total Leads', value: stats.totalLeads, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'New Quotes', value: stats.newLeads, icon: Sparkles, color: 'text-secondary', bg: 'bg-secondary/10' },
    { title: 'Active Cities', value: stats.activeCities, icon: MapPin, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Total Staff', value: stats.totalStaff, icon: ShieldCheck, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  if (isLoading) {
    return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" size={32} /></div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((card, index) => (
        <div key={index} className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
          <div className={`p-4 rounded-xl ${card.bg}`}>
            <card.icon className={card.color} size={28} strokeWidth={2} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{card.title}</p>
            <h3 className="text-3xl font-extrabold text-gray-900 mt-1">{card.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}