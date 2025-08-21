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
  const heroImages = ['/lovable-uploads/bdf41256-bd5e-434c-a348-5107e71c071d.png', '/lovable-uploads/a38854c1-75d5-4e79-92a3-04ffc69b8f63.png', '/lovable-uploads/5f80961c-6b95-49ad-aa2a-1cc9177bea64.png'];
  const galleryImages = [{
    src: '/lovable-uploads/df5f14c8-38c3-480c-812a-60cdbf63d047.png',
    alt: 'Pogled na planine i okruženje',
    caption: 'Prekrasan pogled na planine'
  }, {
    src: '/lovable-uploads/2f61f899-0267-4fdb-8b83-4d3e80604327.png',
    alt: 'Pokrivena terasa za obedovanje',
    caption: 'Pokrivena terasa sa kamenim zidovima'
  }, {
    src: '/lovable-uploads/1513f292-471d-4ed7-85ab-4a932dc6f685.png',
    alt: 'Pogled sa balkona na selo',
    caption: 'Panoramski pogled sa terase'
  }, {
    src: '/lovable-uploads/8f201980-199b-41d3-960b-fa0dde14a132.png',
    alt: 'Terasa za obedovanje',
    caption: 'Prostor za opuštanje i obedovanje'
  }, {
    src: '/lovable-uploads/d59ba270-fd7f-4b45-910c-bc634d99f61a.png',
    alt: 'Dvorište sa ljuljaškama',
    caption: 'Dvorište sa ljuljaškama i spravama'
  }, {
    src: '/lovable-uploads/e2dac9fe-98dd-4faf-9a76-d805ef0704d0.png',
    alt: 'Spoljašnja terasa sa roštiljem',
    caption: 'Spoljašnja terasa sa roštiljem'
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
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--nature-header-footer))]/80 to-transparent" />

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
                <Button onClick={scrollToApartments} size="lg" className="bg-[hsl(var(--nature-apartments))] text-white hover:bg-[hsl(var(--nature-gallery))] transition font-app text-base md:text-lg px-12 py-5">
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
            <h2 className="mb-8 animate-fade-in text-[hsl(var(--nature-header-footer))] font-playfair text-3xl md:text-4xl font-bold">
              Dobrodošli u Banju Vrujci
            </h2>
            <p className="text-lg md:text-xl text-black max-w-4xl mx-auto font-app leading-relaxed animate-fade-in">
              Uživajte u miru prirode, lековitim termalnim vodama i svежem vazduhu. Naši apartmani pružaju savršen odmor za sve koji traže bekstvo od gradske vreve.
            </p>
          </div>
        </section>

        {/* Location Snapshot */}
        <section className="py-12 bg-[hsl(var(--nature-gallery))]">
          <div className="container-luxury">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
              <div className="flex items-center gap-3 text-center md:text-left">
                <MapPin className="w-6 h-6 text-black" />
                <div>
                  <div className="font-semibold text-black">120km od Beograda</div>
                  <div className="text-sm text-black">1.5h vožnje</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-center md:text-left">
                <Calendar className="w-6 h-6 text-black" />
                <div>
                  <div className="font-semibold text-black">Cela godina</div>
                  <div className="text-sm text-black">Najbolje: proleće-jesen</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-center md:text-left">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white text-xs font-bold">T</div>
                <div>
                  <div className="font-semibold text-black">Termalni izvori</div>
                  <div className="text-sm text-black">5min hoda</div>
                </div>
              </div>

              <div className="bg-[hsl(var(--nature-muted))] rounded-lg p-4 shadow-md">
                <div className="w-full h-20 bg-white rounded flex items-center justify-center text-gray-500 text-sm">
                  Mapa lokacije
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Apartment Selector - Same as Borak but with Vrujci data */}
        <section id="apartments" className="section-padding bg-[hsl(var(--nature-apartments))]">
          <div className="container-luxury">
            <div className="text-center mb-20">
              <h2 className="mb-6 animate-fade-in text-black font-playfair text-3xl md:text-4xl font-bold">
                Naši apartmani
              </h2>
              <p className="text-lg md:text-xl text-black max-w-3xl mx-auto font-app leading-relaxed animate-fade-in">
                Udobni apartmani u srcu prirode, potpuno opremljeni za savršen odmor
              </p>
            </div>

            {loading ? <div className="text-center">
                <p className="text-black font-app">Učitavanje apartmana...</p>
              </div> : <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
                {units.map((unit, index) => <Card key={unit.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white border-[hsl(var(--nature-muted))] animate-fade-in" style={{
              animationDelay: `${index * 0.2}s`
            }}>
                    <div className="relative overflow-hidden">
                      <img src={unit.images?.[0] || '/placeholder.svg'} alt={`${unit.name} - Apartman u Banji Vrujci`} className="w-full h-72 md:h-80 object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                      <div className="absolute top-6 right-6 bg-[hsl(var(--nature-primary))] text-white px-4 py-2 rounded-full font-app font-medium shadow-lg">
                        €{unit.price_per_night}/noć
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <h3 className="font-playfair text-[hsl(var(--nature-accent))] mb-4 text-xl md:text-2xl">
                        {unit.name}
                      </h3>
                      
                      <div className="flex items-center justify-between mb-6 text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Users className="h-5 w-5 text-[hsl(var(--nature-primary))]" />
                          <span className="font-app">Do {unit.max_guests} osoba</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Square className="h-5 w-5 text-[hsl(var(--nature-primary))]" />
                          <span className="font-app">{unit.size_m2}m²</span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-6 font-app leading-relaxed">
                        {unit.description}
                      </p>
                      
                      <Button onClick={() => handleViewDetails(unit)} className="w-full bg-[hsl(var(--nature-apartments))] text-white hover:bg-[hsl(var(--nature-gallery))] transition font-app font-semibold">
                        Pogledaj detalje
                      </Button>
                    </div>
                  </Card>)}
              </div>}
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="py-16 bg-[hsl(var(--nature-gallery))]">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-playfair">
                Galerija
              </h2>
              <p className="text-lg text-white">Pogledajte naše apartmane i okolinu</p>
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
                
              </div>}
          </div>
        </section>

        {/* Location Highlights */}
        <section className="py-16 bg-[hsl(var(--nature-muted))]">
          <div className="container-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 font-playfair">
                  Kako doći
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-[hsl(var(--nature-apartments))] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <h4 className="font-semibold text-black mb-2">Autobusom iz Beograda</h4>
                      <p className="text-black">Direktna linija Beograd - Banja Vrujci, vozila saobraćaju nekoliko puta dnevno.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-[hsl(var(--nature-apartments))] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <h4 className="font-semibold text-black mb-2">Automobilom</h4>
                      <p className="text-black">Autoput E75 do Ljiga, zatim regionalni put prema Milovcu i Banji Vrujci (120km - 1.5h).</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 font-playfair">
                  Aktivnosti u blizini
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <img src="/lovable-uploads/nature-park.jpeg" alt="Termalni izvori" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-black mb-2">Termalni izvori</h4>
                      <p className="text-black">Lековita termalna voda (42°C) poznata po lekovitim svojstvima za reumatizam i stres.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <img src="/lovable-uploads/nature-park.jpeg" alt="Planinarske staze" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-black mb-2">Planinarske staze</h4>
                      <p className="text-black">Označene staze kroz šume Maljena sa prelepim pogledima na dolinu Kolubare.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <ChefHat className="w-16 h-16 bg-[hsl(var(--nature-apartments))] text-white rounded-lg p-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-black mb-2">Domaća hrana</h4>
                      <p className="text-black">Lokalni restorani sa tradicionalnim srpskim jelima i domaćim proizvodima.</p>
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