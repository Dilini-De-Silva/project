import React, { useState } from 'react'
import { Mail, Phone, MessageSquare, Shield, Users, X, Send, Clock, CheckCircle } from 'lucide-react'
import { MultilingualTextArea } from './MultilingualTextArea'
import { MultilingualInput } from './MultilingualInput'
import { useLanguage } from '../../contexts/LanguageContext'

interface ContactSupportProps {
  isOpen: boolean
  onClose: () => void
  requestType?: 'general' | 'role_access' | 'technical' | 'safety'
}

export function ContactSupport({ isOpen, onClose, requestType = 'general' }: ContactSupportProps) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requestType: requestType,
    roleRequested: '',
    organization: '',
    badgeNumber: '',
    subject: '',
    message: '',
    urgency: 'normal'
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setSubmitted(true)
    setLoading(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const getRequestTypeInfo = () => {
    switch (formData.requestType) {
      case 'role_access':
        return {
          title: 'Special Role Access Request',
          description: 'Request law enforcement or moderator access',
          icon: Shield,
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          border: 'border-blue-200'
        }
      case 'technical':
        return {
          title: 'Technical Support',
          description: 'Report bugs or technical issues',
          icon: MessageSquare,
          color: 'text-purple-600',
          bg: 'bg-purple-50',
          border: 'border-purple-200'
        }
      case 'safety':
        return {
          title: 'Safety Concern',
          description: 'Report safety issues or concerns',
          icon: Shield,
          color: 'text-red-600',
          bg: 'bg-red-50',
          border: 'border-red-200'
        }
      default:
        return {
          title: 'General Support',
          description: 'General questions and feedback',
          icon: Mail,
          color: 'text-gray-600',
          bg: 'bg-gray-50',
          border: 'border-gray-200'
        }
    }
  }

  if (!isOpen) return null

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-6 text-center">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Request Submitted</h3>
          <p className="text-gray-600 mb-6">
            Thank you for contacting us. We'll review your request and respond within 24-48 hours.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Reference ID:</strong> SUP-{Date.now().toString().slice(-6)}
            </p>
            <p className="text-sm text-blue-700 mt-1">
              Keep this ID for tracking your request status.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  const requestInfo = getRequestTypeInfo()
  const Icon = requestInfo.icon

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`h-10 w-10 ${requestInfo.bg} rounded-full flex items-center justify-center`}>
              <Icon className={`h-5 w-5 ${requestInfo.color}`} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{requestInfo.title}</h3>
              <p className="text-gray-600 text-sm">{requestInfo.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
            <Mail className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <h4 className="font-semibold text-blue-900 mb-1">Email</h4>
            <p className="text-sm text-blue-700">support@safeher.lk</p>
            <p className="text-xs text-blue-600 mt-1">24-48 hour response</p>
          </div>
          
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center">
            <Phone className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <h4 className="font-semibold text-green-900 mb-1">Phone</h4>
            <p className="text-sm text-green-700">+94 11 234 5678</p>
            <p className="text-xs text-green-600 mt-1">Mon-Fri 9AM-5PM</p>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg text-center">
            <Clock className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <h4 className="font-semibold text-purple-900 mb-1">Emergency</h4>
            <p className="text-sm text-purple-700">Use SOS feature</p>
            <p className="text-xs text-purple-600 mt-1">Immediate response</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Request Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Request Type</label>
            <select
              value={formData.requestType}
              onChange={(e) => handleInputChange('requestType', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="general">General Support</option>
              <option value="role_access">Special Role Access Request</option>
              <option value="technical">Technical Support</option>
              <option value="safety">Safety Concern</option>
            </select>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <MultilingualInput
                value={formData.name}
                onChange={(value) => handleInputChange('name', value)}
                placeholder="Your full name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number (Optional)</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="+94 77 123 4567"
            />
          </div>

          {/* Special Role Access Fields */}
          {formData.requestType === 'role_access' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-4">
              <h4 className="font-semibold text-blue-900">Special Role Information</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">Role Requested</label>
                  <select
                    value={formData.roleRequested}
                    onChange={(e) => handleInputChange('roleRequested', e.target.value)}
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select role...</option>
                    <option value="law_enforcement">Law Enforcement Officer</option>
                    <option value="moderator">Community Moderator</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">Organization/Department</label>
                  <MultilingualInput
                    value={formData.organization}
                    onChange={(value) => handleInputChange('organization', value)}
                    placeholder="e.g., Sri Lanka Police, NGO name"
                    required
                  />
                </div>
              </div>

              {formData.roleRequested === 'law_enforcement' && (
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">Badge Number</label>
                  <input
                    type="text"
                    value={formData.badgeNumber}
                    onChange={(e) => handleInputChange('badgeNumber', e.target.value)}
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., WP-2025-1234"
                    required
                  />
                </div>
              )}
            </div>
          )}

          {/* Urgency Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
            <select
              value={formData.urgency}
              onChange={(e) => handleInputChange('urgency', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="low">Low - General inquiry</option>
              <option value="normal">Normal - Standard support</option>
              <option value="high">High - Urgent issue</option>
              <option value="critical">Critical - Emergency (use SOS instead)</option>
            </select>
          </div>

          {/* Subject and Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <MultilingualInput
              value={formData.subject}
              onChange={(value) => handleInputChange('subject', value)}
              placeholder="Brief description of your request"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <MultilingualTextArea
              value={formData.message}
              onChange={(value) => handleInputChange('message', value)}
              rows={6}
              placeholder="Please provide detailed information about your request..."
              required
            />
          </div>

          {/* Emergency Notice */}
          {formData.urgency === 'critical' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-5 w-5 text-red-600" />
                <h4 className="font-semibold text-red-900">Emergency Situations</h4>
              </div>
              <p className="text-sm text-red-800">
                For immediate emergencies, please use the Emergency SOS feature or call 119 directly. 
                This support form is not monitored 24/7.
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Send className="h-4 w-4" />
              <span>{loading ? 'Sending...' : 'Send Request'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Support Information */}
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Support Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong className="text-gray-700">Response Times:</strong>
              <ul className="text-gray-600 mt-1 space-y-1">
                <li>• General: 24-48 hours</li>
                <li>• Role Access: 3-5 business days</li>
                <li>• Technical: 12-24 hours</li>
                <li>• Safety: 2-6 hours</li>
              </ul>
            </div>
            <div>
              <strong className="text-gray-700">Office Hours:</strong>
              <ul className="text-gray-600 mt-1 space-y-1">
                <li>• Monday - Friday: 9:00 AM - 5:00 PM</li>
                <li>• Saturday: 9:00 AM - 1:00 PM</li>
                <li>• Sunday: Closed</li>
                <li>• Emergency: 24/7 via SOS</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}