"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function FineArtHero({ cityName }) {
  const displayCity = cityName || 'Your City';

  // 1. Fetching Dynamic Categories from your Backend
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/service-options/service/fine-art-movement`);
        const data = await res.json();
        if (data.success && data.data.options) {
          setCategories(data.data.options);
        }
      } catch (error) {
        console.error("Failed to fetch fine art categories", error);
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
      serviceRequested: 'fine-art-movement',
      customFields: { 
        ItemCategory: itemCategory 
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

      toast.success('Consultation request sent successfully!');
      
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
    <section className="relative w-full min-h-[90vh] bg-gray-50 flex items-center pt-24 pb-16 lg:py-16 overflow-hidden">
      {/* Rule 1: container WITHOUT mx-auto */}
      <div className="container px-4 max-w-7xl">
        
        {/* CHANGED: items-stretch makes both columns equal height organically */}
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-12 lg:gap-8">
          
          {/* LEFT SIDE: Typography & The Elegant Form Box */}
          <div className="w-full lg:w-5/12 z-10 flex flex-col justify-center">
            <div className="inline-block border-b border-gray-300 pb-2 mb-6">
              <span className="text-secondary uppercase tracking-[0.2em] text-xs font-bold">
                White Glove Logistics
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-primary leading-[1.1] mb-6 font-serif">
              Preserving <br />
              <span className="italic text-secondary">Masterpieces</span> <br />
              in {displayCity}.
            </h1>
            
            <p className="text-gray-600 text-sm md:text-base leading-relaxed font-light max-w-md mb-8">
              Sculptures, antiques, and gallery collections require a curated transit experience with climate-controlled handling and bespoke crating.
            </p>

            {/* THE NEW "BOXED" FORM */}
            <div className="bg-white border border-gray-200 p-6 md:p-8 shadow-2xl relative">
              {/* Decorative corner accents in Brand Secondary Color */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-secondary"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-secondary"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-secondary"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-secondary"></div>

              <h3 className="text-primary font-serif text-lg mb-6 border-b border-gray-100 pb-4">
                Request a Private Consultation
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Row 1: Contact Basics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Full Name *</label>
                    <input type="text" name="customerName" required value={formData.customerName} onChange={handleChange} className="w-full border-b border-gray-300 bg-transparent py-2 text-sm text-primary outline-none focus:border-primary transition-colors" placeholder="Your Name" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Email Address *</label>
                    <input type="email" name="customerEmail" required value={formData.customerEmail} onChange={handleChange} className="w-full border-b border-gray-300 bg-transparent py-2 text-sm text-primary outline-none focus:border-primary transition-colors" placeholder="Email" />
                  </div>
                </div>

                {/* Row 2: Locations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Pickup Location *</label>
                    <input type="text" name="originCity" required value={formData.originCity} onChange={handleChange} className="w-full border-b border-gray-300 bg-transparent py-2 text-sm text-primary outline-none focus:border-primary transition-colors" placeholder="Gallery / Estate" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Destination</label>
                    <input type="text" name="destinationCity" value={formData.destinationCity} onChange={handleChange} className="w-full border-b border-gray-300 bg-transparent py-2 text-sm text-primary outline-none focus:border-primary transition-colors" placeholder="Delivery City" />
                  </div>
                </div>

                {/* Row 3: Phone & Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Phone Number *</label>
                    <input type="tel" name="customerPhone" required value={formData.customerPhone} onChange={handleChange} className="w-full border-b border-gray-300 bg-transparent py-2 text-sm text-primary outline-none focus:border-primary transition-colors" placeholder="Contact Number" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Moving Date</label>
                    <input type="date" name="shiftingDate" value={formData.shiftingDate} onChange={handleChange} className="w-full border-b border-gray-300 bg-transparent py-2 text-sm text-primary outline-none focus:border-primary transition-colors" />
                  </div>
                </div>

                {/* Row 4: Dynamic Categories */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Item Category</label>
                  <select name="itemCategory" value={formData.itemCategory} onChange={handleChange} className="w-full border-b border-gray-300 bg-transparent py-2 text-sm text-primary outline-none focus:border-primary transition-colors appearance-none rounded-none">
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.categoryName}>
                        {cat.categoryName} {cat.priceStartingFrom ? `(From ₹${cat.priceStartingFrom})` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Row 5: Comment/Description */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Description / Requirements</label>
                  <textarea name="customerComment" value={formData.customerComment} onChange={handleChange} rows="2" className="w-full border-b border-gray-300 bg-transparent py-2 text-sm text-primary outline-none focus:border-primary transition-colors resize-none" placeholder="Specific handling instructions, dimensions, etc." />
                </div>

                {/* Submit Button */}
                <button type="submit" disabled={isLoading} className="w-full mt-6 bg-primary hover:bg-opacity-90 disabled:bg-gray-400 text-white uppercase tracking-[0.15em] text-xs font-bold py-4 transition-colors">
                  {isLoading ? 'Processing...' : 'Secure Your Move'}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT SIDE: Tall, Elegant Image - Now naturally stretches! */}
          <div className="w-full lg:w-6/12 relative min-h-[500px] lg:min-h-full rounded-t-[100px] lg:rounded-t-[300px] overflow-hidden shadow-2xl mt-8 lg:mt-0">
             <div className="absolute inset-0 bg-primary/10 z-10"></div> 
             <Image 
              src="https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?q=80&w=2000&auto=format&fit=crop" 
              alt={`Fine Art Handling in ${displayCity}`}
              fill
              className="object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}