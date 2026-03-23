"use client";

import React, { useState, useEffect, useRef, Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Transition, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDown, MapPin, Package, Car, Briefcase, Palette, Truck, Factory, Shield, Wrench, CheckSquare, Menu, X } from 'lucide-react';

import icon from '@/assets/icon.png';

const SERVICES = [
  { name: 'Packers & Movers', slug: 'packers-and-movers', icon: Package },
  { name: 'Car & Bike Transport', slug: 'car-and-bike-transport', icon: Car },
  { name: 'Office Relocation', slug: 'office-relocation', icon: Briefcase },
  { name: 'Fine Art Movement', slug: 'fine-art-movement', icon: Palette },
  // { name: 'Warehousing', slug: 'ware-housing', icon: Truck },
  { name: 'Factory Moving', slug: 'factory-moving', icon: Factory },
  { name: 'Defence Relocation', slug: 'defence-relocation-service', icon: Shield },
  { name: 'Appliance Setup', slug: 'home-appliance-uninstall-and-install', icon: Wrench },
  { name: 'After Shifting', slug: 'after-shifting-services', icon: CheckSquare }
];

export default function Nav() {
  const [cities, setCities] = useState([]);
  const [hoveredService, setHoveredService] = useState(SERVICES[0]);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  
  // Tracking just the Services dropdown area for outside clicks
  const servicesMenuRef = useRef(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cities`);
        console.log(`${process.env.NEXT_PUBLIC_API_URL}/cities`);
        const data = await res.json();
        if (data.success) setCities(data.data.cities || []);
      } catch (err) {
        console.error("Nav City Fetch Error:", err);
      }
    };
    fetchCities();

    // Global Listener: Forces menu to close when clicking outside the 'servicesMenuRef'
    const handleClickOutside = (event) => {
      if (servicesMenuRef.current && !servicesMenuRef.current.contains(event.target)) {
        setIsDesktopMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white sticky top-0 left-0 w-full z-50 border-b bg-blue-50/50 backdrop-blur-md">
      {/* Standard Tailwind max-w-7xl instead of max-w-8xl */}
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4 relative">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center space-x-3 shrink-0">
          <Image 
            src={icon} 
            alt="Pradhan Logo" 
            className="h-10 w-auto object-contain" 
            draggable={false} 
            priority
          />
          <span className="self-center text-xl text-[#112440] font-black whitespace-nowrap tracking-tight">Pradhan Services</span>
        </Link>

        {/* --- DESKTOP NAVIGATION --- */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex items-center space-x-6 lg:space-x-8 font-bold text-sm text-gray-700">
            {/* Standard rounded-full for pill shape */}
            <li><Link href="/" className="border border-black block py-2 px-5 rounded-full hover:bg-black hover:text-white transition-all leading-none">Home</Link></li>
            <li><Link href="/about" className="border border-black block py-2 px-5 rounded-full hover:bg-black hover:text-white transition-all leading-none">About</Link></li>

            {/* SERVICES MEGA MENU (DESKTOP) */}
            <div className="relative" ref={servicesMenuRef}>
              <button 
                onClick={() => setIsDesktopMenuOpen(!isDesktopMenuOpen)}
                className="border border-black flex items-center gap-2 py-2 px-5 rounded-full hover:bg-black hover:text-white transition-all outline-none leading-none"
              >
                Services <ChevronDown size={14} className={`transition-transform duration-200 ${isDesktopMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <Transition
                show={isDesktopMenuOpen}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                {/* 🚀 STANDARD TAILWIND CENTERING: absolute top-full left-1/2 -translate-x-1/2 🚀 */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 z-50 mt-4 w-screen max-w-4xl px-4 sm:px-0">
                  <div className="overflow-hidden rounded-3xl shadow-2xl bg-white flex border border-gray-100 min-h-[500px]">
                    
                    {/* LEFT: Categories */}
                    <div className="w-5/12 bg-gray-50/80 p-8 border-r border-gray-100">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-black mb-6 pl-2">Categories</p>
                      <div className="space-y-1">
                        {SERVICES.map((item) => {
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.slug}
                              onMouseEnter={() => setHoveredService(item)}
                              className={`w-full flex items-center gap-4 px-5 py-3 rounded-2xl transition-all text-left ${
                                hoveredService.slug === item.slug 
                                ? 'bg-[#112440] text-white shadow-xl' 
                                : 'text-gray-600 hover:bg-white hover:text-[#112440]'
                              }`}
                            >
                              <Icon size={18} className={hoveredService.slug === item.slug ? 'text-[#c5a059]' : ''} />
                              <span className="text-sm font-bold">{item.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* RIGHT: Dynamic Cities for selected service */}
                    <div className="w-7/12 p-8 bg-white overflow-y-auto max-h-[550px]">
                      <p className="text-[10px] uppercase tracking-widest text-[#c5a059] font-black mb-6 flex items-center gap-2">
                        <MapPin size={12} /> Coverage Locations
                      </p>
                      <div className="grid grid-cols-1 gap-1">
                        {cities.map((city) => (
                          <Link
                            key={city._id}
                            href={`/${hoveredService.slug}-in-${city.citySlug}`}
                            onClick={() => setIsDesktopMenuOpen(false)}
                            className="group flex items-center justify-between px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                          >
                            <span className="text-sm font-bold text-gray-700 group-hover:text-[#112440]">
                              {hoveredService.name} <span className="text-gray-400 font-normal mx-1">in</span> {city.cityName}
                            </span>
                            <span className="text-[#c5a059] opacity-0 group-hover:opacity-100 transition-opacity font-bold">→</span>
                          </Link>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </Transition>
            </div>
            <li><a target="_blank" href="https://blog.pradhanservice.com" className="border border-black block py-2 px-5 rounded-full hover:bg-black hover:text-white transition-all leading-none">Blogs</a></li>
            <li><Link href="/contact" className="border border-black block py-2 px-5 rounded-full hover:bg-black hover:text-white transition-all leading-none">Contact</Link></li>
          </ul>
        </div>

        {/* --- ACTIONS & MOBILE --- */}
        <div className="flex items-center space-x-3">
          <button className="hidden sm:block text-white bg-black rounded-lg hover:bg-zinc-800 font-medium text-sm px-5 py-2">Get started</button>
          
          <Disclosure as="div" className="md:hidden">
            {({ open }) => (
              <>
                <DisclosureButton className="p-2 text-gray-600 outline-none">
                  {open ? <X size={28} /> : <Menu size={28} />}
                </DisclosureButton>

                <Transition
                  as={Fragment}
                  enter="transition duration-150 ease-out"
                  enterFrom="opacity-0 -translate-y-2"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition duration-100 ease-in"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 -translate-y-2"
                >
                  <DisclosurePanel className="fixed top-full left-0 w-full bg-white border-b shadow-2xl z-[110] h-[calc(100vh-72px)] overflow-y-auto pb-20">
                    <div className="p-6 space-y-2">
                      <Link href="/" className="block text-xl font-bold border-b border-gray-50 pb-3">Home</Link>
                      <Link href="/about" className="block text-xl font-bold border-b border-gray-50 pb-3">About</Link>
                      
                      <div className="py-4">
                        <p className="text-[10px] uppercase text-[#c5a059] font-black mb-4 tracking-widest px-1">Services & Cities</p>
                        <div className="space-y-3">
                          {SERVICES.map(s => {
                            const MobileIcon = s.icon;
                            return (
                              <Disclosure key={s.slug} as="div">
                                {({ open: serviceOpen }) => (
                                  <>
                                    <DisclosureButton className="flex items-center justify-between w-full font-bold text-gray-800 text-lg py-1">
                                      <div className="flex items-center gap-3">
                                        <MobileIcon size={20} className="text-[#c5a059]" />
                                        <span>{s.name}</span>
                                      </div>
                                      <ChevronDown size={16} className={`transition-transform ${serviceOpen ? 'rotate-180' : ''}`} />
                                    </DisclosureButton>
                                    
                                    <DisclosurePanel className="mt-2 ml-8 space-y-2 border-l-2 border-gray-100 pl-4 py-2">
                                      {cities.length > 0 ? (
                                        cities.map(city => (
                                          <Link 
                                            key={city._id} 
                                            href={`/${s.slug}-in-${city.citySlug}`}
                                            className="block text-sm font-semibold text-gray-500 py-1.5 hover:text-[#112440]"
                                          >
                                            {city.cityName}
                                          </Link>
                                        ))
                                      ) : (
                                        <p className="text-xs text-gray-400">Loading cities...</p>
                                      )}
                                    </DisclosurePanel>
                                  </>
                                )}
                              </Disclosure>
                            );
                          })}
                        </div>
                      </div>
                      
                      <Link href="/contact" className="block text-xl font-bold pt-4">Contact</Link>
                      <button className="w-full bg-black text-white font-bold py-4 rounded-full mt-10 text-lg">Book a Service</button>
                    </div>
                  </DisclosurePanel>
                </Transition>
              </>
            )}
          </Disclosure>
        </div>

      </div>
    </nav>
  );
}