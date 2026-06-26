"use client";

import React, { useState, useEffect, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import toast from 'react-hot-toast';

export default function OfficeHero({ cityName }) {
  const displayCity = cityName || 'Your City';

  // 1. Fetching Dynamic Categories from your Backend
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/service-options/service/office-relocation`);
        const data = await res.json();
        if (data.success && data.data.options) {
          setCategories(data.data.options);
        }
      } catch (error) {
        console.error("Failed to fetch office relocation categories", error);
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
    itemCategory: '', // This will now be handled by Headless UI!
    customerComment: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Submit Lead to Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { itemCategory, ...restFormData } = formData;
    const payload = {
      ...restFormData,
      serviceRequested: 'office-relocation',
      customFields: { 
        OfficeSize: itemCategory 
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

      // 🏢 THE CUSTOM CORPORATE TOAST 🏢
      toast.success(
        "Corporate inquiry received. A dedicated Account Manager will review your requirements and contact you shortly to build a zero-downtime logistics plan.",
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

  // The Fallback Array
  const fallbackOptions = [
    'Micro (1 - 10 Employees)',
    'Small (11 - 50 Employees)',
    'Medium (51 - 200 Employees)',
    'Enterprise (200+ Employees)'
  ];

  return (
    <section className="relative w-full min-h-[600px] flex items-center py-20 bg-primary bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat">
      
      {/* Heavy Corporate Overlay (Using Primary Navy gradient) */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/90 to-black/50"></div>

      {/* container WITHOUT mx-auto */}
      <div className="container relative z-10 px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* LEFT SIDE: Premium B2B Lead Form */}
          <div className="w-full lg:w-5/12">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl border-t-4 border-secondary">
              
              <div className="mb-6">
                <h3 className="text-2xl font-black text-primary">Corporate Moving Inquiry</h3>
                <p className="text-sm font-medium text-gray-500 mt-1">Get a customized logistics plan</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Row 1: Contact Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Coordinator Name *</label>
                    <input type="text" name="customerName" required value={formData.customerName} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" placeholder="Full Name" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Company Email *</label>
                    <input type="email" name="customerEmail" required value={formData.customerEmail} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" placeholder="work@company.com" />
                  </div>
                </div>

                {/* 🚀 HEADLESS UI DROPDOWN WITH SMART FALLBACK 🚀 */}
                <div className="relative">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Estimated Office Size</label>
                  <Listbox 
                    value={formData.itemCategory} 
                    onChange={(val) => setFormData({ ...formData, itemCategory: val })}
                  >
                    <div className="relative">
                      <Listbox.Button className="relative w-full cursor-pointer bg-gray-50 border border-gray-200 py-3 pl-4 pr-10 text-left rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors">
                        <span className={`block truncate ${formData.itemCategory ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                          {formData.itemCategory || 'Select Capacity'}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </Listbox.Button>
                      
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-2 text-sm shadow-2xl ring-1 ring-black/5 focus:outline-none border border-gray-100">
                          
                          {/* Map over DB categories if they exist, otherwise map over Fallback */}
                          {(categories.length > 0 ? categories : fallbackOptions).map((item, index) => {
                            // Normalize the values depending on whether it's an object from DB or string from fallback
                            const itemName = typeof item === 'object' ? item.categoryName : item;
                            const itemPrice = typeof item === 'object' && item.priceStartingFrom ? `(From ₹${item.priceStartingFrom})` : '';
                            const itemKey = typeof item === 'object' ? item._id : index;

                            return (
                              <Listbox.Option
                                key={itemKey}
                                className={({ active }) =>
                                  `relative cursor-pointer select-none py-2.5 pl-10 pr-4 transition-colors ${
                                    active ? 'bg-secondary/10 text-primary font-bold' : 'text-gray-700 font-medium'
                                  }`
                                }
                                value={itemName}
                              >
                                {({ selected }) => (
                                  <>
                                    <span className={`block truncate ${selected ? 'font-bold text-primary' : ''}`}>
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

                {/* Row 2: Locations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Current Office *</label>
                    <input type="text" name="originCity" required value={formData.originCity} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" placeholder="Pickup Area" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">New Office</label>
                    <input type="text" name="destinationCity" value={formData.destinationCity} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" placeholder="Drop Area" />
                  </div>
                </div>

                {/* Row 3: Phone & Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Direct Phone *</label>
                    <input type="tel" name="customerPhone" required value={formData.customerPhone} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" placeholder="Phone Number" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Target Move Date</label>
                    <input type="date" name="shiftingDate" value={formData.shiftingDate} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" />
                  </div>
                </div>

                {/* Company Details Box */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Company Details / Special Requirements</label>
                  <textarea name="customerComment" value={formData.customerComment} onChange={handleChange} rows="2" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors resize-none" placeholder="Company name, specific IT handling needs, etc."></textarea>
                </div>

                <button type="submit" disabled={isLoading} className="w-full mt-2 bg-secondary hover:bg-opacity-90 disabled:bg-gray-400 text-primary font-black py-4 rounded-lg transition-colors text-lg shadow-lg">
                  {isLoading ? 'Processing...' : 'Request Consultation'}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT SIDE: Corporate Copy & Badges */}
          <div className="w-full lg:w-7/12 text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 border border-secondary/30 mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="text-sm font-bold text-secondary">Zero Downtime Guarantee</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 text-white">
              Executive Office Relocation Services in <span className="text-secondary">{displayCity}</span>
            </h1>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-10 max-w-2xl font-medium">
              Moving a business is fundamentally different from moving a home. It requires meticulous planning to ensure your IT infrastructure, confidential documents, and employee workstations are securely transported and operational by Monday morning. Pradhan Service handles end-to-end commercial logistics in {displayCity} so your business never misses a beat.
            </p>

            {/* B2B Trust Badges */}
            <div className="flex flex-col sm:flex-row gap-6 md:gap-10 border-t border-white/20 pt-8">
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-black/40 flex items-center justify-center shrink-0 border border-white/10 shadow-inner">
                  <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">IT & Server Handling</p>
                  <p className="text-xs text-gray-400 font-medium">Anti-static packing & setup</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-black/40 flex items-center justify-center shrink-0 border border-white/10 shadow-inner">
                  <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Weekend Execution</p>
                  <p className="text-xs text-gray-400 font-medium">Move Friday, work Monday</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}