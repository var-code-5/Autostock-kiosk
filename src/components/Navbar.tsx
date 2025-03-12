import React, { useState } from 'react';
import { Search, ShoppingCart, Mic, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isShopOpen, setIsShopOpen] = useState(false);

  const categories = [
    { title: "Academic/Higher Education", path: "/shop/academic" },
    { title: "Children's Books", path: "/shop/children" },
    { title: "School Books", path: "/shop/school" },
    { title: "Entrance Exams", path: "/shop/entrance" },
    { title: "Defence Entrance Exams", path: "/shop/defence" },
    { title: "Exam Preparation", path: "/shop/exam-prep" },
    { title: "Engineering Entrance Exams", path: "/shop/engineering-entrance" },
    { title: "International Entrance Exams", path: "/shop/international" },
    { title: "Government Exams", path: "/shop/government" },
    { title: "Medical Entrance Exams", path: "/shop/medical" },
    { title: "Law Entrance Exams", path: "/shop/law" },
    { title: "State Government Exams (AP)", path: "/shop/state-ap" },
    { title: "State Government Exams (TS)", path: "/shop/state-ts" },
    { title: "State Level Entrance Exams", path: "/shop/state-entrance" },
    { title: "University Entrance Exams", path: "/shop/university" },
    { title: "University Books", path: "/shop/university-books" },
    { title: "Engineering", path: "/shop/engineering" },
    { title: "History", path: "/shop/history" },
    { title: "Medicine", path: "/shop/medicine" }
  ];

  return (
    <>
      <div className="bg-[#00B6DE] text-white text-sm py-2 px-4 text-center">
        Sign up and get 20% off to your first order. <a href="#" className="underline">Sign Up Now</a>
      </div>

      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-bold">TBH</Link>
            <div className="flex items-center gap-6">
              <div className="relative">
                <button 
                  className="flex items-center gap-1 text-sm hover:text-blue-600"
                  onClick={() => setIsShopOpen(!isShopOpen)}
                >
                  Shop
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {isShopOpen && (
                  <div className="absolute top-full left-0 w-64 bg-white border rounded-lg shadow-lg py-2 mt-2 max-h-[80vh] overflow-y-auto">
                    {categories.map((category) => (
                      <Link
                        key={category.path}
                        to={category.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsShopOpen(false)}
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link to="/on-sale" className="text-sm hover:text-blue-600">On Sale</Link>
              <Link to="/new-arrivals" className="text-sm hover:text-blue-600">New Arrivals</Link>
              <Link to="/publishers" className="text-sm hover:text-blue-600">Publishers</Link>
            </div>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full bg-gray-100 rounded-lg pl-10 pr-4 py-2 text-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Mic className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <Link 
              to="/cart" 
              className="relative"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-[#00B6DE] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;