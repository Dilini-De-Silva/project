import React, { useEffect, useRef } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'

interface TamilInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  rows?: number
  type?: 'input' | 'textarea'
  disabled?: boolean
  required?: boolean
  id?: string
  name?: string
}

export function TamilInput({
  value,
  onChange,
  placeholder = '',
  className = '',
  rows = 3,
  type = 'input',
  disabled = false,
  required = false,
  id,
  name
}: TamilInputProps) {
  const { language } = useLanguage()
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => {
    // Initialize Tamil input method for Tamil users
    if (language === 'ta' && inputRef.current) {
      // Add Tamil-specific attributes and classes
      inputRef.current.setAttribute('data-tamil-input', 'true')
      inputRef.current.setAttribute('data-language', 'tamil')
      inputRef.current.setAttribute('lang', 'ta')
      
      // Add Tamil CSS class for styling
      inputRef.current.classList.add('tamil-input')
      
      // Initialize Tamil input method if available
      if (window.TamilInput) {
        window.TamilInput.init(inputRef.current)
      }

      // Add event listeners for Tamil typing
      const handleKeyDown = (e: KeyboardEvent) => {
        if (language === 'ta') {
          // Enable Tamil transliteration
          handleTamilTransliteration(e)
        }
      }

      inputRef.current.addEventListener('keydown', handleKeyDown)
      
      return () => {
        if (inputRef.current) {
          inputRef.current.removeEventListener('keydown', handleKeyDown)
        }
      }
    } else if (inputRef.current) {
      // Remove Tamil attributes for other languages
      inputRef.current.removeAttribute('data-tamil-input')
      inputRef.current.removeAttribute('data-language')
      inputRef.current.classList.remove('tamil-input')
    }
  }, [language])

  const handleTamilTransliteration = (e: KeyboardEvent) => {
    // Basic Tamil transliteration mapping
    const tamilMap: { [key: string]: string } = {
      'a': 'அ', 'aa': 'ஆ', 'i': 'இ', 'ii': 'ஈ', 'u': 'உ', 'uu': 'ஊ',
      'e': 'எ', 'ee': 'ஏ', 'ai': 'ஐ', 'o': 'ஒ', 'oo': 'ஓ', 'au': 'ஔ',
      'ka': 'க', 'nga': 'ங', 'cha': 'ச', 'ja': 'ஜ', 'nya': 'ஞ',
      'ta': 'த', 'na': 'ன', 'pa': 'ப', 'ma': 'ம', 'ya': 'ய',
      'ra': 'ர', 'la': 'ல', 'va': 'வ', 'zha': 'ழ', 'sha': 'ஷ',
      'sa': 'ஸ', 'ha': 'ஹ'
    }

    // This is a simplified implementation - in production, you'd use a proper Tamil input library
    if (e.ctrlKey && e.key === ' ') {
      e.preventDefault()
      // Toggle Tamil input mode
    }
  }

  const baseClassName = `w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
    language === 'ta' ? 'font-tamil' : ''
  } ${className}`

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  if (type === 'textarea') {
    return (
      <div className="relative">
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`${baseClassName} resize-none`}
          rows={rows}
          disabled={disabled}
          required={required}
          id={id}
          name={name}
          lang={language === 'ta' ? 'ta' : undefined}
        />
        {language === 'ta' && (
          <div className="absolute top-2 right-2">
            <span className="text-xs text-gray-400 bg-white px-2 py-1 rounded border">
              தமிழ்
            </span>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative">
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={baseClassName}
        disabled={disabled}
        required={required}
        id={id}
        name={name}
        lang={language === 'ta' ? 'ta' : undefined}
      />
      {language === 'ta' && (
        <div className="absolute top-2 right-2">
          <span className="text-xs text-gray-400 bg-white px-2 py-1 rounded border">
            தமிழ்
          </span>
        </div>
      )}
    </div>
  )
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    TamilInput?: {
      init: (element: HTMLElement) => void
      enable: () => void
      disable: () => void
    }
  }
}