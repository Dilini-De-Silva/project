import React, { useState } from 'react'
import { 
  User, 
  Bell, 
  Lock, 
  Globe, 
  Shield, 
  Phone, 
  Eye, 
  EyeOff,
  Save,
  Camera,
  MapPin,
  Heart,
  AlertTriangle
} from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import { MultilingualInput } from '../Common/MultilingualInput'
import { MultilingualTextArea } from '../Common/MultilingualTextArea'

interface UserSettingsData {
  // Profile Settings
  displayName: string
  bio: string
  profileVisibility: 'public' | 'community' | 'private'
  
  // Safety Settings
  locationSharing: boolean
  emergencyAutoShare: boolean
  safetyCheckInterval: number
  trustedContacts: string[]
  
  // Notification Settings
  emailAlerts: boolean
  smsAlerts: boolean
  pushNotifications: boolean
  communityUpdates: boolean
  safetyTips: boolean
  emergencyBroadcasts: boolean
  
  // Privacy Settings
  activityVisibility: boolean
  forumPostsVisible: boolean
  lastSeenVisible: boolean
  profileSearchable: boolean
  
  // App Preferences
  language: 'en' | 'si' | 'ta'
  theme: 'light' | 'dark' | 'auto'
  sosButtonSensitivity: 'low' | 'medium' | 'high'
  autoLocationDetection: boolean
}

export function UserSettings() {
  const { t, language, setLanguage } = useLanguage()
  const [settings, setSettings] = useState<UserSettingsData>({
    // Profile Settings
    displayName: 'Sanduni Perera',
    bio: 'University student at University of Colombo. Passionate about women\'s safety and community support.',
    profileVisibility: 'community',
    
    // Safety Settings
    locationSharing: true,
    emergencyAutoShare: true,
    safetyCheckInterval: 30,
    trustedContacts: ['Mother', 'Sister', 'Best Friend'],
    
    // Notification Settings
    emailAlerts: true,
    smsAlerts: true,
    pushNotifications: true,
    communityUpdates: true,
    safetyTips: true,
    emergencyBroadcasts: true,
    
    // Privacy Settings
    activityVisibility: true,
    forumPostsVisible: true,
    lastSeenVisible: false,
    profileSearchable: true,
    
    // App Preferences
    language: language,
    theme: 'light',
    sosButtonSensitivity: 'medium',
    autoLocationDetection: true
  })

  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }))
    
    // Update language context when language setting changes
    if (field === 'language') {
      setLanguage(value)
    }
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Settings</h2>
          <p className="text-gray-600">Customize your safety platform experience and preferences</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 flex items-center space-x-2"
        >
          <Save className="h-5 w-5" />
          <span>{saving ? t('status.saving') : t('action.save')} Settings</span>
        </button>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800">{success}</p>
        </div>
      )}

      {/* Profile Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <User className="h-5 w-5 text-purple-500" />
          <span>{t('settings.profile')}</span>
        </h3>
        
        <div className="space-y-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="h-20 w-20 bg-purple-600 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
              <button className="absolute -bottom-2 -right-2 h-8 w-8 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
              <MultilingualInput
                value={settings.displayName}
                onChange={(value) => handleInputChange('displayName', value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <MultilingualTextArea
              value={settings.bio}
              onChange={(value) => handleInputChange('bio', value)}
              rows={3}
              placeholder="Tell the community a bit about yourself..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
            <select
              value={settings.profileVisibility}
              onChange={(e) => handleInputChange('profileVisibility', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="public">Public - Visible to everyone</option>
              <option value="community">Community - SafeHer members only</option>
              <option value="private">Private - Only visible to you</option>
            </select>
          </div>
        </div>
      </div>

      {/* Safety Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Shield className="h-5 w-5 text-red-500" />
          <span>Safety Settings</span>
        </h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Safety Check Interval (minutes)</label>
              <select
                value={settings.safetyCheckInterval}
                onChange={(e) => handleInputChange('safetyCheckInterval', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value={15}>Every 15 minutes</option>
                <option value={30}>Every 30 minutes</option>
                <option value={60}>Every hour</option>
                <option value={120}>Every 2 hours</option>
                <option value={0}>Disabled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SOS Button Sensitivity</label>
              <select
                value={settings.sosButtonSensitivity}
                onChange={(e) => handleInputChange('sosButtonSensitivity', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="low">Low - 5 second hold</option>
                <option value="medium">Medium - 3 second hold</option>
                <option value="high">High - 1 second hold</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-red-500" />
                <div>
                  <h4 className="font-medium text-red-900">Emergency Auto-Share Location</h4>
                  <p className="text-sm text-red-700">Automatically share your location when SOS is activated</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.emergencyAutoShare}
                  onChange={(e) => handleInputChange('emergencyAutoShare', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-purple-500" />
                <div>
                  <h4 className="font-medium text-purple-900">Location Sharing</h4>
                  <p className="text-sm text-purple-700">Share your location with trusted contacts</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.locationSharing}
                  onChange={(e) => handleInputChange('locationSharing', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-blue-500" />
                <div>
                  <h4 className="font-medium text-blue-900">Auto Location Detection</h4>
                  <p className="text-sm text-blue-700">Automatically detect and update your current location</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoLocationDetection}
                  onChange={(e) => handleInputChange('autoLocationDetection', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Bell className="h-5 w-5 text-yellow-500" />
          <span>Notification Preferences</span>
        </h3>
        
        <div className="space-y-4">
          {[
            { key: 'emailAlerts', label: 'Email Alerts', description: 'Receive safety alerts and updates via email', icon: Bell },
            { key: 'smsAlerts', label: 'SMS Alerts', description: 'Critical safety notifications via text message', icon: Phone },
            { key: 'pushNotifications', label: 'Push Notifications', description: 'Real-time alerts on your device', icon: AlertTriangle },
            { key: 'communityUpdates', label: 'Community Updates', description: 'Forum posts and community activities', icon: Heart },
            { key: 'safetyTips', label: 'Safety Tips', description: 'Weekly safety tips and educational content', icon: Shield },
            { key: 'emergencyBroadcasts', label: 'Emergency Broadcasts', description: 'Area-wide emergency notifications', icon: AlertTriangle }
          ].map((notification) => {
            const Icon = notification.icon
            return (
              <div key={notification.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon className="h-5 w-5 text-gray-500" />
                  <div>
                    <h4 className="font-medium text-gray-900">{notification.label}</h4>
                    <p className="text-sm text-gray-600">{notification.description}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings[notification.key as keyof UserSettingsData] as boolean}
                    onChange={(e) => handleInputChange(notification.key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            )
          })}
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Lock className="h-5 w-5 text-green-500" />
          <span>Privacy Settings</span>
        </h3>
        
        <div className="space-y-4">
          {[
            { key: 'activityVisibility', label: 'Activity Visibility', description: 'Show your app activity to other community members' },
            { key: 'forumPostsVisible', label: 'Forum Posts Visible', description: 'Allow others to see your forum contributions' },
            { key: 'lastSeenVisible', label: 'Last Seen Status', description: 'Show when you were last active on SafeHer' },
            { key: 'profileSearchable', label: 'Profile Searchable', description: 'Allow others to find your profile in community search' }
          ].map((privacy) => (
            <div key={privacy.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{privacy.label}</h4>
                <p className="text-sm text-gray-600">{privacy.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings[privacy.key as keyof UserSettingsData] as boolean}
                  onChange={(e) => handleInputChange(privacy.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* App Preferences */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Globe className="h-5 w-5 text-blue-500" />
          <span>App Preferences</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select
              value={settings.language}
              onChange={(e) => handleInputChange('language', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="en">{t('language.english')}</option>
              <option value="si">{t('language.sinhala')}</option>
              <option value="ta">{t('language.tamil')}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
            <select
              value={settings.theme}
              onChange={(e) => handleInputChange('theme', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="light">Light Mode</option>
              <option value="dark">Dark Mode</option>
              <option value="auto">Auto (System Preference)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Account Security */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Lock className="h-5 w-5 text-green-500" />
          <span>Account Security</span>
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div>
              <h4 className="font-medium text-green-900">Password</h4>
              <p className="text-sm text-green-700">Last changed 2 months ago</p>
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200">
              Change Password
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div>
              <h4 className="font-medium text-blue-900">Two-Factor Authentication</h4>
              <p className="text-sm text-blue-700">Add an extra layer of security to your account</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200">
              Enable 2FA
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
            <div>
              <h4 className="font-medium text-purple-900">Login Sessions</h4>
              <p className="text-sm text-purple-700">Manage active login sessions across devices</p>
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200">
              View Sessions
            </button>
          </div>
        </div>
      </div>

      {/* Data & Privacy */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Eye className="h-5 w-5 text-indigo-500" />
          <span>Data & Privacy</span>
        </h3>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Data Usage</h4>
            <p className="text-sm text-gray-600 mb-3">
              SafeHer collects location data, incident reports, and usage analytics to improve safety services. 
              Your personal information is encrypted and never shared without your consent.
            </p>
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              View Privacy Policy
            </button>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Data Export</h4>
            <p className="text-sm text-gray-600 mb-3">
              Download a copy of all your data including incident reports, forum posts, and account information.
            </p>
            <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200">
              Request Data Export
            </button>
          </div>

          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <h4 className="font-medium text-red-900 mb-2">Delete Account</h4>
            <p className="text-sm text-red-700 mb-3">
              Permanently delete your SafeHer account and all associated data. This action cannot be undone.
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}