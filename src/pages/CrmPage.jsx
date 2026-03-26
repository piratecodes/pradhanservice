import { useState, useEffect } from 'react';
import { fetchClient } from '@/api/fetchClient';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import useDocumentMeta from '@/hooks/useDocumentMeta';

import LeadsHeader from '@/components/leads/LeadsHeader';
import LeadsTable from '@/components/leads/LeadsTable';
import LeadSlideOver from '@/components/leads/LeadSlideOver';

export default function CrmPage() {
  useDocumentMeta("CRM | Pradhan Services", "Manage and track all your leads in one place.");

  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // 👇 NEW: Search & Filter State 👇
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [serviceFilter, setServiceFilter] = useState('All');
  
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetchClient('/leads');
      setLeads(response.data.leads || []);
    } catch (error) {
      toast.error('Failed to load leads from the server.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (leadId, newStatus) => {
    const originalLeads = [...leads];
    setLeads(leads.map(lead => lead._id === leadId ? { ...lead, status: newStatus } : lead));

    try {
      await fetchClient(`/leads/${leadId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      });
      toast.success(`Lead status moved to ${newStatus}`);
    } catch (error) {
      setLeads(originalLeads);
      toast.error(error.message || 'Failed to update status');
    }
  };

  const openSlideOver = (lead) => {
    setSelectedLead(lead);
    setIsSlideOverOpen(true);
  };

  const handleLeadUpdated = (updatedLead) => {
    setLeads(leads.map(lead => lead._id === updatedLead._id ? updatedLead : lead));
  };

  const handleDeleteLead = async (leadId) => {
    if (!window.confirm("Are you sure you want to delete this lead? This action cannot be undone.")) return;

    try {
      await fetchClient(`/leads/${leadId}`, { method: 'DELETE' });
      setLeads(leads.filter((lead) => lead._id !== leadId));
      toast.success('Lead permanently deleted.');
    } catch (error) {
      toast.error(error.message || 'Failed to delete lead');
    }
  };

  // 👇 NEW: The Filter Engine 👇
  const filteredLeads = leads.filter((lead) => {
    // 1. Search Query Match
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      (lead.customerName && lead.customerName.toLowerCase().includes(query)) ||
      (lead.customerPhone && lead.customerPhone.toLowerCase().includes(query)) ||
      (lead.originCity && lead.originCity.toLowerCase().includes(query)) ||
      (lead.destinationCity && lead.destinationCity.toLowerCase().includes(query));

    // 2. Status Match
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;

    // 3. Service Match
    const matchesService = serviceFilter === 'All' || lead.serviceRequested === serviceFilter;

    return matchesSearch && matchesStatus && matchesService;
  });

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* 👇 Pass state to Header 👇 */}
      <LeadsHeader 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        serviceFilter={serviceFilter}
        onServiceFilterChange={setServiceFilter}
      />

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <Loader2 className="animate-spin text-primary mb-4" size={40} />
          <p className="text-gray-500 font-bold tracking-wide">Decrypting Pipeline Data...</p>
        </div>
      ) : (
        <LeadsTable 
          leads={filteredLeads} // 👈 Feed filtered data to Table
          onOpenSlideOver={openSlideOver} 
          onStatusChange={handleStatusChange} 
          onDeleteLead={handleDeleteLead}
          isFiltering={searchQuery !== '' || statusFilter !== 'All' || serviceFilter !== 'All'}
        />
      )}

      <LeadSlideOver 
        isOpen={isSlideOverOpen} 
        setIsOpen={setIsSlideOverOpen} 
        lead={selectedLead}
        onLeadUpdated={handleLeadUpdated}
      />
    </div>
  );
}