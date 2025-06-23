
const Footer = () => {
  return (
    <footer className="bg-[#0c1930] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <img 
              src="/lovable-uploads/caaa6a44-547d-4ce5-9557-e33e5ed23016.png" 
              alt="Borak Apartmani Logo" 
              className="h-20 w-auto mb-4"
              width="320"
              height="80"
            />
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Doživite lepotu hrvatskog primorja sa našim luksuznim apartmanima uz more. 
              Probudite se uz prekrasan pogled na Jadransko more i stvorite nezaboravne uspomene.
            </p>
            <div className="text-sm text-gray-400">
              Napravljeno sa{' '}
              <a href="https://lovable.dev" className="text-[#ffbe24] hover:underline">
                Lovable
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
            <div className="space-y-3 text-gray-300">
              <div>
                <div className="font-medium">Adresa</div>
                <div className="text-sm">Supetar, Ostrvo Brač</div>
                <div className="text-sm">21400, Hrvatska</div>
              </div>
              <div>
                <div className="font-medium">Telefon</div>
                <a 
                  href="tel:+385123456789" 
                  className="text-sm hover:text-[#ffbe24] transition-colors focus-visible:outline-2 focus-visible:outline-[#ffbe24]"
                >
                  +385 12 345 6789
                </a>
              </div>
              <div>
                <div className="font-medium">Email</div>
                <a 
                  href="mailto:info@borakapartmani.com" 
                  className="text-sm hover:text-[#ffbe24] transition-colors focus-visible:outline-2 focus-visible:outline-[#ffbe24]"
                >
                  info@borakapartmani.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Brzi linkovi</h4>
            <div className="space-y-2">
              <a 
                href="#apartments" 
                className="block text-gray-300 hover:text-[#ffbe24] transition-colors text-sm focus-visible:outline-2 focus-visible:outline-[#ffbe24]"
              >
                Naši apartmani
              </a>
              <a 
                href="#location" 
                className="block text-gray-300 hover:text-[#ffbe24] transition-colors text-sm focus-visible:outline-2 focus-visible:outline-[#ffbe24]"
              >
                Lokacija
              </a>
              <a 
                href="#testimonials" 
                className="block text-gray-300 hover:text-[#ffbe24] transition-colors text-sm focus-visible:outline-2 focus-visible:outline-[#ffbe24]"
              >
                Recenzije
              </a>
              <a 
                href="https://wa.me/385123456789" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors text-sm mt-4 focus-visible:outline-2 focus-visible:outline-[#ffbe24]"
                aria-label="Kontakt preko WhatsApp"
              >
                <span>📱</span>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Borak Apartmani. Sva prava zadržana.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
