'use client'

import { useState } from 'react'
import { Calendar, Clock, MapPin, Phone, Mail, User, FileText } from 'lucide-react'
import { Navbar } from '@/components/ui/Navbar'
import { Footer } from '@/components/ui/Footer'

const services = [
  'Wedding Photography', 'Portrait Photography', 'Normal Photography',
  '4x3 Photo Service', 'Graduation Photography', 'Event Coverage',
  'Product Photography', 'Photo Editing', 'Videography',
  'Drone Photography', 'Tech Support Services',
]

const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM',
]

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  backgroundColor: '#2B2B2B',
  border: '1px solid #444444',
  borderRadius: '6px',
  color: '#F5F5F5',
  fontFamily: 'Poppins, sans-serif',
  fontSize: '14px',
  outline: 'none',
}

const labelStyle = {
  fontFamily: 'Poppins, sans-serif',
  fontSize: '13px',
  color: '#D4AF37',
  display: 'block' as const,
  marginBottom: '8px',
}

export default function AppointmentsPage() {
  const [formData, setFormData] = useState({
    clientName: '', email: '', phone: '', serviceType: '',
    preferredDate: '', preferredTime: '', location: '', notes: '',
  })
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const response = await fetch('/api/book-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setStatus('success')
        setFormData({ clientName: '', email: '', phone: '', serviceType: '', preferredDate: '', preferredTime: '', location: '', notes: '' })
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
      <main style={{ backgroundColor: '#111111', minHeight: '100vh' }}>

        <section style={{ padding: '160px 24px 60px', textAlign: 'center', borderBottom: '1px solid #2B2B2B' }}>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '16px' }}>Let's Work Together</p>
          <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: '800', color: '#F5F5F5', marginBottom: '16px' }}>
            Book a <span style={{ color: '#D4AF37' }}>Session</span>
          </h1>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', color: '#F5F5F5', opacity: 0.6, maxWidth: '500px', margin: '0 auto 24px', lineHeight: '1.8' }}>
            Fill in the form below and we will confirm your booking within 24 hours.
          </p>
          <div style={{ width: '60px', height: '2px', backgroundColor: '#D4AF37', margin: '0 auto' }} />
        </section>

        <section style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px' }}>

            <div>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '24px', fontWeight: '700', color: '#F5F5F5', marginBottom: '32px' }}>Booking Information</h2>
              {[
                { step: '01', title: 'Fill the Form', desc: 'Provide your details and preferred date and time.' },
                { step: '02', title: 'We Confirm', desc: 'We review your request and confirm within 24 hours.' },
                { step: '03', title: 'Get Ready', desc: 'Prepare for your session and we handle the rest.' },
              ].map((item) => (
                <div key={item.step} style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
                  <div style={{ width: '48px', height: '48px', backgroundColor: '#D4AF37', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', fontWeight: '800', color: '#111111' }}>{item.step}</span>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '16px', fontWeight: '700', color: '#F5F5F5', marginBottom: '6px' }}>{item.title}</h3>
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#F5F5F5', opacity: 0.6, lineHeight: '1.6' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
              <div style={{ backgroundColor: '#2B2B2B', border: '1px solid #333333', borderRadius: '8px', padding: '24px' }}>
                <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '16px', fontWeight: '700', color: '#D4AF37', marginBottom: '16px' }}>Need Help?</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Phone size={16} color="#D4AF37" />
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#F5F5F5', opacity: 0.8 }}>+251 912 068 580</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Mail size={16} color="#D4AF37" />
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#F5F5F5', opacity: 0.8 }}>mengistuyeshanbel@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '24px', fontWeight: '700', color: '#F5F5F5', marginBottom: '32px' }}>Booking Form</h2>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                <div>
                  <label style={labelStyle}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><User size={13} color="#D4AF37" /> Full Name *</span>
                  </label>
                  <input type="text" required placeholder="Your full name" value={formData.clientName}
                    onChange={e => setFormData({ ...formData, clientName: e.target.value })} style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={13} color="#D4AF37" /> Email Address *</span>
                  </label>
                  <input type="email" required placeholder="your@email.com" value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })} style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={13} color="#D4AF37" /> Phone Number *</span>
                  </label>
                  <input type="tel" required placeholder="+251 XXX XXX XXX" value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })} style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Service Type *</label>
                  <select required value={formData.serviceType}
                    onChange={e => setFormData({ ...formData, serviceType: e.target.value })}
                    style={{ ...inputStyle, cursor: 'pointer' }}>
                    <option value="" style={{ backgroundColor: '#2B2B2B' }}>Select a service</option>
                    {services.map(service => (
                      <option key={service} value={service} style={{ backgroundColor: '#2B2B2B' }}>{service}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={13} color="#D4AF37" /> Preferred Date *</span>
                    </label>
                    <input type="date" required value={formData.preferredDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={e => setFormData({ ...formData, preferredDate: e.target.value })}
                      style={{ ...inputStyle, colorScheme: 'dark' }} />
                  </div>
                  <div>
                    <label style={labelStyle}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={13} color="#D4AF37" /> Preferred Time *</span>
                    </label>
                    <select required value={formData.preferredTime}
                      onChange={e => setFormData({ ...formData, preferredTime: e.target.value })}
                      style={{ ...inputStyle, cursor: 'pointer' }}>
                      <option value="" style={{ backgroundColor: '#2B2B2B' }}>Select time</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time} style={{ backgroundColor: '#2B2B2B' }}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={13} color="#D4AF37" /> Location</span>
                  </label>
                  <input type="text" placeholder="Where should we meet? (optional)" value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })} style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FileText size={13} color="#D4AF37" /> Additional Notes</span>
                  </label>
                  <textarea placeholder="Any special requests or details..." rows={4} value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    style={{ ...inputStyle, resize: 'vertical' }} />
                </div>

                {status === 'success' && (
                  <div style={{ padding: '16px', backgroundColor: 'rgba(62,207,178,0.1)', border: '1px solid #3ecfb2', borderRadius: '6px', color: '#3ecfb2', fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}>
                    Booking request sent! We will confirm within 24 hours.
                  </div>
                )}

                {status === 'error' && (
                  <div style={{ padding: '16px', backgroundColor: 'rgba(224,111,168,0.1)', border: '1px solid #e06fa8', borderRadius: '6px', color: '#e06fa8', fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}>
                    Something went wrong. Please try again or call us directly.
                  </div>
                )}

                <button type="submit" disabled={status === 'loading'}
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: '15px', fontWeight: '700', color: '#111111', backgroundColor: '#D4AF37', padding: '16px 40px', borderRadius: '4px', border: 'none', cursor: 'pointer', width: '100%' }}>
                  {status === 'loading' ? 'Sending...' : 'Book My Session'}
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