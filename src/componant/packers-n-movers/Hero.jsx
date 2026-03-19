"use client";

import React, { useState } from 'react';
import { Tab, TabGroup, TabList, TabPanels, TabPanel } from '@headlessui/react';
import toast from 'react-hot-toast'; // Assuming you are using hot-toast for alerts

export default function Hero({ cityName }) {
  const classNames = (...classes) => classes.filter(Boolean).join(' ');

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Within City');

  // 1. Master Form State matching your Mongoose Lead Schema
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    originCity: cityName, // Default to the city from the URL
    destinationCity: '',
    shiftingDate: '',
    customerComment: '',
  });

  // 2. Handle simple text changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Submit to Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Build the payload mapping exactly to Lead.js
    const payload = {
      ...formData,
      serviceRequested: 'Packers and Movers', // Hardcoded for this specific Hero
      customFields: { moveType: activeTab }   // Save which tab they were looking at!
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to submit quote');

      toast.success('Quote request sent successfully! We will contact you soon.');
      
      // Clear form
      setFormData({
        customerName: '', customerEmail: '', customerPhone: '', 
        originCity: cityName, destinationCity: '', shiftingDate: '', customerComment: ''
      });
      
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 ">
      <div className="container px-4">
        
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 bg-white shadow-sm">
            <span className="text-secondary">★</span>
            <span className="text-xs md:text-sm font-medium text-gray-700">Rated 4.6/5 by 475+ Happy Clients!</span>
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            <span className="text-secondary">Best</span> Packers and <br className="hidden md:block" /> Movers in {cityName}
          </h1>
        </div>

        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            Shifting in {cityName} is not just about booking a truck for one day...
          </p>
        </div>

        {/* 🚀 THE FORM WRAPPER */}
        <form onSubmit={handleSubmit} className="w-full max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-3xl shadow-2xl border border-gray-100">
          
          {/* UNIVERSAL TOP FIELDS (Name & Email) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Full Name *</label>
              <input type="text" name="customerName" required value={formData.customerName} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary outline-none transition-all" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address *</label>
              <input type="email" name="customerEmail" required value={formData.customerEmail} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary outline-none transition-all" placeholder="john@example.com" />
            </div>
          </div>

          <TabGroup onChange={(index) => {
            const tabs = ['Within City', 'Between Cities', 'City Tempo'];
            setActiveTab(tabs[index]);
          }}>
            <TabList className="flex justify-center mb-6">
              <div className="inline-flex p-1 bg-gray-100 rounded-xl border border-gray-200">
                {['Within City', 'Between Cities', 'City Tempo'].map((tab) => (
                  <Tab key={tab} className={({ selected }) => classNames(
                      'px-6 py-2.5 text-sm font-bold rounded-lg transition-all outline-none',
                      selected ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:text-primary'
                    )}>
                    {tab}
                  </Tab>
                ))}
              </div>
            </TabList>

            <TabPanels>
              {/* PANEL 1: Within City (Hides Destination) */}
              <TabPanel className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Origin City *</label>
                  <input type="text" name="originCity" required value={formData.originCity} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Phone *</label>
                  <input type="text" name="customerPhone" required value={formData.customerPhone} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary outline-none" placeholder="10-digit number" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Date</label>
                  <input type="date" name="shiftingDate" value={formData.shiftingDate} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary outline-none" />
                </div>
              </TabPanel>

              {/* PANEL 2: Between Cities (Shows Destination) */}
              <TabPanel className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Pickup City *</label>
                  <input type="text" name="originCity" required value={formData.originCity} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Drop City</label>
                  <input type="text" name="destinationCity" value={formData.destinationCity} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary outline-none" placeholder="Enter Drop City" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Phone *</label>
                  <input type="text" name="customerPhone" required value={formData.customerPhone} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary outline-none" placeholder="10-digit number" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Date</label>
                  <input type="date" name="shiftingDate" value={formData.shiftingDate} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary outline-none" />
                </div>
              </TabPanel>

              {/* PANEL 3: Tempo (Same as panel 1 for now, customize as needed) */}
              <TabPanel className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 {/* Reusing Within City fields for Tempo visualization */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Pickup Location *</label>
                  <input type="text" name="originCity" required value={formData.originCity} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Phone *</label>
                  <input type="text" name="customerPhone" required value={formData.customerPhone} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Date</label>
                  <input type="date" name="shiftingDate" value={formData.shiftingDate} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary outline-none" />
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>

          {/* UNIVERSAL BOTTOM FIELD (Comments & Submit) */}
          <div className="mt-6 border-t border-gray-100 pt-6">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Special Requirements / Comments</label>
            <textarea name="customerComment" value={formData.customerComment} onChange={handleChange} rows="2" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary outline-none transition-all mb-4" placeholder="Any specific items to move? (e.g. Piano, Pet, etc.)"></textarea>
            
            <button type="submit" disabled={isLoading} className="w-full md:w-auto md:px-12 py-4 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all shadow-lg mx-auto">
              {isLoading ? 'Sending Request...' : 'Get Free Quote Now →'}
            </button>
          </div>

        </form>

      </div>
    </section>
  );
}