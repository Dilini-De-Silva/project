@@ .. @@
 import React, { useState } from 'react'
 import { Bell, Save, Shield, Users, AlertTriangle, Clock, Phone, Mail, Smartphone } from 'lucide-react'
 import { useAuth } from '../../contexts/AuthContext'
+import { useLanguage } from '../../contexts/LanguageContext'
@@ .. @@
 export function NotificationSettings() {
   const { user } = useAuth()
 }
+  const { t } = useLanguage()
   const [settings, setSettings] = useState<NotificationSettingsData>({
   }
   )
@@ .. @@
       <div className="flex items-center justify-between">
         <div>
-          <h2 className="text-3xl font-bold text-gray-900 mb-2">Notification Settings</h2>
+          <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('settings.notifications')}</h2>
           <p className="text-gray-600">Customize how and when you receive notifications</p>
         </div>
         <button
           onClick={handleSave}
           disabled={saving}
           className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 flex items-center space-x-2"
         >
           <Save className="h-5 w-5" />
-          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
+          <span>{saving ? t('status.saving') : t('action.save')} Settings</span>
         </button>
       </div>