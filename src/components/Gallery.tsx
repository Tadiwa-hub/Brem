const Gallery = () => {
  const images = [
    { url: "/images/WhatsApp Image 2026-06-03 at 08.58.00.jpeg", height: "h-64 md:h-80" },
    { url: "/images/WhatsApp Image 2026-06-03 at 08.58.03 (1).jpeg", height: "h-80 md:h-96" },
    { url: "/images/WhatsApp Image 2026-06-03 at 08.58.03 (2).jpeg", height: "h-64 md:h-72" },
    { url: "/images/WhatsApp Image 2026-06-03 at 08.58.03.jpeg", height: "h-96 md:h-[450px]" },
    { url: "/images/WhatsApp Image 2026-06-03 at 08.58.04 (1).jpeg", height: "h-64 md:h-80" },
    { url: "/images/WhatsApp Image 2026-06-03 at 08.58.04 (2).jpeg", height: "h-80 md:h-96" },
    { url: "/images/WhatsApp Image 2026-06-03 at 08.58.04.jpeg", height: "h-64 md:h-72" },
    { url: "/images/WhatsApp Image 2026-06-03 at 08.58.05 (1).jpeg", height: "h-96 md:h-80" },
    { url: "/images/WhatsApp Image 2026-06-03 at 08.58.05 (2).jpeg", height: "h-64 md:h-80" },
    { url: "/images/WhatsApp Image 2026-06-03 at 08.58.05 (3).jpeg", height: "h-80 md:h-96" },
    { url: "/images/WhatsApp Image 2026-06-03 at 08.58.05.jpeg", height: "h-64 md:h-72" },
    { url: "/images/WhatsApp Image 2026-06-03 at 08.58.06.jpeg", height: "h-96 md:h-80" }
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 italic">The Brem Experience</h2>
          <p className="text-accent font-heading text-xl mb-4">A Glimpse into Your Next Stay</p>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className={`relative overflow-hidden group rounded-xl shadow-lg ${image.height} break-inside-avoid transition-all duration-500 hover:shadow-2xl`}
            >
              <img 
                src={image.url} 
                alt={`Property View ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none flex items-center justify-center">
                <span className="text-white font-heading text-lg border border-white/30 px-4 py-2 backdrop-blur-sm">View Details</span>
              </div>
              {/* Gold shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
