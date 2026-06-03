import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StayOptions from '../components/StayOptions';
import Facilities from '../components/Facilities';
import HowToBook from '../components/HowToBook';
import AvailabilityCalendar from '../components/AvailabilityCalendar';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <StayOptions />
        <Facilities />
        <HowToBook />
        <AvailabilityCalendar />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
