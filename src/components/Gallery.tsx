const Gallery = () => {
  const images = [
    { url: "/images/WhatsApp Image 2026-06-03 at 08.58.00.jpeg", height: "h-64" },
    { url: "/images/WhatsApp Image 2026-06-03 at 08.58.03 (1).jpeg", height: "h-80" },
    { url: "/images/WhatsApp Image 2026-06-03 at 08.58.03 (2).jpeg", height: "h-64" },
    { url: "/images/WhatsApp Image 2026-06-03 at 08.58.04 (1).jpeg", height: "h-96" },
    { url: "/images/WhatsApp Image 2026-06-03 at 08.58.04 (2).jpeg", height: "h-64" },
    { url: "/images/WhatsApp Image 2026-06-03 at 08.58.05.jpeg", height: "h-80" }
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Our Property</h2>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className={`relative overflow-hidden group rounded-lg shadow-lg ${image.height} break-inside-avoid`}
            >
              <img 
                src={image.url} 
                alt={`Property Image ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              {/* Gold shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
