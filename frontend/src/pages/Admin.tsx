import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import AdminSidebar from '../components/admin/AdminSidebar';
import ProductManagement from '../components/admin/ProductManagement';
import AdminDashboard from '../components/admin/AdminDashboard';
import OrderManagement from '../components/admin/OrderManagement';
import AdminSettings from '../components/admin/AdminSettings';
import UserManagement from '../components/admin/UserManagement';

const ADMIN_EMAIL = 'phuyalsamrat8@gmail.com';

const Admin = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>;
  }

  if (!user) {
    return <div className="flex items-center justify-center h-screen text-xl text-red-600">
      Please <a href="/login" className="underline ml-2">log in</a> to access the admin panel.
    </div>;
  }

  if (user.email.trim().toLowerCase() !== ADMIN_EMAIL) {
    return <div className="flex items-center justify-center h-screen text-xl text-red-600">
      You are not authorized to access the admin panel.
    </div>;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'products':
        return <ProductManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'users':
        return <UserManagement />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <div className="flex flex-col lg:flex-row pt-16">
        <div className="w-full lg:w-1/4">
          <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        <main className="flex-1 p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
      <Footer />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Admin;
