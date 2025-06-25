
import { MapPin, Waves, Sun, Camera } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const LocationHighlights = () => {
  const { t } = useTranslation();

  const highlights = [
    {
      icon: MapPin,
      title: 'Prime Location',
      description: 'Steps away from pristine beaches and crystal-clear waters'
    },
    {
      icon: Waves,
      title: 'Beach Access',
      description: 'Direct access to secluded coves and swimming spots'
    },
    {
      icon: Sun,
      title: 'Year-Round Beauty',
      description: 'Perfect Mediterranean climate with 300+ sunny days'
    },
    {
      icon: Camera,
      title: 'Scenic Views',
      description: 'Breathtaking panoramic views of the Adriatic Sea'
    }
  ];

  return (
    <section id="location" className="section-padding bg-white">
      <div className="container-luxury">
        <div className="text-center mb-20">
          <h2 className="mb-6 animate-fade-in text-[#0C1930] font-playfair">
            {t('location.title')}
          </h2>
          <p className="text-lg md:text-xl text-[#20425C] max-w-3xl mx-auto font-app leading-relaxed animate-fade-in">
            {t('location.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => (
            <div 
              key={index}
              className="text-center group animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F4F9FD] rounded-full mb-6 group-hover:bg-[#FFBE24] transition-colors duration-300">
                <highlight.icon className="w-8 h-8 text-[#0077B6] group-hover:text-[#0C1930] transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-[#0C1930] mb-4 font-playfair">
                {highlight.title}
              </h3>
              <p className="text-[#20425C] leading-relaxed font-app">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-[#F4F9FD] rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-[#0C1930] mb-6 font-playfair">
              Discover Brač Island
            </h3>
            <p className="text-lg text-[#20425C] max-w-4xl mx-auto leading-relaxed font-app">
              Nestled in the heart of the Adriatic, Brač Island offers the perfect blend of natural beauty, 
              rich history, and modern luxury. From the famous Golden Horn beach to ancient stone quarries, 
              every corner of this Croatian paradise tells a story waiting to be discovered.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationHighlights;
