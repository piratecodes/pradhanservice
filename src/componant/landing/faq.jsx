"use client";

import React from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDown, Phone } from 'lucide-react';

export default function FaqSection() {
  const faqs = [
    {
      id: 1,
      question: "Are you only in Gurgaon, or do you also handle intercity moves across India?",
      answer: "Pradhan Service is focused locally, but you can also plan intercity moves when you're relocating for work, family, or a new lease. The same process works for local shifting and longer routes, so you don't have to juggle different vendors. Share your pickup and destination city, and the team plans the move accordingly."
    },
    {
      id: 2,
      question: "What makes Pradhan Service packers and movers different from a local vendor with a truck?",
      answer: "We provide verified professionals, end-to-end insurance, and a completely transparent pricing model without hidden charges. Our team handles your goods with industry-grade packing materials, ensuring a premium and damage-free experience."
    },
    {
      id: 3,
      question: "Can Pradhan Service manage society rules like lift booking and fixed loading hours?",
      answer: "Absolutely. Our team coordinates with you in advance to understand your building's specific move-in/move-out guidelines, ensuring we schedule the packing and loading perfectly within your allowed time windows."
    },
    {
      id: 4,
      question: "How early should I book packers and movers for a smooth shifting day?",
      answer: "We recommend booking at least 3 to 5 days in advance for local moves, and 7 to 10 days for intercity relocations. This gives us ample time to assign the right vehicle and packing crew for your specific inventory."
    },
    {
      id: 5,
      question: "How do you protect furniture and fragile items during packing and loading?",
      answer: "We use high-quality bubble wrap, corrugated sheets, foam blankets, and specialized moving cartons. Delicate items like glassware and electronics are given multi-layer protection and loaded into secure compartments in the transport vehicle."
    }
  ];

  return (
    <section className="container px-4 py-20 lg:py-28 relative z-10">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        
        {/* Left Column: Header & Contact Info */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8 lg:sticky lg:top-32">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/10 border border-secondary/20 text-secondary rounded-full font-bold text-xs uppercase tracking-widest">
               Help Center
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-primary leading-tight tracking-tight">
              Common <span className="text-secondary italic">Questions</span>
            </h2>
            <p className="text-gray-500 text-lg font-medium leading-relaxed">
              Find answers to common concerns about relocation, pricing, and safety. Still have questions? Our support team is active 24/7.
            </p>
          </div>

          <div className="p-8 bg-slate-50 border border-gray-100 rounded-[2rem] space-y-6">
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
              href="tel:+918588886465"
              className="group flex items-center justify-between bg-primary text-white p-2 pl-6 rounded-2xl transition-all hover:shadow-xl hover:shadow-primary/20"
            >
              <span className="font-bold tracking-tight">+91 8588886465</span>
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
                  className={`group border rounded-[2rem] overflow-hidden transition-all duration-300 ${
                    open 
                      ? 'border-secondary/30 bg-white shadow-xl shadow-secondary/5' 
                      : 'border-gray-100 bg-slate-50/50 hover:bg-white hover:border-gray-200'
                  }`}
                >
                  <Disclosure.Button className="flex w-full justify-between items-center px-8 py-7 text-left focus:outline-none">
                    <span className={`text-lg font-bold transition-colors duration-300 ${open ? 'text-primary' : 'text-gray-600'}`}>
                      {faq.question}
                    </span>
                    
                    <div 
                      className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-500 ${
                        open ? 'bg-secondary text-white rotate-180 shadow-lg shadow-secondary/30' : 'bg-white text-gray-400 border border-gray-100'
                      }`}
                    >
                      <ChevronDown size={20} strokeWidth={2.5} />
                    </div>
                  </Disclosure.Button>
                  
                  <Transition
                    enter="transition duration-300 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-200 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className="px-8 pb-8 text-gray-500 font-medium leading-relaxed">
                      <div className="pt-4 border-t border-gray-50">
                        {faq.answer}
                      </div>
                    </Disclosure.Panel>
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