import React from 'react';
import Hero from '@/components/ware-housing/Hero';

// IMPORT THE COMPONENT WE JUST BUILT! (Check your folder path to make sure this is correct)
import DynamicSections from '@/components/ware-housing/DynamicSections';
import ServiceComparison from '@/components/packers-n-movers/ServiceComparison';
import Testimonials from '@/components/landing/testimonials';

export default async function WarehousingTemplate({ cityData, pageData }) {
  const cityName = cityData?.cityName || "City";
  return (
    <main>
      {/* 1. Static Storage Hero Form */}
      <Hero cityData={cityData} pageData={pageData} />

      {/* 2. Dynamic Editorial Sections (Injected straight from your Database) */}
      <DynamicSections cityData={cityData} pageData={pageData} />

      <ServiceComparison cityName={cityName} />
      <Testimonials />
    </main>
  );
}