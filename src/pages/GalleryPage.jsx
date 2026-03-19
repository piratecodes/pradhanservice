import { useState, useEffect } from 'react';
import { fetchClient } from '@/api/fetchClient';
import toast from 'react-hot-toast';
import { Trash2, Copy, Loader2, ImageIcon } from 'lucide-react';
import useDocumentMeta from '@/hooks/useDocumentMeta';

import GalleryUploader from '@/components/gallery/GalleryUploader';

// We strip '/api/v1' from the VITE_API_BASE_URL to get the raw domain where the /uploads folder lives
const BACKEND_DOMAIN = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1').replace('/api/v1', '');

export default function GalleryPage() {
  //Title & Description for SEO (and nice browser tab titles!)
  useDocumentMeta("Media Library | Pradhan Services", "Upload and manage images for SEO, blogs, and local service pages in your media library.");
  
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadMedia = async () => {
    setIsLoading(true);
    try {
      const response = await fetchClient('/gallery');
      setMedia(response.data.media);
    } catch (error) {
      toast.error('Failed to load gallery');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this media? It will be permanently removed from the server.")) return;

    try {
      await fetchClient(`/gallery/${id}`, { method: 'DELETE' });
      toast.success('Media permanently deleted');
      loadMedia(); // Refresh grid
    } catch (error) {
      toast.error(error.message || 'Failed to delete media');
    }
  };

  const handleCopyLink = (url) => {
    const fullUrl = `${BACKEND_DOMAIN}${url}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success('Direct URL copied to clipboard!');
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8">
      
      <div>
        <h1 className="text-3xl font-extrabold text-primary tracking-tight">Media Library</h1>
        <p className="text-gray-500 font-medium mt-1">Upload and manage images for SEO, blogs, and local service pages.</p>
      </div>

      {/* The Uploader Component */}
      <GalleryUploader onUploadSuccess={loadMedia} />

      {/* The Gallery Grid */}
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 md:p-8">
        <h2 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
          <ImageIcon className="text-secondary" /> Asset Library
        </h2>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={32} /></div>
        ) : media.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-2xl">
            <p className="text-gray-500 font-medium">No media uploaded yet. Use the uploader above to add images.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {media.map((item) => (
              <div key={item._id} className="group relative rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-gray-50 hover:shadow-lg transition-all">
                
                {/* The Image (Linking to the backend domain) */}
                <div className="aspect-square w-full overflow-hidden bg-gray-200">
                  <img 
                    src={`${BACKEND_DOMAIN}${item.mediaUrl}`} 
                    alt={item.seo?.altText || item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Info Bar */}
                <div className="p-3 bg-white border-t border-gray-100">
                  <p className="text-sm font-bold text-gray-900 truncate">{item.title}</p>
                  <p className="text-xs text-primary font-medium mt-0.5 truncate">{item.category.replace(/-/g, ' ')}</p>
                </div>

                {/* Hover Overlay Actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                  <button 
                    onClick={() => handleCopyLink(item.mediaUrl)}
                    className="p-2 bg-white/20 hover:bg-white text-white hover:text-primary rounded-full transition-colors tooltip"
                    title="Copy Image URL"
                  >
                    <Copy size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(item._id)}
                    className="p-2 bg-white/20 hover:bg-red-500 text-white rounded-full transition-colors"
                    title="Delete Image"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}