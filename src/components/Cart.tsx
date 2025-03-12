import React from 'react';
import { Minus, Plus, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

interface CartItem {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
  format: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([
    {
      id: 1,
      title: "Piecing me together",
      image: "https://images.unsplash.com/photo-1588580000645-4562a6d2c839?auto=format&fit=crop&w=300&q=80",
      price: 260,
      quantity: 6,
      format: "Paperback"
    },
    {
      id: 2,
      title: "The otherwoods",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80",
      price: 260,
      quantity: 2,
      format: "Paperback"
    }
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal * 0.2;
  const total = subtotal - discount;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
          <span className="text-gray-400 mx-2">›</span>
          <span className="text-gray-900">Cart</span>
        </nav>

        <h1 className="text-3xl font-bold mb-8">Your cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map(item => (
              <div key={item.id} className="bg-white rounded-lg p-6 flex gap-6">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">Copy: {item.format}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">₹{item.price}</span>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg p-6 h-fit">
            <h2 className="font-bold text-xl mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-red-500">
                <span>Discount (-20%)</span>
                <span>-₹{discount}</span>
              </div>
              <div className="pt-4 border-t flex justify-between font-bold">
                <span>Total ({cartItems.length} Items)</span>
                <span>₹{total}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              Go to Checkout
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;