import React from 'react'
import { BarChart3, TrendingUp, TrendingDown, MapPin, Clock, AlertTriangle, Shield } from 'lucide-react'
import { LocationMap } from '../Common/LocationMap'
import { useGeolocation } from '../../hooks/useGeolocation'

const analyticsData = {
  totalIncidents: 147,
  resolvedIncidents: 96.8,
  activeAlerts: 12,
  responseTime: '3.2 min',
  riskLevel: 'Low',
  trendsData: [
    { month: 'Sep 2024', incidents: 178, resolved: 169 },
    { month: 'Oct 2024', incidents: 156, resolved: 152 },
    { month: 'Nov 2024', incidents: 134, resolved: 131 },
    { month: 'Dec 2024', incidents: 98, resolved: 96 },
    { month: 'Jan 2025', incidents: 147, resolved: 142 }
  ]
}

const hotspots = [
  { location: 'Pettah Central Market - Main Street & Sea Street Junction', incidents: 28, riskLevel: 'High', trend: '+15%' },
  { location: 'Dehiwala Railway Station - Platform 2 & 3', incidents: 19, riskLevel: 'Medium', trend: '-8%' },
  { location: 'Nugegoda - High Level Road Bus Stop (Evening)', incidents: 16, riskLevel: 'Medium', trend: '+12%' },
  { location: 'Mount Lavinia Beach Road (After 8 PM)', incidents: 14, riskLevel: 'Medium', trend: '-5%' },
  { location: 'Kandy Central Market - Clock Tower Area', incidents: 11, riskLevel: 'Low', trend: '-22%' },
  { location: 'Gampaha Town - Main Bus Stand & Railway Crossing', incidents: 9, riskLevel: 'Low', trend: '-18%' },
  { location: 'Colombo Fort Railway Station - Entrance & Platform 1', incidents: 13, riskLevel: 'Medium', trend: '+7%' },
  { location: 'University of Peradeniya - Arts Faculty Parking', incidents: 7, riskLevel: 'Low', trend: '-30%' }
]

const hotspotLocations = [
  { id: '1', name: 'Pettah Central Market', address: 'Main Street & Sea Street Junction', type: 'incident' as const, latitude: 6.9395, longitude: 79.8587, description: '28 incidents this month' },
  { id: '2', name: 'Dehiwala Railway Station', address: 'Platform 2 & 3', type: 'incident' as const, latitude: 6.8500, longitude: 79.8650, description: '19 incidents this month' },
  { id: '3', name: 'Nugegoda Bus Stop', address: 'High Level Road (Evening)', type: 'incident' as const, latitude: 6.8649, longitude: 79.8997, description: '16 incidents this month' },
  { id: '4', name: 'Mount Lavinia Beach Road', address: 'After 8 PM', type: 'incident' as const, latitude: 6.8382, longitude: 79.8636, description: '14 incidents this month' },
  { id: '5', name: 'Kandy Central Market', address: 'Clock Tower Area', type: 'incident' as const, latitude: 7.2906, longitude: 80.6337, description: '11 incidents this month' },
  { id: '6', name: 'Gampaha Town', address: 'Main Bus Stand & Railway Crossing', type: 'incident' as const, latitude: 7.0873, longitude: 79.9990, description: '9 incidents this month' },
  { id: '7', name: 'Colombo Fort Railway Station', address: 'Entrance & Platform 1', type: 'incident' as const, latitude: 6.9344, longitude: 79.8428, description: '13 incidents this month' },
  { id: '8', name: 'University of Peradeniya', address: 'Arts Faculty Parking', type: 'incident' as const, latitude: 7.2599, longitude: 80.5977, description: '7 incidents this month' }
]
export function SafetyAnalytics() {
  const { latitude, longitude } = useGeolocation()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Safety Analytics</h2>
        <p className="text-gray-600">Insights and trends to help improve community safety across Sri Lanka.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <TrendingDown className="h-5 w-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{analyticsData.totalIncidents}</h3>
          <p className="text-sm text-gray-600">Total Incidents This Month</p>
          <p className="text-xs text-green-600 mt-1">↓ 15% from last month</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{analyticsData.resolvedIncidents}%</h3>
          <p className="text-sm text-gray-600">Resolution Rate</p>
          <p className="text-xs text-green-600 mt-1">↑ 3% from last month</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <TrendingDown className="h-5 w-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{analyticsData.activeAlerts}</h3>
          <p className="text-sm text-gray-600">Active Alerts</p>
          <p className="text-xs text-gray-500 mt-1">Current emergency situations</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{analyticsData.responseTime}</h3>
          <p className="text-sm text-gray-600">Avg Response Time</p>
          <p className="text-xs text-green-600 mt-1">↑ 12% faster than last month</p>
        </div>
      </div>

      {/* Trends Chart Placeholder */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Incident Trends (Last 5 Months)</h3>
        <LocationMap
          locations={hotspotLocations}
          center={latitude && longitude ? { lat: latitude, lng: longitude } : { lat: 6.9271, lng: 79.8612 }}
          zoom={11}
          height="400px"
          showUserLocation={true}
          className="shadow-lg"
        />
      </div>

      {/* Risk Assessment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Current Risk Level */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Current Risk Assessment</h3>
          
          <div className="text-center mb-6">
            <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-12 w-12 text-green-600" />
            </div>
            <h4 className="text-2xl font-bold text-green-600 mb-2">Low Risk</h4>
            <p className="text-gray-600">Current safety conditions in your area are favorable</p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h5 className="font-semibold text-green-900 mb-2">Safety Factors:</h5>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• High police presence in area</li>
              <li>• Well-lit streets and pathways</li>
              <li>• Active community watch programs</li>
              <li>• Multiple safe zones nearby</li>
            </ul>
          </div>
        </div>

        {/* Area Hotspots */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Safety Hotspots</h3>
          
          <div className="space-y-4">
            {hotspots.map((hotspot, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div>
                    <h4 className="font-medium text-gray-900">{hotspot.location}</h4>
                    <p className="text-sm text-gray-600">{hotspot.incidents} reports this month</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  hotspot.riskLevel === 'Medium' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {hotspot.riskLevel}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety Recommendations */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Personalized Safety Recommendations</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">For Your Commute</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Use well-lit main roads instead of shortcuts</li>
              <li>• Travel during peak hours when possible</li>
              <li>• Keep emergency contacts readily accessible</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-900 mb-2">Based on Your Area</h4>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• Consider joining local safety groups</li>
              <li>• Familiarize yourself with nearby safe zones</li>
              <li>• Report any suspicious activities promptly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}