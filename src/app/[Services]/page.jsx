import React from 'react';
import { notFound } from 'next/navigation';

import PackersMoversTemplate from '@/componant/templates/PackersMoversTemplate';
import CarAndBikeTemplate from '@/componant/templates/CarAndBikeTemplate';
import OfficeRelocationTemplate from '@/componant/templates/OfficeRelocationTemplate';
import FineArtTemplate from '@/componant/templates/FineArtTemplate';
import WarehousingTemplate from '@/componant/templates/WarehousingTemplate';
import TransportTemplate from '@/componant/templates/TransportTemplate';
import FactoryTemplate from '@/componant/templates/FactoryTemplate';
import DefenceTemplate from '@/componant/templates/DefenceTemplate';
import ApplianceTemplate from '@/componant/templates/ApplianceTemplate';
import AfterShiftingTemplate from '@/componant/templates/AfterShiftingTemplate';

// --- 1. THE DATA FETCHER ---
// We use a helper function so both SEO and the Page can use it safely
async function getCityData(citySlug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cities/slug/${citySlug}`, { 
      next: { revalidate: 3600 } 
    });
    
    // If backend returns 404, this res.ok will be false
    if (!res.ok) return null; 
    
    const data = await res.json();
    return data?.data?.city;
  } catch (error) {
    return null;
  }
}

// --- 2. THE COMPOSITE SEO ENGINE ---
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const fullUrlPath = resolvedParams.Services || ""; 
  
  if (!fullUrlPath.includes('-in-')) return {};

  const urlParts = fullUrlPath.split('-in-');
  const serviceSlug = urlParts[0]; 
  const citySlug = urlParts[1];

  // Fetch from DB to get the backend meta tags
  const cityData = await getCityData(citySlug);
  
  // If city is invalid, we return nothing here (the page component will throw the 404)
  if (!cityData) return {};

  // Format the service string beautifully (e.g., "packers-and-movers" -> "Packers And Movers")
  const formattedService = serviceSlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Use the actual capitalized City Name from your database!
  const cityName = cityData.cityName;

  // Extract the raw backend data
  const backendMetaTitle = cityData.seo?.metaTitle || "";
  const backendMetaDesc = cityData.seo?.metaDescription || "";

  // Stitch them together exactly as you requested!
  return {
    title: `Pradhan Services - ${formattedService} in ${cityName} at ${backendMetaTitle}`.trim(),
    description: `Looking for top-rated ${formattedService} in ${cityName}? ${backendMetaDesc}`.trim(),
    keywords: cityData.seo?.keywords || `${formattedService.toLowerCase()}, ${cityName.toLowerCase()}`
  };
}

// --- 3. THE PAGE COMPONENT & VALIDATOR ---
export default async function MasterServiceRouter({ params }) {
  const resolvedParams = await params;
  const fullUrlPath = resolvedParams.Services || ""; 

  // Strict URL Validation
  if (!fullUrlPath.includes('-in-')) {
    return notFound();
  }

  const urlParts = fullUrlPath.split('-in-');
  const serviceSlug = urlParts[0]; 
  const citySlug = urlParts[1];

  if (!serviceSlug || !citySlug) {
    return notFound();
  }

  // 🚀 THE DATABASE VALIDATION LOCK 🚀
  // If the city doesn't exist in MongoDB, instantly throw a 404!
  const cityData = await getCityData(citySlug);
  if (!cityData) {
    return notFound(); 
  }

  // Use the exact database name (e.g., "Kolkata") instead of formatting the URL slug
  const cityName = cityData.cityName; 

  // THE PROXY SWITCHBOARD
  switch (serviceSlug) {
    case 'packers-and-movers':
    case 'packers-n-movers':
      return <PackersMoversTemplate cityName={cityName} />;
      
    case 'car-transport':
    case 'car-and-bike-transport':
      return <CarAndBikeTemplate cityName={cityName} />;
      
    case 'office-relocation':
      return <OfficeRelocationTemplate cityName={cityName} />;

    case 'fine-art-movement':
      return <FineArtTemplate cityName={cityName} />;

    case 'ware-housing':
      return <WarehousingTemplate cityName={cityName} />;
    
    case 'transport-and-logistics':
      return <TransportTemplate cityName={cityName} />;
      
    case 'factory-moving':
      return <FactoryTemplate cityName={cityName} />;

    case 'defence-relocation-service':
      return <DefenceTemplate cityName={cityName} />;
      
    case 'home-appliance-uninstall-and-install':
      return <ApplianceTemplate cityName={cityName} />;

    case 'after-shifting-services':
      return <AfterShiftingTemplate cityName={cityName} />;

    default:
      return notFound(); 
  }
}