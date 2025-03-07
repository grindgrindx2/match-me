import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuTransitioning, setMenuTransitioning] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if scrolled past threshold
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Determine scroll direction to show/hide navbar
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setVisible(false);
      } else {
        // Scrolling up or at the top
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (mobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  const toggleMobileMenu = () => {
    setMenuTransitioning(true);
    
    if (mobileMenuOpen) {
      // When closing, animate the menu first, then update the state
      document.querySelector('.mobile-menu')?.classList.add('animate-slide-out');
      setTimeout(() => {
        setMobileMenuOpen(false);
        setMenuTransitioning(false);
        document.querySelector('.mobile-menu')?.classList.remove('animate-slide-out');
      }, 300);
    } else {
      setMobileMenuOpen(true);
      setTimeout(() => {
        setMenuTransitioning(false);
      }, 300);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'booking', label: 'Prenotazione' },
    { id: 'contact', label: 'Contatti' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-purple-950/90 backdrop-blur-md shadow-lg border-b border-purple-500/20' : 'bg-purple-950/70 backdrop-blur-sm'
    } ${
      visible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => handleNavigation('home')}
          >
            <Heart className="text-pink-500 mr-2 transition-transform duration-300 group-hover:scale-110" size={28} strokeWidth={1.5} />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text transition-all duration-300 group-hover:from-purple-300 group-hover:to-pink-400">Match Me</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`text-lg font-medium transition-all duration-300 relative ${
                  currentPage === item.id 
                    ? 'text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text' 
                    : 'text-white hover:text-purple-300'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-300 ${
                  currentPage === item.id ? 'w-full' : 'group-hover:w-full'
                }`}></span>
              </button>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none w-7 h-7 relative"
              aria-label="Toggle menu"
            >
              <div className="absolute w-full h-full">
                {/* Top line */}
                <span className={`absolute h-0.5 w-full bg-white transform transition-all duration-300 ease-in-out ${
                  mobileMenuOpen ? 'rotate-45 translate-y-2.5' : 'translate-y-0'
                }`}></span>
                
                {/* Middle line */}
                <span className={`absolute h-0.5 w-full bg-white transform transition-all duration-300 ease-in-out translate-y-2.5 ${
                  mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                
                {/* Bottom line */}
                <span className={`absolute h-0.5 w-full bg-white transform transition-all duration-300 ease-in-out ${
                  mobileMenuOpen ? '-rotate-45 translate-y-2.5' : 'translate-y-5'
                }`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`mobile-menu md:hidden bg-purple-950/95 backdrop-blur-md border-t border-purple-800/30 absolute w-full transition-all duration-300 ease-in-out ${
          mobileMenuOpen || menuTransitioning
            ? 'max-h-[300px] opacity-100 py-4 border-opacity-100 animate-slide-in' 
            : 'max-h-0 opacity-0 py-0 border-opacity-0 overflow-hidden'
        }`}
      >
        <div className="container mx-auto px-6 flex flex-col space-y-4">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`text-lg font-medium py-2 transition-all duration-300 ${
                currentPage === item.id 
                  ? 'text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text translate-x-2' 
                  : 'text-white hover:text-purple-300 hover:translate-x-2'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;