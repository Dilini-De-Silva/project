import React, { useState } from 'react'
import { 
  Flag, 
  Eye, 
  Check, 
  X, 
  AlertTriangle, 
  MessageSquare, 
  User, 
  Clock, 
  Filter,
  Search,
  ChevronDown,
  FileText,
  Image,
  Video,
  Link,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal
} from 'lucide-react'
import { MultilingualTextArea } from '../Common/MultilingualTextArea'

interface ContentItem {
  id: string
  type: 'forum_post' | 'comment' | 'profile' | 'image' | 'report'
  title: string
  content: string
  author: string
  authorId: string
  reportedBy: string[]
  reportReasons: string[]
  flaggedAt: string
  priority: 'Critical' | 'High' | 'Medium' | 'Low'
  status: 'Pending' | 'Under Review' | 'Approved' | 'Rejected' | 'Escalated'
  category: string
  likes: number
  replies: number
  attachments?: string[]
  moderatorNotes?: string[]
}

const mockContent: ContentItem[] = [
  {
    id: 'CNT-2025-001',
    type: 'forum_post',
    title: 'Meeting strangers from dating apps - safety tips needed',
    content: 'Hi everyone! I\'ve been using dating apps and planning to meet someone for the first time. What safety precautions should I take? Should I tell someone where I\'m going? Any red flags to watch out for during conversations?',
    author: 'SafetySeeker_23',
    authorId: 'USR_2025_4567',
    reportedBy: ['USR_2025_1234', 'USR_2025_5678', 'USR_2025_9012'],
    reportReasons: ['Potentially unsafe advice', 'Encouraging risky behavior', 'Inappropriate content'],
    flaggedAt: '2025-01-31T14:30:00Z',
    priority: 'High',
    status: 'Pending',
    category: 'Dating Safety',
    likes: 12,
    replies: 8,
    attachments: ['dating_app_screenshot.jpg']
  },
  {
    id: 'CNT-2025-002',
    type: 'comment',
    title: 'Response to: "Safe accommodation in Colombo"',
    content: 'You should avoid staying in Wellawatte area, especially near the railway line. Too many incidents happen there. I can help you find a place if you contact me privately. I know the area very well and can show you around.',
    author: 'HelpfulLocal_2025',
    authorId: 'USR_2025_7890',
    reportedBy: ['USR_2025_3456', 'USR_2025_6789'],
    reportReasons: ['Potential predatory behavior', 'Inappropriate private contact offer'],
    flaggedAt: '2025-01-31T13:15:00Z',
    priority: 'Critical',
    status: 'Under Review',
    category: 'Housing Safety',
    likes: 2,
    replies: 0
  },
  {
    id: 'CNT-2025-003',
    type: 'forum_post',
    title: 'Self-defense classes in Kandy - personal experience',
    content: 'I recently joined karate classes at the Kandy Sports Club. The instructor is very professional and they have women-only sessions on Saturdays. Monthly fee is Rs. 4,000. Great for building confidence and learning practical techniques!',
    author: 'KandyStudent_2025',
    authorId: 'USR_2025_2345',
    reportedBy: ['USR_2025_8901'],
    reportReasons: ['Spam/promotional content'],
    flaggedAt: '2025-01-31T12:00:00Z',
    priority: 'Low',
    status: 'Pending',
    category: 'Self-Defense',
    likes: 24,
    replies: 15
  },
  {
    id: 'CNT-2025-004',
    type: 'forum_post',
    title: 'Workplace harassment - need legal advice',
    content: 'My supervisor has been making inappropriate comments and touching my shoulder/back during meetings. I\'ve told him to stop but it continues. HR says they need "concrete evidence." What should I do? Can I record conversations legally in Sri Lanka?',
    author: 'Anonymous',
    authorId: 'USR_2025_ANON_456',
    reportedBy: ['USR_2025_4567'],
    reportReasons: ['Sensitive legal content requiring expert review'],
    flaggedAt: '2025-01-31T11:45:00Z',
    priority: 'Medium',
    status: 'Pending',
    category: 'Workplace Safety',
    likes: 18,
    replies: 12
  }
]

export function ContentReview() {
  const [content, setContent] = useState<ContentItem[]>(mockContent)
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null)
  const [filter, setFilter] = useState<'all' | 'pending' | 'critical'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [moderationAction, setModerationAction] = useState('')
  const [moderatorNote, setModeratorNote] = useState('')

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase())
    
    switch (filter) {
      case 'pending':
        return matchesSearch && item.status === 'Pending'
      case 'critical':
        return matchesSearch && (item.priority === 'Critical' || item.priority === 'High')
      default:
        return matchesSearch
    }
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'Under Review': return 'bg-blue-100 text-blue-800'
      case 'Approved': return 'bg-green-100 text-green-800'
      case 'Rejected': return 'bg-red-100 text-red-800'
      case 'Escalated': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'forum_post': return <MessageSquare className="h-4 w-4" />
      case 'comment': return <MessageSquare className="h-4 w-4" />
      case 'profile': return <User className="h-4 w-4" />
      case 'image': return <Image className="h-4 w-4" />
      case 'report': return <FileText className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const handleApprove = (contentId: string) => {
    setContent(prev => prev.map(item => 
      item.id === contentId ? { ...item, status: 'Approved' as const } : item
    ))
    setSelectedContent(null)
  }

  const handleReject = (contentId: string) => {
    setContent(prev => prev.map(item => 
      item.id === contentId ? { ...item, status: 'Rejected' as const } : item
    ))
    setSelectedContent(null)
  }

  const handleEscalate = (contentId: string) => {
    setContent(prev => prev.map(item => 
      item.id === contentId ? { ...item, status: 'Escalated' as const } : item
    ))
    setSelectedContent(null)
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Content Review Center</h2>
          <p className="text-gray-600">Review flagged content and maintain community standards</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
            {content.filter(c => c.priority === 'Critical').length} Critical
          </div>
          <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
            {content.filter(c => c.status === 'Pending').length} Pending
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search content by title, author, or content..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex space-x-2">
          {[
            { key: 'all', label: 'All Content', count: content.length },
            { key: 'pending', label: 'Pending Review', count: content.filter(c => c.status === 'Pending').length },
            { key: 'critical', label: 'High Priority', count: content.filter(c => c.priority === 'Critical' || c.priority === 'High').length }
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
      </div>

      {/* Content List */}
      <div className="space-y-4">
        {filteredContent.map((item) => (
          <div key={item.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(item.type)}
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(item.priority)}`}>
                    {item.priority}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                  <p className="text-gray-900 text-sm line-clamp-3">{item.content}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Author:</span>
                    <p className="text-sm text-gray-900">{item.author}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Reports:</span>
                    <p className="text-sm text-gray-900">{item.reportedBy.length} users</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Flagged:</span>
                    <p className="text-sm text-gray-900">{formatTime(item.flaggedAt)}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <span className="text-sm font-medium text-gray-700">Report Reasons:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {item.reportReasons.map((reason, index) => (
                      <span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                        {reason}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>ID: {item.id}</span>
                  <span>Category: {item.category}</span>
                  <span>Likes: {item.likes}</span>
                  <span>Replies: {item.replies}</span>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2 ml-4">
                <button
                  onClick={() => setSelectedContent(item)}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1"
                >
                  <Eye className="h-3 w-3" />
                  <span>Review</span>
                </button>
                <button
                  onClick={() => handleApprove(item.id)}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1"
                >
                  <Check className="h-3 w-3" />
                  <span>Approve</span>
                </button>
                <button
                  onClick={() => handleReject(item.id)}
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

      {/* Content Review Modal */}
      {selectedContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Content Review - {selectedContent.id}</h3>
              <button
                onClick={() => setSelectedContent(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Content Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-600">Content Type</label>
                  <p className="font-semibold text-gray-900 capitalize">{selectedContent.type.replace('_', ' ')}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Priority</label>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(selectedContent.priority)}`}>
                    {selectedContent.priority}
                  </span>
                </div>
              </div>

              {/* Content Details */}
              <div>
                <label className="text-sm font-medium text-gray-600">Title</label>
                <p className="font-semibold text-gray-900">{selectedContent.title}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Content</label>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-2">
                  <p className="text-gray-900">{selectedContent.content}</p>
                </div>
              </div>

              {/* Author Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-600">Author</label>
                  <p className="text-gray-900">{selectedContent.author}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Author ID</label>
                  <p className="text-gray-900">{selectedContent.authorId}</p>
                </div>
              </div>

              {/* Report Information */}
              <div>
                <label className="text-sm font-medium text-gray-600">Report Details</label>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <span className="text-sm font-medium text-red-700">Reported by:</span>
                      <p className="text-red-900">{selectedContent.reportedBy.length} users</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-red-700">Flagged:</span>
                      <p className="text-red-900">{formatTime(selectedContent.flaggedAt)}</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-red-700">Reasons:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedContent.reportReasons.map((reason, index) => (
                        <span key={index} className="bg-red-200 text-red-900 px-2 py-1 rounded-full text-xs">
                          {reason}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Moderation Action */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">Moderation Action</label>
                <select
                  value={moderationAction}
                  onChange={(e) => setModerationAction(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4"
                >
                  <option value="">Select an action...</option>
                  <option value="approve">Approve - Content follows community guidelines</option>
                  <option value="approve_edit">Approve with Edit - Minor modifications needed</option>
                  <option value="reject">Reject - Violates community guidelines</option>
                  <option value="escalate_legal">Escalate to Law Enforcement - Legal concerns</option>
                  <option value="escalate_admin">Escalate to Admin - Policy decision needed</option>
                  <option value="warning">Issue Warning - First-time violation</option>
                  <option value="temp_ban">Temporary Ban - Repeat violation</option>
                </select>

                <MultilingualTextArea
                  value={moderatorNote}
                  onChange={setModeratorNote}
                  placeholder="Add moderation notes, explanation for decision, or feedback for the user..."
                  rows={4}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => handleApprove(selectedContent.id)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Check className="h-4 w-4" />
                  <span>Approve</span>
                </button>
                <button
                  onClick={() => handleEscalate(selectedContent.id)}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <AlertTriangle className="h-4 w-4" />
                  <span>Escalate</span>
                </button>
                <button
                  onClick={() => handleReject(selectedContent.id)}
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

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Reviews</p>
              <p className="text-2xl font-bold text-gray-900">{content.length}</p>
            </div>
            <Flag className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Approved Today</p>
              <p className="text-2xl font-bold text-gray-900">{content.filter(c => c.status === 'Approved').length}</p>
            </div>
            <Check className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Rejected Today</p>
              <p className="text-2xl font-bold text-gray-900">{content.filter(c => c.status === 'Rejected').length}</p>
            </div>
            <X className="h-8 w-8 text-red-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Avg Review Time</p>
              <p className="text-2xl font-bold text-gray-900">2.4h</p>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  )
}