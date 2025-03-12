import React, { useState } from 'react';
import { Search, MapPin, BookOpen, Users } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const Publishers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const publishers = [
    {
      id: 1,
      name: "Oxford University Press",
      logo: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=300&q=80",
      location: "New Delhi, India",
      established: 1912,
      books: 5000,
      authors: 2500
    },
    {
      id: 2,
      name: "Pearson Education",
      logo: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=300&q=80",
      location: "Mumbai, India",
      established: 1925,
      books: 4200,
      authors: 1800
    },
    // Add more publishers
  ];

  const filteredPublishers = publishers.filter(publisher =>
    publisher.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Publishers</h1>
          <p className="text-gray-600">Discover books from leading publishers across India</p>
        </div>

        <div className="relative max-w-xl mb-8">
          <input
            type="text"
            placeholder="Search publishers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white rounded-lg pl-10 pr-4 py-3 border focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPublishers.map((publisher) => (
            <div key={publisher.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={publisher.logo}
                  alt={publisher.name}
                  className="w-16 h-16 object-contain rounded-lg bg-gray-50"
                />
                <div>
                  <h3 className="font-semibold text-lg">{publisher.name}</h3>
                  <p className="text-gray-600 text-sm flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {publisher.location}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-600 text-sm mb-1">Established</p>
                  <p className="font-semibold">{publisher.established}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-600 text-sm mb-1 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    Books
                  </p>
                  <p className="font-semibold">{publisher.books}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-600 text-sm mb-1 flex items-center justify-center">
                    <Users className="w-4 h-4 mr-1" />
                    Authors
                  </p>
                  <p className="font-semibold">{publisher.authors}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Publishers;