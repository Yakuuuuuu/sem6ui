import { useState } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ProductGrid from '../components/ProductGrid';
import CategorySection from '../components/CategorySection';
import NewFeaturedSection from '../components/NewFeaturedSection';
import TrendingSection from '../components/TrendingSection';
import VideoSection from '../components/VideoSection';
import BrandLogosSection from '../components/BrandLogosSection';
import ShopBySportSection from '../components/ShopBySportSection';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import CompareDrawer from '../components/CompareDrawer';
import { CompareProvider } from '../context/CompareContext';

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CompareProvider>
      <div className="min-h-screen bg-white transition-colors duration-200">
        {/* Skip Navigation Link */}
        <a 
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-black text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>
        
        <Header onCartClick={() => setIsCartOpen(true)} />
        
        <main id="main-content" role="main">
          <h1 className="sr-only">shoeNP - Athletic Shoes, Clothing & Accessories</h1>
          
          <section aria-label="Hero banner">
            <HeroSection />
          </section>
          
          <section aria-label="New and featured products">
            <NewFeaturedSection />
          </section>
          
          <section aria-label="Product catalog">
            <ProductGrid />
          </section>
          
          <section aria-label="Brand video showcase">
            <VideoSection />
          </section>
          
          <section aria-label="Partner brands">
            <BrandLogosSection />
          </section>
          
          <section aria-label="Trending products">
            <TrendingSection />
          </section>
          
          <section aria-label="Shop by category">
            <CategorySection />
          </section>
          
          <section aria-label="Shop by sport">
            <ShopBySportSection />
          </section>
          
          <section aria-label="Newsletter signup">
            <NewsletterSection />
          </section>
        </main>
        
        <Footer />
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <CompareDrawer />
      </div>
    </CompareProvider>
  );
};

export default Index;
