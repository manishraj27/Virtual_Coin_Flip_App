import React, { useState, useEffect } from 'react';
import CoinFlipper from './components/CoinFlipper';
import Header from './components/Header';
import Footer from './components/Footer';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import RandomnessExplained from './pages/RandomnessExplained';
import { Helmet } from 'react-helmet-async';
import NotFound from './pages/NotFound';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Update the page title based on the current page
  useEffect(() => {
    const titles = {
      home: 'Virtual Coin Flip - Free Online Decision Maker Tool',
      privacy: 'Privacy Policy - Virtual Coin Flip',
      terms: 'Terms of Service - Virtual Coin Flip',
      randomness: 'How Random Is Our Coin Flip? - Virtual Coin Flip'
    };
    
    document.title = titles[currentPage as keyof typeof titles] || titles.home;
  }, [currentPage]);

  // Simple routing function
  const handleNavigation = (path: string) => {
    if (path.startsWith('/')) {
      setCurrentPage(path.substring(1) || 'home');
      window.history.pushState({}, '', path);
    } else {
      window.open(path, '_blank');
    }
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setCurrentPage(path.substring(1) || 'home');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Initialize the current page based on URL on first load
  useEffect(() => {
    const path = window.location.pathname;
    setCurrentPage(path.substring(1) || 'home');
  }, []);

  // Render the appropriate page based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case 'privacy':
        return <Privacy onNavigate={handleNavigation} />;
      case 'terms':
        return <Terms onNavigate={handleNavigation} />;
      case 'randomness':
        return <RandomnessExplained onNavigate={handleNavigation} />;
      case 'home':
        return (
          <main className="flex-grow flex items-center justify-center p-4">
            <CoinFlipper onExplainRandomness={() => handleNavigation('/randomness')} />
          </main>
        );
      default:
        return <NotFound onNavigate={handleNavigation} />;
    }
  };

  // Generate structured data for the current page
  const getStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Virtual Coin Flip",
      "url": "https://virtualcoinflip.vercel.app/",
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "A free online tool for making decisions with a virtual coin flip. Features realistic 3D animation and cryptographically secure randomness."
    };

    if (currentPage === 'home') {
      return JSON.stringify(baseData);
    }
    
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col">
      <Helmet>
        {getStructuredData() && (
          <script type="application/ld+json">
            {getStructuredData()}
          </script>
        )}
      </Helmet>
      <Header onNavigate={handleNavigation} />
      {renderPage()}
      <Footer onNavigate={handleNavigation} />
    </div>
  );
}

export default App;