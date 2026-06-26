import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { X, Save, Loader2, Tag } from 'lucide-react';
import { fetchClient } from '@/api/fetchClient';
import toast from 'react-hot-toast';

// We add the list so the Dashboard can use a dropdown if needed!
const SERVICE_TYPES = [
  { id: 'packers-and-movers', label: 'Packers & Movers' },
  { id: 'storage-solutions', label: 'Storage Solutions' },
  { id: 'car-transportation', label: 'Car Transportation' },
  { id: 'bike-transportation', label: 'Bike Transportation' },
  // { id: 'car-and-bike-transport', label: 'Car & Bike' },
  // { id: 'office-relocation', label: 'Office Relocation' },
  // { id: 'fine-art-movement', label: 'Fine Art Movement' },
  // { id: 'transport-and-logistics', label: 'Transport & Logistics' },
  // { id: 'factory-moving', label: 'Factory Moving' },
  // { id: 'defence-relocation-service', label: 'Defence Relocation' },
  // { id: 'home-appliance-uninstall-and-install', label: 'Appliance Setup' },
  // { id: 'after-shifting-services', label: 'After Shifting' }
];

export default function CategoryModal({ isOpen, setIsOpen, categoryData, activeServiceId, onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    categoryName: '',
    serviceType: 'packers-and-movers', // Default for Dashboard quick-add
    priceStartingFrom: '',
    description: '',
    order: 0
  });

  useEffect(() => {
    if (categoryData) {
      setFormData({
        categoryName: categoryData.categoryName || '',
        serviceType: categoryData.serviceType || 'packers-and-movers',
        priceStartingFrom: categoryData.priceStartingFrom || '',
        description: categoryData.description || '',
        order: categoryData.order || 0
      });
    } else {
      setFormData({ categoryName: '', serviceType: 'packers-and-movers', priceStartingFrom: '', description: '', order: 0 });
    }
  }, [categoryData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      categoryName: formData.categoryName,
      // SMART LOGIC: Use the prop if it exists (from Services page), otherwise use the dropdown value (from Dashboard)
      serviceType: activeServiceId || formData.serviceType, 
      priceStartingFrom: Number(formData.priceStartingFrom),
      description: formData.description,
      order: Number(formData.order)
    };

    try {
      if (categoryData) {
        await fetchClient(`/service-options/${categoryData.id}`, { method: 'PATCH', body: JSON.stringify(payload) });
        toast.success('Category updated successfully');
      } else {
        await fetchClient('/service-options', { method: 'POST', body: JSON.stringify(payload) });
        toast.success('New category added');
      }
      if (onSuccess) onSuccess();
      setIsOpen(false);
    } catch (error) {
      toast.error(error.message || 'Failed to save category');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[60]" onClose={() => setIsOpen(false)}>
        <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-primary/40 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                
                <div className="bg-primary px-6 py-4 text-white flex items-center justify-between">
                  <DialogTitle className="text-lg font-extrabold tracking-tight flex items-center gap-2">
                    <Tag size={18} className="text-secondary" />
                    {categoryData ? 'Edit Category' : 'Quick Add Category'}
                  </DialogTitle>
                  <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  
                  {/* SMART UI: Only show this dropdown if we are on the Dashboard (activeServiceId is missing) */}
                  {!activeServiceId && (
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Select Parent Service <span className="text-red-500">*</span></label>
                      <select required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none font-bold text-primary" value={formData.serviceType} onChange={(e) => setFormData({...formData, serviceType: e.target.value})}>
                        {SERVICE_TYPES.map(service => (
                          <option key={service.id} value={service.id}>{service.label}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Category Name (e.g., 1BHK, SUV) <span className="text-red-500">*</span></label>
                    <input type="text" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" value={formData.categoryName} onChange={(e) => setFormData({...formData, categoryName: e.target.value})} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Starting Price (₹)</label>
                      <input type="number" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" value={formData.priceStartingFrom} onChange={(e) => setFormData({...formData, priceStartingFrom: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Display Order</label>
                      <input type="number" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" value={formData.order} onChange={(e) => setFormData({...formData, order: e.target.value})} placeholder="e.g. 1" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Short Description</label>
                    <textarea rows="2" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                  </div>

                  <div className="pt-4 mt-2 border-t border-gray-100">
                    <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center gap-2 bg-primary hover:bg-[#112440] disabled:bg-primary/50 text-white font-bold py-3 rounded-xl transition-all">
                      {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                      {categoryData ? 'Update Category' : 'Save Category'}
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