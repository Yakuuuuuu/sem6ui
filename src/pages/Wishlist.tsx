
import { useState } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import { useCart } from '../context/CartContext';

const Wishlist = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToCart } = useCart();

  // Mock wishlist data
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Air Max 270',
      price: 150,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'Men\'s Shoes',
      rating: 4.5
    },
    {
      id: 2,
      name: 'React Infinity Run',
      price: 160,
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'Running Shoes',
      rating: 4.8
    }
  ]);

  const removeFromWishlist = (id: number) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  const handleAddToBag = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      size: '9', // Default size
      color: 'Default'
    });
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-black mb-8">
            Favorites ({wishlistItems.length})
          </h1>

          {wishlistItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {wishlistItems.map((item) => (
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
                    <p className="text-lg font-bold text-black">${item.price}</p>
                    
                    <button
                      onClick={() => handleAddToBag(item)}
                      className="w-full mt-4 bg-black text-white py-2 px-4 rounded-full font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h2>
              <p className="text-gray-500 mb-6">Save items you love to your wishlist</p>
              <a
                href="/"
                className="inline-block px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </a>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Wishlist;
