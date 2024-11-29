import { useState } from 'react';
import { IoWalletOutline, IoCashOutline, IoCardOutline, IoLocationOutline } from 'react-icons/io5';
import { MdLocalOffer } from 'react-icons/md';
import { showToast } from '../utils/toast';

const Checkout = () => {
  const [selectedPayment, setSelectedPayment] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [showAddressModal, setShowAddressModal] = useState(false);
  
  // Mock data - replace with your actual data
  const orderSummary = {
    itemsTotal: 2098.00,
    deliveryCharge: 42.00,
    discount: 0,
  };

  const addresses = [
    {
      id: 1,
      name: 'John Doe',
      address: '123 Main St, Apartment 4B',
      city: 'Mumbai',
      pincode: '400001',
      phone: '9876543210',
      isDefault: true,
    }
  ];

  const handleChangeAddress = () => {
    setShowAddressModal(true);
  };

  const handleApplyCoupon = () => {
    showToast('Coupon applied successfully', 'success');
  };

  return (
    <div className="min-h-screen bg-main py-8 px-4 sm:px-6 lg:px-8 dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 dark:text-white">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <IoLocationOutline className="text-blue-500" />
                  Delivery Address
                </h2>
                <button 
                  onClick={handleChangeAddress}
                  className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                >
                  Change
                </button>
              </div>
              
              {addresses.map(addr => (
                <div key={addr.id} className="border rounded-lg p-4">
                  <p className="font-medium">{addr.name}</p>
                  <p className="text-gray-600">{addr.address}</p>
                  <p className="text-gray-600">{addr.city} - {addr.pincode}</p>
                  <p className="text-gray-600">Phone: {addr.phone}</p>
                </div>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              
              <div className="space-y-4">
                {/* COD Option */}
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setSelectedPayment(selectedPayment === 'cod' ? '' : 'cod')}
                    className={`w-full p-4 flex items-center gap-3 transition-all
                      ${selectedPayment === 'cod' ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                  >
                    <IoCashOutline className="text-xl" />
                    <span>Cash on Delivery</span>
                  </button>
                </div>

                {/* UPI Option */}
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setSelectedPayment(selectedPayment === 'upi' ? '' : 'upi')}
                    className={`w-full p-4 flex items-center gap-3 transition-all
                      ${selectedPayment === 'upi' ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                  >
                    <IoWalletOutline className="text-xl" />
                    <span>UPI</span>
                  </button>
                  {selectedPayment === 'upi' && (
                    <div className="p-4 border-t">
                      <form className="space-y-4">
                        <input
                          type="text"
                          placeholder="Enter UPI ID"
                          className="w-full p-3 border rounded-lg"
                        />
                        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                          Verify & Pay
                        </button>
                      </form>
                    </div>
                  )}
                </div>

                {/* Card Option */}
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setSelectedPayment(selectedPayment === 'card' ? '' : 'card')}
                    className={`w-full p-4 flex items-center gap-3 transition-all
                      ${selectedPayment === 'card' ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                  >
                    <IoCardOutline className="text-xl" />
                    <span>Credit / Debit Card</span>
                  </button>
                  
                  {selectedPayment === 'card' && (
                    <div className="p-4 border-t">
                      <form className="space-y-4">
                        <input
                          type="text"
                          placeholder="Card Number"
                          className="w-full p-3 border rounded-lg"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full p-3 border rounded-lg"
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            className="w-full p-3 border rounded-lg"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Name on Card"
                          className="w-full p-3 border rounded-lg"
                        />
                        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                          Pay Securely
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Offers Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <MdLocalOffer className="text-blue-500" />
                Apply Coupon
              </h2>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1 p-3 border rounded-lg"
                />
                <button onClick={handleApplyCoupon} className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-20">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items Total</span>
                  <span>₹{orderSummary.itemsTotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Charges</span>
                  <span>₹{orderSummary.deliveryCharge.toFixed(2)}</span>
                </div>

                {orderSummary.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{orderSummary.discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Order Total</span>
                    <span>₹{(orderSummary.itemsTotal + orderSummary.deliveryCharge - orderSummary.discount).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 bg-blue-500 text-white py-4 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Address Change Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-4">Change Delivery Address</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Address Line 1"
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Address Line 2"
                className="w-full p-3 border rounded-lg"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  className="w-full p-3 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-3 border rounded-lg"
              />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
