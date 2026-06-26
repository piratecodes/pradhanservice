import React from 'react';
import Hero from '@/components/after-shifting/Hero';

export default async function CarAndBikePage({ cityName }) {

  return (
    <main className="">
      <Hero cityName={cityName} />
    </main>
  );
}