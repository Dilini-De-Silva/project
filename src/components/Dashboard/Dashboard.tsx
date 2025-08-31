import React from 'react'
import { Shield, AlertTriangle, Users, MapPin, TrendingUp, Clock } from 'lucide-react'

const stats = [
  { label: 'Active Safety Alerts', value: '12', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
  { label: 'Community Members', value: '8,247', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Safe Zones Mapped', value: '456', icon: MapPin, color: 'text-teal-600', bg: 'bg-teal-50' },
  { label: 'Incidents Resolved', value: '96.8%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' }
]

const recentAlerts = [
  { id: 1, message: 'Emergency SOS resolved - Liberty Plaza area, victim safely assisted by Emergency Response Unit', time: '1 hour ago', status: 'resolved' },
  { id: 2, message: 'New safe zone verified - Colombo South Teaching Hospital Emergency Department', time: '3 hours ago', status: 'info' },
  { id: 3, message: 'Workplace harassment case resolved - World Trade Center, perpetrator terminated', time: '6 hours ago', status: 'resolved' },
  { id: 4, message: 'Community workshop: "Digital Safety for Young Women" at YWCA Colombo - 45 participants', time: '8 hours ago', status: 'community' },
  { id: 5, message: 'Public transport harassment incident resolved - CTB Route 138, suspect apprehended', time: '12 hours ago', status: 'resolved' },
  { id: 6, message: 'Safety awareness session completed - University of Kelaniya Faculty of Medicine - 120 students', time: '1 day ago', status: 'community' },
  { id: 7, message: 'Cyber harassment case referred to CCID - suspect identified via digital forensics', time: '2 days ago', status: 'resolved' }
]

export function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-teal-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <div className="h-12 w-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Welcome to SafeHer</h2>
            <p className="text-purple-100">Your safety companion is here to protect and empower you</p>
          </div>
        </div>
        <div className="bg-white bg-opacity-10 rounded-lg p-4 mt-6">
          <p className="text-sm">
            <strong>Safety Tip of the Day:</strong> Always share your location with trusted contacts when traveling alone, especially during evening hours.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Emergency Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <span>Emergency Actions</span>
          </h3>
          <div className="space-y-3">
            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02]">
              🚨 Send SOS Alert
            </button>
            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02]">
              📍 Share Live Location
            </button>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02]">
              📝 Report Incident
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Clock className="h-5 w-5 text-gray-500" />
            <span>Recent Activity</span>
          </h3>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`h-2 w-2 rounded-full mt-2 ${
                  alert.status === 'resolved' ? 'bg-green-500' :
                  alert.status === 'info' ? 'bg-blue-500' : 'bg-purple-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety Resources */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Safety Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer">
            <h4 className="font-semibold text-purple-900 mb-2">Self-Defense Guide</h4>
            <p className="text-sm text-purple-700">Learn basic self-defense techniques and safety strategies</p>
          </div>
          <div className="bg-teal-50 p-4 rounded-lg hover:bg-teal-100 transition-colors cursor-pointer">
            <h4 className="font-semibold text-teal-900 mb-2">Safety in Public</h4>
            <p className="text-sm text-teal-700">Tips for staying safe while using public transportation</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
            <h4 className="font-semibold text-blue-900 mb-2">Digital Safety</h4>
            <p className="text-sm text-blue-700">Protect yourself from online harassment and threats</p>
          </div>
        </div>
      </div>
    </div>
  )
}