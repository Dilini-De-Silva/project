import React, { useState, useEffect } from 'react'
import { AlertTriangle, MapPin, Clock, Phone, Navigation, Eye, CheckCircle, X, Radio, Car, Users } from 'lucide-react'
import { GoogleMap } from '../Common/GoogleMap'
import { useGeolocation } from '../../hooks/useGeolocation'

interface Alert {
  id: string
  type: 'SOS' | 'Harassment' | 'Stalking' | 'Assault' | 'Suspicious Activity'
  priority: 'Critical' | 'High' | 'Medium' | 'Low'
  status: 'New' | 'Dispatched' | 'Responding' | 'On Scene' | 'Resolved'
  location: string
  coordinates: { lat: number; lng: number }
  reportedAt: string
  reporterId: string
  description: string
  assignedOfficer?: string
  estimatedArrival?: string
  witnesses?: number
  evidence?: string[]
}

const mockAlerts: Alert[] = [
  {
    id: 'SOS-2025-001',
    type: 'SOS',
    priority: 'Critical',
    status: 'New',
    location: 'Liberty Plaza, Kollupitiya - Food Court Entrance',
    coordinates: { lat: 6.9147, lng: 79.8501 },
    reportedAt: '2025-01-31T15:45:00Z',
    reporterId: 'USR_2025_4789',
    description: 'Female victim being followed by unknown male. Activated SOS from Liberty Plaza food court. Suspect: Male, 30-35 years, blue shirt, 5\'6" height. Victim currently hiding in pharmacy.',
    witnesses: 2,
    evidence: ['SOS_audio_recording.mp3', 'location_data.json']
  },
  {
    id: 'HAR-2025-002',
    type: 'Harassment',
    priority: 'High',
    status: 'Dispatched',
    location: 'Dehiwala Railway Station - Platform 2',
    coordinates: { lat: 6.8500, lng: 79.8650 },
    reportedAt: '2025-01-31T15:30:00Z',
    reporterId: 'Anonymous',
    description: 'Sexual harassment on 5:45 PM Panadura train. Male passenger (40 years) inappropriate touching. Suspect exited at Mount Lavinia. Station security notified.',
    assignedOfficer: 'PC Kumara (Badge: WP-2025-156)',
    estimatedArrival: '8 minutes',
    witnesses: 3,
    evidence: ['CCTV_Platform2_1545.mp4', 'witness_statement_1.pdf']
  },
  {
    id: 'STK-2025-003',
    type: 'Stalking',
    priority: 'Medium',
    status: 'Responding',
    location: 'University of Colombo - Arts Faculty',
    coordinates: { lat: 6.9020, lng: 79.8608 },
    reportedAt: '2025-01-31T15:15:00Z',
    reporterId: 'USR_2025_3456',
    description: 'Student followed for 3 consecutive days after evening lectures. Red motorcycle, no visible plate. Campus security alerted.',
    assignedOfficer: 'SI Fernando (Badge: WP-2025-089)',
    estimatedArrival: 'On scene',
    witnesses: 1,
    evidence: ['campus_security_report.pdf', 'student_statement.pdf']
  }
]

export function ActiveAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts)
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const [filter, setFilter] = useState<'all' | 'critical' | 'assigned'>('all')
  const { latitude, longitude } = useGeolocation()

  const filteredAlerts = alerts.filter(alert => {
    switch (filter) {
      case 'critical':
        return alert.priority === 'Critical'
      case 'assigned':
        return alert.assignedOfficer
      default:
        return true
    }
  })

  const mapLocations = filteredAlerts.map(alert => ({
    id: alert.id,
    name: alert.type,
    address: alert.location,
    type: 'incident' as const,
    latitude: alert.coordinates.lat,
    longitude: alert.coordinates.lng,
    description: alert.description
  }))

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-red-100 text-red-800'
      case 'Dispatched': return 'bg-blue-100 text-blue-800'
      case 'Responding': return 'bg-yellow-100 text-yellow-800'
      case 'On Scene': return 'bg-purple-100 text-purple-800'
      case 'Resolved': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleTakeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'Dispatched' as const, assignedOfficer: 'You (Current Officer)' }
        : alert
    ))
  }

  const handleUpdateStatus = (alertId: string, newStatus: Alert['status']) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: newStatus }
        : alert
    ))
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`
    } else {
      const diffInHours = Math.floor(diffInMinutes / 60)
      return `${diffInHours} hours ago`
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Active Emergency Alerts</h2>
          <p className="text-gray-600">Real-time emergency situations requiring immediate response</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
            {alerts.filter(a => a.status === 'New').length} New Alerts
          </div>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {alerts.filter(a => a.assignedOfficer).length} Assigned
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2">
        {[
          { key: 'all', label: 'All Alerts', count: alerts.length },
          { key: 'critical', label: 'Critical Only', count: alerts.filter(a => a.priority === 'Critical').length },
          { key: 'assigned', label: 'My Cases', count: alerts.filter(a => a.assignedOfficer).length }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              filter === tab.key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Emergency Alerts Map */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Alert Locations</h3>
        <GoogleMap
          locations={mapLocations}
          center={latitude && longitude ? { lat: latitude, lng: longitude } : { lat: 6.9271, lng: 79.8612 }}
          zoom={12}
          height="300px"
          onLocationClick={(location) => {
            const alert = alerts.find(a => a.id === location.id)
            if (alert) setSelectedAlert(alert)
          }}
          showUserLocation={true}
        />
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div key={alert.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{alert.type} Alert</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(alert.priority)}`}>
                    {alert.priority}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                    {alert.status}
                  </span>
                  <span className="text-xs text-gray-500">{formatTime(alert.reportedAt)}</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Location:</span>
                    </div>
                    <p className="text-sm text-gray-900 ml-6">{alert.location}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Reported:</span>
                    </div>
                    <p className="text-sm text-gray-900 ml-6">{formatTime(alert.reportedAt)}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Incident Details:</h4>
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{alert.description}</p>
                </div>

                {alert.assignedOfficer && (
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium text-gray-700">Assigned Officer:</span>
                    </div>
                    <p className="text-sm text-blue-900 ml-6">{alert.assignedOfficer}</p>
                    {alert.estimatedArrival && (
                      <p className="text-xs text-gray-500 ml-6">ETA: {alert.estimatedArrival}</p>
                    )}
                  </div>
                )}

                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>Alert ID: {alert.id}</span>
                  <span>Reporter: {alert.reporterId}</span>
                  {alert.witnesses && <span>Witnesses: {alert.witnesses}</span>}
                </div>
              </div>
              
              <div className="flex flex-col space-y-2 ml-4">
                {alert.status === 'New' && (
                  <button
                    onClick={() => handleTakeAlert(alert.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200"
                  >
                    Take Alert
                  </button>
                )}
                
                {alert.assignedOfficer && alert.status !== 'Resolved' && (
                  <div className="space-y-2">
                    <button
                      onClick={() => handleUpdateStatus(alert.id, 'Responding')}
                      className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200"
                    >
                      En Route
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(alert.id, 'On Scene')}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200"
                    >
                      On Scene
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(alert.id, 'Resolved')}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200"
                    >
                      Resolved
                    </button>
                  </div>
                )}
                
                <button
                  onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${alert.coordinates.lat},${alert.coordinates.lng}`, '_blank')}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1"
                >
                  <Navigation className="h-3 w-3" />
                  <span>Navigate</span>
                </button>
                
                <button
                  onClick={() => setSelectedAlert(alert)}
                  className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1"
                >
                  <Eye className="h-3 w-3" />
                  <span>Details</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Alert Details Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Alert Details - {selectedAlert.id}</h3>
              <button
                onClick={() => setSelectedAlert(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Alert Type</label>
                  <p className="font-semibold text-gray-900">{selectedAlert.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Priority</label>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedAlert.priority)}`}>
                    {selectedAlert.priority}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Location</label>
                <p className="font-semibold text-gray-900 mb-2">{selectedAlert.location}</p>
                <GoogleMap
                  locations={[{
                    id: selectedAlert.id,
                    name: selectedAlert.type,
                    address: selectedAlert.location,
                    type: 'incident',
                    latitude: selectedAlert.coordinates.lat,
                    longitude: selectedAlert.coordinates.lng
                  }]}
                  center={selectedAlert.coordinates}
                  zoom={16}
                  height="200px"
                  showUserLocation={true}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Incident Description</label>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-2">
                  <p className="text-gray-900">{selectedAlert.description}</p>
                </div>
              </div>

              {selectedAlert.evidence && selectedAlert.evidence.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Evidence Files</label>
                  <div className="mt-2 space-y-2">
                    {selectedAlert.evidence.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <span className="text-sm text-blue-900">{file}</span>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex space-x-3">
                <button
                  onClick={() => handleTakeAlert(selectedAlert.id)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200"
                >
                  Take This Alert
                </button>
                <button
                  onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedAlert.coordinates.lat},${selectedAlert.coordinates.lng}`, '_blank')}
                  className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2"
                >
                  <Navigation className="h-4 w-4" />
                  <span>Navigate</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Contacts */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-red-900 mb-4">Emergency Coordination</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white hover:bg-red-50 border border-red-200 p-4 rounded-lg text-left transition-all duration-200">
            <div className="flex items-center space-x-3">
              <Radio className="h-6 w-6 text-red-600" />
              <div>
                <p className="font-semibold text-red-900">Dispatch Radio</p>
                <p className="text-sm text-red-700">Channel 4 - 154.875 MHz</p>
              </div>
            </div>
          </button>
          <button className="bg-white hover:bg-red-50 border border-red-200 p-4 rounded-lg text-left transition-all duration-200">
            <div className="flex items-center space-x-3">
              <Car className="h-6 w-6 text-red-600" />
              <div>
                <p className="font-semibold text-red-900">Emergency Response Unit</p>
                <p className="text-sm text-red-700">Request backup</p>
              </div>
            </div>
          </button>
          <button className="bg-white hover:bg-red-50 border border-red-200 p-4 rounded-lg text-left transition-all duration-200">
            <div className="flex items-center space-x-3">
              <Phone className="h-6 w-6 text-red-600" />
              <div>
                <p className="font-semibold text-red-900">Supervisor</p>
                <p className="text-sm text-red-700">Contact duty officer</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}