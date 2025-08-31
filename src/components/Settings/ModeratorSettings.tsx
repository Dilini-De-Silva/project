import React, { useState } from 'react'
import { 
  Shield, 
  Users, 
  MessageSquare, 
  Flag, 
  Clock, 
  Bell,
  Save,
  Eye,
  Lock,
  Database,
  AlertTriangle,
  Settings as SettingsIcon,
  Filter,
  Zap
} from 'lucide-react'

interface ModeratorSettingsData {
  // Moderation Preferences
  autoModerationLevel: 'strict' | 'moderate' | 'lenient'
  contentFilterSensitivity: number
  flaggedContentThreshold: number
  
  // Review Settings
  reviewQueueLimit: number
  priorityFiltering: string[]
  autoApprovalCategories: string[]
  escalationCriteria: string[]
  
  // Notification Settings
  newReportsNotification: boolean
  flaggedContentNotification: boolean
  communityViolationsNotification: boolean
  userReportsNotification: boolean
  
  // Community Management
  userWarningThreshold: number
  temporaryBanDuration: number
  permanentBanCriteria: string[]
  communityGuidelinesVersion: string
  
  // Workflow Settings
  batchReviewMode: boolean
  quickActionButtons: boolean
  detailedLogging: boolean
  collaborativeReview: boolean
}

export function ModeratorSettings() {
  const [settings, setSettings] = useState<ModeratorSettingsData>({
    // Moderation Preferences
    autoModerationLevel: 'moderate',
    contentFilterSensitivity: 7,
    flaggedContentThreshold: 3,
    
    // Review Settings
    reviewQueueLimit: 25,
    priorityFiltering: ['harassment', 'threats', 'inappropriate_content'],
    autoApprovalCategories: ['safety_tips', 'educational_content'],
    escalationCriteria: ['legal_issues', 'serious_threats', 'repeated_violations'],
    
    // Notification Settings
    newReportsNotification: true,
    flaggedContentNotification: true,
    communityViolationsNotification: true,
    userReportsNotification: true,
    
    // Community Management
    userWarningThreshold: 3,
    temporaryBanDuration: 7,
    permanentBanCriteria: ['serious_harassment', 'threats', 'doxxing'],
    communityGuidelinesVersion: 'v2.1',
    
    // Workflow Settings
    batchReviewMode: true,
    quickActionButtons: true,
    detailedLogging: true,
    collaborativeReview: false
  })

  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }))
  }

  const handleArrayChange = (field: string, value: string, checked: boolean) => {
    setSettings(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field as keyof ModeratorSettingsData] as string[], value]
        : (prev[field as keyof ModeratorSettingsData] as string[]).filter(item => item !== value)
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setSuccess('Moderation settings saved successfully!')
    setSaving(false)
    setTimeout(() => setSuccess(''), 3000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Moderator Settings</h2>
          <p className="text-gray-600">Configure content moderation preferences and community management tools</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 flex items-center space-x-2"
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

      {/* Auto-Moderation Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Zap className="h-5 w-5 text-yellow-500" />
          <span>Auto-Moderation Settings</span>
        </h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Auto-Moderation Level</label>
            <select
              value={settings.autoModerationLevel}
              onChange={(e) => handleInputChange('autoModerationLevel', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="lenient">Lenient - Minimal automatic filtering</option>
              <option value="moderate">Moderate - Balanced approach</option>
              <option value="strict">Strict - Aggressive content filtering</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Filter Sensitivity: {settings.contentFilterSensitivity}/10
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={settings.contentFilterSensitivity}
                onChange={(e) => handleInputChange('contentFilterSensitivity', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Permissive</span>
                <span>Restrictive</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Flagged Content Threshold</label>
              <input
                type="number"
                min="1"
                max="10"
                value={settings.flaggedContentThreshold}
                onChange={(e) => handleInputChange('flaggedContentThreshold', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Number of reports before content is auto-flagged</p>
            </div>
          </div>
        </div>
      </div>

      {/* Review Queue Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Filter className="h-5 w-5 text-purple-500" />
          <span>Review Queue Configuration</span>
        </h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Review Queue Limit</label>
            <input
              type="number"
              min="10"
              max="100"
              value={settings.reviewQueueLimit}
              onChange={(e) => handleInputChange('reviewQueueLimit', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Maximum items in your review queue at one time</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Priority Content Types</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'harassment',
                'threats',
                'inappropriate_content',
                'spam',
                'misinformation',
                'privacy_violations'
              ].map((type) => (
                <label key={type} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <input
                    type="checkbox"
                    checked={settings.priorityFiltering.includes(type)}
                    onChange={(e) => handleArrayChange('priorityFiltering', type, e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-900 capitalize">{type.replace('_', ' ')}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Community Management */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Users className="h-5 w-5 text-green-500" />
          <span>Community Management</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">User Warning Threshold</label>
            <input
              type="number"
              min="1"
              max="10"
              value={settings.userWarningThreshold}
              onChange={(e) => handleInputChange('userWarningThreshold', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Warnings before temporary ban consideration</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Temporary Ban Duration (days)</label>
            <select
              value={settings.temporaryBanDuration}
              onChange={(e) => handleInputChange('temporaryBanDuration', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value={1}>1 Day</option>
              <option value={3}>3 Days</option>
              <option value={7}>1 Week</option>
              <option value={14}>2 Weeks</option>
              <option value={30}>1 Month</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Permanent Ban Criteria</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'serious_harassment',
              'threats',
              'doxxing',
              'repeated_violations',
              'illegal_content',
              'impersonation'
            ].map((criteria) => (
              <label key={criteria} className="flex items-center space-x-2 p-3 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100">
                <input
                  type="checkbox"
                  checked={settings.permanentBanCriteria.includes(criteria)}
                  onChange={(e) => handleArrayChange('permanentBanCriteria', criteria, e.target.checked)}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-red-900 capitalize">{criteria.replace('_', ' ')}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Workflow Preferences */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <SettingsIcon className="h-5 w-5 text-gray-500" />
          <span>Workflow Preferences</span>
        </h3>
        
        <div className="space-y-4">
          {[
            { key: 'batchReviewMode', label: 'Batch Review Mode', description: 'Review multiple items at once for efficiency' },
            { key: 'quickActionButtons', label: 'Quick Action Buttons', description: 'Show approve/reject buttons in list view' },
            { key: 'detailedLogging', label: 'Detailed Activity Logging', description: 'Log all moderation actions for audit trail' },
            { key: 'collaborativeReview', label: 'Collaborative Review', description: 'Allow other moderators to see your pending reviews' }
          ].map((workflow) => (
            <div key={workflow.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{workflow.label}</h4>
                <p className="text-sm text-gray-600">{workflow.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings[workflow.key as keyof ModeratorSettingsData] as boolean}
                  onChange={(e) => handleInputChange(workflow.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-indigo-900 mb-4">Moderation System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong className="text-indigo-900">Active Moderators:</strong>
            <br />
            <span className="text-indigo-700">8 online, 12 total</span>
          </div>
          <div>
            <strong className="text-indigo-900">Pending Reviews:</strong>
            <br />
            <span className="text-indigo-700">23 items across all moderators</span>
          </div>
          <div>
            <strong className="text-indigo-900">Auto-Moderation Actions Today:</strong>
            <br />
            <span className="text-indigo-700">47 automatic approvals, 12 flags</span>
          </div>
          <div>
            <strong className="text-indigo-900">Community Guidelines:</strong>
            <br />
            <span className="text-indigo-700">Version {settings.communityGuidelinesVersion} (Updated 2 weeks ago)</span>
          </div>
        </div>
      </div>
    </div>
  )
}