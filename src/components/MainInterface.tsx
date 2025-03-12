import React from 'react';
import { Search, Mic, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookGrid from './BookGrid';
import Navbar from './Navbar';
import Footer from './Footer';
import { LanguageContext, translations } from '../utils/translations';

interface MainInterfaceProps {
  language: 'en' | 'hi' | 'te';
  textSize: 'normal' | 'large' | 'xlarge';
  onTextSizeChange: (size: 'normal' | 'large' | 'xlarge') => void;
}

const MainInterface: React.FC<MainInterfaceProps> = ({ language, textSize, onTextSizeChange }) => {
  const t = translations[language];

  const stats = [
    { value: "10,000+", label: t.books },
    { value: "30,000+", label: t.customers },
    { value: "200+", label: t.publishers },
  ];

  const featuredPublishers = [
    { name: "Oxford University Press", logo: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=300&q=80" },
    { name: "Pearson Education", logo: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=300&q=80" },
    { name: "McGraw Hill", logo: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=300&q=80" },
    { name: "Wiley", logo: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=300&q=80" },
    { name: "Cambridge University Press", logo: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=300&q=80" },
    { name: "Springer", logo: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=300&q=80" }
  ];

  const categories = [
    { name: "Academic/Higher Education", count: 2500, image: "https://images.unsplash.com/photo-1588580000645-4562a6d2c839?auto=format&fit=crop&w=300&q=80" },
    { name: "Engineering Entrance", count: 1200, image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80" },
    { name: "Medical Entrance", count: 800, image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=300&q=80" },
    { name: "Government Exams", count: 1500, image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=300&q=80" },
    { name: "School Books", count: 3000, image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=300&q=80" },
    { name: "Children's Books", count: 2000, image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=300&q=80" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero section */}
        <div className="flex items-center justify-between mb-16">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold mb-4">{t.browse}</h1>
            <p className="text-gray-600 mb-8">{t.findBooks}</p>
            
            <div className="relative mb-8">
              <input
                type="text"
                placeholder={t.search}
                className="w-full bg-gray-100 rounded-lg pl-10 pr-12 py-3 text-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Mic className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              {t.getStarted}
            </button>
          </div>

          <div className="w-96">
            <img 
              src="https://images.unsplash.com/photo-1588580000645-4562a6d2c839?auto=format&fit=crop&w=800&q=80" 
              alt="Get 1 Book Free" 
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Stats section */}
        <div className="bg-gray-50 rounded-2xl p-12 mb-16">
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`text-left ${
                  index === 1 ? 'border-l border-r border-gray-200 px-8' : ''
                }`}
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Browse by Publishers */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Browse by Publishers</h2>
            <Link to="/publishers" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
              View All Publishers <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {featuredPublishers.map((publisher, index) => (
              <Link 
                key={index}
                to={`/publisher/${publisher.name.toLowerCase().replace(/ /g, '-')}`}
                className="bg-white border rounded-xl p-4 hover:shadow-lg transition-shadow group"
              >
                <div className="aspect-square rounded-lg bg-gray-50 flex items-center justify-center mb-3">
                  <img 
                    src={publisher.logo} 
                    alt={publisher.name}
                    className="w-16 h-16 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <p className="text-sm text-center text-gray-700 group-hover:text-blue-600 transition-colors">
                  {publisher.name}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* New Arrivals */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{t.newArrivals}</h2>
            <Link to="/new-arrivals" className="text-blue-600 hover:underline">
              {t.viewAll}
            </Link>
          </div>
          <BookGrid language={language} />
        </div>

        {/* Top Sellers */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{t.topSellers}</h2>
            <Link to="/top-sellers" className="text-blue-600 hover:underline">
              {t.viewAll}
            </Link>
          </div>
          <BookGrid language={language} />
        </div>

        {/* Browse by Categories */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Browse by Categories</h2>
            <Link to="/categories" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
              View All Categories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link 
                key={index}
                to={`/category/${category.name.toLowerCase().replace(/ /g, '-')}`}
                className="group relative overflow-hidden rounded-xl aspect-[4/3]"
              >
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex flex-col justify-end p-6">
                  <h3 className="text-white font-semibold text-lg mb-1">{category.name}</h3>
                  <p className="text-white/80 text-sm">{category.count.toLocaleString()} Books</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 bg-gray-100 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">{t.newsletter}</h2>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder={t.enterEmail}
              className="flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-200"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              {t.subscribe}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainInterface;