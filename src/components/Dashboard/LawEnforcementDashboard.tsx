import React, { useState } from 'react'
import { Shield, AlertTriangle, Users, MapPin, Clock, CheckCircle, Eye, Phone, Navigation } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import { MultilingualInput } from '../Common/MultilingualInput'
import { MultilingualTextArea } from '../Common/MultilingualTextArea'
import { LocationMap } from '../Common/LocationMap'
import { useGeolocation } from '../../hooks/useGeolocation'

const enforcementStats = [
  { label: 'Active Alerts', value: '12', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', urgent: true },
  { label: 'Cases Assigned', value: '34', icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Resolved Today', value: '28', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Avg Response', value: '3.2m', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' }
]

const activeAlerts = [
  {
    id: 1,
    type: 'Emergency SOS Alert',
    location: 'Liberty Plaza, Kollupitiya - Near Food Court Entrance',
    coordinates: { lat: 6.9147, lng: 79.8501 },
    time: '2 minutes ago',
    priority: 'High',
    status: 'Active',
    reporterId: 'USR_2025_4789',
    description: 'Young woman activated SOS while being followed by unknown male from Liberty Plaza to Kollupitiya Junction. Suspect described as 30-35 years, wearing blue shirt, approximately 5\'6" height. Victim currently in safe location at nearby pharmacy.'
  },
  {
    id: 2,
    type: 'Sexual Harassment - Public Transport',
    location: 'Dehiwala Railway Station - Platform 2',
    coordinates: { lat: 6.8500, lng: 79.8650 },
    time: '8 minutes ago',
    priority: 'Medium',
    status: 'Responding',
    reporterId: 'Anonymous',
    description: 'Female passenger reports inappropriate touching and verbal harassment by male passenger (approx. 40 years) on 5:45 PM Panadura-bound train. Suspect exited at Mount Lavinia. Station security has been notified. CCTV footage being reviewed.'
  },
  {
    id: 3,
    type: 'Stalking/Following Incident',
    location: 'University of Colombo - Arts Faculty Parking Area',
    coordinates: { lat: 6.9020, lng: 79.8608 },
    time: '18 minutes ago',
    priority: 'Medium',
    status: 'Assigned',
    reporterId: 'USR_2025_3456',
    description: 'University student reports being followed by same individual for 3 consecutive days after evening lectures. Suspect: Male, 25-30 years, rides red motorcycle (no visible number plate). Campus security alerted. Student provided with escort service.'
  },
  {
    id: 4,
    type: 'Workplace Harassment',
    location: 'World Trade Center, Echelon Square, Colombo 01',
    coordinates: { lat: 6.9344, lng: 79.8428 },
    time: '35 minutes ago',
    priority: 'Low',
    status: 'Under Review',
    reporterId: 'USR_2025_7891',
    description: 'Employee reports persistent inappropriate comments and unwanted advances from supervisor. Multiple incidents documented over 2 weeks. HR department contacted but no action taken. Requesting guidance on legal procedures and evidence collection.'
  },
  {
    id: 5,
    type: 'Public Safety Hazard',
    location: 'Pettah Central Bus Stand - Platform 7',
    coordinates: { lat: 6.9395, lng: 79.8587 },
    time: '1 hour ago',
    priority: 'Medium',
    status: 'Pending',
    reporterId: 'USR_2025_2341',
    description: 'Multiple reports of broken lighting and inadequate security at bus platform during evening hours. Women passengers feeling unsafe while waiting for buses to Gampaha and Negombo routes. Immediate lighting repair and increased security presence requested.'
  }
]

const recentCases = [
  { 
    id: 1, 
    case: 'Sexual Harassment Case #WP-2025-1247', 
    status: 'Resolved', 
    time: '2 hours ago', 
    outcome: 'Suspect arrested at Bambalapitiya Junction, formal charges filed under Penal Code Section 345, victim provided counseling referral to Women in Need (WIN)' 
  },
  { 
    id: 2, 
    case: 'Stalking Report #WP-2025-1248', 
    status: 'In Progress', 
    time: '5 hours ago', 
    outcome: 'Interim Restraining Order obtained from Colombo Fort Magistrate Court, suspect under 24-hour surveillance, victim relocated to YWCA safe house' 
  },
  { 
    id: 3, 
    case: 'Emergency SOS Alert #WP-2025-1249', 
    status: 'Resolved', 
    time: '8 hours ago', 
    outcome: 'Emergency Response Unit dispatched in 2.1 minutes, victim safely escorted to Colombo South Teaching Hospital, increased patrol deployment in Dehiwala area for 72 hours' 
  },
  { 
    id: 4, 
    case: 'Workplace Harassment #WP-2025-1250', 
    status: 'Resolved', 
    time: '1 day ago', 
    outcome: 'Investigation completed with HR Department of BOI company, perpetrator terminated, victim compensated Rs. 150,000, legal aid provided by Women\'s Legal Centre' 
  },
  { 
    id: 5, 
    case: 'Public Transport Harassment #WP-2025-1251', 
    status: 'In Progress', 
    time: '1 day ago', 
    outcome: 'Coordinating with Sri Lanka Transport Board and CTB for additional security personnel during peak hours on Route 138 (Pettah-Nugegoda), CCTV upgrade approved' 
  },
  { 
    id: 6, 
    case: 'Cyber Harassment #WP-2025-1252', 
    status: 'Resolved', 
    time: '2 days ago', 
    outcome: 'Digital forensics completed by CCID, suspect traced via IP geolocation to Kandy, arrest warrant issued, victim provided with digital safety counseling' 
  },
  { 
    id: 7, 
    case: 'Domestic Violence #WP-2025-1253', 
    status: 'In Progress', 
    time: '3 days ago', 
    outcome: 'Protection Order issued by Colombo Additional Magistrate, suspect remanded for 14 days, victim and children relocated to secure shelter facility' 
  },
  { 
    id: 8, 
    case: 'University Campus Safety #WP-2025-1254', 
    status: 'Resolved', 
    time: '4 days ago', 
    outcome: 'Security protocol review completed with University of Kelaniya administration, additional lighting installed, campus security training conducted' 
  }
]

export function LawEnforcementDashboard() {
  const [selectedAlert, setSelectedAlert] = useState<any>(null)
  const { t } = useLanguage()
  const { latitude, longitude } = useGeolocation()

  const mapLocations = activeAlerts.map(alert => ({
      id: alert.id.toString(),
      name: alert.type,
      address: alert.location,
      type: 'incident' as const,
      latitude: alert.coordinates.lat,
      longitude: alert.coordinates.lng,
      description: alert.description
    }))

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const handleRespond = (alertId: number) => {
    console.log('Responding to alert:', alertId)
    // Here you would implement the response logic
  }

  const getDirections = (coordinates: { lat: number; lng: number }) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`, '_blank')
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <div className="h-12 w-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{t('le.dashboard.title')}</h2>
            <p className="text-blue-100">{t('le.dashboard.subtitle')}</p>
          </div>
        </div>
        <div className="bg-white bg-opacity-10 rounded-lg p-4 mt-6">
          <p className="text-sm">
            <strong>{t('le.duty_status')}</strong>
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {enforcementStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className={`bg-white rounded-xl p-6 shadow-sm border transition-shadow duration-200 hover:shadow-md ${
              stat.urgent ? 'border-red-200 bg-red-50' : 'border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`h-12 w-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Active Alerts */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <AlertTriangle className="h-6 w-6 text-red-500" />
          <span>Active Emergency Alerts</span>
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
            {activeAlerts.filter(alert => alert.status === 'Active').length} Active
          </span>
        </h3>
        
        {/* Emergency Alerts Map */}
        <div className="mb-6">
          <LocationMap
            locations={mapLocations}
            center={latitude && longitude ? { lat: latitude, lng: longitude } : { lat: 6.9271, lng: 79.8612 }}
            zoom={12}
            height="300px"
            onLocationClick={(location) => {
              const alert = activeAlerts.find(a => a.id.toString() === location.id)
              if (alert) setSelectedAlert(alert)
            }}
            showUserLocation={true}
            className="shadow-lg"
          />
        </div>
        
        <div className="space-y-4">
          {activeAlerts.map((alert) => (
            <div key={alert.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{alert.type}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(alert.priority)}`}>
                      {alert.priority} Priority
                    </span>
                    <span className="text-xs text-gray-500">{alert.time}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{alert.location}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{alert.description}</p>
                  
                  <div className="text-xs text-gray-500">
                    Reporter: {alert.reporterId === 'anonymous' ? 'Anonymous' : `ID: ${alert.reporterId}`}
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2 ml-4">
                  <button
                    onClick={() => handleRespond(alert.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200"
                  >
                    Respond
                  </button>
                  <button
                    onClick={() => getDirections(alert.coordinates)}
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
      </div>

      {/* Case Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Cases */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Case Updates</h3>
          <div className="space-y-3">
            {recentCases.map((case_) => (
              <div key={case_.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 text-sm">{case_.case}</p>
                  <p className="text-xs text-gray-500">{case_.time}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    case_.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {case_.status}
                  </span>
                  <p className="text-xs text-gray-600 mt-1">{case_.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Patrol Areas */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Patrol Areas</h3>
          <div className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-blue-900">Colombo 07 District</h4>
                  <p className="text-sm text-blue-700">Primary patrol area</p>
                </div>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  Low Risk
                </span>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-yellow-900">Galle Road Corridor</h4>
                  <p className="text-sm text-yellow-700">Secondary patrol area</p>
                </div>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                  Medium Risk
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Details Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Alert Details</h3>
              <button
                onClick={() => setSelectedAlert(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Eye className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
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
                <p className="font-semibold text-gray-900">{selectedAlert.location}</p>
                <p className="text-sm text-gray-500">
                  Coordinates: {selectedAlert.coordinates.lat}, {selectedAlert.coordinates.lng}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Description</label>
                <p className="text-gray-900">{selectedAlert.description}</p>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => handleRespond(selectedAlert.id)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200"
                >
                  Mark as Responding
                </button>
                <button
                  onClick={() => getDirections(selectedAlert.coordinates)}
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
    </div>
  )
}