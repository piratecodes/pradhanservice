import React from 'react';
import OfficeHero from '@/componant/office-relocation/Hero';
// You can build specific B2B components later like <CorporateClients />, <OfficeMovingProcess />, etc.

export default function OfficeRelocationTemplate({ cityName }) {
  return (
    <div className="animate-fadeIn bg-slate-50 min-h-screen">
      <OfficeHero cityName={cityName} />
      {/* Additional B2B sections will go here */}
    </div>
  );
}