import { useState } from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/data/products';
import CompareButton from './CompareButton';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

const ProductCard = ({ product, onQuickView }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAddingToCart(true);
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });

    // Simulate loading and provide feedback
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 500);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    onQuickView?.(product);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleAddToCart(e as any);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400" aria-hidden="true">★</span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400" aria-hidden="true">★</span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300" aria-hidden="true">★</span>
      );
    }

    return stars;
  };

  return (
    <article
      className="group cursor-pointer bg-white rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 focus-within:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="article"
      aria-labelledby={`product-${product.id}-name`}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={`${product.name} - ${product.category}`}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div 
          className={`absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center space-x-3 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden={!isHovered}
        >
          <button
            onClick={handleQuickView}
            className="bg-white text-black px-4 py-2 rounded-full font-semibold flex items-center space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye className="h-4 w-4" aria-hidden="true" />
            <span>Quick View</span>
          </button>
          <button
            onClick={handleAddToCart}
            onKeyDown={handleKeyDown}
            disabled={isAddingToCart}
            className="bg-white text-black px-4 py-2 rounded-full font-semibold flex items-center space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50"
            aria-label={`Add ${product.name} to cart for $${product.price}`}
          >
            <ShoppingCart className="h-4 w-4" aria-hidden="true" />
            <span>{isAddingToCart ? 'Adding...' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="text-sm text-gray-500 mb-1">{product.category}</div>
        <h3 id={`product-${product.id}-name`} className="font-semibold text-lg text-gray-900 mb-2">
          {product.name}
        </h3>
        <div className="flex items-center mb-2" role="img" aria-label={`Rating: ${product.rating} out of 5 stars`}>
          {renderStars(product.rating)}
          <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900" aria-label={`Price: $${product.price}`}>
            ${product.price}
          </span>
          <CompareButton product={product} variant="icon" />
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
