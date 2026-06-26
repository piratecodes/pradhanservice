"use client";

import React, { useState, useEffect, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import toast from 'react-hot-toast';

export default function ApplianceServicesHero({ cityName }) {
  const displayCity = cityName || 'Your City';

  // 1. Fetching Dynamic Categories from your Backend
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/service-options/service/home-appliance-uninstall-and-install`);
        const data = await res.json();
        if (data.success && data.data.options) {
          setCategories(data.data.options);
        }
      } catch (error) {
        console.error("Failed to fetch appliance categories", error);
      }
    };
    fetchCategories();
  }, []);

  // 2. Form State matching your Lead.js Model
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    originCity: displayCity,
    destinationCity: '',
    shiftingDate: '',
    itemCategory: '', // Managed by Headless UI Listbox
    customerComment: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Submit Lead to Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      ...formData,
      serviceRequested: 'Appliance Uninstall & Install',
      customFields: { 
        ApplianceType: formData.itemCategory 
      }
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to submit request');

      // 🛠️ THE CUSTOM TECHNICIAN TOAST 🛠️
      toast.success(
        "Technician Request Received. Our service coordinator will contact you shortly to confirm the appointment and provide a transparent estimate for your appliance setup.",
        {
          duration: 6000,
          style: {
            border: '2px solid #c5a059', // Secondary Gold
            padding: '16px',
            color: '#112440',            // Primary Navy
            background: '#fff',
            fontWeight: '600',
          },
          iconTheme: {
            primary: '#c5a059',
            secondary: '#fff',
          },
        }
      );
      
      // Clear the form
      setFormData({
        customerName: '', customerEmail: '', customerPhone: '', 
        originCity: displayCity, destinationCity: '', shiftingDate: '', 
        itemCategory: '', customerComment: ''
      });
      
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 🛟 Smart Fallback for Appliances
  const fallbackAppliances = [
    'Air Conditioner (Split/Window)',
    'Wall-Mounted TV / Home Theatre',
    'Washing Machine / Dryer',
    'Water Purifier / Geyser',
    'Complete Home Electronics',
  ];

  return (
    <section className="relative w-full min-h-[85vh] flex items-center pt-24 pb-16 bg-[#f8fafc]">
      
      {/* Rule 1: container WITHOUT mx-auto */}
      <div className="container relative z-10 px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* LEFT: Clean, Tech-Focused Copy with Brand Colors */}
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/20 text-primary rounded-full mb-6 font-bold text-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              Certified Technicians Available
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary leading-tight mb-6 tracking-tight">
              Expert Appliance Setup & <span className="text-secondary italic">Uninstall</span> in {displayCity}
            </h1>
            
            <p className="text-gray-600 text-lg leading-relaxed max-w-lg mb-8 font-medium">
              Don&apos;t risk damaging your expensive electronics during a move. Our verified technicians safely dismantle, pack, and reinstall your ACs, TVs, and heavy appliances.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center text-secondary text-xl font-bold">❄️</div>
                <div className="text-sm font-bold text-primary">Gas Leak<br/>Protection</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center text-secondary text-xl font-bold">📺</div>
                <div className="text-sm font-bold text-primary">Safe Wall<br/>Mounting</div>
              </div>
            </div>
          </div>

          {/* RIGHT: Modern, Friendly Form */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-50 border-t-8 border-t-secondary">
              <h3 className="text-2xl font-black text-primary mb-2">Book a Technician</h3>
              <p className="text-gray-500 font-medium text-sm mb-8">Fast response times across {displayCity}.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Contact Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Your Name *</label>
                    <input type="text" name="customerName" required value={formData.customerName} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-xl text-primary outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all font-medium" placeholder="Full Name" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Email Address *</label>
                    <input type="email" name="customerEmail" required value={formData.customerEmail} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-xl text-primary outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all font-medium" placeholder="Email" />
                  </div>
                </div>

                {/* 🚀 HEADLESS UI DROPDOWN (Rule 5) 🚀 */}
                <div className="relative">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Appliance Category</label>
                  <Listbox value={formData.itemCategory} onChange={(val) => setFormData({ ...formData, itemCategory: val })}>
                    <div className="relative">
                      <Listbox.Button className="relative w-full cursor-pointer bg-gray-50 border border-gray-200 py-3.5 pl-4 pr-10 text-left text-primary rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all">
                        <span className={`block truncate ${formData.itemCategory ? 'font-bold' : 'font-medium text-gray-500'}`}>
                          {formData.itemCategory || 'Select Appliance Type'}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                          <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </Listbox.Button>
                      <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto bg-white border border-gray-100 py-1 text-base shadow-2xl focus:outline-none sm:text-sm rounded-xl">
                          {(categories.length > 0 ? categories : fallbackAppliances).map((item, index) => {
                            const itemName = typeof item === 'object' ? item.categoryName : item;
                            const itemKey = typeof item === 'object' ? item._id : index;

                            return (
                              <Listbox.Option key={itemKey} className={({ active }) => `relative cursor-pointer select-none py-3 pl-10 pr-4 transition-colors ${active ? 'bg-secondary/10 text-primary font-bold' : 'text-gray-700 font-medium'}`} value={itemName}>
                                {({ selected }) => (
                                  <>
                                    <span className={`block truncate ${selected ? 'font-bold text-primary' : ''}`}>{itemName}</span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-secondary font-bold">✓</span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            );
                          })}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>

                {/* Location & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Locality *</label>
                    <input type="text" name="originCity" required value={formData.originCity} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-xl text-primary outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all font-medium" placeholder="Area Name" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Phone Number *</label>
                    <input type="tel" name="customerPhone" required value={formData.customerPhone} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-xl text-primary outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all font-medium" placeholder="Contact No." />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Booking Date</label>
                    <input type="date" name="shiftingDate" value={formData.shiftingDate} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-xl text-primary outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Destination (Optional)</label>
                    <input type="text" name="destinationCity" value={formData.destinationCity} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-xl text-primary outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all font-medium" placeholder="Delivery Area" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Additional Requirements</label>
                  <textarea name="customerComment" value={formData.customerComment} onChange={handleChange} rows="2" className="w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-xl text-primary outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all font-medium resize-none" placeholder="E.g., 1.5 Ton Split AC, 55 inch OLED TV mounting..."></textarea>
                </div>

                <button type="submit" disabled={isLoading} className="w-full mt-2 bg-primary hover:bg-opacity-90 disabled:bg-gray-400 text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-primary/20 text-lg uppercase tracking-widest">
                  {isLoading ? 'Processing...' : 'Get Free Estimate'}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}