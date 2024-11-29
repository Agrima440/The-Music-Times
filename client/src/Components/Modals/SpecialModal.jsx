import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FiX } from 'react-icons/fi';
import { assets } from '../../assets/assets';

const makhanaProducts = [
  {
    id: 1,
    name: "Classic Salted Makhana",
    price: "₹199",
    weight: "100g",
    image: assets.makhana.masala,
    description: "Perfectly roasted and lightly salted lotus seeds"
  },
  {
    id: 2,
    name: "Spicy Masala Makhana",
    price: "₹219",
    weight: "100g",
    image: assets.makhana.spicy,
    description: "Tangy and spicy masala flavored fox nuts"
  },
  {
    id: 3,
    name: "Cheese & Herbs Makhana",
    price: "₹249",
    weight: "100g",
    image: assets.makhana.cheese,
    description: "Cheesy and herby flavored premium fox nuts"
  }
];

const SpecialModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const modalContentRef = useRef(null);
  const modalOverlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Show modal
      gsap.set(modalRef.current, { display: 'block' });
      
      const tl = gsap.timeline();
      
      tl.fromTo(modalOverlayRef.current,
        {
          opacity: 0
        },
        {
          opacity: 1,
          duration: 0.3
        }
      ).fromTo(modalContentRef.current,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.2)"
        }
      ).fromTo(".makhana-item",
        {
          y: 20,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.4
        }
      );
    }
  }, [isOpen]);

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(modalRef.current, { display: 'none' });
        onClose();
      }
    });

    tl.to(".makhana-item", {
      y: 20,
      opacity: 0,
      stagger: 0.05,
      duration: 0.3
    }).to(modalContentRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.3
    }).to(modalOverlayRef.current, {
      opacity: 0,
      duration: 0.3
    });
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50"
      style={{ display: 'none' }}
    >
      {/* Overlay */}
      <div
        ref={modalOverlayRef}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            ref={modalContentRef}
            className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto scrollbar-hide"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b dark:border-gray-800">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Special Makhana Collection
              </h3>
              <button
                onClick={handleClose}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 
                         dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 
                         dark:hover:bg-gray-800 transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {makhanaProducts.map((product) => (
                  <div
                    key={product.id}
                    className="makhana-item flex flex-col p-4 rounded-xl border dark:border-gray-800 
                             hover:shadow-lg dark:hover:shadow-gray-800/50 transition-shadow"
                  >
                    <div className="flex flex-col  gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">
                          {product.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-blue-600 dark:text-blue-400 font-medium">
                            {product.price}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {product.weight}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* New Buttons */}
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => {/* Add cart logic */}}
                        className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 
                                 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 
                                 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => {/* Add buy logic */}}
                        className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 
                                 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
                                 rounded-lg transition-colors"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialModal;