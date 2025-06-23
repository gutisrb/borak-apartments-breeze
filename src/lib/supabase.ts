
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Unit {
  id: string
  name: string
  max_guests: number
  ical_url?: string
  description?: string
  price_per_night?: number
  size_m2?: number
  images?: string[]
  amenities?: string[]
}

export interface Booking {
  id: string
  unit_id: string
  start_date: string
  end_date: string
  source: string
  status: 'pending' | 'confirmed' | 'cancelled'
  guest_name?: string
  guest_email?: string
  guest_phone?: string
  adults?: number
  children?: number
}
