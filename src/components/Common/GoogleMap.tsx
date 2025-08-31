import React, { useEffect, useRef, useState } from 'react'
import { MapPin, Navigation, Phone, Shield, Hospital, Home, Building } from 'lucide-react'

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

interface GoogleMapProps {
  locations: MapLocation[]
  center?: { lat: number; lng: number }
  zoom?: number
  height?: string
  onLocationClick?: (location: MapLocation) => void
  showUserLocation?: boolean
  className?: string
}

declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

export function GoogleMap({
  locations,
  center = { lat: 6.9271, lng: 79.8612 }, // Default to Colombo
  zoom = 13,
  height = '400px',
  onLocationClick,
  showUserLocation = true,
  className = ''
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const markersRef = useRef<any[]>([])

  useEffect(() => {
    const checkGoogleMaps = () => {
      if (window.google && window.google.maps) {
        setIsLoaded(true)
        initializeMap()
      } else {
        setTimeout(checkGoogleMaps, 100)
      }
    }
    checkGoogleMaps()
  }, [])

  useEffect(() => {
    if (map && isLoaded) {
      updateMarkers()
    }
  }, [locations, map, isLoaded])

  useEffect(() => {
    if (showUserLocation && map) {
      getCurrentLocation()
    }
  }, [map, showUserLocation])

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        },
        {
          featureType: 'transit',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ],
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true
    })

    setMap(mapInstance)
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          setUserLocation(userPos)
          
          if (map) {
            // Add user location marker
            new window.google.maps.Marker({
              position: userPos,
              map,
              title: 'Your Current Location',
              icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="8" fill="#3B82F6" stroke="#FFFFFF" stroke-width="2"/>
                    <circle cx="12" cy="12" r="3" fill="#FFFFFF"/>
                  </svg>
                `),
                scaledSize: new window.google.maps.Size(24, 24),
                anchor: new window.google.maps.Point(12, 12)
              }
            })
          }
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    }
  }

  const getMarkerIcon = (type: string) => {
    const iconColors = {
      police_station: '#3B82F6',
      hospital: '#EF4444',
      shelter: '#10B981',
      community_center: '#8B5CF6',
      incident: '#F59E0B',
      user_location: '#3B82F6'
    }

    const iconSymbols = {
      police_station: '🛡️',
      hospital: '🏥',
      shelter: '🏠',
      community_center: '🏢',
      incident: '⚠️',
      user_location: '📍'
    }

    return {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2C10.48 2 6 6.48 6 12C6 20 16 30 16 30S26 20 26 12C26 6.48 21.52 2 16 2Z" fill="${iconColors[type as keyof typeof iconColors] || '#6B7280'}" stroke="#FFFFFF" stroke-width="2"/>
          <circle cx="16" cy="12" r="4" fill="#FFFFFF"/>
          <text x="16" y="16" text-anchor="middle" font-size="8" fill="${iconColors[type as keyof typeof iconColors] || '#6B7280'}">${iconSymbols[type as keyof typeof iconSymbols] || '📍'}</text>
        </svg>
      `),
      scaledSize: new window.google.maps.Size(32, 32),
      anchor: new window.google.maps.Point(16, 32)
    }
  }

  const updateMarkers = () => {
    if (!map || !window.google) return

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null))
    markersRef.current = []

    // Add new markers
    locations.forEach((location) => {
      const marker = new window.google.maps.Marker({
        position: { lat: location.latitude, lng: location.longitude },
        map,
        title: location.name,
        icon: getMarkerIcon(location.type)
      })

      // Create info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: createInfoWindowContent(location)
      })

      marker.addListener('click', () => {
        // Close other info windows
        markersRef.current.forEach(m => {
          if (m.infoWindow) {
            m.infoWindow.close()
          }
        })
        
        infoWindow.open(map, marker)
        
        if (onLocationClick) {
          onLocationClick(location)
        }
      })

      marker.infoWindow = infoWindow
      markersRef.current.push(marker)
    })

    // Adjust map bounds to show all markers
    if (locations.length > 0) {
      const bounds = new window.google.maps.LatLngBounds()
      locations.forEach(location => {
        bounds.extend({ lat: location.latitude, lng: location.longitude })
      })
      
      if (userLocation) {
        bounds.extend(userLocation)
      }
      
      map.fitBounds(bounds)
      
      // Set minimum zoom level
      const listener = window.google.maps.event.addListener(map, 'idle', () => {
        if (map.getZoom() > 16) map.setZoom(16)
        window.google.maps.event.removeListener(listener)
      })
    }
  }

  const createInfoWindowContent = (location: MapLocation) => {
    const getTypeIcon = (type: string) => {
      switch (type) {
        case 'police_station': return '🛡️'
        case 'hospital': return '🏥'
        case 'shelter': return '🏠'
        case 'community_center': return '🏢'
        case 'incident': return '⚠️'
        default: return '📍'
      }
    }

    return `
      <div style="max-width: 300px; padding: 12px;">
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <span style="font-size: 20px; margin-right: 8px;">${getTypeIcon(location.type)}</span>
          <h3 style="margin: 0; font-size: 16px; font-weight: bold; color: #1f2937;">${location.name}</h3>
          ${location.verified ? '<span style="color: #10b981; margin-left: 8px;">✓</span>' : ''}
        </div>
        <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">${location.address}</p>
        ${location.phone ? `<p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">📞 ${location.phone}</p>` : ''}
        ${location.rating ? `<p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px;">⭐ ${location.rating}/5</p>` : ''}
        <div style="display: flex; gap: 8px;">
          <button onclick="getDirections('${location.address}')" style="background: #3b82f6; color: white; border: none; padding: 8px 12px; border-radius: 6px; font-size: 12px; cursor: pointer;">
            🧭 Directions
          </button>
          ${location.phone ? `<button onclick="callLocation('${location.phone}')" style="background: #10b981; color: white; border: none; padding: 8px 12px; border-radius: 6px; font-size: 12px; cursor: pointer;">📞 Call</button>` : ''}
        </div>
      </div>
    `
  }

  // Global functions for info window buttons
  useEffect(() => {
    window.getDirections = (address: string) => {
      const encodedAddress = encodeURIComponent(address)
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank')
    }

    window.callLocation = (phone: string) => {
      window.open(`tel:${phone}`)
    }

    return () => {
      delete window.getDirections
      delete window.callLocation
    }
  }, [])

  if (!isLoaded) {
    return (
      <div 
        className={`bg-gray-200 rounded-xl flex items-center justify-center ${className}`}
        style={{ height }}
      >
        <div className="text-center text-gray-500">
          <div className="animate-spin h-8 w-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="font-medium">Loading Map...</p>
          <p className="text-sm">Connecting to Google Maps</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <div 
        ref={mapRef} 
        style={{ height, width: '100%' }}
        className="rounded-xl overflow-hidden shadow-lg"
      />
      
      {/* Map Controls */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-2 space-y-2">
        <button
          onClick={() => {
            if (userLocation && map) {
              map.setCenter(userLocation)
              map.setZoom(15)
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
            <Shield className="h-3 w-3 text-blue-600" />
            <span>Police Stations</span>
          </div>
          <div className="flex items-center space-x-2">
            <Hospital className="h-3 w-3 text-red-600" />
            <span>Hospitals</span>
          </div>
          <div className="flex items-center space-x-2">
            <Home className="h-3 w-3 text-green-600" />
            <span>Shelters</span>
          </div>
          <div className="flex items-center space-x-2">
            <Building className="h-3 w-3 text-purple-600" />
            <span>Community Centers</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Extend window interface for global functions
declare global {
  interface Window {
    getDirections: (address: string) => void
    callLocation: (phone: string) => void
  }
}