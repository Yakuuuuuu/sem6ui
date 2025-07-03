import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import ProductCard from '../components/ProductCard';
import { useProducts } from '@/context/ProductContext';

const Men = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { products } = useProducts();
  // Show products with category exactly 'Men's Shoes' (case-insensitive)
  const menProducts = products.filter(
    p => p.category && p.category.toLowerCase() === "men's shoes"
  );

  return (
    <div className="min-h-screen bg-white transition-colors duration-200">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Men's Collection</h1>
            <p className="text-lg text-gray-600">Discover premium footwear and apparel for men</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {menProducts.map((product) => (
              <Link key={product._id || product.id} to={`/product/${product._id || product.id}`}>
                <ProductCard product={{
                  _id: product._id,
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image || '',
                  category: product.category || '',
                  rating: product.rating || 0
                }} />
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            {/* Admin Panel link removed */}
          </div>
        </div>
      </main>
      <Footer />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Men;
