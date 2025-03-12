import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, MapPin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">TBH Books</h3>
            <p className="text-sm mb-4">India's leading academic book store, serving students and educators since 1995.</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" />
                123 Education Street, Hyderabad
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4" />
                1800-123-4567
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4" />
                support@tbhbooks.com
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/shipping" className="hover:text-white">Shipping Policy</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/academic" className="hover:text-white">Academic Books</Link></li>
              <li><Link to="/entrance" className="hover:text-white">Entrance Exams</Link></li>
              <li><Link to="/school" className="hover:text-white">School Books</Link></li>
              <li><Link to="/engineering" className="hover:text-white">Engineering</Link></li>
              <li><Link to="/medical" className="hover:text-white">Medical</Link></li>
              <li><Link to="/children" className="hover:text-white">Children's Books</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Stay Updated</h3>
            <p className="text-sm mb-4">Subscribe to our newsletter for updates and exclusive offers.</p>
            <div className="flex gap-2 mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-gray-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                Subscribe
              </button>
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-sm text-center">
          <p>© 2024 TBH Books. All rights reserved.</p>
          <p className="mt-2">
            Made with 💙 by <a href="https://nishantsura.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Nishant Sura</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;