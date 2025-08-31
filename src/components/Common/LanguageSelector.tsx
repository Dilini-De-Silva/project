import React from 'react'
import { useEffect } from 'react'
import { Globe } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

interface LanguageSelectorProps {
  className?: string
  showLabel?: boolean
}

export function LanguageSelector({ className = '', showLabel = true }: LanguageSelectorProps) {
  const { language, setLanguage, t } = useLanguage()
  
  useEffect(() => {
    // Initialize appropriate input method based on language
    if (language === 'si' && window.Helakuru) {
      window.Helakuru.enable()
    } else if (language === 'ta' && window.TamilInput) {
      window.TamilInput.enable()
    } else if (window.Helakuru) {
      window.Helakuru.disable()
      if (window.TamilInput) {
        window.TamilInput.disable()
      }
    }
  }, [language])

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'si', name: 'Sinhala', nativeName: 'සිංහල' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' }
  ]

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {showLabel && <Globe className="h-4 w-4 text-gray-500" />}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'en' | 'si' | 'ta')}
        className={`bg-transparent border-none text-sm font-medium text-gray-700 focus:outline-none focus:ring-0 cursor-pointer ${
          language === 'si' ? 'font-sinhala' : language === 'ta' ? 'font-tamil' : ''
        }`}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeName}
          </option>
        ))}
      </select>
    </div>
  )
}