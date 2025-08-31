import React, { useEffect, useRef } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'

interface HelakuruInputProps {
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

export function HelakuruInput({
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
}: HelakuruInputProps) {
  const { language } = useLanguage()
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => {
    // Initialize Helakuru for Sinhala users
    if (language === 'si' && inputRef.current) {
      // Add Helakuru-specific attributes and classes
      inputRef.current.setAttribute('data-helakuru', 'true')
      inputRef.current.setAttribute('data-language', 'sinhala')
      
      // Add Helakuru CSS class for styling
      inputRef.current.classList.add('helakuru-input')
      
      // Initialize Helakuru if available
      if (window.Helakuru) {
        window.Helakuru.init(inputRef.current)
      }
    } else if (inputRef.current) {
      // Remove Helakuru attributes for other languages
      inputRef.current.removeAttribute('data-helakuru')
      inputRef.current.removeAttribute('data-language')
      inputRef.current.classList.remove('helakuru-input')
    }
  }, [language])

  const baseClassName = `w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
    language === 'si' ? 'font-sinhala' : ''
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
        />
        {language === 'si' && (
          <div className="absolute top-2 right-2">
            <span className="text-xs text-gray-400 bg-white px-2 py-1 rounded border">
              හෙළකුරු
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
      />
      {language === 'si' && (
        <div className="absolute top-2 right-2">
          <span className="text-xs text-gray-400 bg-white px-2 py-1 rounded border">
            හෙළකුරු
          </span>
        </div>
      )}
    </div>
  )
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    Helakuru?: {
      init: (element: HTMLElement) => void
      enable: () => void
      disable: () => void
    }
  }
}