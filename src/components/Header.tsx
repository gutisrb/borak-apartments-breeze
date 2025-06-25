
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
        ? 'bg-[#0C1930] shadow-lg' 
        : 'bg-transparent'
    }`}>
      <nav className="container-luxury py-4 md:py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/78e39d31-bdab-49bd-ae91-bdbe2143b966.png"
              alt="Borak Apartments - Luxury Croatian Retreat" 
              className="h-16 md:h-20 w-36 md:w-40 object-contain"
              width="160"
              height="80"
            />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-white hover:text-[#FFBE24] transition-colors font-app font-medium"
            >
              {t('nav.home')}
            </button>
            <button 
              onClick={() => scrollToSection('apartments')}
              className="text-white hover:text-[#FFBE24] transition-colors font-app font-medium"
            >
              {t('nav.apartments')}
            </button>
            <button 
              onClick={() => scrollToSection('location')}
              className="text-white hover:text-[#FFBE24] transition-colors font-app font-medium"
            >
              {t('nav.location')}
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-[#FFBE24] transition-colors font-app font-medium"
            >
              {t('nav.contact')}
            </button>
            
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="font-app text-white hover:text-[#FFBE24]">
                  {currentLanguage.label.split(' ')[0]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border-[#20425C] z-[60]">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="cursor-pointer font-app hover:bg-[#F4F9FD]"
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button
              onClick={() => scrollToSection('apartments')}
              className="bg-[#0077B6] text-white hover:bg-[#FFBE24] hover:text-[#0C1930] transition font-app text-sm md:text-base"
            >
              {t('nav.book')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Language Switcher Mobile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="font-app text-white hover:text-[#FFBE24]">
                  {currentLanguage.label.split(' ')[0]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border-[#20425C] z-[60]">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="cursor-pointer font-app hover:bg-[#F4F9FD]"
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button
              onClick={() => scrollToSection('apartments')}
              className="bg-[#0077B6] text-white hover:bg-[#FFBE24] hover:text-[#0C1930] transition font-app text-sm"
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
