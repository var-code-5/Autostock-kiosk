import React from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import BookGrid from './BookGrid';

const OnSale: React.FC = () => {
  const discountRanges = ['10% - 20%', '21% - 30%', '31% - 40%', '41% - 50%', '50% +'];
  const categories = ['Academic', 'Engineering', 'Medical', 'School Books', 'Children Books'];
  const sortOptions = ['Popularity', 'Price: Low to High', 'Price: High to Low', 'Discount'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">On Sale</h1>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <div className="relative">
              <select className="appearance-none bg-white px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                {sortOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <ArrowUpDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" /> Discount Range
              </h3>
              {discountRanges.map((range) => (
                <label key={range} className="flex items-center gap-2 mb-2">
                  <input type="checkbox" className="rounded text-blue-600" />
                  <span className="text-sm">{range}</span>
                </label>
              ))}
            </div>

            <div>
              <h3 className="font-semibold mb-3">Categories</h3>
              {categories.map((category) => (
                <label key={category} className="flex items-center gap-2 mb-2">
                  <input type="checkbox" className="rounded text-blue-600" />
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
                />
                <span className="text-gray-400">-</span>
                <input 
                  type="number" 
                  placeholder="Max"
                  className="w-20 px-2 py-1 border rounded"
                />
              </div>
            </div>
          </div>

          <div className="col-span-3">
            <BookGrid language="en" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OnSale;