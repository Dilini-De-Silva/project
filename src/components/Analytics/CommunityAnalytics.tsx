import React, { useState } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  MessageSquare, 
  Heart, 
  Shield, 
  AlertTriangle,
  Clock,
  Calendar,
  Eye,
  Star,
  Award,
  Target,
  Activity,
  Globe,
  Filter,
  Download,
  RefreshCw,
  Zap,
  BookOpen,
  MapPin,
  Phone,
  CheckCircle,
  X
} from 'lucide-react'

interface AnalyticsMetric {
  id: string
  name: string
  value: string
  change: string
  trend: 'up' | 'down' | 'stable'
  description: string
  category: 'engagement' | 'safety' | 'growth' | 'content'
}

interface ChartData {
  period: string
  users: number
  posts: number
  engagement: number
  incidents: number
  resolutions: number
}

interface GeographicData {
  province: string
  users: number
  incidents: number
  safetyScore: number
  growth: string
}

interface ContentMetrics {
  category: string
  posts: number
  engagement: number
  reports: number
  avgRating: number
}

const analyticsMetrics: AnalyticsMetric[] = [
  {
    id: '1',
    name: 'Total Active Users',
    value: '8,247',
    change: '+156 this week',
    trend: 'up',
    description: 'Users active in the last 7 days',
    category: 'growth'
  },
  {
    id: '2',
    name: 'Daily Engagement Rate',
    value: '89.4%',
    change: '+8.2% from last month',
    trend: 'up',
    description: 'Percentage of users engaging daily',
    category: 'engagement'
  },
  {
    id: '3',
    name: 'Forum Posts Today',
    value: '67',
    change: '+12 from yesterday',
    trend: 'up',
    description: 'New discussions and posts created',
    category: 'content'
  },
  {
    id: '4',
    name: 'Safety Incidents Resolved',
    value: '97.8%',
    change: '+3.1% improvement',
    trend: 'up',
    description: 'Incidents successfully resolved',
    category: 'safety'
  },
  {
    id: '5',
    name: 'Average Response Time',
    value: '1.2h',
    change: '-28% faster',
    trend: 'up',
    description: 'Time to receive community help',
    category: 'engagement'
  },
  {
    id: '6',
    name: 'Community Sentiment',
    value: '4.8/5',
    change: '+0.3 from last month',
    trend: 'up',
    description: 'Overall community satisfaction',
    category: 'engagement'
  },
  {
    id: '7',
    name: 'Safety Education Completion',
    value: '76%',
    change: '+15% this month',
    trend: 'up',
    description: 'Members completing safety courses',
    category: 'safety'
  },
  {
    id: '8',
    name: 'New Member Retention',
    value: '94.2%',
    change: '+5.7% improvement',
    trend: 'up',
    description: '30-day retention rate',
    category: 'growth'
  }
]

const chartData: ChartData[] = [
  { period: 'Sep 2024', users: 6420, posts: 234, engagement: 78, incidents: 45, resolutions: 42 },
  { period: 'Oct 2024', users: 6890, posts: 267, engagement: 81, incidents: 38, resolutions: 37 },
  { period: 'Nov 2024', users: 7340, posts: 298, engagement: 84, incidents: 32, resolutions: 31 },
  { period: 'Dec 2024', users: 7820, posts: 312, engagement: 87, incidents: 28, resolutions: 27 },
  { period: 'Jan 2025', users: 8247, posts: 345, engagement: 89, incidents: 23, resolutions: 22 }
]

const geographicData: GeographicData[] = [
  { province: 'Western Province', users: 3456, incidents: 12, safetyScore: 94, growth: '+23%' },
  { province: 'Central Province', users: 1890, incidents: 8, safetyScore: 92, growth: '+18%' },
  { province: 'Southern Province', users: 1234, incidents: 5, safetyScore: 96, growth: '+15%' },
  { province: 'Northern Province', users: 567, incidents: 2, safetyScore: 98, growth: '+28%' },
  { province: 'Eastern Province', users: 445, incidents: 3, safetyScore: 95, growth: '+22%' },
  { province: 'North Western Province', users: 389, incidents: 1, safetyScore: 97, growth: '+19%' },
  { province: 'North Central Province', users: 156, incidents: 1, safetyScore: 99, growth: '+31%' },
  { province: 'Uva Province', users: 78, incidents: 0, safetyScore: 100, growth: '+25%' },
  { province: 'Sabaragamuwa Province', users: 32, incidents: 0, safetyScore: 100, growth: '+40%' }
]

const contentMetrics: ContentMetrics[] = [
  { category: 'Self-Defense', posts: 89, engagement: 94, reports: 2, avgRating: 4.8 },
  { category: 'Public Safety', posts: 156, engagement: 87, reports: 5, avgRating: 4.6 },
  { category: 'Digital Safety', posts: 67, engagement: 91, reports: 1, avgRating: 4.9 },
  { category: 'Workplace Safety', posts: 78, engagement: 85, reports: 3, avgRating: 4.7 },
  { category: 'Support & Counseling', posts: 234, engagement: 96, reports: 0, avgRating: 4.9 },
  { category: 'Emergency Preparedness', posts: 45, engagement: 82, reports: 1, avgRating: 4.5 }
]

const topContributors = [
  { name: 'SafetyExpert_Colombo', posts: 45, helpfulVotes: 234, safetyScore: 98, role: 'Safety Educator' },
  { name: 'CommunityMom_Kandy', posts: 38, helpfulVotes: 189, safetyScore: 96, role: 'Community Leader' },
  { name: 'SelfDefenseInstructor_SL', posts: 32, helpfulVotes: 167, safetyScore: 99, role: 'Self-Defense Expert' },
  { name: 'DigitalSafety_Advocate', posts: 29, helpfulVotes: 145, safetyScore: 95, role: 'Cyber Safety Expert' },
  { name: 'WorkplaceSafety_Pro', posts: 26, helpfulVotes: 134, safetyScore: 97, role: 'Workplace Advocate' }
]

const safetyTrends = [
  { metric: 'Harassment Reports', current: 23, previous: 34, change: -32, status: 'improving' },
  { metric: 'Emergency SOS Usage', current: 12, previous: 18, change: -33, status: 'improving' },
  { metric: 'Community Support Requests', current: 45, previous: 38, change: +18, status: 'increasing' },
  { metric: 'Safety Education Engagement', current: 234, previous: 189, change: +24, status: 'improving' },
  { metric: 'Incident Resolution Time', current: 1.2, previous: 1.8, change: -33, status: 'improving' }
]

export function CommunityAnalytics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedMetric, setSelectedMetric] = useState<AnalyticsMetric | null>(null)
  const [showExportModal, setShowExportModal] = useState(false)

  const getMetricsByCategory = (category: string) => {
    if (category === 'all') return analyticsMetrics
    return analyticsMetrics.filter(metric => metric.category === category)
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />
      default: return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600'
      case 'down': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'improving': return 'text-green-600 bg-green-50'
      case 'increasing': return 'text-blue-600 bg-blue-50'
      case 'declining': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const calculateGrowthRate = () => {
    const currentMonth = chartData[chartData.length - 1]
    const previousMonth = chartData[chartData.length - 2]
    return ((currentMonth.users - previousMonth.users) / previousMonth.users * 100).toFixed(1)
  }

  const calculateEngagementTrend = () => {
    const currentMonth = chartData[chartData.length - 1]
    const previousMonth = chartData[chartData.length - 2]
    return ((currentMonth.engagement - previousMonth.engagement) / previousMonth.engagement * 100).toFixed(1)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Community Analytics</h2>
          <p className="text-gray-600">Comprehensive insights into community health, engagement, and safety metrics</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 3 Months</option>
            <option value="1y">Last Year</option>
          </select>
          <button
            onClick={() => setShowExportModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
          <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Community Health Overview */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4 mb-6">
          <div className="h-16 w-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Heart className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Community Health: Excellent</h3>
            <p className="text-purple-100">Strong growth, high engagement, positive safety trends</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <p className="text-purple-100 text-sm">Growth Rate</p>
            <p className="text-2xl font-bold">+{calculateGrowthRate()}%</p>
            <p className="text-xs text-purple-200">Monthly growth</p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <p className="text-purple-100 text-sm">Engagement Trend</p>
            <p className="text-2xl font-bold">+{calculateEngagementTrend()}%</p>
            <p className="text-xs text-purple-200">Monthly improvement</p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <p className="text-purple-100 text-sm">Safety Score</p>
            <p className="text-2xl font-bold">9.6/10</p>
            <p className="text-xs text-purple-200">Community safety rating</p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <p className="text-purple-100 text-sm">Retention Rate</p>
            <p className="text-2xl font-bold">94.2%</p>
            <p className="text-xs text-purple-200">30-day retention</p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'all', label: 'All Metrics', icon: BarChart3 },
          { key: 'engagement', label: 'Engagement', icon: Heart },
          { key: 'safety', label: 'Safety', icon: Shield },
          { key: 'growth', label: 'Growth', icon: TrendingUp },
          { key: 'content', label: 'Content', icon: MessageSquare }
        ].map((category) => {
          const Icon = category.icon
          return (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.key
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{category.label}</span>
            </button>
          )
        })}
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getMetricsByCategory(selectedCategory).map((metric) => (
          <div 
            key={metric.id} 
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer"
            onClick={() => setSelectedMetric(metric)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">{metric.name}</h3>
              {getTrendIcon(metric.trend)}
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</p>
            <p className={`text-sm font-medium mb-2 ${getTrendColor(metric.trend)}`}>
              {metric.change}
            </p>
            <p className="text-xs text-gray-500">{metric.description}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Growth Trends Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <span>Growth Trends (Last 5 Months)</span>
          </h3>
          
          <div className="space-y-4">
            {chartData.map((data, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-sm font-medium text-gray-700 w-20">{data.period}</div>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-lg font-bold text-blue-600">{data.users.toLocaleString()}</p>
                      <p className="text-xs text-gray-600">Users</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-purple-600">{data.posts}</p>
                      <p className="text-xs text-gray-600">Posts</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-green-600">{data.engagement}%</p>
                      <p className="text-xs text-gray-600">Engagement</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(data.users / 10000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Metrics Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <Shield className="h-5 w-5 text-blue-500" />
            <span>Safety Trends Analysis</span>
          </h3>
          
          <div className="space-y-4">
            {safetyTrends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{trend.metric}</h4>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">Current: {trend.current}</span>
                    <span className="text-sm text-gray-600">Previous: {trend.previous}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(trend.status)}`}>
                    {trend.change > 0 ? '+' : ''}{trend.change}%
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{trend.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Geographic Distribution */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-teal-500" />
          <span>Geographic Distribution</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {geographicData.map((province, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">{province.province}</h4>
                <span className="text-green-600 text-sm font-medium">{province.growth}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Users:</span>
                  <span className="text-sm font-medium text-gray-900">{province.users.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Incidents:</span>
                  <span className="text-sm font-medium text-gray-900">{province.incidents}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Safety Score:</span>
                  <span className={`text-sm font-medium ${
                    province.safetyScore >= 95 ? 'text-green-600' :
                    province.safetyScore >= 90 ? 'text-yellow-600' : 'text-red-600'
                  }`}>{province.safetyScore}%</span>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      province.safetyScore >= 95 ? 'bg-green-500' :
                      province.safetyScore >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${province.safetyScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Performance */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-purple-500" />
          <span>Content Category Performance</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contentMetrics.map((content, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">{content.category}</h4>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">{content.avgRating}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="text-center p-2 bg-blue-50 rounded">
                  <p className="text-lg font-bold text-blue-600">{content.posts}</p>
                  <p className="text-xs text-blue-700">Posts</p>
                </div>
                <div className="text-center p-2 bg-green-50 rounded">
                  <p className="text-lg font-bold text-green-600">{content.engagement}%</p>
                  <p className="text-xs text-green-700">Engagement</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Reports:</span>
                <span className={`text-sm font-medium ${
                  content.reports === 0 ? 'text-green-600' :
                  content.reports <= 2 ? 'text-yellow-600' : 'text-red-600'
                }`}>{content.reports}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Contributors */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Award className="h-5 w-5 text-yellow-500" />
          <span>Top Community Contributors</span>
        </h3>
        
        <div className="space-y-4">
          {topContributors.map((contributor, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center h-10 w-10 bg-yellow-500 rounded-full text-white font-bold">
                  #{index + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{contributor.name}</h4>
                  <p className="text-sm text-gray-600">{contributor.role}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="text-center">
                  <p className="font-bold text-blue-600">{contributor.posts}</p>
                  <p className="text-xs text-gray-600">Posts</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-green-600">{contributor.helpfulVotes}</p>
                  <p className="text-xs text-gray-600">Helpful Votes</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-purple-600">{contributor.safetyScore}%</p>
                  <p className="text-xs text-gray-600">Safety Score</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Behavior Analysis */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <Activity className="h-5 w-5 text-indigo-500" />
            <span>User Behavior Analysis</span>
          </h3>
          
          <div className="space-y-4">
            <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg">
              <h4 className="font-semibold text-indigo-900 mb-2">Peak Activity Hours</h4>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="text-center">
                  <p className="font-bold text-indigo-600">7-9 AM</p>
                  <p className="text-indigo-700">Morning Check-ins</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-indigo-600">12-2 PM</p>
                  <p className="text-indigo-700">Lunch Break</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-indigo-600">6-9 PM</p>
                  <p className="text-indigo-700">Evening Discussions</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Most Active Features</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-purple-800">Community Forum</span>
                  <span className="text-sm font-medium text-purple-600">89% usage</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-purple-800">Safety Education</span>
                  <span className="text-sm font-medium text-purple-600">76% usage</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-purple-800">Emergency Contacts</span>
                  <span className="text-sm font-medium text-purple-600">94% setup</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-purple-800">Safe Zones</span>
                  <span className="text-sm font-medium text-purple-600">67% usage</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">User Journey Insights</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-800">78% complete profile setup within 24h</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-800">65% join community forum within 3 days</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-800">89% add emergency contacts within 1 week</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Impact Metrics */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <Shield className="h-5 w-5 text-red-500" />
            <span>Safety Impact Metrics</span>
          </h3>
          
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <h4 className="font-semibold text-red-900 mb-3">Emergency Response</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">3.2min</p>
                  <p className="text-xs text-red-700">Avg Response Time</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">97.8%</p>
                  <p className="text-xs text-red-700">Resolution Rate</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-3">Prevention Impact</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-800">Incidents Prevented</span>
                  <span className="font-medium text-blue-600">156 estimated</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-800">Safety Education Impact</span>
                  <span className="font-medium text-blue-600">89% report feeling safer</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-800">Community Support Success</span>
                  <span className="font-medium text-blue-600">94% found help</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-3">Positive Outcomes</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-green-800">234 women found safe accommodation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-green-800">156 workplace issues resolved</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-green-800">89 self-defense classes organized</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Moderation Effectiveness */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Eye className="h-5 w-5 text-orange-500" />
          <span>Moderation Effectiveness</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">98.2%</p>
            <p className="text-sm text-gray-600">Content Approval Rate</p>
            <p className="text-xs text-green-600 mt-1">+2.1% from last month</p>
          </div>
          
          <div className="text-center">
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">1.2h</p>
            <p className="text-sm text-gray-600">Avg Review Time</p>
            <p className="text-xs text-green-600 mt-1">-28% faster</p>
          </div>
          
          <div className="text-center">
            <div className="h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">4</p>
            <p className="text-sm text-gray-600">Community Violations</p>
            <p className="text-xs text-green-600 mt-1">-45% reduction</p>
          </div>
          
          <div className="text-center">
            <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">4.8/5</p>
            <p className="text-sm text-gray-600">User Satisfaction</p>
            <p className="text-xs text-green-600 mt-1">+0.3 improvement</p>
          </div>
        </div>
      </div>

      {/* Predictive Insights */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Target className="h-5 w-5 text-green-500" />
          <span>Predictive Insights & Recommendations</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2 flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Growth Predictions</span>
              </h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Expected to reach 10,000 users by March 2025</li>
                <li>• Forum engagement likely to increase 15% next month</li>
                <li>• Safety education completion trending upward</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span>Optimization Opportunities</span>
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Increase Tamil language content by 25%</li>
                <li>• Focus on Kandy and Galle user acquisition</li>
                <li>• Expand evening workshop offerings</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2 flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4" />
                <span>Areas Needing Attention</span>
              </h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Increase moderation during 6-9 PM peak hours</li>
                <li>• Improve response time for urgent safety posts</li>
                <li>• Address geographic gaps in Northern Province</li>
              </ul>
            </div>

            <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2 flex items-center space-x-2">
                <Star className="h-4 w-4" />
                <span>Success Factors</span>
              </h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Strong multilingual support driving adoption</li>
                <li>• Anonymous posting encouraging participation</li>
                <li>• Expert-led safety education building trust</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Export Analytics Report</h3>
              <button
                onClick={() => setShowExportModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option value="comprehensive">Comprehensive Report</option>
                  <option value="executive">Executive Summary</option>
                  <option value="safety">Safety Metrics Only</option>
                  <option value="engagement">Engagement Metrics Only</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                  <option value="90d">Last 3 Months</option>
                  <option value="1y">Last Year</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                <div className="grid grid-cols-2 gap-2">
                  <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200">
                    PDF Report
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200">
                    Excel Data
                  </button>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200"
                >
                  Generate Report
                </button>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Metric Details Modal */}
      {selectedMetric && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Metric Details: {selectedMetric.name}</h3>
              <button
                onClick={() => setSelectedMetric(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-gray-900 mb-2">{selectedMetric.value}</p>
                <p className={`text-lg font-medium mb-4 ${getTrendColor(selectedMetric.trend)}`}>
                  {selectedMetric.change}
                </p>
                <p className="text-gray-600">{selectedMetric.description}</p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Historical Trend (Last 5 Months)</h4>
                <div className="space-y-2">
                  {chartData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{data.period}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(index + 1) * 20}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {selectedMetric.category === 'growth' ? data.users.toLocaleString() :
                           selectedMetric.category === 'engagement' ? `${data.engagement}%` :
                           selectedMetric.category === 'content' ? data.posts :
                           `${data.resolutions}/${data.incidents}`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedMetric(null)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}