
const Footer = () => {
  return (
    <footer id="contact" className="bg-luxury-charcoal text-luxury-off-white section-padding">
      <div className="container-luxury">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <img 
              src="/lovable-uploads/caaa6a44-547d-4ce5-9557-e33e5ed23016.png" 
              alt="Borak Apartments - Luxury Croatian Retreat" 
              className="h-20 md:h-24 w-auto mb-6 filter brightness-0 invert"
              width="320"
              height="96"
            />
            <p className="text-luxury-off-white/80 mb-8 leading-relaxed max-w-md font-lato text-lg">
              Experience the epitome of Croatian coastal luxury. Our exclusive collection of apartments 
              offers discerning travelers an unparalleled retreat where Mediterranean elegance meets 
              modern sophistication.
            </p>
            <div className="text-sm text-luxury-off-white/60 font-lato">
              Crafted with excellence by{' '}
              <a href="https://lovable.dev" className="text-luxury-teal hover:text-luxury-teal/80 transition-colors">
                Lovable
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-xl font-playfair font-medium mb-6 text-luxury-off-white">Contact</h4>
            <div className="space-y-4 text-luxury-off-white/80 font-lato">
              <div>
                <div className="font-medium text-luxury-off-white mb-1">Address</div>
                <div className="text-sm leading-relaxed">
                  Supetar, Island of Brač<br />
                  21400, Croatia
                </div>
              </div>
              <div>
                <div className="font-medium text-luxury-off-white mb-1">Phone</div>
                <a 
                  href="tel:+385123456789" 
                  className="text-sm hover:text-luxury-teal transition-colors"
                >
                  +385 12 345 6789
                </a>
              </div>
              <div>
                <div className="font-medium text-luxury-off-white mb-1">Email</div>
                <a 
                  href="mailto:reservations@borakapartments.com" 
                  className="text-sm hover:text-luxury-teal transition-colors"
                >
                  reservations@borakapartments.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links & Social */}
          <div>
            <h4 className="text-xl font-playfair font-medium mb-6 text-luxury-off-white">Experience</h4>
            <div className="space-y-3 mb-8">
              <a 
                href="#apartments" 
                className="block text-luxury-off-white/80 hover:text-luxury-teal transition-colors text-sm font-lato"
              >
                Luxury Apartments
              </a>
              <a 
                href="#location" 
                className="block text-luxury-off-white/80 hover:text-luxury-teal transition-colors text-sm font-lato"
              >
                Prime Location
              </a>
              <a 
                href="#testimonials" 
                className="block text-luxury-off-white/80 hover:text-luxury-teal transition-colors text-sm font-lato"
              >
                Guest Reviews
              </a>
            </div>
            
            <a 
              href="https://wa.me/385123456789" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-luxury-teal hover:bg-luxury-teal/90 text-luxury-off-white px-6 py-3 rounded-md transition-colors text-sm font-lato font-medium"
              aria-label="Contact via WhatsApp"
            >
              <span>📱</span>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="border-t border-luxury-off-white/20 mt-16 pt-8 text-center text-luxury-off-white/60 text-sm font-lato">
          <p>&copy; 2025 Borak Apartments. All rights reserved. | Luxury Croatian Coastal Retreats</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
