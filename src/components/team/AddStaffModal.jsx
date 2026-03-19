import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { X, Save, Loader2, ShieldCheck } from 'lucide-react';
import { fetchClient } from '@/api/fetchClient';
import toast from 'react-hot-toast';

export default function AddStaffModal({ isOpen, setIsOpen, staffData, onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '', username: '', email: '', phone: '', role: 'sales-agent', password: ''
  });

  // Populate or clear form when modal opens
  useEffect(() => {
    if (staffData) {
      setFormData({
        name: staffData.name || '',
        username: staffData.username || '',
        email: staffData.email || '',
        phone: staffData.phone || '',
        role: staffData.role || 'sales-agent',
        password: '' // Kept empty, backend rejects password updates here
      });
    } else {
      setFormData({ name: '', username: '', email: '', phone: '', role: 'sales-agent', password: '' });
    }
  }, [staffData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (staffData) {
        // UPDATE (Remove password from payload so backend doesn't throw an error)
        const { password, ...updateData } = formData;
        await fetchClient(`/admins/${staffData._id}`, { method: 'PATCH', body: JSON.stringify(updateData) });
        toast.success('Staff profile updated');
      } else {
        // CREATE NEW
        await fetchClient('/admins', { method: 'POST', body: JSON.stringify(formData) });
        toast.success('New team member created');
      }
      onSuccess();
      setIsOpen(false);
    } catch (error) {
      toast.error(error.message || 'Failed to save staff member');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
        <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-primary/40 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                
                <div className="bg-primary px-6 py-4 text-white flex items-center justify-between">
                  <DialogTitle className="text-lg font-extrabold tracking-tight flex items-center gap-2">
                    <ShieldCheck size={18} className="text-secondary" />
                    {staffData ? 'Edit Team Member' : 'Add New Staff'}
                  </DialogTitle>
                  <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors"><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                      <input type="text" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Username <span className="text-red-500">*</span></label>
                      <input type="text" required disabled={!!staffData} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none disabled:opacity-50" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                      <input type="email" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Phone <span className="text-red-500">*</span></label>
                      <input type="text" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">System Role <span className="text-red-500">*</span></label>
                      <select required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none font-bold text-gray-700" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
                        <option value="sales-agent">Sales Agent</option>
                        <option value="admin">Manager (Admin)</option>
                        <option value="super-admin">Super Admin (Boss)</option>
                      </select>
                    </div>
                    
                    {/* Only show password if we are creating a NEW user */}
                    {!staffData && (
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Temporary Password <span className="text-red-500">*</span></label>
                        <input type="text" required minLength={8} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder="Min 8 chars" />
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-2 border-t border-gray-100">
                    <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center gap-2 bg-primary hover:bg-[#112440] disabled:bg-primary/50 text-white font-bold py-3.5 rounded-xl transition-all">
                      {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                      {staffData ? 'Update Profile' : 'Create Account'}
                    </button>
                  </div>
                </form>

              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}