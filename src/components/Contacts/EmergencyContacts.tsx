import React, { useState } from 'react'
import { Phone, Plus, Edit, Trash2, User, CheckCircle } from 'lucide-react'
import { MultilingualInput } from '../Common/MultilingualInput'
import { useLanguage } from '../../contexts/LanguageContext'

const defaultContacts = [
  { id: 1, name: 'Police Emergency Hotline', phone: '119', relationship: 'Emergency Services', isDefault: true },
  { id: 2, name: 'Police Emergency (Alternative)', phone: '118', relationship: 'Emergency Services', isDefault: true },
  { id: 3, name: 'Women & Child Protection Authority', phone: '1938', relationship: 'Support Services', isDefault: true },
  { id: 4, name: 'National Child Protection Authority', phone: '1929', relationship: 'Child Protection', isDefault: true },
  { id: 5, name: 'Ambulance Service', phone: '1990', relationship: 'Medical Emergency', isDefault: true }
]

export function EmergencyContacts() {
  const { t } = useLanguage()
  const [contacts, setContacts] = useState([
    ...defaultContacts,
    { id: 6, name: 'Amma (Kamani)', phone: '+94771234567', relationship: 'Mother', isDefault: false },
    { id: 7, name: 'Akka (Sanduni)', phone: '+94712345678', relationship: 'Elder Sister', isDefault: false },
    { id: 8, name: 'Best Friend (Tharushi)', phone: '+94703456789', relationship: 'Close Friend', isDefault: false },
    { id: 9, name: 'Uncle (Sunil)', phone: '+94777654321', relationship: 'Uncle', isDefault: false }
  ])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingContact, setEditingContact] = useState<any>(null)
  const [newContact, setNewContact] = useState({ name: '', phone: '', relationship: '' })

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault()
    const contact = {
      id: Date.now(),
      ...newContact,
      isDefault: false
    }
    setContacts(prev => [...prev, contact])
    setNewContact({ name: '', phone: '', relationship: '' })
    setShowAddForm(false)
  }

  const handleEditContact = (contact: any) => {
    setEditingContact(contact)
    setNewContact({
      name: contact.name,
      phone: contact.phone,
      relationship: contact.relationship
    })
    setShowAddForm(true)
  }

  const handleUpdateContact = (e: React.FormEvent) => {
    e.preventDefault()
    setContacts(prev => prev.map(contact => 
      contact.id === editingContact.id 
        ? { ...contact, ...newContact }
        : contact
    ))
    setNewContact({ name: '', phone: '', relationship: '' })
    setShowAddForm(false)
    setEditingContact(null)
  }

  const handleDeleteContact = (id: number) => {
    setContacts(prev => prev.filter(contact => contact.id !== id))
  }

  const testContact = (phone: string) => {
    // Simulate testing contact
    alert(`Test message sent to ${phone}`)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Emergency Contacts</h2>
          <p className="text-gray-600">Manage your trusted contacts who will be notified during emergencies.</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Contact</span>
        </button>
      </div>

      {/* Emergency Info */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Phone className="h-6 w-6 text-red-600" />
          <h3 className="text-lg font-semibold text-red-900">Emergency Numbers Sri Lanka</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white rounded-lg p-3">
            <strong className="text-red-900">Police Emergency:</strong>
            <br />
            <span className="text-red-700">119 or 118</span>
          </div>
          <div className="bg-white rounded-lg p-3">
            <strong className="text-red-900">Women & Child Desk:</strong>
            <br />
            <span className="text-red-700">1938</span>
          </div>
          <div className="bg-white rounded-lg p-3">
            <strong className="text-red-900">Ambulance Service:</strong>
            <br />
            <span className="text-red-700">1990</span>
          </div>
        </div>
      </div>

      {/* Add/Edit Contact Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              {editingContact ? 'Edit Contact' : 'Add New Contact'}
            </h3>
            <form onSubmit={editingContact ? handleUpdateContact : handleAddContact} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <MultilingualInput
                  value={newContact.name}
                  onChange={(value) => setNewContact(prev => ({ ...prev, name: value }))}
                  placeholder="Contact name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="+94771234567"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                <MultilingualInput
                  value={newContact.relationship}
                  onChange={(value) => setNewContact(prev => ({ ...prev, relationship: value }))}
                  placeholder="e.g., Mother, Sister, Friend"
                  required
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200"
                >
                  {editingContact ? 'Update Contact' : 'Add Contact'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingContact(null)
                    setNewContact({ name: '', phone: '', relationship: '' })
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Contacts List */}
      <div className="space-y-4">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`bg-white rounded-xl p-6 shadow-sm border transition-all duration-200 ${
              contact.isDefault ? 'border-teal-200 bg-teal-50' : 'border-gray-200 hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                  contact.isDefault ? 'bg-teal-600' : 'bg-purple-600'
                }`}>
                  {contact.isDefault ? (
                    <Phone className="h-6 w-6 text-white" />
                  ) : (
                    <User className="h-6 w-6 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
                  <p className="text-gray-600">{contact.relationship}</p>
                  <p className="text-purple-600 font-medium">{contact.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {contact.isDefault && (
                  <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs font-medium">
                    Default
                  </span>
                )}
                <button
                  onClick={() => testContact(contact.phone)}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  Test
                </button>
                {!contact.isDefault && (
                  <>
                    <button
                      onClick={() => handleEditContact(contact)}
                      className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteContact(contact.id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Setup Reminder */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-3">
          <CheckCircle className="h-6 w-6 text-yellow-600" />
          <h3 className="text-lg font-semibold text-yellow-900">Setup Reminder</h3>
        </div>
        <p className="text-yellow-800 text-sm">
          Make sure your emergency contacts are aware they may receive emergency alerts from our safety platform. 
          Consider having a conversation with them about what these alerts mean and how they should respond.
        </p>
      </div>
    </div>
  )
}