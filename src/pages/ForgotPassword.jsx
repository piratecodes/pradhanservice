import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Loader2, Truck } from 'lucide-react';
import { fetchClient } from '@/api/fetchClient';
import toast from 'react-hot-toast';
import useDocumentMeta from '@/hooks/useDocumentMeta';

export default function ForgotPassword() {
  //Title & Description for SEO
  useDocumentMeta("Forgot Password | Pradhan Services", "Reset your admin password by receiving a secure link in your email.");
  
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 🚀 Hitting the new backend route we just built!
      await fetchClient('/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // <-- THIS IS THE MAGIC KEY!
        },
        body: JSON.stringify({ email })
      });
      
      setIsSent(true);
      toast.success('Reset link sent to your email');
    } catch (error) {
      toast.error(error.message || 'Error sending email. Check if the address is correct.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-primary rounded-xl shadow-md">
            <Truck size={28} className="text-secondary" />
          </div>
        </div>

        <h2 className="text-2xl font-extrabold text-center text-gray-900 mb-2">Reset Password</h2>
        
        {isSent ? (
          <div className="text-center">
            <p className="text-gray-500 mb-6">We've sent a password reset link to <span className="font-bold text-gray-900">{email}</span>. Please check your inbox.</p>
            <Link to="/login" className="text-primary font-bold hover:text-secondary transition-colors">Return to Login</Link>
          </div>
        ) : (
          <>
            <p className="text-center text-gray-500 mb-8 text-sm">Enter your registered email address and we'll send you a link to reset your password.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="admin@pradhanservice.com" />
                </div>
              </div>
              <button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-[#112440] text-white font-bold py-3.5 rounded-xl transition-all flex justify-center items-center gap-2">
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : 'Send Reset Link'}
              </button>
            </form>
            <div className="mt-6 text-center">
              <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-primary font-bold transition-colors">
                <ArrowLeft size={16} /> Back to Login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}