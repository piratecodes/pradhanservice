import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment, useState, useEffect, useMemo } from 'react';
import { X, Save, Loader2, LayoutTemplate, Plus, Trash2, Image as ImageIcon, UploadCloud } from 'lucide-react';
import { fetchClient } from '@/api/fetchClient';
import toast from 'react-hot-toast';

const SERVICE_TYPES = [
  { id: 'packers-and-movers', label: 'Packers & Movers' },
  { id: 'storage-solutions', label: 'Storage Solutions' },
  { id: 'car-transportation', label: 'Car Transportation' },
  { id: 'bike-transportation', label: 'Bike Transportation' },
];

export default function SeoPageFormDrawer({ isOpen, setIsOpen, pageData, onSuccess, existingPages = [] }) {
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState([]);
  
  const [formData, setFormData] = useState({
    citySlug: '', serviceSlug: 'packers-and-movers',
    metaTitle: '', metaDescription: '', metaKeywords: '', canonicalUrl: '', isNoIndex: false, jsonLdSchema: '',
    headerTitle: '', introText: '',
    sections: []
  });

  // 1. Fetch all cities from backend
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetchClient('/cities');
        setCities(res.data?.cities || []);
      } catch (error) {
        console.error("Failed to load cities");
      }
    };
    if (isOpen) fetchCities();
  }, [isOpen]);

  // 2. Load Existing Data
  useEffect(() => {
    if (pageData) {
      setFormData({
        citySlug: pageData.citySlug || '', serviceSlug: pageData.serviceSlug || 'packers-and-movers',
        metaTitle: pageData.seo?.metaTitle || '', 
        metaDescription: pageData.seo?.metaDescription || '', 
        metaKeywords: pageData.seo?.metaKeywords || '', 
        canonicalUrl: pageData.seo?.canonicalUrl || '', 
        isNoIndex: pageData.seo?.isNoIndex || false, 
        jsonLdSchema: pageData.seo?.jsonLdSchema || '',
        headerTitle: pageData.header?.title || '', 
        introText: pageData.header?.introText || '',
        // Ensure legacy sections get the new image object
        sections: (pageData.sections || []).map(s => ({
          ...s,
          image: { url: s.image?.url || '', alt: s.image?.alt || '' }
        }))
      });
    } else {
      setFormData({
        citySlug: '', serviceSlug: 'packers-and-movers',
        metaTitle: '', metaDescription: '', metaKeywords: '', canonicalUrl: '', isNoIndex: false, jsonLdSchema: '',
        headerTitle: '', introText: '', sections: []
      });
    }
  }, [pageData, isOpen]);

  const availableCities = useMemo(() => {
    if (pageData) return cities;
    const usedCitySlugs = existingPages
      .filter(page => page.serviceSlug === formData.serviceSlug)
      .map(page => page.citySlug);
    return cities.filter(city => !usedCitySlugs.includes(city.citySlug));
  }, [cities, existingPages, formData.serviceSlug, pageData]);

  useEffect(() => {
    if (!pageData && formData.citySlug) {
      const isCityStillAvailable = availableCities.some(c => c.citySlug === formData.citySlug);
      if (!isCityStillAvailable) {
        setFormData(prev => ({ ...prev, citySlug: '' }));
      }
    }
  }, [availableCities, formData.citySlug, pageData]);

  // --- DYNAMIC SECTION HANDLERS ---
  const addSection = () => {
    if (formData.sections.length >= 10) return toast.error("Maximum 10 sections allowed.");
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, { 
        badge: { text: '', color: 'secondary' }, 
        heading: { text: '', color: 'primary' }, 
        description: '', 
        bullets: [],
        image: { url: '', alt: '' } // 🌟 ADDED IMAGE OBJECT
      }]
    }));
  };

  const updateSection = (index, field, nestedField, value) => {
    setFormData(prev => {
      const updatedSections = [...prev.sections];
      if (nestedField) {
        updatedSections[index] = {
          ...updatedSections[index],
          [field]: { ...updatedSections[index][field], [nestedField]: value }
        };
      } else {
        updatedSections[index] = { ...updatedSections[index], [field]: value };
      }
      return { ...prev, sections: updatedSections };
    });
  };

  const updateBullet = (sIndex, bIndex, value) => {
    setFormData(prev => {
      const updatedSections = [...prev.sections];
      const updatedBullets = [...updatedSections[sIndex].bullets];
      updatedBullets[bIndex] = value;
      updatedSections[sIndex] = { ...updatedSections[sIndex], bullets: updatedBullets };
      return { ...prev, sections: updatedSections };
    });
  };

  const addBullet = (sIndex) => {
    setFormData(prev => {
      const updatedSections = [...prev.sections];
      updatedSections[sIndex] = { ...updatedSections[sIndex], bullets: [...updatedSections[sIndex].bullets, ''] };
      return { ...prev, sections: updatedSections };
    });
  };

  const removeSection = (index) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
    }));
  };

  const removeBullet = (sectionIndex, bulletIndex) => {
    setFormData(prev => {
      const newSections = [...prev.sections];
      newSections[sectionIndex].bullets = newSections[sectionIndex].bullets.filter((_, i) => i !== bulletIndex);
      return { ...prev, sections: newSections };
    });
  };

  // 🌟 CLOUDINARY UPLOAD WIDGET TRIGGER 🌟
  const openCloudinaryWidget = async (sectionIndex) => {
    if (!window.cloudinary) {
      return toast.error("Cloudinary script not loaded. Check index.html.");
    }

    try {
      // 1. Fetch Secure Signature from Backend
      const res = await fetchClient('/location-pages/cloudinary-signature');
      const { timestamp, signature, cloudName, apiKey } = res.data;

      // 2. Open Widget
      window.cloudinary.openUploadWidget(
        {
          cloudName: cloudName,
          apiKey: apiKey,
          uploadSignatureTimestamp: timestamp,
          uploadSignature: signature,
          cropping: true, // Gives admin ability to crop & zoom
          multiple: false,
          folder: 'seo-pages', // Keeps your cloudinary dashboard clean
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            const imageUrl = result.info.secure_url;
            updateSection(sectionIndex, 'image', 'url', imageUrl);
            toast.success("Image uploaded & optimized successfully!");
          }
        }
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to authenticate image uploader.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.citySlug) return toast.error("Please select a city");
    
    setIsLoading(true);
    const payload = {
      citySlug: formData.citySlug,
      serviceSlug: formData.serviceSlug,
      seo: {
        metaTitle: formData.metaTitle,
        metaDescription: formData.metaDescription,
        metaKeywords: formData.metaKeywords,
        canonicalUrl: formData.canonicalUrl,
        isNoIndex: formData.isNoIndex,
        jsonLdSchema: formData.jsonLdSchema
      },
      header: { title: formData.headerTitle, introText: formData.introText },
      sections: formData.sections
    };

    try {
      if (pageData) {
        await fetchClient(`/location-pages/${pageData._id}`, { 
          method: 'PATCH', 
          body: JSON.stringify(payload) 
        });
        toast.success('Page updated successfully');
      } else {
        await fetchClient('/location-pages', { 
          method: 'POST', 
          body: JSON.stringify(payload) 
        });
        toast.success('SEO Page created successfully');
      }
      onSuccess();
      setIsOpen(false);
    } catch (error) {
      toast.error(error.message || 'Server Error: Check if backend API is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
        <TransitionChild as={Fragment} enter="ease-in-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-primary/40 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild as={Fragment} enter="transform transition ease-in-out duration-300" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-300" leaveFrom="translate-x-0" leaveTo="translate-x-full">
                
                <DialogPanel className="pointer-events-auto w-screen max-w-4xl">
                  <form onSubmit={handleSubmit} className="flex h-full flex-col bg-gray-50 shadow-2xl">
                    
                    {/* Header */}
                    <div className="bg-primary px-6 py-6 text-white shrink-0">
                      <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl font-extrabold tracking-tight flex items-center gap-2">
                          <LayoutTemplate size={20} className="text-secondary" />
                          {pageData ? 'Edit Landing Page' : 'Build Landing Page'}
                        </DialogTitle>
                        <button type="button" onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white"><X size={24} /></button>
                      </div>
                    </div>

                    {/* Scrollable Form Body */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
                      
                      {/* 1. ROUTING IDENTIFIERS */}
                      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">1. URL Matrix</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Target Service <span className="text-red-500">*</span></label>
                            <select required disabled={!!pageData} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none font-bold disabled:opacity-50" value={formData.serviceSlug} onChange={(e) => setFormData({...formData, serviceSlug: e.target.value})}>
                              {SERVICE_TYPES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Target City <span className="text-red-500">*</span></label>
                            <select required disabled={!!pageData || (availableCities.length === 0 && !pageData)} className={`w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none font-bold disabled:opacity-50 ${availableCities.length === 0 && !pageData ? 'text-red-500' : ''}`} value={formData.citySlug} onChange={(e) => setFormData({...formData, citySlug: e.target.value})}>
                              {!pageData && availableCities.length === 0 ? (
                                <option value="">-- All Cities Created for this Service --</option>
                              ) : (
                                <option value="">-- Select City --</option>
                              )}
                              {(pageData ? cities : availableCities).map(c => (
                                <option key={c._id} value={c.citySlug}>{c.cityName}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {pageData && <p className="text-xs text-red-500 font-bold mt-2">URLs cannot be changed after creation. Delete and recreate if needed.</p>}
                      </div>

                      {/* 2. SEO ENGINE */}
                      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">2. SEO Tags</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Meta Title</label>
                            <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" value={formData.metaTitle} onChange={(e) => setFormData({...formData, metaTitle: e.target.value})} />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Canonical URL</label>
                            <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" value={formData.canonicalUrl} onChange={(e) => setFormData({...formData, canonicalUrl: e.target.value})} placeholder="Leave blank to self-canonicalize" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Meta Description</label>
                          <textarea rows="2" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" value={formData.metaDescription} onChange={(e) => setFormData({...formData, metaDescription: e.target.value})} />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Meta Keywords</label>
                          <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" value={formData.metaKeywords} onChange={(e) => setFormData({...formData, metaKeywords: e.target.value})} placeholder="e.g. packers and movers, relocation (separate by comma)" />
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-gray-700 mb-1">JSON-LD Schema (Advanced)</label>
                           <textarea rows="2" className="w-full p-3 bg-gray-900 text-green-400 font-mono text-xs border border-gray-200 rounded-xl outline-none" value={formData.jsonLdSchema} onChange={(e) => setFormData({...formData, jsonLdSchema: e.target.value})} placeholder='<script type="application/ld+json"> { ... } </script>' />
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                           <input type="checkbox" id="noindex" checked={formData.isNoIndex} onChange={(e) => setFormData({...formData, isNoIndex: e.target.checked})} className="w-4 h-4 text-primary" />
                           <label htmlFor="noindex" className="text-sm font-bold text-red-600">Hide this page from Google (noIndex)</label>
                        </div>
                      </div>

                      {/* 3. MAIN CONTENT */}
                      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">3. Main Header</h3>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Page H1 Title</label>
                          <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none font-bold text-lg" value={formData.headerTitle} onChange={(e) => setFormData({...formData, headerTitle: e.target.value})} placeholder="e.g. Best Packers and Movers in Kolkata" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Introductory Paragraph</label>
                          <textarea rows="4" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" value={formData.introText} onChange={(e) => setFormData({...formData, introText: e.target.value})} />
                        </div>
                      </div>

                      {/* 4. THE DYNAMIC SECTIONS */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                           <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">4. Content Sections ({formData.sections.length}/10)</h3>
                           <button type="button" onClick={addSection} disabled={formData.sections.length >= 10} className="flex items-center gap-1 bg-white border border-gray-200 text-primary px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors disabled:opacity-50">
                             <Plus size={14}/> Add Section
                           </button>
                        </div>

                        <div className="space-y-8">
                          {formData.sections.map((section, sIndex) => (
                            <div key={sIndex} className="bg-white p-6 rounded-2xl border-2 border-gray-100 relative">
                               <button type="button" onClick={() => removeSection(sIndex)} className="absolute top-4 right-4 text-red-400 hover:text-red-600 bg-red-50 p-2 rounded-lg transition-colors"><Trash2 size={16}/></button>
                               
                               <div className="mb-6 border-b border-gray-100 pb-4">
                                  <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">Section {sIndex + 1}</span>
                               </div>

                               {/* Badge & Heading */}
                               <div className="grid grid-cols-2 gap-6 mb-6">
                                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Top Badge / Tablet</label>
                                    <div className="flex gap-2">
                                      <input type="text" className="flex-1 p-2 bg-white border border-gray-200 rounded-lg outline-none text-sm" value={section.badge.text} onChange={(e) => updateSection(sIndex, 'badge', 'text', e.target.value)} placeholder="e.g. Area Challenges" />
                                      <select className="p-2 bg-white border border-gray-200 rounded-lg outline-none text-sm font-bold" value={section.badge.color} onChange={(e) => updateSection(sIndex, 'badge', 'color', e.target.value)}>
                                        <option value="primary">Primary Color</option><option value="secondary">Secondary Color</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Heading (H2)</label>
                                    <div className="flex gap-2">
                                      <input type="text" className="flex-1 p-2 bg-white border border-gray-200 rounded-lg outline-none text-sm font-bold" value={section.heading.text} onChange={(e) => updateSection(sIndex, 'heading', 'text', e.target.value)} placeholder="e.g. Location-Based Challenges" />
                                      <select className="p-2 bg-white border border-gray-200 rounded-lg outline-none text-sm font-bold" value={section.heading.color} onChange={(e) => updateSection(sIndex, 'heading', 'color', e.target.value)}>
                                        <option value="primary">Primary Color</option><option value="secondary">Secondary Color</option>
                                      </select>
                                    </div>
                                  </div>
                               </div>

                               {/* 🌟 NEW: IMAGE & ALT TEXT BLOCK 🌟 */}
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
                                  <label className="text-xs font-bold text-gray-500 mb-3 uppercase flex items-center gap-2">
                                    <ImageIcon size={14} /> Section Image (Optional)
                                  </label>
                                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                                    
                                    {/* Image Preview & Upload Button */}
                                    <div className="shrink-0 flex flex-col gap-2 w-full sm:w-1/3">
                                      {section.image?.url ? (
                                        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-200">
                                          <img src={section.image.url} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                      ) : (
                                        <div className="w-full aspect-video rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 bg-white">
                                          <ImageIcon size={24} className="mb-2 opacity-50" />
                                          <span className="text-[10px] font-bold uppercase">No Image</span>
                                        </div>
                                      )}
                                      <button 
                                        type="button" 
                                        onClick={() => openCloudinaryWidget(sIndex)}
                                        className="w-full py-2 bg-white border border-gray-200 text-primary text-xs font-bold rounded-lg hover:bg-gray-50 transition-colors flex justify-center items-center gap-1 shadow-sm"
                                      >
                                        <UploadCloud size={14} /> {section.image?.url ? 'Change Image' : 'Upload Image'}
                                      </button>
                                    </div>

                                    {/* Alt Text Input */}
                                    <div className="flex-1 w-full">
                                      <label className="block text-xs font-bold text-gray-500 mb-1">Image Alt Text (SEO)</label>
                                      <input 
                                        type="text" 
                                        className="w-full p-2.5 bg-white border border-gray-200 rounded-lg outline-none text-sm focus:border-secondary focus:ring-1 focus:ring-secondary transition-all" 
                                        value={section.image?.alt || ''} 
                                        onChange={(e) => updateSection(sIndex, 'image', 'alt', e.target.value)} 
                                        placeholder="e.g. Packers loading truck in local neighborhood" 
                                      />
                                      <p className="text-[10px] text-gray-400 mt-1">Briefly describe the image for screen readers and Google Images.</p>
                                    </div>
                                  </div>
                                </div>

                               {/* Description */}
                               <div>
                                  <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">Description Paragraph</label>
                                  <textarea rows="4" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm" value={section.description} onChange={(e) => updateSection(sIndex, 'description', null, e.target.value)} />
                               </div>

                               {/* Bullets Engine */}
                               <div className="mt-3.5 bg-blue-50/50 p-4 rounded-xl border border-blue-100/50 mb-6">
                                  <div className="flex items-center justify-between mb-3">
                                    <label className="block text-xs font-bold text-blue-800 uppercase">Bullet Points ({section.bullets.length})</label>
                                    <button type="button" onClick={() => addBullet(sIndex)} className="text-blue-600 hover:text-blue-800 text-xs font-bold flex items-center gap-1"><Plus size={14}/> Add Bullet</button>
                                  </div>
                                  <div className="space-y-2">
                                    {section.bullets.map((bullet, bIndex) => (
                                      <div key={bIndex} className="flex gap-2 items-start">
                                        <div className="w-2 h-2 rounded-full bg-secondary mt-3 shrink-0"></div>
                                        <textarea rows="2" className="flex-1 p-2 bg-white border border-gray-200 rounded-lg outline-none text-sm" value={bullet} onChange={(e) => updateBullet(sIndex, bIndex, e.target.value)} />
                                        <button type="button" onClick={() => removeBullet(sIndex, bIndex)} className="text-red-400 hover:text-red-600 px-2 mt-2"><X size={16}/></button>
                                      </div>
                                    ))}
                                  </div>
                               </div>

                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Footer Actions */}
                    <div className="border-t border-gray-200 px-6 py-4 bg-white shrink-0 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                      <button 
                        type="submit" 
                        disabled={isLoading || (!pageData && availableCities.length === 0)} 
                        className="w-full flex justify-center items-center gap-2 bg-primary hover:bg-[#112440] disabled:bg-primary/50 text-white font-bold py-3.5 rounded-xl transition-all"
                      >
                        {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                        {pageData ? 'Update SEO Page' : 'Publish New SEO Page'}
                      </button>
                    </div>

                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}