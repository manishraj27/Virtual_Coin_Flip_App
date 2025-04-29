import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PrivacyProps {
  onNavigate: (path: string) => void;
}

const Privacy: React.FC<PrivacyProps> = ({ onNavigate }) => {
  return (
    <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => onNavigate('/')}
          className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </button>
        
        <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
          Privacy Policy
        </h1>
        
        <div className="prose prose-invert prose-slate max-w-none">
          <p className="text-slate-300">
            Last updated: June 2025
          </p>
          
          <h2>Our Commitment to Privacy</h2>
          <p>
            At Virtual Coin Flip, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you use our service.
          </p>
          
          <h2>Information We Don't Collect</h2>
          <p>
            Our coin flip application is designed with privacy in mind. We do not:
          </p>
          <ul>
            <li>Store your decision options</li>
            <li>Track your usage patterns</li>
            <li>Use cookies to identify you</li>
            <li>Share any data with third parties</li>
          </ul>
          
          <h2>Local Processing</h2>
          <p>
            All coin flips and decisions are processed entirely in your browser. The options you enter and the results of your coin flips never leave your device.
          </p>
          
          <h2>Cryptographically Secure Randomness</h2>
          <p>
            We use your device's built-in cryptographically secure random number generator (via the Web Crypto API) to ensure fair and unpredictable results. This process happens entirely on your device.
          </p>
          
          <h2>Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>
          
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@virtualcoinflip.com.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Privacy;