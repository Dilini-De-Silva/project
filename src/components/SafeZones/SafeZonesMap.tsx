import React, { useState } from 'react'
import { MapPin, Phone, Shield, Hospital, Home, Building, Navigation, CheckCircle } from 'lucide-react'
import { LocationMap } from '../Common/LocationMap'
import { useGeolocation } from '../../hooks/useGeolocation'
import { LocationPermissionRequest } from '../Common/LocationPermissionRequest'

const safeZones = [
  {
    id: 1,
    name: 'Colombo Fort Police Station',
    address: 'Bristol Street, Fort, Colombo 01',
    type: 'police_station',
    latitude: 6.9344,
    longitude: 79.8428,
    phone: '+94112421111',
    distance: '1.2 km',
    verified: true,
    rating: 4.7
  },
  {
    id: 2,
    name: 'National Hospital of Sri Lanka',
    address: 'Regent Street, Colombo 08',
    type: 'hospital',
    latitude: 6.9147,
    longitude: 79.8501,
    phone: '+94112691111',
    distance: '2.1 km',
    verified: true,
    rating: 4.8
  },
  {
    id: 3,
    name: 'Women in Need (WIN) Crisis Centre',
    address: 'Horton Place, Colombo 07',
    type: 'shelter',
    latitude: 6.9020,
    longitude: 79.8608,
    phone: '+94112685311',
    distance: '1.8 km',
    verified: true,
    rating: 4.9
  },
  {
    id: 4,
    name: 'Colombo Municipal Council - Women\'s Bureau',
    address: 'Town Hall, Cinnamon Gardens, Colombo 07',
    type: 'community_center',
    latitude: 6.9147,
    longitude: 79.8656,
    phone: '+94112682329',
    distance: '0.9 km',
    verified: true,
    rating: 4.6
  },
  {
    id: 5,
    name: 'Bambalapitiya Police Station',
    address: 'Galle Road, Bambalapitiya, Colombo 04',
    type: 'police_station',
    latitude: 6.8848,
    longitude: 79.8589,
    phone: '+94112503333',
    distance: '3.2 km',
    verified: true,
    rating: 4.5
  },
  {
    id: 6,
    name: 'Lanka Hospital Corporation',
    address: 'Narahenpita Road, Colombo 05',
    type: 'hospital',
    latitude: 6.8905,
    longitude: 79.8821,
    phone: '+94115430000',
    distance: '2.8 km',
    verified: true,
    rating: 4.7
  },
  {
    id: 7,
    name: 'YWCA Colombo',
    address: 'Rotunda Gardens, Colombo 03',
    type: 'shelter',
    latitude: 6.9147,
    longitude: 79.8501,
    phone: '+94112323498',
    distance: '1.5 km',
    verified: true,
    rating: 4.8
  },
  {
    id: 8,
    name: 'University of Colombo Security Office',
    address: 'College House, University of Colombo, Colombo 03',
    type: 'community_center',
    latitude: 6.9020,
    longitude: 79.8608,
    phone: '+94112581835',
    distance: '2.3 km',
    verified: true,
    rating: 4.4
  }
]

const typeIcons = {
  police_station: Shield,
  hospital: Hospital,
  shelter: Home,
  community_center: Building
}

const typeColors = {
  police_station: 'text-blue-600 bg-blue-100',
  hospital: 'text-red-600 bg-red-100',
  shelter: 'text-green-600 bg-green-100',
  community_center: 'text-purple-600 bg-purple-100'
}

export function SafeZonesMap() {
  const [selectedType, setSelectedType] = useState('all')
  const [selectedZone, setSelectedZone] = useState<any>(null)
  const [showLocationRequest, setShowLocationRequest] = useState(false)
  const { latitude, longitude, error, loading } = useGeolocation()

  const filteredZones = selectedType === 'all' 
    ? safeZones 
    : safeZones.filter(zone => zone.type === selectedType)

  const mapLocations = filteredZones.map(zone => ({
      id: zone.id.toString(),
      name: zone.name,
      address: zone.address,
      type: zone.type,
      latitude: zone.latitude,
      longitude: zone.longitude,
      phone: zone.phone,
      verified: zone.verified,
      rating: zone.rating
    }))

  const getDirections = (address: string) => {
    const encodedAddress = encodeURIComponent(address)
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank')
  }

  const callLocation = (phone: string) => {
    window.open(`tel:${phone}`)
  }

  const handleLocationClick = (location: any) => {
    const zone = safeZones.find(z => z.id.toString() === location.id)
    if (zone) {
      setSelectedZone(zone)
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

  // Calculate distances and sort by proximity if user location is available
  const zonesWithDistance = filteredZones.map(zone => ({
    ...zone,
    calculatedDistance: latitude && longitude 
      ? calculateDistance(latitude, longitude, zone.latitude, zone.longitude)
      : null
  })).sort((a, b) => {
    if (a.calculatedDistance && b.calculatedDistance) {
      return a.calculatedDistance - b.calculatedDistance
    }
    return 0
  })

  if (showLocationRequest) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Safe Zones Near You</h2>
          <p className="text-gray-600">Find verified safe locations including police stations, hospitals, and support centers.</p>
        </div>
        <LocationPermissionRequest
          onPermissionGranted={() => setShowLocationRequest(false)}
          onPermissionDenied={() => setShowLocationRequest(false)}
          onClose={() => setShowLocationRequest(false)}
          showCloseButton={true}
        />
      </div>
    )
  }
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Safe Zones Near You</h2>
        <p className="text-gray-600">Find verified safe locations including police stations, hospitals, and support centers.</p>
      </div>

      {/* Current Location Banner */}
      {latitude && longitude ? (
        <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Your Current Location</h3>
              <p className="text-teal-100">
                {latitude.toFixed(4)}, {longitude.toFixed(4)} • Location accuracy: {error ? 'Approximate' : 'High'}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MapPin className="h-6 w-6 text-yellow-600" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-900">Location Access Needed</h3>
                <p className="text-yellow-700">Enable location to see distances and get directions</p>
              </div>
            </div>
            <button
              onClick={() => setShowLocationRequest(true)}
              className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200"
            >
              Enable Location
            </button>
          </div>
        </div>
      )}

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'all', label: 'All Locations', icon: MapPin },
          { key: 'police_station', label: 'Police Stations', icon: Shield },
          { key: 'hospital', label: 'Hospitals', icon: Hospital },
          { key: 'shelter', label: 'Shelters', icon: Home },
          { key: 'community_center', label: 'Community Centers', icon: Building }
        ].map((filter) => {
          const Icon = filter.icon
          return (
            <button
              key={filter.key}
              onClick={() => setSelectedType(filter.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedType === filter.key
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{filter.label}</span>
            </button>
          )
        })}
      </div>

      {/* Interactive Google Map */}
      <LocationMap
        locations={mapLocations}
        center={latitude && longitude ? { lat: latitude, lng: longitude } : { lat: 6.9271, lng: 79.8612 }}
        zoom={13}
        height="400px"
        onLocationClick={handleLocationClick}
        showUserLocation={true}
        className="shadow-lg"
      />

      {/* Safe Zones List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">
          Nearby Safe Zones ({filteredZones.length})
        </h3>
        
        {zonesWithDistance.map((zone) => {
          const Icon = typeIcons[zone.type as keyof typeof typeIcons]
          const colorClass = typeColors[zone.type as keyof typeof typeColors]
          
          return (
            <div key={zone.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center ${colorClass}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{zone.name}</h3>
                      {zone.verified && (
                        <CheckCircle className="h-5 w-5 text-green-500" title="Verified Safe Zone" />
                      )}
                    </div>
                    <p className="text-gray-600 mb-2">{zone.address}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>
                          {zone.calculatedDistance 
                            ? `${zone.calculatedDistance.toFixed(1)} km away`
                            : zone.distance
                          }
                        </span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Phone className="h-3 w-3" />
                        <span>{zone.phone}</span>
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2 ml-4">
                  <button
                    onClick={() => getDirections(zone.address)}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1"
                  >
                    <Navigation className="h-4 w-4" />
                    <span>Directions</span>
                  </button>
                  <button
                    onClick={() => callLocation(zone.phone)}
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call</span>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Safety Tip */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-purple-900 mb-3">Safety Tip</h3>
        <p className="text-purple-800">
          Familiarize yourself with the locations of safe zones in areas you frequent. In an emergency, 
          knowing the quickest route to safety can make all the difference. Consider adding frequently 
          visited safe zones to your favorites for quick access.
        </p>
      </div>
    </div>
  )
}