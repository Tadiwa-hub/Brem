import { Phone, MapPin, Globe, Share2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12 mb-12">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold font-heading text-accent mb-6">Brem Magnified Homes</h2>
          <p className="text-gray-400 mb-6 leading-relaxed">
            Experience premium comfort and tranquility in our boutique accommodation. 
            Your perfect rest is our priority.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="p-2 bg-white/5 hover:bg-accent rounded-full transition-all">
              <Globe size={20} />
            </a>
            <a href="#" className="p-2 bg-white/5 hover:bg-accent rounded-full transition-all">
              <Share2 size={20} />
            </a>
          </div>
        </div>

        {/* Rates */}
        <div>
          <h3 className="text-xl font-bold mb-6 font-heading border-b border-white/10 pb-2">Our Rates</h3>
          <ul className="space-y-4">
            <li className="flex justify-between items-center">
              <span>Day Rest (4 hours)</span>
              <span className="text-accent font-bold">$25</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Night Stay (10am - 10am)</span>
              <span className="text-accent font-bold">$50</span>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-bold mb-6 font-heading border-b border-white/10 pb-2">Contact Us</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <MapPin className="text-accent mr-3 flex-shrink-0" size={20} />
              <span className="text-gray-400">Borrowdale, Harare, Zimbabwe</span>
            </li>
            <li className="flex items-center">
              <Phone className="text-accent mr-3 flex-shrink-0" size={20} />
              <span className="text-gray-400">+263 78 249 0456</span>
            </li>
          </ul>
          <a 
            href="https://wa.me/263782490456" 
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center bg-[#25D366] text-white px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Brem Magnified Homes. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Site by <span className="text-accent">Tadiwa</span></p>
      </div>
    </footer>
  );
};

export default Footer;
