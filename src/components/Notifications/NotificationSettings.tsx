import React, { useState } from 'react'
import { Bell, Save, Shield, Users, AlertTriangle, Clock, Phone, Mail, Smartphone } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

interface NotificationSettingsData {
  // Emergency Notifications
  emergencyAlerts: boolean
  sosAlerts: boolean
  safetyAlerts: boolean
  
  // Community Notifications
  forumReplies: boolean
  communityUpdates: boolean
  newMembers: boolean
  
  // Educational Notifications
  safetyTips: boolean
  workshops: boolean
  resources: boolean
  
  // System Notifications
  accountUpdates: boolean
  securityAlerts: boolean
  maintenanceNotices: boolean
  
  // Delivery Methods
  emailDelivery: boolean
  smsDelivery: boolean
  pushDelivery: boolean
  
  // Timing Preferences
  quietHours: boolean
  quietStart: string
  quietEnd: string
  
  // Role-specific settings
  caseAssignments?: boolean
  escalations?: boolean
  contentReports?: boolean
  userViolations?: boolean
}

export function NotificationSettings() {
  const { user } = useAuth()
  const [settings, setSettings] = useState<NotificationSettingsData>({
    // Emergency Notifications
    emergencyAlerts: true,
    sosAlerts: true,
    safetyAlerts: true,
    
    // Community Notifications
    forumReplies: true,
    communityUpdates: true,
    newMembers: false,
    
    // Educational Notifications
    safetyTips: true,
    workshops: true,
    resources: false,
    
    // System Notifications
    accountUpdates: true,
    securityAlerts: true,
    maintenanceNotices: false,
    
    // Delivery Methods
    emailDelivery: true,
    smsDelivery: true,
    pushDelivery: true,
    
    // Timing Preferences
    quietHours: true,
    quietStart: '22:00',
    quietEnd: '07:00',
    
    // Role-specific (will be set based on user role)
    caseAssignments: true,
    escalations: true,
    contentReports: true,
    userViolations: true
  })

  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')

  const getUserRole = () => {
    return user?.user_metadata?.role || 'user'
  }

  const handleToggle = (field: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setSuccess('Notification settings saved successfully!')
    setSaving(false)
    setTimeout(() => setSuccess(''), 3000)
  }

  const role = getUserRole()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Notification Settings</h2>
          <p className="text-gray-600">Customize how and when you receive notifications</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 flex items-center space-x-2"
        >
          <Save className="h-5 w-5" />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800">{success}</p>
        </div>
      )}

      {/* Emergency Notifications */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <span>Emergency Notifications</span>
        </h3>
        
        <div className="space-y-4">
          {[
            { key: 'emergencyAlerts', label: 'Emergency Alerts', description: 'Critical safety alerts in your area' },
            { key: 'sosAlerts', label: 'SOS Alerts', description: role === 'law_enforcement' ? 'Emergency SOS activations requiring response' : 'Emergency SOS confirmations and updates' },
            { key: 'safetyAlerts', label: 'Safety Alerts', description: 'General safety warnings and advisories' }
          ].map((notification) => (
            <div key={notification.key} className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div>
                <h4 className="font-medium text-red-900">{notification.label}</h4>
                <p className="text-sm text-red-700">{notification.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings[notification.key as keyof NotificationSettingsData] as boolean}
                  onChange={(e) => handleToggle(notification.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Role-specific Notifications */}
      {role === 'law_enforcement' && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <Shield className="h-5 w-5 text-blue-500" />
            <span>Law Enforcement Notifications</span>
          </h3>
          
          <div className="space-y-4">
            {[
              { key: 'caseAssignments', label: 'Case Assignments', description: 'New cases assigned to you or your unit' },
              { key: 'escalations', label: 'Case Escalations', description: 'Cases requiring supervisor attention or escalation' }
            ].map((notification) => (
              <div key={notification.key} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-blue-900">{notification.label}</h4>
                  <p className="text-sm text-blue-700">{notification.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings[notification.key as keyof NotificationSettingsData] as boolean}
                    onChange={(e) => handleToggle(notification.key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {role === 'moderator' && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <Users className="h-5 w-5 text-orange-500" />
            <span>Moderation Notifications</span>
          </h3>
          
          <div className="space-y-4">
            {[
              { key: 'contentReports', label: 'Content Reports', description: 'New content flagged for review' },
              { key: 'userViolations', label: 'User Violations', description: 'Community guideline violations requiring action' }
            ].map((notification) => (
              <div key={notification.key} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-orange-900">{notification.label}</h4>
                  <p className="text-sm text-orange-700">{notification.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings[notification.key as keyof NotificationSettingsData] as boolean}
                    onChange={(e) => handleToggle(notification.key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Community Notifications */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Users className="h-5 w-5 text-purple-500" />
          <span>Community Notifications</span>
        </h3>
        
        <div className="space-y-4">
          {[
            { key: 'forumReplies', label: 'Forum Replies', description: 'Replies to your posts and comments' },
            { key: 'communityUpdates', label: 'Community Updates', description: 'Important community announcements and updates' },
            { key: 'newMembers', label: 'New Members', description: 'Welcome notifications for new community members' }
          ].map((notification) => (
            <div key={notification.key} className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div>
                <h4 className="font-medium text-purple-900">{notification.label}</h4>
                <p className="text-sm text-purple-700">{notification.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings[notification.key as keyof NotificationSettingsData] as boolean}
                  onChange={(e) => handleToggle(notification.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Notifications */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Shield className="h-5 w-5 text-green-500" />
          <span>Educational Notifications</span>
        </h3>
        
        <div className="space-y-4">
          {[
            { key: 'safetyTips', label: 'Safety Tips', description: 'Weekly safety tips and best practices' },
            { key: 'workshops', label: 'Workshops & Events', description: 'Self-defense classes and safety workshops' },
            { key: 'resources', label: 'New Resources', description: 'New educational content and safety guides' }
          ].map((notification) => (
            <div key={notification.key} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <h4 className="font-medium text-green-900">{notification.label}</h4>
                <p className="text-sm text-green-700">{notification.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings[notification.key as keyof NotificationSettingsData] as boolean}
                  onChange={(e) => handleToggle(notification.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Methods */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Bell className="h-5 w-5 text-blue-500" />
          <span>Delivery Methods</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-blue-500" />
              <div>
                <h4 className="font-medium text-blue-900">Email</h4>
                <p className="text-sm text-blue-700">Detailed notifications</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailDelivery}
                onChange={(e) => handleToggle('emailDelivery', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-green-500" />
              <div>
                <h4 className="font-medium text-green-900">SMS</h4>
                <p className="text-sm text-green-700">Critical alerts only</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.smsDelivery}
                onChange={(e) => handleToggle('smsDelivery', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Smartphone className="h-5 w-5 text-purple-500" />
              <div>
                <h4 className="font-medium text-purple-900">Push</h4>
                <p className="text-sm text-purple-700">Real-time app alerts</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.pushDelivery}
                onChange={(e) => handleToggle('pushDelivery', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Quiet Hours */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Clock className="h-5 w-5 text-indigo-500" />
          <span>Quiet Hours</span>
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg">
            <div>
              <h4 className="font-medium text-indigo-900">Enable Quiet Hours</h4>
              <p className="text-sm text-indigo-700">Reduce non-critical notifications during specified hours</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.quietHours}
                onChange={(e) => handleToggle('quietHours', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {settings.quietHours && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quiet Start Time</label>
                <input
                  type="time"
                  value={settings.quietStart}
                  onChange={(e) => setSettings(prev => ({ ...prev, quietStart: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quiet End Time</label>
                <input
                  type="time"
                  value={settings.quietEnd}
                  onChange={(e) => setSettings(prev => ({ ...prev, quietEnd: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-3">
          <AlertTriangle className="h-6 w-6 text-yellow-600" />
          <h3 className="text-lg font-semibold text-yellow-900">Important Notice</h3>
        </div>
        <p className="text-yellow-800 text-sm">
          Emergency and critical safety notifications will always be delivered regardless of your settings. 
          Quiet hours and delivery preferences only apply to non-critical notifications.
        </p>
      </div>
    </div>
  )
}