"use client";

import React, { useState, useEffect, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import toast from 'react-hot-toast';
import { Sparkles, ShieldCheck, MapPin } from 'lucide-react';

export default function CarHero({ cityData, pageData }) {
  const displayCity = cityData?.cityName || 'Your City';

  // 🌟 DYNAMIC H1 & DESCRIPTION FROM ADMIN PANEL 🌟
  // This automatically pulls what you typed in the backend. If blank, it uses a smart fallback.
  const pageContent = pageData?.page || pageData?.data?.page || pageData || {};
  const dynamicH1 = pageContent?.header?.title || `Premium Car Transport in ${displayCity}`;
  const dynamicDesc = pageContent?.header?.introText || `From compact cars to luxury SUVs, your vehicle is often the one thing that keeps your routine practical. Get secure, GPS-tracked, door-to-door vehicle relocation in ${displayCity}.`;

  // 1. Fetching Dynamic Categories from your Backend
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Cache buster included so admin changes reflect instantly
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/service-options/service/car-transportation?t=${new Date().getTime()}`);
        const data = await res.json();
        if (data?.data?.options) {
          setCategories(data.data.options);
        }
      } catch (error) {
        console.error("Failed to fetch vehicle categories", error);
      }
    };
    fetchCategories();
  }, []);

  // 2. Form State matching your Lead.js Model
  const [formData, setFormData] = useState({
    customerName: '', customerEmail: '', customerPhone: '',
    originCity: displayCity, destinationCity: '', shiftingDate: '',
    itemCategory: '', customerComment: '',
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
      serviceRequested: 'car-transportation',
      customFields: { VehicleType: itemCategory }
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
        "Vehicle transit request received. Our auto-logistics team will contact you shortly.",
        {
          duration: 6000,
          style: { border: '1px solid #e2e8f0', padding: '16px', color: '#0f172a', background: '#fff', fontWeight: 'bold' },
          iconTheme: { primary: '#c5a059', secondary: '#fff' },
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

  const fallbackVehicles = ['Hatchback / Sedan', 'SUV / MUV', 'Luxury / Vintage Vehicle'];

  return (
    <section className="relative w-full py-24 lg:py-32 bg-white overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-slate-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* LEFT: TEXT & EDITORIAL CONTENT */}
          <div className="w-full lg:w-[55%]">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] mb-6 border bg-white text-secondary border-slate-200 shadow-sm">
              <Sparkles size={12} className="text-secondary animate-pulse" /> Secure Auto Transport
            </div>
            
            {/* 🌟 DYNAMIC H1 FROM DATABASE 🌟 */}
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter leading-[1.05] text-primary mb-8 whitespace-pre-line">
              {dynamicH1}
            </h1>
            
            {/* 🌟 DYNAMIC DESCRIPTION FROM DATABASE 🌟 */}
            <p className="text-lg lg:text-xl font-medium text-slate-500 leading-[1.8] mb-12 max-w-2xl whitespace-pre-line">
              {dynamicDesc}
            </p>

            <div className="flex flex-col sm:flex-row gap-8 pt-8 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                  <ShieldCheck className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-primary">Free in-Transit Insurance</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Full Comprehensive Protection</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-primary">99% on Time Pickup</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Timely GPS-Tracked Delivery</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: THE FORM */}
          <div className="w-full lg:w-[45%]">
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100">
              
              <div className="mb-8">
                <h3 className="text-2xl font-black text-primary tracking-tight">Get an Instant Quote</h3>
                <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">Safe & insured transport</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Full Name *</label>
                    <input type="text" name="customerName" required value={formData.customerName} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all" placeholder="Owner Name" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Email *</label>
                    <input type="email" name="customerEmail" required value={formData.customerEmail} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all" placeholder="Email Address" />
                  </div>
                </div>

                {/* 🚀 HEADLESS UI DROPDOWN - UPDATED TO WHITE/CLEAN 🚀 */}
                <div className="relative">
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Vehicle Category</label>
                  <Listbox value={formData.itemCategory} onChange={(val) => setFormData({ ...formData, itemCategory: val })}>
                    <div className="relative z-50">
                      <Listbox.Button className="relative w-full cursor-pointer bg-slate-50 border border-slate-200 py-3.5 pl-5 pr-10 text-left rounded-xl focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all">
                        <span className={`block truncate text-sm font-bold ${formData.itemCategory ? 'text-primary' : 'text-slate-400'}`}>
                          {formData.itemCategory || 'Select Vehicle Type'}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5">
                          <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </Listbox.Button>
                      <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-2 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] ring-1 ring-slate-100 focus:outline-none z-50">
                          {(categories.length > 0 ? categories : fallbackVehicles).map((item, index) => {
                            const itemName = typeof item === 'object' ? item.categoryName : item;
                            const itemKey = typeof item === 'object' ? item._id : index;

                            return (
                              <Listbox.Option key={itemKey} className={({ active }) => `relative cursor-pointer select-none py-3 pl-10 pr-4 transition-colors ${active ? 'bg-slate-50 text-primary font-black' : 'text-slate-600 font-bold'}`} value={itemName}>
                                {({ selected }) => (
                                  <>
                                    <span className={`block truncate text-sm ${selected ? 'font-black text-primary' : ''}`}>{itemName}</span>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Pickup Location *</label>
                    <input type="text" name="originCity" required value={formData.originCity} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all" placeholder="Pickup City" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Drop Location</label>
                    <input type="text" name="destinationCity" value={formData.destinationCity} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all" placeholder="Drop City" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Phone Number *</label>
                    <input type="tel" name="customerPhone" required value={formData.customerPhone} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all" placeholder="10-digit number" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Shifting Date</label>
                    <input type="date" name="shiftingDate" value={formData.shiftingDate} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all" />
                  </div>
                </div>

                <button type="submit" disabled={isLoading} className="w-full mt-4 bg-primary hover:bg-[#112440] disabled:bg-slate-300 text-white font-black py-4 rounded-xl transition-all text-sm tracking-widest uppercase shadow-md hover:shadow-lg hover:-translate-y-0.5">
                  {isLoading ? 'Processing...' : 'Submit Request'}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}