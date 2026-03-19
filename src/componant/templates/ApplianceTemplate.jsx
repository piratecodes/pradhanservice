import React from 'react';
import Hero from '@/componant/appliance-services/Hero';

export default async function CarAndBikePage({ cityName }) {

  return (
    <main className="">
      <Hero cityName={cityName} />
    </main>
  );
}