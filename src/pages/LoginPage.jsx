import LoginForm from '@/components/login/LoginForm.jsx';
import LoginHero from '@/components/login/LoginHero.jsx';
import useDocumentMeta from '@/hooks/useDocumentMeta';

export default function LoginPage() {
  //Title & Description for SEO (and nice browser tab titles!)
  useDocumentMeta("Admin Login | Pradhan Services", "Securely log in to the Pradhan Services admin dashboard to manage your moving business, update content, and track leads.");  
  return (
    <div className="min-h-screen flex bg-white">
      <LoginForm />
      <LoginHero />
    </div>
  );
}