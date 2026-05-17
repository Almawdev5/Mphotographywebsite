import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import { bookAppointment } from '@/app/actions/appointments'

const resend = new Resend(process.env.RESEND_API_KEY)
const adminEmail = process.env.ADMIN_EMAIL || 'almawtadele0@gmail.com'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { clientName, email, phone, serviceType, preferredDate, preferredTime, location, notes } = body

    const result = await bookAppointment({
      clientName, email, phone, serviceType,
      preferredDate, preferredTime, location, notes,
    })

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    await resend.emails.send({
      from: 'Photo Mengie <onboarding@resend.dev>',
      to: adminEmail,
      subject: `New Booking: ${serviceType} — ${clientName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111111; color: #F5F5F5; padding: 40px; border-radius: 8px;">
          <h1 style="color: #D4AF37; font-size: 24px; margin-bottom: 8px;">New Booking Request</h1>
          <div style="background: #2B2B2B; padding: 24px; border-radius: 8px; margin-bottom: 16px;">
            <p style="margin: 0 0 12px;"><strong style="color: #D4AF37;">Client:</strong> ${clientName}</p>
            <p style="margin: 0 0 12px;"><strong style="color: #D4AF37;">Email:</strong> ${email}</p>
            <p style="margin: 0 0 12px;"><strong style="color: #D4AF37;">Phone:</strong> ${phone}</p>
            <p style="margin: 0 0 12px;"><strong style="color: #D4AF37;">Service:</strong> ${serviceType}</p>
            <p style="margin: 0 0 12px;"><strong style="color: #D4AF37;">Date:</strong> ${preferredDate}</p>
            <p style="margin: 0 0 12px;"><strong style="color: #D4AF37;">Time:</strong> ${preferredTime}</p>
            <p style="margin: 0 0 12px;"><strong style="color: #D4AF37;">Location:</strong> ${location || 'Not specified'}</p>
            <p style="margin: 0;"><strong style="color: #D4AF37;">Notes:</strong> ${notes || 'None'}</p>
          </div>
        </div>
      `,
    })

    await resend.emails.send({
      from: 'Photo Mengie <onboarding@resend.dev>',
      to: email,
      subject: 'Booking Request Received — Photo Mengie',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111111; color: #F5F5F5; padding: 40px; border-radius: 8px;">
          <h1 style="color: #D4AF37; font-size: 24px; margin-bottom: 8px;">Booking Request Received!</h1>
          <p style="opacity: 0.8; margin-bottom: 24px;">Dear ${clientName}, we have received your booking and will confirm within 24 hours.</p>
          <div style="background: #2B2B2B; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
            <p style="margin: 0 0 10px;"><strong style="color: #D4AF37;">Service:</strong> ${serviceType}</p>
            <p style="margin: 0 0 10px;"><strong style="color: #D4AF37;">Date:</strong> ${preferredDate}</p>
            <p style="margin: 0 0 10px;"><strong style="color: #D4AF37;">Time:</strong> ${preferredTime}</p>
            <p style="margin: 0;"><strong style="color: #D4AF37;">Location:</strong> ${location || 'To be confirmed'}</p>
          </div>
          <div style="background: #D4AF37; padding: 16px 24px; border-radius: 8px;">
            <p style="color: #111111; font-weight: bold; margin: 0;">We will contact you within 24 hours to confirm your booking.</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json({ error: 'Failed to process booking' }, { status: 500 })
  }
}