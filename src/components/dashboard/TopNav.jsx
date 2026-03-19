import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { Bell, Search, UserCircle, LogOut, ChevronDown, KeyRound } from 'lucide-react';
import LoadingBar from 'react-top-loading-bar';
import { fetchClient } from '@/api/fetchClient';

import MyAccountModal from './MyAccountModal';
import ChangePasswordModal from './ChangePasswordModal';

// THE BULLETPROOF URL BUILDER
const getImageUrl = (pic) => {
  if (!pic || pic === 'default-avatar.png') return null;
  if (pic.startsWith('http')) return pic;
  
  let baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';
  baseUrl = baseUrl.replace('/api/v1', '').replace(/\/$/, '');
  
  return `${baseUrl}/uploads/${pic}`;
};

export default function TopNav({ loadingBarRef }) {
  const navigate = useNavigate();
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  
  const [adminName, setAdminName] = useState('Admin');
  const [adminDesignation, setAdminDesignation] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await fetchClient('/auth/me');
        const me = res.data?.user || res.data?.admin; 
        
        if (me) {
          setAdminName(me.name || 'Admin');
          setAdminDesignation(me.designation || '');
          setProfilePic(me.profilePic || null); 
        }
      } catch (error) {
        console.error("Could not fetch user profile for TopNav");
      }
    };
    fetchProfileData();
  }, [isAccountModalOpen]); 

  const handleLogout = () => {
    loadingBarRef.current.continuousStart();
    sessionStorage.removeItem('pradhan_token');
    setTimeout(() => {
      loadingBarRef.current.complete();
      navigate('/login');
    }, 500);
  };

  // 👇 THIS IS WHAT WE FIXED! It now strictly uses the bulletproof function!
  const displayImage = getImageUrl(profilePic);

  return (
    <>
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10 sticky top-0">
        <LoadingBar color="#c5a059" ref={loadingBarRef} shadow={true} height={3} />

        <div className="flex items-center gap-4 flex-1">
          {/* ... Search Bar ... */}
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-400 hover:text-primary transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <Menu as="div" className="relative">
            <MenuButton className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none">
              
              {displayImage ? (
                <img 
                  src={displayImage} 
                  alt={adminName} 
                  className="h-8 w-8 rounded-full object-cover border border-gray-200 shadow-sm"
                  onError={(e) => { e.target.style.display = 'none'; }} // Extra safety net!
                />
              ) : (
                <UserCircle size={28} className="text-gray-600" />
              )}
              
              <div className="hidden text-left md:block align-items-center">
                <p className="text-md font-bold text-gray-800 leading-tight">{adminName}</p>
                <p className="text-xs text-gray-500 font-medium">{adminDesignation}</p>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </MenuButton>

            <MenuItems transition className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-xl shadow-lg ring-1 ring-black/5 focus:outline-none transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0">
              <div className="p-1">
                <MenuItem>
                  {({ focus }) => (
                    <button onClick={() => setIsAccountModalOpen(true)} className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${focus ? 'bg-gray-50 text-primary' : 'text-gray-700'}`}>
                      <UserCircle size={16} /> My Profile
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ focus }) => (
                    <button onClick={() => setIsChangePasswordOpen(true)} className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${focus ? 'bg-gray-50 text-primary' : 'text-gray-700'}`}>
                      <KeyRound size={16} /> Change Password
                    </button>
                  )}
                </MenuItem>
                <div className="h-px bg-gray-100 my-1"></div>
                <MenuItem>
                  {({ focus }) => (
                    <button onClick={handleLogout} className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold ${focus ? 'bg-red-50 text-red-600' : 'text-red-500'}`}>
                      <LogOut size={16} /> Secure Logout
                    </button>
                  )}
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </header>

      <MyAccountModal isOpen={isAccountModalOpen} onProfileUpdate={(newPic) => { if (newPic) setProfilePic(newPic); }} setIsOpen={setIsAccountModalOpen} />
      <ChangePasswordModal isOpen={isChangePasswordOpen} setIsOpen={setIsChangePasswordOpen} />
    </>
  );
}