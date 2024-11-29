import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

import { assets } from '../assets/assets';
import Carousel from '../UI/carousel/Carousel';
import AdBanner from '../UI/ad-banner/AdBanner';

const Home = () => {
  const productsRef = useRef([]);
  const newArrivalsRef = useRef([]);
  const bestSellersRef = useRef([]);

  const [products,setProducts] = useState({
    trending: [
      {
        id: 1,
        name: "Fender Stratocaster Electric Guitar",
        price: 79.99,
        originalPrice: 99.99,
        discount: 20,
        image: "https://images.unsplash.com/photo-1526857508893-05ed3f2c4755?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        id: 2, 
        name: "Yamaha P-125 Digital Piano",
        price: 139.99,
        originalPrice: 199.99,
        discount: 30,
        image: "https://i.pinimg.com/736x/2a/f3/0c/2af30cd35a934528105b91fe90c79acf.jpg"
      },
      {
        id: 3,
        name: "Gibson Les Paul Standard Electric Guitar",
        price: 84.99,
        originalPrice: 99.99,
        discount: 15,
        image: "https://i.pinimg.com/736x/35/95/17/3595176b1117e625b7fa286da943d97d.jpg"
      },
      {
        id: 4,
        name: "Roland TD-17KVX Electronic Drum Kit",
        price: 44.99,
        originalPrice: 59.99,
        discount: 25,
        image: "https://i.pinimg.com/736x/c7/23/21/c72321c7d250eb388a090a01eeeae694.jpg"
      }
    ],
    newArrivals: Array(4).fill().map((_, index) => ({
      id: 5 + index,
      name: `New Product ${index + 1}`,
      price: 59.99 + index * 10,
      image: "https://placehold.co/300x200"
    })),
    bestSellers: Array(4).fill().map((_, index) => ({
      id: 9 + index,
      name: `Popular Item ${index + 1}`,
      price: 89.99 + index * 10,
      image: "https://placehold.co/300x200"
    }))
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate trending products
    gsap.fromTo(productsRef.current,
      {
        opacity: 0,
        y: 100
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
      }
    );

    // Animate new arrivals section
    gsap.fromTo(newArrivalsRef.current,
      {
        opacity: 0,
        y: 100
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: newArrivalsRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate best sellers section
    gsap.fromTo(bestSellersRef.current,
      {
        opacity: 0,
        y: 100
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: bestSellersRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Add floating hover effect to all product cards
    const addFloatingEffect = (element) => {
      let animation;

      element.addEventListener('mouseenter', () => {
        // Kill any existing animation
        if (animation) animation.kill();

        // Create new floating animation
        animation = gsap.to(element, {
          y: -10,
          duration: 1,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1
        });
      });

      element.addEventListener('mouseleave', () => {
        // Kill floating animation
        if (animation) {
          animation.kill();
        }
        // Return to original position
        gsap.to(element, {
          y: 0,
          duration: 0.5,
          ease: "power1.inOut"
        });
      });
    };

    // Apply floating effect to all product cards
    [...productsRef.current, ...newArrivalsRef.current, ...bestSellersRef.current].forEach(card => {
      if (card) addFloatingEffect(card);
    });

  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 dark:bg-black bg-main">
      <Carousel />

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Trending Deals & Offers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.trending.map((product, index) => (
            <div
              key={product.id}
              ref={el => productsRef.current[index] = el}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative cursor-pointer flex flex-col h-full"
            >
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-sm">
                  -{product.discount}%
                </div>
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="text-lg font-semibold mb-2 dark:text-white">{product.name}</h3>
                <div className="flex items-center mb-2">
                  <span className="text-green-500 font-bold">${product.price}</span>
                  <span className="ml-2 text-gray-500 line-through text-sm">${product.originalPrice}</span>
                </div>
                <div className="flex gap-2 mt-auto">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Add to Cart
                  </button>
                  <Link to={`/product/${product.id}`} className="flex-1">
                    <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors">
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-[2px] bg-blue-500"></div>
            </div>
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">New Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.newArrivals.map((product, index) => (
            <div
              key={product.id}
              ref={el => newArrivalsRef.current[index] = el}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative cursor-pointer flex flex-col h-full"
            >
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-md text-sm">
                  NEW
                </div>
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="text-lg font-semibold mb-2 dark:text-white">{product.name}</h3>
                <div className="flex items-center mb-2">
                  <span className="text-green-500 font-bold">${product.price.toFixed(2)}</span>
                </div>
                <div className="flex gap-2 mt-auto">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Add to Cart
                  </button>
                  <Link to={`/product/${product.id}`} className="flex-1">
                    <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors">
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-[2px] bg-blue-500"></div>
            </div>
          ))}
        </div>
      </section>

      <AdBanner image={assets.banner.banner10} />

      {/* Best Sellers Section */}
      <section className="mt-16 mb-8">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Best Sellers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.bestSellers.map((product, index) => (
            <div
              key={product.id}
              ref={el => bestSellersRef.current[index] = el}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative cursor-pointer flex flex-col h-full"
            >
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md text-sm">
                  BEST SELLER
                </div>
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="text-lg font-semibold mb-2 dark:text-white">{product.name}</h3>
                <div className="flex items-center mb-2">
                  <span className="text-green-500 font-bold">${product.price.toFixed(2)}</span>
                </div>
                <div className="flex gap-2 mt-auto">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Add to Cart
                  </button>
                  <Link to={`/product/${product.id}`} className="flex-1">
                    <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors">
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-[2px] bg-blue-500"></div>
            </div>
          ))}
        </div>
      </section>

      <AdBanner image={assets.banner.banner8} />
e    </div>
  );
};

export default Home;
