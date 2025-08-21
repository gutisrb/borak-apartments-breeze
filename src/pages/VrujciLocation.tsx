import { useEffect } from 'react';
import { MapPin, Camera, Mountain, Droplets, TreePine, Clock, Car, Plane, Train, Star } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';

const VrujciLocation = () => {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();

  useEffect(() => {
    document.title = 'O Banji Vrujci | Apartmani Vrujci';
    window.scrollTo(0, 0);
  }, []);

  const handleBookingNavigation = () => {
    navigate(`/${lang || 'en'}/banja-vrujci/apartments`);
  };

  return (
    <>
      <Header location="vrujci" />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[70vh] bg-[hsl(var(--nature-apartments))] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: "url('/lovable-uploads/681ca572-04c4-4e3a-ab61-cada40e2265d.png')",
              filter: 'brightness(0.7)'
            }}
          />
          <div className="absolute inset-0 bg-[hsl(var(--nature-apartments))]/80" />
          
          <div className="relative z-10 container-luxury h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-playfair animate-fade-in">
                O Banji Vrujci
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed font-app animate-fade-in">
                Otkrijte čari termalne banje u srcu netaknute prirode Srbije
              </p>
                <Button 
                onClick={handleBookingNavigation}
                className="bg-[hsl(var(--nature-apartments))] hover:bg-white text-white hover:text-black px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 animate-fade-in"
              >
                Rezervišite odmor
              </Button>
            </div>
          </div>
        </section>

        {/* About Banja Vrujci */}
        <section className="section-padding bg-[hsl(var(--nature-muted))]">
          <div className="container-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 font-playfair">
                  Banja Vrujci
                </h2>
                <p className="text-lg text-black mb-6 leading-relaxed font-app">
                  Banja Vrujci je poznata termalna banja smeštena u slikovitom delu zapadne Srbije, na obroncima planine Valjevo. Ovo mesto je savršeno utočište za one koji traže mir, opuštanje i prirodno lečenje.
                </p>
                <p className="text-lg text-black mb-8 leading-relaxed font-app">
                  Termalni izvori sa temperaturom vode od 27°C do 37°C poznati su po svojim lekovitim svojstvima, posebno korisnim za lečenje reumatskih oboljenja i problema sa kožom.
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[hsl(var(--nature-apartments))] mb-2 font-playfair">27-37°C</div>
                    <div className="text-black font-app">Temperatura izvora</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[hsl(var(--nature-apartments))] mb-2 font-playfair">120km</div>
                    <div className="text-black font-app">Od Beograda</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="/lovable-uploads/7925bdc6-61dd-40cc-a534-7e5d6f0698cf.png" 
                  alt="Banja Vrujci iz vazduha - pogled na selo i okolinu"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Attractions */}
        <section className="section-padding bg-[hsl(var(--nature-gallery))]">
          <div className="container-luxury">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 font-playfair">
                Atrakcije i aktivnosti
              </h2>
              <p className="text-xl text-black max-w-3xl mx-auto font-app">
                Otkrijte bogatstvo prirode i wellness sadržaja
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Thermal Springs */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="h-48 bg-[hsl(var(--nature-apartments))] flex items-center justify-center">
                  <Droplets className="w-16 h-16 text-white" />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <Droplets className="w-6 h-6 text-[hsl(var(--nature-apartments))] mr-3" />
                    <h3 className="text-xl font-bold text-black font-playfair">
                      Termalni izvori
                    </h3>
                  </div>
                  <p className="text-black leading-relaxed font-app">
                    Prirodni termalni izvori sa lekovitim svojstvima, idealni za opuštanje i wellness.
                  </p>
                </div>
              </div>

              {/* Nature Trails */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="h-48 bg-[hsl(var(--nature-gallery))] flex items-center justify-center">
                  <TreePine className="w-16 h-16 text-black" />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <TreePine className="w-6 h-6 text-[hsl(var(--nature-apartments))] mr-3" />
                    <h3 className="text-xl font-bold text-black font-playfair">
                      Prirodne staze
                    </h3>
                  </div>
                  <p className="text-black leading-relaxed font-app">
                    Šetnje kroz netaknutu prirodu sa prelepo uređenim stazama za pešačenje.
                  </p>
                </div>
              </div>

              {/* Mountain Views */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="h-48 bg-[hsl(var(--nature-apartments))] flex items-center justify-center">
                  <Mountain className="w-16 h-16 text-white" />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <Mountain className="w-6 h-6 text-[hsl(var(--nature-apartments))] mr-3" />
                    <h3 className="text-xl font-bold text-black font-playfair">
                      Planinski pogledi
                    </h3>
                  </div>
                  <p className="text-black leading-relaxed font-app">
                    Spektakularni pogledi na okolne planine i dolinu Kolubare.
                  </p>
                </div>
              </div>

              {/* Local Culture */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="h-48 bg-[hsl(var(--nature-gallery))] flex items-center justify-center">
                  <Star className="w-16 h-16 text-black" />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <Star className="w-6 h-6 text-[hsl(var(--nature-apartments))] mr-3" />
                    <h3 className="text-xl font-bold text-black font-playfair">
                      Lokalna kultura
                    </h3>
                  </div>
                  <p className="text-black leading-relaxed font-app">
                    Upoznajte bogatu tradiciju i kulturu ovog dela Srbije.
                  </p>
                </div>
              </div>

              {/* Wellness */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="h-48 bg-[hsl(var(--nature-apartments))] flex items-center justify-center">
                  <Clock className="w-16 h-16 text-white" />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <Clock className="w-6 h-6 text-[hsl(var(--nature-apartments))] mr-3" />
                    <h3 className="text-xl font-bold text-black font-playfair">
                      Wellness centar
                    </h3>
                  </div>
                  <p className="text-black leading-relaxed font-app">
                    Moderni wellness sadržaji za potpuno opuštanje i obnavljanje energije.
                  </p>
                </div>
              </div>

              {/* Nature Park */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="h-48 bg-[hsl(var(--nature-gallery))] flex items-center justify-center">
                  <MapPin className="w-16 h-16 text-black" />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <MapPin className="w-6 h-6 text-[hsl(var(--nature-apartments))] mr-3" />
                    <h3 className="text-xl font-bold text-black font-playfair">
                      Park prirode
                    </h3>
                  </div>
                  <p className="text-black leading-relaxed font-app">
                    Zaštićeno prirodno područje sa raznovrsnom florom i faunom.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Getting There */}
        <section className="section-padding bg-[hsl(var(--nature-apartments))] text-white">
          <div className="container-luxury">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair text-white">
                Kako doći do Banje Vrujci
              </h2>
              <p className="text-xl text-white max-w-3xl mx-auto font-app">
                Lako dostupna iz svih delova Srbije
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Car className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 font-playfair text-white">
                  Automobilom
                </h3>
                <p className="text-white leading-relaxed font-app">
                  120km od Beograda, autoputem A1 izlaz Valjevo, zatim regionalnim putevima.
                </p>
              </div>

              <div className="text-center">
                <Train className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 font-playfair text-white">
                  Vozom
                </h3>
                <p className="text-white leading-relaxed font-app">
                  Železnička stanica Lajkovac, zatim autobusom ili taksijem do banje.
                </p>
              </div>

              <div className="text-center">
                <Plane className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 font-playfair text-white">
                  Avionom
                </h3>
                <p className="text-white leading-relaxed font-app">
                  Aerodrom Nikola Tesla Beograd, zatim transfer ili rent-a-car.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section-padding bg-white">
          <div className="container-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 font-playfair">
                  Vaš savršen odmor u prirodi
                </h2>
                <p className="text-lg text-black mb-6 leading-relaxed font-app">
                  Banja Vrujci vam nudi jedinstvenu kombinaciju prirodnih lekovitih izvora, netaknute prirode i modernog komfora.
                </p>
                <p className="text-lg text-black mb-8 leading-relaxed font-app">
                  Ostavite gradsku vravu iza sebe i uronite u mir i tišinu ovog prirodnog raja.
                </p>
                
                <Button 
                  onClick={handleBookingNavigation}
                  className="bg-[hsl(var(--nature-apartments))] hover:bg-[hsl(var(--nature-gallery))] text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
                >
                  Rezervišite svoj boravak
                </Button>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-black mb-6 font-playfair text-center">
                  Zašto odabrati Vrujci?
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[hsl(var(--nature-apartments))] rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <span className="text-black font-app">Prirodni termalni izvori sa lekovitim svojstvima</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[hsl(var(--nature-apartments))] rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <span className="text-black font-app">Čist vazduh i netaknuta priroda</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[hsl(var(--nature-apartments))] rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <span className="text-black font-app">Moderni wellness sadržaji</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[hsl(var(--nature-apartments))] rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <span className="text-black font-app">Aktivnosti u prirodi tokom cele godine</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer location="vrujci" />
    </>
  );
};

export default VrujciLocation;