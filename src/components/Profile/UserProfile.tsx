import React, { useState, useEffect } from 'react'
import { User, Edit, Save, X, Camera, Shield, Phone, Globe, Bell, Lock } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { MultilingualInput } from '../Common/MultilingualInput'
import { supabase } from '../../lib/supabase'

interface UserProfileData {
  id: string
  email: string
  full_name: string
  role: 'user' | 'law_enforcement' | 'moderator'
  language_preference: 'en' | 'si' | 'ta'
  phone?: string
  address?: string
  date_of_birth?: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
  created_at?: string
  updated_at?: string
  notification_preferences: {
    email_alerts: boolean
    sms_alerts: boolean
    community_updates: boolean
    safety_tips: boolean
  }
  privacy_settings: {
    profile_visibility: 'public' | 'community' | 'private'
    location_sharing: boolean
    activity_visibility: boolean
  }
}

export function UserProfile() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [profileData, setProfileData] = useState<UserProfileData | null>(null)
  const [isNewProfile, setIsNewProfile] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchProfile()
  }, [user])

  const fetchProfile = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle()

      if (error) throw error

      if (data) {
        setProfileData({
          ...data,
          notification_preferences: data.notification_preferences || {
            email_alerts: true,
            sms_alerts: true,
            community_updates: true,
            safety_tips: true
          },
          privacy_settings: data.privacy_settings || {
            profile_visibility: 'community',
            location_sharing: true,
            activity_visibility: true
          }
        })
        setIsNewProfile(false)
      } else {
        // No profile found, create default profile data
        setProfileData({
          id: user.id,
          email: user.email!,
          full_name: user.user_metadata?.full_name || '',
          role: 'user',
          language_preference: 'en',
          notification_preferences: {
            email_alerts: true,
            sms_alerts: true,
            community_updates: true,
            safety_tips: true
          },
          privacy_settings: {
            profile_visibility: 'community',
            location_sharing: true,
            activity_visibility: true
          }
        })
        setIsNewProfile(true)
        setIsEditing(true) // Start in edit mode for new profiles
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      setError('Failed to load profile data')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!profileData || !user) return

    setSaving(true)
    setError('')

    try {
      if (isNewProfile) {
        // Insert new profile
        const { error } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: user.email!,
            full_name: profileData.full_name,
            role: profileData.role,
            language_preference: profileData.language_preference,
            phone: profileData.phone,
            address: profileData.address,
            date_of_birth: profileData.date_of_birth,
            emergency_contact_name: profileData.emergency_contact_name,
            emergency_contact_phone: profileData.emergency_contact_phone,
            notification_preferences: profileData.notification_preferences,
            privacy_settings: profileData.privacy_settings
          })

        if (error) throw error
        setIsNewProfile(false)
      } else {
        // Update existing profile
        const { error } = await supabase
          .from('profiles')
          .update({
            full_name: profileData.full_name,
            language_preference: profileData.language_preference,
            phone: profileData.phone,
            address: profileData.address,
            date_of_birth: profileData.date_of_birth,
            emergency_contact_name: profileData.emergency_contact_name,
            emergency_contact_phone: profileData.emergency_contact_phone,
            notification_preferences: profileData.notification_preferences,
            privacy_settings: profileData.privacy_settings,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id)

        if (error) throw error
      }

      setSuccess(isNewProfile ? 'Profile created successfully!' : 'Profile updated successfully!')
      setIsEditing(false)
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      console.error('Error saving profile:', error)
      setError('Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setProfileData(prev => prev ? { ...prev, [field]: value } : null)
  }

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setProfileData(prev => prev ? {
      ...prev,
      [parent]: {
        ...prev[parent as keyof UserProfileData],
        [field]: value
      }
    } : null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <User className="h-6 w-6 text-purple-600" />
          </div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!profileData) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load profile data</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('profile.title')}</h2>
          <p className="text-gray-600">Manage your personal information and preferences</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center space-x-2 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
            isEditing 
              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          {isEditing ? <X className="h-5 w-5" /> : <Edit className="h-5 w-5" />}
          <span>{isEditing ? t('action.cancel') : t('action.edit')} Profile</span>
        </button>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800">{success}</p>
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Profile Picture Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="h-24 w-24 bg-purple-600 rounded-full flex items-center justify-center">
              <User className="h-12 w-12 text-white" />
            </div>
            {isEditing && (
              <button className="absolute -bottom-2 -right-2 h-8 w-8 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{profileData.full_name}</h3>
            <p className="text-gray-600">{profileData.email}</p>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${
              profileData.role === 'law_enforcement' ? 'bg-blue-100 text-blue-800' :
              profileData.role === 'moderator' ? 'bg-green-100 text-green-800' :
              'bg-purple-100 text-purple-800'
            }`}>
              {profileData.role === 'law_enforcement' ? 'Law Enforcement' :
               profileData.role === 'moderator' ? 'Community Moderator' : 'Community Member'}
            </span>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <User className="h-5 w-5 text-gray-500" />
          <span>{t('profile.personal_info')}</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            {isEditing ? (
              <MultilingualInput
                value={profileData.full_name}
                onChange={(value) => handleInputChange('full_name', value)}
              />
            ) : (
              <p className="py-3 text-gray-900">{profileData.full_name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <p className="py-3 text-gray-500">{profileData.email} (Cannot be changed)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            {isEditing ? (
              <input
                type="tel"
                value={profileData.phone || ''}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="+94771234567"
              />
            ) : (
              <p className="py-3 text-gray-900">{profileData.phone || 'Not provided'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
            {isEditing ? (
              <input
                type="date"
                value={profileData.date_of_birth || ''}
                onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            ) : (
              <p className="py-3 text-gray-900">{profileData.date_of_birth || 'Not provided'}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            {isEditing ? (
              <MultilingualInput
                value={profileData.address || ''}
                onChange={(value) => handleInputChange('address', value)}
                placeholder="Your address in Sri Lanka"
              />
            ) : (
              <p className="py-3 text-gray-900">{profileData.address || 'Not provided'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language Preference</label>
            {isEditing ? (
              <select
                value={profileData.language_preference}
                onChange={(e) => handleInputChange('language_preference', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="en">{t('language.english')}</option>
                <option value="si">{t('language.sinhala')}</option>
                <option value="ta">{t('language.tamil')}</option>
              </select>
            ) : (
              <p className="py-3 text-gray-900">
                {profileData.language_preference === 'en' ? t('language.english') :
                 profileData.language_preference === 'si' ? t('language.sinhala') : t('language.tamil')}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Phone className="h-5 w-5 text-red-500" />
          <span>{t('profile.emergency_contact')}</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
            {isEditing ? (
              <MultilingualInput
                value={profileData.emergency_contact_name || ''}
                onChange={(value) => handleInputChange('emergency_contact_name', value)}
                placeholder="e.g., Amma (Kamani)"
              />
            ) : (
              <p className="py-3 text-gray-900">{profileData.emergency_contact_name || 'Not provided'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
            {isEditing ? (
              <input
                type="tel"
                value={profileData.emergency_contact_phone || ''}
                onChange={(e) => handleInputChange('emergency_contact_phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="+94771234567"
              />
            ) : (
              <p className="py-3 text-gray-900">{profileData.emergency_contact_phone || 'Not provided'}</p>
            )}
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Bell className="h-5 w-5 text-blue-500" />
          <span>{t('profile.notification_prefs')}</span>
        </h3>
        
        <div className="space-y-4">
          {[
            { key: 'email_alerts', label: 'Email Alerts', description: 'Receive emergency and safety alerts via email' },
            { key: 'sms_alerts', label: 'SMS Alerts', description: 'Get critical safety notifications via SMS' },
            { key: 'community_updates', label: 'Community Updates', description: 'Stay informed about community forum activities' },
            { key: 'safety_tips', label: 'Safety Tips', description: 'Receive weekly safety tips and educational content' }
          ].map((pref) => (
            <div key={pref.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{pref.label}</h4>
                <p className="text-sm text-gray-600">{pref.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={profileData.notification_preferences[pref.key as keyof typeof profileData.notification_preferences]}
                  onChange={(e) => handleNestedChange('notification_preferences', pref.key, e.target.checked)}
                  disabled={!isEditing}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Lock className="h-5 w-5 text-green-500" />
          <span>{t('profile.privacy_settings')}</span>
        </h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
            {isEditing ? (
              <select
                value={profileData.privacy_settings.profile_visibility}
                onChange={(e) => handleNestedChange('privacy_settings', 'profile_visibility', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="public">Public - Visible to everyone</option>
                <option value="community">Community - Visible to SafeHer members only</option>
                <option value="private">Private - Only visible to you</option>
              </select>
            ) : (
              <p className="py-3 text-gray-900 capitalize">{profileData.privacy_settings.profile_visibility}</p>
            )}
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Location Sharing</h4>
              <p className="text-sm text-gray-600">Allow emergency contacts to see your location during alerts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profileData.privacy_settings.location_sharing}
                onChange={(e) => handleNestedChange('privacy_settings', 'location_sharing', e.target.checked)}
                disabled={!isEditing}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Activity Visibility</h4>
              <p className="text-sm text-gray-600">Show when you were last active on the platform</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profileData.privacy_settings.activity_visibility}
                onChange={(e) => handleNestedChange('privacy_settings', 'activity_visibility', e.target.checked)}
                disabled={!isEditing}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Account Security */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Shield className="h-5 w-5 text-green-500" />
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
        </div>
      </div>

      {/* Save Button */}
      {isEditing && (
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setIsEditing(false)}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Save className="h-5 w-5" />
            <span>{saving ? t('status.saving') : t('action.save')} Changes</span>
          </button>
        </div>
      )}
    </div>
  )
}