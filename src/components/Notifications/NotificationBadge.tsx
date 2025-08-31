import React, { useState, useEffect } from 'react'
import { Bell } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

interface NotificationBadgeProps {
  onClick: () => void
}

export function NotificationBadge({ onClick }: NotificationBadgeProps) {
  const { user } = useAuth()
  const [unreadCount, setUnreadCount] = useState(0)
  const [hasUrgent, setHasUrgent] = useState(false)

  const getUserRole = () => {
    return user?.user_metadata?.role || 'user'
  }

  useEffect(() => {
    // Simulate fetching notification counts based on role
    const role = getUserRole()
    
    if (role === 'law_enforcement') {
      setUnreadCount(8) // Higher count for law enforcement
      setHasUrgent(true) // Often have urgent alerts
    } else if (role === 'moderator') {
      setUnreadCount(12) // Moderators get many content reports
      setHasUrgent(true) // Content requiring urgent review
    } else {
      setUnreadCount(5) // Regular users get safety alerts and community updates
      setHasUrgent(false)
    }
  }, [user])

  return (
    <button 
      onClick={onClick}
      className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
    >
      <Bell className={`h-5 w-5 ${hasUrgent ? 'text-red-600' : 'text-gray-600'}`} />
      {unreadCount > 0 && (
        <span className={`absolute -top-1 -right-1 h-5 w-5 ${
          hasUrgent ? 'bg-red-500 animate-pulse' : 'bg-purple-500'
        } text-white text-xs rounded-full flex items-center justify-center font-medium`}>
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  )
}