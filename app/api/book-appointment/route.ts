import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)
const adminEmail = process.env.ADMIN_EMAIL || 'almawtadele0@gmail.com'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { clientName, email, phone, serviceType, preferredDate, preferredTime, location, notes } = body

    // Send notification to admin
    await resend.emails.send({
      from: 'Photo Mengie <onboarding@resend.dev>',
      to: adminEmail,
      subject: `New Booking Request: ${serviceType} — ${clientName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111111; color: #F5F5F5; padding: 40px; border-radius: 8px;">
          <h1 style="color: #D4AF37; font-size: 24px; margin-bottom: 8px;">New Booking Request</h1>
          <p style="color: #888; margin-bottom: 24px;">A new booking request has been submitted.</p>
          <div style="background: #2B2B2B; padding: 24px; border-radius: 8px; margin-bottom: 16px;">
            <p style="margin: 0 0 12px;"><strong style="color: #D4AF37;">Client Name:</strong> ${clientName}</p>
            <p style="margin: 0 0 12px;"><strong style="color: #D4AF37;">Email:</strong> ${email}</p>
            <p style="margin: 0 0 12px;"><strong style="color: #D4AF37;">Phone:</strong> ${phone}</p>
            <p style="margin: 0 0 12px;"><strong style="color: #D4AF37;">Service:</strong> ${serviceType}</p>
            <p style="margin: 0 0 12px;"><strong style="color: #D4AF37;">Date:</strong> ${preferredDate}</p>
            <p style="margin: 0 0 12px;"><strong style="color: #D4AF37;">Time:</strong> ${preferredTime}</p>
            <p style="margin: 0 0 12px;"><strong style="color: #D4AF37;">Location:</strong> ${location || 'Not specified'}</p>
            <p style="margin: 0;"><strong style="color: #D4AF37;">Notes:</strong> ${notes || 'None'}</p>
          </div>
          <p style="color: #888; font-size: 12px;">Sent from Photo Mengie booking form</p>
        </div>
      `,
    })

    // Send confirmation to client
    await resend.emails.send({
      from: 'Photo Mengie <onboarding@resend.dev>',
      to: email,
      subject: 'Booking Request Received — Photo Mengie',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111111; color: #F5F5F5; padding: 40px; border-radius: 8px;">
          <h1 style="color: #D4AF37; font-size: 24px; margin-bottom: 8px;">Booking Request Received!</h1>
          <p style="color: #F5F5F5; opacity: 0.8; margin-bottom: 24px;">Dear ${clientName}, we have received your booking request and will confirm within 24 hours.</p>
          <div style="background: #2B2B2B; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
            <h2 style="color: #D4AF37; font-size: 16px; margin: 0 0 16px;">Booking Details</h2>
            <p style="margin: 0 0 10px;"><strong style="color: #D4AF37;">Service:</strong> ${serviceType}</p>
            <p style="margin: 0 0 10px;"><strong style="color: #D4AF37;">Date:</strong> ${preferredDate}</p>
            <p style="margin: 0 0 10px;"><strong style="color: #D4AF37;">Time:</strong> ${preferredTime}</p>
            <p style="margin: 0;"><strong style="color: #D4AF37;">Location:</strong> ${location || 'To be confirmed'}</p>
          </div>
          <div style="background: #D4AF37; padding: 16px 24px; border-radius: 8px; margin-bottom: 24px;">
            <p style="color: #111111; font-weight: bold; margin: 0; font-size: 15px;">We will contact you within 24 hours to confirm your booking.</p>
          </div>
          <div style="border-top: 1px solid #D4AF37; padding-top: 24px;">
            <p style="color: #D4AF37; font-size: 18px; font-weight: bold; margin: 0 0 8px;">Photo Mengie</p>
            <p style="color: #888; font-size: 13px; margin: 0;">Capturing Moments. Crafting Stories.</p>
            <p style="color: #888; font-size: 13px; margin: 8px 0 0;">📍 Addis Ababa, Ethiopia</p>
            <p style="color: #888; font-size: 13px; margin: 4px 0 0;">✉️ almawtadele0@gmail.com</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Booking email error:', error)
    return NextResponse.json({ error: 'Failed to send booking confirmation' }, { status: 500 })
  }
}