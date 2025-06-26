export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  stock: number;
  description?: string;
}

export const products: Product[] = [
  // Nike Products
  {
    id: 1,
    name: 'Air Max 270',
    price: 150,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Men\'s Shoes',
    brand: 'Nike',
    rating: 4.5,
    stock: 25,
    description: 'Comfortable and stylish sneakers with excellent cushioning for all-day wear'
  },
  {
    id: 2,
    name: 'React Infinity Run',
    price: 160,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Running Shoes',
    brand: 'Nike',
    rating: 4.8,
    stock: 15,
    description: 'High-performance running shoes designed for long-distance runners with superior comfort'
  },
  {
    id: 3,
    name: 'Air Force 1 Classic',
    price: 90,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Lifestyle',
    brand: 'Nike',
    rating: 4.7,
    stock: 30,
    description: 'Timeless basketball-inspired design meets street style in this iconic silhouette'
  },
  {
    id: 4,
    name: 'Zoom Pegasus 38',
    price: 120,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Running Shoes',
    brand: 'Nike',
    rating: 4.6,
    stock: 20,
    description: 'Responsive cushioning and reliable support for your daily runs'
  },
  {
    id: 5,
    name: 'Dunk Low Retro',
    price: 100,
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Lifestyle',
    brand: 'Nike',
    rating: 4.4,
    stock: 35,
    description: 'Classic basketball shoe with vintage appeal and modern comfort'
  },
  {
    id: 6,
    name: 'Air Max 90',
    price: 130,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Men\'s Shoes',
    brand: 'Nike',
    rating: 4.3,
    stock: 18,
    description: 'Iconic design with visible Air cushioning and premium materials'
  },
  {
    id: 7,
    name: 'Blazer Mid 77',
    price: 110,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Lifestyle',
    brand: 'Nike',
    rating: 4.5,
    stock: 22,
    description: 'Vintage basketball style with a crisp leather upper and classic design'
  },
  {
    id: 8,
    name: 'React Element 55',
    price: 140,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Men\'s Shoes',
    brand: 'Nike',
    rating: 4.2,
    stock: 12,
    description: 'Modern design with React foam cushioning for exceptional comfort'
  },
  // Adidas Products
  {
    id: 9,
    name: 'Ultraboost 22',
    price: 180,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Running Shoes',
    brand: 'Adidas',
    rating: 4.7,
    stock: 28,
    description: 'Revolutionary energy return with Boost technology for ultimate running performance'
  },
  {
    id: 10,
    name: 'Stan Smith Classic',
    price: 85,
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Lifestyle',
    brand: 'Adidas',
    rating: 4.6,
    stock: 45,
    description: 'Timeless tennis-inspired sneaker with clean white leather construction'
  },
  {
    id: 11,
    name: 'NMD R1',
    price: 140,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Lifestyle',
    brand: 'Adidas',
    rating: 4.4,
    stock: 32,
    description: 'Street-ready style with responsive Boost cushioning and sock-like fit'
  },
  {
    id: 12,
    name: 'Superstar Original',
    price: 80,
    image: 'https://images.unsplash.com/photo-1506629905607-afc3cffe8c02?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Lifestyle',
    brand: 'Adidas',
    rating: 4.5,
    stock: 40,
    description: 'Iconic shell-toe design that started a revolution in street fashion'
  },
  // Puma Products
  {
    id: 13,
    name: 'RS-X³ Puzzle',
    price: 110,
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Lifestyle',
    brand: 'Puma',
    rating: 4.3,
    stock: 24,
    description: 'Bold chunky sneaker with mixed materials and futuristic design elements'
  },
  {
    id: 14,
    name: 'Suede Classic',
    price: 75,
    image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Lifestyle',
    brand: 'Puma',
    rating: 4.4,
    stock: 38,
    description: 'Legendary suede sneaker that defined streetwear culture since 1968'
  },
  // Vans Products
  {
    id: 15,
    name: 'Old Skool Black',
    price: 65,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Skateboarding',
    brand: 'Vans',
    rating: 4.6,
    stock: 50,
    description: 'Classic skate shoe with signature side stripe and durable canvas construction'
  },
  {
    id: 16,
    name: 'Authentic Canvas',
    price: 50,
    image: 'https://images.unsplash.com/photo-1520256862855-398228c41684?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Skateboarding',
    brand: 'Vans',
    rating: 4.3,
    stock: 42,
    description: 'Simple, clean design that started the Vans legacy in skateboarding'
  },
  // Converse Products
  {
    id: 17,
    name: 'Chuck Taylor All Star',
    price: 55,
    image: 'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Lifestyle',
    brand: 'Converse',
    rating: 4.5,
    stock: 60,
    description: 'The original basketball shoe that became a cultural icon'
  },
  {
    id: 18,
    name: 'Chuck 70 High Top',
    price: 85,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Lifestyle',
    brand: 'Converse',
    rating: 4.4,
    stock: 35,
    description: 'Premium version of the classic with enhanced comfort and vintage details'
  },
  // New Balance Products
  {
    id: 19,
    name: '990v5 Grey',
    price: 185,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Running Shoes',
    brand: 'New Balance',
    rating: 4.8,
    stock: 16,
    description: 'Made in USA premium running shoe with superior craftsmanship'
  },
  {
    id: 20,
    name: '574 Core',
    price: 80,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Lifestyle',
    brand: 'New Balance',
    rating: 4.2,
    stock: 33,
    description: 'Versatile lifestyle sneaker with classic New Balance styling'
  },
  // Nepali Brand Shoes
  {
    id: 21,
    name: 'Sherpa Trail Pro',
    price: 95,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Trekking Shoes',
    brand: 'Sherpa',
    rating: 4.6,
    stock: 20,
    description: 'Handcrafted trekking shoes designed for Himalayan terrain with superior grip and comfort'
  },
  {
    id: 22,
    name: 'Everest Base Camp',
    price: 120,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Mountaineering',
    brand: 'Sherpa',
    rating: 4.8,
    stock: 15,
    description: 'Professional mountaineering boots inspired by Everest expeditions'
  },
  {
    id: 23,
    name: 'Himalayan Heritage',
    price: 75,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Casual Wear',
    brand: 'Himalayan',
    rating: 4.4,
    stock: 30,
    description: 'Traditional Nepali craftsmanship meets modern comfort in these heritage shoes'
  },
  {
    id: 24,
    name: 'Kathmandu Classic',
    price: 65,
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Lifestyle',
    brand: 'Himalayan',
    rating: 4.3,
    stock: 25,
    description: 'Inspired by the vibrant culture of Kathmandu with colorful traditional patterns'
  },
  {
    id: 25,
    name: 'Annapurna Walker',
    price: 85,
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Walking Shoes',
    brand: 'Mustang',
    rating: 4.5,
    stock: 22,
    description: 'Lightweight walking shoes perfect for daily adventures and long walks'
  },
  {
    id: 26,
    name: 'Rhododendron Runner',
    price: 90,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Running Shoes',
    brand: 'Mustang',
    rating: 4.4,
    stock: 18,
    description: 'Running shoes featuring Nepal\'s national flower design with modern performance technology'
  }
];

// Helper function to get products by brand
export const getProductsByBrand = (brand: string): Product[] => {
  return products.filter(product => product.brand.toLowerCase() === brand.toLowerCase());
};

// Helper function to get unique brands
export const getUniqueBrands = (): string[] => {
  return [...new Set(products.map(product => product.brand))];
};
