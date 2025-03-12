import React, { useState } from 'react';
import { Star, Minus, Plus, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

interface BookDetailsProps {
  language: 'en' | 'hi' | 'te';
}

const BookDetails: React.FC<BookDetailsProps> = ({ language }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedFormat, setSelectedFormat] = useState('Hardcover');
  const [selectedLanguage, setSelectedLanguage] = useState('Hindi');

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Men', href: '/shop/men' },
    { label: 'T-shirts', href: '/shop/men/tshirts' },
  ];

  const relatedBooks = [
    {
      id: 1,
      title: "SBI Clerical Cadre",
      price: 130,
      originalPrice: 160,
      rating: 4.5,
      discount: "30%",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 2,
      title: "Banking Awareness",
      price: 130,
      originalPrice: 160,
      rating: 4.5,
      discount: "30%",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 3,
      title: "GMAT Focus Edition",
      price: 130,
      originalPrice: 160,
      rating: 4.5,
      discount: "30%",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 4,
      title: "SBI Clerical Cadre Pro & Main Exams",
      price: 130,
      originalPrice: 160,
      rating: 4.5,
      discount: "30%",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80"
    }
  ];

  const similarBooks = [
    {
      id: 1,
      title: "This promise of change",
      price: 130,
      originalPrice: 160,
      rating: 4.5,
      discount: "30%",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 2,
      title: "This promise of change",
      price: 130,
      originalPrice: 160,
      rating: 4.5,
      discount: "30%",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 3,
      title: "This promise of change",
      price: 130,
      originalPrice: 160,
      rating: 4.5,
      discount: "30%",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 4,
      title: "This promise of change",
      price: 130,
      originalPrice: 160,
      rating: 4.5,
      discount: "30%",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <nav className="flex items-center space-x-2 text-sm mb-8">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.href}>
              <Link to={crumb.href} className="text-gray-600 hover:text-blue-600">
                {crumb.label}
              </Link>
              {index < breadcrumbs.length - 1 && (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
            </React.Fragment>
          ))}
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="flex gap-4 mb-4">
              <img 
                src="https://images.unsplash.com/photo-1588580000645-4562a6d2c839?auto=format&fit=crop&w=300&q=80" 
                alt="Career Launcher"
                className="w-16 h-16 object-contain"
              />
              <img 
                src="https://images.unsplash.com/photo-1588580000645-4562a6d2c839?auto=format&fit=crop&w=300&q=80" 
                alt="GKP"
                className="w-16 h-16 object-contain"
              />
            </div>
            <img
              src="https://images.unsplash.com/photo-1588580000645-4562a6d2c839?auto=format&fit=crop&w=800&q=80"
              alt="GMAT Focus Edition 2023"
              className="w-full rounded-lg"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">GMAT Focus Edition 2023</h1>

            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">4.5/5</span>
            </div>

            <p className="text-gray-600 mb-6">
              Some would call River Rydell a chosen one: born with the ability to see monsters 
              and travel to a terrifying spirit world called The Otherwoods. They have all the 
              makings of a hero...
            </p>

            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold">₹240</span>
              <span className="ml-3 text-lg text-gray-500 line-through">₹260</span>
              <span className="ml-3 text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
                -25%
              </span>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-3">Choose copy</h3>
              <div className="flex gap-4">
                {['Hardcover', 'Paperback', 'Ebook'].map((format) => (
                  <button
                    key={format}
                    onClick={() => setSelectedFormat(format)}
                    className={`px-6 py-2 rounded-full border ${
                      selectedFormat === format
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 text-gray-600 hover:border-blue-600'
                    }`}
                  >
                    {format}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-semibold mb-3">Available in</h3>
              <div className="flex gap-4">
                {['Hindi', 'English', 'Telugu'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-6 py-2 rounded-full border ${
                      selectedLanguage === lang
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 text-gray-600 hover:border-blue-600'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100 rounded-l-full"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100 rounded-r-full"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <button className="flex-1 bg-blue-600 text-white py-3 px-8 rounded-full hover:bg-blue-700 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Best paired with section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Best paired with</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-lg p-4">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full aspect-[3/4] object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold text-sm mb-2">{book.title}</h3>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="ml-1 text-xs">{book.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold">₹{book.price}</span>
                    <span className="ml-2 text-sm text-gray-500 line-through">₹{book.originalPrice}</span>
                  </div>
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                    -{book.discount}
                  </span>
                </div>
                <button className="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* You might also like section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {similarBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-lg p-4">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full aspect-[3/4] object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold text-sm mb-2">{book.title}</h3>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="ml-1 text-xs">{book.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold">₹{book.price}</span>
                    <span className="ml-2 text-sm text-gray-500 line-through">₹{book.originalPrice}</span>
                  </div>
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                    -{book.discount}
                  </span>
                </div>
                <button className="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookDetails;