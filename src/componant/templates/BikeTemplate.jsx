import React from 'react';
import Hero from '@/componant/bike-transportation/Hero';
import DynamicSections from '@/componant/DynamicSections'; 
import ServiceComparison from '@/componant/packers-n-movers/ServiceComparison';
import Testimonials from '@/componant/landing/testimonials';

export default async function BikeTemplate({ cityData, pageData }) {
  const cityName = cityData?.cityName || "City";
  return (
    <main className="bg-white">
      
      {/* 1. Placeholder Hero (Replace with your custom Car Hero later) */}
      <Hero cityData={cityData} pageData={pageData} />
      
      {/* 2. The Magic Dynamic Component */}
      <DynamicSections cityData={cityData} pageData={pageData} />
      <ServiceComparison cityName={cityName} />
      <Testimonials />
    </main>
  );
}