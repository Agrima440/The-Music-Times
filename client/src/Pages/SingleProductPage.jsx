import { useState } from 'react';
import { Link } from 'react-router-dom';

const SingleProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const product = {
    id: 1,
    name: "Gibson Les Paul Standard Electric Guitar",
    price: 2499.99,
    description: "The Gibson Les Paul Standard electric guitar delivers the traditional Les Paul experience with modern versatility and tonal options. Features include a mahogany body with maple top, rosewood fingerboard, and Burstbucker Pro pickups.",
    image: "https://i.pinimg.com/736x/35/95/17/3595176b1117e625b7fa286da943d97d.jpg",
    specs: [
      "Mahogany body with maple top",
      "Rosewood fingerboard",
      "Burstbucker Pro pickups",
      "24.75\" scale length",
      "22 frets"
    ],
    stock: 5,
    rating: 4.8
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const relatedProducts = [
    {
      id: 2,
      name: "Fender Stratocaster",
      price: 1499.99,
      image: "https://images.unsplash.com/photo-1526857508893-05ed3f2c4755?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Ibanez RG550",
      price: 999.99,
      image: "https://i.pinimg.com/736x/2a/f3/0c/2af30cd35a934528105b91fe90c79acf.jpg"
    },
    {
      id: 4,
      name: "PRS Custom 24",
      price: 1899.99,
      image: "https://i.pinimg.com/736x/c7/23/21/c72321c7d250eb388a090a01eeeae694.jpg"
    }
  ];

  const reviews = [
    {
      id: 1,
      user: "John Doe",
      rating: 5,
      date: "2024-02-15",
      comment: "Exceptional guitar! The tone is incredible and the build quality is outstanding."
    },
    {
      id: 2,
      user: "Jane Smith",
      rating: 4,
      date: "2024-02-10",
      comment: "Great instrument, though slightly pricey. The sound quality is worth it though."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {product.name}
              </h1>

              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-5 h-5 ${index < Math.floor(product.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                        }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-gray-600 dark:text-gray-300">
                    ({product.rating})
                  </span>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {product.description}
              </p>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Specifications:</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  {product.specs.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              </div>

              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                ${product.price.toFixed(2)}
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-gray-900 dark:text-white">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    +
                  </button>
                </div>
                <span className="text-gray-600 dark:text-gray-300">
                  {product.stock} items available
                </span>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors">
                  Add to Cart
                </button>
                <Link to="/checkout" className="flex-1 bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors">
                  <button className="w-full">
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Content Below */}
      <div className="max-w-7xl mx-auto mt-12">
        {/* Tabs Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-12">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-4" aria-label="Tabs">
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${activeTab === tab
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'description' && (
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Product Description</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  The Gibson Les Paul Standard is the flagship model of the Les Paul family,
                  representing the perfect combination of innovative electronics and premium
                  appointments. Each Les Paul Standard shows off the classic carved maple
                  top and mahogany body that has been a hallmark of Les Paul models for years.
                </p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Technical Details</h3>
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {product.specs.map((spec, index) => (
                        <tr key={index}>
                          <td className="py-2 text-gray-600 dark:text-gray-300">{spec}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Customer Reviews</h3>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, index) => (
                            <svg
                              key={index}
                              className={`w-4 h-4 ${index < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                          {review.user} • {review.date}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((item) => (
              <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{item.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">${item.price.toFixed(2)}</p>
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
