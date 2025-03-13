import React, { useState, useEffect } from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, Star, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import bookService, { Book } from '../services/bookServices';

const Browse: React.FC = () => {
  // State for books data
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false);
  
  // Pagination state
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 10,
    total: 0
  });
  
  // Filter states
  const [discountFilters, setDiscountFilters] = useState<string[]>([]);
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({ min: '', max: '' });
  const [sortOption, setSortOption] = useState<string>('Popularity');
  
  // Filter options
  const discountRanges = ['10% - 20%', '21% - 30%', '31% - 40%', '41% - 50%', '50% +'];
  const categories = ['Academic', 'Engineering', 'Medical', 'School Books', 'Children Books'];
  const sortOptions = ['Popularity', 'Price: Low to High', 'Price: High to Low', 'Discount'];
  
  // Mobile filter visibility
  const [showFilters, setShowFilters] = useState(false);
  
  // Fetch books with current filters and pagination
  const fetchBooks = async () => {
    setLoading(true);
    try {
      if (isSearchMode && searchQuery.trim()) {
        // Use search endpoint
        const response = await bookService.searchBooks(searchQuery, {
          offset: pagination.offset,
          limit: pagination.limit
        });
        setBooks(response.data);
        setPagination({
          ...pagination,
          total: response.pagination.total
        });
      } else {
        // Use browse endpoint with filters
        // Parse filter values
        const discountParams: Record<string, number[]> = {};
        if (discountFilters.length > 0) {
          discountFilters.forEach(range => {
            const [min, max] = range.replace('%', '').replace('+', '').split('-').map(n => parseInt(n.trim()));
            if (max) {
              discountParams.min_discount = [...(discountParams.min_discount || []), min];
              discountParams.max_discount = [...(discountParams.max_discount || []), max];
            } else {
              // For 50%+ case
              discountParams.min_discount = [...(discountParams.min_discount || []), min];
            }
          });
        }
        
        // Build API params
        const params: any = {
          type: 'on_sale',
          offset: pagination.offset,
          limit: pagination.limit,
        };
        
        // Add category filter
        if (categoryFilters.length > 0) {
          params.category = categoryFilters.join(',');
        }
        
        // Add price range
        if (priceRange.min) params.min_price = parseFloat(priceRange.min);
        if (priceRange.max) params.max_price = parseFloat(priceRange.max);
        
        // Add discount filters
        if (discountParams.min_discount) params.min_discount = Math.min(...discountParams.min_discount);
        if (discountParams.max_discount) params.max_discount = Math.max(...discountParams.max_discount);
        
        // Sort parameter
        if (sortOption === 'Price: Low to High') params.sort = 'price_asc';
        if (sortOption === 'Price: High to Low') params.sort = 'price_desc';
        if (sortOption === 'Discount') params.sort = 'discount_desc';
        if (sortOption === 'Popularity') params.sort = 'popularity';

        const response = await bookService.browseBooks(params);
        setBooks(response.data);
        setPagination({
          ...pagination,
          total: response.pagination.total
        });
      }
    } catch (err) {
      setError('Failed to fetch books. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchMode(true);
      setPagination(prev => ({
        ...prev,
        offset: 0
      }));
      fetchBooks();
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setIsSearchMode(false);
    setPagination(prev => ({
      ...prev,
      offset: 0
    }));
  };

  // Handle filter changes
  const handleDiscountFilterChange = (range: string) => {
    setDiscountFilters(prev => 
      prev.includes(range) 
        ? prev.filter(r => r !== range) 
        : [...prev, range]
    );
  };

  const handleCategoryFilterChange = (category: string) => {
    setCategoryFilters(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const handlePriceRangeChange = (type: 'min' | 'max', value: string) => {
    setPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };
  
  // Pagination handlers
  const goToNextPage = () => {
    if (pagination.offset + pagination.limit < pagination.total) {
      setPagination(prev => ({
        ...prev,
        offset: prev.offset + prev.limit
      }));
    }
  };
  
  const goToPrevPage = () => {
    if (pagination.offset - pagination.limit >= 0) {
      setPagination(prev => ({
        ...prev,
        offset: prev.offset - prev.limit
      }));
    }
  };

  // Apply filters on mount and when filters change
  useEffect(() => {
    fetchBooks();
  }, [pagination.offset, pagination.limit, sortOption, isSearchMode]);
  
  // Reset pagination offset when filters change
  const applyFilters = () => {
    setPagination(prev => ({
      ...prev,
      offset: 0
    }));
    fetchBooks();
  };
  
  // Format currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };
  
  // Calculate discount percentage
  const calculateDiscount = (actualPrice: number, discountedPrice: number) => {
    return Math.round(((actualPrice - discountedPrice) / actualPrice) * 100);
  };
  
  // Render star ratings
  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="w-4 h-4 text-gray-300" />
            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    
    return (
      <div className="flex items-center">
        <div className="flex mr-1">{stars}</div>
        <span className="text-sm text-gray-600">({rating.toFixed(1)})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <input
              type="text"
              placeholder="Search for books, authors, publishers..."
              className="w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <button 
              type="submit" 
              className="ml-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
            {isSearchMode && (
              <button 
                type="button"
                onClick={clearSearch}
                className="ml-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Clear
              </button>
            )}
          </form>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            {isSearchMode ? `Search Results: "${searchQuery}"` : 'On Sale'}
          </h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <div className="relative">
              <select 
                className="appearance-none bg-white px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sortOption}
                onChange={handleSortChange}
              >
                {sortOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <ArrowUpDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters sidebar - desktop */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block space-y-6`}>
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" /> Discount Range
              </h3>
              {discountRanges.map((range) => (
                <label key={range} className="flex items-center gap-2 mb-2">
                  <input 
                    type="checkbox" 
                    className="rounded text-blue-600"
                    checked={discountFilters.includes(range)}
                    onChange={() => handleDiscountFilterChange(range)}
                  />
                  <span className="text-sm">{range}</span>
                </label>
              ))}
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Categories</h3>
              {categories.map((category) => (
                <label key={category} className="flex items-center gap-2 mb-2">
                  <input 
                    type="checkbox" 
                    className="rounded text-blue-600"
                    checked={categoryFilters.includes(category)}
                    onChange={() => handleCategoryFilterChange(category)}
                  />
                  <span className="text-sm">{category}</span>
                </label>
              ))}
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Price Range</h3>
              <div className="flex gap-4">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-20 px-2 py-1 border rounded"
                  value={priceRange.min}
                  onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                />
                <span className="text-gray-400">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-20 px-2 py-1 border rounded"
                  value={priceRange.max}
                  onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                />
              </div>
            </div>
            
            <button 
              onClick={applyFilters}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
          
          {/* Book listings */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
            ) : books.length === 0 ? (
              <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg">
                No books found matching your criteria. Try adjusting your filters or search terms.
              </div>
            ) : (
              <>
                <div className="space-y-6">
                  {books.map((book) => (
                    <div key={book.isbn} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="flex flex-col md:flex-row">
                        {/* Book image */}
                        <div className="md:w-48 h-64 p-4 flex items-center justify-center bg-gray-100">
                          <img 
                            src={book.image || "/api/placeholder/200/300"} 
                            alt={book.book_name}
                            className="max-h-full object-cover"
                          />
                        </div>
                        
                        {/* Book details */}
                        <div className="flex-1 p-6">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div>
                              <h2 className="text-xl font-bold mb-2">{book.book_name}</h2>
                              <p className="text-gray-600 mb-2">by {book.author}</p>
                              <p className="text-gray-600 mb-2">Publisher: {book.publisher_name}</p>
                              <div className="mb-3">{renderRating(book.rating)}</div>
                              
                              <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                                {book.description}
                              </p>
                            </div>
                            
                            <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-start">
                              <div className="mb-2">
                                <span className="text-2xl font-bold text-red-600">{formatPrice(book.discounted_price)}</span>
                                {book.actual_price > book.discounted_price && (
                                  <span className="ml-2 text-gray-500 line-through">{formatPrice(book.actual_price)}</span>
                                )}
                              </div>
                              
                              {book.actual_price > book.discounted_price && (
                                <div className="bg-red-100 text-red-700 px-2 py-1 rounded-md text-sm font-medium mb-3">
                                  Save {calculateDiscount(book.actual_price, book.discounted_price)}%
                                </div>
                              )}
                              
                              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors">
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pagination */}
                <div className="mt-8 flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Showing {pagination.offset + 1}-{Math.min(pagination.offset + pagination.limit, pagination.total)} of {pagination.total} books
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={goToPrevPage}
                      disabled={pagination.offset === 0}
                      className={`p-2 rounded-md ${pagination.offset === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200'}`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    <span className="text-sm text-gray-700">
                      Page {Math.floor(pagination.offset / pagination.limit) + 1} of {Math.ceil(pagination.total / pagination.limit)}
                    </span>
                    
                    <button 
                      onClick={goToNextPage}
                      disabled={pagination.offset + pagination.limit >= pagination.total}
                      className={`p-2 rounded-md ${pagination.offset + pagination.limit >= pagination.total ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200'}`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Browse;