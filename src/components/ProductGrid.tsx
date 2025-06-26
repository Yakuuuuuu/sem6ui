import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import QuickViewModal from './QuickViewModal';
import { useProducts } from '@/context/ProductContext';

const ProductGrid = () => {
  const { products } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setSelectedProduct(null);
    setIsQuickViewOpen(false);
  };

  return (
    <section className="py-16 bg-white" role="region" aria-labelledby="featured-products-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="featured-products-heading" className="text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600">Discover the latest innovations in athletic wear</p>
        </div>

        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          role="list"
          aria-label="Featured products"
        >
          {products.map((product) => (
            <div key={product.id} role="listitem">
              <Link to={`/product/${product.id}`} style={{ display: 'block', height: '100%' }}>
                <ProductCard product={product} onQuickView={handleQuickView} />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            className="bg-black text-white px-8 py-3 text-lg font-semibold hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
            aria-label="View all products in our catalog"
          >
            View All Products
          </button>
        </div>
      </div>

      <QuickViewModal
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
      />
    </section>
  );
};

export default ProductGrid;

