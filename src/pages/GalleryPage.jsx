import React, { useState, useEffect } from 'react';
import { Plus, Image as ImageIcon, MoreVertical, Edit2, Trash2, Loader2, EyeOff } from 'lucide-react';
import { fetchClient } from '@/api/fetchClient';
import toast from 'react-hot-toast';
import GalleryAlbumFormDrawer from '@/components/gallery/GalleryUploader'; // Adjust import path if needed

export default function AdminGalleryPage() {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const loadAlbums = async () => {
    setIsLoading(true);
    try {
      const res = await fetchClient('/gallery/admin/all');
      setAlbums(res.data?.galleries || []);
    } catch (error) {
      toast.error('Failed to load gallery albums');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAlbums();
  }, []);

  const openCreateDrawer = () => {
    setSelectedAlbum(null);
    setIsDrawerOpen(true);
  };

  const openEditDrawer = (album) => {
    setSelectedAlbum(album);
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to permanently delete the album "${name}"?`)) return;
    
    try {
      await fetchClient(`/gallery/${id}`, { method: 'DELETE' });
      toast.success('Album deleted');
      loadAlbums();
    } catch (error) {
      toast.error(error.message || 'Failed to delete album');
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Media Gallery</h1>
          <p className="text-gray-500 font-medium mt-1">Manage your service albums and event photos.</p>
        </div>
        <button 
          onClick={openCreateDrawer}
          className="flex items-center gap-2 bg-primary hover:bg-[#112440] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-sm"
        >
          <Plus size={20} /> Create New Album
        </button>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-primary" size={40} />
        </div>
      ) : albums.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <ImageIcon size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-900">No Albums Yet</h3>
          <p className="text-gray-500 mt-2 mb-6">Create your first album to start showcasing your work.</p>
          <button onClick={openCreateDrawer} className="text-secondary font-bold hover:underline">Click here to create one</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album) => (
            <div key={album._id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative">
              
              {/* Draft Status Badge */}
              {!album.isPublished && (
                <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5">
                  <EyeOff size={14} /> Draft
                </div>
              )}

              {/* Action Buttons (Show on hover) */}
              <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEditDrawer(album)} className="bg-white/90 backdrop-blur-md p-2 rounded-lg text-gray-700 hover:text-primary shadow-sm hover:bg-white transition-colors">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(album._id, album.categoryName)} className="bg-white/90 backdrop-blur-md p-2 rounded-lg text-red-500 hover:text-red-700 shadow-sm hover:bg-white transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Cover Photo */}
              <div className="aspect-4/3 w-full relative bg-gray-100 overflow-hidden">
                {album.featuredImage?.url ? (
                  <img src={album.featuredImage.url} alt={album.categoryName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300"><ImageIcon size={40} /></div>
                )}
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
              </div>

              {/* Details */}
              <div className="p-5 absolute bottom-0 w-full">
                <h3 className="font-bold text-white text-lg truncate">{album.categoryName}</h3>
                <p className="text-gray-300 text-sm font-medium mt-0.5 flex items-center gap-1.5">
                  <ImageIcon size={14} /> {album.images?.length || 0} Photos
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* The Dark Studio Drawer */}
      <GalleryAlbumFormDrawer 
        isOpen={isDrawerOpen} 
        setIsOpen={setIsDrawerOpen} 
        albumData={selectedAlbum} 
        onSuccess={loadAlbums} 
      />
    </div>
  );
}