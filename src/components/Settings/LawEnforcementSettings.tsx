import React, { useState } from 'react'
import { 
  Shield, 
  Bell, 
  MapPin, 
  Radio, 
  Clock, 
  Users, 
  AlertTriangle, 
  Settings as SettingsIcon,
  Save,
  Phone,
  Badge,
  Car,
  Headphones,
  Monitor,
  Lock,
  Eye,
  Database
} from 'lucide-react'

interface LawEnforcementSettingsData {
  // Officer Information
  badgeNumber: string
  rank: string
  division: string
  station: string
  shift: string
  
  // Communication Settings
  radioFrequency: string
  dispatchChannel: string
  emergencyContactProtocol: string
  
  // Alert Preferences
  alertTypes: {
    sosAlerts: boolean
    harassmentReports: boolean
    suspiciousActivity: boolean
    domesticViolence: boolean
    publicSafety: boolean
    cyberCrimes: boolean
  }
  
  // Response Settings
  autoAssignment: boolean
  maxCaseLoad: number
  responseRadius: number
  priorityFiltering: string
  
  // Notification Settings
  soundAlerts: boolean
  vibrationAlerts: boolean
  emailNotifications: boolean
  smsNotifications: boolean
  
  // Privacy & Security
  locationTracking: boolean
  activityLogging: boolean
  dataRetention: string
  accessLevel: string
}

export function LawEnforcementSettings() {
  const [settings, setSettings] = useState<LawEnforcementSettingsData>({
    // Officer Information
    badgeNumber: 'WP-2025-4789',
    rank: 'Police Sergeant',
    division: 'Western Province',
    station: 'Bambalapitiya Police Station',
    shift: 'Evening Shift (2:00 PM - 10:00 PM)',
    
    // Communication Settings
    radioFrequency: '154.875 MHz',
    dispatchChannel: 'Channel 4 - Western Province South',
    emergencyContactProtocol: 'Direct Radio + Mobile SMS + WhatsApp Group',
    
    // Alert Preferences
    alertTypes: {
      sosAlerts: true,
      harassmentReports: true,
      suspiciousActivity: true,
      domesticViolence: true,
      publicSafety: true,
      cyberCrimes: true
    },
    
    // Response Settings
    autoAssignment: true,
    maxCaseLoad: 12,
    responseRadius: 3,
    priorityFiltering: 'high_critical',
    
    // Notification Settings
    soundAlerts: true,
    vibrationAlerts: true,
    emailNotifications: true,
    smsNotifications: true,
    
    // Privacy & Security
    locationTracking: true,
    activityLogging: true,
    dataRetention: '5_years',
    accessLevel: 'elevated'
  })

  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }))
  }

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof LawEnforcementSettingsData],
        [field]: value
      }
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setSuccess('Settings saved successfully!')
    setSaving(false)
    setTimeout(() => setSuccess(''), 3000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Law Enforcement Settings</h2>
          <p className="text-gray-600">Configure your officer profile, alert preferences, and operational settings</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 flex items-center space-x-2"
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

      {/* Officer Information */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Badge className="h-5 w-5 text-blue-500" />
          <span>Officer Information</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Badge Number</label>
            <input
              type="text"
              value={settings.badgeNumber}
              onChange={(e) => handleInputChange('badgeNumber', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rank</label>
            <select
              value={settings.rank}
              onChange={(e) => handleInputChange('rank', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Police Constable">Police Constable</option>
              <option value="Police Sergeant">Police Sergeant</option>
              <option value="Sub Inspector">Sub Inspector</option>
              <option value="Inspector">Inspector</option>
              <option value="Chief Inspector">Chief Inspector</option>
              <option value="Superintendent">Superintendent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Division</label>
            <select
              value={settings.division}
              onChange={(e) => handleInputChange('division', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Western Province">Western Province</option>
              <option value="Central Province">Central Province</option>
              <option value="Southern Province">Southern Province</option>
              <option value="Northern Province">Northern Province</option>
              <option value="Eastern Province">Eastern Province</option>
              <option value="North Western Province">North Western Province</option>
              <option value="North Central Province">North Central Province</option>
              <option value="Uva Province">Uva Province</option>
              <option value="Sabaragamuwa Province">Sabaragamuwa Province</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Police Station</label>
            <select
              value={settings.station}
              onChange={(e) => handleInputChange('station', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Colombo Fort Police Station">Colombo Fort Police Station</option>
              <option value="Bambalapitiya Police Station">Bambalapitiya Police Station</option>
              <option value="Wellawatte Police Station">Wellawatte Police Station</option>
              <option value="Mount Lavinia Police Station">Mount Lavinia Police Station</option>
              <option value="Dehiwala Police Station">Dehiwala Police Station</option>
              <option value="Nugegoda Police Station">Nugegoda Police Station</option>
              <option value="Kandy Police Station">Kandy Police Station</option>
              <option value="Galle Police Station">Galle Police Station</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Shift</label>
            <select
              value={settings.shift}
              onChange={(e) => handleInputChange('shift', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Day Shift (6:00 AM - 6:00 PM)">Day Shift (6:00 AM - 6:00 PM)</option>
              <option value="Night Shift (6:00 PM - 6:00 AM)">Night Shift (6:00 PM - 6:00 AM)</option>
              <option value="Morning Shift (6:00 AM - 2:00 PM)">Morning Shift (6:00 AM - 2:00 PM)</option>
              <option value="Evening Shift (2:00 PM - 10:00 PM)">Evening Shift (2:00 PM - 10:00 PM)</option>
              <option value="Night Shift (10:00 PM - 6:00 AM)">Night Shift (10:00 PM - 6:00 AM)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Communication Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Radio className="h-5 w-5 text-green-500" />
          <span>Communication Settings</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Radio Frequency</label>
            <input
              type="text"
              value={settings.radioFrequency}
              onChange={(e) => handleInputChange('radioFrequency', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 154.8 MHz"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dispatch Channel</label>
            <select
              value={settings.dispatchChannel}
              onChange={(e) => handleInputChange('dispatchChannel', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Channel 1 - Emergency Response">Channel 1 - Emergency Response</option>
              <option value="Channel 2 - Traffic Control">Channel 2 - Traffic Control</option>
              <option value="Channel 3 - Colombo Central">Channel 3 - Colombo Central</option>
              <option value="Channel 4 - Western Province">Channel 4 - Western Province</option>
              <option value="Channel 5 - Special Operations">Channel 5 - Special Operations</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Protocol</label>
            <select
              value={settings.emergencyContactProtocol}
              onChange={(e) => handleInputChange('emergencyContactProtocol', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Direct Radio + Mobile SMS">Direct Radio + Mobile SMS</option>
              <option value="Radio Only">Radio Only</option>
              <option value="Mobile SMS + Email">Mobile SMS + Email</option>
              <option value="All Channels">All Channels (Radio + SMS + Email)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Alert Preferences */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <span>Alert Type Preferences</span>
        </h3>
        
        <div className="space-y-4">
          {[
            { key: 'sosAlerts', label: 'SOS Emergency Alerts', description: 'Immediate emergency assistance requests', priority: 'Critical' },
            { key: 'harassmentReports', label: 'Harassment Reports', description: 'Sexual harassment and inappropriate behavior incidents', priority: 'High' },
            { key: 'suspiciousActivity', label: 'Suspicious Activity', description: 'Reports of suspicious individuals or behavior', priority: 'Medium' },
            { key: 'domesticViolence', label: 'Domestic Violence', description: 'Family violence and domestic abuse cases', priority: 'High' },
            { key: 'publicSafety', label: 'Public Safety Hazards', description: 'Environmental hazards and public safety concerns', priority: 'Medium' },
            { key: 'cyberCrimes', label: 'Cyber Crime Reports', description: 'Online harassment and digital safety incidents', priority: 'Low' }
          ].map((alert) => (
            <div key={alert.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h4 className="font-medium text-gray-900">{alert.label}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    alert.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                    alert.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                    alert.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {alert.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-4">
                <input
                  type="checkbox"
                  checked={settings.alertTypes[alert.key as keyof typeof settings.alertTypes]}
                  onChange={(e) => handleNestedChange('alertTypes', alert.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Response Configuration */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Car className="h-5 w-5 text-purple-500" />
          <span>Response Configuration</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Case Load</label>
            <input
              type="number"
              min="5"
              max="30"
              value={settings.maxCaseLoad}
              onChange={(e) => handleInputChange('maxCaseLoad', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Maximum number of active cases you can handle</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Response Radius (km)</label>
            <input
              type="number"
              min="1"
              max="20"
              value={settings.responseRadius}
              onChange={(e) => handleInputChange('responseRadius', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Maximum distance for automatic case assignment</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority Filtering</label>
            <select
              value={settings.priorityFiltering}
              onChange={(e) => handleInputChange('priorityFiltering', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              <option value="high_critical">High & Critical Only</option>
              <option value="high_medium">High & Medium Priority</option>
              <option value="critical_only">Critical Only</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div>
              <h4 className="font-medium text-blue-900">Auto-Assignment</h4>
              <p className="text-sm text-blue-700">Automatically assign nearby cases based on your settings</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoAssignment}
                onChange={(e) => handleInputChange('autoAssignment', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Bell className="h-5 w-5 text-yellow-500" />
          <span>Notification Settings</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Headphones className="h-5 w-5 text-gray-500" />
                <div>
                  <h4 className="font-medium text-gray-900">Sound Alerts</h4>
                  <p className="text-sm text-gray-600">Audio notifications for new alerts</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.soundAlerts}
                  onChange={(e) => handleInputChange('soundAlerts', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-500" />
                <div>
                  <h4 className="font-medium text-gray-900">Vibration Alerts</h4>
                  <p className="text-sm text-gray-600">Vibration notifications on mobile device</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.vibrationAlerts}
                  onChange={(e) => handleInputChange('vibrationAlerts', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Monitor className="h-5 w-5 text-gray-500" />
                <div>
                  <h4 className="font-medium text-gray-900">Email Notifications</h4>
                  <p className="text-sm text-gray-600">Case updates and reports via email</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-500" />
                <div>
                  <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                  <p className="text-sm text-gray-600">Critical alerts via text message</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.smsNotifications}
                  onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Lock className="h-5 w-5 text-green-500" />
          <span>Privacy & Security</span>
        </h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data Retention Period</label>
              <select
                value={settings.dataRetention}
                onChange={(e) => handleInputChange('dataRetention', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="1_year">1 Year</option>
                <option value="2_years">2 Years</option>
                <option value="5_years">5 Years</option>
                <option value="permanent">Permanent (Legal Requirement)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Access Level</label>
              <select
                value={settings.accessLevel}
                onChange={(e) => handleInputChange('accessLevel', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="standard">Standard Access</option>
                <option value="elevated">Elevated Access</option>
                <option value="supervisor">Supervisor Access</option>
                <option value="admin">Administrative Access</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-500" />
                <div>
                  <h4 className="font-medium text-gray-900">Location Tracking</h4>
                  <p className="text-sm text-gray-600">Track your location for dispatch and response coordination</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.locationTracking}
                  onChange={(e) => handleInputChange('locationTracking', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Database className="h-5 w-5 text-gray-500" />
                <div>
                  <h4 className="font-medium text-gray-900">Activity Logging</h4>
                  <p className="text-sm text-gray-600">Log your actions for audit and accountability purposes</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.activityLogging}
                  onChange={(e) => handleInputChange('activityLogging', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Status */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Clock className="h-5 w-5 text-indigo-500" />
          <span>Operational Status</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center">
            <div className="h-12 w-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-semibold text-green-900 mb-1">On Duty</h4>
            <p className="text-sm text-green-700">Available for emergency response</p>
            <button className="mt-3 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200">
              Current Status
            </button>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-center">
            <div className="h-12 w-12 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-semibold text-yellow-900 mb-1">On Break</h4>
            <p className="text-sm text-yellow-700">Temporarily unavailable</p>
            <button className="mt-3 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200">
              Set Status
            </button>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-center">
            <div className="h-12 w-12 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Eye className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Off Duty</h4>
            <p className="text-sm text-gray-700">Not available for response</p>
            <button className="mt-3 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200">
              Set Status
            </button>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">System Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong className="text-blue-900">Shift Started:</strong>
            <br />
            <span className="text-blue-700">Today at 2:00 PM</span>
          </div>
          <div>
            <strong className="text-blue-900">On Duty Duration:</strong>
            <br />
            <span className="text-blue-700">6 hours 15 minutes</span>
          </div>
          <div>
            <strong className="text-blue-900">Incidents Responded Today:</strong>
            <br />
            <span className="text-blue-700">5 emergency calls, 3 reports filed</span>
          </div>
          <div>
            <strong className="text-blue-900">Police System Version:</strong>
            <br />
            <span className="text-blue-700">Safety Platform LE v3.2.1 (Sri Lanka Police Integration)</span>
          </div>
        </div>
      </div>
    </div>
  )
}