import React, { useState } from 'react'
import { 
  BookOpen, 
  Edit, 
  Save, 
  Eye, 
  Plus, 
  Trash2, 
  AlertTriangle, 
  Shield, 
  Users, 
  MessageSquare,
  Heart,
  Lock,
  Globe,
  Clock,
  Check,
  X,
  FileText,
  Download,
  Upload
} from 'lucide-react'
import { MultilingualTextArea } from '../Common/MultilingualTextArea'

interface GuidelineSection {
  id: string
  title: string
  content: string
  order: number
  lastUpdated: string
  updatedBy: string
  isActive: boolean
  language: 'en' | 'si' | 'ta' | 'all'
}

interface GuidelineVersion {
  version: string
  releaseDate: string
  changes: string[]
  status: 'draft' | 'active' | 'archived'
}

const guidelineSections: GuidelineSection[] = [
  {
    id: 'respect',
    title: 'Respect and Kindness',
    content: 'Treat all community members with respect and kindness. We are here to support each other in our safety journey. Personal attacks, discrimination, or harassment of any kind will not be tolerated.',
    order: 1,
    lastUpdated: '2025-01-15T10:00:00Z',
    updatedBy: 'ModeratorTeam',
    isActive: true,
    language: 'all'
  },
  {
    id: 'privacy',
    title: 'Privacy and Anonymity',
    content: 'Respect others\' privacy and right to anonymity. Never share personal information about other members without their explicit consent. Do not attempt to identify anonymous posters or pressure them to reveal their identity.',
    order: 2,
    lastUpdated: '2025-01-15T10:00:00Z',
    updatedBy: 'ModeratorTeam',
    isActive: true,
    language: 'all'
  },
  {
    id: 'safety_advice',
    title: 'Safety Advice Guidelines',
    content: 'When providing safety advice, ensure it is evidence-based and appropriate for Sri Lankan context. Avoid giving legal advice unless you are a qualified professional. Always encourage seeking professional help for serious situations.',
    order: 3,
    lastUpdated: '2025-01-20T14:30:00Z',
    updatedBy: 'SafetyExpert_SL',
    isActive: true,
    language: 'all'
  },
  {
    id: 'reporting',
    title: 'Reporting and Moderation',
    content: 'Report content that violates community guidelines using the report button. Do not engage in public arguments about moderation decisions. Contact moderators directly for appeals or clarifications.',
    order: 4,
    lastUpdated: '2025-01-10T09:15:00Z',
    updatedBy: 'ModeratorTeam',
    isActive: true,
    language: 'all'
  },
  {
    id: 'emergency',
    title: 'Emergency Situations',
    content: 'If you are in immediate danger, call emergency services (119) or use the Emergency SOS feature. The community forum is not for active emergencies. For urgent safety concerns, contact moderators directly.',
    order: 5,
    lastUpdated: '2025-01-25T16:45:00Z',
    updatedBy: 'EmergencyTeam',
    isActive: true,
    language: 'all'
  }
]

const guidelineVersions: GuidelineVersion[] = [
  {
    version: 'v2.3',
    releaseDate: '2025-01-31T10:00:00Z',
    changes: [
      'Added AI-generated content policies',
      'Updated location sharing ethics guidelines',
      'Enhanced trauma-informed language requirements',
      'Clarified emergency response procedures'
    ],
    status: 'active'
  },
  {
    version: 'v2.2',
    releaseDate: '2025-01-15T10:00:00Z',
    changes: [
      'Updated privacy protection guidelines',
      'Enhanced reporting procedures',
      'Added multilingual support guidelines'
    ],
    status: 'archived'
  },
  {
    version: 'v2.1',
    releaseDate: '2024-12-20T10:00:00Z',
    changes: [
      'Initial community guidelines',
      'Basic safety advice standards',
      'Moderation procedures'
    ],
    status: 'archived'
  }
]

export function CommunityGuidelines() {
  const [sections, setSections] = useState<GuidelineSection[]>(guidelineSections)
  const [selectedSection, setSelectedSection] = useState<GuidelineSection | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showNewSection, setShowNewSection] = useState(false)
  const [newSection, setNewSection] = useState({
    title: '',
    content: '',
    language: 'all'
  })

  const handleSaveSection = () => {
    if (selectedSection) {
      setSections(prev => prev.map(section => 
        section.id === selectedSection.id 
          ? { ...selectedSection, lastUpdated: new Date().toISOString(), updatedBy: 'Current Moderator' }
          : section
      ))
      setIsEditing(false)
    }
  }

  const handleAddSection = (e: React.FormEvent) => {
    e.preventDefault()
    const section: GuidelineSection = {
      id: `section_${Date.now()}`,
      title: newSection.title,
      content: newSection.content,
      order: sections.length + 1,
      lastUpdated: new Date().toISOString(),
      updatedBy: 'Current Moderator',
      isActive: true,
      language: newSection.language as any
    }
    
    setSections(prev => [...prev, section])
    setNewSection({ title: '', content: '', language: 'all' })
    setShowNewSection(false)
  }

  const handleDeleteSection = (sectionId: string) => {
    setSections(prev => prev.filter(section => section.id !== sectionId))
    setSelectedSection(null)
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Community Guidelines</h2>
          <p className="text-gray-600">Manage and update community standards and policies</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowNewSection(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Section</span>
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Current Version Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Current Version: v2.3</h3>
            <p className="text-blue-800">Released on January 31, 2025 • 4 sections • Available in 3 languages</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Active</span>
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200">
              Publish New Version
            </button>
          </div>
        </div>
      </div>

      {/* Guidelines Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sections List */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Guideline Sections</h3>
          {sections.map((section) => (
            <div key={section.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{section.title}</h4>
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                      Section {section.order}
                    </span>
                    {section.language !== 'all' && (
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                        {section.language.toUpperCase()}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{section.content}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>Updated: {formatDate(section.lastUpdated)}</span>
                    <span>By: {section.updatedBy}</span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2 ml-4">
                  <button
                    onClick={() => {
                      setSelectedSection(section)
                      setIsEditing(false)
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1"
                  >
                    <Eye className="h-3 w-3" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedSection(section)
                      setIsEditing(true)
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1"
                  >
                    <Edit className="h-3 w-3" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteSection(section.id)}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1"
                  >
                    <Trash2 className="h-3 w-3" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Version History */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Version History</h3>
          {guidelineVersions.map((version) => (
            <div key={version.version} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900">{version.version}</h4>
                  <p className="text-sm text-gray-600">{formatDate(version.releaseDate)}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  version.status === 'active' ? 'bg-green-100 text-green-800' :
                  version.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {version.status}
                </span>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Changes:</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  {version.changes.map((change, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Editor Modal */}
      {selectedSection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {isEditing ? 'Edit' : 'View'} Guideline Section
              </h3>
              <button
                onClick={() => {
                  setSelectedSection(null)
                  setIsEditing(false)
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={selectedSection.title}
                    onChange={(e) => setSelectedSection(prev => prev ? { ...prev, title: e.target.value } : null)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-lg font-semibold text-gray-900">{selectedSection.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                {isEditing ? (
                  <MultilingualTextArea
                    value={selectedSection.content}
                    onChange={(value) => setSelectedSection(prev => prev ? { ...prev, content: value } : null)}
                    rows={8}
                    placeholder="Enter the guideline content..."
                  />
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-900 leading-relaxed">{selectedSection.content}</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Section Order</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={selectedSection.order}
                      onChange={(e) => setSelectedSection(prev => prev ? { ...prev, order: parseInt(e.target.value) } : null)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{selectedSection.order}</p>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Language</label>
                  {isEditing ? (
                    <select
                      value={selectedSection.language}
                      onChange={(e) => setSelectedSection(prev => prev ? { ...prev, language: e.target.value as any } : null)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="all">All Languages</option>
                      <option value="en">English Only</option>
                      <option value="si">Sinhala Only</option>
                      <option value="ta">Tamil Only</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{selectedSection.language === 'all' ? 'All Languages' : selectedSection.language.toUpperCase()}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    selectedSection.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedSection.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Section Metadata</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700">Last Updated:</span>
                    <p className="text-blue-900">{formatDate(selectedSection.lastUpdated)}</p>
                  </div>
                  <div>
                    <span className="text-blue-700">Updated By:</span>
                    <p className="text-blue-900">{selectedSection.updatedBy}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSaveSection}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Edit Section</span>
                    </button>
                    <button
                      onClick={() => handleDeleteSection(selectedSection.id)}
                      className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Section Form Modal */}
      {showNewSection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Add New Guideline Section</h3>
              <button
                onClick={() => setShowNewSection(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <form onSubmit={handleAddSection} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                <input
                  type="text"
                  value={newSection.title}
                  onChange={(e) => setNewSection(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Content Sharing Guidelines"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language Target</label>
                <select
                  value={newSection.language}
                  onChange={(e) => setNewSection(prev => ({ ...prev, language: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">All Languages</option>
                  <option value="en">English Only</option>
                  <option value="si">Sinhala Only</option>
                  <option value="ta">Tamil Only</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <MultilingualTextArea
                  value={newSection.content}
                  onChange={(value) => setNewSection(prev => ({ ...prev, content: value }))}
                  rows={6}
                  placeholder="Write the guideline content. Be clear, specific, and considerate of cultural context..."
                  required
                />
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200"
                >
                  Add Section
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewSection(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Guidelines Management Tools */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Management Tools</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg text-center">
            <Globe className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h4 className="font-semibold text-purple-900 mb-2">Translation Management</h4>
            <p className="text-sm text-purple-800 mb-4">Manage guidelines in Sinhala and Tamil</p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200">
              Manage Translations
            </button>
          </div>

          <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center">
            <FileText className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h4 className="font-semibold text-green-900 mb-2">Template Library</h4>
            <p className="text-sm text-green-800 mb-4">Pre-written guideline templates</p>
            <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200">
              Browse Templates
            </button>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
            <Clock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h4 className="font-semibold text-blue-900 mb-2">Scheduled Updates</h4>
            <p className="text-sm text-blue-800 mb-4">Automatic guideline reviews</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200">
              Schedule Review
            </button>
          </div>
        </div>
      </div>

      {/* Guidelines Impact */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Guidelines Impact & Compliance</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">98.2%</p>
            <p className="text-sm text-gray-600">Compliance Rate</p>
          </div>
          
          <div className="text-center">
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">8,247</p>
            <p className="text-sm text-gray-600">Users Acknowledged</p>
          </div>
          
          <div className="text-center">
            <div className="h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">23</p>
            <p className="text-sm text-gray-600">Violations This Month</p>
          </div>
          
          <div className="text-center">
            <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">v2.3</p>
            <p className="text-sm text-gray-600">Current Version</p>
          </div>
        </div>
      </div>
    </div>
  )
}