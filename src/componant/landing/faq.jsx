"use client";

import React from 'react';
import Link from 'next/link';
import { Disclosure, Transition, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDown, Phone } from 'lucide-react';

export default function FaqSection() {
  const faqs = [
  {
    id: 1,
    question: "What is the average home shifting cost?",
    answer: (
      <span>
        There is no fixed cost for home shifting. It depends on factors like distance, size of goods, packing materials, transport type, and manpower required. As a top-tier{" "}
        <Link href="https://pradhanservice.com/packers-and-movers-in-kolkata" className="text-secondary hover:underline font-bold">
          packers and movers
        </Link>
        {" "}service, we provide customized quotes based on your specific needs.
      </span>
    )
  },
  {
    id: 2,
    question: "Is night shifting possible?",
    answer: (
      <span>
        Yes, night shifting is possible. However, clients should ensure prior permission and clear communication with society management or neighbors to avoid any issues during the shifting process. For regular updates on shifting rules, feel free to read our latest posts on our{" "}
        <Link href="https://blog.pradhanservice.com/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline font-bold">
          blogs
        </Link>
        .
      </span>
    )
  },
  {
    id: 3,
    question: "Which carton quality is used during shifting?",
    answer: "We use custom-sized 2' x 1.5' high-durability cartons tailored to your move. Long-distance relocations feature reinforced wall protection, while intracity shifts utilize high-grade standard boxes for agile yet secure handling."
  },
  {
    id: 4,
    question: "Can antique furniture be shifted safely?",
    answer: "Yes, absolutely. We have a dedicated and experienced team specialized in handling antique items with utmost care and safety."
  },
  {
    id: 5,
    question: "What if a delay happens?",
    answer: "Delays can occur due to reasons like traffic restrictions, weather conditions, or rare vehicle issues. However, we ensure clear communication and are committed to completing your shifting within a maximum of 12 business days."
  },
  {
    id: 6,
    question: "How are complaints handled?",
    answer: "With our years of experience, complaints are extremely rare. However, if any issue arises, we handle it professionally and ensure a quick resolution with 100% customer satisfaction."
  },
  {
    id: 7,
    question: "Do you provide packing and unpacking services?",
    answer: (
      <span>
        Yes, we offer complete packing and unpacking services using quality materials to ensure the safety of your belongings. If you have extra items requiring short-term space, we also facilitate premium{" "}
        <Link href="https://pradhanservice.com/storage-solutions-in-kolkata" className="text-secondary hover:underline font-bold">
          storage solutions
        </Link>
        .
      </span>
    )
  },
  {
    id: 8,
    question: "Is insurance available for goods during shifting?",
    answer: (
      <span>
        Yes, we provide insurance options for added protection, especially for long-distance and valuable items. This includes specialized vehicle shipments like our secure{" "}
        <Link href="https://pradhanservice.com/bike-transportation-in-kolkata" className="text-secondary hover:underline font-bold">
          bike transports
        </Link>
        {" "}and dedicated transit lines for{" "}
        <Link href="https://pradhanservice.com/car-transportation-in-kolkata" className="text-secondary hover:underline font-bold">
          car transports
        </Link>
        .
      </span>
    )
  },
  {
    id: 9,
    question: "How early should I book my shifting service?",
    answer: "We recommend booking at least 7 days in advance to ensure availability and smooth planning of your move."
  }
];

  return (
    <section className="container px-4 pt-8 pb-16 md:py-20 relative z-10">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        
        {/* Left Column: Header & Contact Info */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8 lg:sticky lg:top-32">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/10 border border-secondary/20 text-secondary rounded-full font-bold text-xs uppercase tracking-widest">
               Help Center
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-primary leading-tight tracking-tight">
              People <span className="text-secondary italic">Also Ask</span>
            </h2>
            <p className="text-gray-500 text-lg font-medium leading-relaxed">
              Find answers to common concerns about relocation, pricing, and safety. Still have questions? Our support team is active 24/7.
            </p>
          </div>

          <div className="p-8 bg-slate-50 border border-gray-100 rounded-4xl space-y-6">
            <p className="text-primary font-bold text-sm uppercase tracking-wider">Meet our support lead</p>
            <div className="flex -space-x-3 overflow-hidden">
              {[1, 2, 3, 4].map((num) => (
                <img
                  key={num}
                  className="inline-block h-12 w-12 rounded-full ring-4 ring-slate-50 object-cover"
                  src={`https://dummyimage.com/100x100/112440/c5a059&text=Agent+${num}`}
                  alt="Support Agent"
                />
              ))}
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-secondary text-white text-xs font-bold ring-4 ring-slate-50">
                +2
              </div>
            </div>

            <a 
              href="tel:+919830070983"
              className="group flex items-center justify-between bg-primary text-white p-2 pl-6 rounded-2xl transition-all hover:shadow-xl hover:shadow-primary/20"
            >
              <span className="font-bold tracking-tight">+91 9830070983</span>
              <div className="bg-secondary p-3 rounded-xl group-hover:scale-110 transition-transform">
                <Phone size={20} fill="currentColor" />
              </div>
            </a>
          </div>
        </div>

        {/* Right Column: Headless UI Accordions */}
        <div className="w-full lg:w-2/3 flex flex-col gap-5">
          {faqs.map((faq, index) => (
            <Disclosure key={faq.id} defaultOpen={index === 0}>
              {({ open }) => (
                <div 
                  className={`group border rounded-4xl overflow-hidden transition-all duration-300 ${
                    open 
                      ? 'border-secondary/30 bg-white shadow-xl shadow-secondary/5' 
                      : 'border-gray-100 bg-slate-50/50 hover:bg-white hover:border-gray-200'
                  }`}
                >
                  <DisclosureButton className="flex w-full justify-between items-center px-8 py-7 text-left focus:outline-none">
                    <span className={`text-lg font-bold transition-colors duration-300 ${open ? 'text-primary' : 'text-gray-600'}`}>
                      {faq.question}
                    </span>
                    
                    <div 
                      className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-500 ${
                        open ? 'bg-secondary text-white rotate-180 shadow-lg shadow-secondary/30' : 'bg-white text-gray-400 border border-gray-100'
                      }`}
                    >
                      <ChevronDown size={20} strokeWidth={2.5} />
                    </div>
                  </DisclosureButton>
                  
                  <Transition
                    enter="transition duration-300 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-200 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <DisclosurePanel className="px-8 pb-8 text-gray-500 font-medium leading-relaxed">
                      <div className="pt-4 border-t border-gray-50">
                        {faq.answer}
                      </div>
                    </DisclosurePanel>
                  </Transition>
                </div>
              )}
            </Disclosure>
          ))}
        </div>

      </div>
    </section>
  );
}