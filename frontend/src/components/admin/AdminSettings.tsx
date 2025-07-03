import { Settings as SettingsIcon, Bell, Shield, Palette, Database } from 'lucide-react';

const AdminSettings = () => {
  return (
    <div role="main" aria-label="Admin Settings">
      <h1 className="text-3xl font-bold text-gray-900 mb-8" tabIndex={0}>Settings</h1>
      
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow" aria-labelledby="general-settings-heading">
          <div className="p-6 border-b border-gray-200">
            <h2 id="general-settings-heading" className="text-lg font-semibold text-gray-900 flex items-center">
              <SettingsIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              General Settings
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="site-name" className="font-medium text-gray-900">Site Name</label>
                  <p className="text-sm text-gray-600">The name of your store</p>
                </div>
                <input 
                  id="site-name"
                  type="text" 
                  placeholder="Shoe Store" 
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  disabled
                  aria-label="Site Name"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="store-description" className="font-medium text-gray-900">Store Description</label>
                  <p className="text-sm text-gray-600">Brief description of your store</p>
                </div>
                <input 
                  id="store-description"
                  type="text" 
                  placeholder="Premium shoe collection" 
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  disabled
                  aria-label="Store Description"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow" aria-labelledby="notifications-settings-heading">
          <div className="p-6 border-b border-gray-200">
            <h2 id="notifications-settings-heading" className="text-lg font-semibold text-gray-900 flex items-center">
              <Bell className="h-5 w-5 mr-2" aria-hidden="true" />
              Notifications
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="order-notifications" className="font-medium text-gray-900">Order Notifications</label>
                  <p className="text-sm text-gray-600">Get notified when new orders arrive</p>
                </div>
                <input id="order-notifications" type="checkbox" className="h-4 w-4" disabled aria-label="Order Notifications" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="low-stock-alerts" className="font-medium text-gray-900">Low Stock Alerts</label>
                  <p className="text-sm text-gray-600">Alert when products are running low</p>
                </div>
                <input id="low-stock-alerts" type="checkbox" className="h-4 w-4" disabled aria-label="Low Stock Alerts" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow" aria-labelledby="backend-integration-heading">
          <div className="p-6 border-b border-gray-200">
            <h2 id="backend-integration-heading" className="text-lg font-semibold text-gray-900 flex items-center">
              <Database className="h-5 w-5 mr-2" aria-hidden="true" />
              Backend Integration
            </h2>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <Database className="mx-auto h-12 w-12 text-gray-400 mb-4" aria-hidden="true" />
              <p className="text-gray-500 mb-2">Connect to a backend service</p>
              <p className="text-sm text-gray-400">Settings will be available after backend integration</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
