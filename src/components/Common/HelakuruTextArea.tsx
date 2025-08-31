import React from 'react'
import { HelakuruInput } from './HelakuruInput'

interface HelakuruTextAreaProps {
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

export function HelakuruTextArea(props: HelakuruTextAreaProps) {
  return <HelakuruInput {...props} type="textarea" />
}