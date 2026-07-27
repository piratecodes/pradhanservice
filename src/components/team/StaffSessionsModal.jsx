import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { X, Loader2, ShieldCheck, Monitor, Smartphone, Globe, LogOut } from 'lucide-react';
import { fetchClient } from '@/api/fetchClient';
import toast from 'react-hot-toast';

export default function StaffSessionsModal({ isOpen, setIsOpen, targetStaff }) {
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && targetStaff) {
      loadSessions();
    }
  }, [isOpen, targetStaff]);

  const loadSessions = async () => {
    setIsLoading(true);
    try {
      const response = await fetchClient(`/sessions/admin/${targetStaff.id}`);
      setSessions(response.data?.sessions || []);
      setCurrentSessionId(response.data?.currentSessionId || null);
    } catch (error) {
      if (error.message.includes('cannot manage sessions for another Super Admin')) {
        toast.error("You don't have permission to view another Super Admin's devices.");
        setIsOpen(false);
      } else {
        toast.error('Failed to load active sessions for this user.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const revokeSession = async (sessionId) => {
    try {
      await fetchClient(`/sessions/admin/${targetStaff.id}/${sessionId}`, { method: 'DELETE' });
      toast.success('Device revoked successfully.');
      loadSessions();
    } catch (error) {
      toast.error(error.message || 'Failed to revoke device.');
    }
  };

  const getDeviceIcon = (deviceInfo) => {
    const info = (deviceInfo || '').toLowerCase();
    if (info.includes('mobile') || info.includes('iphone') || info.includes('android')) return <Smartphone className="text-primary/70" size={24} />;
    if (info.includes('windows') || info.includes('mac') || info.includes('linux')) return <Monitor className="text-primary/70" size={24} />;
    return <Globe className="text-primary/70" size={24} />;
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-80" onClose={() => setIsOpen(false)}>
        <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-primary/40 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                
                <div className="bg-primary px-6 py-4 text-white flex items-center justify-between">
                  <DialogTitle className="text-lg font-extrabold tracking-tight flex items-center gap-2">
                    <ShieldCheck size={20} className="text-secondary" /> Active Devices
                  </DialogTitle>
                  <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6">
                  <div className="mb-4 pb-4 border-b border-gray-100">
                    <h3 className="font-bold text-gray-800 text-lg">{targetStaff?.name}</h3>
                    <p className="text-sm text-gray-500">@{targetStaff?.username}</p>
                  </div>

                  {isLoading ? (
                    <div className="flex justify-center py-10"><Loader2 className="animate-spin text-primary" size={24} /></div>
                  ) : sessions.length === 0 ? (
                    <div className="py-10 text-center">
                      <p className="text-gray-500 font-medium">No active devices found for this user.</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-100 overflow-y-auto pr-1">
                      {sessions.map((session) => {
                        const isCurrent = session.id === currentSessionId;
                        return (
                          <div key={session.id} className={`flex items-center justify-between p-4 rounded-xl border ${isCurrent ? 'border-primary/20 bg-primary/5' : 'border-gray-100 bg-white hover:border-gray-200'} transition-colors`}>
                            <div className="flex items-center gap-4">
                              <div className={`p-2 rounded-lg ${isCurrent ? 'bg-white' : 'bg-gray-50'}`}>
                                {getDeviceIcon(session.deviceInfo)}
                              </div>
                              <div>
                                <p className="font-bold text-sm text-gray-800 flex items-center gap-2">
                                  {session.deviceInfo || 'Unknown Device'}
                                  {isCurrent && <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Current</span>}
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  {session.ipAddress} • Last active: {new Date(session.lastActive).toLocaleString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}
                                </p>
                              </div>
                            </div>
                            {!isCurrent && (
                              <button
                                onClick={() => revokeSession(session.id)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Force Logout Device"
                              >
                                <LogOut size={18} />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
