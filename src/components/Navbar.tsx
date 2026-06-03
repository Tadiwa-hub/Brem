import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        <div className="text-accent font-heading text-2xl md:text-3xl font-bold">
          Brem Magnified Homes
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className={`font-medium transition-colors ${isScrolled ? 'text-primary' : 'text-white'} hover:text-accent`}>Home</a>
          <a href="#rooms" className={`font-medium transition-colors ${isScrolled ? 'text-primary' : 'text-white'} hover:text-accent`}>Rooms</a>
          <a href="#availability" className="bg-accent text-white px-6 py-2 rounded-sm font-semibold hover:bg-opacity-90 transition-all">Book Now</a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? (
            <X className={isScrolled ? 'text-primary' : 'text-white'} />
          ) : (
            <Menu className={isScrolled ? 'text-primary' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-xl py-6 flex flex-col items-center space-y-4">
          <a href="#" className="text-primary font-medium text-lg" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
          <a href="#rooms" className="text-primary font-medium text-lg" onClick={() => setIsMobileMenuOpen(false)}>Rooms</a>
          <a href="#availability" className="bg-accent text-white px-8 py-3 rounded-sm font-semibold" onClick={() => setIsMobileMenuOpen(false)}>Book Now</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
