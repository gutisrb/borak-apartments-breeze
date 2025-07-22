
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yhgetcacoxmocydoyeab.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloZ2V0Y2Fjb3htb2N5ZG95ZWFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MjQ0NTEsImV4cCI6MjA2MzQwMDQ1MX0.V6kvYVFm0hNn32zPl17W4dalIi5mAp0A0P7P2tSr55o'

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
  location?: string
  featured?: boolean
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
