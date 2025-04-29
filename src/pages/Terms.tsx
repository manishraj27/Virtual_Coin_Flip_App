import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface TermsProps {
  onNavigate: (path: string) => void;
}

const Terms: React.FC<TermsProps> = ({ onNavigate }) => {
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
          Terms of Service
        </h1>
        
        <div className="prose prose-invert prose-slate max-w-none">
          <p className="text-slate-300">
            Last updated: June 2025
          </p>
          
          <h2>Welcome to Virtual Coin Flip</h2>
          <p>
            By accessing or using our Virtual Coin Flip service, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
          </p>
          
          <h2>Use License</h2>
          <p>
            Permission is granted to temporarily use this web application for personal, non-commercial decision-making purposes only. This is the grant of a license, not a transfer of title.
          </p>
          
          <h2>Disclaimer</h2>
          <p>
            The materials on Virtual Coin Flip's website are provided on an 'as is' basis. Virtual Coin Flip makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
          
          <h2>Limitations</h2>
          <p>
            In no event shall Virtual Coin Flip or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Virtual Coin Flip's website, even if Virtual Coin Flip or a Virtual Coin Flip authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>
          
          <h2>Important Decisions</h2>
          <p>
            While we strive to provide truly random results, we recommend not using Virtual Coin Flip for life-altering or critical decisions. The service is intended for entertainment and casual decision-making purposes only.
          </p>
          
          <h2>Modifications</h2>
          <p>
            Virtual Coin Flip may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
          </p>
          
          <h2>Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Terms;