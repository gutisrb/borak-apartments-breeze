
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    name: 'Maria & Stefan',
    location: 'Munich, Germany',
    rating: 5,
    text: 'An absolutely extraordinary experience. The apartment exceeded every expectation with its impeccable design and stunning sea views. The attention to detail and level of service made this our most memorable vacation. We are already planning our return.',
    image: '👨‍👩‍👧‍👦'
  },
  {
    id: 2,
    name: 'James Wilson',
    location: 'London, United Kingdom',
    rating: 5,
    text: 'Pure luxury from the moment we arrived. The apartment was a masterpiece of elegant design, and the panoramic views were simply breathtaking. Every amenity was thoughtfully curated. This is what five-star hospitality should be.',
    image: '👨'
  },
  {
    id: 3,
    name: 'Emma & Luca',
    location: 'Milan, Italy',
    rating: 5,
    text: 'A hidden gem that redefined our understanding of luxury travel. The sophisticated design, prime location, and exceptional service created an unforgettable retreat. Borak Apartments sets the gold standard for premium accommodations.',
    image: '👩‍❤️‍👨'
  }
];

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section id="testimonials" className="section-padding bg-luxury-off-white">
      <div className="container-luxury">
        <div className="text-center mb-20">
          <h2 className="mb-6 animate-fade-in">
            What Our Guests Say
          </h2>
          <p className="text-lg md:text-xl text-luxury-charcoal/80 max-w-3xl mx-auto font-lato leading-relaxed animate-fade-in">
            Testimonials from discerning travelers who have experienced our luxury retreats
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className="p-8 md:p-12 text-center bg-white border-luxury-beige/50 shadow-xl">
                    <div className="text-6xl md:text-7xl mb-8">{testimonial.image}</div>
                    
                    <div className="flex justify-center mb-8">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-luxury-teal text-2xl">★</span>
                      ))}
                    </div>
                    
                    <blockquote className="text-lg md:text-xl text-luxury-charcoal/80 mb-8 italic leading-relaxed font-lato max-w-3xl mx-auto">
                      "{testimonial.text}"
                    </blockquote>
                    
                    <div className="font-playfair text-xl md:text-2xl font-medium text-luxury-charcoal mb-2">
                      {testimonial.name}
                    </div>
                    <div className="text-luxury-charcoal/60 font-lato">
                      {testimonial.location}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <Button
            onClick={prevTestimonial}
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-white shadow-xl border-luxury-beige hover:bg-luxury-teal hover:text-white hover:border-luxury-teal w-12 h-12"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            onClick={nextTestimonial}
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-white shadow-xl border-luxury-beige hover:bg-luxury-teal hover:text-white hover:border-luxury-teal w-12 h-12"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Indicators */}
          <div className="flex justify-center mt-12 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentTestimonial ? 'bg-luxury-teal' : 'bg-luxury-beige'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
