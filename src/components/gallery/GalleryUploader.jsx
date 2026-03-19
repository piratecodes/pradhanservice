import { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Loader2, Save } from 'lucide-react';
import { fetchClient } from '@/api/fetchClient';
import toast from 'react-hot-toast';

export default function GalleryUploader({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'packers-and-movers',
    altText: '',
  });

  // Handle Image Selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Create a temporary URL to show a preview before uploading
      setPreview(URL.createObjectURL(selectedFile)); 
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select an image first");

    setIsLoading(true);

    // We MUST use FormData to send files via Fetch
    const payload = new FormData();
    payload.append('mediaFile', file);
    payload.append('title', formData.title);
    payload.append('mediaType', 'photo');
    payload.append('category', formData.category);
    payload.append('seo.altText', formData.altText); // Matches your backend parser!

    try {
      await fetchClient('/gallery', {
        method: 'POST',
        body: payload, // Notice we just pass the raw FormData object here!
      });
      
      toast.success("Media securely uploaded to the gallery");
      
      // Reset Form
      setFile(null);
      setPreview(null);
      setFormData({ title: '', category: 'packers-and-movers', altText: '' });
      if (fileInputRef.current) fileInputRef.current.value = '';
      
      onUploadSuccess(); // Tell the grid below to refresh!

    } catch (error) {
      toast.error(error.message || "Failed to upload image");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 md:p-8">
      <h2 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
        <UploadCloud className="text-secondary" /> Upload New Media
      </h2>

      <form onSubmit={handleUpload} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Drag & Drop Zone */}
        <div className="col-span-1">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="h-64 border-2 border-dashed border-gray-300 hover:border-primary/50 bg-gray-50 hover:bg-primary/5 transition-all rounded-2xl flex flex-col items-center justify-center cursor-pointer overflow-hidden relative group"
          >
            {preview ? (
              <>
                <img src={preview} alt="Preview" className="w-full h-full object-cover group-hover:opacity-40 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-bold text-primary">
                  Change Image
                </div>
              </>
            ) : (
              <div className="text-center p-6">
                <ImageIcon size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="font-bold text-gray-600">Click to browse files</p>
                <p className="text-xs text-gray-400 mt-1">JPEG, PNG, WEBP up to 5MB</p>
              </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          </div>
        </div>

        {/* Right Side: SEO & Details */}
        <div className="col-span-1 lg:col-span-2 space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Image Title <span className="text-red-500">*</span></label>
            <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none" placeholder="e.g., Safe Loading of Honda City" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Service Category</label>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none font-medium text-gray-700">
                <option value="packers-and-movers">Packers & Movers</option>
                <option value="car-and-bike-transport">Car & Bike</option>
                <option value="office-relocation">Office Relocation</option>
                <option value="transport-and-logistics">Transport Fleet</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Alt Text (For SEO) <span className="text-red-500">*</span></label>
              <input type="text" required value={formData.altText} onChange={e => setFormData({...formData, altText: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none" placeholder="Describe the image for Google..." />
            </div>
          </div>

          <div className="pt-4">
            <button type="submit" disabled={isLoading || !file} className="w-full md:w-auto px-8 flex justify-center items-center gap-2 bg-primary hover:bg-[#112440] disabled:bg-primary/50 text-white font-bold py-3.5 rounded-xl transition-all">
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
              Upload to CDN
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}