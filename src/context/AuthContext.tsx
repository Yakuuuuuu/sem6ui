
import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  email: string;
  user_metadata?: {
    first_name?: string;
    last_name?: string;
    date_of_birth?: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, firstName: string, lastName: string, dateOfBirth?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const signUp = async (email: string, password: string, firstName: string, lastName: string, dateOfBirth?: string) => {
    // Mock implementation - in a real app you'd integrate with your auth service
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      user_metadata: {
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dateOfBirth
      }
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    // Mock implementation - in a real app you'd integrate with your auth service
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      user_metadata: {
        first_name: 'John',
        last_name: 'Doe'
      }
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    return { error: null };
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Check for stored user on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
