import { Package, ShoppingCart, Users, DollarSign } from 'lucide-react';
import { useProducts, Product } from '@/context/ProductContext';

const AdminDashboard = () => {
  const { products } = useProducts();
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, product) => sum + (product.stock || 0), 0);
  const averagePrice = products.length > 0 ? (products.reduce((sum, product) => sum + (product.price || 0), 0) / products.length).toFixed(0) : 0;

  const stats = [
    { title: 'Total Products', value: totalProducts.toString(), icon: Package, color: 'bg-blue-500' },
    { title: 'Total Stock', value: totalStock.toString(), icon: ShoppingCart, color: 'bg-green-500' },
    { title: 'Active Users', value: '-', icon: Users, color: 'bg-purple-500' },
    { title: 'Avg. Price', value: `$${averagePrice}`, icon: DollarSign, color: 'bg-orange-500' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="text-center py-8">
            <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500">No recent activity</p>
            <p className="text-sm text-gray-400 mt-2">Connect to a backend to track orders and activity</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Overview</h3>
          <div className="space-y-3">
            {products.slice(0, 5).map((product, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.brand} - Stock: {product.stock}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
