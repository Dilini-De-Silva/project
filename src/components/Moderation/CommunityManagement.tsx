import React, { useState } from 'react'
import { 
  Users, 
  TrendingUp, 
  MessageSquare, 
  Heart, 
  AlertTriangle, 
  Calendar,
  Eye,
  Edit,
  Plus,
  Search,
  Filter,
  BarChart3,
  Clock,
  Star,
  Award,
  Target,
  Zap
} from 'lucide-react'

interface CommunityMetric {
  id: string
  name: string
  value: string
  change: string
  trend: 'up' | 'down' | 'stable'
  description: string
}

interface CommunityEvent {
  id: string
  title: string
  type: 'workshop' | 'discussion' | 'announcement' | 'safety_alert'
  date: string
  participants: number
  status: 'upcoming' | 'ongoing' | 'completed'
  description: string
  moderator: string
}

interface CommunityGoal {
  id: string
  title: string
  description: string
  target: number
  current: number
  deadline: string
  status: 'on_track' | 'at_risk' | 'completed'
}

const communityMetrics: CommunityMetric[] = [
  {
    id: '1',
    name: 'Active Members',
    value: '8,247',
    change: '+156 this week',
    trend: 'up',
    description: 'Users who logged in within the last 7 days'
  },
  {
    id: '2',
    name: 'Forum Engagement',
    value: '89.4%',
    change: '+8.2% from last month',
    trend: 'up',
    description: 'Percentage of active users participating in discussions'
  },
  {
    id: '3',
    name: 'Daily Posts',
    value: '67',
    change: '+12 from yesterday',
    trend: 'up',
    description: 'New forum posts and discussions created today'
  },
  {
    id: '4',
    name: 'Community Sentiment',
    value: '4.8/5',
    change: '+0.3 from last month',
    trend: 'up',
    description: 'Average community satisfaction rating'
  },
  {
    id: '5',
    name: 'Response Time',
    value: '1.2h',
    change: '-28% faster',
    trend: 'up',
    description: 'Average time for community members to receive help'
  },
  {
    id: '6',
    name: 'Safety Education Completion',
    value: '76%',
    change: '+15% this month',
    trend: 'up',
    description: 'Members who completed at least one safety course'
  }
]

const communityEvents: CommunityEvent[] = [
  {
    id: '1',
    title: 'Self-Defense Workshop - Colombo',
    type: 'workshop',
    date: '2025-02-05T14:00:00Z',
    participants: 45,
    status: 'upcoming',
    description: 'Krav Maga basics for women at YWCA Colombo. Free workshop with certified instructor.',
    moderator: 'SafetyExpert_Colombo'
  },
  {
    id: '2',
    title: 'Digital Safety Discussion',
    type: 'discussion',
    date: '2025-02-03T19:00:00Z',
    participants: 89,
    status: 'ongoing',
    description: 'Live discussion on protecting yourself from online harassment and cyber stalking.',
    moderator: 'CyberSafetyMod'
  },
  {
    id: '3',
    title: 'Monthly Safety Tips Compilation',
    type: 'announcement',
    date: '2025-02-01T10:00:00Z',
    participants: 234,
    status: 'completed',
    description: 'January safety tips summary: Public transport safety, workplace boundaries, and emergency preparedness.',
    moderator: 'SafetyTeam_Official'
  },
  {
    id: '4',
    title: 'Workplace Safety Webinar',
    type: 'workshop',
    date: '2025-02-08T16:00:00Z',
    participants: 67,
    status: 'upcoming',
    description: 'Know your rights: Dealing with workplace harassment in Sri Lankan corporate environment.',
    moderator: 'LegalAdvocate_SL'
  }
]

const communityGoals: CommunityGoal[] = [
  {
    id: '1',
    title: 'Reach 10,000 Active Members',
    description: 'Grow our community to 10,000 active monthly users by March 2025',
    target: 10000,
    current: 8247,
    deadline: '2025-03-31',
    status: 'on_track'
  },
  {
    id: '2',
    title: 'Complete 500 Safety Workshops',
    description: 'Conduct 500 safety education workshops across Sri Lanka',
    target: 500,
    current: 387,
    deadline: '2025-06-30',
    status: 'on_track'
  },
  {
    id: '3',
    title: 'Zero Tolerance for Harassment',
    description: 'Maintain less than 1% harassment incidents in community spaces',
    target: 1,
    current: 0.3,
    deadline: '2025-12-31',
    status: 'completed'
  }
]

export function CommunityManagement() {
  const [selectedMetric, setSelectedMetric] = useState<CommunityMetric | null>(null)
  const [showNewEvent, setShowNewEvent] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'workshop',
    date: '',
    description: ''
  })

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'workshop': return 'bg-blue-100 text-blue-800'
      case 'discussion': return 'bg-purple-100 text-purple-800'
      case 'announcement': return 'bg-green-100 text-green-800'
      case 'safety_alert': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800'
      case 'ongoing': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getGoalStatusColor = (status: string) => {
    switch (status) {
      case 'on_track': return 'bg-green-100 text-green-800'
      case 'at_risk': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Community Management</h2>
          <p className="text-gray-600">Monitor community health, engagement, and growth metrics</p>
        </div>
        <button
          onClick={() => setShowNewEvent(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Create Event</span>
        </button>
      </div>

      {/* Community Health Overview */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4 mb-6">
          <div className="h-16 w-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Heart className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Community Health: Excellent</h3>
            <p className="text-purple-100">High engagement, positive sentiment, growing membership</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <p className="text-purple-100 text-sm">Growth Rate</p>
            <p className="text-2xl font-bold">+23%</p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <p className="text-purple-100 text-sm">Retention Rate</p>
            <p className="text-2xl font-bold">94.2%</p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <p className="text-purple-100 text-sm">Safety Score</p>
            <p className="text-2xl font-bold">9.6/10</p>
          </div>
        </div>
      </div>

      {/* Community Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communityMetrics.map((metric) => (
          <div 
            key={metric.id} 
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer"
            onClick={() => setSelectedMetric(metric)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{metric.name}</h3>
              <div className={`p-2 rounded-lg ${
                metric.trend === 'up' ? 'bg-green-100' : 
                metric.trend === 'down' ? 'bg-red-100' : 'bg-gray-100'
              }`}>
                <TrendingUp className={`h-5 w-5 ${
                  metric.trend === 'up' ? 'text-green-600' : 
                  metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }`} />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</p>
            <p className={`text-sm font-medium mb-2 ${
              metric.trend === 'up' ? 'text-green-600' : 
              metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {metric.change}
            </p>
            <p className="text-xs text-gray-600">{metric.description}</p>
          </div>
        ))}
      </div>

      {/* Community Events */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Calendar className="h-6 w-6 text-blue-500" />
          <span>Community Events & Activities</span>
        </h3>
        
        <div className="space-y-4">
          {communityEvents.map((event) => (
            <div key={event.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{event.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                      {event.type.replace('_', ' ')}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(event.date)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{event.participants} participants</span>
                    </span>
                    <span>Moderator: {event.moderator}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200">
                    View Details
                  </button>
                  <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Goals */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Target className="h-6 w-6 text-green-500" />
          <span>Community Goals & Milestones</span>
        </h3>
        
        <div className="space-y-6">
          {communityGoals.map((goal) => (
            <div key={goal.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{goal.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGoalStatusColor(goal.status)}`}>
                      {goal.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{goal.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <span>Target: {goal.target.toLocaleString()}</span>
                    <span>Current: {goal.current.toLocaleString()}</span>
                    <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{Math.round(calculateProgress(goal.current, goal.target))}%</p>
                  <p className="text-sm text-gray-600">Complete</p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    goal.status === 'completed' ? 'bg-blue-500' :
                    goal.status === 'on_track' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                  style={{ width: `${calculateProgress(goal.current, goal.target)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Initiatives */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Engagement Initiatives */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            <span>Engagement Initiatives</span>
          </h3>
          
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">Weekly Safety Challenge</h4>
              <p className="text-sm text-yellow-800 mb-3">
                Encourage members to complete safety education modules and share experiences
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-yellow-700">156 participants this week</span>
                <button className="bg-yellow-600 hover:bg-yellow-700 text-white py-1 px-3 rounded text-xs font-medium">
                  Manage
                </button>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Mentor Program</h4>
              <p className="text-sm text-purple-800 mb-3">
                Connect experienced members with newcomers for guidance and support
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-purple-700">89 active mentor pairs</span>
                <button className="bg-purple-600 hover:bg-purple-700 text-white py-1 px-3 rounded text-xs font-medium">
                  Manage
                </button>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Recognition Program</h4>
              <p className="text-sm text-green-800 mb-3">
                Highlight helpful community members and safety advocates
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-green-700">12 members recognized this month</span>
                <button className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded text-xs font-medium">
                  Manage
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Community Feedback */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-blue-500" />
            <span>Recent Community Feedback</span>
          </h3>
          
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="h-4 w-4 text-green-600" />
                <span className="font-semibold text-green-900">Positive Feedback</span>
              </div>
              <p className="text-sm text-green-800 mb-2">
                "The community forum helped me find safe accommodation and connect with other working women. 
                The moderation is excellent - I feel safe sharing here."
              </p>
              <span className="text-xs text-green-700">- University Student, Colombo</span>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="h-4 w-4 text-blue-600" />
                <span className="font-semibold text-blue-900">Feature Request</span>
              </div>
              <p className="text-sm text-blue-800 mb-2">
                "Could we have location-specific safety groups? Like separate forums for Colombo, Kandy, Galle etc?"
              </p>
              <span className="text-xs text-blue-700">- Working Professional, Kandy</span>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span className="font-semibold text-yellow-900">Improvement Suggestion</span>
              </div>
              <p className="text-sm text-yellow-800 mb-2">
                "Response time for urgent posts could be faster. Maybe have emergency moderators for critical safety issues?"
              </p>
              <span className="text-xs text-yellow-700">- Healthcare Worker, Galle</span>
            </div>
          </div>
        </div>
      </div>

      {/* New Event Form Modal */}
      {showNewEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Create Community Event</h3>
              <button
                onClick={() => setShowNewEvent(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Self-Defense Workshop - Kandy"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="workshop">Workshop</option>
                    <option value="discussion">Discussion</option>
                    <option value="announcement">Announcement</option>
                    <option value="safety_alert">Safety Alert</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date & Time</label>
                  <input
                    type="datetime-local"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Describe the event, what participants can expect, and any requirements..."
                />
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200"
                >
                  Create Event
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewEvent(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}