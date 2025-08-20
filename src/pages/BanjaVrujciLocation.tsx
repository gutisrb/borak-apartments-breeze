import { useEffect } from 'react';
import { MapPin, Camera, Mountain, Anchor, Waves, Clock, Car, Plane, Ship, Star, TreePine, Droplets } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { useNavigate, useParams } from 'react-router-dom';

const BanjaVrujciLocation = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();

  useEffect(() => {
    document.title = `Banja Vrujci - Lokacija | Apartmani`;
    window.scrollTo(0, 0);
  }, []);

  const handleBookingNavigation = () => {
    navigate(`/${lang || 'en'}/banja-vrujci/apartments`);
  };

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[70vh] bg-gradient-to-br from-[hsl(var(--nature-accent))] via-[hsl(var(--nature-primary))] to-[hsl(var(--nature-accent))] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: "url('/lovable-uploads/nature-park.jpeg')",
              filter: 'brightness(0.7)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--nature-accent))]/80 via-transparent to-[hsl(var(--nature-accent))]/40" />
          
          <div className="relative z-10 container-luxury h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-playfair animate-fade-in">
                Otkrijte Banju Vrujci
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed font-app animate-fade-in">
                Termalni izvori, netaknuta priroda i mir planina - vaš savršen odmor u prirodi
              </p>
              <Button 
                onClick={handleBookingNavigation}
                className="bg-[hsl(var(--nature-primary))] hover:bg-white text-white hover:text-[hsl(var(--nature-accent))] px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 animate-fade-in"
              >
                Pogledajte apartmane
              </Button>
            </div>
          </div>
        </section>

        {/* About Banja Vrujci */}
        <section className="section-padding bg-white">
          <div className="container-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[hsl(var(--nature-accent))] mb-6 font-playfair">
                  O Banji Vrujci
                </h2>
                <p className="text-lg text-[hsl(var(--nature-muted-foreground))] mb-6 leading-relaxed font-app">
                  Banja Vrujci je poznato banjsko mesto u Srbiji, smešteno na obroncima planine Maljen. Poznata je po svojim termalnim izvorima čija temperatura dostiže 42°C i lečivim svojstvima za reumatizam, artritis i stres.
                </p>
                <p className="text-lg text-[hsl(var(--nature-muted-foreground))] mb-8 leading-relaxed font-app">
                  Okružena netaknutom prirodom, Banja Vrujci pruža savršen odmor od gradske vreve. Čist vazduh, tišina šuma i lečivita termalna voda čine je idealnim mestom za opuštanje i oporavak.
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[hsl(var(--nature-primary))] mb-2 font-playfair">42°C</div>
                    <div className="text-[hsl(var(--nature-muted-foreground))] font-app">Temperatura izvora</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[hsl(var(--nature-primary))] mb-2 font-playfair">120km</div>
                    <div className="text-[hsl(var(--nature-muted-foreground))] font-app">Od Beograda</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="/lovable-uploads/nature-park.jpeg" 
                  alt="Priroda oko Banje Vrujci"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Attractions */}
        <section className="section-padding bg-gradient-to-br from-[hsl(var(--nature-muted))] to-white">
          <div className="container-luxury">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[hsl(var(--nature-accent))] mb-6 font-playfair">
                Atrakcije i aktivnosti
              </h2>
              <p className="text-xl text-[hsl(var(--nature-muted-foreground))] max-w-3xl mx-auto font-app">
                Otkrijte prirodne lepote i aktivnosti koje čine Banju Vrujci posebnom
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Thermal Springs */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <Droplets className="w-6 h-6 text-[hsl(var(--nature-primary))] mr-3" />
                    <h3 className="text-xl font-bold text-[hsl(var(--nature-accent))] font-playfair">
                      Termalni izvori
                    </h3>
                  </div>
                  <p className="text-[hsl(var(--nature-muted-foreground))] leading-relaxed font-app">
                    Lečivita termalna voda temperature 42°C, poznata po blagotvornom dejstvu na reumatizam, artritis i opšte opuštanje organizma.
                  </p>
                </div>
              </div>

              {/* Nature Trails */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <TreePine className="w-6 h-6 text-[hsl(var(--nature-primary))] mr-3" />
                    <h3 className="text-xl font-bold text-[hsl(var(--nature-accent))] font-playfair">
                      Planinarske staze
                    </h3>
                  </div>
                  <p className="text-[hsl(var(--nature-muted-foreground))] leading-relaxed font-app">
                    Označene staze kroz šume planine Maljen sa prekrasnim pogledima na dolinu Kolubare i okolne planine.
                  </p>
                </div>
              </div>

              {/* Fresh Air */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <Mountain className="w-6 h-6 text-[hsl(var(--nature-primary))] mr-3" />
                    <h3 className="text-xl font-bold text-[hsl(var(--nature-accent))] font-playfair">
                      Čist vazduh
                    </h3>
                  </div>
                  <p className="text-[hsl(var(--nature-muted-foreground))] leading-relaxed font-app">
                    Planinski vazduh bez zagađenja, idealan za osobe sa respiratornim problemima i sve koji traže bekstvo od gradske vreve.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Getting There */}
        <section className="section-padding bg-gradient-to-br from-[hsl(var(--nature-accent))] to-[hsl(var(--nature-primary))] text-white">
          <div className="container-luxury">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair text-white">
                Kako doći do Banje Vrujci
              </h2>
              <p className="text-xl text-white max-w-3xl mx-auto font-app">
                Lako dostupna iz Beograda i drugih gradova Srbije
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Car className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 font-playfair text-white">
                  Automobilom
                </h3>
                <p className="text-white leading-relaxed font-app">
                  Autoput E75 do Ljiga, zatim regionalni put prema Milovcu i Banji Vrujci. Ukupno 120km - oko 1.5h vožnje.
                </p>
              </div>

              <div className="text-center">
                <Ship className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 font-playfair text-white">
                  Autobusom
                </h3>
                <p className="text-white leading-relaxed font-app">
                  Direktna autobuska linija Beograd - Banja Vrujci. Vozila saobraćaju nekoliko puta dnevno.
                </p>
              </div>

              <div className="text-center">
                <MapPin className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 font-playfair text-white">
                  GPS koordinate
                </h3>
                <p className="text-white leading-relaxed font-app">
                  44.2167° N, 20.1167° E - lako dostupno GPS navigacijom iz bilo kog pravca.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Local Culture & Call to Action */}
        <section className="section-padding bg-gradient-to-br from-[hsl(var(--nature-muted))] to-white">
          <div className="container-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[hsl(var(--nature-accent))] mb-6 font-playfair">
                  Lokalna kultura i tradicija
                </h2>
                <p className="text-lg text-[hsl(var(--nature-muted-foreground))] mb-6 leading-relaxed font-app">
                  Banja Vrujci čuva autentičnu srpsku tradiciju gostoprimstva. Lokalni restorani nude tradicionalna jela pripremljena od domaćih proizvoda.
                </p>
                <p className="text-lg text-[hsl(var(--nature-muted-foreground))] mb-8 leading-relaxed font-app">
                  Uživajte u sporom ritmu života, prošetajte kroz šume, posetite lokalne proizvođače meda i rakije, i osetite pravu srpsku gostoljubivost.
                </p>
                
                <Button 
                  onClick={handleBookingNavigation}
                  className="bg-[hsl(var(--nature-primary))] hover:bg-[hsl(var(--nature-accent))] text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
                >
                  Rezervišite boravak
                </Button>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-[hsl(var(--nature-accent))] mb-6 font-playfair text-center">
                  Zašto odabrati Banju Vrujci?
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[hsl(var(--nature-primary))] rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <span className="text-[hsl(var(--nature-muted-foreground))] font-app">Lečiviti termalni izvori poznati širom Srbije</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[hsl(var(--nature-primary))] rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <span className="text-[hsl(var(--nature-muted-foreground))] font-app">Netaknuta priroda i čist planinski vazduh</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[hsl(var(--nature-primary))] rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <span className="text-[hsl(var(--nature-muted-foreground))] font-app">Blizina Beograda - idealno za vikend odmor</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[hsl(var(--nature-primary))] rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <span className="text-[hsl(var(--nature-muted-foreground))] font-app">Autentična srpska gostoljubivost i tradicija</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BanjaVrujciLocation;