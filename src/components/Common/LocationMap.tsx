import React, { useEffect, useRef, useState } from 'react'
import { MapPin, Navigation, Phone, Shield, Hospital, Home, Building, Loader } from 'lucide-react'

interface MapLocation {
  id: string
  name: string
  address: string
  type: 'police_station' | 'hospital' | 'shelter' | 'community_center' | 'incident' | 'user_location'
  latitude: number
  longitude: number
  phone?: string
  verified?: boolean
  rating?: number
  description?: string
}

interface LocationMapProps {
  locations: MapLocation[]
  center?: { lat: number; lng: number }
  zoom?: number
  height?: string
  onLocationClick?: (location: MapLocation) => void
  showUserLocation?: boolean
  className?: string
}

export function LocationMap({
  locations,
  center = { lat: 6.9271, lng: 79.8612 }, // Default to Colombo
  zoom = 13,
  height = '400px',
  onLocationClick,
  showUserLocation = true,
  className = ''
}: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (showUserLocation) {
      getCurrentLocation()
    } else {
      setLoading(false)
    }
  }, [showUserLocation])

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          setUserLocation(userPos)
          setLoading(false)
        },
        (error) => {
          console.error('Error getting location:', error)
          setLoading(false)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      )
    } else {
      setLoading(false)
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'police_station': return '🛡️'
      case 'hospital': return '🏥'
      case 'shelter': return '🏠'
      case 'community_center': return '🏢'
      case 'incident': return '⚠️'
      case 'user_location': return '📍'
      default: return '📍'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'police_station': return 'bg-blue-600'
      case 'hospital': return 'bg-red-600'
      case 'shelter': return 'bg-green-600'
      case 'community_center': return 'bg-purple-600'
      case 'incident': return 'bg-orange-600'
      case 'user_location': return 'bg-blue-500'
      default: return 'bg-gray-600'
    }
  }

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371 // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLng = (lng2 - lng1) * Math.PI / 180
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  const getDirections = (location: MapLocation) => {
    const query = encodeURIComponent(location.address)
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${query}`, '_blank')
  }

  const callLocation = (phone: string) => {
    window.open(`tel:${phone}`)
  }

  const locationsWithDistance = locations.map(location => ({
    ...location,
    distance: userLocation 
      ? calculateDistance(userLocation.lat, userLocation.lng, location.latitude, location.longitude)
      : null
  })).sort((a, b) => {
    if (a.distance && b.distance) {
      return a.distance - b.distance
    }
    return 0
  })

  if (loading) {
    return (
      <div 
        className={`bg-gray-100 rounded-xl flex items-center justify-center ${className}`}
        style={{ height }}
      >
        <div className="text-center text-gray-500">
          <Loader className="animate-spin h-8 w-8 text-purple-600 mx-auto mb-2" />
          <p className="font-medium">Getting your location...</p>
          <p className="text-sm">This helps us show nearby safe zones</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {/* Map Container */}
      <div 
        ref={mapRef} 
        style={{ height, width: '100%' }}
        className="rounded-xl overflow-hidden shadow-lg bg-gray-100 relative"
      >
        {/* OpenStreetMap-style visualization */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
          {/* Grid pattern to simulate map */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6B7280" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* User Location */}
          {userLocation && (
            <div 
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
              style={{
                left: '50%',
                top: '50%'
              }}
            >
              <div className="relative">
                <div className="h-6 w-6 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                <div className="absolute inset-0 h-6 w-6 bg-blue-400 rounded-full animate-ping opacity-75"></div>
              </div>
            </div>
          )}

          {/* Location Markers */}
          {locationsWithDistance.map((location, index) => {
            const Icon = location.type === 'police_station' ? Shield :
                        location.type === 'hospital' ? Hospital :
                        location.type === 'shelter' ? Home :
                        location.type === 'community_center' ? Building :
                        MapPin

            // Position markers in a circular pattern around the center
            const angle = (index * 360) / locations.length
            const radius = 30 + (index % 3) * 15
            const x = 50 + radius * Math.cos(angle * Math.PI / 180)
            const y = 50 + radius * Math.sin(angle * Math.PI / 180)

            return (
              <div
                key={location.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                style={{
                  left: `${Math.max(10, Math.min(90, x))}%`,
                  top: `${Math.max(10, Math.min(90, y))}%`
                }}
                onClick={() => {
                  setSelectedLocation(location)
                  if (onLocationClick) {
                    onLocationClick(location)
                  }
                }}
              >
                <div className={`h-8 w-8 ${getTypeColor(location.type)} rounded-full border-2 border-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
                {location.verified && (
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border border-white"></div>
                )}
              </div>
            )
          })}
        </div>

        {/* Location Info Popup */}
        {selectedLocation && (
          <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-xl p-4 z-30 max-w-sm">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getTypeIcon(selectedLocation.type)}</span>
                <h4 className="font-semibold text-gray-900 text-sm">{selectedLocation.name}</h4>
                {selectedLocation.verified && (
                  <span className="text-green-500 text-xs">✓</span>
                )}
              </div>
              <button
                onClick={() => setSelectedLocation(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <p className="text-xs text-gray-600 mb-3">{selectedLocation.address}</p>
            {selectedLocation.distance && (
              <p className="text-xs text-purple-600 mb-3">
                📍 {selectedLocation.distance.toFixed(1)} km away
              </p>
            )}
            <div className="flex space-x-2">
              <button
                onClick={() => getDirections(selectedLocation)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-center space-x-1"
              >
                <Navigation className="h-3 w-3" />
                <span>Directions</span>
              </button>
              {selectedLocation.phone && (
                <button
                  onClick={() => callLocation(selectedLocation.phone!)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-center space-x-1"
                >
                  <Phone className="h-3 w-3" />
                  <span>Call</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Map Controls */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-2 space-y-2">
        <button
          onClick={() => {
            if (userLocation) {
              // Center map on user location (visual feedback)
              setSelectedLocation(null)
            } else {
              getCurrentLocation()
            }
          }}
          className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors w-full"
          title="Center on your location"
        >
          <MapPin className="h-4 w-4 text-blue-600" />
          <span>My Location</span>
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Legend</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 bg-blue-600 rounded-full"></div>
            <span>Police Stations</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 bg-red-600 rounded-full"></div>
            <span>Hospitals</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 bg-green-600 rounded-full"></div>
            <span>Shelters</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 bg-purple-600 rounded-full"></div>
            <span>Community Centers</span>
          </div>
          {userLocation && (
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Your Location</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}