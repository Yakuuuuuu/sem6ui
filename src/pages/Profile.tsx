
import { useState, useEffect } from 'react';
import { User, CreditCard, MapPin, ShoppingBag, Heart, Edit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cart from '../components/Cart';

const Profile = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const { user } = useAuth();
  const { toast } = useToast();

  // Mock profile data
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: ''
  });

  // Mock orders data
  const [orders] = useState([
    {
      id: '1',
      order_number: 'ORD-001',
      total_amount: '149.99',
      status: 'delivered',
      created_at: '2024-01-15T10:30:00Z',
      items: [
        {
          name: 'Nike Air Max 270',
          quantity: 1,
          price: '149.99',
          image: '/placeholder.svg'
        }
      ]
    },
    {
      id: '2',
      order_number: 'ORD-002',
      total_amount: '89.99',
      status: 'shipped',
      created_at: '2024-01-20T14:15:00Z',
      items: [
        {
          name: 'Nike Dri-FIT T-Shirt',
          quantity: 1,
          price: '89.99',
          image: '/placeholder.svg'
        }
      ]
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setUserData({
        firstName: user.user_metadata?.first_name || '',
        lastName: user.user_metadata?.last_name || '',
        email: user.email || '',
        phone: '',
        birthDate: user.user_metadata?.date_of_birth || ''
      });
    }
  }, [user]);

  const [addresses] = useState([
    {
      id: 1,
      type: 'Home',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      isDefault: true
    },
    {
      id: 2,
      type: 'Work',
      street: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zip: '10002',
      isDefault: false
    }
  ]);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'wishlist', label: 'Wishlist', icon: Heart }
  ];

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Mock save operation
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
      setSaving(false);
    }, 1000);
  };

  const handleTabChange = (tabId: string, tabLabel: string) => {
    setActiveTab(tabId);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onCartClick={() => setIsCartOpen(true)} />
        <main className="pt-16 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500">Please log in to view your profile.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      <main className="pt-16" role="main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-black mb-8">My Account</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <nav className="space-y-2" role="tablist" aria-label="Account navigation">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id, tab.label)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
                        activeTab === tab.id
                          ? 'bg-black text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      role="tab"
                      aria-selected={activeTab === tab.id}
                      aria-controls={`${tab.id}-panel`}
                      tabIndex={activeTab === tab.id ? 0 : -1}
                    >
                      <IconComponent className="h-5 w-5" aria-hidden="true" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {activeTab === 'profile' && (
                  <div id="profile-panel" role="tabpanel" aria-labelledby="profile-tab" tabIndex={0}>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold">Profile Information</h2>
                      <button className="flex items-center space-x-2 text-black hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded px-2 py-1">
                        <Edit className="h-4 w-4" aria-hidden="true" />
                        <span>Edit</span>
                      </button>
                    </div>
                    
                    <form onSubmit={handleSaveProfile} className="space-y-6" noValidate>
                      <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <legend className="sr-only">Personal Information</legend>
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                            First Name *
                          </label>
                          <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            required
                            value={userData.firstName}
                            onChange={(e) => setUserData({...userData, firstName: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name *
                          </label>
                          <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            required
                            value={userData.lastName}
                            onChange={(e) => setUserData({...userData, lastName: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          />
                        </div>
                      </fieldset>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={userData.email}
                          onChange={(e) => setUserData({...userData, email: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          autoComplete="email"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={userData.phone}
                          onChange={(e) => setUserData({...userData, phone: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          autoComplete="tel"
                        />
                      </div>
                      
                      <button
                        type="submit"
                        disabled={saving}
                        className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {saving ? 'Saving...' : 'Save Changes'}
                      </button>
                    </form>
                  </div>
                )}

                {activeTab === 'orders' && (
                  <div id="orders-panel" role="tabpanel" aria-labelledby="orders-tab" tabIndex={0}>
                    <h2 className="text-xl font-semibold mb-6">Order History</h2>
                    {orders.length > 0 ? (
                      <div className="space-y-4" role="list" aria-label="Order history">
                        {orders.map((order) => (
                          <article 
                            key={order.id} 
                            className="border border-gray-200 rounded-lg p-4"
                            role="listitem"
                            aria-labelledby={`order-${order.id}-title`}
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h3 id={`order-${order.id}-title`} className="font-semibold">
                                  Order #{order.order_number}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  <time dateTime={order.created_at}>
                                    {new Date(order.created_at).toLocaleDateString()}
                                  </time>
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold" aria-label={`Total cost: $${order.total_amount}`}>
                                  ${order.total_amount}
                                </p>
                                <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                                  order.status === 'delivered' 
                                    ? 'bg-green-100 text-green-800' 
                                    : order.status === 'shipped'
                                    ? 'bg-blue-100 text-blue-800'
                                    : order.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                              </div>
                            </div>
                            {order.items && Array.isArray(order.items) && order.items.length > 0 && (
                              <div className="flex items-center space-x-3" role="list" aria-label="Order items">
                                {order.items.map((item: any, index: number) => (
                                  <div key={index} className="flex items-center space-x-2" role="listitem">
                                    {item.image && (
                                      <img 
                                        src={item.image} 
                                        alt={`${item.name} product image`} 
                                        className="w-12 h-12 object-cover rounded" 
                                      />
                                    )}
                                    <div>
                                      <p className="text-sm font-medium">{item.name}</p>
                                      <p className="text-xs text-gray-600">
                                        Quantity: {item.quantity} {item.price && `• $${item.price}`}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </article>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" aria-hidden="true" />
                        <p className="text-gray-500 mb-4">No orders found</p>
                        <p className="text-sm text-gray-400 mb-6">
                          Your order history will appear here after you make your first purchase
                        </p>
                        <a
                          href="/"
                          className="inline-block px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                        >
                          Start Shopping
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'addresses' && (
                  <div id="addresses-panel" role="tabpanel" aria-labelledby="addresses-tab" tabIndex={0}>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold">Saved Addresses</h2>
                      <button className="bg-black text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
                        Add Address
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="list" aria-label="Saved addresses">
                      {addresses.map((address) => (
                        <article 
                          key={address.id} 
                          className="border border-gray-200 rounded-lg p-4"
                          role="listitem"
                          aria-labelledby={`address-${address.id}-title`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 id={`address-${address.id}-title`} className="font-semibold">
                              {address.type}
                            </h3>
                            {address.isDefault && (
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                Default
                              </span>
                            )}
                          </div>
                          <address className="text-sm text-gray-600 not-italic">
                            {address.street}<br />
                            {address.city}, {address.state} {address.zip}
                          </address>
                          <div className="mt-3 flex space-x-2">
                            <button className="text-sm text-black hover:underline focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 rounded">
                              Edit
                            </button>
                            <button className="text-sm text-red-600 hover:underline focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-1 rounded">
                              Delete
                            </button>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'payment' && (
                  <div id="payment-panel" role="tabpanel" aria-labelledby="payment-tab" tabIndex={0}>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold">Payment Methods</h2>
                      <button className="bg-black text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
                        Add Card
                      </button>
                    </div>
                    <div className="text-center py-12">
                      <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" aria-hidden="true" />
                      <p className="text-gray-500">No payment methods added yet</p>
                      <p className="text-sm text-gray-400 mt-2">
                        Add a payment method to make checkout faster and easier
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'wishlist' && (
                  <div id="wishlist-panel" role="tabpanel" aria-labelledby="wishlist-tab" tabIndex={0}>
                    <h2 className="text-xl font-semibold mb-6">My Wishlist</h2>
                    <div className="text-center py-12">
                      <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" aria-hidden="true" />
                      <p className="text-gray-500 mb-4">Your wishlist is empty</p>
                      <p className="text-sm text-gray-400 mb-6">
                        Save items you love for later by clicking the heart icon
                      </p>
                      <a
                        href="/"
                        className="inline-block px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                      >
                        Start Shopping
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Profile;
