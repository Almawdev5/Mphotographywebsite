'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/ui/Navbar'
import { Footer } from '@/components/ui/Footer'

const categories = ['All', 'Photography Tips', 'Editing', 'Events', 'Technology', 'Behind the Scenes']

const blogPosts = [
  { id: 1, title: '10 Tips for the Perfect Wedding Shot', excerpt: 'Wedding photography requires preparation, creativity, and the ability to capture emotion in real time. Here are our top 10 tips for stunning wedding photos.', category: 'Photography Tips', date: 'May 10, 2025', readTime: '5 min read', emoji: '💍', color: '#1a0a00', slug: 'wedding-photography-tips' },
  { id: 2, title: 'How to Edit Photos Like a Pro', excerpt: 'Professional photo editing can transform good photos into stunning masterpieces. Learn the techniques we use at Photo Mengie to deliver exceptional results.', category: 'Editing', date: 'April 28, 2025', readTime: '7 min read', emoji: '✏️', color: '#0a1a0a', slug: 'photo-editing-tips' },
  { id: 3, title: 'Behind the Scenes: Graduation Season 2025', excerpt: 'Take a look behind the camera at our busiest graduation season yet. From campus shoots to studio sessions, here is how we captured over 200 graduates.', category: 'Behind the Scenes', date: 'April 15, 2025', readTime: '4 min read', emoji: '🎓', color: '#0a0a1a', slug: 'graduation-season-2025' },
  { id: 4, title: 'Drone Photography in Addis Ababa', excerpt: 'Aerial photography is transforming how we see our city. Discover the best locations in Addis Ababa for stunning drone shots and what permits you need.', category: 'Photography Tips', date: 'April 5, 2025', readTime: '6 min read', emoji: '🚁', color: '#001015', slug: 'drone-photography-addis' },
  { id: 5, title: 'How to Prepare for Your Portrait Session', excerpt: 'Getting ready for a portrait session can feel overwhelming. Here is our complete guide to help you look and feel your best in front of the camera.', category: 'Photography Tips', date: 'March 22, 2025', readTime: '5 min read', emoji: '🎭', color: '#1a1a0a', slug: 'portrait-session-prep' },
  { id: 6, title: 'Color Grading: The Secret to Cinematic Photos', excerpt: 'Color grading is what separates ordinary photos from cinematic masterpieces. Learn how we use color theory to create our signature look.', category: 'Editing', date: 'March 10, 2025', readTime: '8 min read', emoji: '🎨', color: '#1a0a1a', slug: 'color-grading-guide' },
  { id: 7, title: 'Top 5 Software Tools for Photo Editing', excerpt: 'From Adobe Lightroom to Capture One, we break down the best photo editing software available and which one is right for your needs.', category: 'Technology', date: 'February 28, 2025', readTime: '6 min read', emoji: '💻', color: '#0a1500', slug: 'photo-editing-software' },
  { id: 8, title: 'Covering the Addis Chamber of Commerce Event', excerpt: 'Last month we had the privilege of covering the Addis Ababa Chamber of Commerce annual gala. Here is how we prepared for this large scale event.', category: 'Events', date: 'February 15, 2025', readTime: '4 min read', emoji: '🏢', color: '#001a1a', slug: 'chamber-commerce-event' },
  { id: 9, title: 'How to Choose the Right Photography Package', excerpt: 'With so many photography packages available, choosing the right one can be confusing. This guide will help you pick the perfect package for your needs and budget.', category: 'Photography Tips', date: 'February 1, 2025', readTime: '5 min read', emoji: '📦', color: '#150a00', slug: 'choosing-photography-package' },
]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === activeCategory)

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#111111', minHeight: '100vh' }}>

        <section style={{ padding: '160px 24px 60px', textAlign: 'center', borderBottom: '1px solid #2B2B2B' }}>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '16px' }}>Our Blog</p>
          <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: '800', color: '#F5F5F5', marginBottom: '16px' }}>
            Latest <span style={{ color: '#D4AF37' }}>Updates</span>
          </h1>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', color: '#F5F5F5', opacity: 0.6, maxWidth: '500px', margin: '0 auto 24px', lineHeight: '1.8' }}>
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
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {filtered.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{ backgroundColor: '#1a1a1a', border: '1px solid #333333', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s, border-color 0.2s', height: '100%' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#D4AF37' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#333333' }}
                >
                  <div style={{ height: '180px', backgroundColor: post.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px', position: 'relative' }}>
                    {post.emoji}
                    <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: '#D4AF37', color: '#111111', fontFamily: 'Poppins, sans-serif', fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '4px' }}>
                      {post.category}
                    </div>
                  </div>
                  <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', color: '#D4AF37', opacity: 0.8 }}>{post.date}</span>
                      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', color: '#F5F5F5', opacity: 0.4 }}>{post.readTime}</span>
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
        </section>

      </main>
      <Footer />
    </>
  )
}