import { Search, Filter } from 'lucide-react';

export default function LeadsHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-extrabold text-primary tracking-tight">Leads Pipeline</h1>
        <p className="text-gray-500 font-medium mt-1">Manage and update your customer quotes.</p>
      </div>

      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name or phone..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm transition-all font-medium"
          />
        </div>

        {/* Filter Button (Mockup for now) */}
        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors">
          <Filter size={18} /> Filters
        </button>
      </div>
    </div>
  );
}