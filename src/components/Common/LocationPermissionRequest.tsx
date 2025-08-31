import React, { useState } from 'react'
import { MapPin, Shield, AlertTriangle, CheckCircle, X } from 'lucide-react'

interface LocationPermissionRequestProps {
  onPermissionGranted: () => void
  onPermissionDenied: () => void
  onClose?: () => void
  showCloseButton?: boolean
}

export function LocationPermissionRequest({ 
  onPermissionGranted, 
  onPermissionDenied, 
  onClose,
  showCloseButton = false 
}: LocationPermissionRequestProps) {
  const [requesting, setRequesting] = useState(false)

  const requestLocation = async () => {
    setRequesting(true)
    
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        })
      })
      
      onPermissionGranted()
    } catch (error) {
      onPermissionDenied()
    } finally {
      setRequesting(false)
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 max-w-md mx-auto">
      {showCloseButton && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      )}

      <div className="text-center">
        <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="h-8 w-8 text-purple-600" />
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">Enable Location Access</h3>
        <p className="text-gray-600 mb-6">
          SafeHer needs your location to show nearby safe zones and provide emergency assistance when needed.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Why we need your location:</span>
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-3 w-3 text-green-600" />
              <span>Show nearest police stations and hospitals</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-3 w-3 text-green-600" />
              <span>Send accurate location during emergencies</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-3 w-3 text-green-600" />
              <span>Provide relevant safety alerts for your area</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-3 w-3 text-green-600" />
              <span>Calculate distances to safe zones</span>
            </li>
          </ul>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="h-4 w-4 text-green-600" />
            <span className="text-sm font-semibold text-green-900">Your Privacy is Protected</span>
          </div>
          <p className="text-xs text-green-800">
            Your location is only used for safety features and is never shared without your explicit consent. 
            You can disable location sharing at any time in your privacy settings.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={requestLocation}
            disabled={requesting}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <MapPin className="h-5 w-5" />
            <span>{requesting ? 'Requesting Access...' : 'Allow Location Access'}</span>
          </button>
          
          <button
            onClick={onPermissionDenied}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg font-semibold transition-all duration-200"
          >
            Continue Without Location
          </button>
        </div>

        <div className="mt-4 text-xs text-gray-500 text-center">
          <AlertTriangle className="h-3 w-3 inline mr-1" />
          Some features may be limited without location access
        </div>
      </div>
    </div>
  )
}