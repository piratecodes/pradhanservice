import { useState, useEffect, useMemo } from 'react';
import { fetchClient } from '@/api/fetchClient';
import toast from 'react-hot-toast';
import { Loader2, Search, Plus, MapPin, Briefcase, Edit3, Trash2, LayoutTemplate, XCircle, Filter } from 'lucide-react';
import useDocumentMeta from '@/hooks/useDocumentMeta';

import SeoPageFormDrawer from '@/components/seo/SeoPageFormDrawer';

// Helper to format slugs (e.g., 'packers-and-movers' -> 'Packers And Movers')
const formatSlug = (slug) => {
  if (!slug) return '—';
  return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export default function SeoPages() {
  useDocumentMeta("SEO Landing Pages | Pradhan Services", "Manage programmatic SEO content.");

  const [pages, setPages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);

  const loadPages = async () => {
    setIsLoading(true);
    try {
      const response = await fetchClient('/location-pages');
      setPages(response.data?.pages || []);
    } catch (error) {
      toast.error('Could not connect to API. Is the server running?');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPages();
  }, []);

  const handleOpenNew = () => {
    setSelectedPage(null);
    setIsDrawerOpen(true);
  };

  const handleEdit = (page) => {
    setSelectedPage(page);
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? This will remove the landing page from the website.")) return;
    try {
      await fetchClient(`/location-pages/${id}`, { method: 'DELETE' });
      toast.success('Page deleted');
      loadPages();
    } catch (error) {
      toast.error(error.message || 'Failed to delete');
    }
  };

  // Extract unique cities and services for the dropdown filters dynamically
  const uniqueCities = useMemo(() => [...new Set(pages.map(p => p.citySlug))].filter(Boolean), [pages]);
  const uniqueServices = useMemo(() => [...new Set(pages.map(p => p.serviceSlug))].filter(Boolean), [pages]);

  // SYNCED FILTER ENGINE: Runs search query AND dropdown filters together
  const filteredPages = useMemo(() => {
    return pages.filter((page) => {
      const city = (page.citySlug || '').toLowerCase();
      const service = (page.serviceSlug || '').toLowerCase();
      const title = (page.header?.title || '').toLowerCase();
      const query = searchQuery.toLowerCase().trim();

      // 1. Search Bar Match
      const matchesSearch = !query || city.includes(query) || service.includes(query) || title.includes(query);
      
      // 2. Dropdown Match
      const matchesCity = !selectedCity || city === selectedCity.toLowerCase();
      const matchesService = !selectedService || service === selectedService.toLowerCase();

      return matchesSearch && matchesCity && matchesService;
    });
  }, [pages, searchQuery, selectedCity, selectedService]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCity('');
    setSelectedService('');
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 p-4 md:p-0">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-primary tracking-tight">SEO Landing Pages</h1>
          <p className="text-gray-500 font-medium mt-1">Matrix Management: City + Service</p>
        </div>

        <button onClick={handleOpenNew} className="shrink-0 flex items-center justify-center gap-2 bg-primary hover:bg-[#112440] text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md">
          <Plus size={18} strokeWidth={3} /> New Page
        </button>
      </div>

      {/* FILTER PANEL */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-4 items-center">
        {/* Search Bar */}
        <div className="relative w-full lg:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by city, service, or title..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none text-sm font-medium" 
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex w-full lg:w-2/3 gap-3">
          <div className="relative w-full">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <select 
              value={selectedCity} 
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm font-medium appearance-none"
            >
              <option value="">All Locations</option>
              {uniqueCities.map(c => <option key={c} value={c}>{formatSlug(c)}</option>)}
            </select>
          </div>

          <div className="relative w-full">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <select 
              value={selectedService} 
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm font-medium appearance-none"
            >
              <option value="">All Services</option>
              {uniqueServices.map(s => <option key={s} value={s}>{formatSlug(s)}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="animate-spin text-primary" size={40} />
            <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">Loading Database...</p>
          </div>
        ) : pages.length === 0 ? (
          <div className="text-center py-20">
            <LayoutTemplate className="mx-auto h-16 w-16 text-gray-200 mb-4" />
            <h3 className="text-xl font-bold text-gray-900">The matrix is empty</h3>
            <p className="text-gray-500 mt-2">Build your first SEO-optimized landing page to get started.</p>
          </div>
        ) : filteredPages.length === 0 ? (
          <div className="text-center py-20">
            <XCircle className="mx-auto h-16 w-16 text-red-100 mb-4" />
            <h3 className="text-xl font-bold text-gray-900">No matches found</h3>
            <p className="text-gray-500 mt-2">Adjust your search or filters to see results.</p>
            <button onClick={clearFilters} className="mt-4 text-primary font-bold text-sm hover:underline">
                Clear all filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-[11px] font-black text-gray-400 uppercase tracking-[0.1em]">
                  <th className="px-6 py-5">Location</th>
                  <th className="px-6 py-5">Service</th>
                  <th className="px-6 py-5">H1 Title</th>
                  <th className="px-6 py-5">Content Strength</th>
                  <th className="px-6 py-5 text-right">Options</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredPages.map((page) => (
                  <tr key={page._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-secondary" />
                        <span className="font-bold text-gray-900 text-sm">{formatSlug(page.citySlug)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} className="text-gray-400" />
                        <span className="font-bold text-gray-700 text-sm">{formatSlug(page.serviceSlug)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-700 text-sm line-clamp-1">
                        {page.header?.title || <span className="text-red-300 italic font-medium">Untitled Page</span>}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${(page.sections?.length || 0) * 10}%` }} />
                        </div>
                        <span className="text-[11px] font-black text-primary">{page.sections?.length || 0}/10</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {/* ACTION BUTTONS: Always visible now */}
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(page)} 
                          className="p-2 text-gray-500 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(page._id)} 
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <SeoPageFormDrawer 
        isOpen={isDrawerOpen} 
        setIsOpen={setIsDrawerOpen} 
        pageData={selectedPage} 
        existingPages={pages}
        onSuccess={loadPages} 
      />
    </div>
  );
}