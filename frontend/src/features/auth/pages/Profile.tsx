import { useState, useEffect } from 'react';
import { User, CreditCard, MapPin, ShoppingBag, Heart, Edit } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { useToast } from '../../../hooks/useToast';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Cart from '../../cart/components/Cart';
import { useWishlist } from '../../wishlist/WishlistContext';
import { toNPR } from '../../../utils/utils';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const { user } = useAuth();
  const { toast } = useToast();
  const { wishlist, removeFromWishlist } = useWishlist();

  // Mock profile data
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: ''
  });

  // Remove mock orders and addresses, add real fetching logic
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [addressesLoading, setAddressesLoading] = useState(false);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [paymentMethods, setPaymentMethods] = useState([]);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    isDefault: false
  });

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API_URL}/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) return;
      const data = await res.json();
      setUserData({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        phone: data.phone || '',
        birthDate: data.dateOfBirth || '',
      });
    } catch {}
  };

  useEffect(() => {
    if (user) {
      fetchUserProfile();
      // Fetch orders
      const fetchOrders = async () => {
        setOrdersLoading(true);
        try {
          const token = localStorage.getItem('token');
          const API_URL = import.meta.env.VITE_API_URL;
          const res = await fetch(`${API_URL}/orders`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          if (res.ok) {
            const data = await res.json();
            setOrders(data);
          }
        } catch {}
        setOrdersLoading(false);
      };
      // Fetch addresses
      const fetchAddresses = async () => {
        setAddressesLoading(true);
        try {
          const token = localStorage.getItem('token');
          const API_URL = import.meta.env.VITE_API_URL;
          const res = await fetch(`${API_URL}/addresses`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          if (res.ok) {
            const data = await res.json();
            setAddresses(data);
          }
        } catch {}
        setAddressesLoading(false);
      };
      fetchOrders();
      fetchAddresses();
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      const token = localStorage.getItem('token');
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API_URL}/payment-methods`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setPaymentMethods(data);
      }
    };
    if (user) fetchPaymentMethods();
  }, [user]);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Order History', icon: ShoppingBag },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'wishlist', label: 'Wishlist', icon: Heart }
  ];

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem('token');
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          dateOfBirth: userData.birthDate,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast({
          title: 'Error',
          description: data.error || 'Failed to update profile',
          variant: 'destructive',
        });
        setSaving(false);
        return;
      }
      toast({
        title: 'Success',
        description: 'Profile updated successfully!',
      });
      await fetchUserProfile(); // Refresh profile data after save
      setSaving(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
      setSaving(false);
    }
  };

  const handleTabChange = (tabId: string, tabLabel: string) => {
    setActiveTab(tabId);
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const API_URL = import.meta.env.VITE_API_URL;
    const res = await fetch(`${API_URL}/addresses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newAddress),
    });
    if (res.ok) {
      const added = await res.json();
      setAddresses((prev) => [...prev, added]);
      setShowAddressForm(false);
      setNewAddress({ type: '', street: '', city: '', state: '', zip: '', isDefault: false });
      toast({ title: 'Success', description: 'Address added!' });
    } else {
      toast({ title: 'Error', description: 'Failed to add address', variant: 'destructive' });
    }
  };

  console.log('Fetched orders:', orders);

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
                    {orders.length === 0 ? (
                      <div className="text-center py-10">
                        <span role="img" aria-label="package" className="text-4xl mb-2">📦</span>
                        <h2 className="text-xl font-bold mb-2">No orders yet!</h2>
                        <p className="text-gray-500 mb-4">Looks like you haven’t placed any orders yet.</p>
                        <Link to="/" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">Start Shopping</Link>
                      </div>
                    ) : (
                      <div className="space-y-4" role="list" aria-label="Order history">
                        {orders.map((order) => (
                          <article 
                            key={order._id} 
                            className="border border-gray-200 rounded-lg p-4"
                            role="listitem"
                            aria-labelledby={`order-${order._id}-title`}
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h3 id={`order-${order._id}-title`} className="font-semibold">
                                  Order #{order.orderNumber}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  <time dateTime={order.createdAt}>
                                    {new Date(order.createdAt).toLocaleDateString()}
                                  </time>
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold" aria-label={`Total cost: रू${toNPR(order.totalAmount)}`}>
                                  रू{toNPR(order.totalAmount)}
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
                                        Quantity: {item.quantity} {item.price && `• रू${toNPR(item.price)}`}
                                        {item.size && (
                                          <span className="ml-2 text-xs text-gray-500">Size: {item.size}</span>
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </article>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'addresses' && (
                  <div id="addresses-panel" role="tabpanel" aria-labelledby="addresses-tab" tabIndex={0}>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold">Saved Addresses</h2>
                      <button
                        className="bg-black text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                        onClick={() => setShowAddressForm((v) => !v)}
                      >
                        {showAddressForm ? 'Cancel' : 'Add Address'}
                      </button>
                    </div>
                    {showAddressForm && (
                      <form onSubmit={handleAddAddress} className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-lg">
                        <input
                          type="text"
                          placeholder="Type (e.g. Home, Work)"
                          value={newAddress.type}
                          onChange={e => setNewAddress({ ...newAddress, type: e.target.value })}
                          className="px-4 py-2 border rounded"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Street"
                          value={newAddress.street}
                          onChange={e => setNewAddress({ ...newAddress, street: e.target.value })}
                          className="px-4 py-2 border rounded"
                          required
                        />
                        <input
                          type="text"
                          placeholder="City"
                          value={newAddress.city}
                          onChange={e => setNewAddress({ ...newAddress, city: e.target.value })}
                          className="px-4 py-2 border rounded"
                          required
                        />
                        <input
                          type="text"
                          placeholder="State"
                          value={newAddress.state}
                          onChange={e => setNewAddress({ ...newAddress, state: e.target.value })}
                          className="px-4 py-2 border rounded"
                          required
                        />
                        <input
                          type="text"
                          placeholder="ZIP Code"
                          value={newAddress.zip}
                          onChange={e => setNewAddress({ ...newAddress, zip: e.target.value })}
                          className="px-4 py-2 border rounded"
                          required
                        />
                        <label className="flex items-center space-x-2 col-span-1 md:col-span-2">
                          <input
                            type="checkbox"
                            checked={newAddress.isDefault}
                            onChange={e => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                          />
                          <span>Set as default address</span>
                        </label>
                        <button
                          type="submit"
                          className="col-span-1 md:col-span-2 bg-black text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-800 transition-colors"
                        >
                          Save Address
                        </button>
                      </form>
                    )}
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
                    <h2 className="text-xl font-semibold mb-6">Payment Methods</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                      {paymentMethods.length > 0 ? (
                        paymentMethods.map((pm) => (
                          <div key={pm._id} className="group relative border border-gray-200 rounded-lg p-6 bg-white flex flex-col items-center justify-center">
                            <CreditCard className="h-10 w-10 text-gray-400 mb-4" />
                            <div className="space-y-2 text-center">
                              <h3 className="font-semibold text-black">{pm.brand} **** {pm.last4}</h3>
                              <p className="text-sm text-gray-500">Expires {pm.expMonth}/{pm.expYear}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="group relative border border-gray-200 rounded-lg p-6 bg-white flex flex-col items-center justify-center">
                          <CreditCard className="h-10 w-10 text-gray-400 mb-4" />
                          <div className="space-y-2 text-center">
                            <h3 className="font-semibold text-black">No payment methods added yet</h3>
                            <p className="text-sm text-gray-500">Add a payment method to make checkout faster and easier</p>
                          </div>
                          <button className="mt-4 bg-black text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
                            Add Card
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'wishlist' && (
                  <div id="wishlist-panel" role="tabpanel" aria-labelledby="wishlist-tab" tabIndex={0}>
                    <h2 className="text-xl font-semibold mb-6">My Wishlist</h2>
                    {wishlist.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {wishlist.map((item) => (
                          <div key={item.id} className="group relative">
                            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <button
                              onClick={() => removeFromWishlist(item.id)}
                              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                            >
                              <Heart className="h-4 w-4 text-red-500 fill-current" />
                            </button>
                            <div className="space-y-2">
                              <p className="text-sm text-gray-500">{item.category}</p>
                              <h3 className="font-semibold text-black">{item.name}</h3>
                              <p className="text-lg font-bold text-black">रू{toNPR(item.price)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
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
                    )}
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
