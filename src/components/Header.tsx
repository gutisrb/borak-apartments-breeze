
import { Button } from '@/components/ui/button'

const Header = () => {
  const scrollToApartments = () => {
    const apartmentsSection = document.getElementById('apartments')
    if (apartmentsSection) {
      apartmentsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <nav aria-label="Primary" className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/caaa6a44-547d-4ce5-9557-e33e5ed23016.png" 
            alt="Borak Apartmani Logo" 
            className="h-10 w-auto"
            width="160"
            height="40"
          />
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <a href="#apartments" className="text-[#0c1930] hover:text-[#ffbe24] transition-colors">
            Apartmani
          </a>
          <a href="#location" className="text-[#0c1930] hover:text-[#ffbe24] transition-colors">
            Lokacija
          </a>
          <a href="#testimonials" className="text-[#0c1930] hover:text-[#ffbe24] transition-colors">
            Recenzije
          </a>
          <Button
            onClick={scrollToApartments}
            className="bg-[#ffbe24] hover:bg-[#ffbe24]/90 text-[#0c1930] font-semibold"
          >
            Rezerviši
          </Button>
        </div>
      </nav>
    </header>
  )
}

export default Header
