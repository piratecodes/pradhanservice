import { useState, useEffect } from 'react';
import { Save, Phone, Mail, MapPin, Share2, Loader2 } from 'lucide-react';
import { fetchClient } from '@/api/fetchClient';
import toast from 'react-hot-toast';

export default function ContactForm({ initialData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    primaryPhone: '', whatsappNumber: '', alternatePhone: '',
    supportEmail: '', salesEmail: '',
    headOfficeAddress: '', googleMapsLink: '',
    facebookUrl: '', instagramUrl: '', twitterUrl: '', linkedinUrl: ''
  });

  // Load the data from the database into the form
  useEffect(() => {
    if (initialData) {
      setFormData({
        primaryPhone: initialData.primaryPhone || '',
        whatsappNumber: initialData.whatsappNumber || '',
        alternatePhone: initialData.alternatePhone || '',
        supportEmail: initialData.supportEmail || '',
        salesEmail: initialData.salesEmail || '',
        headOfficeAddress: initialData.headOfficeAddress || '',
        googleMapsLink: initialData.googleMapsLink || '',
        facebookUrl: initialData.facebookUrl || '',
        instagramUrl: initialData.instagramUrl || '',
        twitterUrl: initialData.twitterUrl || '',
        linkedinUrl: initialData.linkedinUrl || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Hit your updateContactInfo controller! (Assuming your route is PUT or PATCH /contact)
      await fetchClient('/contact', {
        method: 'PATCH', // Or PUT, depending on your exact route setup
        body: JSON.stringify(formData)
      });
      toast.success('Company settings updated securely');
    } catch (error) {
      toast.error(error.message || 'Failed to save settings');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {/* SECTION 1: Phone Numbers */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        <h2 className="text-lg font-extrabold text-gray-900 mb-6 flex items-center gap-2">
          <Phone className="text-secondary" /> Master Contact Numbers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Primary Phone <span className="text-red-500">*</span></label>
            <input type="text" name="primaryPhone" required value={formData.primaryPhone} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" placeholder="+91 98765 43210" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">WhatsApp Number</label>
            <input type="text" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" placeholder="+91 98765 43210" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Alternate Phone</label>
            <input type="text" name="alternatePhone" value={formData.alternatePhone} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" placeholder="Landline or secondary" />
          </div>
        </div>
      </div>

      {/* SECTION 2: Email Addresses */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        <h2 className="text-lg font-extrabold text-gray-900 mb-6 flex items-center gap-2">
          <Mail className="text-secondary" /> Email Routing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Support / General Email <span className="text-red-500">*</span></label>
            <input type="email" name="supportEmail" required value={formData.supportEmail} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" placeholder="support@pradhanpackers.com" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Sales / Quotes Email</label>
            <input type="email" name="salesEmail" value={formData.salesEmail} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" placeholder="sales@pradhanpackers.com" />
          </div>
        </div>
      </div>

      {/* SECTION 3: Office Location */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        <h2 className="text-lg font-extrabold text-gray-900 mb-6 flex items-center gap-2">
          <MapPin className="text-secondary" /> Physical Headquarters
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-1">Head Office Address <span className="text-red-500">*</span></label>
            <textarea name="headOfficeAddress" required rows="2" value={formData.headOfficeAddress} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" placeholder="Full street address, city, state, PIN" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-1">Google Maps Embed Link</label>
            <input type="url" name="googleMapsLink" value={formData.googleMapsLink} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" placeholder="https://maps.google.com/..." />
          </div>
        </div>
      </div>

      {/* SECTION 4: Social Media */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        <h2 className="text-lg font-extrabold text-gray-900 mb-6 flex items-center gap-2">
          <Share2 className="text-secondary" /> Social Media Links
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Facebook URL</label>
            <input type="url" name="facebookUrl" value={formData.facebookUrl} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" placeholder="https://facebook.com/pradhanpackers" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Instagram URL</label>
            <input type="url" name="instagramUrl" value={formData.instagramUrl} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" placeholder="https://instagram.com/pradhanpackers" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Twitter (X) URL</label>
            <input type="url" name="twitterUrl" value={formData.twitterUrl} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" placeholder="https://twitter.com/..." />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">LinkedIn URL</label>
            <input type="url" name="linkedinUrl" value={formData.linkedinUrl} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" placeholder="https://linkedin.com/company/..." />
          </div>
        </div>
      </div>

      {/* Floating Save Bar */}
      <div className="sticky bottom-6 z-10 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-200 flex items-center justify-between">
        <div>
          <p className="font-extrabold text-gray-900">Save Changes</p>
          <p className="text-xs text-gray-500 font-medium">This updates the frontend website immediately.</p>
        </div>
        <button type="submit" disabled={isLoading} className="flex items-center justify-center gap-2 bg-primary hover:bg-[#112440] disabled:bg-primary/50 text-white px-8 py-3 rounded-xl text-sm font-bold transition-all shadow-md">
          {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Update Global Settings
        </button>
      </div>
    </form>
  );
}