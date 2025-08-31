import React, { useState } from 'react'
import { BookOpen, Play, Download, Clock, Star, ChevronRight, AlertTriangle } from 'lucide-react'

const educationalContent = [
  {
    id: 1,
    title: 'Essential Self-Defense for Sri Lankan Women',
    description: 'Learn practical self-defense techniques adapted for common situations in Sri Lanka. Includes escaping grabs, creating distance, and using everyday items for protection.',
    duration: '18 min',
    type: 'video',
    difficulty: 'Beginner',
    rating: 4.9,
    thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 2,
    title: 'Safe Travel on CTB Buses and Trains',
    description: 'Comprehensive guide for staying safe on Sri Lankan public transport. Covers peak hour safety, dealing with harassment, and emergency procedures on buses and trains.',
    duration: '14 min',
    type: 'article',
    difficulty: 'Beginner',
    rating: 4.8,
    thumbnail: 'https://images.pexels.com/photos/290595/pexels-photo-290595.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 3,
    title: 'Protecting Yourself Online in Sri Lanka',
    description: 'Navigate social media safely, recognize online predators, and protect your digital privacy. Includes reporting procedures for cyber harassment to Sri Lanka Police.',
    duration: '22 min',
    type: 'guide',
    difficulty: 'Intermediate',
    rating: 4.8,
    thumbnail: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 4,
    title: 'Emergency Kit for Sri Lankan Women',
    description: 'Essential items every woman should carry: emergency contacts, whistle, small flashlight, and important phone numbers. Adapted for local conditions and available resources.',
    duration: '10 min',
    type: 'checklist',
    difficulty: 'Beginner',
    rating: 4.7,
    thumbnail: 'https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 5,
    title: 'Recognizing Danger Signs in Sri Lankan Context',
    description: 'Learn to identify potentially dangerous situations specific to Sri Lankan environments - from crowded markets to isolated bus stops. Trust your instincts and know when to seek help.',
    duration: '16 min',
    type: 'video',
    difficulty: 'Intermediate',
    rating: 4.8,
    thumbnail: 'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 6,
    title: 'Assertiveness Training for Young Women',
    description: 'Build confidence to set boundaries in workplace, family, and social situations. Learn culturally appropriate ways to be assertive while respecting Sri Lankan social norms.',
    duration: '28 min',
    type: 'workshop',
    difficulty: 'Advanced',
    rating: 4.9,
    thumbnail: 'https://images.pexels.com/photos/3768894/pexels-photo-3768894.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 7,
    title: 'Workplace Safety Rights in Sri Lanka',
    description: 'Know your rights regarding workplace harassment and safety. Understand legal protections and reporting procedures under Sri Lankan labor law.',
    duration: '20 min',
    type: 'guide',
    difficulty: 'Intermediate',
    rating: 4.6,
    thumbnail: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 8,
    title: 'Safe Dating and Relationship Red Flags',
    description: 'Recognize warning signs in relationships and dating situations. Learn about healthy boundaries and when to seek help from family or authorities.',
    duration: '24 min',
    type: 'workshop',
    difficulty: 'Intermediate',
    rating: 4.7,
    thumbnail: 'https://images.pexels.com/photos/5699479/pexels-photo-5699479.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
]

const categories = ['All', 'Self-Defense', 'Digital Safety', 'Public Safety', 'Emergency Prep', 'Confidence Building', 'Workplace Safety', 'Relationship Safety']

export function EducationHub() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedContent, setSelectedContent] = useState<any>(null)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="h-4 w-4" />
      case 'article': return <BookOpen className="h-4 w-4" />
      case 'guide': return <BookOpen className="h-4 w-4" />
      case 'checklist': return <Download className="h-4 w-4" />
      case 'workshop': return <Star className="h-4 w-4" />
      default: return <BookOpen className="h-4 w-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (selectedContent) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedContent(null)}
          className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          <span>Back to Education Hub</span>
        </button>

        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <div className="aspect-video bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
            <Play className="h-16 w-16 text-gray-400" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedContent.title}</h1>
          <p className="text-gray-600 mb-6">{selectedContent.description}</p>
          
          <div className="prose prose-lg max-w-none">
            <h3>Introduction</h3>
            <p>This comprehensive guide covers essential safety techniques and strategies that every person should know. The content has been carefully curated by safety experts and is designed to be practical and easy to implement.</p>
            
            <h3>Key Learning Points</h3>
            <ul>
              <li>Understanding situational awareness</li>
              <li>Practical techniques for personal safety</li>
              <li>How to respond in emergency situations</li>
              <li>Building confidence through knowledge</li>
            </ul>
            
            <h3>Getting Started</h3>
            <p>Follow along with the interactive content and practice the techniques in a safe environment. Remember, the goal is to build muscle memory and confidence that can help you in real-world situations.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Safety Education Hub</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Empower yourself with knowledge. Access expert-curated content on personal safety, 
          self-defense, and emergency preparedness.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
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

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {educationalContent.map((content) => (
          <div
            key={content.id}
            onClick={() => setSelectedContent(content)}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer transform hover:scale-[1.02]"
          >
            <div className="aspect-video bg-gray-200 relative overflow-hidden">
              <img
                src={content.thumbnail}
                alt={content.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(content.difficulty)}`}>
                  {content.difficulty}
                </span>
              </div>
              <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                {getTypeIcon(content.type)}
                <span>{content.type}</span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{content.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{content.description}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{content.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span>{content.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Notice */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-red-900 mb-2">In Immediate Danger?</h3>
        <p className="text-red-700 mb-4">
          If you're in immediate danger, don't wait to learn - act now. Use the Emergency SOS button 
          or call 119 for immediate assistance.
        </p>
        <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg font-semibold transition-all duration-200">
          🚨 Emergency SOS
        </button>
      </div>
    </div>
  )
}