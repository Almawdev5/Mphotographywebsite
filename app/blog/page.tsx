'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/ui/Navbar'
import { Footer } from '@/components/ui/Footer'
import { createClient } from '@/lib/supabase/client'
import type { BlogPost } from '@/types/database'

const categories = ['All', 'Photography Tips', 'Editing', 'Events', 'Technology', 'Behind the Scenes']

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
    setPosts(data || [])
    setLoading(false)
  }

  const filtered = activeCategory === 'All'
    ? posts
    : posts.filter(post => post.category === activeCategory)

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>

        <section style={{ padding: '160px 24px 60px', textAlign: 'center', borderBottom: '1px solid var(--border-secondary)' }}>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '16px' }}>Our Blog</p>
          <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: '800', color: 'var(--text)', marginBottom: '16px' }}>
            Latest <span style={{ color: '#D4AF37' }}>Updates</span>
          </h1>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 24px', lineHeight: '1.8' }}>
            Photography tips, editing techniques, event highlights, and technology tutorials.
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
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#F5F5F5', opacity: 0.5 }}>Loading posts...</p>
              </div>
            )}

            {!loading && filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '80px' }}>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#F5F5F5', opacity: 0.5 }}>No posts in this category yet.</p>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
              {filtered.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                  <div
                    style={{ backgroundColor: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s, border-color 0.2s', height: '100%' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#D4AF37' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#333333' }}
                  >
                    {/* Cover */}
                    <div style={{ height: '180px', backgroundColor: '#2B2B2B', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                      {post.cover_image_url ? (
                        <img src={post.cover_image_url} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <span style={{ fontSize: '48px' }}>📝</span>
                      )}
                      <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: '#D4AF37', color: '#111111', fontFamily: 'Poppins, sans-serif', fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '4px' }}>
                        {post.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '24px' }}>
                      <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', color: '#D4AF37', opacity: 0.8 }}>
                          {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                      </div>
                      <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '18px', fontWeight: '700', color: '#F5F5F5', marginBottom: '12px', lineHeight: '1.4' }}>{post.title}</h2>
                      <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#F5F5F5', opacity: 0.6, lineHeight: '1.7' }}>{post.excerpt}</p>
                      <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: '#D4AF37' }}>
                        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: '600' }}>Read More</span>
                        <span>→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}