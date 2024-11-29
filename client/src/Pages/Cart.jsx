import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { assets } from '../assets/assets';
import { showToast } from '../utils/toast';


const Cart = () => {
    const cartRef = useRef(null);

    // Example cart items - in a real app, this would come from state management
    const [cartItems, setCartItems] = React.useState([
        {
            id: 1,
            name: "Fender Stratocaster",
            price: 1499.99,
            image: assets.instuments.brass,
            quantity: 1
        },
        {
            id: 2,
            name: "Roland TD-17KVX V-Drums",
            price: 1699.99,
            image: assets.instuments.electronic,
            quantity: 40
        },
        {
            id: 3,
            name: "BMW L2-XL Piano",
            price: 400.99,
            image: assets.instuments.piano,
            quantity: 30
        },
        {
            id: 4,
            name: "BOAT TD-17KVX V-Guitar",
            price: 3000.99,
            image: assets.instuments.string,
            quantity: 1
        }
    ]);

    useEffect(() => {
        // Animate cart items on mount
        gsap.from(".cart-item", {
            y: 30,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "power3.out"
        });
    }, []);

    const updateQuantity = (id, change) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + change) }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        const element = document.querySelector(`#item-${id}`);
        gsap.to(element, {
            x: -100,
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                setCartItems(items => items.filter(item => item.id !== id));
                showToast('Item removed from cart', 'success');
                showToast('Item removed from cart', 'error');
                showToast('Item removed from cart', 'warning');
                showToast('Item removed from cart', 'info');
            }
        });
    };

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div ref={cartRef} className="min-h-screen bg-gray-100 py-4 sm:py-8 dark:bg-black">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-8">
                    Your Cart
                </h1>

                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 dark:bg-gray-900">
                    {cartItems.map(item => (
                        <div
                            key={item.id}
                            id={`item-${item.id}`}
                            className="cart-item flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 py-4 last:border-b-0 gap-4"
                        >
                            <div className="flex items-center space-x-4 dark:text-white">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md"
                                />
                                <div>
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
                                        {item.name}
                                    </h3>
                                    <p className="text-green-400 text-sm sm:text-base">
                                        ${item.price.toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center border rounded-lg p-3 justify-between sm:justify-end space-x-4 ml-24 sm:ml-0">
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => updateQuantity(item.id, -1)}
                                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                                        aria-label="Decrease quantity"
                                    >
                                        <FaMinus className="text-gray-500 dark:text-white w-3 h-3 sm:w-4 sm:h-4" />
                                    </button>
                                    <span className="w-8 text-center dark:text-white text-sm sm:text-base">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => updateQuantity(item.id, 1)}
                                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                                        aria-label="Increase quantity"
                                    >
                                        <FaPlus className="text-gray-500 dark:text-white w-3 h-3 sm:w-4 sm:h-4" />
                                    </button>
                                </div>

                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="p-2 text-red-500  hover:bg-red-400 rounded hover:text-white transition-colors"
                                    aria-label="Remove item"
                                >
                                    <FaTrash className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                            <span className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
                                Total:
                            </span>
                            <span className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                                ${total.toFixed(2)}
                            </span>
                        </div>

                        {cartItems.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-gray-500 dark:text-gray-400 text-lg">
                                    Your cart is empty
                                </p>
                            </div>
                        )}

                        {cartItems.length > 0 && (
                            <button
                                className="w-full mt-4 bg-indigo-600 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm sm:text-base"
                                onClick={() => {
                                    gsap.to(".cart-item", {
                                        scale: 1.02,
                                        duration: 0.2,
                                        yoyo: true,
                                        repeat: 1
                                    });
                                }}
                            >
                                Proceed to Checkout
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
