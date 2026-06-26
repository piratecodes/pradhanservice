"use client";

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function FactoryMovingHero({ cityName }) {
  const displayCity = cityName || 'Your City';

  // 1. Fetching Dynamic Categories from your Backend
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/service-options/service/factory-moving`);
        const data = await res.json();
        if (data.success && data.data.options) {
          setCategories(data.data.options);
        }
      } catch (error) {
        console.error("Failed to fetch factory moving categories", error);
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

    const { itemCategory, ...restFormData } = formData;
    const payload = {
      ...restFormData,
      serviceRequested: 'factory-moving',
      customFields: { 
        PrimaryEquipment: itemCategory 
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

      // Heavy Industrial Toast Message
      toast.success(
        "Site Survey Request Logged. Our industrial engineers will review your requirements and contact you shortly to scope the project.",
        {
          duration: 6000,
          style: {
            border: '2px solid #c5a059', // Secondary Gold
            padding: '16px',
            color: '#112440',            // Primary Navy
            background: '#fff',
            fontWeight: '700',
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

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-center bg-gray-50 overflow-hidden">
      
      {/* Heavy Industrial Graphic Overlay */}
      <div className="absolute right-0 bottom-0 w-[800px] h-[800px] bg-[url('https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-multiply pointer-events-none"></div>

      {/* Rule 1: container WITHOUT mx-auto */}
      <div className="container relative z-10 px-4 max-w-7xl py-20">
        
        {/* Branded Warning/Safety Banner */}
        <div className="w-full bg-secondary text-primary text-center py-2.5 font-black text-xs md:text-sm tracking-[0.2em] uppercase mb-12 shadow-md">
          ⚠ ISO 9001 Certified Industrial Relocation Specialists ⚠
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* LEFT: Engineering Copy */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-primary leading-[0.9] uppercase mb-6">
              Heavy <br />
              <span className="text-secondary opacity-90">Machinery</span> <br />
              Relocation.
            </h1>
            
            <p className="text-gray-600 text-lg md:text-xl font-medium max-w-lg mb-8">
              Expert dismantling, heavy-lifting, and precision installation in {displayCity}. We don&apos;t just move equipment; we manage the complex engineering required to transport your factory floor safely.
            </p>

            <ul className="space-y-4 mb-10">
              <li className="flex items-center text-primary font-bold">
                <span className="w-6 h-6 bg-primary text-secondary flex items-center justify-center text-sm mr-3 shadow-sm">✓</span>
                Hydraulic Gantry Systems & Cranes
              </li>
              <li className="flex items-center text-primary font-bold">
                <span className="w-6 h-6 bg-primary text-secondary flex items-center justify-center text-sm mr-3 shadow-sm">✓</span>
                Millwrighting & Precision Leveling
              </li>
              <li className="flex items-center text-primary font-bold">
                <span className="w-6 h-6 bg-primary text-secondary flex items-center justify-center text-sm mr-3 shadow-sm">✓</span>
                Turnkey Plant Disassembly
              </li>
            </ul>
          </div>

          {/* RIGHT: The Industrial Form Box */}
          <div className="w-full lg:w-1/2">
            <div className="bg-primary p-8 md:p-10 shadow-2xl relative border-t-8 border-secondary">
              <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">Project Scoping</h3>
              <p className="text-gray-400 mb-8 font-medium">Deploy our structural engineers to {displayCity}.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Row 1: Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-widest mb-2">Project Lead Name *</label>
                    <input type="text" name="customerName" required value={formData.customerName} onChange={handleChange} className="w-full bg-white/5 border border-white/10 py-3 px-4 text-white outline-none focus:border-secondary transition-colors" placeholder="Full Name" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-widest mb-2">Corporate Email *</label>
                    <input type="email" name="customerEmail" required value={formData.customerEmail} onChange={handleChange} className="w-full bg-white/5 border border-white/10 py-3 px-4 text-white outline-none focus:border-secondary transition-colors" placeholder="work@company.com" />
                  </div>
                </div>

                {/* Row 2: Locations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-widest mb-2">Current Site *</label>
                    <input type="text" name="originCity" required value={formData.originCity} onChange={handleChange} className="w-full bg-white/5 border border-white/10 py-3 px-4 text-white outline-none focus:border-secondary transition-colors" placeholder="Origin City" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-widest mb-2">Destination Site</label>
                    <input type="text" name="destinationCity" value={formData.destinationCity} onChange={handleChange} className="w-full bg-white/5 border border-white/10 py-3 px-4 text-white outline-none focus:border-secondary transition-colors" placeholder="Delivery City" />
                  </div>
                </div>

                {/* Row 3: Phone & Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-widest mb-2">Direct Phone *</label>
                    <input type="tel" name="customerPhone" required value={formData.customerPhone} onChange={handleChange} className="w-full bg-white/5 border border-white/10 py-3 px-4 text-white outline-none focus:border-secondary transition-colors" placeholder="Phone Number" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-widest mb-2">Target Date</label>
                    <input type="date" name="shiftingDate" value={formData.shiftingDate} onChange={handleChange} className="w-full bg-white/5 border border-white/10 py-3 px-4 text-white outline-none focus:border-secondary transition-colors [color-scheme:dark]" />
                  </div>
                </div>

                {/* Row 4: Machinery Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-widest mb-2">Primary Equipment</label>
                  <select name="itemCategory" value={formData.itemCategory} onChange={handleChange} className="w-full bg-white/5 border border-white/10 py-3 px-4 text-white outline-none focus:border-secondary transition-colors appearance-none cursor-pointer">
                    <option value="" className="text-black">Select Equipment Type</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.categoryName} className="text-black">
                        {cat.categoryName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Row 5: Specs / Comments */}
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-widest mb-2">Specs & Est. Tonnage</label>
                  <textarea name="customerComment" value={formData.customerComment} onChange={handleChange} rows="2" className="w-full bg-white/5 border border-white/10 py-3 px-4 text-white outline-none focus:border-secondary transition-colors resize-none" placeholder="e.g., 50 Tons, Requires cleanroom protocol..." />
                </div>

                {/* Submit Button */}
                <button type="submit" disabled={isLoading} className="w-full mt-4 bg-secondary hover:bg-opacity-90 disabled:bg-gray-500 text-primary font-black py-4 uppercase tracking-[0.15em] text-lg transition-colors shadow-lg">
                  {isLoading ? 'Processing...' : 'Request Site Survey →'}
                </button>
              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}