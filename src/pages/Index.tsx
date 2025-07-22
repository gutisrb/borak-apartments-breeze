
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import IntroductionSection from '../components/IntroductionSection';
import ApartmentSelector from '../components/ApartmentSelector';
import ApartmentModal from '../components/ApartmentModal';
import BookingDrawer from '../components/BookingDrawer';
import LocationHighlights from '../components/LocationHighlights';
import Testimonials from '../components/Testimonials';
import CallToActionSection from '../components/CallToActionSection';
import Footer from '../components/Footer';
import { Unit } from '@/lib/supabase';

const LandingPage = () => {
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [unitToBook, setUnitToBook] = useState<Unit | null>(null);

  // Add luxury SEO metadata
  useEffect(() => {
    document.title = 'Borak Apartments - Brač | Your Exclusive Croatian Seaside Retreat';
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Experience luxury Croatian coastal living at Borak Apartments. Exclusive seaside retreats on Brač Island where Mediterranean elegance meets modern sophistication. Book your premium vacation rental today.');
    }

    // Add structured data for luxury accommodations
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      "name": "Borak Apartments - Luxury Croatian Retreats",
      "description": "Exclusive luxury apartments on Brač Island offering premium Croatian coastal experiences",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Supetar",
        "addressLocality": "Brač",
        "postalCode": "21400",
        "addressCountry": "HR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 43.3853,
        "longitude": 16.5486
      },
      "starRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "priceRange": "€120-€180",
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "Luxury Sea Views" },
        { "@type": "LocationFeatureSpecification", "name": "Premium Wi-Fi" },
        { "@type": "LocationFeatureSpecification", "name": "Private Parking" },
        { "@type": "LocationFeatureSpecification", "name": "Gourmet Kitchen" },
        { "@type": "LocationFeatureSpecification", "name": "Air Conditioning" }
      ],
      "hasMap": "https://www.openstreetmap.org/search?query=Supetar%2C%20Brač",
      "offers": {
        "@type": "Offer",
        "priceRange": "€120-€180",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleViewDetails = (unit: Unit) => {
    setSelectedUnit(unit);
  };

  const handleCloseModal = () => {
    setSelectedUnit(null);
  };

  const handleBookNow = (unit: Unit) => {
    setUnitToBook(unit);
    setSelectedUnit(null);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setUnitToBook(null);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-luxury-off-white">
        <HeroSection />
        <IntroductionSection />
        <ApartmentSelector onViewDetails={handleViewDetails} />
        <LocationHighlights />
        <Testimonials />
        <CallToActionSection />

        {selectedUnit && (
          <ApartmentModal
            apartment={selectedUnit}
            onClose={handleCloseModal}
            onBookNow={handleBookNow}
          />
        )}

        {isBookingOpen && unitToBook && (
          <BookingDrawer
            apartment={unitToBook}
            isOpen={isBookingOpen}
            onClose={handleCloseBooking}
          />
        )}
      </main>
      
      <Footer />
    </>
  );
};

export default LandingPage;
