'use client'

import { Phone, Mail, MapPin, MessageCircle, Send, MessageSquare } from 'lucide-react'
import { useState } from 'react'
import { Navbar } from '@/components/ui/Navbar'
import { Footer } from '@/components/ui/Footer'

const contactInfo = [
  { icon: MapPin, label: 'Location', value: 'Addis Ababa, Ethiopia', href: null },
  { icon: Phone, label: 'Phone', value: '+251 XXX XXX XXX', href: 'tel:+251XXXXXXXXX' },
  { icon: Mail, label: 'Email', value: 'almawtadele0@gmail.com', href: 'mailto:almawtadele0@gmail.com' },
  { icon: MessageCircle, label: 'WhatsApp', value: '+251 XXX XXX XXX', href: 'https://wa.me/251XXXXXXXXX' },
  { icon: Send, label: 'Telegram', value: '@photomengie', href: 'https://t.me/photomengie' },
  { icon: MessageSquare, label: 'Facebook', value: 'Photo Mengie', href: 'https://facebook.com/photomengie' },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact', ...formData }),
      })
      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>

        <section style={{ padding: '160px 24px 80px', textAlign: 'center', borderBottom: '1px solid var(--border-secondary)' }}>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '16px' }}>
            Get In Touch
          </p>
          <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: '800', color: 'var(--text)', marginBottom: '16px' }}>
            Contact <span style={{ color: '#D4AF37' }}>Us</span>
          </h1>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 24px', lineHeight: '1.8' }}>
            Have a question or ready to book? We would love to hear from you.
          </p>
          <div style={{ width: '60px', height: '2px', backgroundColor: '#D4AF37', margin: '0 auto' }} />
        </section>

        <section style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px' }}>

            <div>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '24px', fontWeight: '700', color: '#F5F5F5', marginBottom: '32px' }}>
                Contact Information
              </h2>
              {contactInfo.map((item) => {
                const Icon = item.icon
                const card = (
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px', padding: '20px', backgroundColor: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <div style={{ width: '44px', height: '44px', backgroundColor: 'rgba(212,175,55,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={20} color="#D4AF37" />
                    </div>
                    <div>
                      <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: '700', color: '#D4AF37', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>
                        {item.label}
                      </p>
                      <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '15px', color: 'var(--text)', opacity: 0.8 }}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                )
                return item.href ? (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                    {card}
                  </a>
                ) : (
                  <div key={item.label}>{card}</div>
                )
              })}
            </div>

            <div>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '24px', fontWeight: '700', color: '#F5F5F5', marginBottom: '32px' }}>
                Send a Message
              </h2>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                <div>
                  <label style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#D4AF37', display: 'block', marginBottom: '8px' }}>Full Name *</label>
                  <input type="text" required placeholder="Your full name" value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '14px 16px', backgroundColor: '#2B2B2B', border: '1px solid #444444', borderRadius: '6px', color: '#F5F5F5', fontFamily: 'Poppins, sans-serif', fontSize: '14px', outline: 'none' }} />
                </div>

                <div>
                  <label style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#D4AF37', display: 'block', marginBottom: '8px' }}>Email Address *</label>
                  <input type="email" required placeholder="your@email.com" value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '14px 16px', backgroundColor: '#2B2B2B', border: '1px solid #444444', borderRadius: '6px', color: '#F5F5F5', fontFamily: 'Poppins, sans-serif', fontSize: '14px', outline: 'none' }} />
                </div>

                <div>
                  <label style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#D4AF37', display: 'block', marginBottom: '8px' }}>Subject *</label>
                  <input type="text" required placeholder="How can we help?" value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    style={{ width: '100%', padding: '14px 16px', backgroundColor: '#2B2B2B', border: '1px solid #444444', borderRadius: '6px', color: '#F5F5F5', fontFamily: 'Poppins, sans-serif', fontSize: '14px', outline: 'none' }} />
                </div>

                <div>
                  <label style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#D4AF37', display: 'block', marginBottom: '8px' }}>Message *</label>
                  <textarea required placeholder="Tell us about your project..." rows={6} value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: '100%', padding: '14px 16px', backgroundColor: '#2B2B2B', border: '1px solid #444444', borderRadius: '6px', color: '#F5F5F5', fontFamily: 'Poppins, sans-serif', fontSize: '14px', outline: 'none', resize: 'vertical' }} />
                </div>

                {status === 'success' && (
                  <div style={{ padding: '16px', backgroundColor: 'rgba(62,207,178,0.1)', border: '1px solid #3ecfb2', borderRadius: '6px', color: '#3ecfb2', fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}>
                    Message sent successfully! We will get back to you soon.
                  </div>
                )}

                {status === 'error' && (
                  <div style={{ padding: '16px', backgroundColor: 'rgba(224,111,168,0.1)', border: '1px solid #e06fa8', borderRadius: '6px', color: '#e06fa8', fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}>
                    Something went wrong. Please try again or contact us directly.
                  </div>
                )}

                <button type="submit" disabled={status === 'loading'}
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: '15px', fontWeight: '700', color: '#111111', backgroundColor: '#D4AF37', padding: '16px 40px', borderRadius: '4px', border: 'none', cursor: 'pointer', width: '100%' }}>
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>

              </form>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}