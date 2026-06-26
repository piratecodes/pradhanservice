import { Menu, MenuButton, MenuItems, MenuItem, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ChevronDown, MapPinned, Eye, Trash2, Search } from 'lucide-react';

const SERVICE_LABELS = {
  'packers-and-movers': 'Packers & Movers',
  'storage-solutions': 'Storage Solutions',
  'car-transportation': 'Car Transportation',
  'bike-transportation': 'Bike Transportation',
  'office-relocation': 'Office Relocation',
  'fine-art-movement': 'Fine Art Movement',
  'factory-moving': 'Factory Moving',
  'home-appliance-uninstall-and-install': 'Appliance Services',
  'after-shifting-services': 'After Shifting Services',
};

export default function LeadsTable({ leads, onOpenSlideOver, onStatusChange, onDeleteLead }) {
  
  const statusColors = {
    'NEW': 'bg-blue-50 text-blue-700 ring-blue-600/20',
    'CONTACTED': 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
    'QUOTED': 'bg-purple-50 text-purple-700 ring-purple-600/20',
    'CONVERTED': 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    'LOST': 'bg-red-50 text-red-700 ring-red-600/10',
  };

  const statusOptions = [
    { label: 'New', value: 'NEW' },
    { label: 'Contacted', value: 'CONTACTED' },
    { label: 'Quoted', value: 'QUOTED' },
    { label: 'Converted', value: 'CONVERTED' },
    { label: 'Lost', value: 'LOST' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-left">
          
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Service</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Route</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-100 bg-white">
            {leads.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Search className="h-10 w-10 text-gray-300 mb-3" />
                    <p className="text-gray-500 font-extrabold text-lg">No leads found</p>
                    <p className="text-gray-400 font-medium mt-1">Try adjusting your search or clearing your filters.</p>
                  </div>
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                  {/* Customer Info */}
                  <td className="px-6 py-4">
                    <div className="font-extrabold text-gray-900">{lead.customerName}</div>
                    <div className="text-sm text-gray-500 mt-0.5">{lead.customerPhone}</div>
                  </td>
                  
                  {/* Service */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-sm font-medium text-gray-700">
                      {SERVICE_LABELS[lead.serviceRequested] || lead.serviceRequested.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </td>
                  
                  {/* Route */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col text-sm font-medium">
                      <div className="flex items-center gap-1.5 text-gray-900">
                        <MapPinned size={14} className="text-emerald-500" /> {lead.originCity}
                      </div>
                      {lead.destinationCity && (
                        <div className="flex items-center gap-1.5 text-gray-500 mt-1">
                          <MapPinned size={14} className="text-red-400" /> {lead.destinationCity}
                        </div>
                      )}
                    </div>
                  </td>
                  
                  {/* Status Dropdown (Headless UI) */}
                  <td className="px-6 py-4">
                    <Menu as="div" className="relative inline-block text-left">
                      <MenuButton className={`inline-flex items-center justify-between w-32 gap-x-1.5 rounded-full px-3 py-1.5 text-xs font-extrabold ring-1 ring-inset ${statusColors[lead.status] || ''}`}>
                        {lead.status ? lead.status.charAt(0) + lead.status.slice(1).toLowerCase() : ''}
                        <ChevronDown size={14} aria-hidden="true" />
                      </MenuButton>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <MenuItems className="absolute z-10 mt-2 w-40 origin-top-left rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                          <div className="py-1">
                            {statusOptions.map((status) => (
                              <MenuItem key={status.value}>
                                {({ focus }) => (
                                  <button
                                    onClick={() => onStatusChange(lead.id, status.value)}
                                    className={`block w-full text-left px-4 py-2 text-sm font-bold ${
                                      focus ? 'bg-gray-50 text-primary' : 'text-gray-700'
                                    } ${lead.status === status.value ? 'bg-primary/5 text-primary' : ''}`}
                                  >
                                    {status.label}
                                  </button>
                                )}
                              </MenuItem>
                            ))}
                          </div>
                        </MenuItems>
                      </Transition>
                    </Menu>
                  </td>
                  
                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onOpenSlideOver(lead)}
                        className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-bold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors"
                      >
                        <Eye size={16} className="text-secondary" /> View
                      </button>
                      
                      <button
                        onClick={() => onDeleteLead(lead.id)}
                        className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-bold text-red-600 shadow-sm ring-1 ring-inset ring-red-200 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}