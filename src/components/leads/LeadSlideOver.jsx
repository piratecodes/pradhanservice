import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { X, MapPin, Phone, Mail, Calendar, Truck, Save, Loader2 } from 'lucide-react';
import { fetchClient } from '@/api/fetchClient';
import toast from 'react-hot-toast';

export default function LeadSlideOver({ isOpen, setIsOpen, lead, onLeadUpdated }) {
  const [adminNotes, setAdminNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Sync local state when a new lead is clicked
  useEffect(() => {
    if (lead) setAdminNotes(lead.adminNotes || '');
  }, [lead]);

  const handleSaveNotes = async () => {
    if (!lead) return;
    setIsSaving(true);
    try {
      const response = await fetchClient(`/leads/${lead._id}`, {
        method: 'PATCH',
        body: JSON.stringify({ adminNotes }),
      });
      toast.success('Notes saved securely');
      onLeadUpdated(response.data.lead); // Tell the table to update its data!
    } catch (error) {
      toast.error('Failed to save notes');
    } finally {
      setIsSaving(false);
    }
  };

  if (!lead) return null;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
        {/* The dark backdrop */}
        <TransitionChild
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-primary/20 backdrop-blur-sm transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              {/* The sliding panel */}
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-300 sm:duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300 sm:duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-2xl">
                    
                    {/* Header */}
                    <div className="bg-primary px-6 py-6 text-white sm:px-8">
                      <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl font-extrabold tracking-tight">
                          Lead Details
                        </DialogTitle>
                        <button
                          type="button"
                          className="rounded-full text-blue-200 hover:text-white hover:bg-white/10 p-2 transition-colors focus:outline-none"
                          onClick={() => setIsOpen(false)}
                        >
                          <X size={24} />
                        </button>
                      </div>
                      <div className="mt-4">
                        <p className="text-2xl font-bold text-secondary">{lead.customerName}</p>
                        <p className="text-blue-100 text-sm mt-1 flex items-center gap-2">
                          <Truck size={14} /> {lead.serviceRequested.replace(/-/g, ' ').toUpperCase()}
                        </p>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="relative flex-1 px-6 py-6 sm:px-8 space-y-8">
                      
                      {/* Contact Info */}
                      <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Contact Information</h3>
                        <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                          <div className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                            <Phone size={16} className="text-primary" /> {lead.customerPhone}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                            <Mail size={16} className="text-primary" /> {lead.customerEmail}
                          </div>
                        </div>
                      </div>

                      {/* Routing Info */}
                      <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Routing & Schedule</h3>
                        <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                          <div className="flex items-start gap-3">
                            <MapPin size={18} className="text-emerald-500 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-500 font-bold">ORIGIN</p>
                              <p className="text-sm font-bold text-gray-900">{lead.originCity}</p>
                            </div>
                          </div>
                          {lead.destinationCity && (
                            <div className="flex items-start gap-3 border-t border-gray-200 pt-3">
                              <MapPin size={18} className="text-red-500 mt-0.5" />
                              <div>
                                <p className="text-xs text-gray-500 font-bold">DESTINATION</p>
                                <p className="text-sm font-bold text-gray-900">{lead.destinationCity}</p>
                              </div>
                            </div>
                          )}
                          {lead.shiftingDate && (
                            <div className="flex items-center gap-3 border-t border-gray-200 pt-3">
                              <Calendar size={18} className="text-secondary" />
                              <p className="text-sm font-bold text-gray-900">
                                {new Date(lead.shiftingDate).toLocaleDateString()}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Dynamic Custom Fields (The Dropdowns the user selected) */}
                      {lead.customFields && Object.keys(lead.customFields).length > 0 && (
                        <div>
                          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Inventory / Specifics</h3>
                          <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 space-y-2">
                            {Object.entries(lead.customFields).map(([key, value]) => (
                              <div key={key} className="flex justify-between text-sm">
                                <span className="font-medium text-gray-600">{key}:</span>
                                <span className="font-bold text-primary">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Customer Comment */}
                      {lead.customerComment && (
                        <div>
                          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Customer Comment</h3>
                          <p className="text-sm text-gray-700 bg-yellow-50 p-4 rounded-xl border border-yellow-100 italic">
                            "{lead.customerComment}"
                          </p>
                        </div>
                      )}

                      {/* Admin Notes */}
                      <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Internal Admin Notes</h3>
                        <textarea
                          rows={4}
                          className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm transition-all resize-none"
                          placeholder="Add private notes for the sales team here..."
                          value={adminNotes}
                          onChange={(e) => setAdminNotes(e.target.value)}
                        />
                        <button
                          onClick={handleSaveNotes}
                          disabled={isSaving || adminNotes === (lead.adminNotes || '')}
                          className="mt-3 w-full bg-gray-900 hover:bg-black disabled:bg-gray-300 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                        >
                          {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                          Save Notes
                        </button>
                      </div>

                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}