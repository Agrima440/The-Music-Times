import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Carousel = () => {

    const banners = [
        assets.banner.banner1,
        assets.banner.banner2,
        assets.banner.banner3,
        assets.banner.banner4,
        assets.banner.banner5,
        assets.banner.banner6,
        assets.banner.banner7,
        assets.banner.banner8,
        assets.banner.banner9,
        assets.banner.banner10,
        assets.banner.banner11,
        assets.banner.banner12
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full mx-auto">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg">
                <div className="relative w-full aspect-[5/1] max-h-[266px] overflow-hidden">
                    {banners.map((banner, index) => (
                        <div
                            key={index}
                            className={`absolute w-full h-full transition-opacity duration-500 ease-in-out
            ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <img
                                src={banner}
                                alt={`Banner ${index + 1}`}
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>
                    ))}

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/30 
                 text-white hover:bg-black/50 transition-colors backdrop-blur-sm"
                    >
                        <FiChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/30 
                 text-white hover:bg-black/50 transition-colors backdrop-blur-sm"
                    >
                        <FiChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
                    </button>

                    {/* Navigation Dots */}
                    <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 
                    bg-black/20 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-full">
                        {banners.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors
              ${index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/75'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carousel; 