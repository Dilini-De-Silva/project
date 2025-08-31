import React from 'react'
import { Menu, Shield, User, LogOut, Bell, HelpCircle } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { LanguageSelector } from '../Common/LanguageSelector'
import { NotificationCenter } from '../Notifications/NotificationCenter'
import { NotificationBadge } from '../Notifications/NotificationBadge'
import { ContactSupport } from '../Common/ContactSupport'

interface HeaderProps {
  onMenuToggle: () => void
  onSOSClick: () => void
}

export function Header({ onMenuToggle, onSOSClick }: HeaderProps) {
  const { user, signOut } = useAuth()
  const { t } = useLanguage()
  const [showNotifications, setShowNotifications] = React.useState(false)
  const [showSupport, setShowSupport] = React.useState(false)

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header className="bg-white border-b border-gray-200 px-2 sm:px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left side */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={onMenuToggle}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden min-h-[44px] min-w-[44px]"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 hidden xs:block">{t('app.title')}</h1>
          </div>
        </div>

        {/* Center - Emergency SOS Button */}
        <button
          onClick={onSOSClick}
          className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300 min-h-[44px]"
        >
          <span className="hidden sm:inline">🚨 </span>{t('emergency.sos')}
        </button>

        {/* Right side */}
        <div className="flex items-center space-x-1 sm:space-x-3">
          <NotificationBadge onClick={() => setShowNotifications(true)} />
          
          <button
            onClick={() => setShowSupport(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors min-h-[44px] min-w-[44px]"
            title="Contact Support"
          >
            <HelpCircle className="h-5 w-5 text-gray-600" />
          </button>
          
          <LanguageSelector className="hidden sm:flex" showLabel={false} />
          
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="h-6 w-6 sm:h-8 sm:w-8 bg-purple-600 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700 hidden lg:block">
              {user?.user_metadata?.full_name || 'User'}
            </span>
          </div>
          
          <button
            onClick={handleSignOut}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors min-h-[44px] min-w-[44px]"
            title={t('action.sign_out')}
          >
            <LogOut className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <NotificationCenter 
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
      
      <ContactSupport
        isOpen={showSupport}
        onClose={() => setShowSupport(false)}
      />
    </header>
  )
}