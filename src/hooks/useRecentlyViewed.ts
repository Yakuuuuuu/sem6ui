import { useState, useEffect } from 'react';
import { useProducts } from '@/context/ProductContext';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const STORAGE_KEY = 'recentlyViewedProducts';
const MAX_ITEMS = 8;

export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const { products } = useProducts();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Only keep products that still exist
        setRecentlyViewed(parsed.filter((item: Product) => products.some(p => p.id === item.id)));
      } catch (error) {
        console.error('Error parsing recently viewed products:', error);
      }
    }
  }, [products]);

  const addToRecentlyViewed = (product: Product) => {
    setRecentlyViewed(current => {
      // Remove if already exists
      const filtered = current.filter(item => item.id !== product.id);
      // Add to beginning
      const updated = [product, ...filtered].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    recentlyViewed,
    addToRecentlyViewed,
    clearRecentlyViewed
  };
};
