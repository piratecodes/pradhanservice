"use client";

import React, { useState, useEffect, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function AfterShiftingHero({ cityName }) {
  const displayCity = cityName || 'Your City';

  // 1. Fetching Dynamic Categories from your Backend
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/service-options/service/after-shifting-services`);
        const data = await res.json();
        if (data.success && data.data.options) {
          setCategories(data.data.options);
        }
      } catch (error) {
        console.error("Failed to fetch after-shifting categories", error);
      }
    };
    fetchCategories();
  }, []);

  // 2. Form State matching your Lead.js Model
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    originCity: displayCity, // Using this for Full Address/Locality
    destinationCity: '',
    shiftingDate: '',
    itemCategory: '', // Handled by Headless UI
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
      serviceRequested: 'After Shifting Services',
      customFields: { 
        ConciergeService: formData.itemCategory 
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

      // ✨ THE CUSTOM CONCIERGE TOAST ✨
      toast.success(
        "Welcome home! Your concierge request has been received. Our team will contact you shortly to schedule your settling-in services.",
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
  const fallbackServices = [
    'Deep Cleaning & Sanitization',
    'Professional Unpacking & Organizing',
    'Handyman (Drilling, Mounting, Repairs)',
    'Pest Control Services',
    'Complete "Welcome Home" Package',
  ];

  return (
    // THE FIX: Added pt-20 pb-32 and mb-20 md:mb-28 to create physical space for the overlapping image!
    <section className="relative w-full min-h-[90vh] flex flex-col justify-center items-center pt-20 pb-32 mb-20 md:mb-28 bg-[#fdfbf7]">
      
      {/* Soft, warm background accent blobs using Brand Colors */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-2000 pointer-events-none"></div>

      {/* Rule 1: container WITHOUT mx-auto */}
      <div className="container relative z-10 px-4 max-w-5xl text-center">
        
        {/* Warm, Inviting Header */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-stone-100 mb-8 mx-auto">
          <span className="text-xl">✨</span>
          <span className="text-primary text-sm font-bold tracking-wide">Premium Home Concierge in {displayCity}</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary tracking-tight mb-6 font-serif mx-auto">
          Settle in <span className="text-secondary italic">seamlessly.</span>
        </h1>
        
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 font-medium">
          The boxes are delivered, but the work isn&apos;t done. From deep cleaning to professional unpacking and handyman tasks, we turn your new house into a functioning home within hours.
        </p>

        {/* The Centered Floating Form */}
        <div className="bg-white/90 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] shadow-2xl border border-white max-w-4xl mx-auto text-left relative z-20">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            {/* Row 1: Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1 pl-1">Full Name *</label>
                <input type="text" name="customerName" required value={formData.customerName} onChange={handleChange} className="w-full bg-stone-50 border border-stone-200 py-3 px-4 text-primary rounded-xl outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all font-medium" placeholder="Your Name" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1 pl-1">Email Address *</label>
                <input type="email" name="customerEmail" required value={formData.customerEmail} onChange={handleChange} className="w-full bg-stone-50 border border-stone-200 py-3 px-4 text-primary rounded-xl outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all font-medium" placeholder="Email" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1 pl-1">Mobile Number *</label>
                <input type="tel" name="customerPhone" required value={formData.customerPhone} onChange={handleChange} className="w-full bg-stone-50 border border-stone-200 py-3 px-4 text-primary rounded-xl outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all font-medium" placeholder="Contact No." />
              </div>
            </div>

            {/* Row 2: Service (Headless UI) & Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Headless UI Listbox with Smart Fallback */}
              <div className="relative">
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1 pl-1">What do you need help with?</label>
                <Listbox value={formData.itemCategory} onChange={(val) => setFormData({ ...formData, itemCategory: val })}>
                  <div className="relative">
                    <Listbox.Button className="relative w-full cursor-pointer bg-stone-50 border border-stone-200 py-3 pl-4 pr-10 text-left text-primary rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all">
                      <span className={`block truncate ${formData.itemCategory ? 'font-bold' : 'font-medium text-gray-500'}`}>
                        {formData.itemCategory || 'Select Service'}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </Listbox.Button>
                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                      <Listbox.Options className="absolute z-50 mt-2 max-h-60 w-full overflow-auto bg-white border border-stone-100 py-2 text-base shadow-2xl focus:outline-none sm:text-sm rounded-xl">
                        {(categories.length > 0 ? categories : fallbackServices).map((item, index) => {
                          const itemName = typeof item === 'object' ? item.categoryName : item;
                          const itemPrice = typeof item === 'object' && item.priceStartingFrom ? `(From ₹${item.priceStartingFrom})` : '';
                          const itemKey = typeof item === 'object' ? item._id : index;

                          return (
                            <Listbox.Option key={itemKey} className={({ active }) => `relative cursor-pointer select-none py-3 pl-10 pr-4 transition-colors ${active ? 'bg-secondary/10 text-primary font-bold' : 'text-gray-600 font-medium'}`} value={itemName}>
                              {({ selected }) => (
                                <>
                                  <span className={`block truncate ${selected ? 'font-bold text-primary' : ''}`}>{itemName} {itemPrice}</span>
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

              {/* Date Input */}
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1 pl-1">Preferred Date</label>
                <input type="date" name="shiftingDate" value={formData.shiftingDate} onChange={handleChange} className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4 text-primary outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all font-medium" />
              </div>
            </div>

            {/* Row 3: Address & Comments */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                 <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1 pl-1">Full Address / Locality *</label>
                 <input type="text" name="originCity" required value={formData.originCity} onChange={handleChange} className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4 text-primary outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all font-medium" placeholder="Where do you need us?" />
               </div>
               <div>
                 <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1 pl-1">Any specific details?</label>
                 <input type="text" name="customerComment" value={formData.customerComment} onChange={handleChange} className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4 text-primary outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all font-medium" placeholder="E.g., Need 2 handymen, pest control..." />
               </div>
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={isLoading} className="w-full mt-2 bg-secondary hover:bg-opacity-90 disabled:bg-gray-400 text-primary uppercase tracking-widest font-bold py-4 rounded-xl transition-all shadow-lg shadow-secondary/20 text-sm">
              {isLoading ? 'Booking...' : 'Book Service'}
            </button>

          </form>
        </div>
      </div>

      {/* Beautiful Lifestyle Image Bar at the bottom overlapping the next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 md:h-48 transform translate-y-1/2 px-4 md:px-12 z-0">
        <div className="w-full h-full relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
          <Image 
            src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=2000&auto=format&fit=crop" 
            alt="Clean, organized home interior"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/10"></div>
        </div>
      </div>
    </section>
  );
}