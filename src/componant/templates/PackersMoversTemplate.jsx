import React from 'react';

// IMPORTS
import Hero from '@/componant/packers-n-movers/Hero';
import DynamicSection from '@/componant/packers-n-movers/DynamicSections'; // <-- Import the new clean component
import ServiceComparison from '@/componant/packers-n-movers/ServiceComparison';
import Testimonials from '@/componant/landing/testimonials';

// COMMENTED IMPORTS
// import CityAbout from '@/componant/packers-n-movers/About';
// import AddOnServices from '@/componant/packers-n-movers/AddOn';
// import AllServices from '@/componant/packers-n-movers/AllServices';
// import BestMovers from '@/componant/packers-n-movers/BestMovers';

export default function PackersMoversTemplate({ cityData, pageData }) {
  const cityName = cityData?.cityName || "City";

  return (
    <main className="min-h-screen bg-white">
      
      {/* 1. HERO */}
      <Hero 
        cityName={cityName} 
        dynamicTitle={pageData?.header?.title}
        dynamicIntro={pageData?.header?.introText}
      />

      {/* 2. DYNAMIC CONTENT & SEO */}
      <DynamicSection cityData={cityData} pageData={pageData} />

      {/* 3. STATIC SECTIONS */}
      <ServiceComparison cityName={cityName} />
      <Testimonials />

    </main>
  );
}