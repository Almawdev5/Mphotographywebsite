import type { Metadata } from 'next'
import { Navbar } from '@/components/ui/Navbar'
import { Footer } from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'About | Photo Mengie',
  description: 'Learn about Photo Mengie — a creative photography brand based in Ethiopia.',
}

const testimonials = [
  { quote: 'Professional service and amazing photo quality.', name: 'Client 1', service: 'Wedding Photography' },
  { quote: 'Very creative and easy to work with.', name: 'Client 2', service: 'Portrait Photography' },
  { quote: 'High-quality editing and fast delivery.', name: 'Client 3', service: 'Photo Editing' },
  { quote: 'Highly recommended for events and graduation shoots.', name: 'Client 4', service: 'Graduation Photography' },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#111111', minHeight: '100vh' }}>

        <section style={{ padding: '160px 24px 80px', textAlign: 'center', borderBottom: '1px solid #2B2B2B' }}>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '16px' }}>Our Story</p>
          <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: '800', color: '#F5F5F5', marginBottom: '24px', lineHeight: '1.2' }}>
            About <span style={{ color: '#D4AF37' }}>Photo Mengie</span>
          </h1>
          <div style={{ width: '60px', height: '2px', backgroundColor: '#D4AF37', margin: '0 auto' }} />
        </section>

        <section style={{ padding: '80px 24px', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'center' }}>
            <div>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '16px' }}>Who We Are</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: '700', color: '#F5F5F5', marginBottom: '24px' }}>Creativity Meets Professionalism</h2>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '15px', color: '#F5F5F5', opacity: 0.7, lineHeight: '1.9', marginBottom: '24px' }}>
                Photo Mengie is a creative photography brand focused on capturing meaningful moments with professional quality and artistic storytelling. Alongside photography and videography services, we also provide basic technology solutions including software installation, digital support, and creative assistance for individuals and small businesses.
              </p>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '15px', color: '#F5F5F5', opacity: 0.7, lineHeight: '1.9' }}>
                Based in Addis Ababa, Ethiopia, we serve clients across the country with a passion for visual storytelling and a commitment to delivering exceptional results on every project.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {[
                { number: '500+', label: 'Happy Clients' },
                { number: '11', label: 'Services Offered' },
                { number: '5+', label: 'Years Experience' },
                { number: '100%', label: 'Satisfaction' },
              ].map((stat) => (
                <div key={stat.label} style={{ backgroundColor: '#2B2B2B', border: '1px solid #333333', borderRadius: '8px', padding: '32px 24px', textAlign: 'center' }}>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '36px', fontWeight: '800', color: '#D4AF37', marginBottom: '8px' }}>{stat.number}</p>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#F5F5F5', opacity: 0.6 }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#2B2B2B', padding: '80px 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '16px' }}>Our Vision</p>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: '700', color: '#F5F5F5', marginBottom: '24px' }}>Telling Stories Through the Lens</h2>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', color: '#F5F5F5', opacity: 0.7, lineHeight: '1.9' }}>
              We believe every moment deserves to be preserved with beauty and intention. Our vision is to be Ethiopia's most trusted photography brand — combining artistic excellence with professional reliability to create memories that last a lifetime.
            </p>
          </div>
        </section>

        <section style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '16px' }}>What Clients Say</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: '700', color: '#F5F5F5' }}>Client Testimonials</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
              {testimonials.map((t) => (
                <div key={t.quote} style={{ backgroundColor: '#2B2B2B', border: '1px solid #333333', borderRadius: '8px', padding: '32px' }}>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                    {[1,2,3,4,5].map((star) => (
                      <span key={star} style={{ color: '#D4AF37', fontSize: '18px' }}>★</span>
                    ))}
                  </div>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '15px', color: '#F5F5F5', opacity: 0.8, lineHeight: '1.8', marginBottom: '24px', fontStyle: 'italic' }}>
                    "{t.quote}"
                  </p>
                  <div style={{ borderTop: '1px solid #333333', paddingTop: '16px' }}>
                    <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', fontWeight: '700', color: '#F5F5F5', marginBottom: '4px' }}>{t.name}</p>
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', color: '#D4AF37' }}>{t.service}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}