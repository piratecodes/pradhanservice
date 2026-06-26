import React from 'react';
import Hero from '@/components/bike-transportation/Hero';
import DynamicSections from '@/components/bike-transportation/DynamicSections';
import ServiceComparison from '@/components/packers-n-movers/ServiceComparison';
import Testimonials from '@/components/landing/testimonials';

export default async function BikeTemplate({ cityData, pageData }) {
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