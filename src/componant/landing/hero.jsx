"use client";

import React, { useState, useEffect, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import toast from 'react-hot-toast';
import { ChevronDown, CheckCircle2, ShieldCheck, Truck, Banknote, Users, Headphones, Star, Loader2 } from 'lucide-react';

export default function HeroSection() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    originCity: null,      // Headless UI expects an object or null initially
    destinationCity: null, // Headless UI expects an object or null initially
    shiftingDate: '',
  });

  // 1. Fetch Cities on Mount
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cities`);
        const data = await res.json();
        if (data.success && data.data.cities) {
          setCities(data.data.cities);
        }
      } catch (error) {
        console.error("Failed to fetch cities", error);
      }
    };
    fetchCities();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Submit Lead directly to Packers and Movers
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.originCity) return toast.error("Please select a pickup city.");
    if (!formData.destinationCity) return toast.error("Please select a drop city.");

    setIsLoading(true);

    const payload = {
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      originCity: formData.originCity.cityName, // Extract name from the city object
      destinationCity: formData.destinationCity.cityName,
      shiftingDate: formData.shiftingDate,
      serviceRequested: 'Packers & Movers', // Hardcoded as requested
      // No customFields required here
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
        "Quote request received! Our moving experts will contact you shortly.",
        {
          duration: 5000,
          style: {
            border: '2px solid #10b981', // Green border
            padding: '16px',
            color: '#111827',
            background: '#fff',
            fontWeight: 'bold',
          },
          iconTheme: {
            primary: '#10b981',
            secondary: '#fff',
          },
        }
      );
      
      // Reset Form
      setFormData({
        customerName: '', customerPhone: '', customerEmail: '', 
        originCity: null, destinationCity: null, shiftingDate: ''
      });
      
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container px-4 lg:px-8 xl:px-12 py-12 lg:py-20 min-h-[85vh] flex flex-col justify-center">
      
      {/* 1. TOP TYPOGRAPHY SECTION */}
      <div className="flex flex-col gap-6 max-w-4xl mb-12">
        
        {/* Top Review Badge */}
        <div className="inline-flex items-center gap-2 border border-gray-200 backdrop-blur-sm rounded-full px-4 py-1.5 w-max shadow-sm">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm text-gray-700 font-bold">Rated 4.8/5 by 10,000+ Happy Clients!</span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#112440] leading-[1.1] tracking-tight">
          India&apos;s Most Trusted <br className="hidden md:block"/>
          <span className="text-[#c5a059]">Packers & Movers</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 font-medium md:w-4/5 leading-relaxed">
          Top-rated house shifting services with 100% damage & delay protection. Move hassle-free with expert planning and smooth execution. We have you covered!
        </p>
      </div>

      {/* 2. FLOATING QUOTE FORM (Responsive Grid) */}
      <form onSubmit={handleSubmit} className="w-full bg-white rounded-[2rem] shadow-2xl shadow-[#112440]/10 border border-gray-100 p-6 md:p-8 mb-16 relative z-20">
        
        {/* Top Row: User Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-gray-50 rounded-xl px-4 py-2 border border-gray-200 focus-within:border-[#c5a059] focus-within:ring-1 focus-within:ring-[#c5a059] transition-all">
            <label className="block text-[10px] uppercase font-black tracking-widest text-gray-400 mb-1">Your Name *</label>
            <input type="text" name="customerName" required value={formData.customerName} onChange={handleChange} className="w-full bg-transparent text-sm font-bold text-gray-800 outline-none placeholder:text-gray-400 placeholder:font-medium" placeholder="John Doe" />
          </div>
          
          <div className="bg-gray-50 rounded-xl px-4 py-2 border border-gray-200 focus-within:border-[#c5a059] focus-within:ring-1 focus-within:ring-[#c5a059] transition-all">
            <label className="block text-[10px] uppercase font-black tracking-widest text-gray-400 mb-1">Phone Number *</label>
            <input type="tel" name="customerPhone" required value={formData.customerPhone} onChange={handleChange} className="w-full bg-transparent text-sm font-bold text-gray-800 outline-none placeholder:text-gray-400 placeholder:font-medium" placeholder="10-digit mobile" />
          </div>
          
          <div className="bg-gray-50 rounded-xl px-4 py-2 border border-gray-200 focus-within:border-[#c5a059] focus-within:ring-1 focus-within:ring-[#c5a059] transition-all">
            <label className="block text-[10px] uppercase font-black tracking-widest text-gray-400 mb-1">Email Address *</label>
            <input type="email" name="customerEmail" required value={formData.customerEmail} onChange={handleChange} className="w-full bg-transparent text-sm font-bold text-gray-800 outline-none placeholder:text-gray-400 placeholder:font-medium" placeholder="john@example.com" />
          </div>
        </div>

        {/* Bottom Row: Logistics (Cities & Date) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          
          {/* Pickup City Dropdown (Headless UI) */}
          <div className="relative">
            <label className="block text-[10px] uppercase font-black tracking-widest text-gray-400 mb-2 pl-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span> Pickup From *
            </label>
            <Listbox value={formData.originCity} onChange={(val) => setFormData({ ...formData, originCity: val })}>
              <div className="relative">
                <Listbox.Button className="relative w-full cursor-pointer bg-gray-50 border border-gray-200 py-3.5 pl-4 pr-10 text-left rounded-xl focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] transition-all">
                  <span className={`block truncate ${formData.originCity ? 'text-gray-900 font-bold' : 'text-gray-400 font-medium'}`}>
                    {formData.originCity ? formData.originCity.cityName : 'Select City'}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </span>
                </Listbox.Button>
                <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                  <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-sm shadow-2xl ring-1 ring-black/5 focus:outline-none border border-gray-100">
                    {cities.map((city) => (
                      <Listbox.Option key={city._id} className={({ active }) => `relative cursor-pointer select-none py-3 pl-10 pr-4 ${active ? 'bg-[#c5a059]/10 text-[#112440]' : 'text-gray-700'}`} value={city}>
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-bold' : 'font-medium'}`}>{city.cityName}</span>
                            {selected && (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#c5a059] font-bold">✓</span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>

          {/* Drop City Dropdown (Headless UI) */}
          <div className="relative">
            <label className="block text-[10px] uppercase font-black tracking-widest text-gray-400 mb-2 pl-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block"></span> Drop To *
            </label>
            <Listbox value={formData.destinationCity} onChange={(val) => setFormData({ ...formData, destinationCity: val })}>
              <div className="relative">
                <Listbox.Button className="relative w-full cursor-pointer bg-gray-50 border border-gray-200 py-3.5 pl-4 pr-10 text-left rounded-xl focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] transition-all">
                  <span className={`block truncate ${formData.destinationCity ? 'text-gray-900 font-bold' : 'text-gray-400 font-medium'}`}>
                    {formData.destinationCity ? formData.destinationCity.cityName : 'Select City'}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </span>
                </Listbox.Button>
                <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                  <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-sm shadow-2xl ring-1 ring-black/5 focus:outline-none border border-gray-100">
                    {cities.map((city) => (
                      <Listbox.Option key={city._id} className={({ active }) => `relative cursor-pointer select-none py-3 pl-10 pr-4 ${active ? 'bg-[#c5a059]/10 text-[#112440]' : 'text-gray-700'}`} value={city}>
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-bold' : 'font-medium'}`}>{city.cityName}</span>
                            {selected && (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#c5a059] font-bold">✓</span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>

          {/* Date Input */}
          <div>
             <label className="block text-[10px] uppercase font-black tracking-widest text-gray-400 mb-2 pl-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block"></span> Move Date
            </label>
            <input 
              type="date" 
              name="shiftingDate" 
              value={formData.shiftingDate} 
              onChange={handleChange} 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-800 font-bold outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] transition-all" 
            />
          </div>

          {/* CTA Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-[50px] rounded-xl bg-[#112440] hover:bg-opacity-90 disabled:bg-gray-400 text-white font-black flex items-center justify-center gap-2 transition-all uppercase tracking-widest text-xs shadow-lg shadow-[#112440]/20"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Get Instant Quote'}
          </button>

        </div>
      </form>

      {/* 3. TRUST METRICS BAR (Horizontal Scroll on Mobile) */}
      <div className="w-full border-t border-gray-200 pt-8">
        {/* Mobile: scrollable. Desktop: wrap naturally */}
        <div className="flex items-center gap-6 md:gap-10 overflow-x-auto pb-4 md:pb-0 md:flex-wrap hide-scrollbar">
          
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-black text-[#112440]">Insurance Included</p>
              <p className="text-xs font-medium text-gray-500">Up to ₹10,000 Cover</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-black text-[#112440]">No Outsourcing</p>
              <p className="text-xs font-medium text-gray-500">100% In-house Team</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-black text-[#112440]">Timely Delivery</p>
              <p className="text-xs font-medium text-gray-500">GPS Tracked Fleet</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059]">
              <Banknote className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-black text-[#112440]">Best Price</p>
              <p className="text-xs font-medium text-gray-500">Transparent Quotes</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-black text-[#112440]">Verified Staff</p>
              <p className="text-xs font-medium text-gray-500">Background Checked</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059]">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-black text-[#112440]">24/7 Support</p>
              <p className="text-xs font-medium text-gray-500">Always Available</p>
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
}