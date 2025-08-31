import React, { useState } from 'react'
import { AlertTriangle, MapPin, Eye, EyeOff, CheckCircle } from 'lucide-react'
import { MultilingualInput } from '../Common/MultilingualInput'
import { MultilingualTextArea } from '../Common/MultilingualTextArea'
import { useLanguage } from '../../contexts/LanguageContext'
import { LocationMap } from '../Common/LocationMap'
import { useGeolocation } from '../../hooks/useGeolocation'

const categories = [
  'Street Harassment',
  'Workplace Harassment',
  'Public Transport Harassment',
  'Stalking/Following',
  'Inappropriate Touching',
  'Verbal Abuse/Catcalling',
  'Online/Cyber Harassment',
  'Unsafe Environment/Poor Lighting',
  'Suspicious Activity',
  'Physical Threat/Intimidation',
  'Educational Institution Issues',
  'Other'
]

interface IncidentReportFormProps {
  onCancel?: () => void
}

export function IncidentReportForm({ onCancel }: IncidentReportFormProps) {
  const { t } = useLanguage()
  const { latitude, longitude } = useGeolocation()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    isAnonymous: true
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [showMap, setShowMap] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setLoading(false)
    setSubmitted(true)
  }

  const handleMapLocationSelect = (location: any) => {
    setSelectedLocation({ lat: location.latitude, lng: location.longitude })
    setFormData(prev => ({ ...prev, location: location.address || location.name }))
    setShowMap(false)
  }
  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
          <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Report Submitted Successfully</h2>
          <p className="text-gray-600 mb-6">
            Your incident report has been securely submitted. Our team will review it and take appropriate action.
            You will receive updates if any follow-up is needed.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Report ID:</strong> SR-{Date.now().toString().slice(-6)}
            </p>
            <p className="text-sm text-blue-700 mt-1">
              Keep this ID for your records. You can use it to check the status of your report.
            </p>
          </div>

          <button
            onClick={() => {
              setSubmitted(false)
              setFormData({
                title: '',
                description: '',
                category: '',
                location: '',
                isAnonymous: true
              })
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200"
          >
            Submit Another Report
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Report an Incident</h2>
            <p className="text-gray-600">Your safety matters. Report incidents securely and anonymously.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Anonymous Toggle */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={formData.isAnonymous}
                  onChange={(e) => setFormData(prev => ({ ...prev, isAnonymous: e.target.checked }))}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="anonymous" className="text-sm font-medium text-purple-900">
                  Submit anonymously
                </label>
              </div>
              {formData.isAnonymous ? <EyeOff className="h-4 w-4 text-purple-600" /> : <Eye className="h-4 w-4 text-purple-600" />}
            </div>
            <p className="text-xs text-purple-700 mt-2">
              Anonymous reports help protect your identity while allowing us to track safety patterns.
            </p>
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              {t('report.incident_title')}
            </label>
            <MultilingualInput
              name="title"
              value={formData.title}
              onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
              required
              placeholder={t('report.title_placeholder')}
              id="title"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="h-4 w-4 inline mr-1" />
              {t('report.location')}
            </label>
            <div className="space-y-3">
              <MultilingualInput
                name="location"
                value={formData.location}
                onChange={(value) => setFormData(prev => ({ ...prev, location: value }))}
                required
                placeholder={t('report.location_placeholder')}
                id="location"
              />
              <button
                type="button"
                onClick={() => setShowMap(!showMap)}
                className="w-full bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <MapPin className="h-4 w-4" />
                <span>{showMap ? 'Hide Map' : 'Select Location on Map'}</span>
              </button>
              
              {showMap && (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <LocationMap
                    locations={[]}
                    center={latitude && longitude ? { lat: latitude, lng: longitude } : { lat: 6.9271, lng: 79.8612 }}
                    zoom={13}
                    height="300px"
                    onLocationClick={handleMapLocationSelect}
                    showUserLocation={true}
                  />
                  <div className="p-3 bg-gray-50 text-sm text-gray-600">
                    Click on the map to select the incident location, or type the address manually above.
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              {t('report.detailed_description')}
            </label>
            <MultilingualTextArea
              name="description"
              value={formData.description}
              onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
              required
              rows={6}
              placeholder={t('report.description_placeholder')}
              id="description"
            />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> If you're in immediate danger, please call emergency services directly at 119 
              or use the Emergency SOS button. This form is for reporting past incidents or ongoing safety concerns.
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting Report...' : 'Submit Report'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}