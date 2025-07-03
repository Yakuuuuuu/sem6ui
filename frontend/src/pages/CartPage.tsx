import Cart from '../components/Cart';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';

const CartPage = () => {
  // Always open the cart drawer on this page
  const [isCartOpen, setIsCartOpen] = useState(true);

  return (
    <div className="min-h-screen bg-white">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <main className="pt-16">
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        {!isCartOpen && (
          <div className="text-center py-20">
            <button
              className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
              onClick={() => setIsCartOpen(true)}
            >
              Open Cart
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage; 