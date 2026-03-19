import React from 'react';
import Hero from '@/componant/defeance-relocation/Hero';

export default async function CarAndBikePage({ cityName }) {

  return (
    <main className="">
      <Hero cityName={cityName} />
    </main>
  );
}