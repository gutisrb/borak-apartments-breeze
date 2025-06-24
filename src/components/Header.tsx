
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useState, useEffect } from 'react'
import { useTranslation } from '@/hooks/useTranslation'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { t, changeLanguage, currentLang } = useTranslation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
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
        ? 'bg-primary shadow-lg' 
        : 'bg-transparent'
    }`}>
      <nav className="container-luxury py-4 md:py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/fec2f2f3-2d79-4151-9021-a847d7bfe9ff.png"
              alt="Borak Apartments - Luxury Croatian Retreat" 
              className="h-8 w-auto"
              width="240"
              height="32"
            />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-white hover:text-accent transition-colors font-app font-medium focus-visible:ring-accent"
            >
              {t('nav.home')}
            </button>
            <button 
              onClick={() => scrollToSection('apartments')}
              className="text-white hover:text-accent transition-colors font-app font-medium focus-visible:ring-accent"
            >
              {t('nav.apartments')}
            </button>
            <button 
              onClick={() => scrollToSection('location')}
              className="text-white hover:text-accent transition-colors font-app font-medium focus-visible:ring-accent"
            >
              {t('nav.location')}
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-accent transition-colors font-app font-medium focus-visible:ring-accent"
            >
              {t('nav.contact')}
            </button>
            
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="font-app text-white hover:text-accent">
                  {currentLanguage.label.split(' ')[0]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-surface border-secondary">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="cursor-pointer font-app hover:bg-mist focus:ring-link"
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button
              onClick={() => scrollToSection('apartments')}
              className="bg-link text-white hover:bg-accent hover:text-primary transition font-app text-sm md:text-base focus-visible:ring-link"
            >
              {t('nav.book')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Language Switcher Mobile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="font-app text-white hover:text-accent">
                  {currentLanguage.label.split(' ')[0]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-surface border-secondary">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="cursor-pointer font-app hover:bg-mist focus:ring-link"
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button
              onClick={() => scrollToSection('apartments')}
              className="bg-link text-white hover:bg-accent hover:text-primary transition font-app text-sm focus-visible:ring-link"
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
