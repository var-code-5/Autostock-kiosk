import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import MainInterface from './components/MainInterface';
import BookDetails from './components/BookDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import PaymentConfirmation from './components/PaymentConfirmation';
import OnSale from './components/OnSale';
import NewArrivals from './components/NewArrivals';
import Publishers from './components/Publishers';
import { LanguageContext } from './utils/translations';
import LoginPage from './components/LoginPage';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'hi' | 'te' | null>(null);
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  if (!selectedLanguage) {
    return <WelcomeScreen onLanguageSelect={setSelectedLanguage} />;
  }

  return (
    <LanguageContext.Provider value={{ language: selectedLanguage, setLanguage: setSelectedLanguage }}>
      <Router>
        <div className={`min-h-screen bg-gray-50 ${
          textSize === 'large' ? 'text-lg' : textSize === 'xlarge' ? 'text-xl' : 'text-base'
        }`}>
          <Routes>
            <Route 
              path="/" 
              element={
                <MainInterface 
                  language={selectedLanguage}
                  textSize={textSize}
                  onTextSizeChange={setTextSize}
                />
              } 
            />
            <Route path='/login' element={<LoginPage/>} />
            <Route path="/on-sale" element={<OnSale />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/publishers" element={<Publishers />} />
            <Route 
              path="/book/:id" 
              element={<BookDetails language={selectedLanguage} />} 
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
          </Routes>
        </div>
      </Router>
    </LanguageContext.Provider>
  );
}

export default App;