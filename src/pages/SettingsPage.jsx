import { useState, useEffect } from 'react';
import { fetchClient } from '@/api/fetchClient';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import useDocumentMeta from '@/hooks/useDocumentMeta';

import ContactForm from '@/components/settings/ContactForm';

export default function SettingsPage() {
  //Title & Description for SEO (and nice browser tab titles!)
  useDocumentMeta("Company Settings | Pradhan Services", "Configure global contact details, addresses, and social links for your moving business in one centralized location.");
  
  const [contactData, setContactData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetchClient('/contact');
        // If it's the very first time and no data exists, backend returns empty object, which is fine!
        setContactData(response.data.contact || {});
      } catch (error) {
        toast.error('Failed to load company settings');
        console.error("Settings Load Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return (
    <div className="max-w-[1000px] mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-primary tracking-tight">Company Settings</h1>
        <p className="text-gray-500 font-medium mt-1">Configure global contact details, addresses, and social links.</p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <Loader2 className="animate-spin text-primary mb-4" size={40} />
          <p className="text-gray-500 font-bold tracking-wide">Retrieving configuration...</p>
        </div>
      ) : (
        <ContactForm initialData={contactData} />
      )}
    </div>
  );
}