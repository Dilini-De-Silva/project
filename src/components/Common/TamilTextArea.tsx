import React from 'react'
import { TamilInput } from './TamilInput'

interface TamilTextAreaProps {
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

export function TamilTextArea(props: TamilTextAreaProps) {
  return <TamilInput {...props} type="textarea" />
}