import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, Filter, X } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import ProductCard from '../components/ProductCard';
import { useProducts } from '@/context/ProductContext';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    size: '',
    color: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  const { products } = useProducts();
  const [searchResults, setSearchResults] = useState(products);

  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
    
    // Filter products based on search query
    if (query) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults(products);
    }
  }, [searchParams, products]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
  };

  const popularSearches = ['Air Max', 'Jordan', 'Running Shoes', 'Basketball', 'Training'];

  return (
    <div className="min-h-screen bg-white">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Header */}
          <div className="mb-8">
            <form onSubmit={handleSearch} className="relative max-w-2xl">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
              />
            </form>
            
            {!searchQuery && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Popular Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchQuery(term);
                        setSearchParams({ q: term });
                      }}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {searchQuery && (
            <>
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">
                  Search Results for "{searchQuery}" ({searchResults.length})
                </h1>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-full hover:border-black transition-colors lg:hidden"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </button>
              </div>

              <div className="flex gap-8">
                {/* Filters Sidebar */}
                <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-64 space-y-6`}>
                  <div>
                    <h3 className="font-semibold mb-4">Category</h3>
                    <div className="space-y-2">
                      {['Shoes', 'Clothing', 'Accessories'].map((category) => (
                        <label key={category} className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4">Price</h3>
                    <div className="space-y-2">
                      {['Under $100', '$100 - $150', '$150 - $200', 'Over $200'].map((range) => (
                        <label key={range} className="flex items-center space-x-2">
                          <input type="radio" name="price" className="rounded" />
                          <span className="text-sm">{range}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Results Grid */}
                <div className="flex-1">
                  {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {searchResults.map((product) => (
                        <Link key={product.id} to={`/product/${product.id}`}>
                          <ProductCard product={product} />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <SearchIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h2 className="text-xl font-semibold text-gray-700 mb-2">No results found</h2>
                      <p className="text-gray-500">Try adjusting your search or browse our collections</p>
                      <Link
                        to="/"
                        className="inline-block mt-4 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                      >
                        Back to Home
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Search;
