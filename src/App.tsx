import React, { useState } from 'react';
import CoinFlipper from './components/CoinFlipper';
import Header from './components/Header';
import Footer from './components/Footer';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import RandomnessExplained from './pages/RandomnessExplained';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Simple routing function
  const handleNavigation = (path: string) => {
    if (path.startsWith('/')) {
      setCurrentPage(path.substring(1));
    } else {
      window.open(path, '_blank');
    }
  };

  // Render the appropriate page based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case 'privacy':
        return <Privacy onNavigate={handleNavigation} />;
      case 'terms':
        return <Terms onNavigate={handleNavigation} />;
      case 'randomness':
        return <RandomnessExplained onNavigate={handleNavigation} />;
      default:
        return (
          <main className="flex-grow flex items-center justify-center p-4">
            <CoinFlipper onExplainRandomness={() => handleNavigation('/randomness')} />
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col">
      <Header onNavigate={handleNavigation} />
      {renderPage()}
      <Footer onNavigate={handleNavigation} />
    </div>
  );
}

export default App;