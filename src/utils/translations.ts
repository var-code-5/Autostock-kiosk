import { createContext, useContext } from 'react';

export const translations = {
  en: {
    welcome: "Welcome",
    browse: "Browse, Scan, Enjoy!",
    findBooks: "Find books across a curated collection of books and discover your next favorite read at a great price.",
    search: "Search for books...",
    getStarted: "Get Started",
    publishers: "Publishers",
    books: "Books",
    customers: "Happy Customers",
    newArrivals: "New arrivals",
    viewAll: "View all",
    topSellers: "Top sellers",
    popularCategories: "Popular categories",
    newsletter: "STAY UP TO DATE ABOUT OUR LATEST OFFERS",
    subscribe: "Subscribe",
    enterEmail: "Enter your email"
  },
  hi: {
    welcome: "स्वागत है",
    browse: "ब्राउज़ करें, स्कैन करें, आनंद लें!",
    findBooks: "किताबों के क्यूरेटेड संग्रह में से किताबें खोजें और बेहतरीन कीमत पर अपनी अगली पसंदीदा किताब खोजें।",
    search: "किताबें खोजें...",
    getStarted: "शुरू करें",
    publishers: "प्रकाशक",
    books: "किताबें",
    customers: "खुश ग्राहक",
    newArrivals: "नई आवक",
    viewAll: "सभी देखें",
    topSellers: "टॉप सेलर्स",
    popularCategories: "लोकप्रिय श्रेणियां",
    newsletter: "हमारी नवीनतम ऑफ़र के बारे में अपडेट रहें",
    subscribe: "सदस्यता लें",
    enterEmail: "अपना ईमेल दर्ज करें"
  },
  te: {
    welcome: "స్వాగతం",
    browse: "బ్రౌజ్ చేయండి, స్కాన్ చేయండి, ఆనందించండి!",
    findBooks: "క్యూరేటెడ్ పుస్తకాల సేకరణలో పుస్తకాలను కనుగొనండి మరియు మంచి ధరకు మీ తదుపరి ఇష్టమైన పుస్తకాన్ని కనుగొనండి.",
    search: "పుస్తకాలను శోధించండి...",
    getStarted: "ప్రారంభించండి",
    publishers: "ప్రచురణకర్తలు",
    books: "పుస్తకాలు",
    customers: "సంతోషకరమైన వినియోగదారులు",
    newArrivals: "కొత్త రాకలు",
    viewAll: "అన్నీ చూడండి",
    topSellers: "టాప్ సెల్లర్స్",
    popularCategories: "ప్రజాదరణ పొందిన వర్గాలు",
    newsletter: "మా తాజా ఆఫర్ల గురించి అప్‌డేట్‌గా ఉండండి",
    subscribe: "సబ్‌స్క్రైబ్ చేయండి",
    enterEmail: "మీ ఇమెయిల్‌ను నమోదు చేయండి"
  }
};

export const LanguageContext = createContext<{
  language: 'en' | 'hi' | 'te';
  setLanguage: (lang: 'en' | 'hi' | 'te') => void;
}>({
  language: 'en',
  setLanguage: () => {},
});