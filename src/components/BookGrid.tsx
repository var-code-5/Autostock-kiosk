import React from 'react';
import { Star, IndianRupee, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BookGridProps {
  language: 'en' | 'hi';
}

const BookGrid: React.FC<BookGridProps> = ({ language }) => {
  const books = [
    {
      id: 1,
      title: language === 'en' ? 'GMAT Exam Guide' : 'जीमैट परीक्षा गाइड',
      author: 'Arihant Experts',
      price: 240,
      originalPrice: 260,
      discount: '25%',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1588580000645-4562a6d2c839?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 2,
      title: language === 'en' ? 'Banking Awareness' : 'बैंकिंग जागरूकता',
      author: 'Adda247',
      price: 130,
      originalPrice: 160,
      discount: '30%',
      rating: 4.2,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 3,
      title: language === 'en' ? 'SBI Clerical Guide' : 'एसबीआई क्लर्क गाइड',
      author: 'Disha Experts',
      price: 130,
      originalPrice: 160,
      discount: '30%',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 4,
      title: language === 'en' ? 'Digital SAT Guide' : 'डिजिटल सैट गाइड',
      author: 'Career Launcher',
      price: 130,
      originalPrice: 160,
      discount: '30%',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=300&q=80'
    },
  ];

  return (
    <div className="relative">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <Link 
            to={`/book/${book.id}`} 
            key={book.id} 
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full aspect-[3/4] object-cover rounded-lg mb-4"
            />
            <h3 className="font-semibold text-sm mb-1 line-clamp-2">{book.title}</h3>
            <p className="text-gray-600 text-xs mb-2">{book.author}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <IndianRupee className="w-3 h-3 text-gray-600" />
                <span className="font-bold text-sm">{book.price}</span>
                <span className="text-gray-500 text-xs line-through">₹{book.originalPrice}</span>
              </div>
              <div className="flex items-center">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="ml-1 text-xs">{book.rating}</span>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                -{book.discount}
              </span>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Carousel Navigation */}
      <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50">
        <ChevronLeft className="w-6 h-6 text-gray-600" />
      </button>
      <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50">
        <ChevronRight className="w-6 h-6 text-gray-600" />
      </button>
    </div>
  );
};

export default BookGrid;