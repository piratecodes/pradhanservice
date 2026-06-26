import { Search, Filter, X } from 'lucide-react';
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { Fragment } from 'react';

// The exact 4 services
const SERVICES = [
  { id: 'packers-and-movers', label: 'Packers & Movers' },
  { id: 'storage-solutions', label: 'Storage Solutions' },
  { id: 'car-transportation', label: 'Car Transportation' },
  { id: 'bike-transportation', label: 'Bike Transportation' },
  
  // -- Future Upselling Services (Keep commented out until ready to launch) --
  // { id: 'office-relocation', label: 'Office Relocation' },
  // { id: 'fine-art-movement', label: 'Fine Art Movement' },
  // { id: 'factory-moving', label: 'Factory Moving' },
  // { id: 'home-appliance-uninstall-and-install', label: 'Appliance Services' },
  // { id: 'after-shifting-services', label: 'After Shifting Services' },
];

const STATUSES = [
  { label: 'New', value: 'NEW' },
  { label: 'Contacted', value: 'CONTACTED' },
  { label: 'Quoted', value: 'QUOTED' },
  { label: 'Converted', value: 'CONVERTED' },
  { label: 'Lost', value: 'LOST' }
];

export default function LeadsHeader({ 
  searchQuery, onSearchChange, 
  statusFilter, onStatusFilterChange, 
  serviceFilter, onServiceFilterChange 
}) {
  
  // Calculate if any filters are active
  const activeFiltersCount = (statusFilter !== 'All' ? 1 : 0) + (serviceFilter !== 'All' ? 1 : 0);

  const clearFilters = () => {
    onStatusFilterChange('All');
    onServiceFilterChange('All');
  };

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
            placeholder="Search name, phone, city..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm transition-all font-medium"
          />
        </div>

        {/* Headless UI Popover for Filters */}
        <Popover className="relative">
          <PopoverButton className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary relative">
            <Filter size={18} /> Filters
            {/* Show a red dot if filters are applied */}
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full font-black">
                {activeFiltersCount}
              </span>
            )}
          </PopoverButton>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <PopoverPanel className="absolute right-0 z-50 mt-2 w-72 origin-top-right bg-white rounded-2xl shadow-2xl border border-gray-100 focus:outline-none overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <span className="font-extrabold text-primary">Filter Leads</span>
                {activeFiltersCount > 0 && (
                  <button onClick={clearFilters} className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1">
                    <X size={14} /> Clear All
                  </button>
                )}
              </div>
              
              <div className="p-4 space-y-4">
                {/* Status Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Lead Status</label>
                  <select 
                    value={statusFilter} 
                    onChange={(e) => onStatusFilterChange(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none text-sm font-bold text-gray-700 focus:ring-2 focus:ring-primary"
                  >
                    <option value="All">All Statuses</option>
                    {STATUSES.map(status => <option key={status.value} value={status.value}>{status.label}</option>)}
                  </select>
                </div>

                {/* Service Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Service Type</label>
                  <select 
                    value={serviceFilter} 
                    onChange={(e) => onServiceFilterChange(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none text-sm font-bold text-gray-700 focus:ring-2 focus:ring-primary"
                  >
                    <option value="All">All Services</option>
                    {SERVICES.map(service => <option key={service.id} value={service.id}>{service.label}</option>)}
                  </select>
                </div>
              </div>
            </PopoverPanel>
          </Transition>
        </Popover>
      </div>
    </div>
  );
}