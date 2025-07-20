import { supabase, Profile, Skill, RoadmapProgress, AssessmentResult } from '@/lib/supabase'

// Authentication functions
export const authAPI = {
  // Sign up with Supabase Auth
  signup: async (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
  }) => {
    try {
      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      })

      if (authError) throw authError

      if (authData.user) {
        // Create profile in profiles table
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              first_name: userData.firstName,
              last_name: userData.lastName,
              email: userData.email,
            }
          ])
          .select()
          .single()

        if (profileError) throw profileError

        return {
          success: true,
          user: profileData,
          session: authData.session
        }
      }

      return { success: false, message: 'Signup failed' }
    } catch (error: any) {
      console.error('Signup error:', error)
      return { 
        success: false, 
        message: error.message || 'Signup failed' 
      }
    }
  },

  // Login with Supabase Auth
  login: async (credentials: { email: string; password: string }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      })

      if (error) throw error

      if (data.user) {
        // Get user profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single()

        if (profileError) throw profileError

        return {
          success: true,
          user: profile,
          session: data.session
        }
      }

      return { success: false, message: 'Login failed' }
    } catch (error: any) {
      console.error('Login error:', error)
      return { 
        success: false, 
        message: error.message || 'Login failed' 
      }
    }
  },

  // Logout
  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { success: true, message: 'Logged out successfully' }
    } catch (error: any) {
      console.error('Logout error:', error)
      return { 
        success: false, 
        message: error.message || 'Logout failed' 
      }
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user) {
        return { success: false, user: null }
      }

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileError) throw profileError

      return { success: true, user: profile }
    } catch (error: any) {
      console.error('Get current user error:', error)
      return { success: false, user: null }
    }
  },

  // Forgot password
  forgotPassword: async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email)
      if (error) throw error
      return { success: true, message: 'Password reset email sent' }
    } catch (error: any) {
      console.error('Forgot password error:', error)
      return { 
        success: false, 
        message: error.message || 'Failed to send reset email' 
      }
    }
  },

  // Reset password
  resetPassword: async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })
      if (error) throw error
      return { success: true, message: 'Password updated successfully' }
    } catch (error: any) {
      console.error('Reset password error:', error)
      return { 
        success: false, 
        message: error.message || 'Password reset failed' 
      }
    }
  }
}

// User profile functions
export const userAPI = {
  // Get user profile
  getProfile: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      return { success: true, user: data }
    } catch (error: any) {
      console.error('Get profile error:', error)
      return { success: false, message: error.message }
    }
  },

  // Update user profile
  updateProfile: async (userId: string, updates: Partial<Profile>) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single()

      if (error) throw error
      return { success: true, user: data }
    } catch (error: any) {
      console.error('Update profile error:', error)
      return { success: false, message: error.message }
    }
  },

  // Get user skills
  getSkills: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('profile_id', userId)

      if (error) throw error
      return { success: true, skills: data }
    } catch (error: any) {
      console.error('Get skills error:', error)
      return { success: false, message: error.message }
    }
  },

  // Update user skills
  updateSkills: async (userId: string, skills: Omit<Skill, 'id' | 'profile_id' | 'created_at'>[]) => {
    try {
      // Delete existing skills
      await supabase
        .from('skills')
        .delete()
        .eq('profile_id', userId)

      // Insert new skills
      const skillsWithProfileId = skills.map(skill => ({
        ...skill,
        profile_id: userId
      }))

      const { data, error } = await supabase
        .from('skills')
        .insert(skillsWithProfileId)
        .select()

      if (error) throw error
      return { success: true, skills: data }
    } catch (error: any) {
      console.error('Update skills error:', error)
      return { success: false, message: error.message }
    }
  },

  // Get roadmap progress
  getRoadmapProgress: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('roadmap_progress')
        .select('*')
        .eq('profile_id', userId)

      if (error) throw error
      return { success: true, roadmapProgress: data }
    } catch (error: any) {
      console.error('Get roadmap progress error:', error)
      return { success: false, message: error.message }
    }
  },

  // Update roadmap progress
  updateRoadmapProgress: async (userId: string, progress: Omit<RoadmapProgress, 'id' | 'profile_id' | 'started_at' | 'last_updated'>) => {
    try {
      const { data, error } = await supabase
        .from('roadmap_progress')
        .upsert({
          ...progress,
          profile_id: userId,
          last_updated: new Date().toISOString()
        })
        .select()

      if (error) throw error
      return { success: true, roadmapProgress: data }
    } catch (error: any) {
      console.error('Update roadmap progress error:', error)
      return { success: false, message: error.message }
    }
  },

  // Save assessment result
  saveAssessmentResult: async (userId: string, result: Omit<AssessmentResult, 'id' | 'profile_id' | 'completed_at'>) => {
    try {
      const { data, error } = await supabase
        .from('assessment_results')
        .insert({
          ...result,
          profile_id: userId
        })
        .select()

      if (error) throw error
      return { success: true, assessmentResult: data }
    } catch (error: any) {
      console.error('Save assessment result error:', error)
      return { success: false, message: error.message }
    }
  }
}

// Utility functions
export const isAuthenticated = async (): Promise<boolean> => {
  const { data: { session } } = await supabase.auth.getSession()
  return !!session
}

export const getCurrentSession = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  return session
} 