"use client";

import React, { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';

const freightTypes = [
  { id: 1, name: 'Full Truckload (FTL)' },
  { id: 2, name: 'Less than Truckload (LTL)' },
  { id: 3, name: 'Cold Chain / Refrigerated' },
  { id: 4, name: 'Oversized / Heavy Freight' },
];

export default function TransportLogisticsHero({ cityName }) {
  const displayCity = cityName || 'Your City';
  const [selectedFreight, setSelectedFreight] = useState(freightTypes[0]);

  return (
    <section className="relative w-full min-h-[85vh] flex items-center pt-24 pb-16 bg-[#0a0f16]">
      {/* Background Image with Dark Wash */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0a0f16]/80 z-10"></div>
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1586528116311-ad8ed7a64a2a?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"></div>
      </div>

      <div className="container relative z-20 px-4 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT: Massive B2B Typography */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-orange-400 text-xs font-bold uppercase tracking-wider">Enterprise Supply Chain</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
              National <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Logistics</span> <br />
              Out of {displayCity}.
            </h1>
            
            <p className="text-gray-400 text-lg max-w-xl leading-relaxed mb-8">
              End-to-end transport solutions designed for scale. From daily LTL shipments to dedicated FTL fleets, we optimize your route, reduce transit times, and provide real-time GPS visibility across the country.
            </p>

            <div className="flex gap-6 border-l-2 border-orange-500 pl-6">
              <div>
                <p className="text-3xl font-bold text-white">500+</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Fleet Vehicles</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">29</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">States Covered</p>
              </div>
            </div>
          </div>

          {/* RIGHT: The Glassmorphism Form with Headless UI */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-2">Freight Inquiry</h3>
            <p className="text-gray-400 text-sm mb-6">Connect with our logistics planning team.</p>

            <form className="space-y-5">
              {/* Headless UI Listbox for Freight Type */}
              <div className="relative">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Freight Type</label>
                <Listbox value={selectedFreight} onChange={setSelectedFreight}>
                  <div className="relative">
                    <Listbox.Button className="relative w-full cursor-pointer bg-black/40 border border-white/10 py-3 pl-4 pr-10 text-left text-white rounded-lg focus:outline-none focus:border-orange-500 transition-colors">
                      <span className="block truncate">{selectedFreight.name}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </Listbox.Button>
                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                      <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-[#1a222e] border border-white/10 py-1 text-base shadow-2xl focus:outline-none sm:text-sm">
                        {freightTypes.map((type) => (
                          <Listbox.Option key={type.id} className={({ active }) => `relative cursor-pointer select-none py-3 pl-4 pr-4 ${active ? 'bg-orange-500/20 text-orange-400' : 'text-gray-300'}`} value={type}>
                            {({ selected }) => (
                              <span className={`block truncate ${selected ? 'font-bold text-white' : 'font-normal'}`}>{type.name}</span>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>

              {/* Text Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Origin</label>
                  <input type="text" defaultValue={displayCity} className="w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 text-white placeholder:text-gray-600 outline-none focus:border-orange-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Destination</label>
                  <input type="text" placeholder="City or Pin" className="w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 text-white placeholder:text-gray-600 outline-none focus:border-orange-500 transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Monthly Vol.</label>
                  <input type="text" placeholder="Tons / Trips" className="w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 text-white placeholder:text-gray-600 outline-none focus:border-orange-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Phone</label>
                  <input type="tel" placeholder="Contact No." className="w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 text-white placeholder:text-gray-600 outline-none focus:border-orange-500 transition-colors" />
                </div>
              </div>

              <button type="button" className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg transition-colors text-sm uppercase tracking-widest shadow-lg shadow-orange-500/20">
                Calculate Freight
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}