import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Wifi, Car, ChefHat, Calendar, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const BanjaVrujci = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    { src: '/placeholder-gallery-1.jpg', alt: 'Priroda oko Banje Vrujci', caption: 'Prekrasna priroda oko kompleksa' },
    { src: '/placeholder-gallery-2.jpg', alt: 'Termalni izvori', caption: 'Termalni izvori u blizini' },
    { src: '/placeholder-gallery-3.jpg', alt: 'Šetnja kroz prirodu', caption: 'Staze za šetnju i planinarenje' },
    { src: '/placeholder-gallery-4.jpg', alt: 'Kuća spolja', caption: 'Eksterijer naših apartmana' },
    { src: '/placeholder-gallery-5.jpg', alt: 'Dnevna soba', caption: 'Udobne dnevne sobe' },
    { src: '/placeholder-gallery-6.jpg', alt: 'Kuhinja', caption: 'Potpuno opremljena kuhinja' },
    { src: '/placeholder-gallery-7.jpg', alt: 'Spavaća soba', caption: 'Komforne spavaće sobe' },
    { src: '/placeholder-gallery-8.jpg', alt: 'Kupatilo', caption: 'Moderna kupatila' },
    { src: '/placeholder-gallery-9.jpg', alt: 'Terasa', caption: 'Terasa sa pogledom na prirodu' },
    { src: '/placeholder-gallery-10.jpg', alt: 'Parking', caption: 'Besplatan parking' },
    { src: '/placeholder-gallery-11.jpg', alt: 'Lokalna hrana', caption: 'Lokalne specijalitete' },
    { src: '/placeholder-gallery-12.jpg', alt: 'Aktivnosti', caption: 'Razne aktivnosti u prirodi' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-r from-[hsl(var(--nature-primary))] to-[hsl(var(--nature-accent))] opacity-90"></div>
          <div className="absolute inset-0 bg-black/20"></div>
          {/* IMAGE PLACEHOLDER: {IMAGE_HERO_VRUJCI} - Replace with panoramic nature/thermal springs image */}
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-playfair">
            Apartmani — Banja Vrujci
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-app">
            Odmor u prirodi — termalne vode, tišina i svež vazduh
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              className="bg-[hsl(var(--nature-primary))] hover:bg-[hsl(var(--nature-accent))] text-white font-semibold px-8 py-4 rounded-lg text-lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Rezerviši / Pošalji upit
            </Button>
            <Button 
              variant="outline"
              className="border-[hsl(var(--nature-blue))] text-[hsl(var(--nature-blue))] hover:bg-[hsl(var(--nature-blue))] hover:text-white font-semibold px-8 py-4 rounded-lg text-lg"
              onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Galerija
            </Button>
          </div>
        </div>
      </section>

      {/* Location Snapshot */}
      <section className="py-12 bg-[hsl(var(--nature-muted))]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
            <div className="flex items-center gap-3 text-center md:text-left">
              <MapPin className="w-6 h-6 text-[hsl(var(--nature-primary))]" />
              <div>
                <div className="font-semibold text-[hsl(var(--nature-accent))]">120km od Beograda</div>
                <div className="text-sm text-[hsl(var(--nature-muted-foreground))]">1.5h vožnje</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-center md:text-left">
              <Calendar className="w-6 h-6 text-[hsl(var(--nature-primary))]" />
              <div>
                <div className="font-semibold text-[hsl(var(--nature-accent))]">Cela godina</div>
                <div className="text-sm text-[hsl(var(--nature-muted-foreground))]">Najbolje: proleće-jesen</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="w-6 h-6 bg-[hsl(var(--nature-primary))] rounded-full flex items-center justify-center text-white text-xs font-bold">T</div>
              <div>
                <div className="font-semibold text-[hsl(var(--nature-accent))]">Termalni izvori</div>
                <div className="text-sm text-[hsl(var(--nature-muted-foreground))]">5min hoda</div>
              </div>
            </div>

            {/* Micro Map Placeholder */}
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="w-full h-20 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm">
                {/* IMAGE PLACEHOLDER: {IMAGE_MAP_VRUJCI} */}
                Mapa lokacije
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Unit Summary */}
      <section id="pricing" className="py-16 bg-white">
        <div className="container-luxury">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--nature-accent))] mb-4 font-playfair">
              Cene i kapaciteti
            </h2>
            <p className="text-lg text-gray-600">Udobni apartmani u srcu prirode</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* First Floor Unit */}
            <div className="bg-[hsl(var(--nature-muted))] rounded-xl p-8 shadow-lg">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-[hsl(var(--nature-accent))] font-playfair">Kuća, 1. sprat</h3>
                  <p className="text-gray-600">Kapacitet: 5 osoba</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-[hsl(var(--nature-primary))]">50€</div>
                  <div className="text-sm text-gray-500">po noći (radni dan)</div>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-[hsl(var(--nature-accent))] font-medium mb-4">
                  Kuća, 1. sprat — radni dan 50€ — 2 sobe (svaka sa 1 bračnim), 1 samac — kapacitet: 5 osoba.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-2">
                    <div className="w-full h-32 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                      {/* IMAGE PLACEHOLDER: {IMG_1SPRAT_1} */}
                      Slika 1. sprat
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-2">
                    <div className="w-full h-32 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                      {/* IMAGE PLACEHOLDER: {IMG_1SPRAT_2} */}
                      Slika 1. sprat
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Wifi className="w-4 h-4 text-[hsl(var(--nature-primary))]" />
                    <span>Besplatan WiFi</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Car className="w-4 h-4 text-[hsl(var(--nature-primary))]" />
                    <span>Besplatan parking</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <ChefHat className="w-4 h-4 text-[hsl(var(--nature-primary))]" />
                    <span>Potpuno opremljena kuhinja</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Floor Unit */}
            <div className="bg-[hsl(var(--nature-muted))] rounded-xl p-8 shadow-lg">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-[hsl(var(--nature-accent))] font-playfair">Kuća, 2. sprat</h3>
                  <p className="text-gray-600">Kapacitet: 6 osoba</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-[hsl(var(--nature-primary))]">50€</div>
                  <div className="text-sm text-gray-500">po noći (radni dan)</div>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-[hsl(var(--nature-accent))] font-medium mb-4">
                  Kuća, 2. sprat — radni dan 50€ — 2 bračna i 2 samca — kapacitet: 6 osoba.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-2">
                    <div className="w-full h-32 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                      {/* IMAGE PLACEHOLDER: {IMG_2SPRAT_1} */}
                      Slika 2. sprat
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-2">
                    <div className="w-full h-32 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                      {/* IMAGE PLACEHOLDER: {IMG_2SPRAT_2} */}
                      Slika 2. sprat
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Wifi className="w-4 h-4 text-[hsl(var(--nature-primary))]" />
                    <span>Besplatan WiFi</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Car className="w-4 h-4 text-[hsl(var(--nature-primary))]" />
                    <span>Besplatan parking</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <ChefHat className="w-4 h-4 text-[hsl(var(--nature-primary))]" />
                    <span>Potpuno opremljena kuhinja</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Status Warning */}
          <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-800 text-center">
              <Calendar className="w-5 h-5 inline mr-2" />
              Za rezervaciju i proveru dostupnosti, koristite kontakt formu ispod ili nas pozovite direktno.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-16 bg-[hsl(var(--nature-muted))]">
        <div className="container-luxury">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--nature-accent))] mb-4 font-playfair">
              Galerija
            </h2>
            <p className="text-lg text-gray-600">Pogledajte naše apartmane i okolinu</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div 
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => setSelectedImage(index)}
              >
                <div className="aspect-square bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                  {/* IMAGE PLACEHOLDER: {GALLERY_IMG_${index + 1}} */}
                  Galerija {index + 1}
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end">
                  <div className="text-white p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm font-medium">{image.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Simple Lightbox */}
          {selectedImage !== null && (
            <div 
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <div className="relative max-w-4xl max-h-full">
                <button 
                  className="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300"
                  onClick={() => setSelectedImage(null)}
                >
                  ✕
                </button>
                <div className="bg-white rounded-lg p-2">
                  <div className="w-full h-96 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                    {galleryImages[selectedImage]?.alt}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How to Get There + Local Highlights */}
      <section className="py-16 bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--nature-accent))] mb-8 font-playfair">
                Kako doći
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[hsl(var(--nature-primary))] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-semibold text-[hsl(var(--nature-accent))] mb-2">Autobusom iz Beograda</h4>
                    <p className="text-gray-600">Direktna linija Beograd - Banja Vrujci, vozila saobraćaju nekoliko puta dnevno.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-[hsl(var(--nature-primary))] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-semibold text-[hsl(var(--nature-accent))] mb-2">Automobilom</h4>
                    <p className="text-gray-600">Autoput E75 do Ljiga, zatim regionalni put prema Milovcu i Banji Vrujci (120km - 1.5h).</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--nature-accent))] mb-8 font-playfair">
                Aktivnosti u blizini
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-xs flex-shrink-0">
                    {/* IMAGE PLACEHOLDER: {IMG_SPRINGS} */}
                    Izvori
                  </div>
                  <div>
                    <h4 className="font-semibold text-[hsl(var(--nature-accent))] mb-2">Termalni izvori</h4>
                    <p className="text-gray-600">Lековita termalna voda (42°C) poznata po lekovitim svojstvima za reumatizam i stres.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-xs flex-shrink-0">
                    {/* IMAGE PLACEHOLDER: {IMG_TRAIL} */}
                    Staza
                  </div>
                  <div>
                    <h4 className="font-semibold text-[hsl(var(--nature-accent))] mb-2">Planinarske staze</h4>
                    <p className="text-gray-600">Označene staze kroz šume Maljena sa prelepim pogledima na dolinu Kolubare.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <ChefHat className="w-16 h-16 bg-[hsl(var(--nature-muted))] text-[hsl(var(--nature-primary))] rounded-lg p-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[hsl(var(--nature-accent))] mb-2">Domaća hrana</h4>
                    <p className="text-gray-600">Lokalni restorani sa tradicionalnim srpskim jelima i domaćim proizvodima.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Booking Form */}
      <section id="contact" className="py-16 bg-[hsl(var(--nature-muted))]">
        <div className="container-luxury">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--nature-accent))] mb-4 font-playfair">
              Kontakt i rezervacije
            </h2>
            <p className="text-lg text-gray-600">Pošaljite upit ili nas pozovite direktno</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-[hsl(var(--nature-accent))] mb-4">Kontakt informacije</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[hsl(var(--nature-primary))]" />
                    <span>+381 60 123 4567</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-[hsl(var(--nature-primary))]" />
                    <span>banja.vrujci@apartmani.rs</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-[hsl(var(--nature-primary))] hover:bg-[hsl(var(--nature-accent))] text-white flex items-center gap-2"
                  onClick={() => window.open('tel:+38160123456')}
                >
                  <Phone className="w-4 h-4" />
                  Pozovite nas
                </Button>
                <Button 
                  variant="outline"
                  className="border-[hsl(var(--nature-blue))] text-[hsl(var(--nature-blue))] hover:bg-[hsl(var(--nature-blue))] hover:text-white flex items-center gap-2"
                  onClick={() => window.open('https://wa.me/38160123456')}
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
              </div>

              {/* Admin Note */}
              <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm">
                <p className="font-medium text-amber-800 mb-2">Admin napomena:</p>
                <p className="text-amber-700">
                  IMAGE PLACEHOLDERS: {"{"}IMAGE_HERO_VRUJCI{"}"}, {"{"}IMG_1SPRAT_1{"}"}, {"{"}IMG_1SPRAT_2{"}"}, {"{"}IMG_2SPRAT_1{"}"}, {"{"}IMG_2SPRAT_2{"}"}, {"{"}GALLERY_IMG_1{"}"} kroz {"{"}GALLERY_IMG_12{"}"}, {"{"}IMG_TRAIL{"}"}, {"{"}IMG_SPRINGS{"}"}, {"{"}IMAGE_MAP_VRUJCI{"}"} - Replace with Dropbox images.
                </p>
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-[hsl(var(--nature-accent))] mb-6">Pošaljite upit</h3>
              <form className="space-y-6">
                <input type="hidden" name="location" value="banja-vrujci" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ime i prezime</label>
                    <input 
                      type="text" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(var(--nature-primary))] focus:border-transparent"
                      placeholder="Vaše ime"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(var(--nature-primary))] focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                  <input 
                    type="tel" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(var(--nature-primary))] focus:border-transparent"
                    placeholder="+381..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Datum dolaska</label>
                    <input 
                      type="date" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(var(--nature-primary))] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Datum odlaska</label>
                    <input 
                      type="date" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(var(--nature-primary))] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Broj gostiju</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(var(--nature-primary))] focus:border-transparent">
                    <option>1 osoba</option>
                    <option>2 osobe</option>
                    <option>3 osobe</option>
                    <option>4 osobe</option>
                    <option>5 osoba</option>
                    <option>6 osoba</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Poruka</label>
                  <textarea 
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(var(--nature-primary))] focus:border-transparent"
                    placeholder="Dodatne informacije ili posebni zahtevi..."
                  ></textarea>
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-[hsl(var(--nature-primary))] hover:bg-[hsl(var(--nature-accent))] text-white py-3 text-lg font-semibold"
                >
                  Pošaljite upit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BanjaVrujci;