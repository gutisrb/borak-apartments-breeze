import { useEffect } from 'react';
import { MapPin, Camera, Mountain, Anchor, Waves, Clock, Car, Plane, Ship, Star } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { useNavigate, useParams } from 'react-router-dom';

const Location = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();

  useEffect(() => {
    document.title = `${t('locationPage.title')} | Borak Apartments`;
    window.scrollTo(0, 0);
  }, [t]);

  const handleBookingNavigation = () => {
    navigate(`/${lang || 'en'}/apartments`);
  };

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[70vh] bg-gradient-to-br from-[#0C1930] via-[#0077B6] to-[#20425C] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: "url('/lovable-uploads/hero-brac-1.jpeg')",
              filter: 'brightness(0.7)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C1930]/80 via-transparent to-[#0C1930]/40" />
          
          <div className="relative z-10 container-luxury h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-playfair animate-fade-in">
                {t('locationPage.hero.title')}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed font-app animate-fade-in">
                {t('locationPage.hero.subtitle')}
              </p>
              <Button 
                onClick={handleBookingNavigation}
                className="bg-[#FFBE24] hover:bg-[#0077B6] text-[#0C1930] hover:text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 animate-fade-in"
              >
                {t('locationPage.hero.cta')}
              </Button>
            </div>
          </div>
        </section>

        {/* About Brač Island */}
        <section className="section-padding bg-white">
          <div className="container-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#0C1930] mb-6 font-playfair">
                  {t('locationPage.about.title')}
                </h2>
                <p className="text-lg text-[#20425C] mb-6 leading-relaxed font-app">
                  {t('locationPage.about.description1')}
                </p>
                <p className="text-lg text-[#20425C] mb-8 leading-relaxed font-app">
                  {t('locationPage.about.description2')}
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#0077B6] mb-2 font-playfair">48km</div>
                    <div className="text-[#20425C] font-app">{t('locationPage.about.length')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#0077B6] mb-2 font-playfair">14km</div>
                    <div className="text-[#20425C] font-app">{t('locationPage.about.width')}</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="/lovable-uploads/hero-brac-2.jpg" 
                  alt="Brač Island coastline"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Famous Attractions */}
        <section className="section-padding bg-gradient-to-br from-[#F4F9FD] to-[#E8F4F8]">
          <div className="container-luxury">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0C1930] mb-6 font-playfair">
                {t('locationPage.attractions.title')}
              </h2>
              <p className="text-xl text-[#20425C] max-w-3xl mx-auto font-app">
                {t('locationPage.attractions.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Zlatni Rat Beach */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <img 
                  src="/lovable-uploads/hero-brac-3.jpg" 
                  alt="Zlatni Rat Beach"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <Waves className="w-6 h-6 text-[#0077B6] mr-3" />
                    <h3 className="text-xl font-bold text-[#0C1930] font-playfair">
                      {t('locationPage.attractions.zlatniRat.title')}
                    </h3>
                  </div>
                  <p className="text-[#20425C] leading-relaxed font-app">
                    {t('locationPage.attractions.zlatniRat.description')}
                  </p>
                </div>
              </div>

              {/* Vidova Gora */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <img 
                  src="/lovable-uploads/hero-brac-4.jpg" 
                  alt="Vidova Gora"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <Mountain className="w-6 h-6 text-[#0077B6] mr-3" />
                    <h3 className="text-xl font-bold text-[#0C1930] font-playfair">
                      {t('locationPage.attractions.vidovaGora.title')}
                    </h3>
                  </div>
                  <p className="text-[#20425C] leading-relaxed font-app">
                    {t('locationPage.attractions.vidovaGora.description')}
                  </p>
                </div>
              </div>

              {/* Stone Quarries */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <img 
                  src="/lovable-uploads/hero-brac-5.jpg" 
                  alt="Stone Quarries"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <Star className="w-6 h-6 text-[#0077B6] mr-3" />
                    <h3 className="text-xl font-bold text-[#0C1930] font-playfair">
                      {t('locationPage.attractions.stoneQuarries.title')}
                    </h3>
                  </div>
                  <p className="text-[#20425C] leading-relaxed font-app">
                    {t('locationPage.attractions.stoneQuarries.description')}
                  </p>
                </div>
              </div>

              {/* Bol Town */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <Anchor className="w-6 h-6 text-[#0077B6] mr-3" />
                    <h3 className="text-xl font-bold text-[#0C1930] font-playfair">
                      {t('locationPage.attractions.bol.title')}
                    </h3>
                  </div>
                  <p className="text-[#20425C] leading-relaxed font-app">
                    {t('locationPage.attractions.bol.description')}
                  </p>
                </div>
              </div>

              {/* Supetar */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <MapPin className="w-6 h-6 text-[#0077B6] mr-3" />
                    <h3 className="text-xl font-bold text-[#0C1930] font-playfair">
                      {t('locationPage.attractions.supetar.title')}
                    </h3>
                  </div>
                  <p className="text-[#20425C] leading-relaxed font-app">
                    {t('locationPage.attractions.supetar.description')}
                  </p>
                </div>
              </div>

              {/* Traditional Villages */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <Clock className="w-6 h-6 text-[#0077B6] mr-3" />
                    <h3 className="text-xl font-bold text-[#0C1930] font-playfair">
                      {t('locationPage.attractions.villages.title')}
                    </h3>
                  </div>
                  <p className="text-[#20425C] leading-relaxed font-app">
                    {t('locationPage.attractions.villages.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Activities & Experiences */}
        <section className="section-padding bg-white">
          <div className="container-luxury">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0C1930] mb-6 font-playfair">
                {t('locationPage.activities.title')}
              </h2>
              <p className="text-xl text-[#20425C] max-w-3xl mx-auto font-app">
                {t('locationPage.activities.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-[#0C1930] mb-4 font-playfair">
                  {t('locationPage.activities.waterSports.title')}
                </h3>
                <p className="text-[#20425C] mb-6 leading-relaxed font-app">
                  {t('locationPage.activities.waterSports.description')}
                </p>

                <h3 className="text-2xl font-bold text-[#0C1930] mb-4 font-playfair">
                  {t('locationPage.activities.hiking.title')}
                </h3>
                <p className="text-[#20425C] mb-6 leading-relaxed font-app">
                  {t('locationPage.activities.hiking.description')}
                </p>

                <h3 className="text-2xl font-bold text-[#0C1930] mb-4 font-playfair">
                  {t('locationPage.activities.culture.title')}
                </h3>
                <p className="text-[#20425C] leading-relaxed font-app">
                  {t('locationPage.activities.culture.description')}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#0C1930] mb-4 font-playfair">
                  {t('locationPage.activities.localProducts.title')}
                </h3>
                <p className="text-[#20425C] mb-6 leading-relaxed font-app">
                  {t('locationPage.activities.localProducts.description')}
                </p>

                <h3 className="text-2xl font-bold text-[#0C1930] mb-4 font-playfair">
                  {t('locationPage.activities.beachLife.title')}
                </h3>
                <p className="text-[#20425C] leading-relaxed font-app">
                  {t('locationPage.activities.beachLife.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Getting There */}
        <section className="section-padding bg-[#0C1930] text-white">
          <div className="container-luxury">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
                {t('locationPage.gettingThere.title')}
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto font-app">
                {t('locationPage.gettingThere.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Ship className="w-12 h-12 text-[#FFBE24] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 font-playfair">
                  {t('locationPage.gettingThere.ferry.title')}
                </h3>
                <p className="text-white/80 leading-relaxed font-app">
                  {t('locationPage.gettingThere.ferry.description')}
                </p>
              </div>

              <div className="text-center">
                <Plane className="w-12 h-12 text-[#FFBE24] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 font-playfair">
                  {t('locationPage.gettingThere.airport.title')}
                </h3>
                <p className="text-white/80 leading-relaxed font-app">
                  {t('locationPage.gettingThere.airport.description')}
                </p>
              </div>

              <div className="text-center">
                <Car className="w-12 h-12 text-[#FFBE24] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 font-playfair">
                  {t('locationPage.gettingThere.carFerry.title')}
                </h3>
                <p className="text-white/80 leading-relaxed font-app">
                  {t('locationPage.gettingThere.carFerry.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Local Culture & Call to Action */}
        <section className="section-padding bg-gradient-to-br from-[#F4F9FD] to-white">
          <div className="container-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#0C1930] mb-6 font-playfair">
                  {t('locationPage.culture.title')}
                </h2>
                <p className="text-lg text-[#20425C] mb-6 leading-relaxed font-app">
                  {t('locationPage.culture.description1')}
                </p>
                <p className="text-lg text-[#20425C] mb-8 leading-relaxed font-app">
                  {t('locationPage.culture.description2')}
                </p>
                
                <Button 
                  onClick={handleBookingNavigation}
                  className="bg-[#0077B6] hover:bg-[#FFBE24] text-white hover:text-[#0C1930] px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
                >
                  {t('locationPage.culture.cta')}
                </Button>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-[#0C1930] mb-6 font-playfair text-center">
                  {t('locationPage.whyChoose.title')}
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#0077B6] rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <span className="text-[#20425C] font-app">{t('locationPage.whyChoose.reason1')}</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#0077B6] rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <span className="text-[#20425C] font-app">{t('locationPage.whyChoose.reason2')}</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#0077B6] rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <span className="text-[#20425C] font-app">{t('locationPage.whyChoose.reason3')}</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#0077B6] rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <span className="text-[#20425C] font-app">{t('locationPage.whyChoose.reason4')}</span>
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

export default Location;