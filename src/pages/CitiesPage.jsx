import { useState, useEffect } from 'react';
import { fetchClient } from '@/api/fetchClient';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import useDocumentMeta from '@/hooks/useDocumentMeta';

import CityHeader from '@/components/cities/CityHeader';
import CityGrid from '@/components/cities/CityGrid';
import CityFormDrawer from '@/components/cities/CityFormDrawer';

export default function CitiesPage() {
  //Title & Description for SEO (and nice browser tab titles!)
  useDocumentMeta("Network Map | Pradhan Services", "Manage the cities you operate in, update their operational status, and ensure your network map is always up-to-date for customers and SEO.");
  
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  const loadCities = async () => {
    setIsLoading(true);
    try {
      const response = await fetchClient('/cities?all=true');
      setCities(response.data.cities);
    } catch (error) {
      toast.error('Failed to load the network map.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCities();
  }, []);

  const handleOpenNew = () => {
    setSelectedCity(null);
    setIsDrawerOpen(true);
  };

  const handleEdit = (city) => {
    setSelectedCity(city);
    setIsDrawerOpen(true);
  };

  const handleToggleStatus = async (cityId) => {
    const originalCities = [...cities];
    setCities(cities.map(c => c._id === cityId ? { ...c, isActive: !c.isActive } : c));
    try {
      await fetchClient(`/cities/${cityId}/toggle`, { method: 'PATCH' });
      toast.success('City operational status updated');
    } catch (error) {
      setCities(originalCities); 
      toast.error(error.message || 'Failed to update status');
    }
  };

  // --- NEW: THE DELETE FUNCTION ---
  const handleDeleteCity = async (citySlug) => {
    // Safety check!
    const isConfirmed = window.confirm("Are you sure you want to permanently delete this city? This action cannot be undone.");
    
    if (!isConfirmed) return;

    try {
      // Hits your backend: deleteCityBySlug controller
      await fetchClient(`/cities/${citySlug}`, { method: 'DELETE' });
      toast.success('City permanently deleted');
      loadCities(); // Refresh the grid to remove the card
    } catch (error) {
      toast.error(error.message || 'Failed to delete city');
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <CityHeader onOpenDrawer={handleOpenNew} />

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <Loader2 className="animate-spin text-primary mb-4" size={40} />
          <p className="text-gray-500 font-bold tracking-wide">Loading Network Routes...</p>
        </div>
      ) : (
        <CityGrid 
          cities={cities} 
          onEditCity={handleEdit} 
          onToggleStatus={handleToggleStatus} 
          onDeleteCity={handleDeleteCity} // Pass the new prop here!
        />
      )}

      <CityFormDrawer 
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
        cityData={selectedCity}
        onSuccess={loadCities} 
      />
    </div>
  );
}