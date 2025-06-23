
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ApartmentSelector from '../components/ApartmentSelector';
import ApartmentModal from '../components/ApartmentModal';
import BookingDrawer from '../components/BookingDrawer';
import LocationHighlights from '../components/LocationHighlights';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import { Unit } from '@/lib/supabase';

const LandingPage = () => {
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [unitToBook, setUnitToBook] = useState<Unit | null>(null);

  // Add SEO metadata
  useEffect(() => {
    document.title = 'Borak Apartmani - Brač | Luksuzni apartmani uz more';
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Rezervišite luksuzne apartmane uz more na ostrvu Brač. Četiri jedinstvena apartmana sa prekrasnim pogledom na Jadransko more.');
    }

    // Add structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      "name": "Borak Apartmani",
      "description": "Luksuzni apartmani uz more na ostrvu Brač",
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
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "Wi-Fi" },
        { "@type": "LocationFeatureSpecification", "name": "Parking" },
        { "@type": "LocationFeatureSpecification", "name": "Air Conditioning" },
        { "@type": "LocationFeatureSpecification", "name": "Kitchen" }
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
      <main className="min-h-screen bg-white">
        <HeroSection />
        
        <ApartmentSelector 
          onViewDetails={handleViewDetails}
        />
        
        <LocationHighlights />
        
        <Testimonials />

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
            onClose={handleCloseBooking}
          />
        )}
      </main>
      
      <Footer />
    </>
  );
};

export default LandingPage;
