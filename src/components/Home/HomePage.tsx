import React, { useState, useEffect } from 'react'
import { Shield, AlertTriangle, Users, MapPin, BookOpen, Phone, ArrowRight, Star, CheckCircle, Globe, Heart, Award, Clock, Eye } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import { LanguageSelector } from '../Common/LanguageSelector'

interface HomePageProps {
  onShowLogin: () => void
  onShowRegister: () => void
}

const features = [
  {
    icon: AlertTriangle,
    titleKey: 'home.features.emergency.title',
    descriptionKey: 'home.features.emergency.description',
    color: 'text-red-600',
    bg: 'bg-red-50',
    image: 'https://images.pexels.com/photos/6975474/pexels-photo-6975474.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    icon: MapPin,
    titleKey: 'home.features.safe_zones.title',
    descriptionKey: 'home.features.safe_zones.description',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    image: 'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    icon: BookOpen,
    titleKey: 'home.features.education.title',
    descriptionKey: 'home.features.education.description',
    color: 'text-green-600',
    bg: 'bg-green-50',
    image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    icon: Users,
    titleKey: 'home.features.community.title',
    descriptionKey: 'home.features.community.description',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    image: 'https://images.pexels.com/photos/3768894/pexels-photo-3768894.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
]

const testimonials = [
  {
    nameKey: 'home.testimonials.user1.name',
    textKey: 'home.testimonials.user1.text',
    role: 'University Student, Colombo',
    image: 'https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    nameKey: 'home.testimonials.user2.name',
    textKey: 'home.testimonials.user2.text',
    role: 'Working Professional, Kandy',
    image: 'https://images.pexels.com/photos/3768997/pexels-photo-3768997.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    nameKey: 'home.testimonials.user3.name',
    textKey: 'home.testimonials.user3.text',
    role: 'Healthcare Worker, Galle',
    image: 'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
]

const keyFeatures = [
  { icon: Shield, label: 'Emergency SOS System', description: 'One-tap emergency alerts', color: 'text-red-600' },
  { icon: MapPin, label: 'Safe Zone Mapping', description: 'Find nearby safe locations', color: 'text-blue-600' },
  { icon: BookOpen, label: 'Safety Education', description: 'Learn from safety experts', color: 'text-green-600' },
  { icon: Users, label: 'Community Support', description: 'Connect with other women', color: 'text-purple-600' }
]

export function HomePage({ onShowLogin, onShowRegister }: HomePageProps) {
  const { t } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const heroImages = [
    'https://images.pexels.com/photos/3768894/pexels-photo-3768894.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                <Shield className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t('app.title')}
              </h1>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <LanguageSelector />
              <button
                onClick={onShowLogin}
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors px-2 sm:px-4 py-2 rounded-lg hover:bg-purple-50 text-sm sm:text-base"
              >
                {t('action.sign_in')}
              </button>
              <button
                onClick={onShowRegister}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 px-3 sm:px-6 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
              >
                {t('action.sign_up')}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 text-white py-12 sm:py-16 lg:py-24 overflow-hidden">
        {/* Background Image Carousel */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-30' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt="SafeHer Community"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-purple-800/70 to-pink-800/80"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-20 sm:top-40 right-10 sm:right-20 w-20 h-20 sm:w-32 sm:h-32 bg-pink-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 sm:bottom-20 left-1/4 w-16 h-16 sm:w-24 sm:h-24 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-2000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-1 sm:space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-pink-300" />
                <span className="text-xs sm:text-sm font-medium text-pink-100">Trusted by 8,500+ Women</span>
              </div>
              
              <h2 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
                  {t('home.hero.title')}
                </span>
              </h2>
              
              <p className="text-base sm:text-lg lg:text-xl text-purple-100 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {t('home.hero.subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
                <button
                  onClick={onShowRegister}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-full font-bold text-base sm:text-lg transition-all duration-300 shadow-2xl hover:shadow-pink-500/25 transform hover:scale-105 flex items-center justify-center space-x-2 min-h-[48px]"
                >
                  <span>{t('home.hero.get_started')}</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button className="border-2 border-white/50 text-white hover:bg-white/10 backdrop-blur-sm py-3 sm:py-4 px-6 sm:px-8 rounded-full font-bold text-base sm:text-lg transition-all duration-300 hover:border-white min-h-[48px]">
                  {t('home.hero.learn_more')}
                </button>
              </div>
            </div>
            
            <div className="relative">
              {/* Main Feature Card */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-white/20">
                <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                  <div className="flex items-center space-x-2 sm:space-x-4 p-3 sm:p-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-xl sm:rounded-2xl border border-red-300/30">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                      <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm sm:text-base">{t('home.hero.emergency_feature')}</h3>
                      <p className="text-red-100 text-xs sm:text-sm">Instant help when you need it most</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 sm:space-x-4 p-3 sm:p-4 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-xl sm:rounded-2xl border border-blue-300/30">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm sm:text-base">{t('home.hero.safe_zones_feature')}</h3>
                      <p className="text-blue-100 text-xs sm:text-sm">450+ verified safe locations</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 sm:space-x-4 p-3 sm:p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl sm:rounded-2xl border border-green-300/30">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <Users className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm sm:text-base">{t('home.hero.community_feature')}</h3>
                      <p className="text-green-100 text-xs sm:text-sm">Supportive community of women</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Trust Badges */}
              <div className="absolute -top-3 -right-3 sm:-top-6 sm:-right-6 bg-white rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-xl">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Award className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-500" />
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-gray-900">97.8%</p>
                    <p className="text-xs text-gray-600 hidden sm:block">Success Rate</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-3 -left-3 sm:-bottom-6 sm:-left-6 bg-white rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-xl">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Clock className="h-4 w-4 sm:h-6 sm:w-6 text-blue-500" />
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-gray-900">3.2 min</p>
                    <p className="text-xs text-gray-600 hidden sm:block">Response Time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-gray-50 to-purple-50">
        <div className="absolute inset-0 opacity-5">
          <img
            src="https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Community"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Comprehensive Safety Platform</h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">Everything you need to stay safe and connected in one platform</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {keyFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="text-center group">
                  <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                    <div className={`h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 ${feature.color}`} />
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                      {feature.label}
                    </div>
                    <div className="text-gray-600 text-xs sm:text-sm">
                      {feature.description}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center space-x-1 sm:space-x-2 bg-purple-100 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6">
              <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
              <span className="text-xs sm:text-sm font-medium text-purple-800">Comprehensive Safety Features</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t('home.features.title')}
              </span>
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              {t('home.features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="group relative bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] overflow-hidden border border-gray-100">
                  {/* Background Image */}
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <img
                      src={feature.image}
                      alt={t(feature.titleKey)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="relative p-4 sm:p-6 lg:p-8">
                    <div className={`h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 bg-gradient-to-br ${feature.bg} to-white rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 ${feature.color}`} />
                    </div>
                    <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                      {t(feature.titleKey)}
                    </h4>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {t(feature.descriptionKey)}
                    </p>
                    
                    {/* Hover Effect Arrow */}
                    <div className="mt-4 sm:mt-6 flex items-center text-purple-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                      <span className="font-medium mr-2 text-sm sm:text-base">Learn more</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-teal-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a855f7' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center space-x-1 sm:space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6 shadow-lg">
              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
              <span className="text-xs sm:text-sm font-medium text-gray-800">Real Stories, Real Impact</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              {t('home.testimonials.title')}
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">
              {t('home.testimonials.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-white/50">
                {/* Profile Image */}
                <div className="relative mb-4 sm:mb-6">
                  <img
                    src={testimonial.image}
                    alt={t(testimonial.nameKey)}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover mx-auto shadow-lg ring-4 ring-white"
                  />
                  <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 h-6 w-6 sm:h-8 sm:w-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex justify-center mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-gray-700 mb-4 sm:mb-6 italic leading-relaxed text-center text-sm sm:text-base">
                  "{t(testimonial.textKey)}"
                </p>

                <div className="text-center">
                  <p className="font-bold text-gray-900 text-base sm:text-lg">{t(testimonial.nameKey)}</p>
                  <p className="text-xs sm:text-sm text-purple-600 font-medium">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section id="emergency" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-r from-red-600 to-pink-600 text-white relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/6975474/pexels-photo-6975474.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Emergency Response"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-pink-600/90"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="h-16 w-16 sm:h-20 sm:w-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-2xl">
              <AlertTriangle className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6">
              {t('home.emergency.title')}
            </h3>
            <p className="text-lg sm:text-xl lg:text-2xl text-red-100 mb-8 sm:mb-12">
              {t('home.emergency.subtitle')}
            </p>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-white/20">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                <div className="text-center group">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 bg-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <span className="text-red-600 font-bold text-lg sm:text-xl lg:text-2xl">119</span>
                  </div>
                  <h4 className="font-bold text-base sm:text-lg lg:text-xl mb-2">{t('home.emergency.police')}</h4>
                  <p className="text-red-100 text-sm sm:text-base">Immediate police assistance</p>
                </div>
                <div className="text-center group">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 bg-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <span className="text-red-600 font-bold text-base sm:text-lg">1938</span>
                  </div>
                  <h4 className="font-bold text-base sm:text-lg lg:text-xl mb-2">{t('home.emergency.women_child')}</h4>
                  <p className="text-red-100 text-sm sm:text-base">Specialized women's support</p>
                </div>
                <div className="text-center group">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 bg-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <span className="text-red-600 font-bold text-base sm:text-lg">1990</span>
                  </div>
                  <h4 className="font-bold text-base sm:text-lg lg:text-xl mb-2">{t('home.emergency.ambulance')}</h4>
                  <p className="text-red-100 text-sm sm:text-base">Medical emergency response</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Education Preview */}
      <section id="safety-tips" className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center space-x-1 sm:space-x-2 bg-green-100 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                <span className="text-xs sm:text-sm font-medium text-green-800">Safety Education</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Learn, Practice, <span className="text-green-600">Stay Safe</span>
              </h3>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Access expert-curated safety courses, self-defense tutorials, and digital safety guides 
                designed specifically for Sri Lankan women.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">Self-defense techniques adapted for local situations</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">Public transport safety for CTB buses and trains</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">Digital privacy and cyber harassment protection</span>
                </div>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Self Defense Training"
                  className="w-full h-48 sm:h-64 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4">
                    <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">Essential Self-Defense</h4>
                    <p className="text-xs sm:text-sm text-gray-600">18 min • Beginner Friendly • 4.9★</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Course Cards */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-white rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-xl transform rotate-3">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="h-6 w-6 sm:h-8 sm:w-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-xs sm:text-sm font-bold text-gray-900">Digital Safety</p>
                    <p className="text-xs text-gray-600">22 min course</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 bg-white rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-xl transform -rotate-3">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="h-6 w-6 sm:h-8 sm:w-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Users className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-xs sm:text-sm font-bold text-gray-900">Community Support</p>
                    <p className="text-xs text-gray-600">24/7 available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-purple-100 to-pink-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/3768894/pexels-photo-3768894.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Community Support"
                  className="w-full h-48 sm:h-64 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
                <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4">
                    <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">Active Community Discussion</h4>
                    <p className="text-xs sm:text-sm text-gray-600">8,500+ members • 24/7 support • Safe space</p>
                  </div>
                </div>
              </div>

              {/* Community Stats Floating Cards */}
              <div className="absolute -top-3 -left-3 sm:-top-6 sm:-left-6 bg-white rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-xl">
                <div className="text-center">
                  <p className="text-lg sm:text-2xl font-bold text-purple-600">8.5K+</p>
                  <p className="text-xs text-gray-600 hidden sm:block">Active Members</p>
                </div>
              </div>

              <div className="absolute -bottom-3 -right-3 sm:-bottom-6 sm:-right-6 bg-white rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-xl">
                <div className="text-center">
                  <p className="text-lg sm:text-2xl font-bold text-green-600">98.2%</p>
                  <p className="text-xs text-gray-600 hidden sm:block">Positive Sentiment</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center space-x-1 sm:space-x-2 bg-purple-200 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-purple-700" />
                <span className="text-xs sm:text-sm font-medium text-purple-800">Supportive Community</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                You're Never <span className="text-purple-600">Alone</span>
              </h3>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Connect with thousands of Sri Lankan women who understand your experiences. 
                Share stories, get advice, and build lasting friendships in our safe, moderated community.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="h-6 w-6 sm:h-8 sm:w-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Eye className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">Anonymous posting options for sensitive topics</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="h-6 w-6 sm:h-8 sm:w-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">24/7 moderated environment for your safety</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="h-6 w-6 sm:h-8 sm:w-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">Supportive community of verified members</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="about" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <img
              src="https://images.pexels.com/photos/5699479/pexels-photo-5699479.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Empowered Women"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-20 h-20 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-24 h-24 sm:w-40 sm:h-40 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              {t('home.cta.title')}
            </h3>
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-purple-100 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
              {t('home.cta.subtitle')}
            </p>
            <button
              onClick={onShowRegister}
              className="bg-white text-purple-600 hover:bg-gray-50 py-4 sm:py-6 px-8 sm:px-12 rounded-full font-bold text-lg sm:text-xl transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-white/25 inline-flex items-center space-x-2 sm:space-x-3 min-h-[48px]"
            >
              <span>{t('home.cta.join_now')}</span>
              <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-8 text-purple-200">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-sm sm:text-base">100% Free</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-sm sm:text-base">Secure & Private</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-sm sm:text-base">8,500+ Members</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                  <Shield className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-white" />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold">{t('app.title')}</h4>
              </div>
              <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md">
                {t('home.footer.description')}
              </p>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <span className="text-gray-400 text-sm sm:text-base">{t('home.footer.languages')}</span>
              </div>
            </div>
            
            <div>
              <h5 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-white">{t('home.footer.quick_links')}</h5>
              <ul className="space-y-2 sm:space-y-3 text-gray-300">
                <li><a href="#about" className="hover:text-white transition-colors hover:underline text-sm sm:text-base">{t('home.footer.about')}</a></li>
                <li><a href="#safety-tips" className="hover:text-white transition-colors hover:underline text-sm sm:text-base">{t('home.footer.safety_tips')}</a></li>
                <li><a href="#features" className="hover:text-white transition-colors hover:underline text-sm sm:text-base">{t('home.footer.resources')}</a></li>
                <li>
                  <button
                    onClick={() => window.open('mailto:support@safeher.lk?subject=General Inquiry', '_blank')}
                    className="hover:text-white transition-colors hover:underline text-sm sm:text-base text-left"
                  >
                    {t('home.footer.contact')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => window.open('mailto:support@safeher.lk?subject=Special Role Access Request&body=Please provide:%0A- Full Name:%0A- Role Requested (Law Enforcement/Moderator):%0A- Organization/Department:%0A- Badge Number (if law enforcement):%0A- Reason for access:%0A- Contact phone number:', '_blank')}
                    className="hover:text-white transition-colors hover:underline text-sm sm:text-base text-left"
                  >
                    Special Access Request
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-red-400">{t('home.footer.emergency')}</h5>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-red-900/30 rounded-lg">
                  <div className="h-6 w-6 sm:h-8 sm:w-8 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs sm:text-xs">119</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-medium text-sm sm:text-base">{t('home.footer.police')}</p>
                    <p className="text-red-200 text-xs sm:text-sm">Emergency Response</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-red-900/30 rounded-lg">
                  <div className="h-6 w-6 sm:h-8 sm:w-8 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs sm:text-xs">1938</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-medium text-sm sm:text-base">{t('home.footer.women_child')}</p>
                    <p className="text-red-200 text-xs sm:text-sm">Women's Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
            <p className="text-gray-400 text-sm sm:text-base">&copy; 2025 {t('app.title')}. {t('home.footer.rights')}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}