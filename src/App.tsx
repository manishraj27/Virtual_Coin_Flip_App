import React from 'react';
import CoinFlipper from './components/CoinFlipper';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <CoinFlipper />
      </main>
      <Footer />
    </div>
  );
}

export default App;