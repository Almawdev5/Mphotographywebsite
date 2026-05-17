'use server'

import { createClient } from '@/lib/supabase/server'

export async function bookAppointment(formData: {
  clientName: string
  email: string
  phone: string
  serviceType: string
  preferredDate: string
  preferredTime: string
  location: string
  notes: string
}) {
  try {
    const supabase = await createClient()

    const { error } = await supabase
      .from('appointments')
      .insert({
        client_name: formData.clientName,
        email: formData.email,
        phone: formData.phone,
        service_type: formData.serviceType,
        preferred_date: formData.preferredDate,
        preferred_time: formData.preferredTime,
        location: formData.location || null,
        notes: formData.notes || null,
        status: 'pending',
      })

    if (error) {
      console.error('Supabase error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }

  } catch (error) {
    console.error('Server action error:', error)
    return { success: false, error: 'Something went wrong' }
  }
}