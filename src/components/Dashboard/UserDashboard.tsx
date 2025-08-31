import React from 'react'
import { Shield, AlertTriangle, Users, MapPin, TrendingUp, Clock, Heart, BookOpen } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const userStats = [
  { label: 'Your Reports', value: '3', icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50' },
  { label: 'Forum Posts', value: '18', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Safety Score', value: '94%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Days Safe', value: '127', icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50' }
]

const recentActivity = [
  { id: 1, message: 'Completed "Essential Self-Defense for Sri Lankan Women" course', time: '2 hours ago', type: 'education' },
  { id: 2, message: 'Updated emergency contact - Akka (Sanduni)', time: '6 hours ago', type: 'contact' },
  { id: 3, message: 'Replied to "Safe accommodation for working women in Colombo"', time: '1 day ago', type: 'community' },
  { id: 4, message: 'Added Lanka Hospital Corporation to safe zones', time: '2 days ago', type: 'location' },
  { id: 5, message: 'Shared safety tip about CTB bus travel in community forum', time: '3 days ago', type: 'community' },
  { id: 6, message: 'Reported suspicious activity near University of Colombo', time: '4 days ago', type: 'report' },
  { id: 7, message: 'Joined "Women in Tech Safety Group" community discussion', time: '5 days ago', type: 'community' },
  { id: 8, message: 'Completed safety check-in from Bambalapitiya area', time: '1 week ago', type: 'safety' }
]

const safetyTips = [
  {
    title: 'Stay Alert in Crowded Places',
    description: 'In busy areas like Pettah Market or Fort Railway Station, keep your belongings secure and stay aware of your surroundings.',
    category: 'Public Safety'
  },
  {
    title: 'Safe Transportation',
    description: 'When using three-wheelers or buses, share your route with family. Avoid traveling alone after 9 PM.',
    category: 'Transport'
  },
  {
    title: 'Digital Privacy',
    description: 'Don\'t share personal details on social media. Be cautious of friend requests from unknown people.',
    category: 'Online Safety'
  }
]

export function UserDashboard() {
  const { t } = useLanguage()

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <div className="h-12 w-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{t('dashboard.welcome')}</h2>
            <p className="text-purple-100">{t('app.tagline')}</p>
          </div>
        </div>
        <div className="bg-white bg-opacity-10 rounded-lg p-4 mt-6">
          <p className="text-sm">
            <strong>{t('dashboard.safety_tip')}:</strong> Always trust your instincts. If a situation doesn't feel right, remove yourself from it immediately.
          </p>
        </div>
      </div>

      {/* Personal Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userStats.map((stat, index) => {
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
            <span>{t('dashboard.quick_actions')}</span>
          </h3>
          <div className="space-y-3">
            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02]">
              🚨 {t('emergency.send_alert')}
            </button>
            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02]">
              📍 {t('emergency.share_location')}
            </button>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02]">
              📝 {t('nav.report')}
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Clock className="h-5 w-5 text-gray-500" />
            <span>{t('dashboard.recent_activity')}</span>
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`h-2 w-2 rounded-full mt-2 ${
                  activity.type === 'education' ? 'bg-blue-500' :
                  activity.type === 'contact' ? 'bg-green-500' : 'bg-purple-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety Tips */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-blue-500" />
          <span>Personal Safety Tips</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {safetyTips.map((tip, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-center space-x-2 mb-2">
                <Heart className="h-4 w-4 text-purple-600" />
                <span className="text-xs font-medium text-purple-600 uppercase tracking-wide">{tip.category}</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{tip.title}</h4>
              <p className="text-sm text-gray-700">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contacts Quick Access */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-red-900 mb-4">Emergency Contacts - Quick Dial</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white hover:bg-red-50 border border-red-200 p-4 rounded-lg text-left transition-all duration-200">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">119</span>
              </div>
              <div>
                <p className="font-semibold text-red-900">Police Emergency</p>
                <p className="text-sm text-red-700">Immediate police assistance</p>
              </div>
            </div>
          </button>
          <button className="bg-white hover:bg-red-50 border border-red-200 p-4 rounded-lg text-left transition-all duration-200">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">1938</span>
              </div>
              <div>
                <p className="font-semibold text-red-900">Women & Child Desk</p>
                <p className="text-sm text-red-700">Specialized support</p>
              </div>
            </div>
          </button>
          <button className="bg-white hover:bg-red-50 border border-red-200 p-4 rounded-lg text-left transition-all duration-200">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-purple-600 rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-red-900">Your Emergency Contact</p>
                <p className="text-sm text-red-700">Primary trusted contact</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}