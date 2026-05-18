'use client'

import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import { Navbar } from '@/components/ui/Navbar'
import { Footer } from '@/components/ui/Footer'
import { createClient } from '@/lib/supabase/client'
import type { Photo } from '@/types/database'

const categories = ['All', 'Weddings', 'Portraits', 'Events', 'Graduation', 'Commercial', 'Videography', 'Drone Shots']

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} size={14} fill={star <= rating ? '#D4AF37' : 'none'} color={star <= rating ? '#D4AF37' : '#555555'} />
      ))}
    </div>
  )
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPhotos()
  }, [])

  const loadPhotos = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('photos')
      .select('*')
      .order('created_at', { ascending: false })
    setPhotos(data || [])
    setLoading(false)
  }

  const filtered = activeCategory === 'All'
    ? photos
    : photos.filter(item => item.category === activeCategory)

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>

        <section style={{ padding: '160px 24px 60px', textAlign: 'center', borderBottom: '1px solid var(--border-secondary)' }}>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '16px' }}>
            Our Portfolio
          </p>
          <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: '800', color: 'var(--text)', marginBottom: '16px' }}>
            Photo <span style={{ color: '#D4AF37' }}>Gallery</span>
          </h1>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 24px', lineHeight: '1.8' }}>
            Browse our portfolio of professional photography across all categories.
          </p>
          <div style={{ width: '60px', height: '2px', backgroundColor: '#D4AF37', margin: '0 auto' }} />
        </section>

        <section style={{ padding: '40px 24px 0' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: '500', padding: '10px 24px', borderRadius: '4px', border: '1px solid', cursor: 'pointer', transition: 'all 0.2s', backgroundColor: activeCategory === cat ? '#D4AF37' : 'transparent', color: activeCategory === cat ? '#111111' : '#F5F5F5', borderColor: activeCategory === cat ? '#D4AF37' : '#444444' }}>
                {cat}
              </button>
            ))}
          </div>
        </section>

        <section style={{ padding: '40px 24px 80px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

            {loading && (
              <div style={{ textAlign: 'center', padding: '80px' }}>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#F5F5F5', opacity: 0.5 }}>Loading gallery...</p>
              </div>
            )}

            {!loading && filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '80px' }}>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#F5F5F5', opacity: 0.5 }}>No photos in this category yet.</p>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {filtered.map((item) => (
                <div key={item.id}
                  onClick={() => setSelectedPhoto(item)}
                  style={{ backgroundColor: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s, border-color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.borderColor = '#D4AF37' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = '#333333' }}
                >
                  <div style={{ height: '220px', position: 'relative', backgroundColor: '#2B2B2B' }}>
                    <img src={item.image_url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: '#D4AF37', color: '#111111', fontFamily: 'Poppins, sans-serif', fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '4px' }}>
                      {item.category}
                    </div>
                  </div>
                  <div style={{ padding: '16px' }}>
                    <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '16px', fontWeight: '700', color: '#F5F5F5', marginBottom: '8px' }}>{item.title}</h3>
                    {item.description && (
                      <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#F5F5F5', opacity: 0.6, marginBottom: '10px' }}>{item.description}</p>
                    )}
                    <StarRating rating={Math.round(item.avg_rating)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {selectedPhoto && (
          <div onClick={() => setSelectedPhoto(null)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <div onClick={e => e.stopPropagation()} style={{ backgroundColor: '#1a1a1a', border: '1px solid #D4AF37', borderRadius: '12px', maxWidth: '600px', width: '100%', overflow: 'hidden' }}>
              <div style={{ height: '360px', backgroundColor: '#2B2B2B' }}>
                <img src={selectedPhoto.image_url} alt={selectedPhoto.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '22px', fontWeight: '700', color: '#F5F5F5' }}>{selectedPhoto.title}</h2>
                  <span style={{ backgroundColor: '#D4AF37', color: '#111111', fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: '700', padding: '4px 12px', borderRadius: '4px' }}>{selectedPhoto.category}</span>
                </div>
                {selectedPhoto.description && (
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#F5F5F5', opacity: 0.7, marginBottom: '16px' }}>{selectedPhoto.description}</p>
                )}
                <StarRating rating={Math.round(selectedPhoto.avg_rating)} />
                <button onClick={() => setSelectedPhoto(null)} style={{ marginTop: '20px', fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#111111', backgroundColor: '#D4AF37', border: 'none', padding: '10px 24px', borderRadius: '4px', cursor: 'pointer', width: '100%', fontWeight: '700' }}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
      <Footer />
    </>
  )
}