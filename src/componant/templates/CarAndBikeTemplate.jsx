import React from 'react';
import Hero from '@/componant/car-n-bike/Hero';
// You will import your other components here later
// import CityAbout from '@/components/car-n-bike/About';

export default async function CarAndBikePage({ cityName }) {

  return (
    <main className="">
      <Hero cityName={cityName} />
    </main>
  );
}