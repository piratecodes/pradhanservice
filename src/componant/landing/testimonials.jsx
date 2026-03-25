"use client";

import React, { useEffect } from 'react';

export default function TestimonialsSection() {
  
  useEffect(() => {
    // 1. CLEANUP GUARD: Check if script already exists to prevent double loading
    if (document.getElementById("shapo-embed-js")) return;

    const script = document.createElement("script");
    script.id = "shapo-embed-js";
    script.type = "text/javascript";
    script.src = "https://cdn.shapo.io/js/embed.js";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // 2. THOROUGH CLEANUP: Remove script and clear widget content on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      const widget = document.getElementById('shapo-widget-b376bad82d5167774dcf');
      if (widget) widget.innerHTML = ""; 
    };
  }, []);

  return (
    <section className="container px-4 py-20 lg:py-28 relative z-10">
      
      {/* Header Section */}
      <div className="flex flex-col items-center text-center space-y-4 mb-16 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/10 border border-secondary/20 text-secondary rounded-full font-bold text-xs uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
          Direct Proof
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tight">
          What People <span className="text-secondary italic">Say</span>
        </h2>
        <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed mt-4">
          Directly synced 5-star reviews from our Google Business Profile.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row bg-white border border-gray-100 shadow-2xl shadow-primary/5 rounded-[2.5rem] overflow-hidden w-full items-stretch min-h-[500px]">
        
        {/* LEFT SIDE: YouTube Video */}
        <div className="w-full lg:w-1/2 relative min-h-[200px] lg:min-h-full bg-primary">
          {/* <iframe className="absolute inset-0 w-full h-full border-0" src="https://youtu.be/68S9B_VHIRQ?si=TTgtbCQc34hkAjfG" title="Customer Experience Video" allowFullScreen></iframe> */}
          <iframe className="absolute inset-0 w-full h-full border-0" src="https://www.youtube.com/embed/68S9B_VHIRQ" title="Kolkata to Punjab Shifting | Professional Packing, Loading &amp; Safe Moving | PRADHAN Packers &amp; Movers" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>

        {/* RIGHT SIDE: Shapo Widget with "Healed" Container */}
        <div className="w-full lg:w-1/2 p-6 lg:p-12 flex flex-col justify-center bg-slate-50 relative">
          
          <div className="relative w-full overflow-hidden rounded-2xl">
            {/* The Widget - Inside a wrapper to control the height better */}
            <div id="shapo-widget-b376bad82d5167774dcf" className="w-full -z-10"></div>

            {/* THE SHIELD: Responsive White Block 
                Try changing 'h-12' to 'h-16' or 'h-20' if the logo still peeps out.
                'bg-slate-50/50' matches your background color exactly for a seamless hide. */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-slate-50 z-50 pointer-events-none border-t border-transparent"></div>
          </div>

          <style jsx global>{`
            /* Force the widget to not create duplicate layouts */
            #shapo-widget-b376bad82d5167774dcf > div:nth-child(n+2) {
              display: none !important;
            }

            #shapo-widget-b376bad82d5167774dcf:empty::before {
              content: "Synchronizing Reviews...";
              display: block;
              text-align: center;
              font-weight: 800;
              color: #112440;
              font-size: 12px;
              letter-spacing: 0.1em;
            }
          `}</style>
        </div>
      </div>

      {/* Google Verified Business Badge */}
      {/* <div className="mt-12 flex flex-wrap justify-center gap-8 opacity-70 hover:opacity-100 transition-all duration-500">
         <div className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center font-black text-blue-600 border border-gray-100 text-xl">
              G
            </div>
            <div className="flex flex-col">
              <span className="text-primary font-black text-sm leading-none">Google Verified</span>
              <span className="text-secondary font-bold text-[10px] uppercase tracking-widest mt-1 text-center">Professional Business</span>
            </div>
         </div>
      </div> */}

    </section>
  );
}