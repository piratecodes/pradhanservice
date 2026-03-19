"use client";

import React, { useState, useEffect, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import toast from 'react-hot-toast';

export default function Hero({ cityName }) {
  const displayCity = cityName || 'Your City';

  // 1. Fetching Dynamic Categories from your Backend
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/service-options/service/car-and-bike-transport`);
        const data = await res.json();
        if (data.success && data.data.options) {
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

  // 3. Submit Lead to Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      ...formData,
      serviceRequested: 'Car & Bike Transport',
      customFields: { 
        VehicleType: formData.itemCategory 
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

      // 🚗 THE CUSTOM VEHICLE TOAST 🚗
      toast.success(
        "Vehicle transit request received. Our auto-logistics team will contact you shortly to confirm pickup details and insurance documentation.",
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

  // 🛟 Smart Fallback for Vehicle Types
  const fallbackVehicles = [
    'Hatchback / Sedan',
    'SUV / MUV',
    'Luxury / Vintage Vehicle',
    'Two Wheeler (Bike/Scooter)'
  ];

  return (
    <section className="relative w-full min-h-[600px] flex items-center py-20 bg-primary bg-[url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat">
      
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-black/40"></div>

      <div className="container relative z-10 px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          <div className="w-full lg:w-5/12">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl border-t-4 border-secondary">
              
              <div className="mb-6">
                <h3 className="text-2xl font-black text-primary">Get an Instant Quote</h3>
                <p className="text-sm font-medium text-gray-500 mt-1">Safe & insured vehicle transport</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
                    <input type="text" name="customerName" required value={formData.customerName} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" placeholder="Owner Name" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                    <input type="email" name="customerEmail" required value={formData.customerEmail} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" placeholder="Email" />
                  </div>
                </div>

                {/* 🚀 HEADLESS UI DROPDOWN 🚀 */}
                <div className="relative">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Vehicle Category</label>
                  <Listbox value={formData.itemCategory} onChange={(val) => setFormData({ ...formData, itemCategory: val })}>
                    <div className="relative">
                      <Listbox.Button className="relative w-full cursor-pointer bg-gray-50 border border-gray-200 py-3 pl-4 pr-10 text-left rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors">
                        <span className={`block truncate ${formData.itemCategory ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                          {formData.itemCategory || 'Select Vehicle Type'}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </Listbox.Button>
                      <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-2 text-sm shadow-2xl ring-1 ring-black/5 focus:outline-none border border-gray-100">
                          {(categories.length > 0 ? categories : fallbackVehicles).map((item, index) => {
                            const itemName = typeof item === 'object' ? item.categoryName : item;
                            const itemPrice = typeof item === 'object' && item.priceStartingFrom ? `(From ₹${item.priceStartingFrom})` : '';
                            const itemKey = typeof item === 'object' ? item._id : index;

                            return (
                              <Listbox.Option key={itemKey} className={({ active }) => `relative cursor-pointer select-none py-2.5 pl-10 pr-4 transition-colors ${active ? 'bg-secondary/10 text-primary font-bold' : 'text-gray-700 font-medium'}`} value={itemName}>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Pickup Location *</label>
                    <input type="text" name="originCity" required value={formData.originCity} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" placeholder="Pickup City" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Drop Location</label>
                    <input type="text" name="destinationCity" value={formData.destinationCity} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" placeholder="Drop City" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number *</label>
                    <input type="tel" name="customerPhone" required value={formData.customerPhone} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" placeholder="10-digit number" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Shifting Date</label>
                    <input type="date" name="shiftingDate" value={formData.shiftingDate} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Vehicle Details</label>
                  <textarea name="customerComment" value={formData.customerComment} onChange={handleChange} rows="2" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors resize-none" placeholder="Make, Model, Year (e.g. Honda City 2022)"></textarea>
                </div>

                <button type="submit" disabled={isLoading} className="w-full mt-2 bg-secondary hover:bg-opacity-90 disabled:bg-gray-400 text-primary font-black py-4 rounded-lg transition-colors text-lg shadow-lg">
                  {isLoading ? 'Calculating...' : 'Submit Request'}
                </button>
              </form>
            </div>
          </div>

          <div className="w-full lg:w-7/12 text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Car Transport Service in <span className="text-secondary">{displayCity}</span> <br className="hidden md:block" /> for City & Interstate Relocations
            </h1>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-10 max-w-2xl">
              From compact cars to luxury SUVs, your vehicle is often the one thing that keeps your routine practical. When you&apos;re shifting homes or cities, trying to drive it yourself through long distances and tight timelines can quietly drain all your energy. Pradhan Service&apos;s car transport service in {displayCity} gives you a structured, secure way to handle vehicle relocation.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 md:gap-10 border-t border-white/20 pt-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 border border-secondary/30">
                  <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Free in-Transit Insurance</p>
                  <p className="text-xs text-gray-400 font-medium">Full Comprehensive Protection</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 border border-secondary/30">
                  <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">99% on Time Pickup</p>
                  <p className="text-xs text-gray-400 font-medium">Timely GPS-Tracked Delivery</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}