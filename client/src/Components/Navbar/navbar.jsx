import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import {
  FiMenu,
  FiX,
  FiSearch,
  FiShoppingCart,
  FiSun,
  FiMoon,
  FiUser,
  FiHome,
  FiTag,
  FiHeart,
  FiSettings
} from 'react-icons/fi';
import { IoChevronDownOutline } from 'react-icons/io5';
import { assets } from '../../assets/assets';
import SearchModal from '../../UI/search-modal/search-modal';
import SpecialModal from '../Modals/SpecialModal';
import { div } from 'framer-motion/client';
import { showToast } from '../../utils/toast';
import axios from 'axios';

const menuItems = [
  { icon: <FiHome />, label: "Home", path: "/" },
  { icon: <FiTag />, label: "Offers", path: "/offers" },
  { icon: <FiHeart />, label: "Wishlist", path: "/wishlist" },
  { icon: null, label: "Categories", path: null, hasDropdown: true },
  { icon: null, label: "Special Collection", path: null, isSpecial: true }
];

const Navbar = () => {

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSpecialModalOpen, setIsSpecialModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('string');

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const menuRef = useRef(null);
  const overlayRef = useRef(null);
  const timeline = useRef(null);
  const categoryRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isMenuOpen) {
      // Show menu
      gsap.set(menuRef.current, {
        display: 'block',
        x: -280 // Start from left side
      });
      gsap.set(overlayRef.current, { display: 'block' });

      const tl = gsap.timeline();

      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3
      })
        .to(menuRef.current, {
          x: 0,
          duration: 0.5,
          ease: "power4.out"
        })
        .fromTo(".menu-item",
          {
            opacity: 0,
            x: -20
          },
          {
            opacity: 1,
            x: 0,
            stagger: 0.1,
            ease: "power2.out"
          }
        );

      timeline.current = tl;
    }
  }, [isMenuOpen]);

  const handleCloseClick = () => {
    if (timeline.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set([menuRef.current, overlayRef.current], { display: 'none' });
          setIsMenuOpen(false);
        }
      });

      tl.to(".menu-item", {
        opacity: 0,
        x: -20,
        stagger: 0.05,
        ease: "power2.in"
      })
        .to(menuRef.current, {
          x: -280,
          duration: 0.5,
          ease: "power4.in"
        })
        .to(overlayRef.current, {
          opacity: 0,
          duration: 0.3
        });
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(true);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
    };

    if (localStorage.getItem('username')) {
      setLoggedIn(true)
    }


    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // const handleLogout = async () => {

  //   try {
  //     localStorage.removeItem('username')
  //     const response = await axios.post('/api/user/logout', formData);

      

  //   } catch (error) {
  //     showToast(error, 'error')
  //   }
  // }

  const renderSubcategories = () => {
    const subcategories = {
      string: ['Violin', 'Guitar', 'Cello', 'Bass', 'Viola', 'Harp'],
      piano: ['Grand Piano', 'Upright Piano', 'Digital Piano', 'Keyboard', 'Synthesizer', 'MIDI Controller'],
      traditional: ['Sitar', 'Tabla', 'Harmonium', 'Santoor', 'Veena', 'Sarod'],
      brass: ['Trumpet', 'Trombone', 'French Horn', 'Tuba', 'Euphonium', 'Cornet'],
      wind: ['Flute', 'Clarinet', 'Saxophone', 'Oboe', 'Bassoon', 'Piccolo']
    };

    const titles = {
      string: 'String Instruments',
      piano: 'Keyboard & Piano',
      traditional: 'Traditional Instruments',
      brass: 'Brass Instruments',
      wind: 'Wind Instruments'
    };

    return (
      <div className="space-y-4 ">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{titles[activeCategory]}</h3>
        <div className="grid grid-cols-3 gap-4">
          {subcategories[activeCategory].map((item, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                <img
                  src={assets.instuments[activeCategory]}
                  alt={item}
                  className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 text-center font-medium">{item}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <nav className="bg-white dark:bg-[#0A1A49] shadow-md sticky w-full top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Left - Logo */}
          <div className="flex-shrink-0">
            <Link to='/'>
              <div className="w-28 sm:w-32 md:w-36">
                <img
                  src={assets.logo}
                  alt="Logo"
                  className="w-full h-auto object-contain mix-blend-difference dark:mix-blend-normal"
                />
              </div>
            </Link>
          </div>

          {/* Center - Navigation */}
          <div className="hidden lg:flex items-center justify-center space-x-1">
            {/* Categories Dropdown */}
            <div className="relative" ref={categoryRef}>
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 
                         hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 
                         dark:hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span>Categories</span>
                <IoChevronDownOutline
                  className={`transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isCategoryOpen && (
                <div className="absolute top-full left-0 mt-2 w-[900px] bg-white dark:bg-gray-900 
                             rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 
                             overflow-hidden menu-dropdown" ref={dropdownRef}>
                  <div className="p-4 flex">
                    {/* Left side - Main categories */}
                    <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 pr-4">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                        Instrument Categories
                      </h3>
                      <div className="space-y-2">
                        {[
                          { name: 'String Instruments', icon: '🎻', type: 'string' },
                          { name: 'Keyboard & Piano', icon: '🎹', type: 'piano' },
                          { name: 'Traditional', icon: '🪕', type: 'traditional' },
                          { name: 'Brass', icon: '🎺', type: 'brass' },
                          { name: 'Wind', icon: '🎷', type: 'wind' }
                        ].map((category) => (
                          <button
                            key={category.type}
                            onClick={() => {
                              setActiveCategory(category.type);
                              gsap.from(".subcategory-content", {
                                opacity: 0,
                                x: 20,
                                duration: 0.4,
                                ease: "power2.out"
                              });
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                                     ${activeCategory === category.type
                                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                              }`}
                          >
                            <span className="text-xl">{category.icon}</span>
                            <span className="font-medium">{category.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Right side - Sub categories */}
                    <div className="w-2/3 pl-6 subcategory-content">
                      {renderSubcategories()}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/offers"
              className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 
                       hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 
                       dark:hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span>Offers</span>
            </Link>

            <Link
              to="/wishlist"
              className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 
                       hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 
                       dark:hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span>Wishlist</span>
            </Link>

            <button
              onClick={() => setIsSpecialModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 
                       hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 
                       dark:hover:bg-gray-100 rounded-lg transition-colors relative"
            >
              <span>Special Collection</span>
              <span className="absolute -top-1 -right-3 flex h-7 w-7">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-7 w-7 bg-red-500 text-[10px] text-white items-center justify-center">
                  New
                </span>
              </span>
            </button>
          </div>

          {/* Right - Icons & Actions */}
          <div className="flex items-center gap-3 space-x-1">
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden sm:flex p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 
                       dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-100 
                       rounded-lg transition-colors"
              aria-label="Search"
            >
              <FiSearch className="h-5 w-5" />
            </button>

            <Link to="/cart">
              <button
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 
                         dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-100 
                         rounded-lg transition-colors"
                aria-label="Cart"
              >
                <FiShoppingCart className="h-5 w-5" />
              </button>
            </Link>

            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 
                       dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-100 
                       rounded-lg transition-colors"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
            </button>

           
              <Link to="/login" className="hidden sm:block">
                <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                  <FiUser className="h-5 w-5" />
                  <span>Login</span>
                </button>
              </Link>
            

            <button
              className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-200 
                       hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={handleMenuToggle}
              aria-label="Menu"
            >
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        style={{ display: 'none', opacity: 0 }}
        onClick={handleCloseClick}
      />

      {/* Mobile Menu Panel */}
      <div
        ref={menuRef}
        className="fixed top-0 left-0 h-full w-[280px] bg-white dark:bg-gray-900 
                 shadow-xl lg:hidden overflow-y-auto z-50"
        style={{ display: 'none' }}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
          <div className="w-24">
            <img
              src={assets.logo}
              alt="Logo"
              className="w-full h-auto object-contain mix-blend-difference dark:mix-blend-normal"
            />
          </div>
          <button
            onClick={handleCloseClick}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 
                     hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        {/* Menu Content */}
        <div className="p-4 space-y-4">
          {/* Search Bar */}
          <div className="menu-item relative mb-6">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 
                     dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            />
            <FiSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          {/* Menu Items */}
          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <div key={index} className="menu-item">
                {item.path ? (
                  <Link
                    to={item.path}
                    className="flex items-center gap-3 px-4 py-3 text-gray-600 
                             dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 
                             rounded-lg transition-colors"
                    onClick={handleCloseClick}
                  >
                    {item.icon && <span className="text-lg">{item.icon}</span>}
                    <span>{item.label}</span>
                  </Link>
                ) : item.hasDropdown ? (
                  <button
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 
                             text-gray-600 dark:text-gray-300 hover:bg-gray-100 
                             dark:hover:bg-gray-800 rounded-lg"
                  >
                    <span>{item.label}</span>
                    <IoChevronDownOutline className={`transition-transform duration-200 
                                                  ${isCategoryOpen ? 'rotate-180' : ''}`} />
                  </button>
                ) : item.isSpecial ? (
                  <button
                    onClick={() => {
                      setIsSpecialModalOpen(true);
                      handleCloseClick();
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 
                             text-gray-600 dark:text-gray-300 hover:bg-gray-100 
                             dark:hover:bg-gray-800 rounded-lg"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs px-2 py-1 bg-red-500 text-white rounded-full">
                      New
                    </span>
                  </button>
                ) : null}
              </div>
            ))}
          </div>

          {/* Mobile Login Button */}
          <div className="menu-item pt-4 border-t dark:border-gray-800">
            <Link to="/login" className="block sm:hidden">
              <button className="w-full flex items-center justify-center gap-2 bg-blue-500 
                             hover:bg-blue-600 text-white px-4 py-3 rounded-lg 
                             transition-colors"
              >
                <FiUser className="h-5 w-5" />
                <span>Login</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <SpecialModal isOpen={isSpecialModalOpen} onClose={() => setIsSpecialModalOpen(false)} />
    </nav>
  );
};

export default Navbar;
