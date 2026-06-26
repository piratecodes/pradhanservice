import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { X, Save, Loader2, MapPin } from 'lucide-react';
import { fetchClient } from '@/api/fetchClient';
import toast from 'react-hot-toast';

export default function CityFormDrawer({ isOpen, setIsOpen, cityData, onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  
  // 1. STRIPPED DOWN FORM STATE
  const [formData, setFormData] = useState({
    cityName: '',
    citySlug: '',
    subTownsString: ''
  });

  // 2. LOAD DATA (No SEO fields)
  useEffect(() => {
    if (cityData) {
      setFormData({
        cityName: cityData.cityName || '',
        citySlug: cityData.citySlug || '',
        subTownsString: cityData.subTowns ? cityData.subTowns.join(', ') : ''
      });
    } else {
      setFormData({
        cityName: '', citySlug: '', subTownsString: ''
      });
    }
  }, [cityData, isOpen]);

  const handleNameChange = (e) => {
    const name = e.target.value;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setFormData({ ...formData, cityName: name, citySlug: slug });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // 3. CLEAN PAYLOAD (No SEO block)
    const payload = {
      cityName: formData.cityName,
      citySlug: formData.citySlug,
      subTowns: formData.subTownsString.split(',').map(s => s.trim()).filter(Boolean)
    };

    try {
      if (cityData) {
        await fetchClient(`/cities/${cityData.id}`, { method: 'PATCH', body: JSON.stringify(payload) });
        toast.success('City updated successfully');
      } else {
        await fetchClient('/cities', { method: 'POST', body: JSON.stringify(payload) });
        toast.success('New city added to network');
      }
      onSuccess(); 
      setIsOpen(false); 
    } catch (error) {
      toast.error(error.message || 'Failed to save city');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
        <TransitionChild as={Fragment} enter="ease-in-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-primary/40 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild as={Fragment} enter="transform transition ease-in-out duration-300" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-300" leaveFrom="translate-x-0" leaveTo="translate-x-full">
                <DialogPanel className="pointer-events-auto w-screen max-w-md">
                  <form onSubmit={handleSubmit} className="flex h-full flex-col bg-white shadow-2xl">
                    
                    <div className="bg-primary px-6 py-6 text-white">
                      <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl font-extrabold tracking-tight flex items-center gap-2">
                          <MapPin size={20} className="text-secondary" />
                          {cityData ? 'Edit City Route' : 'Add New City'}
                        </DialogTitle>
                        <button type="button" onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
                          <X size={24} />
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Location Setup</h3>
                        
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">City Name <span className="text-red-500">*</span></label>
                          <input type="text" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none" value={formData.cityName} onChange={handleNameChange} placeholder="e.g., Kolkata" />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">URL Slug <span className="text-red-500">*</span></label>
                          <input type="text" required className="w-full p-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 outline-none" value={formData.citySlug} onChange={(e) => setFormData({...formData, citySlug: e.target.value})} placeholder="kolkata" />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Sub-Towns / Areas</label>
                          <textarea rows="4" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none" value={formData.subTownsString} onChange={(e) => setFormData({...formData, subTownsString: e.target.value})} placeholder="Salt Lake, New Town, Jadavpur (comma separated)" />
                        </div>
                      </div>
                      {/* SEO Section completely removed from here! */}
                    </div>

                    <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                      <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center gap-2 bg-primary hover:bg-[#112440] disabled:bg-primary/50 text-white font-bold py-3.5 rounded-xl transition-all">
                        {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                        {cityData ? 'Update City' : 'Save New City'}
                      </button>
                    </div>

                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}