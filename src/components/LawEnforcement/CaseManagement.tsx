import React, { useState } from 'react'
import { Shield, Clock, User, FileText, Eye, Edit, CheckCircle, AlertTriangle, Calendar, Phone, X } from 'lucide-react'
import { MultilingualTextArea } from '../Common/MultilingualTextArea'

interface Case {
  id: string
  title: string
  type: 'Sexual Harassment' | 'Stalking' | 'Domestic Violence' | 'Assault' | 'Cyber Crime' | 'Workplace Harassment'
  status: 'Open' | 'Under Investigation' | 'Pending Court' | 'Resolved' | 'Closed'
  priority: 'Critical' | 'High' | 'Medium' | 'Low'
  assignedOfficer: string
  reportedDate: string
  lastUpdated: string
  location: string
  victimId: string
  suspectInfo?: string
  description: string
  evidence: string[]
  witnesses: number
  nextAction: string
  courtDate?: string
  notes: string[]
}

const mockCases: Case[] = [
  {
    id: 'WP-2025-1247',
    title: 'Workplace Sexual Harassment - World Trade Center',
    type: 'Workplace Harassment',
    status: 'Under Investigation',
    priority: 'High',
    assignedOfficer: 'You (SI Perera)',
    reportedDate: '2025-01-29T10:30:00Z',
    lastUpdated: '2025-01-31T14:20:00Z',
    location: 'World Trade Center, Floor 23, Colombo 01',
    victimId: 'VIC_2025_4789',
    suspectInfo: 'Senior Manager, Male, 45 years, Employee ID: WTC_2025_789',
    description: 'Victim reports persistent inappropriate comments, unwanted physical contact, and quid pro quo harassment by direct supervisor over 3-month period. HR department failed to take action despite formal complaints.',
    evidence: ['HR_complaint_emails.pdf', 'witness_statements.pdf', 'CCTV_footage_elevator.mp4', 'text_messages.pdf'],
    witnesses: 3,
    nextAction: 'Interview remaining witnesses, obtain employment records',
    notes: [
      'Initial victim interview completed - detailed statement recorded',
      'HR department contacted - cooperation pending',
      'Witness 1 (colleague) interviewed - corroborates victim account',
      'CCTV footage requested from building security'
    ]
  },
  {
    id: 'WP-2025-1248',
    title: 'University Campus Stalking - University of Colombo',
    type: 'Stalking',
    status: 'Open',
    priority: 'Medium',
    assignedOfficer: 'You (SI Perera)',
    reportedDate: '2025-01-30T16:45:00Z',
    lastUpdated: '2025-01-31T11:30:00Z',
    location: 'University of Colombo, Arts Faculty',
    victimId: 'VIC_2025_4790',
    suspectInfo: 'Unknown male, 25-30 years, rides red motorcycle without visible license plate',
    description: 'Female student followed for 5 consecutive days after evening lectures. Suspect waits outside faculty building and follows victim to bus stop. Campus security has been notified.',
    evidence: ['campus_security_report.pdf', 'victim_statement.pdf', 'security_camera_stills.jpg'],
    witnesses: 2,
    nextAction: 'Review campus CCTV footage, coordinate with university security',
    courtDate: '2025-02-15T09:00:00Z',
    notes: [
      'Campus security briefed - increased patrols during evening hours',
      'Victim provided with safety escort service',
      'CCTV footage analysis in progress'
    ]
  },
  {
    id: 'WP-2025-1249',
    title: 'Public Transport Harassment - CTB Route 138',
    type: 'Sexual Harassment',
    status: 'Pending Court',
    priority: 'Medium',
    assignedOfficer: 'You (SI Perera)',
    reportedDate: '2025-01-28T17:20:00Z',
    lastUpdated: '2025-01-30T09:15:00Z',
    location: 'CTB Bus Route 138, Pettah to Nugegoda',
    victimId: 'VIC_2025_4791',
    suspectInfo: 'Bus conductor, Male, 35 years, Employee ID: CTB_789456',
    description: 'Inappropriate touching and verbal harassment by bus conductor during evening rush hour. Multiple passengers witnessed the incident.',
    evidence: ['witness_statements.pdf', 'CTB_employee_records.pdf', 'victim_medical_report.pdf'],
    witnesses: 4,
    nextAction: 'Prepare case file for magistrate court hearing',
    courtDate: '2025-02-05T10:00:00Z',
    notes: [
      'Suspect suspended pending investigation',
      'CTB management fully cooperating',
      'All witness statements collected',
      'Case file prepared for court submission'
    ]
  }
]

export function CaseManagement() {
  const [cases, setCases] = useState<Case[]>(mockCases)
  const [selectedCase, setSelectedCase] = useState<Case | null>(null)
  const [filter, setFilter] = useState<'all' | 'open' | 'urgent'>('all')
  const [newNote, setNewNote] = useState('')

  const filteredCases = cases.filter(case_ => {
    switch (filter) {
      case 'open':
        return case_.status === 'Open' || case_.status === 'Under Investigation'
      case 'urgent':
        return case_.priority === 'Critical' || case_.priority === 'High'
      default:
        return true
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-800'
      case 'Under Investigation': return 'bg-yellow-100 text-yellow-800'
      case 'Pending Court': return 'bg-blue-100 text-blue-800'
      case 'Resolved': return 'bg-green-100 text-green-800'
      case 'Closed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const addNote = () => {
    if (newNote.trim() && selectedCase) {
      const updatedCase = {
        ...selectedCase,
        notes: [...selectedCase.notes, `${new Date().toLocaleString()}: ${newNote.trim()}`],
        lastUpdated: new Date().toISOString()
      }
      
      setCases(prev => prev.map(c => c.id === selectedCase.id ? updatedCase : c))
      setSelectedCase(updatedCase)
      setNewNote('')
    }
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Case Management</h2>
          <p className="text-gray-600">Track and manage your assigned investigation cases</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
            {cases.filter(c => c.status === 'Under Investigation').length} Active
          </div>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {cases.filter(c => c.status === 'Pending Court').length} Pending Court
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2">
        {[
          { key: 'all', label: 'All Cases', count: cases.length },
          { key: 'open', label: 'Active Cases', count: cases.filter(c => c.status === 'Open' || c.status === 'Under Investigation').length },
          { key: 'urgent', label: 'High Priority', count: cases.filter(c => c.priority === 'Critical' || c.priority === 'High').length }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              filter === tab.key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Cases List */}
      <div className="space-y-4">
        {filteredCases.map((case_) => (
          <div key={case_.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{case_.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(case_.priority)}`}>
                    {case_.priority}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(case_.status)}`}>
                    {case_.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Reported:</span>
                    </div>
                    <p className="text-sm text-gray-900 ml-6">{formatDate(case_.reportedDate)}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Last Updated:</span>
                    </div>
                    <p className="text-sm text-gray-900 ml-6">{formatDate(case_.lastUpdated)}</p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Witnesses:</span>
                    </div>
                    <p className="text-sm text-gray-900 ml-6">{case_.witnesses} people</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Next Action Required:</h4>
                  <p className="text-sm text-blue-900 bg-blue-50 p-3 rounded-lg">{case_.nextAction}</p>
                </div>

                {case_.courtDate && (
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <Calendar className="h-4 w-4 text-purple-500" />
                      <span className="text-sm font-medium text-purple-700">Court Date:</span>
                    </div>
                    <p className="text-sm text-purple-900 ml-6 font-semibold">{formatDate(case_.courtDate)}</p>
                  </div>
                )}

                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>Case ID: {case_.id}</span>
                  <span>Victim ID: {case_.victimId}</span>
                  <span>Evidence: {case_.evidence.length} files</span>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2 ml-4">
                <button
                  onClick={() => setSelectedCase(case_)}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1"
                >
                  <Eye className="h-3 w-3" />
                  <span>View Case</span>
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1">
                  <Edit className="h-3 w-3" />
                  <span>Update</span>
                </button>
                {case_.status === 'Under Investigation' && (
                  <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1">
                    <CheckCircle className="h-3 w-3" />
                    <span>Close Case</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Case Details Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Case Details - {selectedCase.id}</h3>
              <button
                onClick={() => setSelectedCase(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Case Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Case Title</label>
                    <p className="font-semibold text-gray-900">{selectedCase.title}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Type</label>
                    <p className="text-gray-900">{selectedCase.type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Location</label>
                    <p className="text-gray-900">{selectedCase.location}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Status</label>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedCase.status)}`}>
                      {selectedCase.status}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Priority</label>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(selectedCase.priority)}`}>
                      {selectedCase.priority}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Assigned Officer</label>
                    <p className="text-gray-900">{selectedCase.assignedOfficer}</p>
                  </div>
                </div>
              </div>

              {/* Case Description */}
              <div>
                <label className="text-sm font-medium text-gray-600">Case Description</label>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-2">
                  <p className="text-gray-900">{selectedCase.description}</p>
                </div>
              </div>

              {/* Suspect Information */}
              {selectedCase.suspectInfo && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Suspect Information</label>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-2">
                    <p className="text-red-900">{selectedCase.suspectInfo}</p>
                  </div>
                </div>
              )}

              {/* Evidence Files */}
              <div>
                <label className="text-sm font-medium text-gray-600">Evidence Files ({selectedCase.evidence.length})</label>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedCase.evidence.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-blue-900">{file}</span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Investigation Notes */}
              <div>
                <label className="text-sm font-medium text-gray-600">Investigation Notes</label>
                <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                  {selectedCase.notes.map((note, index) => (
                    <div key={index} className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-sm text-gray-900">{note}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add New Note */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">Add Investigation Note</label>
                <div className="flex space-x-2">
                  <MultilingualTextArea
                    value={newNote}
                    onChange={setNewNote}
                    placeholder="Enter investigation update, witness information, or next steps..."
                    rows={3}
                    className="flex-1"
                  />
                  <button
                    onClick={addNote}
                    disabled={!newNote.trim()}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add Note
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Update Status</span>
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Generate Report</span>
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Contact Victim</span>
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
              <p className="text-sm font-medium text-gray-600 mb-1">Total Cases</p>
              <p className="text-2xl font-bold text-gray-900">{cases.length}</p>
            </div>
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Under Investigation</p>
              <p className="text-2xl font-bold text-gray-900">{cases.filter(c => c.status === 'Under Investigation').length}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Resolved This Month</p>
              <p className="text-2xl font-bold text-gray-900">{cases.filter(c => c.status === 'Resolved').length}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Court Pending</p>
              <p className="text-2xl font-bold text-gray-900">{cases.filter(c => c.status === 'Pending Court').length}</p>
            </div>
            <Calendar className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  )
}