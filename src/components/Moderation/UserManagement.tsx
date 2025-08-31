import React, { useState } from 'react'
import { 
  Users, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Ban, 
  Shield, 
  AlertTriangle, 
  Clock, 
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Flag,
  MessageSquare,
  X,
  Check,
  UserX,
  UserCheck,
  Settings
} from 'lucide-react'
import { MultilingualTextArea } from '../Common/MultilingualTextArea'

interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'law_enforcement' | 'moderator'
  status: 'active' | 'suspended' | 'banned' | 'pending_verification'
  joinDate: string
  lastActive: string
  location: string
  language: 'en' | 'si' | 'ta'
  forumPosts: number
  reportsSubmitted: number
  reportsReceived: number
  warningsCount: number
  safetyScore: number
  verificationStatus: 'verified' | 'pending' | 'unverified'
  notes: string[]
}

const mockUsers: User[] = [
  {
    id: 'USR_2025_4789',
    name: 'Sanduni Perera',
    email: 'sanduni.p@email.com',
    role: 'user',
    status: 'active',
    joinDate: '2024-11-15T10:30:00Z',
    lastActive: '2025-01-31T14:20:00Z',
    location: 'Colombo 07',
    language: 'si',
    forumPosts: 23,
    reportsSubmitted: 2,
    reportsReceived: 0,
    warningsCount: 0,
    safetyScore: 94,
    verificationStatus: 'verified',
    notes: ['Active community member', 'Helpful in safety discussions']
  },
  {
    id: 'USR_2025_7890',
    name: 'HelpfulLocal_2025',
    email: 'helper@email.com',
    role: 'user',
    status: 'suspended',
    joinDate: '2025-01-20T09:15:00Z',
    lastActive: '2025-01-30T16:45:00Z',
    location: 'Wellawatte',
    language: 'en',
    forumPosts: 45,
    reportsSubmitted: 1,
    reportsReceived: 8,
    warningsCount: 3,
    safetyScore: 67,
    verificationStatus: 'pending',
    notes: ['Multiple reports for inappropriate private contact offers', 'Suspended pending investigation']
  },
  {
    id: 'USR_2025_3456',
    name: 'Priya Rajendran',
    email: 'priya.r@email.com',
    role: 'user',
    status: 'active',
    joinDate: '2024-12-03T14:20:00Z',
    lastActive: '2025-01-31T13:10:00Z',
    location: 'Kandy',
    language: 'ta',
    forumPosts: 18,
    reportsSubmitted: 5,
    reportsReceived: 0,
    warningsCount: 0,
    safetyScore: 98,
    verificationStatus: 'verified',
    notes: ['Excellent community contributor', 'Frequently helps newcomers']
  },
  {
    id: 'USR_2025_2345',
    name: 'SafetyAdvocate_2025',
    email: 'advocate@email.com',
    role: 'user',
    status: 'pending_verification',
    joinDate: '2025-01-25T11:00:00Z',
    lastActive: '2025-01-31T12:30:00Z',
    location: 'Galle',
    language: 'en',
    forumPosts: 67,
    reportsSubmitted: 0,
    reportsReceived: 4,
    warningsCount: 2,
    safetyScore: 72,
    verificationStatus: 'pending',
    notes: ['Posting questionable safety advice', 'Arguing with harassment victims', 'Under review']
  }
]

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [filter, setFilter] = useState<'all' | 'flagged' | 'suspended'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [actionType, setActionType] = useState('')
  const [actionNote, setActionNote] = useState('')

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    switch (filter) {
      case 'flagged':
        return matchesSearch && (user.reportsReceived > 0 || user.warningsCount > 0)
      case 'suspended':
        return matchesSearch && (user.status === 'suspended' || user.status === 'banned')
      default:
        return matchesSearch
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'suspended': return 'bg-yellow-100 text-yellow-800'
      case 'banned': return 'bg-red-100 text-red-800'
      case 'pending_verification': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'law_enforcement': return 'bg-blue-100 text-blue-800'
      case 'moderator': return 'bg-purple-100 text-purple-800'
      case 'user': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getVerificationColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'unverified': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleUserAction = (userId: string, action: string) => {
    setUsers(prev => prev.map(user => {
      if (user.id === userId) {
        switch (action) {
          case 'suspend':
            return { ...user, status: 'suspended' as const }
          case 'ban':
            return { ...user, status: 'banned' as const }
          case 'activate':
            return { ...user, status: 'active' as const }
          case 'verify':
            return { ...user, verificationStatus: 'verified' as const }
          case 'warning':
            return { ...user, warningsCount: user.warningsCount + 1 }
          default:
            return user
        }
      }
      return user
    }))
    setSelectedUser(null)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">User Management</h2>
          <p className="text-gray-600">Manage community members, handle violations, and maintain user safety</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
            {users.filter(u => u.reportsReceived > 0).length} Flagged
          </div>
          <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
            {users.filter(u => u.status === 'suspended').length} Suspended
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
            placeholder="Search users by name, email, or ID..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex space-x-2">
          {[
            { key: 'all', label: 'All Users', count: users.length },
            { key: 'flagged', label: 'Flagged Users', count: users.filter(u => u.reportsReceived > 0 || u.warningsCount > 0).length },
            { key: 'suspended', label: 'Suspended/Banned', count: users.filter(u => u.status === 'suspended' || u.status === 'banned').length }
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

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="h-12 w-12 bg-purple-600 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status.replace('_', ' ')}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role.replace('_', ' ')}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getVerificationColor(user.verificationStatus)}`}>
                      {user.verificationStatus}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <span className="text-sm font-medium text-gray-700">Email:</span>
                      <p className="text-sm text-gray-900">{user.email}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">Location:</span>
                      <p className="text-sm text-gray-900">{user.location}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">Safety Score:</span>
                      <p className={`text-sm font-semibold ${
                        user.safetyScore >= 90 ? 'text-green-600' :
                        user.safetyScore >= 70 ? 'text-yellow-600' : 'text-red-600'
                      }`}>{user.safetyScore}%</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-center p-2 bg-blue-50 rounded-lg">
                      <p className="text-lg font-bold text-blue-600">{user.forumPosts}</p>
                      <p className="text-xs text-blue-700">Forum Posts</p>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded-lg">
                      <p className="text-lg font-bold text-green-600">{user.reportsSubmitted}</p>
                      <p className="text-xs text-green-700">Reports Submitted</p>
                    </div>
                    <div className="text-center p-2 bg-red-50 rounded-lg">
                      <p className="text-lg font-bold text-red-600">{user.reportsReceived}</p>
                      <p className="text-xs text-red-700">Reports Received</p>
                    </div>
                    <div className="text-center p-2 bg-yellow-50 rounded-lg">
                      <p className="text-lg font-bold text-yellow-600">{user.warningsCount}</p>
                      <p className="text-xs text-yellow-700">Warnings</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>ID: {user.id}</span>
                    <span>Joined: {formatDate(user.joinDate)}</span>
                    <span>Last Active: {formatDate(user.lastActive)}</span>
                    <span>Language: {user.language.toUpperCase()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2 ml-4">
                <button
                  onClick={() => setSelectedUser(user)}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1"
                >
                  <Eye className="h-3 w-3" />
                  <span>View Profile</span>
                </button>
                
                {user.status === 'active' && (
                  <button
                    onClick={() => handleUserAction(user.id, 'suspend')}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1"
                  >
                    <UserX className="h-3 w-3" />
                    <span>Suspend</span>
                  </button>
                )}
                
                {user.status === 'suspended' && (
                  <button
                    onClick={() => handleUserAction(user.id, 'activate')}
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1"
                  >
                    <UserCheck className="h-3 w-3" />
                    <span>Reactivate</span>
                  </button>
                )}
                
                {user.verificationStatus === 'pending' && (
                  <button
                    onClick={() => handleUserAction(user.id, 'verify')}
                    className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1"
                  >
                    <Check className="h-3 w-3" />
                    <span>Verify</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">User Profile - {selectedUser.name}</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* User Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Full Name</label>
                    <p className="font-semibold text-gray-900">{selectedUser.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-gray-900">{selectedUser.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Location</label>
                    <p className="text-gray-900">{selectedUser.location}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Language</label>
                    <p className="text-gray-900">{selectedUser.language.toUpperCase()}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Status</label>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedUser.status)}`}>
                      {selectedUser.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Role</label>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(selectedUser.role)}`}>
                      {selectedUser.role.replace('_', ' ')}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Verification</label>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getVerificationColor(selectedUser.verificationStatus)}`}>
                      {selectedUser.verificationStatus}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Safety Score</label>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            selectedUser.safetyScore >= 90 ? 'bg-green-500' :
                            selectedUser.safetyScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${selectedUser.safetyScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{selectedUser.safetyScore}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
                  <MessageSquare className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-600">{selectedUser.forumPosts}</p>
                  <p className="text-sm text-blue-700">Forum Posts</p>
                </div>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center">
                  <Flag className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600">{selectedUser.reportsSubmitted}</p>
                  <p className="text-sm text-green-700">Reports Submitted</p>
                </div>
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-center">
                  <AlertTriangle className="h-6 w-6 text-red-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-red-600">{selectedUser.reportsReceived}</p>
                  <p className="text-sm text-red-700">Reports Received</p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-center">
                  <Ban className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-yellow-600">{selectedUser.warningsCount}</p>
                  <p className="text-sm text-yellow-700">Warnings</p>
                </div>
              </div>

              {/* Moderation Notes */}
              <div>
                <label className="text-sm font-medium text-gray-600">Moderation Notes</label>
                <div className="mt-2 space-y-2 max-h-32 overflow-y-auto">
                  {selectedUser.notes.map((note, index) => (
                    <div key={index} className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-sm text-gray-900">{note}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Moderation Actions */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">Moderation Action</label>
                <select
                  value={actionType}
                  onChange={(e) => setActionType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4"
                >
                  <option value="">Select an action...</option>
                  <option value="warning">Issue Warning</option>
                  <option value="suspend">Temporary Suspension</option>
                  <option value="ban">Permanent Ban</option>
                  <option value="verify">Verify Account</option>
                  <option value="activate">Reactivate Account</option>
                  <option value="note">Add Note Only</option>
                </select>

                <MultilingualTextArea
                  value={actionNote}
                  onChange={setActionNote}
                  placeholder="Add notes about this action, reason for decision, or instructions for the user..."
                  rows={3}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => handleUserAction(selectedUser.id, 'warning')}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2"
                >
                  <AlertTriangle className="h-4 w-4" />
                  <span>Issue Warning</span>
                </button>
                <button
                  onClick={() => handleUserAction(selectedUser.id, 'suspend')}
                  className="bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2"
                >
                  <UserX className="h-4 w-4" />
                  <span>Suspend</span>
                </button>
                <button
                  onClick={() => handleUserAction(selectedUser.id, 'verify')}
                  className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2"
                >
                  <Check className="h-4 w-4" />
                  <span>Verify</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.status === 'active').length}</p>
            </div>
            <UserCheck className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Verified Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.verificationStatus === 'verified').length}</p>
            </div>
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Avg Safety Score</p>
              <p className="text-2xl font-bold text-gray-900">87%</p>
            </div>
            <Award className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>
    </div>
  )
}