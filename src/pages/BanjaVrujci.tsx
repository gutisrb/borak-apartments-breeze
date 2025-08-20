import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ApartmentModal from '../components/ApartmentModal';
import BookingDrawer from '../components/BookingDrawer';
import CallToActionSection from '../components/CallToActionSection';
import Footer from '../components/Footer';
import { Unit } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, Square, MapPin, Phone, Wifi, Car, ChefHat, Calendar, MessageCircle } from 'lucide-react';
const BanjaVrujci = () => {
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [unitToBook, setUnitToBook] = useState<Unit | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<number | null>(null);
  const heroImages = ['/lovable-uploads/nature-park.jpeg', '/lovable-uploads/hero-brac-1.jpeg', '/lovable-uploads/hero-brac-2.jpg'];
  const galleryImages = [{
    src: '/lovable-uploads/apartman1 (1).jpg',
    alt: 'Apartman enterijer',
    caption: 'Udobne dnevne sobe'
  }, {
    src: '/lovable-uploads/apartman1 (2).jpg',
    alt: 'Spavaća soba',
    caption: 'Komforne spavaće sobe'
  }, {
    src: '/lovable-uploads/apartman2 (1).jpg',
    alt: 'Kuhinja',
    caption: 'Potpuno opremljena kuhinja'
  }, {
    src: '/lovable-uploads/apartman2 (2).jpg',
    alt: 'Kupatilo',
    caption: 'Moderna kupatila'
  }, {
    src: '/lovable-uploads/nature-park.jpeg',
    alt: 'Priroda oko Banje Vrujci',
    caption: 'Prekrasna priroda oko kompleksa'
  }, {
    src: '/lovable-uploads/local-restaurant.jpg',
    alt: 'Lokalna hrana',
    caption: 'Lokalne specijalitete'
  }];

  // Fetch units data
  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await fetch('/data/units-vrujci.json');
        const data = await response.json();
        setUnits(data.units);
      } catch (error) {
        console.error('Error fetching units:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUnits();
  }, []);

  // Auto-advance hero carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // SEO metadata
  useEffect(() => {
    document.title = 'Apartmani Banja Vrujci - Odmor u prirodi';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Apartmani u Banji Vrujci za odmor u prirodi. Termalni izvori, svež vazduh i tišina. Rezervišite Vaš boravak u prirodnom okruženju.');
    }
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
  const scrollToApartments = () => {
    const apartmentsSection = document.getElementById('apartments');
    if (apartmentsSection) {
      apartmentsSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <>
      <Header location="vrujci" />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section id="hero" className="relative h-screen w-full overflow-hidden">
          <div className="absolute inset-0">
            {heroImages.map((image, index) => <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}>
                <img src={image} alt={`Banja Vrujci priroda ${index + 1}`} className="h-full w-full object-cover" loading={index === 0 ? 'eager' : 'lazy'} />
              </div>)}
          </div>

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--nature-accent))]/80 to-transparent" />

          {/* Hero Content */}
          <div className="relative z-10 flex h-full items-center justify-center">
            <div className="text-center text-white px-6 max-w-5xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl animate-fade-in mb-8 tracking-wide font-playfair font-bold text-white drop-shadow-2xl">
                Apartmani — Banja Vrujci
              </h1>
              <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl mb-12 font-app font-light max-w-4xl mx-auto leading-relaxed text-white/90 drop-shadow-md">
                Odmor u prirodi — termalne vode, tišina i svež vazduh
              </h2>
              <div className="space-y-4 md:space-y-0 md:space-x-6 md:flex md:justify-center">
                <Button onClick={scrollToApartments} size="lg" className="bg-[hsl(var(--nature-primary))] text-white hover:bg-[hsl(var(--nature-accent))] transition font-app text-base md:text-lg px-12 py-5">
                  Pogledajte apartmane
                </Button>
              </div>
            </div>
          </div>

          {/* Carousel Navigation Indicators */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex space-x-3">
              {heroImages.map((_, index) => <button key={index} onClick={() => setCurrentImage(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImage ? 'bg-white shadow-lg scale-110' : 'bg-white/40 hover:bg-white/60'}`} />)}
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="section-padding bg-[hsl(var(--nature-muted))]">
          <div className="container-luxury text-center">
            <h2 className="mb-8 animate-fade-in text-[hsl(var(--nature-muted-foreground))] font-playfair text-3xl md:text-4xl font-bold">
              Dobrodošli u Banju Vrujci
            </h2>
            <p className="text-lg md:text-xl text-[hsl(var(--nature-muted-foreground))] max-w-4xl mx-auto font-app leading-relaxed animate-fade-in">
              Uživajte u miru prirode, lековitim termalnim vodama i svежem vazduhu. Naši apartmani pružaju savršen odmor za sve koji traže bekstvo od gradske vreve.
            </p>
          </div>
        </section>

        {/* Location Snapshot */}
        <section className="py-12 bg-[hsl(var(--nature-blue))]">
          <div className="container-luxury">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
              <div className="flex items-center gap-3 text-center md:text-left">
                <MapPin className="w-6 h-6 text-[hsl(var(--nature-blue-foreground))]" />
                <div>
                  <div className="font-semibold text-[hsl(var(--nature-blue-foreground))]">120km od Beograda</div>
                  <div className="text-sm text-[hsl(var(--nature-blue-foreground))]">1.5h vožnje</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-center md:text-left">
                <Calendar className="w-6 h-6 text-[hsl(var(--nature-blue-foreground))]" />
                <div>
                  <div className="font-semibold text-[hsl(var(--nature-blue-foreground))]">Cela godina</div>
                  <div className="text-sm text-[hsl(var(--nature-blue-foreground))]">Najbolje: proleće-jesen</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-center md:text-left">
                <div className="w-6 h-6 bg-[hsl(var(--nature-accent))] rounded-full flex items-center justify-center text-white text-xs font-bold">T</div>
                <div>
                  <div className="font-semibold text-[hsl(var(--nature-blue-foreground))]">Termalni izvori</div>
                  <div className="text-sm text-[hsl(var(--nature-blue-foreground))]">5min hoda</div>
                </div>
              </div>

              <div className="bg-[hsl(var(--nature-primary))] rounded-lg p-4 shadow-md">
                <div className="w-full h-20 bg-white rounded flex items-center justify-center text-[hsl(var(--nature-accent))] text-sm font-semibold">
                  Mapa lokacije
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Apartment Selector - Same as Borak but with Vrujci data */}
        <section id="apartments" className="section-padding bg-[hsl(var(--nature-primary))]">
          <div className="container-luxury">
            <div className="text-center mb-20">
              <h2 className="mb-6 animate-fade-in text-[hsl(var(--nature-primary-foreground))] font-playfair text-3xl md:text-4xl font-bold">
                Naši apartmani
              </h2>
              <p className="text-lg md:text-xl text-[hsl(var(--nature-primary-foreground))] max-w-3xl mx-auto font-app leading-relaxed animate-fade-in">
                Udobni apartmani u srcu prirode, potpuno opremljeni za savršen odmor
              </p>
            </div>

            {loading ? <div className="text-center">
                <p className="text-[hsl(var(--nature-primary-foreground))] font-app">Učitavanje apartmana...</p>
              </div> : <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
                {units.map((unit, index) => <Card key={unit.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white border-[hsl(var(--nature-muted))] animate-fade-in" style={{
              animationDelay: `${index * 0.2}s`
            }}>
                    <div className="relative overflow-hidden">
                      <img src={unit.images?.[0] || '/placeholder.svg'} alt={`${unit.name} - Apartman u Banji Vrujci`} className="w-full h-72 md:h-80 object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                      <div className="absolute top-6 right-6 bg-[hsl(var(--nature-accent))] text-white px-4 py-2 rounded-full font-app font-medium shadow-lg">
                        €{unit.price_per_night}/noć
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <h3 className="font-playfair text-[hsl(var(--nature-accent))] mb-4 text-xl md:text-2xl">
                        {unit.name}
                      </h3>
                      
                      <div className="flex items-center justify-between mb-6 text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Users className="h-5 w-5 text-[hsl(var(--nature-accent))]" />
                          <span className="font-app">Do {unit.max_guests} osoba</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Square className="h-5 w-5 text-[hsl(var(--nature-accent))]" />
                          <span className="font-app">{unit.size_m2}m²</span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-6 font-app leading-relaxed">
                        {unit.description}
                      </p>
                      
                      <Button 
                        onClick={() => window.location.href = `/en/banja-vrujci/apartments/${unit.name.toLowerCase().replace(/\s+/g, '-').replace(/—/g, '').replace(/[^\w-]/g, '')}`} 
                        className="w-full bg-[hsl(var(--nature-accent))] text-white hover:bg-[hsl(var(--nature-primary))] hover:text-[hsl(var(--nature-primary-foreground))] transition font-app font-semibold"
                      >
                        Pogledaj detalje
                      </Button>
                    </div>
                  </Card>)}
              </div>}
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="py-16 bg-[hsl(var(--nature-primary))]">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--nature-primary-foreground))] mb-4 font-playfair">
                Galerija
              </h2>
              <p className="text-lg text-[hsl(var(--nature-primary-foreground))]">Pogledajte naše apartmane i okolinu</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => <div key={index} className="relative group cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => setSelectedGalleryImage(index)}>
                  <img src={image.src} alt={image.alt} className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end">
                    <div className="text-white p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-sm font-medium">{image.caption}</p>
                    </div>
                  </div>
                </div>)}
            </div>

            {/* Lightbox */}
            {selectedGalleryImage !== null && <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedGalleryImage(null)}>
                <div className="relative max-w-4xl max-h-full">
                  <button className="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300" onClick={() => setSelectedGalleryImage(null)}>
                    ✕
                  </button>
                  <img src={galleryImages[selectedGalleryImage]?.src} alt={galleryImages[selectedGalleryImage]?.alt} className="max-w-full max-h-full object-contain rounded-lg" />
                </div>
              </div>}
          </div>
        </section>

        {/* Location Highlights */}
        <section className="py-16 bg-[hsl(var(--nature-blue))]">
          <div className="container-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--nature-blue-foreground))] mb-8 font-playfair">
                  Kako doći
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-[hsl(var(--nature-accent))] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <h4 className="font-semibold text-[hsl(var(--nature-blue-foreground))] mb-2">Autobusom iz Beograda</h4>
                      <p className="text-[hsl(var(--nature-blue-foreground))]">Direktna linija Beograd - Banja Vrujci, vozila saobraćaju nekoliko puta dnevno.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-[hsl(var(--nature-accent))] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <h4 className="font-semibold text-[hsl(var(--nature-blue-foreground))] mb-2">Automobilom</h4>
                      <p className="text-[hsl(var(--nature-blue-foreground))]">Autoput E75 do Ljiga, zatim regionalni put prema Milovcu i Banji Vrujci (120km - 1.5h).</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--nature-blue-foreground))] mb-8 font-playfair">
                  Aktivnosti u blizini
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <img src="/lovable-uploads/nature-park.jpeg" alt="Termalni izvori" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-[hsl(var(--nature-blue-foreground))] mb-2">Termalni izvori</h4>
                      <p className="text-[hsl(var(--nature-blue-foreground))]">Lековita termalna voda (42°C) poznata po lekovitim svojstvima za reumatizam i stres.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <img src="/lovable-uploads/nature-park.jpeg" alt="Planinarske staze" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-[hsl(var(--nature-blue-foreground))] mb-2">Planinarske staze</h4>
                      <p className="text-[hsl(var(--nature-blue-foreground))]">Označene staze kroz šume Maljena sa prelepim pogledima na dolinu Kolubare.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <ChefHat className="w-16 h-16 bg-[hsl(var(--nature-accent))] text-white rounded-lg p-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-[hsl(var(--nature-blue-foreground))] mb-2">Domaća hrana</h4>
                      <p className="text-[hsl(var(--nature-blue-foreground))]">Lokalni restorani sa tradicionalnim srpskim jelima i domaćim proizvodima.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <CallToActionSection />

        {/* Contact / Booking Form */}
        

        {selectedUnit && <ApartmentModal apartment={selectedUnit} onClose={handleCloseModal} onBookNow={handleBookNow} />}

        {isBookingOpen && unitToBook && <BookingDrawer apartment={unitToBook} isOpen={isBookingOpen} onClose={handleCloseBooking} />}
      </main>
      
      <Footer location="vrujci" />
    </>;
};
export default BanjaVrujci;