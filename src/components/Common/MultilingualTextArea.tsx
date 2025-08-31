import React from 'react'
import { MultilingualInput } from './MultilingualInput'

interface MultilingualTextAreaProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  rows?: number
  disabled?: boolean
  required?: boolean
  id?: string
  name?: string
}

export function MultilingualTextArea(props: MultilingualTextAreaProps) {
  return <MultilingualInput {...props} type="textarea" />
}