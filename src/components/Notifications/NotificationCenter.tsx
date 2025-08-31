import React, { useState, useEffect } from 'react'
import { Bell, X, Check, AlertTriangle, Users, Shield, Clock, Eye, Trash2 } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'

interface Notification {
  id: string
  title: string
  message: string
  type: 'emergency' | 'safety' | 'community' | 'system' | 'case' | 'moderation'
  priority: 'low' | 'medium' | 'high' | 'critical'
  read: boolean
  actionRequired: boolean
  createdAt: string
  expiresAt?: string
  metadata?: {
    caseId?: string
    alertId?: string
    userId?: string
    location?: string
  }
}

interface NotificationCenterProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filter, setFilter] = useState<'all' | 'unread' | 'urgent'>('all')
  const [loading, setLoading] = useState(true)

  const getUserRole = () => {
    return user?.user_metadata?.role || 'user'
  }

  useEffect(() => {
    if (isOpen) {
      loadNotifications()
    }
  }, [isOpen])

  const loadNotifications = async () => {
    setLoading(true)
    // Simulate API call - in real app, this would fetch from Supabase
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const role = getUserRole()
    const mockNotifications = generateMockNotifications(role)
    setNotifications(mockNotifications)
    setLoading(false)
  }

  const generateMockNotifications = (role: string): Notification[] => {
    const baseNotifications: Notification[] = []

    if (role === 'user') {
      return [
        {
          id: '1',
          title: 'Safety Alert: Enhanced Security Measures - Colombo 04',
          message: 'Police patrols increased by 40% in Bambalapitiya and Wellawatte areas following 3 harassment incidents this week. Additional Women & Child Protection Unit officers deployed during evening hours (6-10 PM).',
          type: 'safety',
          priority: 'medium',
          read: false,
          actionRequired: false,
          createdAt: '2025-01-31T14:30:00Z'
        },
        {
          id: '2',
          title: 'Emergency Contact Verification Successful',
          message: 'Your emergency contact "Amma (Kamani Perera)" has been successfully verified. Test message delivered in 1.2 seconds. Contact will receive location data during emergencies.',
          type: 'system',
          priority: 'low',
          read: true,
          actionRequired: false,
          createdAt: '2025-01-31T12:15:00Z'
        },
        {
          id: '3',
          title: 'Self-Defense Workshop - YWCA Colombo',
          message: 'Free "Krav Maga for Women" workshop this Saturday 2-5 PM at YWCA Colombo. Certified instructor from Israeli Martial Arts Academy. 12 spots remaining out of 30. Includes certificate and safety kit.',
          type: 'community',
          priority: 'medium',
          read: false,
          actionRequired: true,
          createdAt: '2025-01-31T10:00:00Z'
        },
        {
          id: '4',
          title: 'Weekly Safety Tip: Three-Wheeler Safety',
          message: 'When using three-wheelers after 8 PM: (1) Share live location with family, (2) Sit behind driver, never beside, (3) Keep emergency contacts ready, (4) Use registered three-wheelers with visible license plates. Avoid unmarked vehicles.',
          type: 'safety',
          priority: 'low',
          read: true,
          actionRequired: false,
          createdAt: '2025-01-30T18:00:00Z'
        },
        {
          id: '5',
          title: 'Forum Activity: 3 New Replies',
          message: 'Your post "Safe boarding places near University of Colombo" received 3 helpful replies with specific recommendations for Wellawatte and Bambalapitiya areas. Average rating: 4.8/5 stars.',
          type: 'community',
          priority: 'low',
          read: false,
          actionRequired: false,
          createdAt: '2025-01-30T16:45:00Z'
        },
        {
          id: '6',
          title: 'Safety Score Improvement',
          message: 'Your personal safety score increased to 94% after completing "Digital Privacy Protection" course and updating emergency contacts. Keep up the excellent safety practices!',
          type: 'system',
          priority: 'low',
          read: true,
          actionRequired: false,
          createdAt: '2025-01-29T14:20:00Z'
        }
      ]
    }

    if (role === 'law_enforcement') {
      return [
        {
          id: '1',
          title: 'CRITICAL: Multiple SOS Alerts - Colombo 04',
          message: 'Three simultaneous SOS alerts activated in Bambalapitiya area within 500m radius. Possible coordinated harassment. Emergency Response Unit and Women & Child Protection officers dispatched. Backup requested.',
          type: 'emergency',
          priority: 'critical',
          read: false,
          actionRequired: true,
          createdAt: '2025-01-31T15:45:00Z',
          metadata: {
            alertId: 'SOS-2025-1247-MULTI',
            location: 'Bambalapitiya Junction & Galle Road'
          }
        },
        {
          id: '2',
          title: 'High Priority Case Assignment',
          message: 'Workplace sexual harassment case assigned - World Trade Center, Floor 23. Corporate executive involved. Victim is 24-year-old software engineer. HR non-responsive. Legal action may be required.',
          type: 'case',
          priority: 'high',
          read: false,
          actionRequired: true,
          createdAt: '2025-01-31T14:20:00Z',
          metadata: {
            caseId: 'WP-2025-1248'
          }
        },
        {
          id: '3',
          title: 'Case Update Deadline Approaching',
          message: 'Case WP-2025-1245 (Stalking incident at University of Colombo Arts Faculty) requires final status update within 6 hours. Magistrate hearing scheduled for tomorrow 9 AM.',
          type: 'case',
          priority: 'medium',
          read: true,
          actionRequired: true,
          createdAt: '2025-01-31T11:30:00Z',
          metadata: {
            caseId: 'WP-2025-1245'
          }
        },
        {
          id: '4',
          title: 'Shift Change Protocol',
          message: 'Evening shift starts in 15 minutes. Equipment check required: radio (154.875 MHz), body camera, emergency kit. 4 active cases to handover to night shift supervisor.',
          type: 'system',
          priority: 'medium',
          read: false,
          actionRequired: false,
          createdAt: '2025-01-31T13:30:00Z'
        },
        {
          id: '5',
          title: 'Mandatory Training: Gender-Based Violence Response',
          message: 'Specialized training on "Trauma-Informed Interviewing for GBV Cases" scheduled February 8th, 9 AM at Police Training College, Kalutara. Attendance mandatory for all Women & Child Protection officers.',
          type: 'system',
          priority: 'low',
          read: true,
          actionRequired: true,
          createdAt: '2025-01-30T09:00:00Z'
        },
        {
          id: '6',
          title: 'CCID Coordination Required',
          message: 'Cyber harassment case WP-2025-1243 requires coordination with Cyber Crime Investigation Division. Digital evidence package prepared. Suspect traced to Kandy area.',
          type: 'case',
          priority: 'high',
          read: false,
          actionRequired: true,
          createdAt: '2025-01-30T16:15:00Z',
          metadata: {
            caseId: 'WP-2025-1243'
          }
        }
      ]
    }

    if (role === 'moderator') {
      return [
        {
          id: '1',
          title: 'URGENT: Multiple Reports on Single Post',
          message: 'Forum post "Meeting strangers from dating apps safely" received 7 user reports for potential predatory advice. Post author has history of 2 previous warnings. Immediate content review and possible user action required.',
          type: 'moderation',
          priority: 'high',
          read: false,
          actionRequired: true,
          createdAt: '2025-01-31T15:20:00Z'
        },
        {
          id: '2',
          title: 'User Escalation: Repeat Offender',
          message: 'User "SafetyAdvocate_2025" (ID: USR_4789) has received 4 warnings in 10 days for posting inappropriate safety advice and arguing with harassment victims. Community requesting temporary ban.',
          type: 'moderation',
          priority: 'medium',
          read: false,
          actionRequired: true,
          createdAt: '2025-01-31T13:45:00Z',
          metadata: {
            userId: 'USR_2025_4789'
          }
        },
        {
          id: '3',
          title: 'Community Guidelines v2.3 Released',
          message: 'Updated guidelines include new sections on: (1) AI-generated content policies, (2) Location sharing ethics, (3) Trauma-informed language requirements. All moderators must complete training module by Feb 15th.',
          type: 'system',
          priority: 'medium',
          read: true,
          actionRequired: true,
          createdAt: '2025-01-31T10:00:00Z'
        },
        {
          id: '4',
          title: 'Legal Escalation Required',
          message: 'Incident report IR-2025-0456 contains detailed account of physical assault with specific perpetrator identification. Evidence suggests criminal activity requiring immediate law enforcement referral.',
          type: 'moderation',
          priority: 'high',
          read: false,
          actionRequired: true,
          createdAt: '2025-01-30T16:30:00Z'
        },
        {
          id: '5',
          title: 'Weekly Moderation Performance Report',
          message: 'Week ending Jan 31: 89 items reviewed, 96.6% approval rate, 2.1 hour average response time. Top performer in Western Province moderation team. 3 successful escalations to law enforcement.',
          type: 'system',
          priority: 'low',
          read: true,
          actionRequired: false,
          createdAt: '2025-01-30T08:00:00Z'
        },
        {
          id: '6',
          title: 'Community Growth Milestone',
          message: 'Our safety community reached 8,500 active members! Forum engagement up 34% this month. Your moderation efforts contributed to maintaining 98.2% positive community sentiment score.',
          type: 'system',
          priority: 'low',
          read: true,
          actionRequired: false,
          createdAt: '2025-01-29T12:00:00Z'
        }
      ]
    }

    return baseNotifications
  }

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    )
  }

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId))
  }

  const getFilteredNotifications = () => {
    switch (filter) {
      case 'unread':
        return notifications.filter(n => !n.read)
      case 'urgent':
        return notifications.filter(n => n.priority === 'high' || n.priority === 'critical')
      default:
        return notifications
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'emergency': return <AlertTriangle className="h-4 w-4 text-red-500" />
      case 'safety': return <Shield className="h-4 w-4 text-blue-500" />
      case 'community': return <Users className="h-4 w-4 text-purple-500" />
      case 'case': return <Shield className="h-4 w-4 text-blue-600" />
      case 'moderation': return <Eye className="h-4 w-4 text-orange-500" />
      default: return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return `${diffInMinutes} minutes ago`
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} days ago`
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length
  const urgentCount = notifications.filter(n => (n.priority === 'high' || n.priority === 'critical') && !n.read).length

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Bell className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{t('notifications.title')}</h2>
                <p className="text-sm text-gray-600">
                  {unreadCount} {t('notifications.unread')} {urgentCount > 0 && `• ${urgentCount} ${t('notifications.urgent')}`}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2 mt-4">
            {[
              { key: 'all', label: 'All', count: notifications.length },
              { key: 'unread', label: 'Unread', count: unreadCount },
              { key: 'urgent', label: 'Urgent', count: urgentCount }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  filter === tab.key
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Actions */}
          {unreadCount > 0 && (
            <div className="flex justify-end mt-4">
              <button
                onClick={markAllAsRead}
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                {t('notifications.mark_all_read')}
              </button>
            </div>
          )}
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto max-h-96">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
              <p className="text-gray-500 mt-4">Loading notifications...</p>
            </div>
          ) : getFilteredNotifications().length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">{t('notifications.no_notifications')}</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {getFilteredNotifications().map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getTypeIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                          
                          <div className="flex items-center space-x-3 text-xs text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{formatTime(notification.createdAt)}</span>
                            </span>
                            <span className={`px-2 py-1 rounded-full font-medium border ${getPriorityColor(notification.priority)}`}>
                              {notification.priority}
                            </span>
                            {notification.actionRequired && (
                              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">
                                Action Required
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-1 ml-4">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                              title={t('notifications.mark_read')}
                            >
                              <Check className="h-4 w-4 text-gray-500" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                            title={t('notifications.delete')}
                          >
                            <Trash2 className="h-4 w-4 text-gray-500" />
                          </button>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      {notification.actionRequired && (
                        <div className="mt-3 flex space-x-2">
                          {notification.type === 'emergency' && (
                            <button className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-xs font-medium transition-all duration-200">
                              Respond Now
                            </button>
                          )}
                          {notification.type === 'case' && (
                            <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-xs font-medium transition-all duration-200">
                              View Case
                            </button>
                          )}
                          {notification.type === 'moderation' && (
                            <button className="bg-orange-600 hover:bg-orange-700 text-white py-1 px-3 rounded text-xs font-medium transition-all duration-200">
                              Review Content
                            </button>
                          )}
                          {notification.type === 'community' && (
                            <button className="bg-purple-600 hover:bg-purple-700 text-white py-1 px-3 rounded text-xs font-medium transition-all duration-200">
                              View Details
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Showing {getFilteredNotifications().length} of {notifications.length} notifications
            </span>
            <button className="text-purple-600 hover:text-purple-700 font-medium">
              Notification Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}