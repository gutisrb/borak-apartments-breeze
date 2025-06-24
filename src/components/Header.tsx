
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-luxury-off-white/95 backdrop-blur-lg shadow-lg border-b border-luxury-beige/20' 
        : 'bg-transparent'
    }`}>
      <nav className="container-luxury py-4 md:py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/caaa6a44-547d-4ce5-9557-e33e5ed23016.png" 
              alt="Borak Apartments - Luxury Croatian Retreat" 
              className="h-12 md:h-16 w-auto"
              width="240"
              height="64"
            />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-luxury-charcoal hover:text-luxury-teal transition-colors font-lato font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('apartments')}
              className="text-luxury-charcoal hover:text-luxury-teal transition-colors font-lato font-medium"
            >
              The Apartments
            </button>
            <button 
              onClick={() => scrollToSection('location')}
              className="text-luxury-charcoal hover:text-luxury-teal transition-colors font-lato font-medium"
            >
              Our Location
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-luxury-charcoal hover:text-luxury-teal transition-colors font-lato font-medium"
            >
              Contact
            </button>
            <Button
              onClick={() => scrollToSection('apartments')}
              className="luxury-button text-sm md:text-base"
            >
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              onClick={() => scrollToSection('apartments')}
              className="luxury-button text-sm"
            >
              Book Now
            </Button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
