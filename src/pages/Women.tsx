import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import ProductCard from '../components/ProductCard';
import { useProducts } from '@/context/ProductContext';

const Women = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { products } = useProducts();
  // Show products with category including 'Women' (case-insensitive)
  const womenProducts = products.filter(p => p.category && p.category.toLowerCase().includes('women'));

  return (
    <div className="min-h-screen bg-white transition-colors duration-200">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Women's Collection</h1>
            <p className="text-lg text-gray-600">Premium footwear and apparel designed for women</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {womenProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <ProductCard product={product} />
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

export default Women;
