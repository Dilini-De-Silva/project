import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'si' | 'ta'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('safeher-language') as Language
    if (savedLanguage && ['en', 'si', 'ta'].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('safeher-language', lang)
  }

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

const translations = {
  en: {
    // App Title and Branding
    'app.title': 'SafeHer',
    'app.subtitle': 'Empowering Sri Lankan Women with Safety Tools',
    'app.tagline': 'Your Safety Companion',

    // Auth
    'auth.welcome_back': 'Welcome Back',
    'auth.sign_in_tagline': 'Sign in to your safety companion',
    'auth.join_community': 'Join Our Community',
    'auth.create_account': 'Create your account for a safer tomorrow',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.confirm_password': 'Confirm Password',
    'auth.full_name': 'Full Name',
    'auth.role': 'Role',
    'auth.language': 'Language',
    'auth.enter_email': 'Enter your email',
    'auth.enter_password': 'Enter your password',
    'auth.create_password': 'Create a password',
    'auth.confirm_password_placeholder': 'Confirm your password',
    'auth.enter_full_name': 'Enter your full name',
    'auth.creating_account': 'Creating Account...',
    'auth.signing_in': 'Signing In...',
    'auth.dont_have_account': "Don't have an account?",
    'auth.already_have_account': 'Already have an account?',
    'auth.account_created': 'Welcome to SafeHer!',
    'auth.account_created_message': 'Your account has been created successfully. You can now access all safety features and join our supportive community.',
    'auth.continue_to_signin': 'Continue to Sign In',

    // Roles
    'role.user': 'User',
    'role.law_enforcement': 'Law Enforcement',
    'role.moderator': 'Moderator',

    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.sos': 'Emergency SOS',
    'nav.report': 'Report Incident',
    'nav.education': 'Safety Education',
    'nav.community': 'Community Forum',
    'nav.safe_zones': 'Safe Zones',
    'nav.contacts': 'Emergency Contacts',
    'nav.profile': 'My Profile',
    'nav.settings': 'Settings',
    'nav.notifications': 'Notifications',
    'nav.analytics': 'Analytics',

    // Law Enforcement Navigation
    'nav.command_center': 'Command Center',
    'nav.active_alerts': 'Active Alerts',
    'nav.case_management': 'Case Management',
    'nav.patrol_areas': 'Patrol Areas',
    'nav.crime_analytics': 'Crime Analytics',
    'nav.incident_reports': 'Incident Reports',

    // Moderator Navigation
    'nav.moderation_center': 'Moderation Center',
    'nav.content_review': 'Content Review',
    'nav.community_management': 'Community Management',
    'nav.user_management': 'User Management',
    'nav.community_analytics': 'Community Analytics',
    'nav.guidelines': 'Guidelines',

    // Common Actions
    'action.save': 'Save',
    'action.cancel': 'Cancel',
    'action.edit': 'Edit',
    'action.delete': 'Delete',
    'action.submit': 'Submit',
    'action.close': 'Close',
    'action.back': 'Back',
    'action.back_to_home': 'Back to Home',
    'action.next': 'Next',
    'action.previous': 'Previous',
    'action.confirm': 'Confirm',
    'action.sign_in': 'Sign In',
    'action.sign_up': 'Sign Up',
    'action.sign_out': 'Sign Out',

    // Emergency
    'emergency.sos': 'Emergency SOS',
    'emergency.send_alert': 'Send Alert',
    'emergency.alert_sent': 'Alert Sent Successfully',
    'emergency.help_coming': 'Help is on the way',
    'emergency.call_police': 'Call Police',
    'emergency.share_location': 'Share Location',

    // Dashboard
    'dashboard.welcome': 'Welcome to SafeHer',
    'dashboard.safety_tip': 'Safety Tip of the Day',
    'dashboard.recent_activity': 'Recent Activity',
    'dashboard.quick_actions': 'Quick Actions',
    'dashboard.your_stats': 'Your Statistics',
    'dashboard.loading': 'Loading your safety platform...',

    // Languages
    'language.english': 'English',
    'language.sinhala': 'Sinhala',
    'language.tamil': 'Tamil',

    // Status
    'status.loading': 'Loading...',
    'status.saving': 'Saving...',
    'status.success': 'Success',
    'status.error': 'Error',
    'status.active': 'Active',
    'status.resolved': 'Resolved',
    'status.pending': 'Pending',

    // Home Page
    'home.hero.title': 'Empowering Sri Lankan Women with Safety & Community',
    'home.hero.subtitle': 'Join thousands of women across Sri Lanka who trust our platform for emergency alerts, safety education, and community support.',
    'home.hero.get_started': 'Get Started Free',
    'home.hero.learn_more': 'Learn More',
    'home.hero.emergency_feature': 'One-tap Emergency SOS',
    'home.hero.safe_zones_feature': 'Find Safe Zones Nearby',
    'home.hero.community_feature': 'Connect with Community',

    // Features
    'home.features.title': 'Comprehensive Safety Features',
    'home.features.subtitle': 'Everything you need to stay safe and connected in one powerful platform',
    'home.features.emergency.title': 'Emergency SOS',
    'home.features.emergency.description': 'One-tap emergency alerts that notify your contacts and local authorities instantly',
    'home.features.safe_zones.title': 'Safe Zones',
    'home.features.safe_zones.description': 'Find verified safe locations including police stations, hospitals, and support centers',
    'home.features.education.title': 'Safety Education',
    'home.features.education.description': 'Learn self-defense, digital safety, and emergency preparedness from experts',
    'home.features.community.title': 'Community Support',
    'home.features.community.description': 'Connect with other women, share experiences, and support each other',

    // Stats
    'home.stats.users': '8,500+',
    'home.stats.users_label': 'Active Users',
    'home.stats.incidents': '97.8%',
    'home.stats.incidents_label': 'Resolution Rate',
    'home.stats.response': '3.2 min',
    'home.stats.response_label': 'Avg Response Time',
    'home.stats.zones': '450+',
    'home.stats.zones_label': 'Safe Zones',

    // Testimonials
    'home.testimonials.title': 'Trusted by Women Across Sri Lanka',
    'home.testimonials.subtitle': 'Real stories from our community members',
    'home.testimonials.user1.name': 'Sanduni P.',
    'home.testimonials.user1.text': 'SafeHer gave me confidence to travel alone. The emergency contacts feature and safety tips have been invaluable.',
    'home.testimonials.user2.name': 'Priya R.',
    'home.testimonials.user2.text': 'The community forum helped me find safe accommodation and connect with other working women in my area.',
    'home.testimonials.user3.name': 'Nimesha S.',
    'home.testimonials.user3.text': 'As a night shift worker, knowing I can instantly alert my family and authorities gives me peace of mind.',

    // Emergency
    'home.emergency.title': 'In an Emergency?',
    'home.emergency.subtitle': 'Don\'t wait - get help immediately using these emergency numbers',
    'home.emergency.police': 'Police Emergency',
    'home.emergency.women_child': 'Women & Child Desk',
    'home.emergency.ambulance': 'Ambulance Service',

    // CTA
    'home.cta.title': 'Ready to Take Control of Your Safety?',
    'home.cta.subtitle': 'Join our community today and access all safety features completely free',
    'home.cta.join_now': 'Join Now - It\'s Free',

    // Footer
    'home.footer.description': 'Empowering Sri Lankan women with comprehensive safety tools, education, and community support.',
    'home.footer.languages': 'Available in English, Sinhala & Tamil',
    'home.footer.quick_links': 'Quick Links',
    'home.footer.about': 'About Us',
    'home.footer.safety_tips': 'Safety Tips',
    'home.footer.resources': 'Resources',
    'home.footer.contact': 'Contact',
    'home.footer.emergency': 'Emergency Numbers',
    'home.footer.police': 'Police',
    'home.footer.women_child': 'Women & Child',
    'home.footer.ambulance': 'Ambulance',
    'home.footer.rights': 'All rights reserved.',
    // Profile
    'profile.title': 'My Profile',
    'profile.personal_info': 'Personal Information',
    'profile.emergency_contact': 'Emergency Contact',
    'profile.notification_prefs': 'Notification Preferences',
    'profile.privacy_settings': 'Privacy Settings',

    // Settings
    'settings.profile': 'Profile Settings',
    'settings.notifications': 'Notification Settings',
    'settings.privacy': 'Privacy Settings',
    'settings.security': 'Security Settings',

    // Notifications
    'notifications.title': 'Notifications',
    'notifications.unread': 'unread',
    'notifications.urgent': 'urgent',
    'notifications.mark_all_read': 'Mark all as read',
    'notifications.mark_read': 'Mark as read',
    'notifications.delete': 'Delete',
    'notifications.no_notifications': 'No notifications',

    // Reports
    'report.incident_title': 'Incident Title',
    'report.title_placeholder': 'Brief description of what happened',
    'report.location': 'Location',
    'report.location_placeholder': 'Where did this incident occur?',
    'report.detailed_description': 'Detailed Description',
    'report.description_placeholder': 'Please provide as much detail as possible...',

    // Law Enforcement
    'le.dashboard.title': 'Law Enforcement Command Center',
    'le.dashboard.subtitle': 'Protecting and serving the community',
    'le.duty_status': 'Duty Status: On Active Patrol - Western Province',

    // Moderator
    'mod.dashboard.title': 'Community Moderation Center',
    'mod.dashboard.subtitle': 'Maintaining a safe and supportive community',
  },

  si: {
    // App Title and Branding
    'app.title': 'සේෆ්හර්',
    'app.subtitle': 'ශ්‍රී ලාංකික කාන්තාවන්ට ආරක්ෂක මෙවලම්',
    'app.tagline': 'ඔබේ ආරක්ෂක සහකරු',

    // Auth
    'auth.welcome_back': 'නැවත සාදරයෙන් පිළිගනිමු',
    'auth.sign_in_tagline': 'ඔබේ ආරක්ෂක සහකරුට පුරන්න',
    'auth.join_community': 'අපේ ප්‍රජාවට සම්බන්ධ වන්න',
    'auth.create_account': 'ආරක්ෂිත හෙටක් සඳහා ඔබේ ගිණුම සාදන්න',
    'auth.email': 'විද්‍යුත් තැපැල් ලිපිනය',
    'auth.password': 'මුරපදය',
    'auth.confirm_password': 'මුරපදය තහවුරු කරන්න',
    'auth.full_name': 'සම්පූර්ණ නම',
    'auth.role': 'භූමිකාව',
    'auth.language': 'භාෂාව',
    'auth.enter_email': 'ඔබේ විද්‍යුත් තැපෑල ඇතුළත් කරන්න',
    'auth.enter_password': 'ඔබේ මුරපදය ඇතුළත් කරන්න',
    'auth.create_password': 'මුරපදයක් සාදන්න',
    'auth.confirm_password_placeholder': 'ඔබේ මුරපදය තහවුරු කරන්න',
    'auth.enter_full_name': 'ඔබේ සම්පූර්ණ නම ඇතුළත් කරන්න',
    'auth.creating_account': 'ගිණුම සාදමින්...',
    'auth.signing_in': 'පුරනවමින්...',
    'auth.dont_have_account': 'ගිණුමක් නැද්ද?',
    'auth.already_have_account': 'දැනටමත් ගිණුමක් තිබේද?',
    'auth.account_created': 'සේෆ්හර් වෙත සාදරයෙන් පිළිගනිමු!',
    'auth.account_created_message': 'ඔබේ ගිණුම සාර්ථකව සාදන ලදී. ඔබට දැන් සියලුම ආරක්ෂක විශේෂාංග වලට ප්‍රවේශ විය හැකි අතර අපගේ සහායක ප්‍රජාවට සම්බන්ධ විය හැකිය.',
    'auth.continue_to_signin': 'පුරනවීම වෙත ඉදිරියට',

    // Roles
    'role.user': 'පරිශීලක',
    'role.law_enforcement': 'නීතිය ක්‍රියාත්මක කිරීම',
    'role.moderator': 'මධ්‍යස්ථ',

    // Navigation
    'nav.dashboard': 'මුල් පිටුව',
    'nav.sos': 'හදිසි SOS',
    'nav.report': 'සිදුවීම් වාර්තාව',
    'nav.education': 'ආරක්ෂක අධ්‍යාපනය',
    'nav.community': 'ප්‍රජා සභාව',
    'nav.safe_zones': 'ආරක්ෂිත ප්‍රදේශ',
    'nav.contacts': 'හදිසි සම්බන්ධතා',
    'nav.profile': 'මගේ පැතිකඩ',
    'nav.settings': 'සැකසුම්',
    'nav.notifications': 'දැනුම්දීම්',
    'nav.analytics': 'විශ්ලේෂණ',

    // Law Enforcement Navigation
    'nav.command_center': 'අණදෙන මධ්‍යස්ථානය',
    'nav.active_alerts': 'ක්‍රියාකාරී අනතුරු ඇඟවීම්',
    'nav.case_management': 'නඩු කළමනාකරණය',
    'nav.patrol_areas': 'මුර සංචාර ප්‍රදේශ',
    'nav.crime_analytics': 'අපරාධ විශ්ලේෂණ',
    'nav.incident_reports': 'සිදුවීම් වාර්තා',

    // Moderator Navigation
    'nav.moderation_center': 'මධ්‍යස්ථ මධ්‍යස්ථානය',
    'nav.content_review': 'අන්තර්ගත සමාලෝචනය',
    'nav.community_management': 'ප්‍රජා කළමනාකරණය',
    'nav.user_management': 'පරිශීලක කළමනාකරණය',
    'nav.community_analytics': 'ප්‍රජා විශ්ලේෂණ',
    'nav.guidelines': 'මාර්ගෝපදේශ',

    // Common Actions
    'action.save': 'සුරකින්න',
    'action.cancel': 'අවලංගු කරන්න',
    'action.edit': 'සංස්කරණය',
    'action.delete': 'මකන්න',
    'action.submit': 'ඉදිරිපත් කරන්න',
    'action.close': 'වසන්න',
    'action.back': 'ආපසු',
    'action.back_to_home': 'මුල් පිටුවට ආපසු',
    'action.next': 'ඊළඟ',
    'action.previous': 'පෙර',
    'action.confirm': 'තහවුරු කරන්න',
    'action.sign_in': 'පුරන්න',
    'action.sign_up': 'ලියාපදිංචි වන්න',
    'action.sign_out': 'ඉවත් වන්න',

    // Emergency
    'emergency.sos': 'හදිසි SOS',
    'emergency.send_alert': 'අනතුරු ඇඟවීම යවන්න',
    'emergency.alert_sent': 'අනතුරු ඇඟවීම සාර්ථකව යවන ලදී',
    'emergency.help_coming': 'උදව් එමින් පවතී',
    'emergency.call_police': 'පොලිසියට කතා කරන්න',
    'emergency.share_location': 'ස්ථානය බෙදාගන්න',

    // Dashboard
    'dashboard.welcome': 'සේෆ්හර් වෙත සාදරයෙන් පිළිගනිමු',
    'dashboard.safety_tip': 'අද දිනේ ආරක්ෂක උපදෙස',
    'dashboard.recent_activity': 'මෑත ක්‍රියාකාරකම්',
    'dashboard.quick_actions': 'ඉක්මන් ක්‍රියා',
    'dashboard.your_stats': 'ඔබේ සංඛ්‍යාලේඛන',
    'dashboard.loading': 'ඔබේ ආරක්ෂක වේදිකාව පූරණය වෙමින්...',

    // Languages
    'language.english': 'ඉංග්‍රීසි',
    'language.sinhala': 'සිංහල',
    'language.tamil': 'දෙමළ',

    // Status
    'status.loading': 'පූරණය වෙමින්...',
    'status.saving': 'සුරකිමින්...',
    'status.success': 'සාර්ථකයි',
    'status.error': 'දෝෂයක්',
    'status.active': 'ක්‍රියාකාරී',
    'status.resolved': 'විසඳන ලදී',
    'status.pending': 'පොරොත්තුවේ',

    // Home Page
    'home.hero.title': 'ශ්‍රී ලාංකික කාන්තාවන්ට ආරක්ෂාව සහ ප්‍රජාව',
    'home.hero.subtitle': 'හදිසි අනතුරු ඇඟවීම්, ආරක්ෂක අධ්‍යාපනය සහ ප්‍රජා සහාය සඳහා අපගේ වේදිකාව විශ්වාස කරන ශ්‍රී ලංකාව පුරා සිටින දහස් ගණන් කාන්තාවන්ට සම්බන්ධ වන්න.',
    'home.hero.get_started': 'නොමිලේ ආරම්භ කරන්න',
    'home.hero.learn_more': 'වැඩිදුර දැනගන්න',
    'home.hero.emergency_feature': 'එක් ස්පර්ශයකින් හදිසි SOS',
    'home.hero.safe_zones_feature': 'ආසන්න ආරක්ෂිත ප්‍රදේශ සොයන්න',
    'home.hero.community_feature': 'ප්‍රජාව සමඟ සම්බන්ධ වන්න',

    // Features
    'home.features.title': 'සම්පූර්ණ ආරක්ෂක විශේෂාංග',
    'home.features.subtitle': 'එක් ප්‍රබල වේදිකාවකින් ආරක්ෂිතව සහ සම්බන්ධව සිටීමට අවශ්‍ය සියල්ල',
    'home.features.emergency.title': 'හදිසි SOS',
    'home.features.emergency.description': 'ඔබේ සම්බන්ධතා සහ ප්‍රාදේශීය බලධාරීන්ට ක්ෂණිකව දැනුම් දෙන එක් ස්පර්ශ හදිසි අනතුරු ඇඟවීම්',
    'home.features.safe_zones.title': 'ආරක්ෂිත ප්‍රදේශ',
    'home.features.safe_zones.description': 'පොලිස් ස්ථාන, රෝහල් සහ සහාය මධ්‍යස්ථාන ඇතුළු සත්‍යාපිත ආරක්ෂිත ස්ථාන සොයන්න',
    'home.features.education.title': 'ආරක්ෂක අධ්‍යාපනය',
    'home.features.education.description': 'ප්‍රවීණයන්ගෙන් ආත්මාරක්ෂාව, ඩිජිටල් ආරක්ෂාව සහ හදිසි සූදානම ඉගෙන ගන්න',
    'home.features.community.title': 'ප්‍රජා සහාය',
    'home.features.community.description': 'අනෙකුත් කාන්තාවන් සමඟ සම්බන්ධ වන්න, අත්දැකීම් බෙදාගන්න සහ එකිනෙකාට සහාය වන්න',

    // Stats
    'home.stats.users': '8,500+',
    'home.stats.users_label': 'ක්‍රියාකාරී පරිශීලකයින්',
    'home.stats.incidents': '97.8%',
    'home.stats.incidents_label': 'විසඳුම් අනුපාතය',
    'home.stats.response': '3.2 මිනි',
    'home.stats.response_label': 'සාමාන්‍ය ප්‍රතිචාර කාලය',
    'home.stats.zones': '450+',
    'home.stats.zones_label': 'ආරක්ෂිත ප්‍රදේශ',

    // Testimonials
    'home.testimonials.title': 'ශ්‍රී ලංකාව පුරා කාන්තාවන්ගේ විශ්වාසය',
    'home.testimonials.subtitle': 'අපගේ ප්‍රජා සාමාජිකයින්ගේ සැබෑ කතන්දර',
    'home.testimonials.user1.name': 'සඳුනි ප.',
    'home.testimonials.user1.text': 'සේෆ්හර් මට තනිවම ගමන් කිරීමට විශ්වාසය ලබා දුන්නා. හදිසි සම්බන්ධතා විශේෂාංගය සහ ආරක්ෂක උපදෙස් ඉතා වටිනවා.',
    'home.testimonials.user2.name': 'ප්‍රියා ර.',
    'home.testimonials.user2.text': 'ප්‍රජා සභාව මට ආරක්ෂිත නවාතැන් සොයා ගැනීමට සහ මගේ ප්‍රදේශයේ අනෙකුත් වැඩ කරන කාන්තාවන් සමඟ සම්බන්ධ වීමට උදව් කළා.',
    'home.testimonials.user3.name': 'නිමේෂා ස.',
    'home.testimonials.user3.text': 'රාත්‍රී වැඩ කරන්නියක් ලෙස, මට ක්ෂණිකව මගේ පවුලට සහ බලධාරීන්ට අනතුරු ඇඟවීමට හැකි බව දැන ගැනීම මට මානසික සාමය ලබා දෙනවා.',

    // Emergency
    'home.emergency.title': 'හදිසි අවස්ථාවක්ද?',
    'home.emergency.subtitle': 'බලා නොසිට - මෙම හදිසි අංක භාවිතයෙන් වහාම උදව් ලබා ගන්න',
    'home.emergency.police': 'පොලිස් හදිසි',
    'home.emergency.women_child': 'කාන්තා සහ ළමා අංශය',
    'home.emergency.ambulance': 'ගිලන් රථ සේවාව',

    // CTA
    'home.cta.title': 'ඔබේ ආරක්ෂාව පාලනය කිරීමට සූදානම්ද?',
    'home.cta.subtitle': 'අද අපගේ ප්‍රජාවට සම්බන්ධ වී සියලුම ආරක්ෂක විශේෂාංග සම්පූර්ණයෙන්ම නොමිලේ ප්‍රවේශ කරන්න',
    'home.cta.join_now': 'දැන් සම්බන්ධ වන්න - නොමිලේ',

    // Footer
    'home.footer.description': 'සම්පූර්ණ ආරක්ෂක මෙවලම්, අධ්‍යාපනය සහ ප්‍රජා සහාය සමඟ ශ්‍රී ලාංකික කාන්තාවන් සවිබල ගැන්වීම.',
    'home.footer.languages': 'ඉංග්‍රීසි, සිංහල සහ දෙමළ භාෂාවලින් ලබා ගත හැකිය',
    'home.footer.quick_links': 'ඉක්මන් සබැඳි',
    'home.footer.about': 'අප ගැන',
    'home.footer.safety_tips': 'ආරක්ෂක උපදෙස්',
    'home.footer.resources': 'සම්පත්',
    'home.footer.contact': 'සම්බන්ධතාව',
    'home.footer.emergency': 'හදිසි අංක',
    'home.footer.police': 'පොලිසිය',
    'home.footer.women_child': 'කාන්තා සහ ළමා',
    'home.footer.ambulance': 'ගිලන් රථය',
    'home.footer.rights': 'සියලුම හිමිකම් ඇවිරිණි.',
    // Profile
    'profile.title': 'මගේ පැතිකඩ',
    'profile.personal_info': 'පුද්ගලික තොරතුරු',
    'profile.emergency_contact': 'හදිසි සම්බන්ධතාව',
    'profile.notification_prefs': 'දැනුම්දීම් මනාපයන්',
    'profile.privacy_settings': 'පෞද්ගලිකත්ව සැකසුම්',

    // Settings
    'settings.profile': 'පැතිකඩ සැකසුම්',
    'settings.notifications': 'දැනුම්දීම් සැකසුම්',
    'settings.privacy': 'පෞද්ගලිකත්ව සැකසුම්',
    'settings.security': 'ආරක්ෂක සැකසුම්',

    // Notifications
    'notifications.title': 'දැනුම්දීම්',
    'notifications.unread': 'නොකියවූ',
    'notifications.urgent': 'හදිසි',
    'notifications.mark_all_read': 'සියල්ල කියවූ ලෙස සලකුණු කරන්න',
    'notifications.mark_read': 'කියවූ ලෙස සලකුණු කරන්න',
    'notifications.delete': 'මකන්න',
    'notifications.no_notifications': 'දැනුම්දීම් නැත',

    // Reports
    'report.incident_title': 'සිදුවීමේ මාතෘකාව',
    'report.title_placeholder': 'සිදු වූ දේ පිළිබඳ කෙටි විස්තරයක්',
    'report.location': 'ස්ථානය',
    'report.location_placeholder': 'මෙම සිදුවීම සිදු වූයේ කොහේද?',
    'report.detailed_description': 'සවිස්තර විස්තරය',
    'report.description_placeholder': 'කරුණාකර හැකි තරම් විස්තර සපයන්න...',

    // Law Enforcement
    'le.dashboard.title': 'නීතිය ක්‍රියාත්මක කිරීමේ අණදෙන මධ්‍යස්ථානය',
    'le.dashboard.subtitle': 'ප්‍රජාව ආරක්ෂා කිරීම සහ සේවය කිරීම',
    'le.duty_status': 'රාජකාරි තත්ත්වය: ක්‍රියාකාරී මුර සංචාරයේ - බස්නාහිර පළාත',

    // Moderator
    'mod.dashboard.title': 'ප්‍රජා මධ්‍යස්ථ මධ්‍යස්ථානය',
    'mod.dashboard.subtitle': 'ආරක්ෂිත සහ සහායක ප්‍රජාවක් පවත්වා ගැනීම',
  },

  ta: {
    // App Title and Branding
    'app.title': 'சேஃப்ஹர்',
    'app.subtitle': 'இலங்கை பெண்களுக்கு பாதுகாப்பு கருவிகள்',
    'app.tagline': 'உங்கள் பாதுகாப்பு துணை',

    // Auth
    'auth.welcome_back': 'மீண்டும் வரவேற்கிறோம்',
    'auth.sign_in_tagline': 'உங்கள் பாதுகாப்பு துணையில் உள்நுழையுங்கள்',
    'auth.join_community': 'எங்கள் சமூகத்தில் சேருங்கள்',
    'auth.create_account': 'பாதுகாப்பான நாளைக்காக உங்கள் கணக்கை உருவாக்குங்கள்',
    'auth.email': 'மின்னஞ்சல் முகவரி',
    'auth.password': 'கடவுச்சொல்',
    'auth.confirm_password': 'கடவுச்சொல்லை உறுதிப்படுத்தவும்',
    'auth.full_name': 'முழு பெயர்',
    'auth.role': 'பங்கு',
    'auth.language': 'மொழி',
    'auth.enter_email': 'உங்கள் மின்னஞ்சலை உள்ளிடவும்',
    'auth.enter_password': 'உங்கள் கடவுச்சொல்லை உள்ளிடவும்',
    'auth.create_password': 'கடவுச்சொல்லை உருவாக்கவும்',
    'auth.confirm_password_placeholder': 'உங்கள் கடவுச்சொல்லை உறுதிப்படுத்தவும்',
    'auth.enter_full_name': 'உங்கள் முழு பெயரை உள்ளிடவும்',
    'auth.creating_account': 'கணக்கை உருவாக்குகிறது...',
    'auth.signing_in': 'உள்நுழைகிறது...',
    'auth.dont_have_account': 'கணக்கு இல்லையா?',
    'auth.already_have_account': 'ஏற்கனவே கணக்கு உள்ளதா?',
    'auth.account_created': 'சேஃப்ஹர் வரவேற்கிறது!',
    'auth.account_created_message': 'உங்கள் கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது. இப்போது நீங்கள் அனைத்து பாதுகாப்பு அம்சங்களையும் அணுகலாம் மற்றும் எங்கள் ஆதரவு சமூகத்தில் சேரலாம்.',
    'auth.continue_to_signin': 'உள்நுழைவுக்கு தொடரவும்',

    // Roles
    'role.user': 'பயனர்',
    'role.law_enforcement': 'சட்ட அமலாக்கம்',
    'role.moderator': 'மிதவாதி',

    // Navigation
    'nav.dashboard': 'முகப்பு',
    'nav.sos': 'அவசர SOS',
    'nav.report': 'சம்பவ அறிக்கை',
    'nav.education': 'பாதுகாப்பு கல்வி',
    'nav.community': 'சமூக மன்றம்',
    'nav.safe_zones': 'பாதுகாப்பு மண்டலங்கள்',
    'nav.contacts': 'அவசர தொடர்புகள்',
    'nav.profile': 'என் சுயவிவரம்',
    'nav.settings': 'அமைப்புகள்',
    'nav.notifications': 'அறிவிப்புகள்',
    'nav.analytics': 'பகுப்பாய்வு',

    // Law Enforcement Navigation
    'nav.command_center': 'கட்டளை மையம்',
    'nav.active_alerts': 'செயலில் உள்ள எச்சரிக்கைகள்',
    'nav.case_management': 'வழக்கு மேலாண்மை',
    'nav.patrol_areas': 'ரோந்து பகுதிகள்',
    'nav.crime_analytics': 'குற்ற பகுப்பாய்வு',
    'nav.incident_reports': 'சம்பவ அறிக்கைகள்',

    // Moderator Navigation
    'nav.moderation_center': 'மிதமான மையம்',
    'nav.content_review': 'உள்ளடக்க மதிப்பாய்வு',
    'nav.community_management': 'சமூக மேலாண்மை',
    'nav.user_management': 'பயனர் மேலாண்மை',
    'nav.community_analytics': 'சமூக பகுப்பாய்வு',
    'nav.guidelines': 'வழிகாட்டுதல்கள்',

    // Common Actions
    'action.save': 'சேமி',
    'action.cancel': 'ரத்து செய்',
    'action.edit': 'திருத்து',
    'action.delete': 'நீக்கு',
    'action.submit': 'சமர்ப்பி',
    'action.close': 'மூடு',
    'action.back': 'பின்',
    'action.back_to_home': 'முகப்புக்கு திரும்பு',
    'action.next': 'அடுத்து',
    'action.previous': 'முந்தைய',
    'action.confirm': 'உறுதிப்படுத்து',
    'action.sign_in': 'உள்நுழை',
    'action.sign_up': 'பதிவு செய்',
    'action.sign_out': 'வெளியேறு',

    // Emergency
    'emergency.sos': 'அவசர SOS',
    'emergency.send_alert': 'எச்சரிக்கை அனுப்பு',
    'emergency.alert_sent': 'எச்சரிக்கை வெற்றிகரமாக அனுப்பப்பட்டது',
    'emergency.help_coming': 'உதவி வருகிறது',
    'emergency.call_police': 'காவல்துறையை அழை',
    'emergency.share_location': 'இடத்தைப் பகிர்',

    // Dashboard
    'dashboard.welcome': 'சேஃப்ஹர் வரவேற்கிறது',
    'dashboard.safety_tip': 'இன்றைய பாதுகாப்பு குறிப்பு',
    'dashboard.recent_activity': 'சமீபத்திய செயல்பாடு',
    'dashboard.quick_actions': 'விரைவு செயல்கள்',
    'dashboard.your_stats': 'உங்கள் புள்ளிவிவரங்கள்',
    'dashboard.loading': 'உங்கள் பாதுகாப்பு தளம் ஏற்றப்படுகிறது...',

    // Languages
    'language.english': 'ஆங்கிலம்',
    'language.sinhala': 'சிங்களம்',
    'language.tamil': 'தமிழ்',

    // Status
    'status.loading': 'ஏற்றுகிறது...',
    'status.saving': 'சேமிக்கிறது...',
    'status.success': 'வெற்றி',
    'status.error': 'பிழை',
    'status.active': 'செயலில்',
    'status.resolved': 'தீர்க்கப்பட்டது',
    'status.pending': 'நிலுவையில்',

    // Home Page
    'home.hero.title': 'இலங்கை பெண்களுக்கு பாதுகாப்பு மற்றும் சமூகம்',
    'home.hero.subtitle': 'இலங்கை பெண்களுக்காக சிறப்பாக வடிவமைக்கப்பட்ட அவசர எச்சரிக்கைகள், பாதுகாப்பு கல்வி மற்றும் சமூக ஆதரவை வழங்கும் உங்கள் விரிவான பாதுகாப்பு துணை.',
    'home.hero.get_started': 'இலவசமாக தொடங்குங்கள்',
    'home.hero.learn_more': 'மேலும் அறிக',
    'home.hero.emergency_feature': 'ஒரு தொடுதலில் அவசர SOS',
    'home.hero.safe_zones_feature': 'அருகிலுள்ள பாதுகாப்பு மண்டலங்களைக் கண்டறியுங்கள்',
    'home.hero.community_feature': 'சமூகத்துடன் இணைக்கவும்',

    // Features
    'home.features.title': 'விரிவான பாதுகாப்பு அம்சங்கள்',
    'home.features.subtitle': 'ஒரு சக்திவாய்ந்த தளத்தில் பாதுகாப்பாகவும் இணைக்கப்பட்டதாகவும் இருக்க தேவையான அனைத்தும்',
    'home.features.emergency.title': 'அவசர SOS',
    'home.features.emergency.description': 'உங்கள் தொடர்புகள் மற்றும் உள்ளூர் அதிகாரிகளுக்கு உடனடியாக அறிவிக்கும் ஒரு தொடுதல் அவசர எச்சரிக்கைகள்',
    'home.features.safe_zones.title': 'பாதுகாப்பு மண்டலங்கள்',
    'home.features.safe_zones.description': 'காவல் நிலையங்கள், மருத்துவமனைகள் மற்றும் ஆதரவு மையங்கள் உட்பட சரிபார்க்கப்பட்ட பாதுகாப்பான இடங்களைக் கண்டறியுங்கள்',
    'home.features.education.title': 'பாதுகாப்பு கல்வி',
    'home.features.education.description': 'நிபுணர்களிடமிருந்து தற்காப்பு, டிஜிட்டல் பாதுகாப்பு மற்றும் அவசர தயார்நிலையைக் கற்றுக்கொள்ளுங்கள்',
    'home.features.community.title': 'சமூக ஆதரவு',
    'home.features.community.description': 'மற்ற பெண்களுடன் இணைக்கவும், அனுபவங்களைப் பகிர்ந்து கொள்ளுங்கள், ஒருவருக்கொருவர் ஆதரவளியுங்கள்',

    // Testimonials
    'home.testimonials.title': 'இலங்கை முழுவதும் பெண்களால் நம்பப்படுகிறது',
    'home.testimonials.subtitle': 'எங்கள் சமூக உறுப்பினர்களின் உண்மையான கதைகள்',
    'home.testimonials.user1.name': 'சந்துனி ப.',
    'home.testimonials.user1.text': 'சேஃப்ஹர் எனக்கு தனியாக பயணிக்க நம்பிக்கை அளித்தது. அவசர தொடர்பு அம்சம் மற்றும் பாதுகாப்பு குறிப்புகள் மிகவும் மதிப்புமிக்கவை.',
    'home.testimonials.user2.name': 'பிரியா ர.',
    'home.testimonials.user2.text': 'சமூக மன்றம் எனக்கு பாதுகாப்பான தங்குமிடம் கண்டுபிடிக்கவும் என் பகுதியில் உள்ள மற்ற வேலை செய்யும் பெண்களுடன் இணைக்கவும் உதவியது.',
    'home.testimonials.user3.name': 'நிமேஷா ச.',
    'home.testimonials.user3.text': 'இரவு ஷிப்ட் தொழிலாளியாக, என் குடும்பம் மற்றும் அதிகாரிகளுக்கு உடனடியாக எச்சரிக்கை செய்ய முடியும் என்பதை அறிவது எனக்கு மன அமைதியை அளிக்கிறது.',

    // Emergency
    'home.emergency.title': 'அவசரநிலையில்?',
    'home.emergency.subtitle': 'காத்திருக்காதீர்கள் - இந்த அவசர எண்களைப் பயன்படுத்தி உடனடியாக உதவி பெறுங்கள்',
    'home.emergency.police': 'காவல்துறை அவசரநிலை',
    'home.emergency.women_child': 'பெண்கள் மற்றும் குழந்தைகள் பிரிவு',
    'home.emergency.ambulance': 'ஆம்புலன்ஸ் சேவை',

    // CTA
    'home.cta.title': 'உங்கள் பாதுகாப்பைக் கட்டுப்படுத்த தயாரா?',
    'home.cta.subtitle': 'எங்கள் சமூகத்தில் சேர்ந்து இலங்கை பெண்களுக்காக வடிவமைக்கப்பட்ட விரிவான பாதுகாப்பு அம்சங்களை அணுகுங்கள்',
    'home.cta.join_now': 'இப்போது சேருங்கள் - இது இலவசம்',

    // Footer
    'home.footer.description': 'விரிவான பாதுகாப்பு கருவிகள், கல்வி மற்றும் சமூக ஆதரவுடன் இலங்கை பெண்களை மேம்படுத்துதல்.',
    'home.footer.languages': 'ஆங்கிலம், சிங்களம் மற்றும் தமிழில் கிடைக்கும்',
    'home.footer.quick_links': 'விரைவு இணைப்புகள்',
    'home.footer.about': 'எங்களைப் பற்றி',
    'home.footer.safety_tips': 'பாதுகாப்பு குறிப்புகள்',
    'home.footer.resources': 'வளங்கள்',
    'home.footer.contact': 'தொடர்பு',
    'home.footer.emergency': 'அவசர எண்கள்',
    'home.footer.police': 'காவல்துறை',
    'home.footer.women_child': 'பெண்கள் மற்றும் குழந்தைகள்',
    'home.footer.ambulance': 'ஆம்புலன்ஸ்',
    'home.footer.rights': 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    // Profile
    'profile.title': 'என் சுயவிவரம்',
    'profile.personal_info': 'தனிப்பட்ட தகவல்',
    'profile.emergency_contact': 'அவசர தொடர்பு',
    'profile.notification_prefs': 'அறிவிப்பு விருப்பத்தேர்வுகள்',
    'profile.privacy_settings': 'தனியுரிமை அமைப்புகள்',

    // Settings
    'settings.profile': 'சுயவிவர அமைப்புகள்',
    'settings.notifications': 'அறிவிப்பு அமைப்புகள்',
    'settings.privacy': 'தனியுரிமை அமைப்புகள்',
    'settings.security': 'பாதுகாப்பு அமைப்புகள்',

    // Notifications
    'notifications.title': 'அறிவிப்புகள்',
    'notifications.unread': 'படிக்காதவை',
    'notifications.urgent': 'அவசரம்',
    'notifications.mark_all_read': 'அனைத்தையும் படித்ததாக குறிக்கவும்',
    'notifications.mark_read': 'படித்ததாக குறிக்கவும்',
    'notifications.delete': 'நீக்கு',
    'notifications.no_notifications': 'அறிவிப்புகள் இல்லை',

    // Reports
    'report.incident_title': 'சம்பவ தலைப்பு',
    'report.title_placeholder': 'என்ன நடந்தது என்பதற்கான சுருக்கமான விளக்கம்',
    'report.location': 'இடம்',
    'report.location_placeholder': 'இந்த சம்பவம் எங்கே நடந்தது?',
    'report.detailed_description': 'விரிவான விளக்கம்',
    'report.description_placeholder': 'தயவுசெய்து முடிந்தவரை விவரங்களை வழங்கவும்...',

    // Law Enforcement
    'le.dashboard.title': 'சட்ட அமலாக்க கட்டளை மையம்',
    'le.dashboard.subtitle': 'சமூகத்தை பாதுகாத்து சேவை செய்தல்',
    'le.duty_status': 'கடமை நிலை: செயலில் ரோந்து - மேற்கு மாகாணம்',

    // Moderator
    'mod.dashboard.title': 'சமூக மிதமான மையம்',
    'mod.dashboard.subtitle': 'பாதுகாப்பான மற்றும் ஆதரவான சமூகத்தை பராமரித்தல்',
  }
}