import { Plus, Search } from 'lucide-react';

export default function CityHeader({ onOpenDrawer }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-extrabold text-primary tracking-tight">The Network</h1>
        <p className="text-gray-500 font-medium mt-1">Manage operational cities, routes, and local SEO pages.</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative w-full md:w-64 hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search cities..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm transition-all font-medium"
          />
        </div>

        <button 
          onClick={() => onOpenDrawer()}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-[#112440] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-primary/20 hover:-translate-y-0.5"
        >
          <Plus size={18} strokeWidth={3} /> Add New City
        </button>
      </div>
    </div>
  );
}