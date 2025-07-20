import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xhpawpkrjreiunyieztn.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhocGF3cGtyanJlaXVueWllenRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5NTUxMDEsImV4cCI6MjA2ODUzMTEwMX0.iS3yowsuAKhpDAbsj_4NkZ7X9Nm39RC8-Ci0vPbuzok'

// Debug: Log environment variables (remove in production)
console.log('Environment check:', {
  url: supabaseUrl ? 'Found' : 'Missing',
  key: supabaseAnonKey ? 'Found' : 'Missing',
  allEnv: import.meta.env
})

// Temporarily comment out the error check to debug
// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error('Missing Supabase environment variables')
// }

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions for common operations
export const auth = {
  signUp: async (email: string, password: string) => {
    return await supabase.auth.signUp({
      email,
      password,
    })
  },
  
  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    })
  },
  
  signOut: async () => {
    return await supabase.auth.signOut()
  },
  
  getCurrentUser: async () => {
    return await supabase.auth.getUser()
  },
  
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Database operations
export const db = {
  // User profiles
  getUserProfile: async (userId: string) => {
    return await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
  },
  
  updateUserProfile: async (userId: string, updates: any) => {
    return await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
  },
  
  // Events
  getEvents: async () => {
    return await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true })
  },
  
  createEvent: async (eventData: any) => {
    return await supabase
      .from('events')
      .insert(eventData)
  },
  
  // Favorites
  getUserFavorites: async (userId: string) => {
    return await supabase
      .from('user_favorites')
      .select('*')
      .eq('user_id', userId)
  },
  
  addToFavorites: async (userId: string, eventId: number) => {
    return await supabase
      .from('user_favorites')
      .insert({ user_id: userId, event_id: eventId })
  },
  
  removeFromFavorites: async (userId: string, eventId: number) => {
    return await supabase
      .from('user_favorites')
      .delete()
      .eq('user_id', userId)
      .eq('event_id', eventId)
  }
}

// Types for our database
export interface Profile {
  id: string
  first_name: string
  last_name: string
  email: string
  bio?: string
  current_role?: string
  experience_level?: string
  profile_picture?: string
  interests?: string[]
  location?: string
  website?: string
  github?: string
  linkedin?: string
  created_at: string
  updated_at: string
}

export interface Skill {
  id: string
  profile_id: string
  name: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  progress: number
  created_at: string
}

export interface RoadmapProgress {
  id: string
  profile_id: string
  roadmap_id: string
  roadmap_name: string
  completed_steps: string[]
  current_step?: string
  progress: number
  started_at: string
  last_updated: string
}

export interface AssessmentResult {
  id: string
  profile_id: string
  assessment_id: string
  assessment_name: string
  score: number
  max_score: number
  completed_at: string
} 