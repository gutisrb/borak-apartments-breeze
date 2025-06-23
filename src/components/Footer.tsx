
const Footer = () => {
  return (
    <footer className="bg-[#0c1930] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Borak Apartmani – Brač</h3>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Experience the beauty of Croatian coast with our luxury seaside apartments. 
              Wake up to stunning Adriatic views and create unforgettable memories.
            </p>
            <div className="text-sm text-gray-400">
              Built with{' '}
              <a href="https://lovable.dev" className="text-[#ffbe24] hover:underline">
                Lovable
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-gray-300">
              <div>
                <div className="font-medium">Address</div>
                <div className="text-sm">Supetar, Island of Brač</div>
                <div className="text-sm">21400, Croatia</div>
              </div>
              <div>
                <div className="font-medium">Phone</div>
                <a href="tel:+385123456789" className="text-sm hover:text-[#ffbe24] transition-colors">
                  +385 12 345 6789
                </a>
              </div>
              <div>
                <div className="font-medium">Email</div>
                <a href="mailto:info@borakapartmani.com" className="text-sm hover:text-[#ffbe24] transition-colors">
                  info@borakapartmani.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#apartments" className="block text-gray-300 hover:text-[#ffbe24] transition-colors text-sm">
                Our Apartments
              </a>
              <a href="#location" className="block text-gray-300 hover:text-[#ffbe24] transition-colors text-sm">
                Location
              </a>
              <a href="#testimonials" className="block text-gray-300 hover:text-[#ffbe24] transition-colors text-sm">
                Reviews
              </a>
              <a 
                href="https://wa.me/385123456789" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors text-sm mt-4"
              >
                <span>📱</span>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 Borak Apartmani. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
