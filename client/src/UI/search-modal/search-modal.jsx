import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { FiSearch } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

// Mock product data
const MOCK_PRODUCTS = {
  piano: [
    { id: 1, name: 'Yamaha Grand Piano', price: '$12,000', category: 'Piano' },
    { id: 2, name: 'Roland Digital Piano', price: '$3,000', category: 'Piano' },
    { id: 3, name: 'Kawai Upright Piano', price: '$8,000', category: 'Piano' }
  ],
  guitar: [
    { id: 4, name: 'Fender Stratocaster', price: '$1,200', category: 'Guitar' },
    { id: 5, name: 'Gibson Les Paul', price: '$2,500', category: 'Guitar' },
    { id: 6, name: 'Martin Acoustic', price: '$1,800', category: 'Guitar' }
  ],
  drums: [
    { id: 7, name: 'Pearl Export Series', price: '$800', category: 'Drums' },
    { id: 8, name: 'Tama Imperialstar', price: '$700', category: 'Drums' },
    { id: 9, name: 'Roland Electronic Drums', price: '$1,500', category: 'Drums' }
  ]
};

const SearchModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const modalContentRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef(null);

  // Mock API call
  const fetchSuggestions = async (query) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const searchLower = query.toLowerCase();
    let results = [];
    
    // Search through all categories
    Object.values(MOCK_PRODUCTS).forEach(products => {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      );
      results = [...results, ...filtered];
    });
    
    return results;
  };

  // Custom debounce implementation
  const debounce = (callback, delay) => {
    return (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  };

  // Create debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (query.trim()) {
        setLoading(true);
        try {
          const results = await fetchSuggestions(query);
          setSuggestions(results);
        } catch (error) {
          console.error('Search error:', error);
          setSuggestions([]);
        }
        setLoading(false);
      } else {
        setSuggestions([]);
      }
    }, 300),
    []
  );

  // Handle input change
  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  // Handle search submission
  const handleSearch = () => {
    if (searchTerm.trim()) {
      onClose();
      navigate(`/products?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  // Handle product click
  const handleProductClick = (product) => {
    onClose();
    navigate(`/products?q=${product.category.toLowerCase()}`);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const modal = modalRef.current;
    const content = modalContentRef.current;

    if (modal && content) {
      const tl = gsap.timeline({ paused: true });
      
      gsap.set(modal, { opacity: 0 });
      gsap.set(content, { 
        y: -50,
        opacity: 0 
      });

      tl.to(modal, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.inOut'
      })
      .to(content, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      }, '-=0.1');

      if (isOpen) {
        tl.play();
      } else {
        tl.reverse();
      }

      return () => {
        tl.kill();
      };
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div 
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <div 
            ref={modalContentRef}
            className="w-full max-w-2xl p-6 mx-4 bg-white rounded-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="relative flex max-md:flex-col gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search for instruments..."
                  value={searchTerm}
                  onChange={handleSearchInput}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full px-4 py-3 pl-12 text-lg border rounded-lg outline-none border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  autoFocus
                />
                <FiSearch className="absolute top-4 left-4 text-gray-400 w-5 h-5" />
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                >
                  <IoClose className="w-6 h-6" />
                </button>
              </div>
              
              <button
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 transition-colors"
                onClick={handleSearch}
              >
                <FiSearch className="w-5 h-5" />
                Search
              </button>
            </div>

            {/* Search Results Area */}
            <div className="mt-6">
              {loading ? (
                <p className="text-sm text-gray-500">Loading suggestions...</p>
              ) : searchTerm ? (
                suggestions.length > 0 ? (
                  <ul className="space-y-2">
                    {suggestions.map((product) => (
                      <li 
                        key={product.id}
                        className="p-3 hover:bg-gray-100 rounded cursor-pointer transition-colors"
                        onClick={() => handleProductClick(product)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{product.name}</h3>
                            <p className="text-sm text-gray-600">{product.category}</p>
                          </div>
                          <span className="text-blue-600 font-medium">{product.price}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No products found</p>
                )
              ) : (
                <p className="text-sm text-gray-500">Start typing to search for instruments...</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchModal;
