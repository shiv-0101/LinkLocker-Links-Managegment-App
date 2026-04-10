import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''
export const isDemoMode = import.meta.env.VITE_DEMO_MODE !== 'false'

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey)

export function createSupabaseClient(options = {}) {
  if (isDemoMode || !hasSupabaseConfig) {
    return null
  }

  return createClient(supabaseUrl, supabaseAnonKey, options)
}
