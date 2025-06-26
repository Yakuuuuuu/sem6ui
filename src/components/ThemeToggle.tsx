
import { LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const ThemeToggle = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (user) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600 hidden sm:inline">
          {user.email}
        </span>
        <button
          onClick={handleLogoutClick}
          className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
          aria-label="Sign out of your account"
        >
          <LogOut className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleLoginClick}
      className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
      aria-label="Sign in to your account"
    >
      <LogIn className="h-5 w-5" aria-hidden="true" />
    </button>
  );
};

export default ThemeToggle;
