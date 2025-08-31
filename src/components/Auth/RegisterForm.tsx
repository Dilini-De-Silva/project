import React, { useState } from 'react'
import { Shield, Eye, EyeOff, AlertCircle, Check, ArrowLeft } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { LanguageSelector } from '../Common/LanguageSelector'

interface RegisterFormProps {
  onToggleForm: () => void
  onBack: () => void
}

export function RegisterForm({ onToggleForm, onBack }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const { t } = useLanguage()
  
  const { signUp } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    const { error } = await signUp(formData.email, formData.password, {
      full_name: formData.fullName,
      role: formData.role
    })
    
    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }
    
    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('auth.account_created')}</h2>
            <p className="text-gray-600 mb-6">{t('auth.account_created_message')}</p>
            <button
              onClick={onToggleForm}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200"
            >
              {t('auth.continue_to_signin')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 flex items-center justify-center p-2 sm:p-4">
      <div className="max-w-md w-full">
        {/* Back Button and Language Selector */}
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-purple-600 transition-colors min-h-[44px] p-2"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base">Back to Home</span>
          </button>
          <LanguageSelector />
        </div>
        
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
          {/* Logo and Title */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <div className="h-12 w-12 sm:h-16 sm:w-16 bg-purple-600 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Join Our Community</h1>
            <p className="text-gray-600 text-sm sm:text-base">{t('auth.create_account')}</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 flex-shrink-0" />
              <span className="text-red-700 text-xs sm:text-sm">{error}</span>
            </div>
          )}

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                {t('auth.full_name')}
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-base"
                placeholder={t('auth.enter_full_name')}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                {t('auth.email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-base"
                placeholder={t('auth.enter_email')}
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                {t('auth.role')}
              </label>
              <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 mb-3">
                <span className="text-gray-900">{t('role.user')}</span>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800 mb-2">
                  Need law enforcement or moderator access?
                </p>
                <button
                  type="button"
                  onClick={() => window.open('mailto:support@safeher.lk?subject=Special Role Access Request&body=Please provide:%0A- Full Name:%0A- Role Requested (Law Enforcement/Moderator):%0A- Organization/Department:%0A- Badge Number (if law enforcement):%0A- Reason for access:%0A- Contact phone number:', '_blank')}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-xs font-medium transition-all duration-200"
                >
                  Contact Support
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                {t('auth.password')}
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 pr-12 text-base"
                  placeholder={t('auth.create_password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                {t('auth.confirm_password')}
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 pr-12 text-base"
                  placeholder={t('auth.confirm_password_placeholder')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 sm:py-4 px-4 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] min-h-[48px] text-base"
            >
              {loading ? t('auth.creating_account') : t('action.sign_up')}
            </button>
          </form>

          {/* Toggle to Login */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-gray-600 text-sm sm:text-base">
              {t('auth.already_have_account')}{' '}
              <button
                onClick={onToggleForm}
                className="text-purple-600 hover:text-purple-700 font-semibold transition-colors min-h-[44px] p-1"
              >
                {t('action.sign_in')}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}