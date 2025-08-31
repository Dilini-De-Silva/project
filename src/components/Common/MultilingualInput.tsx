import React from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { HelakuruInput } from './HelakuruInput'
import { TamilInput } from './TamilInput'

interface MultilingualInputProps {
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

export function MultilingualInput(props: MultilingualInputProps) {
  const { language } = useLanguage()

  // Use appropriate input component based on language
  if (language === 'si') {
    return <HelakuruInput {...props} />
  } else if (language === 'ta') {
    return <TamilInput {...props} />
  } else {
    // Default English input
    const {
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
    } = props

    const baseClassName = `w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${className}`

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange(e.target.value)
    }

    if (type === 'textarea') {
      return (
        <textarea
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
      )
    }

    return (
      <input
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
    )
  }
}