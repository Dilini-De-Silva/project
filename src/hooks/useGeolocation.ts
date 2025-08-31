import { useState, useEffect } from 'react'

interface GeolocationState {
  latitude: number | null
  longitude: number | null
  accuracy: number | null
  error: string | null
  loading: boolean
}

interface GeolocationOptions {
  enableHighAccuracy?: boolean
  timeout?: number
  maximumAge?: number
}

export function useGeolocation(options: GeolocationOptions = {}) {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    accuracy: null,
    error: null,
    loading: true
  })

  useEffect(() => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: 'Geolocation is not supported by this browser',
        loading: false
      }))
      return
    }

    const defaultOptions: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000, // 5 minutes
      ...options
    }

    const handleSuccess = (position: GeolocationPosition) => {
      setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        error: null,
        loading: false
      })
    }

    const handleError = (error: GeolocationPositionError) => {
      let errorMessage = 'Unknown location error'
      
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'Location access denied by user'
          break
        case error.POSITION_UNAVAILABLE:
          errorMessage = 'Location information unavailable'
          break
        case error.TIMEOUT:
          errorMessage = 'Location request timed out'
          break
      }

      setState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false
      }))
    }

    // Get current position
    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      defaultOptions
    )

    // Watch position changes
    const watchId = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      defaultOptions
    )

    return () => {
      navigator.geolocation.clearWatch(watchId)
    }
  }, [])

  const refreshLocation = () => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            error: null,
            loading: false
          })
        },
        (error) => {
          setState(prev => ({
            ...prev,
            error: error.message,
            loading: false
          }))
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0 // Force fresh location
        }
      )
    }
  }

  return {
    ...state,
    refreshLocation
  }
}