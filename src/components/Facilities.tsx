import { Wifi, Zap, Car, Coffee, ShieldCheck, Tv } from 'lucide-react';

const Facilities = () => {
  const facilities = [
    { icon: <Zap className="w-8 h-8" />, name: "Hot Water" },
    { icon: <Wifi className="w-8 h-8" />, name: "Free WiFi" },
    { icon: <Car className="w-8 h-8" />, name: "Secure Parking" },
    { icon: <Coffee className="w-8 h-8" />, name: "Kitchen Access" },
    { icon: <ShieldCheck className="w-8 h-8" />, name: "24/7 Security" },
    { icon: <Tv className="w-8 h-8" />, name: "Smart TV" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Our Facilities</h2>
          <p className="text-gray-600 max-w-2xl mx-auto italic">Everything you need for a comfortable and relaxing stay.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {facilities.map((facility, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center p-6 bg-surface rounded-lg transition-all duration-300 hover:bg-primary hover:text-white group"
            >
              <div className="text-accent group-hover:text-gold mb-4 transition-colors">
                {facility.icon}
              </div>
              <span className="font-semibold text-sm text-center">{facility.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;
