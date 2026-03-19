import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Loader2, MapPinned } from 'lucide-react';
import { fetchClient } from '@/api/fetchClient';
import toast from 'react-hot-toast';

export default function RecentLeadsWidget() {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRecentLeads = async () => {
      try {
        // Fetch all leads, but we'll just slice the top 5 for the dashboard
        const response = await fetchClient('/leads');
        setLeads(response.data.leads.slice(0, 5));
      } catch (error) {
        toast.error("Failed to load recent leads.");
      } finally {
        setIsLoading(false);
      }
    };
    loadRecentLeads();
  }, []);

  // Utility to color-code statuses
  const getStatusBadge = (status) => {
    const styles = {
      'New': 'bg-secondary/10 text-secondary border-secondary/20',
      'Contacted': 'bg-blue-50 text-blue-600 border-blue-200',
      'Quoted': 'bg-purple-50 text-purple-600 border-purple-200',
      'Converted': 'bg-emerald-50 text-emerald-600 border-emerald-200',
      'Lost': 'bg-red-50 text-red-600 border-red-200',
    };
    return `px-3 py-1 rounded-full text-xs font-bold border ${styles[status] || styles['New']}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
      
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <h2 className="text-lg font-extrabold text-gray-900">Recent Quote Requests</h2>
        <button 
          onClick={() => navigate('/crm')}
          className="text-sm font-bold text-primary hover:text-secondary flex items-center gap-1 transition-colors"
        >
          View CRM <ArrowRight size={16} />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" size={32} /></div>
        ) : leads.length === 0 ? (
          <div className="p-10 text-center text-gray-500 font-medium">No leads in the pipeline yet.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                <th className="p-4 font-bold">Customer</th>
                <th className="p-4 font-bold">Service</th>
                <th className="p-4 font-bold">Route</th>
                <th className="p-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.map((lead) => (
                <tr key={lead._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-gray-900">{lead.customerName}</p>
                    <p className="text-xs text-gray-500">{lead.customerPhone}</p>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded-md">
                      {lead.serviceRequested.replace(/-/g, ' ')}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                      <MapPinned size={16} className="text-gray-400" />
                      <span>{lead.originCity} {lead.destinationCity ? `→ ${lead.destinationCity}` : ''}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={getStatusBadge(lead.status)}>{lead.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}