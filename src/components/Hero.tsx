const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image Placeholder */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-110"
        style={{ 
          backgroundImage: 'url("/images/WhatsApp Image 2026-06-03 at 08.58.00.jpeg")',
        }}
      />
      
      {/* Dark Navy Overlay */}
      <div className="absolute inset-0 bg-primary/60" />

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-white text-5xl md:text-7xl font-bold mb-4 tracking-wider animate-fade-in">
          BREM MAGNIFIED HOMES
        </h1>
        <p className="text-accent text-xl md:text-2xl font-heading mb-8 italic animate-slide-up">
          Your Perfect Rest Awaits
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <a 
            href="#availability" 
            className="w-full md:w-auto bg-accent text-white px-10 py-4 rounded-sm font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg"
          >
            Book Your Stay
          </a>
          <a 
            href="#rooms" 
            className="w-full md:w-auto border-2 border-white text-white px-10 py-4 rounded-sm font-bold text-lg hover:bg-white hover:text-primary transition-all"
          >
            View Rooms
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
