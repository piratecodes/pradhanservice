import React from 'react';
import Hero from '@/componant/car-transportation/Hero';
import DynamicSections from '@/componant/car-transportation/DynamicSections'; 
import ServiceComparison from '@/componant/packers-n-movers/ServiceComparison';
import Testimonials from '@/componant/landing/testimonials';

export default async function CarTemplate({ cityData, pageData }) {
  const cityName = cityData?.cityName || "City";
  return (
    <main>
      
      {/* 1. Placeholder Hero (Replace with your custom Car Hero later) */}
      <Hero cityData={cityData} pageData={pageData} />
      
      {/* 2. The Magic Dynamic Component */}
      <DynamicSections cityData={cityData} pageData={pageData} />
      <ServiceComparison cityName={cityName} />
      <Testimonials />

    </main>
  );
}