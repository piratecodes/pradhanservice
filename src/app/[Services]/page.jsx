import React from 'react';
import { notFound } from 'next/navigation';

import PackersMoversTemplate from '@/components/templates/PackersMoversTemplate';
import WarehousingTemplate from '@/components/templates/WarehousingTemplate';
import CarTemplate from '@/components/templates/CarTemplate';
import BikeTemplate from '@/components/templates/BikeTemplate';

// --- 1. DATA FETCHERS ---
async function getCityData(citySlug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cities/slug/${citySlug}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data?.city;
  } catch (error) { return null; }
}

async function getPageData(citySlug, serviceSlug) {
  try {
    // Note: 'cache: no-store' ensures Next.js always asks the backend, 
    // which is incredibly fast now because of our RAM cache middleware!
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/location-pages/${citySlug}/${serviceSlug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data?.page;
  } catch (error) { return null; }
}

// --- 2. DYNAMIC SEO ENGINE ---
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const fullUrlPath = resolvedParams.Services || "";

  if (!fullUrlPath.includes('-in-')) return {};

  const urlParts = fullUrlPath.split('-in-');
  const serviceSlug = urlParts[0];
  const citySlug = urlParts[1];

  const [cityData, pageData] = await Promise.all([
    getCityData(citySlug),
    getPageData(citySlug, serviceSlug)
  ]);

  if (!cityData) return {};

  const cityName = cityData.cityName;
  const formattedService = serviceSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return {
    title: pageData?.seoMetaTitle || `Pradhan Services - Best ${formattedService} in ${cityName}`,
    description: pageData?.seoMetaDescription || `Looking for top-rated ${formattedService} in ${cityName}? Get a free quote today.`,

    keywords: pageData?.seoMetaKeywords
      ? pageData.seoMetaKeywords.split(',').map(k => k.trim())
      : [`${formattedService} in ${cityName}`, 'relocation', 'shifting', cityName],

    alternates: {
      canonical: pageData?.canonicalUrl || undefined,
    },
    robots: {
      index: !(pageData?.isNoIndex),
      follow: !(pageData?.isNoIndex),
    }
  };
}

// --- 3. THE PAGE COMPONENT & VALIDATOR ---
export default async function MasterServiceRouter({ params }) {
  const resolvedParams = await params;
  const fullUrlPath = resolvedParams.Services || "";

  if (!fullUrlPath.includes('-in-')) return notFound();

  const urlParts = fullUrlPath.split('-in-');
  const serviceSlug = urlParts[0];
  const citySlug = urlParts[1];

  if (!serviceSlug || !citySlug) return notFound();

  // PARALLEL FETCHING
  const [cityData, pageData] = await Promise.all([
    getCityData(citySlug),
    getPageData(citySlug, serviceSlug)
  ]);

  if (!cityData) return notFound();

  // 🌟 THE PROXY SWITCHBOARD
  switch (serviceSlug) {
    case 'packers-and-movers':
    case 'packers-n-movers':
      return <PackersMoversTemplate cityData={cityData} pageData={pageData} />;

    // 🚗 CAR ONLY
    case 'car-transportation':
      return <CarTemplate cityData={cityData} pageData={pageData} />;

    // 🏍️ BIKE ONLY
    case 'bike-transportation':
      return <BikeTemplate cityData={cityData} pageData={pageData} />;

    case 'storage-solutions':
    case 'ware-housing':
      return <WarehousingTemplate cityData={cityData} pageData={pageData} />;

    default:
      return notFound();
  }
}