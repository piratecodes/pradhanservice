"use client";

import React, { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ShieldCheck, ChevronDown, Target, Loader2 } from 'lucide-react';

const serviceBranches = [
  { id: 1, name: 'Indian Army' },
  { id: 2, name: 'Indian Navy' },
  { id: 3, name: 'Indian Air Force' },
  { id: 4, name: 'Paramilitary / Coast Guard' },
];

export default function DefenceRelocationHero({ cityName }) {
  const displayCity = cityName || 'Your City';
  
  const [selectedBranch, setSelectedBranch] = useState(serviceBranches[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    rankName: '',
    destinationBase: '',
    targetDate: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const payload = {
      ...formData,
      branch: selectedBranch.name,
      originCity: displayCity
    };

    // Simulated API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Mission Dispatched:", payload);
    
    setIsSubmitting(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="container px-4 relative min-h-[85vh] flex flex-col justify-between pt-32 pb-12">
      
      {/* TOP: Authoritative Messaging (Transparent Background) */}
      <div className="relative z-10 w-full max-w-5xl flex-grow flex flex-col justify-center mb-20">
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-secondary/10 border border-secondary/20 rounded-full mb-8 w-fit">
          <ShieldCheck className="text-secondary" size={16} />
          <span className="text-secondary text-xs font-black uppercase tracking-[0.2em]">Official Armed Forces Relocation Partner</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-8 text-primary leading-[0.9]">
          Secure <br />
          <span className="text-secondary italic">Deployment</span> <br />
          <span className="text-3xl md:text-5xl tracking-normal normal-case font-medium text-gray-400">Logistics out of {displayCity}</span>
        </h1>
        
        <div className="flex flex-wrap gap-10 md:gap-16 mt-4">
           <div className="flex flex-col">
             <span className="text-4xl font-black text-primary leading-none tracking-tighter">100%</span>
             <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2">Cantonment Access</span>
           </div>
           <div className="flex flex-col border-l border-gray-100 pl-10">
             <span className="text-4xl font-black text-primary leading-none tracking-tighter">24/7</span>
             <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2">Priority Routing</span>
           </div>
           <div className="flex flex-col border-l border-gray-100 pl-10">
             <span className="text-4xl font-black text-primary leading-none tracking-tighter">Zero</span>
             <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2">Operational Lag</span>
           </div>
        </div>
      </div>

      {/* BOTTOM: Horizontal Command Panel (Light/Clean Version) */}
      <div className="relative z-20 w-full bg-slate-50 border border-gray-100 p-8 md:p-12 pb-20 rounded-[3.5rem] shadow-xl shadow-primary/5">
        <div className="w-full">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
            
            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Service Branch</label>
              <Listbox value={selectedBranch} onChange={setSelectedBranch}>
                <div className="relative">
                  <Listbox.Button className="relative w-full cursor-pointer bg-white border border-gray-200 py-4 px-5 text-left text-primary rounded-2xl focus:outline-none focus:border-secondary transition-all font-bold">
                    <span className="block truncate">{selectedBranch.name}</span>
                    <span className="absolute inset-y-0 right-4 flex items-center">
                      <ChevronDown size={18} className="text-secondary" />
                    </span>
                  </Listbox.Button>
                  <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <Listbox.Options className="absolute bottom-full z-50 mb-4 max-h-60 w-full overflow-auto bg-white border border-gray-100 py-2 shadow-2xl focus:outline-none rounded-2xl">
                      {serviceBranches.map((branch) => (
                        <Listbox.Option key={branch.id} className={({ active }) => `relative cursor-pointer select-none py-4 px-6 ${active ? 'bg-primary text-white' : 'text-primary'}`} value={branch}>
                          {({ selected }) => <span className={`block truncate font-bold`}>{branch.name}</span>}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Rank & Name</label>
              <input 
                required
                name="rankName"
                type="text" 
                value={formData.rankName}
                onChange={handleInputChange}
                placeholder="e.g., Maj. Sharma" 
                className="w-full bg-white border border-gray-200 rounded-2xl py-4 px-5 text-primary placeholder:text-gray-300 outline-none focus:border-secondary transition-all font-bold" 
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Target Base</label>
              <input 
                required
                name="destinationBase"
                type="text" 
                value={formData.destinationBase}
                onChange={handleInputChange}
                placeholder="City or Unit" 
                className="w-full bg-white border border-gray-200 rounded-2xl py-4 px-5 text-primary placeholder:text-gray-300 outline-none focus:border-secondary transition-all font-bold" 
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Deployment Date</label>
              <input 
                required
                name="targetDate"
                type="date" 
                value={formData.targetDate}
                onChange={handleInputChange}
                className="w-full bg-white border border-gray-200 rounded-2xl py-4 px-5 text-primary outline-none focus:border-secondary transition-all font-bold" 
              />
            </div>

            <button 
              disabled={isSubmitting}
              type="submit" 
              className="w-full bg-primary hover:bg-black text-white font-black py-4 rounded-2xl uppercase tracking-[0.15em] text-sm transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Target size={18} />
              )}
              {isSubmitting ? "Syncing..." : "Begin Mission"}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}