
import { useState } from 'react';
import HeroSection from '../components/HeroSection';
import ApartmentSelector from '../components/ApartmentSelector';
import ApartmentModal from '../components/ApartmentModal';
import BookingDrawer from '../components/BookingDrawer';
import LocationHighlights from '../components/LocationHighlights';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

interface Apartment {
  id: string;
  title: string;
  maxGuests: number;
  sizeM2: number;
  pricePerNight: number;
  images: string[];
  description: string;
  amenities: string[];
}

const apartments: Apartment[] = [
  {
    id: 'apt-01',
    title: 'Apartment 01—Balcony Sea View',
    maxGuests: 4,
    sizeM2: 65,
    pricePerNight: 120,
    images: [
      '/lovable-uploads/7339c339-ce6a-41a7-b2c0-68c73a549560.png',
      '/lovable-uploads/784c3d02-1359-4ce9-9e21-9ce69495bff7.png',
      '/lovable-uploads/0f60e0c0-e5c1-4e88-98f7-d09dea6e8864.png',
      '/lovable-uploads/ef22bf17-253a-4915-ae4f-f55e52d38c1b.png'
    ],
    description: 'Modern apartment with stunning sea views, fully equipped kitchen, and private balcony overlooking the Adriatic.',
    amenities: ['Sea View', 'Kitchen', 'WiFi', 'AC', 'Balcony', 'Parking']
  },
  {
    id: 'apt-02',
    title: 'Apartment 02—Garden Terrace',
    maxGuests: 6,
    sizeM2: 80,
    pricePerNight: 140,
    images: [
      '/lovable-uploads/e2e41bd7-d4d7-464e-9b5a-fb958417521a.png',
      '/lovable-uploads/339a8eee-df9f-42b5-b779-383e6517ad33.png',
      '/lovable-uploads/a412065e-92e3-4725-b7a6-e1b9fe814b20.png'
    ],
    description: 'Spacious apartment with private garden terrace, perfect for families. Modern amenities with traditional charm.',
    amenities: ['Garden View', 'Terrace', 'Kitchen', 'WiFi', 'AC', 'Parking']
  },
  {
    id: 'apt-03',
    title: 'Apartment 03—Premium Suite',
    maxGuests: 4,
    sizeM2: 75,
    pricePerNight: 160,
    images: [
      '/lovable-uploads/2e5e5b90-bd2c-40f0-a4a3-9f27a291f27a.png',
      '/lovable-uploads/0ed2d36a-7632-4869-ac20-e95064f4a508.png',
      '/lovable-uploads/bf0e5e79-170a-4134-8bd6-c4b40d0b7277.png'
    ],
    description: 'Luxury suite with panoramic sea views, premium furnishings, and exclusive beach access.',
    amenities: ['Panoramic View', 'Beach Access', 'Premium Kitchen', 'WiFi', 'AC', 'Parking']
  },
  {
    id: 'apt-04',
    title: 'Apartment 04—Family Retreat',
    maxGuests: 8,
    sizeM2: 95,
    pricePerNight: 180,
    images: [
      '/lovable-uploads/7339c339-ce6a-41a7-b2c0-68c73a549560.png',
      '/lovable-uploads/e2e41bd7-d4d7-464e-9b5a-fb958417521a.png',
      '/lovable-uploads/2e5e5b90-bd2c-40f0-a4a3-9f27a291f27a.png'
    ],
    description: 'Large family apartment with multiple bedrooms, spacious living areas, and stunning coastal views.',
    amenities: ['Multiple Bedrooms', 'Large Terrace', 'Full Kitchen', 'WiFi', 'AC', 'Parking']
  }
];

const LandingPage = () => {
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [apartmentToBook, setApartmentToBook] = useState<Apartment | null>(null);

  const handleViewDetails = (apartment: Apartment) => {
    setSelectedApartment(apartment);
  };

  const handleCloseModal = () => {
    setSelectedApartment(null);
  };

  const handleBookNow = (apartment: Apartment) => {
    setApartmentToBook(apartment);
    setSelectedApartment(null);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setApartmentToBook(null);
  };

  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      
      <ApartmentSelector 
        apartments={apartments}
        onViewDetails={handleViewDetails}
      />
      
      <LocationHighlights />
      
      <Testimonials />
      
      <Footer />

      {selectedApartment && (
        <ApartmentModal
          apartment={selectedApartment}
          onClose={handleCloseModal}
          onBookNow={handleBookNow}
        />
      )}

      {isBookingOpen && apartmentToBook && (
        <BookingDrawer
          apartment={apartmentToBook}
          onClose={handleCloseBooking}
        />
      )}
    </main>
  );
};

export default LandingPage;
