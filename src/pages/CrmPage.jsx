import { useState, useEffect } from 'react';
import { fetchClient } from '@/api/fetchClient';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import useDocumentMeta from '@/hooks/useDocumentMeta';

import LeadsHeader from '@/components/leads/LeadsHeader';
import LeadsTable from '@/components/leads/LeadsTable';
import LeadSlideOver from '@/components/leads/LeadSlideOver';

export default function CrmPage() {
  //Title & Description for SEO (and nice browser tab titles!)
  useDocumentMeta("CRM | Pradhan Services", "Manage and track all your leads in one place.");

  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Slide-Over State
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  // 1. Fetch leads when the page loads
  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetchClient('/leads');
      setLeads(response.data.leads);
    } catch (error) {
      toast.error('Failed to load leads from the server.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Handle Status Dropdown changes from the Table
  const handleStatusChange = async (leadId, newStatus) => {
    // Optimistic UI Update: Change it immediately on screen so it feels blazing fast
    const originalLeads = [...leads];
    setLeads(leads.map(lead => lead._id === leadId ? { ...lead, status: newStatus } : lead));

    try {
      // Hit your Node.js API to save it
      await fetchClient(`/leads/${leadId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      });
      toast.success(`Lead status moved to ${newStatus}`);
    } catch (error) {
      // If it fails, revert the UI back to how it was
      setLeads(originalLeads);
      toast.error(error.message || 'Failed to update status');
    }
  };

  // 3. Open the Slide-Over Drawer
  const openSlideOver = (lead) => {
    setSelectedLead(lead);
    setIsSlideOverOpen(true);
  };

  // 4. When notes are saved inside the Drawer, update the table data silently
  const handleLeadUpdated = (updatedLead) => {
    setLeads(leads.map(lead => lead._id === updatedLead._id ? updatedLead : lead));
  };

  // 5. Delete Lead Handler
  const handleDeleteLead = async (leadId) => {
    // Add a quick confirmation so users don't misclick and lose data!
    if (!window.confirm("Are you sure you want to delete this lead? This action cannot be undone.")) return;

    try {
      await fetchClient(`/leads/${leadId}`, {
        method: 'DELETE',
      });
      
      // Remove it from the local state so it vanishes from the table instantly
      setLeads(leads.filter((lead) => lead._id !== leadId));
      toast.success('Lead permanently deleted.');
    } catch (error) {
      toast.error(error.message || 'Failed to delete lead');
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <LeadsHeader />

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <Loader2 className="animate-spin text-primary mb-4" size={40} />
          <p className="text-gray-500 font-bold tracking-wide">Decrypting Pipeline Data...</p>
        </div>
      ) : (
        <LeadsTable 
          leads={leads} 
          onOpenSlideOver={openSlideOver} 
          onStatusChange={handleStatusChange} 
          onDeleteLead={handleDeleteLead}
        />
      )}

      {/* The Headless UI Drawer sits hidden here until `isSlideOverOpen` becomes true */}
      <LeadSlideOver 
        isOpen={isSlideOverOpen} 
        setIsOpen={setIsSlideOverOpen} 
        lead={selectedLead}
        onLeadUpdated={handleLeadUpdated}
      />
    </div>
  );
}