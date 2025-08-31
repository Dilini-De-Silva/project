import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Shield } from 'lucide-react'
import { useLanguage } from './contexts/LanguageContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { LoginForm } from './components/Auth/LoginForm'
import { RegisterForm } from './components/Auth/RegisterForm'
import { HomePage } from './components/Home/HomePage'
import { Header } from './components/Layout/Header'
import { Sidebar } from './components/Layout/Sidebar'
import { UserDashboard } from './components/Dashboard/UserDashboard'
import { LawEnforcementDashboard } from './components/Dashboard/LawEnforcementDashboard'
import { ModeratorDashboard } from './components/Dashboard/ModeratorDashboard'
import { SOSAlert } from './components/SOS/SOSAlert'
import { IncidentReportForm } from './components/IncidentReport/IncidentReportForm'
import { EducationHub } from './components/Education/EducationHub'
import { CommunityForum } from './components/Community/CommunityForum'
import { EmergencyContacts } from './components/Contacts/EmergencyContacts'
import { SafeZonesMap } from './components/SafeZones/SafeZonesMap'
import { SafetyAnalytics } from './components/Analytics/SafetyAnalytics'
import { UserProfile } from './components/Profile/UserProfile'
import { LawEnforcementSettings } from './components/Settings/LawEnforcementSettings'
import { ModeratorSettings } from './components/Settings/ModeratorSettings'
import { UserSettings } from './components/Settings/UserSettings'
import { NotificationSettings } from './components/Notifications/NotificationSettings'
import { ActiveAlerts } from './components/LawEnforcement/ActiveAlerts'
import { CaseManagement } from './components/LawEnforcement/CaseManagement'
import { IncidentReports } from './components/LawEnforcement/IncidentReports'
import { ContentReview } from './components/Moderation/ContentReview'
import { CommunityManagement } from './components/Moderation/CommunityManagement'
import { UserManagement } from './components/Moderation/UserManagement'
import { CommunityGuidelines } from './components/Moderation/CommunityGuidelines'
import { CommunityAnalytics } from './components/Analytics/CommunityAnalytics'

function AuthWrapper() {
  const { user, loading } = useAuth()
  const { t } = useLanguage()
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'register'>('home')

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <p className="text-gray-600">Loading your safety platform...</p>
          <p className="text-gray-600">{t('dashboard.loading')}</p>
        </div>
      </div>
    )
  }

  if (!user) {
    switch (currentView) {
      case 'login':
        return <LoginForm onToggleForm={() => setCurrentView('register')} onBack={() => setCurrentView('home')} />
      case 'register':
        return <RegisterForm onToggleForm={() => setCurrentView('login')} onBack={() => setCurrentView('home')} />
      default:
        return (
          <HomePage 
            onShowLogin={() => setCurrentView('login')}
            onShowRegister={() => setCurrentView('register')}
          />
        )
    }
  }

  return <MainApp />
}

function MainApp() {
  const { user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('dashboard')
  const [showSOSAlert, setShowSOSAlert] = useState(false)

  const getUserRole = () => {
    return user?.user_metadata?.role || 'user'
  }

  const renderDashboard = () => {
    const role = getUserRole()
    switch (role) {
      case 'law_enforcement':
        return <LawEnforcementDashboard />
      case 'moderator':
        return <ModeratorDashboard />
      default:
        return <UserDashboard />
    }
  }

  const renderContent = () => {
    const currentRole = getUserRole()
    
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard()
      case 'sos':
      case 'alerts':
        if (currentRole === 'law_enforcement') {
          return <ActiveAlerts />
        } else {
          return <div className="text-center py-12">
            <button
              onClick={() => setShowSOSAlert(true)}
              className="bg-red-600 hover:bg-red-700 text-white py-6 px-12 rounded-2xl font-bold text-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🚨 SEND EMERGENCY SOS
            </button>
            <p className="text-gray-600 mt-4">Press and hold to send an emergency alert</p>
          </div>
        }
      case 'report':
      case 'cases':
        if (currentRole === 'law_enforcement') {
          return activeSection === 'cases' ? <CaseManagement /> : <IncidentReportForm onCancel={() => setActiveSection('dashboard')} />
        } else {
          return <IncidentReportForm onCancel={() => setActiveSection('dashboard')} />
        }
      case 'reports':
        return <IncidentReports />
      case 'education':
        return <EducationHub />
      case 'community':
        return <CommunityForum />
      case 'safe-zones':
      case 'patrol':
        return <SafeZonesMap />
      case 'contacts':
        return <EmergencyContacts />
      case 'profile':
        return <UserProfile />
      case 'content-review':
        return <ContentReview />
      case 'community':
        if (getUserRole() === 'moderator') {
          return <CommunityManagement />
        } else {
          return <CommunityForum />
        }
      case 'user-management':
        return <UserManagement />
      case 'guidelines':
        return <CommunityGuidelines />
      case 'analytics':
        return <CommunityAnalytics />
      case 'settings':
        if (currentRole === 'law_enforcement') {
          return <LawEnforcementSettings />
        } else if (currentRole === 'moderator') {
          return <ModeratorSettings />
        } else {
        }
      case 'notifications':
        return <NotificationSettings />
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        
        <div className="flex-1 lg:ml-64">
          <Header 
            onMenuToggle={() => setSidebarOpen(true)}
            onSOSClick={() => setShowSOSAlert(true)}
          />
          
          <main className="p-3 sm:p-4 lg:p-6">
            {renderContent()}
          </main>
        </div>
      </div>

      <SOSAlert 
        isOpen={showSOSAlert}
        onClose={() => setShowSOSAlert(false)}
      />
    </div>
  )
}

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <AuthWrapper />
        </AuthProvider>
      </LanguageProvider>
    </Router>
  )
}

export default App