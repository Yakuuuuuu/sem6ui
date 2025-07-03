
import { ArrowRight } from 'lucide-react';

const ShopBySportSection = () => {
  const sports = [
    {
      id: 1,
      name: "Running",
      description: "Miles ahead of the rest",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      name: "Basketball",
      description: "Dominate the court",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      name: "Training",
      description: "Push your limits",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      name: "Soccer",
      description: "Beautiful game, beautiful gear",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section className="py-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Shop by Sport</h2>
          <p className="text-lg text-gray-300">Find gear designed for your passion</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sports.map((sport) => (
            <div key={sport.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <div className="aspect-square">
                  <img 
                    src={sport.image} 
                    alt={sport.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2 group-hover:text-gray-300 transition-colors">{sport.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{sport.description}</p>
                <button className="inline-flex items-center text-white font-semibold group-hover:underline">
                  Shop {sport.name}
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopBySportSection;
