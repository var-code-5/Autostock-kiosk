import React, { useState } from 'react';
import { Check, Download, Share2, QrCode, Receipt } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const PaymentConfirmation: React.FC = () => {
  const [billSource, setBillSource] = useState<'whatsapp' | 'kiosk' | null>(null);

  const orderDetails = {
    orderId: 'TBH123456789',
    date: new Date().toLocaleDateString(),
    total: 467,
    items: [
      { name: 'GMAT Focus Edition 2023', quantity: 1, price: 240 },
      { name: 'Banking Awareness', quantity: 2, price: 130 }
    ]
  };

  const handleBillUpload = (source: 'whatsapp' | 'kiosk') => {
    setBillSource(source);
    // In a real app, this would handle file upload or WhatsApp integration
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h1>
            <p className="text-gray-600">Your order has been confirmed</p>
          </div>

          <div className="border-t border-b py-4 mb-6">
            <h2 className="font-semibold mb-4">Order Details</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID</span>
                <span>{orderDetails.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span>{orderDetails.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount</span>
                <span>₹{orderDetails.total}</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="font-semibold mb-4">Items Purchased</h2>
            <div className="space-y-4">
              {orderDetails.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <span>₹{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button 
              onClick={() => handleBillUpload('whatsapp')}
              className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              <Receipt className="w-5 h-5" />
              Upload WhatsApp Bill
            </button>
            <button 
              onClick={() => handleBillUpload('kiosk')}
              className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              <QrCode className="w-5 h-5" />
              Scan Kiosk Bill
            </button>
          </div>

          {billSource && (
            <div className="text-center text-green-600 mb-6">
              Bill from {billSource === 'whatsapp' ? 'WhatsApp' : 'Kiosk'} processed successfully!
            </div>
          )}

          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
              <Download className="w-5 h-5" />
              Download Invoice
            </button>
            <button className="flex items-center justify-center gap-2 px-6 py-3 border rounded-lg hover:bg-gray-50">
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>
        </div>

        <div className="text-center">
          <Link to="/" className="text-blue-600 hover:underline">
            Continue Shopping
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentConfirmation;