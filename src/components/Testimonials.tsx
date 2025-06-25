
import { Star } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: "Sarah & Michael Thompson",
      location: "London, UK",
      text: "The most incredible stay we've ever experienced. The apartment was stunning and the views absolutely breathtaking. We'll definitely be back!",
      rating: 5
    },
    {
      name: "Ana & Marko Petković",
      location: "Belgrade, Serbia", 
      text: "Savršeno mesto za odmor! Apartman je bio luksuzan i udoban, a pogled na more nezaboravan. Toplo preporučujemo!",
      rating: 5
    },
    {
      name: "Hans & Greta Mueller",
      location: "Munich, Germany",
      text: "Wunderbare Unterkunft mit atemberaubendem Blick aufs Meer. Alles war perfekt organisiert und sehr sauber. Vielen Dank!",
      rating: 5
    }
  ];

  return (
    <section className="section-padding bg-[#F4F9FD]">
      <div className="container-luxury">
        <div className="text-center mb-20">
          <h2 className="mb-6 animate-fade-in text-[#0C1930] font-playfair">
            {t('testimonials.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#FFBE24] fill-current" />
                ))}
              </div>
              
              <p className="text-[#20425C] leading-relaxed mb-6 font-app italic">
                "{testimonial.text}"
              </p>
              
              <div className="border-t border-[#F4F9FD] pt-6">
                <p className="font-semibold text-[#0C1930] font-app">
                  {testimonial.name}
                </p>
                <p className="text-[#0077B6] text-sm font-app">
                  {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
