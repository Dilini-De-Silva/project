import React from 'react'
import { 
  Home, 
  AlertTriangle, 
  BookOpen, 
  Users, 
  MapPin, 
  Phone, 
  BarChart3,
  Settings,
  X,
  Shield,
  Flag,
  UserCheck,
  User,
  Bell
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  activeSection: string
  onSectionChange: (section: string) => void
}

const userMenuItems = [
  { id: 'dashboard', labelKey: 'nav.dashboard', icon: Home },
  { id: 'sos', labelKey: 'nav.sos', icon: AlertTriangle },
  { id: 'report', labelKey: 'nav.report', icon: AlertTriangle },
  { id: 'education', labelKey: 'nav.education', icon: BookOpen },
  { id: 'community', labelKey: 'nav.community', icon: Users },
  { id: 'safe-zones', labelKey: 'nav.safe_zones', icon: MapPin },
  { id: 'contacts', labelKey: 'nav.contacts', icon: Phone },
  { id: 'profile', labelKey: 'nav.profile', icon: User },
  { id: 'notifications', labelKey: 'nav.notifications', icon: Bell },
  { id: 'settings', labelKey: 'nav.settings', icon: Settings }
]

const lawEnforcementMenuItems = [
  { id: 'dashboard', labelKey: 'nav.command_center', icon: Home },
  { id: 'alerts', labelKey: 'nav.active_alerts', icon: AlertTriangle },
  { id: 'cases', labelKey: 'nav.case_management', icon: Shield },
  { id: 'patrol', labelKey: 'nav.patrol_areas', icon: MapPin },
  { id: 'reports', labelKey: 'nav.incident_reports', icon: Flag },
  { id: 'profile', labelKey: 'nav.profile', icon: User },
  { id: 'notifications', labelKey: 'nav.notifications', icon: Bell },
  { id: 'settings', labelKey: 'nav.settings', icon: Settings }
]

const moderatorMenuItems = [
  { id: 'dashboard', labelKey: 'nav.moderation_center', icon: Home },
  { id: 'content-review', labelKey: 'nav.content_review', icon: Flag },
  { id: 'community', labelKey: 'nav.community_management', icon: Users },
  { id: 'user-management', labelKey: 'nav.user_management', icon: UserCheck },
  { id: 'analytics', labelKey: 'nav.community_analytics', icon: BarChart3 },
  { id: 'guidelines', labelKey: 'nav.guidelines', icon: BookOpen },
  { id: 'notifications', labelKey: 'nav.notifications', icon: Bell },
  { id: 'settings', labelKey: 'nav.settings', icon: Settings }
]

export function Sidebar({ isOpen, onClose, activeSection, onSectionChange }: SidebarProps) {
  const { user } = useAuth()
  const { t } = useLanguage()
  
  const getUserRole = () => {
    return user?.user_metadata?.role || 'user'
  }

  const getMenuItems = () => {
    const role = getUserRole()
    switch (role) {
      case 'law_enforcement':
        return lawEnforcementMenuItems
      case 'moderator':
        return moderatorMenuItems
      default:
        return userMenuItems
    }
  }

  const getRoleTitle = () => {
    const role = getUserRole()
    switch (role) {
      case 'law_enforcement':
        return t('le.dashboard.title')
      case 'moderator':
        return t('mod.dashboard.title')
      default:
        return t('app.title')
    }
  }

  const menuItems = getMenuItems()

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full w-72 sm:w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-3 sm:p-4 border-b border-gray-200 lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="h-6 w-6 sm:h-8 sm:w-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-gray-900 text-sm sm:text-base">{getRoleTitle()}</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors min-h-[44px] min-w-[44px]"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        <nav className="p-2 sm:p-4 space-y-1 sm:space-y-2 overflow-y-auto max-h-[calc(100vh-80px)]">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id)
                  onClose()
                }}
                className={`
                  w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-3 sm:py-3 rounded-lg text-left transition-all duration-200 min-h-[48px]
                  ${isActive 
                    ? 'bg-purple-50 text-purple-700 border-l-4 border-purple-600' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-purple-600'
                  }
                `}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-purple-600' : 'text-gray-500'}`} />
                <span className="font-medium text-sm sm:text-base">{t(item.labelKey)}</span>
              </button>
            )
          })}
        </nav>
      </aside>
    </>
  )
}