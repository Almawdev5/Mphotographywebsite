import type { Metadata } from 'next'
import { Navbar } from '@/components/ui/Navbar'
import { Footer } from '@/components/ui/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services | Photo Mengie',
  description: 'Professional photography and videography services in Ethiopia.',
}

const services = [
  { title: 'Wedding Photography', description: 'Full wedding coverage with professionally edited photos. We capture every special moment of your big day with artistic precision and emotional depth.', price: 'ETB 12,000 – 35,000', icon: '💍', features: ['Full day coverage', 'Edited digital photos', 'Online gallery', 'Print ready files'] },
  { title: 'Portrait Photography', description: 'Personal or studio portrait sessions tailored to your style. Perfect for professionals, families, and individuals.', price: 'ETB 2,000 – 5,000', icon: '🎭', features: ['1-2 hour session', 'Multiple outfits', 'Edited photos', 'Digital delivery'] },
  { title: 'Normal Photography', description: 'Regular indoor and outdoor photoshoots for any occasion. Casual, natural, and beautifully captured.', price: 'ETB 1,500 – 3,500', icon: '📷', features: ['Indoor/outdoor', 'Natural lighting', 'Quick turnaround', 'Digital files'] },
  { title: '4x3 Photo Service', description: 'Passport, visa, ID, and document photos taken and printed to official standards.', price: 'ETB 80 – 200', icon: '🪪', features: ['Passport size', 'Visa requirements', 'ID photos', 'Same day service'] },
  { title: 'Graduation Photography', description: 'Celebrate your academic achievement with stunning graduation photos and professional edits.', price: 'ETB 3,000 – 8,000', icon: '🎓', features: ['Cap & gown shots', 'Indoor/outdoor', 'Family photos', 'Edited gallery'] },
  { title: 'Event Coverage', description: 'Birthday parties, corporate meetings, and small events captured with professionalism and creativity.', price: 'ETB 4,000 – 15,000', icon: '🎉', features: ['Full event coverage', 'Candid shots', 'Group photos', 'Fast delivery'] },
  { title: 'Product Photography', description: 'High quality product and branding photos for your business, e-commerce, or marketing needs.', price: 'ETB 2,000 – 7,000', icon: '📦', features: ['White background', 'Lifestyle shots', 'Multiple angles', 'Commercial rights'] },
  { title: 'Photo Editing', description: 'Professional retouching, color grading, and editing for your existing photos.', price: 'ETB 300 – 2,000', icon: '✏️', features: ['Color correction', 'Retouching', 'Background removal', 'Fast turnaround'] },
  { title: 'Videography', description: 'Short cinematic videos and reels for events, weddings, social media, and personal projects.', price: 'ETB 5,000 – 18,000', icon: '🎬', features: ['4K quality', 'Cinematic editing', 'Music & effects', 'Social media ready'] },
  { title: 'Drone Photography', description: 'Stunning aerial photography and video from above. Perfect for events, real estate, and landscapes.', price: 'ETB 8,000 – 35,000', icon: '🚁', features: ['4K aerial video', 'High resolution photos', 'Wide coverage', 'Professional pilot'] },
  { title: 'Tech Support Services', description: 'Software installation, computer setup, and basic digital support for individuals and small businesses.', price: 'ETB 500 – 3,000', icon: '💻', features: ['Software install', 'PC setup', 'Troubleshooting', 'Free consultation'] },
]

const specialOffers = [
  'Wedding + Videography package discounts',
  'Graduation seasonal special offers',
  'Discounts for returning customers',
  'Free consultation for basic tech support services',
]

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#111111', minHeight: '100vh' }}>

        <section style={{ padding: '160px 24px 80px', textAlign: 'center', borderBottom: '1px solid #2B2B2B' }}>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '16px' }}>What We Offer</p>
          <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: '800', color: '#F5F5F5', marginBottom: '16px' }}>
            Our <span style={{ color: '#D4AF37' }}>Services</span>
          </h1>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', color: '#F5F5F5', opacity: 0.6, maxWidth: '600px', margin: '0 auto 24px', lineHeight: '1.8' }}>
            Professional photography, videography, and tech support services tailored to your needs.
          </p>
          <div style={{ width: '60px', height: '2px', backgroundColor: '#D4AF37', margin: '0 auto' }} />
        </section>

        <section style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {services.map((service) => (
              <div key={service.title} style={{ backgroundColor: '#2B2B2B', border: '1px solid #333333', borderRadius: '8px', padding: '32px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>{service.icon}</div>
                <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '20px', fontWeight: '700', color: '#F5F5F5', marginBottom: '12px' }}>{service.title}</h3>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#F5F5F5', opacity: 0.6, lineHeight: '1.8', marginBottom: '20px', flex: 1 }}>{service.description}</p>
                <div style={{ marginBottom: '20px' }}>
                  {service.features.map((feature) => (
                    <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ color: '#D4AF37', fontSize: '14px' }}>✓</span>
                      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#F5F5F5', opacity: 0.7 }}>{feature}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '18px', fontWeight: '700', color: '#D4AF37', marginBottom: '20px' }}>{service.price}</p>
                <Link href="/appointments" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', color: '#111111', backgroundColor: '#D4AF37', padding: '12px 24px', borderRadius: '4px', textDecoration: 'none', textAlign: 'center' }}>
                  Book This Service
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section style={{ backgroundColor: '#2B2B2B', padding: '80px 24px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '16px' }}>Save More</p>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: '700', color: '#F5F5F5', marginBottom: '40px' }}>Special Offers</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '40px' }}>
              {specialOffers.map((offer) => (
                <div key={offer} style={{ backgroundColor: '#111111', border: '1px solid #D4AF37', borderRadius: '8px', padding: '20px' }}>
                  <span style={{ color: '#D4AF37', fontSize: '20px' }}>🎁</span>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#F5F5F5', marginTop: '12px', lineHeight: '1.6' }}>{offer}</p>
                </div>
              ))}
            </div>
            <Link href="/appointments" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '15px', fontWeight: '700', color: '#111111', backgroundColor: '#D4AF37', padding: '16px 40px', borderRadius: '4px', textDecoration: 'none' }}>
              Book a Session Now
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}