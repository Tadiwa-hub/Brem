const HowToBook = () => {
  const steps = [
    {
      number: "01",
      title: "Choose Stay Type",
      description: "Select between our Day Rest or Night Stay options depending on your needs."
    },
    {
      number: "02",
      title: "Pick Your Date",
      description: "Check our live availability calendar below and select your preferred date."
    },
    {
      number: "03",
      title: "Send WhatsApp",
      description: "Submit the form and we'll open a WhatsApp chat with your booking details."
    }
  ];

  return (
    <section className="py-20 bg-primary text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How To Book</h2>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              <div className="text-6xl font-bold text-white/10 absolute -top-10 left-1/2 -translate-x-1/2 select-none">
                {step.number}
              </div>
              <h3 className="text-2xl font-bold mb-4 relative z-10">{step.title}</h3>
              <p className="text-gray-300 relative z-10 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToBook;
