import React, { useState } from 'react';
import { Calendar, ArrowUpDown } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import BookGrid from './BookGrid';

const NewArrivals: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'this-week' | 'this-month'>('this-week');
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">New Arrivals</h1>
            <p className="text-gray-600">Discover our latest collection of books</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex rounded-lg border overflow-hidden">
              <button
                className={`px-4 py-2 ${
                  activeTab === 'this-week' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('this-week')}
              >
                This Week
              </button>
              <button
                className={`px-4 py-2 ${
                  activeTab === 'this-month' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('this-month')}
              >
                This Month
              </button>
            </div>
            
            <select className="appearance-none bg-white px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Sort by Release Date</option>
              <option>Sort by Price</option>
              <option>Sort by Publisher</option>
            </select>
          </div>
        </div>

        <BookGrid language="en" />
      </main>
      <Footer />
    </div>
  );
};

export default NewArrivals;