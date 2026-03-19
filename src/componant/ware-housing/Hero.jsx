"use client";

import React, { useState, useEffect, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import toast from 'react-hot-toast';

export default function WarehousingHero({ cityName }) {
  const displayCity = cityName || 'Your City';

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/service-options/service/ware-housing`);
        const data = await res.json();
        if (data.success && data.data.options) {
          setCategories(data.data.options);
        }
      } catch (error) {
        console.error("Failed to fetch warehousing categories", error);
      }
    };
    fetchCategories();
  }, []);

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    originCity: displayCity, 
    destinationCity: '',     
    shiftingDate: '',        
    itemCategory: '',        
    customerComment: '',     
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      ...formData,
      serviceRequested: 'Warehousing & Storage',
      customFields: { 
        StorageType: formData.itemCategory 
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

      toast.success(
        "Secure Storage Request Logged. Our facility manager will contact you shortly to confirm your vault allocation and security clearance.",
        {
          duration: 6000,
          style: {
            border: '1px solid #c5a059',
            padding: '16px',
            color: '#fff',               
            background: '#0a1526',       
            fontWeight: '600',
            letterSpacing: '0.05em',
          },
          iconTheme: {
            primary: '#c5a059',
            secondary: '#0a1526',
          },
        }
      );
      
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

  // 🛟 Smart Fallback for Warehousing
  const fallbackTiers = [
    'Short Term (1-3 Months)',
    'Long Term (6+ Months)',
    'Commercial / Bulk Transit'
  ];

  return (
    <section className="relative w-full pt-32 pb-20 lg:pt-40 lg:pb-32 bg-primary overflow-hidden">
      
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
         <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         <div className="absolute inset-0 bg-gradient-to-l from-transparent to-primary"></div>
      </div>

      <div className="container relative z-10 px-4 max-w-7xl">
        
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-secondary/10 border border-secondary/20 text-secondary text-xs font-mono mb-8 uppercase tracking-wider">
            <span className="animate-pulse">●</span> 24/7 Secure Storage
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
            Industrial-Grade Warehousing in <span className="text-secondary">{displayCity}</span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            Short-term transit storage or long-term commercial inventory management. Fully insured, climate-controlled, and monitored around the clock.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16 border-y border-white/10 py-8">
          <div>
            <p className="text-4xl font-bold text-white mb-1">50k+</p>
            <p className="text-xs text-secondary uppercase tracking-widest">Sq Ft Capacity</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-white mb-1">24/7</p>
            <p className="text-xs text-secondary uppercase tracking-widest">CCTV Monitoring</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-white mb-1">100%</p>
            <p className="text-xs text-secondary uppercase tracking-widest">Pest Controlled</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-white mb-1">Fire</p>
            <p className="text-xs text-secondary uppercase tracking-widest">Safety Certified</p>
          </div>
        </div>

        <div className="bg-black/20 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl shadow-2xl relative">
          
          <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
            <h3 className="text-xl font-bold text-white tracking-wide">Space Availability Console</h3>
            <span className="text-xs font-mono text-gray-500 uppercase">SYS_READY</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-black/40 rounded-lg px-4 py-3 border border-white/5 focus-within:border-secondary transition-colors">
                <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1">Full Name *</label>
                <input type="text" name="customerName" required value={formData.customerName} onChange={handleChange} className="w-full bg-transparent text-white outline-none placeholder:text-gray-600 text-sm font-medium" placeholder="Authorized Person" />
              </div>
              <div className="bg-black/40 rounded-lg px-4 py-3 border border-white/5 focus-within:border-secondary transition-colors">
                <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1">Email Address *</label>
                <input type="email" name="customerEmail" required value={formData.customerEmail} onChange={handleChange} className="w-full bg-transparent text-white outline-none placeholder:text-gray-600 text-sm font-medium" placeholder="Corporate / Personal" />
              </div>
              <div className="bg-black/40 rounded-lg px-4 py-3 border border-white/5 focus-within:border-secondary transition-colors">
                <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1">Secure Contact No *</label>
                <input type="tel" name="customerPhone" required value={formData.customerPhone} onChange={handleChange} className="w-full bg-transparent text-white outline-none placeholder:text-gray-600 text-sm font-medium" placeholder="Phone Number" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-black/40 rounded-lg px-4 py-3 border border-white/5 focus-within:border-secondary transition-colors">
                <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1">Facility Location *</label>
                <input type="text" name="originCity" required value={formData.originCity} onChange={handleChange} className="w-full bg-transparent text-white outline-none placeholder:text-gray-600 text-sm font-medium" />
              </div>
              <div className="bg-black/40 rounded-lg px-4 py-3 border border-white/5 focus-within:border-secondary transition-colors">
                <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1">Inbound Date</label>
                <input type="date" name="shiftingDate" value={formData.shiftingDate} onChange={handleChange} className="w-full bg-transparent text-white outline-none placeholder:text-gray-600 text-sm font-medium [color-scheme:dark]" />
              </div>
              
              {/* 🚀 HEADLESS UI DROPDOWN - DARK CONSOLE STYLING 🚀 */}
              <div className="bg-black/40 rounded-lg px-4 py-3 border border-white/5 focus-within:border-secondary transition-colors relative">
                <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1">Storage Tier</label>
                <Listbox value={formData.itemCategory} onChange={(val) => setFormData({ ...formData, itemCategory: val })}>
                  <div className="relative">
                    <Listbox.Button className="relative w-full cursor-pointer bg-transparent text-left focus:outline-none transition-colors">
                      <span className={`block truncate ${formData.itemCategory ? 'text-white font-medium' : 'text-gray-600'}`}>
                        {formData.itemCategory || 'Select Storage Type'}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1">
                        <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </Listbox.Button>
                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                      <Listbox.Options className="absolute z-50 mt-4 max-h-60 w-[calc(100%+2rem)] -ml-4 overflow-auto rounded-xl bg-[#0a1526] py-2 text-sm shadow-2xl ring-1 ring-white/10 focus:outline-none border border-white/5">
                        {(categories.length > 0 ? categories : fallbackTiers).map((item, index) => {
                          const itemName = typeof item === 'object' ? item.categoryName : item;
                          const itemPrice = typeof item === 'object' && item.priceStartingFrom ? `(From ₹${item.priceStartingFrom})` : '';
                          const itemKey = typeof item === 'object' ? item._id : index;

                          return (
                            <Listbox.Option key={itemKey} className={({ active }) => `relative cursor-pointer select-none py-2.5 pl-10 pr-4 transition-colors ${active ? 'bg-secondary/20 text-secondary font-bold' : 'text-gray-300 font-medium'}`} value={itemName}>
                              {({ selected }) => (
                                <>
                                  <span className={`block truncate ${selected ? 'font-bold text-secondary' : ''}`}>
                                    {itemName} {itemPrice}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-secondary">
                                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                      </svg>
                                    </span>
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
              <div className="md:col-span-3 bg-black/40 rounded-lg px-4 py-3 border border-white/5 focus-within:border-secondary transition-colors">
                <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1">Inventory Manifest / Details</label>
                <textarea name="customerComment" value={formData.customerComment} onChange={handleChange} rows="1" className="w-full bg-transparent text-white outline-none placeholder:text-gray-600 text-sm font-medium resize-none" placeholder="What are you storing? (e.g. Household goods, 20 pallets of electronics...)" />
              </div>
              <div className="md:col-span-1">
                <button type="submit" disabled={isLoading} className="w-full h-full bg-secondary hover:bg-opacity-90 disabled:bg-gray-600 text-primary font-black px-6 py-4 rounded-lg transition-all whitespace-nowrap uppercase tracking-widest text-xs">
                  {isLoading ? 'Verifying...' : 'Check Availability'}
                </button>
              </div>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
}