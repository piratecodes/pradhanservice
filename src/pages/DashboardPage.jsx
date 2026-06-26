import { useState } from 'react';
import StatsRow from '@/components/dashboard/StatsRow.jsx';
import LeadsChartWidget from '@/components/dashboard/LeadsChartWidget.jsx';
import RecentLeadsWidget from '@/components/dashboard/RecentLeadsWidget.jsx';
import { PlusCircle, MapPinPlusInside } from 'lucide-react';
import useDocumentMeta from '@/hooks/useDocumentMeta';

// IMPORT THE MODALS!
import CityFormDrawer from '@/components/cities/CityFormDrawer';
import CategoryModal from '@/components/services/CategoryModal';

export default function DashboardPage() {
  //Title & Description for SEO (and nice browser tab titles!)
    useDocumentMeta(" Dashboard | Pradhan Services ", "Get a quick overview of your moving business's performance, recent leads, and key metrics right here on the dashboard.");

  // Setup State for the Quick Action Modals
  const [isCityDrawerOpen, setIsCityDrawerOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      
      {/* Welcome Banner */}
      <div className="p-8 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold text-primary tracking-tight">Command Center</h1>
          <p className="text-gray-500 mt-2 font-medium text-lg">Here is what is happening with Pradhan Packers today.</p>
        </div>
      </div>

      {/* The 4 Metric Cards */}
      <StatsRow />
      <LeadsChartWidget />

      {/* The Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecentLeadsWidget />
        </div>
        
        <div className="lg:col-span-1">
          {/* Quick Actions Widget */}
          <div className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 h-full">
            <h2 className="text-lg font-extrabold text-gray-900 mb-4">Quick Actions</h2>
            <p className="text-sm text-gray-500 font-medium mb-6">Need to update the system quickly?</p>
            
            <div className="space-y-3">
              <button 
                onClick={() => setIsCategoryModalOpen(true)}
                className="w-full flex items-center gap-3 text-left px-4 py-3.5 rounded-xl bg-gray-50 hover:bg-secondary/10 border border-transparent hover:border-secondary/20 text-gray-700 hover:text-secondary transition-all font-bold group"
              >
                <PlusCircle size={20} className="text-gray-400 group-hover:text-secondary transition-colors" />
                Add New Service Category
              </button>
              
              <button 
                onClick={() => setIsCityDrawerOpen(true)}
                className="w-full flex items-center gap-3 text-left px-4 py-3.5 rounded-xl bg-gray-50 hover:bg-emerald-50 border border-transparent hover:border-emerald-200 text-gray-700 hover:text-emerald-700 transition-all font-bold group"
              >
                <MapPinPlusInside size={20} className="text-gray-400 group-hover:text-emerald-600 transition-colors" />
                Add New City Route
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- RENDER THE MODALS HERE --- */}
      {/* Notice we pass onSuccess={() => {}} as a blank function so they don't crash when trying to refresh lists that aren't on this page */}
      <CityFormDrawer 
        isOpen={isCityDrawerOpen} 
        setIsOpen={setIsCityDrawerOpen} 
        onSuccess={() => {}} 
      />
      
      <CategoryModal 
        isOpen={isCategoryModalOpen} 
        setIsOpen={setIsCategoryModalOpen} 
        onSuccess={() => {}} 
      />

    </div>
  );
}