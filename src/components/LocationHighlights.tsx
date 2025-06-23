
const LocationHighlights = () => {
  const highlights = [
    { icon: '🏖️', text: 'Beach distance: 150m', description: 'Crystal clear Adriatic waters' },
    { icon: '🚶', text: 'Old-town promenade: 5 min walk', description: 'Historic charm and local restaurants' },
    { icon: '🚗', text: 'Free parking included', description: 'Secure on-site parking' },
    { icon: '✈️', text: 'Airport transfer on request', description: 'Convenient arrival and departure' }
  ];

  const locationImages = [
    '/lovable-uploads/0ed2d36a-7632-4869-ac20-e95064f4a508.png',
    '/lovable-uploads/a412065e-92e3-4725-b7a6-e1b9fe814b20.png',
    '/lovable-uploads/bf0e5e79-170a-4134-8bd6-c4b40d0b7277.png'
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0c1930] mb-6">
              Perfect Location on Brač Island
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Experience the best of Croatian coastal living with unparalleled access to pristine beaches, 
              historic sites, and authentic Mediterranean culture.
            </p>
            
            <div className="space-y-6">
              {highlights.map((highlight, index) => (
                <div 
                  key={index} 
                  className="flex items-start space-x-4 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-2xl">{highlight.icon}</div>
                  <div>
                    <div className="font-semibold text-[#0c1930] mb-1">
                      {highlight.text}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {highlight.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Mosaic */}
          <div className="grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="space-y-4">
              <img
                src={locationImages[0]}
                alt="Stunning coastal view with traditional stone houses"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
                loading="lazy"
              />
              <img
                src={locationImages[1]}
                alt="Beautiful beach with crystal clear waters"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
            <div className="mt-8">
              <img
                src={locationImages[2]}
                alt="Scenic beach view with mountains in background"
                className="w-full h-80 object-cover rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationHighlights;
