'use client'

import Link from 'next/link'
import { Heart, User, Camera, Video, Drone, Calendar, Package, Scissors, Cpu, GraduationCap, Image } from 'lucide-react'

const services = [
  {
    title: 'Wedding Photography',
    description: 'Full wedding coverage with professionally edited photos',
    price: 'ETB 12,000 – 35,000',
    icon: Heart,
  },
  {
    title: 'Portrait Photography',
    description: 'Personal or studio portrait sessions',
    price: 'ETB 2,000 – 5,000',
    icon: User,
  },
  {
    title: 'Graduation Photography',
    description: 'Graduation photos and professional edits',
    price: 'ETB 3,000 – 8,000',
    icon: GraduationCap,
  },
  {
    title: 'Videography',
    description: 'Short cinematic videos and reels',
    price: 'ETB 5,000 – 18,000',
    icon: Video,
  },
  {
    title: 'Drone Photography',
    description: 'Aerial photography and video',
    price: 'ETB 8,000 – 35,000',
    icon: Camera,
  },
  {
    title: 'Event Coverage',
    description: 'Birthday, meetings, and small events',
    price: 'ETB 4,000 – 15,000',
    icon: Calendar,
  },
  {
    title: 'Product Photography',
    description: 'Product and branding photos',
    price: 'ETB 2,000 – 7,000',
    icon: Package,
  },
  {
    title: 'Photo Editing',
    description: 'Retouching and professional editing',
    price: 'ETB 300 – 2,000',
    icon: Scissors,
  },
  {
    title: 'Normal Photography',
    description: 'Regular indoor/outdoor photoshoots',
    price: 'ETB 1,500 – 3,500',
    icon: Image,
  },
  {
    title: '4x3 Photo Service',
    description: 'Passport, visa, ID, and document photos',
    price: 'ETB 80 – 200',
    icon: User,
  },
  {
    title: 'Tech Support Services',
    description: 'Software installation and basic computer support',
    price: 'ETB 500 – 3,000',
    icon: Cpu,
  },
]

export function ServicesPreview() {
  return (
    <section style={{
      backgroundColor: '#111111',
      padding: '100px 24px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '12px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: '#D4AF37',
            marginBottom: '16px',
          }}>
            What We Offer
          </p>
          <h2 style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: '700',
            color: '#F5F5F5',
            marginBottom: '16px',
          }}>
            Our Services
          </h2>
          <div style={{
            width: '60px',
            height: '2px',
            backgroundColor: '#D4AF37',
            margin: '0 auto',
          }} />
        </div>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '48px',
        }}>
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>

        {/* View All Button */}
        <div style={{ textAlign: 'center' }}>
          <Link href="/services" style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '15px',
            fontWeight: '600',
            color: '#D4AF37',
            border: '2px solid #D4AF37',
            padding: '14px 40px',
            borderRadius: '4px',
            textDecoration: 'none',
          }}>
            View All Services
          </Link>
        </div>

      </div>
    </section>
  )
}

function ServiceCard({ service }: { service: typeof services[0] }) {
  const Icon = service.icon
  return (
    <div
      style={{
        backgroundColor: '#2B2B2B',
        border: '1px solid #333333',
        borderRadius: '8px',
        padding: '32px',
        cursor: 'pointer',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = '#D4AF37')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = '#333333')}
    >
      <div style={{
        width: '52px',
        height: '52px',
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
      }}>
        <Icon size={26} color="#D4AF37" />
      </div>
      <h3 style={{
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '18px',
        fontWeight: '700',
        color: '#F5F5F5',
        marginBottom: '8px',
      }}>
        {service.title}
      </h3>
      <p style={{
        fontFamily: 'Poppins, sans-serif',
        fontSize: '14px',
        color: '#F5F5F5',
        opacity: 0.6,
        marginBottom: '16px',
        lineHeight: '1.6',
      }}>
        {service.description}
      </p>
      <p style={{
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '15px',
        fontWeight: '600',
        color: '#D4AF37',
      }}>
        {service.price}
      </p>
    </div>
  )
}