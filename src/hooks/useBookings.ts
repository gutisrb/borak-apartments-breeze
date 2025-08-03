
import { useState, useEffect, useCallback } from 'react'
import { supabase, Booking } from '@/lib/supabase'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

// Extend dayjs with isBetween plugin
dayjs.extend(isBetween)

export const useRealtimeBookings = (propertyId?: string) => {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true)
        let query = supabase
          .from('bookings')
          .select('*')
          .not('end_date', 'is', null)
          .not('start_date', 'is', null)

        if (propertyId) {
          query = query.eq('property_id', propertyId)
        }

        const { data, error } = await query

        if (error) throw error
        setBookings(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching bookings:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()

    // Set up real-time subscription
    const subscription = supabase
      .channel('bookings')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'bookings',
          filter: propertyId ? `property_id=eq.${propertyId}` : undefined
        }, 
        () => {
          fetchBookings()
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [propertyId])

  const isDateAvailable = useCallback((date: Date, propertyId: string) => {
    const targetDate = dayjs(date).format('YYYY-MM-DD')
    
    return !bookings.some(booking => {
      if (booking.property_id !== propertyId) return false
      
      const startDate = dayjs(booking.start_date).format('YYYY-MM-DD')
      const endDate = dayjs(booking.end_date).format('YYYY-MM-DD')
      
      return dayjs(targetDate).isBetween(startDate, endDate, 'day', '[]')
    })
  }, [bookings])

  return {
    data: bookings,
    loading,
    error,
    isDateAvailable
  }
}

// TODO: Replace with Supabase RPC
export const reserveApartment = async (formData: any) => {
  console.log('Booking request:', formData)
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // TODO: Call Supabase RPC function
  // const { data, error } = await supabase.rpc('create_booking_request', formData)
  
  return { success: true, message: 'Booking request submitted successfully!' }
}
