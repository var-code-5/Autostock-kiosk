import React, { useState, useEffect } from 'react';
import { Star, IndianRupee, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import bookService, { Book } from '../services/bookServices';

interface BookGridProps {
  language: 'en' | 'hi' | 'te';
  type: 'new_arrivals' | 'top_sellers';
}

const BookGrid: React.FC<BookGridProps> = ({ language, type }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  
  const itemsPerPage = 4; // Number of books visible at once
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        let response;
        
        if (type === 'new_arrivals') {
          response = await bookService.getNewArrivals({ offset: 0, limit: 10 });
        } else {
          response = await bookService.getTopSellers({ offset: 0, limit: 10 });
        }
        
        setBooks(response.data);
        setTotalBooks(response.pagination.total);
        setLoading(false);
      } catch (err) {
        setError('Error loading books');
        setLoading(false);
        console.error('Error fetching books:', err);
      }
    };
    
    fetchBooks();
  }, [type]);
  
  // Handle next/previous slide
  const handleNext = () => {
    if (currentIndex + itemsPerPage < books.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    } else {
      setCurrentIndex(0); // Loop back to the beginning
    }
  };
  
  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    } else {
      setCurrentIndex(Math.max(0, books.length - itemsPerPage)); // Go to the end
    }
  };
  
  const getTranslatedTitle = (bookName: string) => {
    // Handle translations based on language prop
    if (language === 'en') return bookName;
    
    // This is a simple example - in a real app you'd use a more sophisticated translation system
    const translations: Record<string, Record<string, string>> = {
      'GMAT Exam Guide': { 'hi': 'जीमैट परीक्षा गाइड', 'te': 'జీమాట్ పరీక్ష గైడ్' },
      'Banking Awareness': { 'hi': 'बैंकिंग जागरूकता', 'te': 'బ్యాంకింగ్ అవగాహన' },
      // Add more translations as needed
    };
    
    return (translations[bookName]?.[language]) || bookName;
  };
  
  if (loading) return <div className="flex justify-center p-8">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (books.length === 0) return <div className="p-4">No books available</div>;
  
  // Get current visible books
  const visibleBooks = books.slice(currentIndex, currentIndex + itemsPerPage);
  
  return (
    <div className="relative py-4">
      <div className="overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {visibleBooks.map((book) => (
            <Link
              to={`/book/${book.isbn}`}
              key={book.isbn}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4"
            >
              <img
                src={book.image}
                alt={getTranslatedTitle(book.book_name)}
                className="w-full aspect-[3/4] object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                {getTranslatedTitle(book.book_name)}
              </h3>
              <p className="text-gray-600 text-xs mb-2">{book.author}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <IndianRupee className="w-3 h-3 text-gray-600" />
                  <span className="font-bold text-sm">{book.discounted_price}</span>
                  <span className="text-gray-500 text-xs line-through">₹{book.actual_price}</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="ml-1 text-xs">{book.rating}</span>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                  -{book.discount_percentage}%
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Carousel Navigation */}
      <button 
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
        aria-label="Previous"
        disabled={books.length <= itemsPerPage}
      >
        <ChevronLeft className="w-6 h-6 text-gray-600" />
      </button>
      <button 
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
        aria-label="Next"
        disabled={books.length <= itemsPerPage}
      >
        <ChevronRight className="w-6 h-6 text-gray-600" />
      </button>
      
      {/* Pagination Indicators */}
      {books.length > itemsPerPage && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: Math.ceil(books.length / itemsPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * itemsPerPage)}
              className={`h-2 w-2 rounded-full ${
                index === Math.floor(currentIndex / itemsPerPage) 
                  ? 'bg-blue-600' 
                  : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookGrid;