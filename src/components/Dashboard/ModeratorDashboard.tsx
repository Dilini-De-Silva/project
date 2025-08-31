import React, { useState } from 'react'
import { Shield, Users, MessageSquare, Flag, TrendingUp, Clock, Eye, Check, X, AlertTriangle } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import { MultilingualTextArea } from '../Common/MultilingualTextArea'

const moderatorStats = [
  { label: 'Pending Reviews', value: '23', icon: Flag, color: 'text-orange-600', bg: 'bg-orange-50' },
  { label: 'Forum Posts Today', value: '67', icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Active Users', value: '8,247', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Resolution Rate', value: '97.8%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' }
]

const pendingReports = [
  {
    id: 1,
    type: 'Forum Post',
    title: 'Self-defense classes in Kandy area?',
    reporter: 'KandyStudent2025',
    category: 'Harassment',
    time: '45 minutes ago',
    priority: 'Low',
    content: 'Hi everyone! I\'m a university student in Kandy and looking for good self-defense classes. Has anyone attended Shotokan Karate classes at the Kandy Sports Club? Are they beginner-friendly?',
    status: 'Flagged for Review'
  },
  {
    id: 2,
    type: 'Incident Report',
    title: 'Inappropriate comments at workplace',
    reporter: 'Anonymous',
    category: 'Workplace Harassment',
    time: '2 hours ago',
    priority: 'Medium',
    content: 'Male colleague making inappropriate comments about appearance and asking personal questions. Happens daily in office elevator and break room. Management not responsive to informal complaints.',
    status: 'Under Review'
  },
  {
    id: 3,
    type: 'Forum Post',
    title: 'Safety concerns about late night study sessions',
    reporter: 'MedStudent_CMC',
    category: 'Educational Safety',
    time: '4 hours ago',
    priority: 'High',
    content: 'As a medical student at CMC, I often have to stay late for studies. The library closes at 10 PM but sometimes we need to stay longer. The walk to the hostel feels unsafe. Any suggestions for group study arrangements or safety measures?',
    status: 'Pending Approval'
  },
  {
    id: 4,
    type: 'User Report',
    title: 'Fake emergency contact information',
    reporter: 'SafeHerModerator',
    category: 'Data Integrity',
    time: '6 hours ago',
    priority: 'Medium',
    content: 'User profile contains emergency contact with invalid phone number format. Multiple reports of failed emergency notifications.',
    status: 'Verification Required'
  }
]

const communityMetrics = [
  { metric: 'New Users This Week', value: '156', trend: '+23%', positive: true },
  { metric: 'Forum Engagement Rate', value: '89.4%', trend: '+8.2%', positive: true },
  { metric: 'Avg Response Time', value: '1.2h', trend: '-28%', positive: true },
  { metric: 'Community Violations', value: '4', trend: '-45%', positive: true },
  { metric: 'Content Approval Rate', value: '94.7%', trend: '+2.1%', positive: true },
  { metric: 'User Satisfaction', value: '4.8/5', trend: '+0.3', positive: true }
]

export function ModeratorDashboard() {
  const [selectedReport, setSelectedReport] = useState<any>(null)
  const [reviewAction, setReviewAction] = useState('')
  const { t } = useLanguage()

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const handleApprove = (reportId: number) => {
    console.log('Approving report:', reportId)
    setSelectedReport(null)
  }

  const handleReject = (reportId: number) => {
    console.log('Rejecting report:', reportId)
    setSelectedReport(null)
  }

  const handleEscalate = (reportId: number) => {
    console.log('Escalating report:', reportId)
    setSelectedReport(null)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <div className="h-12 w-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{t('mod.dashboard.title')}</h2>
            <p className="text-indigo-100">{t('mod.dashboard.subtitle')}</p>
          </div>
        </div>
        <div className="bg-white bg-opacity-10 rounded-lg p-4 mt-6">
          <p className="text-sm">
            <strong>Moderation Status:</strong> {t('status.active')} - 23 items awaiting review
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {moderatorStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`h-12 w-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Pending Reviews */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Flag className="h-6 w-6 text-orange-500" />
          <span>Pending Content Reviews</span>
        </h3>
        
        <div className="space-y-4">
          {pendingReports.map((report) => (
            <div key={report.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{report.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(report.priority)}`}>
                      {report.priority}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <span>Type: {report.type}</span>
                    <span>Category: {report.category}</span>
                    <span>Reporter: {report.reporter}</span>
                    <span>{report.time}</span>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3">{report.content}</p>
                  
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    report.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' :
                    report.status === 'Flagged' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {report.status}
                  </span>
                </div>
                
                <div className="flex flex-col space-y-2 ml-4">
                  <button
                    onClick={() => setSelectedReport(report)}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1"
                  >
                    <Eye className="h-3 w-3" />
                    <span>Review</span>
                  </button>
                  <button
                    onClick={() => handleApprove(report.id)}
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1"
                  >
                    <Check className="h-3 w-3" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => handleReject(report.id)}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1"
                  >
                    <X className="h-3 w-3" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Health Metrics */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Community Health Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {communityMetrics.map((metric, index) => (
            <div key={index} className="text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
              <p className="text-sm font-medium text-gray-600 mb-2">{metric.metric}</p>
              <span className={`text-xs font-medium ${
                metric.positive ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.trend}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Content Moderation Tools */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Moderation Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-blue-50 hover:bg-blue-100 border border-blue-200 p-4 rounded-lg text-left transition-all duration-200">
            <MessageSquare className="h-6 w-6 text-blue-600 mb-2" />
            <h4 className="font-semibold text-blue-900 mb-1">Review Forum Posts</h4>
            <p className="text-sm text-blue-700">Moderate community discussions</p>
          </button>
          
          <button className="bg-purple-50 hover:bg-purple-100 border border-purple-200 p-4 rounded-lg text-left transition-all duration-200">
            <Users className="h-6 w-6 text-purple-600 mb-2" />
            <h4 className="font-semibold text-purple-900 mb-1">User Management</h4>
            <p className="text-sm text-purple-700">Manage user accounts and permissions</p>
          </button>
          
          <button className="bg-green-50 hover:bg-green-100 border border-green-200 p-4 rounded-lg text-left transition-all duration-200">
            <AlertTriangle className="h-6 w-6 text-green-600 mb-2" />
            <h4 className="font-semibold text-green-900 mb-1">Content Guidelines</h4>
            <p className="text-sm text-green-700">Update community guidelines</p>
          </button>
        </div>
      </div>

      {/* Report Review Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Content Review</h3>
              <button
                onClick={() => setSelectedReport(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Content Type</label>
                  <p className="font-semibold text-gray-900">{selectedReport.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Priority</label>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedReport.priority)}`}>
                    {selectedReport.priority}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Title</label>
                <p className="font-semibold text-gray-900">{selectedReport.title}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Content</label>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-2">
                  <p className="text-gray-900">{selectedReport.content}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Reporter</label>
                  <p className="text-gray-900">{selectedReport.reporter}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Category</label>
                  <p className="text-gray-900">{selectedReport.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Reported</label>
                  <p className="text-gray-900">{selectedReport.time}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">Moderation Action</label>
                <select
                  value={reviewAction}
                  onChange={(e) => setReviewAction(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4"
                >
                  <option value="">Select an action...</option>
                  <option value="approve">Approve - Content is appropriate</option>
                  <option value="reject">Reject - Violates community guidelines</option>
                  <option value="edit">Request Edit - Minor modifications needed</option>
                  <option value="escalate">Escalate - Requires law enforcement attention</option>
                  <option value="warning">Issue Warning - First-time violation</option>
                </select>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => handleApprove(selectedReport.id)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Check className="h-4 w-4" />
                  <span>Approve</span>
                </button>
                <button
                  onClick={() => handleEscalate(selectedReport.id)}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <AlertTriangle className="h-4 w-4" />
                  <span>Escalate</span>
                </button>
                <button
                  onClick={() => handleReject(selectedReport.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}