import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import bookService, { Book } from "../services/bookServices";
import { Link } from "react-router-dom";

interface SearchProps {
  t: {
    search: string;
  };
}

const SearchBar: React.FC<SearchProps> = ({ t }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Debounce search function
  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (query.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setShowResults(true); // Ensure the dropdown is shown immediately

    searchTimeout.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await bookService.searchBooks(query, {
          offset: 0,
          limit: 5,
        });
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error searching books:", error);
      } finally {
        setIsSearching(false);
      }
    }, 300);
  };

  // Clear search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      {/* Search Input Container */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder={t.search}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full bg-gray-100 rounded-lg pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
          onFocus={() => setShowResults(true)}
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute left-0 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center text-gray-500">Searching...</div>
          ) : searchResults.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No results found</div>
          ) : (
            searchResults.map((book) => (
              <Link
                to={`/book/${book.isbn}`}
                key={book.isbn}
                className="flex items-center p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                onClick={() => setShowResults(false)}
              >
                <div className="flex-1">
                  <p className="text-sm font-medium line-clamp-1">
                    {book.book_name}
                  </p>
                  <p className="text-xs text-gray-500">{book.author}</p>
                </div>
                {book.image && (
                  <img
                    src={book.image}
                    alt={book.book_name}
                    className="w-12 h-16 object-cover rounded ml-3"
                  />
                )}
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
