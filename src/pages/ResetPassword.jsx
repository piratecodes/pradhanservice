import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, Loader2, CheckCircle } from 'lucide-react';
import { fetchClient } from '@/api/fetchClient';
import toast from 'react-hot-toast';
import useDocumentMeta from '@/hooks/useDocumentMeta';

export default function ResetPassword() {
  useDocumentMeta("Set New Password | Pradhan Services", "Create a new secure password for your admin account.");
  
  // React Router gives us the token directly from the URL!
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters long.");
    }

    setIsLoading(true);

    try {
      // Send the PATCH request to the backend route we created earlier
      await fetchClient(`/auth/reset-password/${token}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      setIsSuccess(true);
      toast.success('Password reset successfully!');
      
      // Send them to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      toast.error(error.message || 'Invalid or expired token. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        
        {isSuccess ? (
          <div className="text-center py-8">
            <div className="flex justify-center mb-4">
              <CheckCircle size={64} className="text-emerald-500" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Password Updated!</h2>
            <p className="text-gray-500 mb-6">Your password has been successfully reset. Redirecting you to login...</p>
            <Loader2 size={24} className="animate-spin text-primary mx-auto" />
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-primary rounded-xl shadow-md">
                <Lock size={28} className="text-secondary" />
              </div>
            </div>

            <h2 className="text-2xl font-extrabold text-center text-gray-900 mb-2">Create New Password</h2>
            <p className="text-center text-gray-500 mb-8 text-sm">Your new password must be different from previous used passwords and at least 8 characters long.</p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Password Field */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary outline-none transition-all" 
                    placeholder="••••••••" 
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary outline-none transition-all" 
                    placeholder="••••••••" 
                  />
                </div>
              </div>

              <button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-[#112440] text-white font-bold py-3.5 rounded-xl transition-all flex justify-center items-center gap-2 mt-4">
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : 'Reset Password'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/login" className="text-sm text-gray-500 hover:text-primary font-bold transition-colors">
                Cancel and return to login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}