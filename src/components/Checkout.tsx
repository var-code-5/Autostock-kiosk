import React, { useState } from 'react';
import { QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Checkout: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleVerifyNumber = () => {
    setIsVerified(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
          <span className="text-gray-400 mx-2">›</span>
          <Link to="/cart" className="text-gray-600 hover:text-blue-600">Cart</Link>
          <span className="text-gray-400 mx-2">›</span>
          <span className="text-gray-900">Checkout</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹565</span>
              </div>
              <div className="flex justify-between text-red-500">
                <span>Discount (-20%)</span>
                <span>-₹113</span>
              </div>
              <div className="pt-4 border-t flex justify-between font-bold">
                <span>Total (11 Items)</span>
                <span>₹467</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6">
            <div className="mb-8">
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="91 9876543210"
                className="w-full px-4 py-3 bg-gray-100 rounded-lg"
              />
              {!isVerified && (
                <button
                  onClick={handleVerifyNumber}
                  className="mt-2 text-blue-600 text-sm hover:text-blue-700"
                >
                  Verify number
                </button>
              )}
              {isVerified && (
                <p className="mt-2 text-green-600 text-sm">Number verified</p>
              )}
            </div>

            {isVerified && (
              <div className="text-center">
                <p className="mb-6">Please scan the QR code to pay</p>
                <div className="bg-white p-4 rounded-lg inline-block mb-6">
                  <QrCode className="w-48 h-48" />
                </div>
                <p className="text-gray-600">91 9876543210@ybl</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;