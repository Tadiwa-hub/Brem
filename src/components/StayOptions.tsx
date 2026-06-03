const StayOptions = () => {
  const options = [
    {
      title: "DAY REST",
      price: "$25",
      subtitle: "per visit",
      image: "/images/WhatsApp Image 2026-06-03 at 08.58.04.jpeg",
      features: [
        "4 Hours of comfort",
        "Check in anytime",
        "Perfect for a quick rest",
        "All facilities included"
      ],
      buttonText: "Book Day Rest",
      highlight: false
    },
    {
      title: "NIGHT STAY",
      price: "$50",
      subtitle: "per night",
      image: "/images/WhatsApp Image 2026-06-03 at 08.58.03.jpeg",
      features: [
        "Check in from 10:00 AM",
        "Check out 10:00 AM next day",
        "Full overnight comfort",
        "All facilities included"
      ],
      buttonText: "Book Night Stay",
      highlight: true
    }
  ];

  return (
    <section id="rooms" className="py-20 bg-surface">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Choose Your Stay</h2>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {options.map((option, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-2xl shadow-xl border-t-4 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden relative group ${option.highlight ? 'border-accent scale-100 lg:scale-105 z-10' : 'border-primary'}`}
            >
              <div className="h-56 md:h-64 overflow-hidden relative">
                <img 
                  src={option.image} 
                  alt={option.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="p-6 md:p-8">
                {option.highlight && (
                  <div className="bg-accent text-white text-[10px] md:text-xs font-bold px-4 py-1.5 rounded-full absolute top-[210px] md:top-[240px] left-1/2 -translate-x-1/2 uppercase z-20 shadow-lg tracking-widest">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-primary text-center mb-2">{option.title}</h3>
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-accent">{option.price}</span>
                  <span className="text-gray-500 ml-2">{option.subtitle}</span>
                </div>
                
                <ul className="space-y-4 mb-10">
                  {option.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center text-gray-700">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a 
                  href="#availability" 
                  className={`block text-center py-3 rounded-sm font-bold transition-all ${option.highlight ? 'bg-accent text-white hover:bg-opacity-90' : 'bg-primary text-white hover:bg-opacity-90'}`}
                >
                  {option.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StayOptions;
