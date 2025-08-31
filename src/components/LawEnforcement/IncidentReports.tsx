import React, { useState } from 'react'
import { FileText, Calendar, User, MapPin, Eye, Download, Plus, Search, Filter, X } from 'lucide-react'
import { MultilingualInput } from '../Common/MultilingualInput'
import { MultilingualTextArea } from '../Common/MultilingualTextArea'

interface IncidentReport {
  id: string
  title: string
  type: 'Sexual Harassment' | 'Stalking' | 'Domestic Violence' | 'Assault' | 'Cyber Crime' | 'Public Safety'
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Archived'
  filedDate: string
  filedBy: string
  location: string
  victimId: string
  suspectInfo?: string
  description: string
  officerNotes: string
  evidence: string[]
  witnesses: { name: string; contact: string; statement: string }[]
  followUpRequired: boolean
  caseNumber?: string
}

const mockReports: IncidentReport[] = [
  {
    id: 'IR-2025-001',
    title: 'Sexual Harassment at Workplace - WTC',
    type: 'Sexual Harassment',
    status: 'Submitted',
    filedDate: '2025-01-31T14:30:00Z',
    filedBy: 'SI Perera (Badge: WP-2025-089)',
    location: 'World Trade Center, Floor 23, Colombo 01',
    victimId: 'VIC_2025_4789',
    suspectInfo: 'Senior Manager, Male, 45 years, Employee ID: WTC_2025_789',
    description: 'Victim reports systematic sexual harassment by direct supervisor including inappropriate comments, unwanted physical contact, and quid pro quo demands over 3-month period.',
    officerNotes: 'Victim provided detailed timeline of incidents. HR department initially unresponsive. Three colleagues willing to provide witness statements. Recommend immediate suspension of suspect pending investigation.',
    evidence: ['victim_statement_detailed.pdf', 'HR_email_chain.pdf', 'witness_statements.pdf', 'employment_records.pdf'],
    witnesses: [
      { name: 'Colleague A (Anonymous)', contact: 'Via HR', statement: 'Witnessed inappropriate comments during team meetings' },
      { name: 'Colleague B (Anonymous)', contact: 'Via HR', statement: 'Saw suspect cornering victim in break room' },
      { name: 'Security Guard', contact: '+94771234567', statement: 'Noticed victim appearing distressed after meetings with suspect' }
    ],
    followUpRequired: true,
    caseNumber: 'WP-2025-1247'
  },
  {
    id: 'IR-2025-002',
    title: 'Stalking Incident - University Campus',
    type: 'Stalking',
    status: 'Under Review',
    filedDate: '2025-01-30T16:20:00Z',
    filedBy: 'PC Silva (Badge: WP-2025-156)',
    location: 'University of Colombo, Arts Faculty',
    victimId: 'VIC_2025_4790',
    suspectInfo: 'Unknown male, 25-30 years, red motorcycle, no visible license plate',
    description: 'Student followed consistently for 5 days after evening lectures. Suspect waits outside faculty building and follows victim to bus stop. Pattern suggests premeditated stalking behavior.',
    officerNotes: 'Campus security fully cooperating. CCTV footage shows clear pattern of following behavior. Victim provided with safety escort. Increased security patrols implemented.',
    evidence: ['campus_security_report.pdf', 'CCTV_footage_compilation.mp4', 'victim_daily_log.pdf'],
    witnesses: [
      { name: 'Campus Security Officer', contact: '+94112581835', statement: 'Observed suspect on multiple occasions' },
      { name: 'Fellow Student', contact: 'Via university', statement: 'Saw same person following victim to bus stop' }
    ],
    followUpRequired: true
  }
]

export function IncidentReports() {
  const [reports, setReports] = useState<IncidentReport[]>(mockReports)
  const [selectedReport, setSelectedReport] = useState<IncidentReport | null>(null)
  const [showNewReportForm, setShowNewReportForm] = useState(false)
  const [filter, setFilter] = useState<'all' | 'pending' | 'my_reports'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [newReport, setNewReport] = useState({
    title: '',
    type: 'Sexual Harassment',
    location: '',
    victimId: '',
    suspectInfo: '',
    description: '',
    officerNotes: ''
  })

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    switch (filter) {
      case 'pending':
        return matchesSearch && (report.status === 'Draft' || report.status === 'Under Review')
      case 'my_reports':
        return matchesSearch && report.filedBy.includes('SI Perera')
      default:
        return matchesSearch
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'bg-gray-100 text-gray-800'
      case 'Submitted': return 'bg-blue-100 text-blue-800'
      case 'Under Review': return 'bg-yellow-100 text-yellow-800'
      case 'Approved': return 'bg-green-100 text-green-800'
      case 'Archived': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault()
    const report: IncidentReport = {
      id: `IR-2025-${String(reports.length + 1).padStart(3, '0')}`,
      ...newReport,
      status: 'Draft',
      filedDate: new Date().toISOString(),
      filedBy: 'SI Perera (Badge: WP-2025-089)',
      evidence: [],
      witnesses: [],
      followUpRequired: true
    }
    
    setReports(prev => [report, ...prev])
    setNewReport({
      title: '',
      type: 'Sexual Harassment',
      location: '',
      victimId: '',
      suspectInfo: '',
      description: '',
      officerNotes: ''
    })
    setShowNewReportForm(false)
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Incident Reports</h2>
          <p className="text-gray-600">Create, manage, and track official police incident reports</p>
        </div>
        <button
          onClick={() => setShowNewReportForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>New Report</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search reports by title, location, or ID..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex space-x-2">
          {[
            { key: 'all', label: 'All Reports', count: reports.length },
            { key: 'pending', label: 'Pending Review', count: reports.filter(r => r.status === 'Draft' || r.status === 'Under Review').length },
            { key: 'my_reports', label: 'My Reports', count: reports.filter(r => r.filedBy.includes('SI Perera')).length }
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
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                  {report.followUpRequired && (
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                      Follow-up Required
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Filed:</span>
                    </div>
                    <p className="text-sm text-gray-900 ml-6">{formatDate(report.filedDate)}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Filed By:</span>
                    </div>
                    <p className="text-sm text-gray-900 ml-6">{report.filedBy}</p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Location:</span>
                    </div>
                    <p className="text-sm text-gray-900 ml-6">{report.location}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>Report ID: {report.id}</span>
                  <span>Type: {report.type}</span>
                  <span>Evidence: {report.evidence.length} files</span>
                  <span>Witnesses: {report.witnesses.length}</span>
                  {report.caseNumber && <span>Case: {report.caseNumber}</span>}
                </div>
              </div>
              
              <div className="flex flex-col space-y-2 ml-4">
                <button
                  onClick={() => setSelectedReport(report)}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1"
                >
                  <Eye className="h-3 w-3" />
                  <span>View</span>
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1">
                  <Download className="h-3 w-3" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Report Form Modal */}
      {showNewReportForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Create New Incident Report</h3>
              <button
                onClick={() => setShowNewReportForm(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <form onSubmit={handleSubmitReport} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Report Title</label>
                  <MultilingualInput
                    value={newReport.title}
                    onChange={(value) => setNewReport(prev => ({ ...prev, title: value }))}
                    placeholder="Brief description of the incident"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Incident Type</label>
                  <select
                    value={newReport.type}
                    onChange={(e) => setNewReport(prev => ({ ...prev, type: e.target.value as any }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Sexual Harassment">Sexual Harassment</option>
                    <option value="Stalking">Stalking</option>
                    <option value="Domestic Violence">Domestic Violence</option>
                    <option value="Assault">Assault</option>
                    <option value="Cyber Crime">Cyber Crime</option>
                    <option value="Public Safety">Public Safety</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <MultilingualInput
                    value={newReport.location}
                    onChange={(value) => setNewReport(prev => ({ ...prev, location: value }))}
                    placeholder="Exact location where incident occurred"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Victim ID</label>
                  <input
                    type="text"
                    value={newReport.victimId}
                    onChange={(e) => setNewReport(prev => ({ ...prev, victimId: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="VIC_2025_XXXX"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Suspect Information</label>
                <MultilingualInput
                  value={newReport.suspectInfo}
                  onChange={(value) => setNewReport(prev => ({ ...prev, suspectInfo: value }))}
                  placeholder="Physical description, known details, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Incident Description</label>
                <MultilingualTextArea
                  value={newReport.description}
                  onChange={(value) => setNewReport(prev => ({ ...prev, description: value }))}
                  rows={4}
                  placeholder="Detailed description of what occurred..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Officer Notes & Observations</label>
                <MultilingualTextArea
                  value={newReport.officerNotes}
                  onChange={(value) => setNewReport(prev => ({ ...prev, officerNotes: value }))}
                  rows={3}
                  placeholder="Your professional observations, recommendations, next steps..."
                  required
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200"
                >
                  Save as Draft
                </button>
                <button
                  type="button"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200"
                >
                  Submit Report
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewReportForm(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Report Details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Incident Report - {selectedReport.id}</h3>
              <button
                onClick={() => setSelectedReport(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Report Header */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-blue-700">Report ID</label>
                    <p className="font-semibold text-blue-900">{selectedReport.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-700">Status</label>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedReport.status)}`}>
                      {selectedReport.status}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-700">Filed By</label>
                    <p className="text-blue-900">{selectedReport.filedBy}</p>
                  </div>
                </div>
              </div>

              {/* Incident Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-600">Incident Type</label>
                  <p className="text-gray-900">{selectedReport.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Location</label>
                  <p className="text-gray-900">{selectedReport.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Victim ID</label>
                  <p className="text-gray-900">{selectedReport.victimId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Filed Date</label>
                  <p className="text-gray-900">{formatDate(selectedReport.filedDate)}</p>
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label className="text-sm font-medium text-gray-600">Incident Description</label>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-2">
                  <p className="text-gray-900">{selectedReport.description}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Officer Notes</label>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-2">
                  <p className="text-blue-900">{selectedReport.officerNotes}</p>
                </div>
              </div>

              {/* Evidence */}
              <div>
                <label className="text-sm font-medium text-gray-600">Evidence Files ({selectedReport.evidence.length})</label>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedReport.evidence.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-900">{file}</span>
                      </div>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Witnesses */}
              <div>
                <label className="text-sm font-medium text-gray-600">Witness Information ({selectedReport.witnesses.length})</label>
                <div className="mt-2 space-y-2">
                  {selectedReport.witnesses.map((witness, index) => (
                    <div key={index} className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                        <div>
                          <span className="text-sm font-medium text-purple-700">Name:</span>
                          <p className="text-purple-900">{witness.name}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-purple-700">Contact:</span>
                          <p className="text-purple-900">{witness.contact}</p>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-purple-700">Statement:</span>
                        <p className="text-purple-900 mt-1">{witness.statement}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Edit Report</span>
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Export PDF</span>
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200">
                  Submit for Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}