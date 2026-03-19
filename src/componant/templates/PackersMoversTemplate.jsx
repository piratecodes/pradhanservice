import React from 'react';
import Hero from '@/componant/packers-n-movers/Hero';
import CityAbout from '@/componant/packers-n-movers/About';
import AddOnServices from '@/componant/packers-n-movers/AddOn';
import ServiceComparison from '@/componant/packers-n-movers/ServiceComparison';
import AllServices from '@/componant/packers-n-movers/AllServices';
import BestMovers from '@/componant/packers-n-movers/BestMovers';
import Testimonials from '@/componant/landing/testimonials';

export default async function PackersMoversPage({ cityName }) {
  // // 1. Await params to get the city name from your dynamic folder [packers-n-movers]
  // const resolvedParams = await params;
  // const rawCity = resolvedParams['packers-n-movers'] || ""; // This will be something like "kolkata" from the URL /packers-and-movers-in-kolkata

  // // 2. Format the city name (e.g., "kolkata" -> "Kolkata")
  // let cleanCity = rawCity.replace('packers-and-movers-in-', '');
  // const cityName = cleanCity.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <main className="">
      <Hero cityName={cityName} />
      <CityAbout cityName={cityName} />
      <AddOnServices cityName={cityName} />
      <ServiceComparison cityName={cityName} />
      <AllServices cityName={cityName} />
      <BestMovers cityName={cityName} />
      <Testimonials />
    </main>
  );
}