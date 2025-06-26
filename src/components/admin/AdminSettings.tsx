
import { Settings as SettingsIcon, Bell, Shield, Palette, Database } from 'lucide-react';

const AdminSettings = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>
      
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <SettingsIcon className="h-5 w-5 mr-2" />
              General Settings
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Site Name</h4>
                  <p className="text-sm text-gray-600">The name of your store</p>
                </div>
                <input 
                  type="text" 
                  placeholder="Shoe Store" 
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  disabled
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Store Description</h4>
                  <p className="text-sm text-gray-600">Brief description of your store</p>
                </div>
                <input 
                  type="text" 
                  placeholder="Premium shoe collection" 
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notifications
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Order Notifications</h4>
                  <p className="text-sm text-gray-600">Get notified when new orders arrive</p>
                </div>
                <input type="checkbox" className="h-4 w-4" disabled />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Low Stock Alerts</h4>
                  <p className="text-sm text-gray-600">Alert when products are running low</p>
                </div>
                <input type="checkbox" className="h-4 w-4" disabled />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Backend Integration
            </h3>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <Database className="mx-auto h-12 w-12 text-gray-400 mb-4" />
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
