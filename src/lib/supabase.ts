import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient("https://mgqbzfthbabhwjjskmnu.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ncWJ6ZnRoYmFiaHdqanNrbW51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1Nzg5MjYsImV4cCI6MjA3MjE1NDkyNn0.LZ4hzH6yU-2s-uwy3atMF4zW2i4gxolFmOJ9rVrOsKo")
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          role: 'user' | 'law_enforcement' | 'moderator'
          language_preference: 'en' | 'si' | 'ta'
          phone?: string
          address?: string
          date_of_birth?: string
          emergency_contact_name?: string
          emergency_contact_phone?: string
          notification_preferences?: {
            email_alerts: boolean
            sms_alerts: boolean
            community_updates: boolean
            safety_tips: boolean
          }
          privacy_settings?: {
            profile_visibility: 'public' | 'community' | 'private'
            location_sharing: boolean
            activity_visibility: boolean
          }
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          role?: 'user' | 'law_enforcement' | 'moderator'
          language_preference?: 'en' | 'si' | 'ta'
          phone?: string
          address?: string
          date_of_birth?: string
          emergency_contact_name?: string
          emergency_contact_phone?: string
          notification_preferences?: {
            email_alerts: boolean
            sms_alerts: boolean
            community_updates: boolean
            safety_tips: boolean
          }
          privacy_settings?: {
            profile_visibility: 'public' | 'community' | 'private'
            location_sharing: boolean
            activity_visibility: boolean
          }
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: 'user' | 'law_enforcement' | 'moderator'
          language_preference?: 'en' | 'si' | 'ta'
          phone?: string
          address?: string
          date_of_birth?: string
          emergency_contact_name?: string
          emergency_contact_phone?: string
          notification_preferences?: {
            email_alerts: boolean
            sms_alerts: boolean
            community_updates: boolean
            safety_tips: boolean
          }
          privacy_settings?: {
            profile_visibility: 'public' | 'community' | 'private'
            location_sharing: boolean
            activity_visibility: boolean
          }
          created_at?: string
          updated_at?: string
        }
      }
      emergency_contacts: {
        Row: {
          id: string
          user_id: string
          name: string
          phone: string
          relationship: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          phone: string
          relationship: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          phone?: string
          relationship?: string
          created_at?: string
        }
      }
      incidents: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          location: string
          latitude?: number
          longitude?: number
          status: 'pending' | 'under_review' | 'resolved'
          is_anonymous: boolean
          reporter_id?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: string
          location: string
          latitude?: number
          longitude?: number
          status?: 'pending' | 'under_review' | 'resolved'
          is_anonymous?: boolean
          reporter_id?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: string
          location?: string
          latitude?: number
          longitude?: number
          status?: 'pending' | 'under_review' | 'resolved'
          is_anonymous?: boolean
          reporter_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      sos_alerts: {
        Row: {
          id: string
          user_id: string
          latitude: number
          longitude: number
          status: 'active' | 'resolved' | 'false_alarm'
          message?: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          latitude: number
          longitude: number
          status?: 'active' | 'resolved' | 'false_alarm'
          message?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          latitude?: number
          longitude?: number
          status?: 'active' | 'resolved' | 'false_alarm'
          message?: string
          created_at?: string
        }
      }
      forum_posts: {
        Row: {
          id: string
          title: string
          content: string
          category: string
          author_id: string
          is_anonymous: boolean
          likes_count: number
          replies_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          category: string
          author_id: string
          is_anonymous?: boolean
          likes_count?: number
          replies_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          category?: string
          author_id?: string
          is_anonymous?: boolean
          likes_count?: number
          replies_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      safe_zones: {
        Row: {
          id: string
          name: string
          address: string
          type: 'police_station' | 'hospital' | 'shelter' | 'community_center'
          latitude: number
          longitude: number
          phone?: string
          verified: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          address: string
          type: 'police_station' | 'hospital' | 'shelter' | 'community_center'
          latitude: number
          longitude: number
          phone?: string
          verified?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          address?: string
          type?: 'police_station' | 'hospital' | 'shelter' | 'community_center'
          latitude?: number
          longitude?: number
          phone?: string
          verified?: boolean
          created_at?: string
        }
      }
    }
  }
}
