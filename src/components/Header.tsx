
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useState, useEffect } from 'react'
import { useTranslation } from '@/hooks/useTranslation'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { t, changeLanguage, currentLang } = useTranslation()

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

  const languages = [
    { code: 'sr', label: '🇷🇸 Srpski' },
    { code: 'hr', label: '🇭🇷 Hrvatski' },
    { code: 'de', label: '🇩🇪 Deutsch' },
    { code: 'en', label: '🇬🇧 English' },
    { code: 'ru', label: '🇷🇺 Русский' }
  ]

  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-surface/95 backdrop-blur-lg shadow-lg border-b border-mist' 
        : 'bg-transparent'
    }`}>
      <nav className="container-luxury py-4 md:py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/image-1"
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
              className="text-primary hover:text-highlight transition-colors font-app font-medium"
            >
              {t('nav.home')}
            </button>
            <button 
              onClick={() => scrollToSection('apartments')}
              className="text-primary hover:text-highlight transition-colors font-app font-medium"
            >
              {t('nav.apartments')}
            </button>
            <button 
              onClick={() => scrollToSection('location')}
              className="text-primary hover:text-highlight transition-colors font-app font-medium"
            >
              {t('nav.location')}
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-primary hover:text-highlight transition-colors font-app font-medium"
            >
              {t('nav.contact')}
            </button>
            
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="font-app">
                  {currentLanguage.label.split(' ')[0]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="cursor-pointer font-app"
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button
              onClick={() => scrollToSection('apartments')}
              className="bg-accent text-primary hover:bg-highlight hover:text-white transition font-app text-sm md:text-base"
            >
              {t('nav.book')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Language Switcher Mobile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="font-app">
                  {currentLanguage.label.split(' ')[0]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="cursor-pointer font-app"
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button
              onClick={() => scrollToSection('apartments')}
              className="bg-accent text-primary hover:bg-highlight hover:text-white transition font-app text-sm"
            >
              {t('nav.book')}
            </Button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
