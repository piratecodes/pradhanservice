import { useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/dashboard/Sidebar';
import TopNav from '@/components/dashboard/TopNav';

export default function DashboardLayout() {
  // We create the ref here so we can pass it down to TopNav and any pages that need it!
  const loadingBarRef = useRef(null);
  
  // State for mobile sidebar drawer
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans text-gray-900">
      
      {/* 1. The Fixed Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* 2. The Main Column */}
      <div className="flex flex-col flex-1 overflow-hidden w-full max-w-full">
        
        {/* The Top Navigation Bar */}
        <TopNav loadingBarRef={loadingBarRef} setIsSidebarOpen={setIsSidebarOpen} />

        {/* 3. The Scrollable Page Content (The "Outlet") */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
           {/* This is where /crm, /cities, etc., will render! */}
          <Outlet context={{ loadingBarRef }} /> 
        </main>
        
      </div>
    </div>
  );
}