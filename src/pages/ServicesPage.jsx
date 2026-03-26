import { useState, useEffect } from 'react';
import { Package, Car, Bike, Briefcase, Palette, Truck, Factory, Shield, Wrench, CheckSquare, Plus, Edit3, Trash2, Loader2 } from 'lucide-react';
import { fetchClient } from '@/api/fetchClient';
import toast from 'react-hot-toast';
import useDocumentMeta from '@/hooks/useDocumentMeta';

import CategoryModal from '@/components/services/CategoryModal';

// Your exact Backend ENUMS mapped to UI labels and icons
const SERVICE_TYPES = [
  { id: 'packers-and-movers', label: 'Packers & Movers', icon: Package },
  { id: 'storage-solutions', label: 'Storage Solutions', icon: Factory },
  { id: 'car-transportation', label: 'Car Transportation', icon: Car },
  { id: 'bike-transportation', label: 'Bike Transportation', icon: Bike },
  // { id: 'car-and-bike-transport', label: 'Car & Bike', icon: Car },
  // { id: 'office-relocation', label: 'Office Relocation', icon: Briefcase },
  // { id: 'fine-art-movement', label: 'Fine Art Movement', icon: Palette },
  // { id: 'transport-and-logistics', label: 'Transport & Logistics', icon: Truck },
  // { id: 'factory-moving', label: 'Factory Moving', icon: Factory },
  // { id: 'defence-relocation-service', label: 'Defence Relocation', icon: Shield },
  // { id: 'home-appliance-uninstall-and-install', label: 'Appliance Setup', icon: Wrench },
  // { id: 'after-shifting-services', label: 'After Shifting', icon: CheckSquare }
];

export default function ServicesPage() {
  //Title & Description for SEO
  useDocumentMeta("Fleet & Services | Pradhan Services", "Manage dynamic dropdown categories for customer lead forms, ensuring your service offerings are always up-to-date and relevant for your customers.");
  
  const [activeService, setActiveService] = useState(SERVICE_TYPES[0]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories whenever the selected tab changes
  const loadCategories = async () => {
    setIsLoading(true);
    try {
      // 🚀 THE FIX IS RIGHT HERE! Changed from /${id} to ?serviceType=${id}
      const response = await fetchClient(`/service-options?serviceType=${activeService.id}`);
      setCategories(response.data.options || []);
    } catch (error) {
      toast.error('Failed to load categories');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, [activeService]);

  const handleOpenNew = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleToggleStatus = async (categoryId) => {
    const original = [...categories];
    setCategories(categories.map(c => c._id === categoryId ? { ...c, isActive: !c.isActive } : c));
    try {
      await fetchClient(`/service-options/${categoryId}/toggle`, { method: 'PATCH' });
      toast.success('Status updated');
    } catch (error) {
      setCategories(original);
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (categoryId) => {
    // Standard safety check so admins don't accidentally click it!
    if (!window.confirm("Are you sure you want to permanently delete this category?")) return;
    
    try {
      await fetchClient(`/service-options/${categoryId}`, { method: 'DELETE' });
      toast.success('Category deleted permanently');
      loadCategories(); // Instantly refresh the table
    } catch (error) {
      toast.error(error.message || 'Failed to delete category');
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto h-[calc(100vh-8rem)] flex flex-col">
      
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-primary tracking-tight">Fleet & Services</h1>
        <p className="text-gray-500 font-medium mt-1">Manage dynamic dropdown categories for customer lead forms.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
        
        {/* LEFT PANE: The Fixed Services (Tabs) */}
        <div className="w-full md:w-80 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-500 text-xs uppercase tracking-wider">
            Core Services
          </div>
          <div className="overflow-y-auto flex-1 p-3 space-y-1">
            {SERVICE_TYPES.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveService(service)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                  activeService.id === service.id
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                }`}
              >
                <service.icon size={18} />
                <span className="text-sm">{service.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT PANE: The Dynamic Categories */}
        <div className="flex-1 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
                <activeService.icon className="text-secondary" size={24} />
                {activeService.label} Options
              </h2>
            </div>
            <button 
              onClick={handleOpenNew}
              className="flex items-center gap-2 bg-primary hover:bg-[#112440] text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-md"
            >
              <Plus size={16} /> Add Category
            </button>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto p-6">
            {isLoading ? (
              <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={32} /></div>
            ) : categories.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-2xl">
                <p className="text-gray-500 font-medium">No custom categories found for this service.</p>
                <button onClick={handleOpenNew} className="mt-4 text-primary font-bold hover:underline">Create the first one</button>
              </div>
            ) : (
              <table className="min-w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <th className="pb-3">Order</th>
                    <th className="pb-3">Category Name</th>
                    <th className="pb-3">Starting Price</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {categories.map((cat) => (
                    <tr key={cat._id} className="hover:bg-gray-50/50">
                      <td className="py-4 text-sm text-gray-400 font-bold">#{cat.order || 0}</td>
                      <td className="py-4 font-bold text-gray-900">
                        {cat.categoryName}
                        {cat.description && <p className="text-xs text-gray-500 font-medium mt-0.5">{cat.description}</p>}
                      </td>
                      <td className="py-4 text-sm font-bold text-emerald-600">
                        {cat.priceStartingFrom ? `₹${cat.priceStartingFrom}` : '--'}
                      </td>
                      <td className="py-4">
                        <button
                          onClick={() => handleToggleStatus(cat._id)}
                          className={`text-xs font-bold px-3 py-1 rounded-full ${
                            cat.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                          }`}
                        >
                          {cat.isActive ? 'Active' : 'Hidden'}
                        </button>
                      </td>
                      <td className="py-4 text-right flex justify-end gap-1">
                        <button onClick={() => handleEdit(cat)} className="text-primary hover:text-secondary p-2 transition-colors" title="Edit Category">
                          <Edit3 size={18} />
                        </button>
                        <button onClick={() => handleDelete(cat._id)} className="text-red-400 hover:text-red-600 p-2 transition-colors" title="Delete Category">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>

      <CategoryModal 
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        categoryData={selectedCategory}
        activeServiceId={activeService.id}
        onSuccess={loadCategories}
      />
    </div>
  );
}