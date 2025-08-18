
import { Star } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      nameKey: "testimonials.sarah.name",
      locationKey: "testimonials.sarah.location", 
      textKey: "testimonials.sarah.text",
      rating: 5
    },
    {
      nameKey: "testimonials.ana.name",
      locationKey: "testimonials.ana.location",
      textKey: "testimonials.ana.text",
      rating: 5
    },
    {
      nameKey: "testimonials.hans.name",
      locationKey: "testimonials.hans.location",
      textKey: "testimonials.hans.text",
      rating: 5
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-bl from-[hsl(var(--accent)/0.08)] via-white to-[hsl(var(--accent)/0.15)]">
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
                "{t(testimonial.textKey)}"
              </p>
              
              <div className="border-t border-[#F4F9FD] pt-6">
                <p className="font-semibold text-[#0C1930] font-app">
                  {t(testimonial.nameKey)}
                </p>
                <p className="text-[#0077B6] text-sm font-app">
                  {t(testimonial.locationKey)}
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
