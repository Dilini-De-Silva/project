import React, { useState, useEffect } from 'react'
import { AlertTriangle, MapPin, Phone, X, Clock, CheckCircle } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import { LocationMap } from '../Common/LocationMap'
import { useGeolocation } from '../../hooks/useGeolocation'

interface SOSAlertProps {
  isOpen: boolean
  onClose: () => void
}

export function SOSAlert({ isOpen, onClose }: SOSAlertProps) {
  const [countdown, setCountdown] = useState(10)
  const [alertSent, setAlertSent] = useState(false)
  const { t } = useLanguage()
  const { latitude, longitude, accuracy, error } = useGeolocation()

  useEffect(() => {
    if (isOpen && !alertSent) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setAlertSent(true)
            sendSOSAlert()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [isOpen, alertSent])

  const mapLocations = latitude && longitude ? [{
    id: 'user-location',
    name: 'Your Current Location',
    address: 'Emergency Alert Location',
    type: 'user_location' as const,
    latitude,
    longitude
  }] : []

  const sendSOSAlert = () => {
    // Here you would implement the actual SOS alert sending logic
    console.log('SOS Alert sent!', { latitude, longitude, accuracy })
  }

  const handleCancel = () => {
    setCountdown(10)
    setAlertSent(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-[280px] w-full p-3 relative shadow-2xl border-2 border-red-500 ring-2 ring-red-200">
        <button
          onClick={handleCancel}
          className="absolute top-1 right-1 p-1 hover:bg-red-100 rounded-full transition-colors z-10 bg-red-50"
        >
          <X className="h-3 w-3 text-red-600" />
        </button>

        {!alertSent ? (
          <div className="text-center">
            <div className="h-6 w-6 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce shadow-xl ring-2 ring-red-200">
              <AlertTriangle className="h-3 w-3 text-white" />
            </div>
            
            <h2 className="text-base font-bold text-red-600 mb-2">{t('emergency.sos')}</h2>
            
            {/* Large Countdown Display */}
            <div className="bg-red-600 text-white rounded-lg p-2 mb-2 shadow-lg border border-red-700">
              <p className="text-white text-xs mb-1 font-medium text-center">Sending in:</p>
              <div className="text-lg font-bold text-center mb-1 bg-white text-red-600 rounded py-1 shadow-inner">
                {countdown}
              </div>
              <p className="text-red-100 text-center text-xs">sec</p>
            </div>

            <div className="bg-red-50 border border-red-300 rounded-lg p-2 mb-2 shadow-lg">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="h-3 w-3 text-red-600" />
                <span className="text-xs font-medium text-red-800">Location</span>
              </div>
              {latitude && longitude ? (
                <div className="space-y-2">
                  <p className="text-xs text-red-700 font-medium">
                    📍 {latitude.toFixed(4)}, {longitude.toFixed(4)}
                    {accuracy && <span className="block">±{Math.round(accuracy)}m</span>}
                  </p>
                  <LocationMap
                    locations={mapLocations}
                    center={{ lat: latitude, lng: longitude }}
                    zoom={16}
                    height="80px"
                    showUserLocation={false}
                    className="border-2 border-red-400 rounded-lg shadow-xl"
                  />
                </div>
              ) : (
                <p className="text-xs text-red-700 font-medium">
                  {error ? `Location error: ${error}` : 'Getting location...'}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  setAlertSent(true)
                  sendSOSAlert()
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg font-bold text-sm transition-all duration-200 shadow-xl hover:shadow-red-500/50 transform hover:scale-105 ring-2 ring-red-200"
              >
                {t('emergency.send_alert')} Now
              </button>
              <button
                onClick={handleCancel}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-2 rounded-lg font-semibold text-xs transition-all duration-200 shadow-md"
              >
                {t('action.cancel')} Alert
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse">
              <CheckCircle className="h-3 w-3 text-green-600" />
            </div>
            
            <h2 className="text-sm font-bold text-green-600 mb-2">{t('emergency.alert_sent')}</h2>
            <p className="text-gray-600 mb-2 text-xs">
              Your emergency contacts and local authorities have been notified. {t('emergency.help_coming')}.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-2 mb-2">
              <div className="flex items-center space-x-2 mb-2">
                <Phone className="h-3 w-3 text-green-600" />
                <span className="text-xs font-medium text-green-800">Notifications Sent To:</span>
              </div>
              <ul className="text-xs text-green-700 space-y-1">
                <li>• Emergency contacts (3 people)</li>
                <li>• Local police station</li>
                <li>• SafeHer emergency response team</li>
              </ul>
            </div>

            <button
              onClick={handleCancel}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg font-semibold text-xs transition-all duration-200 shadow-md"
            >
              {t('action.close')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}