import { MapPin, Edit3, Navigation, Globe, Trash2 } from 'lucide-react'; // Added Trash2

export default function CityGrid({ cities, onEditCity, onToggleStatus, onDeleteCity }) { // Added onDeleteCity
  if (cities.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <Globe className="mx-auto h-12 w-12 text-gray-300 mb-4" />
        <h3 className="text-lg font-extrabold text-gray-900">No cities in your network</h3>
        <p className="text-gray-500 font-medium mt-1">Click 'Add New City' to start building your routes.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cities.map((city) => (
        <div 
          key={city._id} 
          className={`bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border transition-all duration-300 hover:-translate-y-1 ${
            city.isActive ? 'border-gray-100' : 'border-red-100 bg-red-50/30'
          }`}
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${city.isActive ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                  <MapPin size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-gray-900 leading-tight">{city.cityName}</h3>
                  <p className="text-xs font-bold text-gray-400">/{city.citySlug}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <Navigation size={16} className="text-primary/60" />
                <span className="font-medium text-gray-600">
                  {city.subTowns?.length || 0} Sub-towns
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Globe size={16} className="text-secondary/80" />
                <span className="font-medium text-gray-600">
                  {city.activeServices?.length || 0} Services Active
                </span>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                onClick={() => onToggleStatus(city._id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-full transition-colors ${
                  city.isActive 
                    ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                    : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                }`}
              >
                {city.isActive ? 'Deactivate' : 'Activate'}
              </button>
              
              {/* Grouped Edit and Delete together */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onEditCity(city)}
                  className="flex items-center gap-1 text-sm font-bold text-primary hover:text-secondary transition-colors"
                >
                  <Edit3 size={16} /> Edit
                </button>
                <button
                  onClick={() => onDeleteCity(city.citySlug)} // Passing the slug!
                  className="flex items-center gap-1 text-sm font-bold text-red-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}