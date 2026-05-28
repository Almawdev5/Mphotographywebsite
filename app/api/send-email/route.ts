import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)
const adminEmail = process.env.ADMIN_EMAIL || 'mengistuyeshanbel@gmail.com'
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type } = body

    if (type === 'contact') {
      const { name, email, subject, message } = body

      // Send notification to admin
      await resend.emails.send({
        from: 'Photo Mengie <onboarding@resend.dev>',
        to: adminEmail,
        subject: `New Contact Message: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111111; color: #F5F5F5; padding: 40px; border-radius: 8px;">
            <h1 style="color: #D4AF37; font-size: 24px; margin-bottom: 24px;">New Contact Message</h1>
            <div style="background: #2B2B2B; padding: 24px; border-radius: 8px; margin-bottom: 16px;">
              <p style="margin: 0 0 12px;"><strong style="color: #D4AF37;">Name:</strong> ${name}</p>
              <p style="margin: 0 0 12px;"><strong style="color: #D4AF37;">Email:</strong> ${email}</p>
              <p style="margin: 0 0 12px;"><strong style="color: #D4AF37;">Subject:</strong> ${subject}</p>
              <p style="margin: 0;"><strong style="color: #D4AF37;">Message:</strong><br/>${message}</p>
            </div>
            <p style="color: #888; font-size: 12px;">Sent from Photo Mengie website contact form</p>
          </div>
        `,
      })

      // Send confirmation to client
      await resend.emails.send({
        from: 'Photo Mengie <onboarding@resend.dev>',
        to: email,
        subject: 'We received your message — Photo Mengie',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111111; color: #F5F5F5; padding: 40px; border-radius: 8px;">
            <h1 style="color: #D4AF37; font-size: 24px; margin-bottom: 8px;">Thank You, ${name}!</h1>
            <p style="color: #F5F5F5; opacity: 0.8; margin-bottom: 24px;">We have received your message and will get back to you within 24 hours.</p>
            <div style="background: #2B2B2B; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
              <p style="margin: 0 0 8px;"><strong style="color: #D4AF37;">Your message:</strong></p>
              <p style="margin: 0; opacity: 0.8;">${message}</p>
            </div>
            <div style="border-top: 1px solid #D4AF37; padding-top: 24px; margin-top: 24px;">
              <p style="color: #D4AF37; font-size: 18px; font-weight: bold; margin: 0 0 8px;">Photo Mengie</p>
              <p style="color: #888; font-size: 13px; margin: 0;">Capturing Moments. Crafting Stories.</p>
              <p style="color: #888; font-size: 13px; margin: 8px 0 0;">📍 Addis Ababa, Ethiopia</p>
            </div>
          </div>
        `,
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })

  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}