
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    name: 'Maria & Stefan',
    location: 'Germany',
    rating: 5,
    text: 'Absolutely perfect location with stunning sea views! The apartment was immaculate and the hosts were incredibly welcoming. We will definitely return next summer.',
    image: '👨‍👩‍👧‍👦'
  },
  {
    id: 2,
    name: 'James Wilson',
    location: 'United Kingdom',
    rating: 5,
    text: 'Best vacation rental we have ever stayed in. The kitchen was fully equipped, the balcony views were breathtaking, and being so close to the beach was perfect.',
    image: '👨'
  },
  {
    id: 3,
    name: 'Emma & Luca',
    location: 'Italy',
    rating: 5,
    text: 'A hidden gem on Brač! The apartment exceeded our expectations in every way. Clean, comfortable, and the location is unbeatable. Highly recommended!',
    image: '👩‍❤️‍👨'
  }
];

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

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
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0c1930] mb-4">
            What Our Guests Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real experiences from guests who have stayed at Borak Apartmani
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className="p-8 text-center shadow-lg">
                    <div className="text-6xl mb-6">{testimonial.image}</div>
                    
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-[#ffbe24] text-xl">★</span>
                      ))}
                    </div>
                    
                    <blockquote className="text-lg text-gray-700 mb-6 italic leading-relaxed">
                      "{testimonial.text}"
                    </blockquote>
                    
                    <div className="font-semibold text-[#0c1930]">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-600 text-sm">
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
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            onClick={nextTestimonial}
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-[#ffbe24]' : 'bg-gray-300'
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
