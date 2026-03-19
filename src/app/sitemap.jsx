// This array matches the slugs used in your MasterServiceRouter
const SERVICES = [
  'packers-and-movers',
  'car-and-bike-transport',
  'office-relocation',
  'fine-art-movement',
  'ware-housing',
  'transport-and-logistics',
  'factory-moving',
  'defence-relocation-service',
  'home-appliance-uninstall-and-install',
  'after-shifting-services'
];

export default async function sitemap() {
  // Define your base URL (Change this to your actual production domain)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pradhanservice.com';

  // 1. Define your Static Links
  const staticRoutes = [
    '', // This represents the Homepage '/'
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-and-condition'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1.0 : 0.8, // Homepage gets highest priority
  }));

  // 2. Fetch all Cities dynamically from your backend
  let cities = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cities`, { 
      next: { revalidate: 3600 } // Cache this for 1 hour so it doesn't crash your DB
    });
    
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data.cities) {
        cities = data.data.cities;
      }
    }
  } catch (error) {
    console.error("Sitemap City Fetch Error:", error);
  }

  // 3. The Multiplier: Generate all [Service]-in-[City] links automatically
  const dynamicRoutes = [];

  cities.forEach((city) => {
    SERVICES.forEach((serviceSlug) => {
      dynamicRoutes.push({
        url: `${baseUrl}/${serviceSlug}-in-${city.citySlug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.9, // High priority for your money-making service pages
      });
    });
  });

  // 4. Combine Static and Dynamic links and feed them to Google
  return [...staticRoutes, ...dynamicRoutes];
}