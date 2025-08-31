import React, { useState } from 'react'
import { MessageSquare, Heart, Reply, Plus, Clock, Users, Shield, Star } from 'lucide-react'
import { MultilingualInput } from '../Common/MultilingualInput'
import { MultilingualTextArea } from '../Common/MultilingualTextArea'
import { useLanguage } from '../../contexts/LanguageContext'

const forumPosts = [
  {
    id: 1,
    title: 'Best self-defense classes in Colombo - Personal Experience',
    content: 'I recently joined Kyokushin Karate classes at the Colombo Karate Association near Viharamahadevi Park. The instructors are amazing and they have special women-only sessions on Saturdays. The monthly fee is Rs. 3,500 and they provide all equipment. Highly recommend for beginners!',
    author: 'ColomboCityGirl',
    isAnonymous: false,
    category: 'Self-Defense',
    likes: 28,
    replies: 23,
    createdAt: '4 hours ago',
    featured: true
  },
  {
    id: 2,
    title: 'Thank you for helping me feel safer',
    content: 'Last month I posted about feeling unsafe walking from my office in Wellawatte to the bus stop. The community gave me amazing advice - now I use the buddy system with colleagues and take the well-lit Galle Road route. I feel so much more confident now. This community is incredible! 💜',
    author: 'Anonymous',
    isAnonymous: true,
    category: 'Support',
    likes: 62,
    replies: 31,
    createdAt: '8 hours ago',
    featured: false
  },
  {
    id: 3,
    title: 'Safety tips for using CTB buses during rush hour',
    content: 'I take the 138 bus from Pettah to Nugegoda daily for work. During peak hours (7-9 AM, 5-7 PM) it gets extremely crowded. I\'ve noticed some inappropriate behavior. What strategies do you use to stay safe? Should I report incidents to the bus conductor?',
    author: 'DailyCommuter_NG',
    isAnonymous: false,
    category: 'Public Safety',
    likes: 45,
    replies: 27,
    createdAt: '12 hours ago',
    featured: false
  },
  {
    id: 4,
    title: 'Dealing with online harassment - need advice',
    content: 'Someone from my university has been sending inappropriate messages on Facebook and Instagram. They\'ve created fake accounts after I blocked them. I have screenshots but not sure if that\'s enough evidence. Has anyone dealt with cyber harassment? What steps should I take?',
    author: 'Anonymous',
    isAnonymous: true,
    category: 'Digital Safety',
    likes: 38,
    replies: 19,
    createdAt: '1 day ago',
    featured: false
  },
  {
    id: 5,
    title: 'Safe accommodation for working women in Colombo',
    content: 'I\'m starting a new job in Colombo 02 next month and looking for safe boarding places or hostels for working women. Any recommendations for areas like Slave Island, Kollupitiya, or nearby? Budget is around Rs. 25,000-30,000 per month.',
    author: 'NewToColumbo2025',
    isAnonymous: false,
    category: 'Housing Safety',
    likes: 29,
    replies: 16,
    createdAt: '1 day ago',
    featured: false
  },
  {
    id: 6,
    title: 'Midnight shift safety - healthcare workers',
    content: 'I work night shifts at a private hospital in Colombo 08. Getting home safely after midnight is always a concern. The hospital provides transport until 11 PM only. Other night shift workers, how do you manage? Any reliable taxi services you trust?',
    author: 'NightShiftNurse',
    isAnonymous: false,
    category: 'Workplace Safety',
    likes: 24,
    replies: 12,
    createdAt: '2 days ago',
    featured: false
  }
]

const categories = ['All', 'Self-Defense', 'Public Safety', 'Digital Safety', 'Support', 'Emergency Prep']

export function CommunityForum() {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedContent, setSelectedContent] = useState(null)
  const [showNewPostForm, setShowNewPostForm] = useState(false)
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'Support',
    isAnonymous: true
  })

  const handleNewPostSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would submit the new post
    console.log('New post:', newPost)
    setShowNewPostForm(false)
    setNewPost({ title: '', content: '', category: 'Support', isAnonymous: true })
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Self-Defense': return 'bg-red-100 text-red-800'
      case 'Public Safety': return 'bg-blue-100 text-blue-800'
      case 'Digital Safety': return 'bg-green-100 text-green-800'
      case 'Support': return 'bg-purple-100 text-purple-800'
      case 'Emergency Prep': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Community Forum</h2>
          <p className="text-gray-600">Connect, share experiences, and support each other in our safe community space.</p>
        </div>
        <button
          onClick={() => setShowNewPostForm(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>New Post</span>
        </button>
      </div>

      {/* Community Guidelines */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="h-6 w-6 text-purple-600" />
          <h3 className="text-lg font-semibold text-purple-900">Community Guidelines</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-purple-800">
          <div>• Be respectful and supportive</div>
          <div>• No personal attacks or discrimination</div>
          <div>• Protect others' privacy and anonymity</div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* New Post Form Modal */}
      {showNewPostForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Create New Post</h3>
            <form onSubmit={handleNewPostSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <MultilingualInput
                  value={newPost.title}
                  onChange={(value) => setNewPost(prev => ({ ...prev, title: value }))}
                  placeholder="What would you like to discuss?"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {categories.slice(1).map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center space-x-2 pt-8">
                  <input
                    type="checkbox"
                    checked={newPost.isAnonymous}
                    onChange={(e) => setNewPost(prev => ({ ...prev, isAnonymous: e.target.checked }))}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label className="text-sm font-medium text-gray-700">Post anonymously</label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <MultilingualTextArea
                  value={newPost.content}
                  onChange={(value) => setNewPost(prev => ({ ...prev, content: value }))}
                  rows={6}
                  placeholder="Share your thoughts, experiences, or questions..."
                  required
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200"
                >
                  Post to Community
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewPostForm(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Posts */}
      <div className="space-y-6">
        {forumPosts.map((post) => (
          <div
            key={post.id}
            className={`bg-white rounded-xl p-6 shadow-sm border transition-all duration-200 hover:shadow-md cursor-pointer ${
              post.featured ? 'border-purple-200 bg-purple-50' : 'border-gray-200'
            }`}
            onClick={() => setSelectedContent(post)}
          >
            {post.featured && (
              <div className="flex items-center space-x-2 mb-3">
                <Star className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-600">Featured Discussion</span>
              </div>
            )}
            
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-600 line-clamp-2">{post.content}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ml-4 ${getCategoryColor(post.category)}`}>
                {post.category}
              </span>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>By {post.author}</span>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{post.createdAt}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Heart className="h-4 w-4" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Reply className="h-4 w-4" />
                  <span>{post.replies}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}