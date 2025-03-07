import React from 'react';
import { Heart, Instagram, Facebook } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-purple-950/80 backdrop-blur-sm pt-16 pb-8 border-t border-purple-500/20 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center mb-6 group cursor-pointer" onClick={() => handleNavigation('home')}>
              <Heart className="text-pink-500 mr-2 transition-transform duration-300 group-hover:scale-110" size={24} strokeWidth={1.5} />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text transition-all duration-300 group-hover:from-purple-300 group-hover:to-pink-400">Match Me</span>
            </div>
            <p className="text-purple-200 mb-6">
              Incontra nuove persone, crea connessioni e continua la serata ballando.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/matchme.vr/?igsh=ZTZ6NWx3anBnYnpl#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400 transition-colors duration-300 hover:scale-110 transform">
                <Instagram size={20} />
              </a>
              <a href="https://www.facebook.com/people/MATCH-ME-Verona/61572689409935/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400 transition-colors duration-300 hover:scale-110 transform">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
            <h3 className="text-white font-bold text-lg mb-6">Contatti</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="https://maps.google.com/?q=Via+San+Marco+114,+37138+Verona" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-200 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                >
                  Via San Marco 114, 37138 Verona
                </a>
              </li>
              <li>
                <a 
                  href="tel:+393481609492" 
                  className="text-purple-200 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                >
                  +39 348 160 9492
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@matchme.it" 
                  className="text-purple-200 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                >
                  info@matchme.it
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-purple-800/50 pt-8 text-center animate-fade-in" style={{ animationDelay: '500ms' }}>
          <p className="text-purple-300">
            &copy; {new Date().getFullYear()} Match Me. 
            <br />
            Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;