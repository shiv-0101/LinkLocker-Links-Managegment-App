import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey)

export function createSupabaseClient(options = {}) {
  if (!hasSupabaseConfig) {
    return null
  }

  return createClient(supabaseUrl, supabaseAnonKey, options)
}
