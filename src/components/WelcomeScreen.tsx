import React from 'react';
import { Languages } from 'lucide-react';

interface WelcomeScreenProps {
  onLanguageSelect: (language: 'en' | 'hi' | 'te') => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onLanguageSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full text-center">
        <Languages className="w-16 h-16 mx-auto mb-6 text-blue-600" />
        
        <h1 className="text-4xl font-bold mb-2">Welcome • स्वागत है • స్వాగతం</h1>
        <p className="text-gray-600 mb-8">Please select your preferred language • कृपया अपनी पसंदीदा भाषा चुनें • దయచేసి మీ ప్రాధాన్య భాషను ఎంచుకోండి</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => onLanguageSelect('en')}
            className="p-6 text-xl font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            English
          </button>
          <button
            onClick={() => onLanguageSelect('hi')}
            className="p-6 text-xl font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            हिंदी
          </button>
          <button
            onClick={() => onLanguageSelect('te')}
            className="p-6 text-xl font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            తెలుగు
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;