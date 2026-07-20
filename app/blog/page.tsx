'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Camera, Calendar, Mail, BarChart, LogOut, Plus, Trash2, Eye, EyeOff, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { BlogPost } from '@/types/database'

const sidebarLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: BarChart },
  { href: '/admin/photos', label: 'Photos', icon: Camera },
  { href: '/admin/appointments', label: 'Appointments', icon: Calendar },
  { href: '/admin/blog', label: 'Blog', icon: Mail },
  { href: '/admin/newsletter', label: 'Newsletter', icon: Users },
]

const categories = ['Photography Tips', 'Editing', 'Events', 'Technology', 'Behind the Scenes']

export default function AdminBlogPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '', slug: '', excerpt: '', content: '', category: '', published: false,
  })

  useEffect(() => { loadPosts() }, [])

  const loadPosts = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
    setPosts(data || [])
    setLoading(false)
  }

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    try {
      const supabase = createClient()
      const { error } = await supabase.from('blog_posts').insert({
        title: formData.title,
        slug: formData.slug || generateSlug(formData.title),
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        published: formData.published,
      })
      if (error) throw error
      setMessage('Post saved successfully!')
      setFormData({ title: '', slug: '', excerpt: '', content: '', category: '', published: false })
      setShowForm(false)
      loadPosts()
    } catch (error) {
      console.error(error)
      setMessage('Failed to save post.')
    }
    setSaving(false)
  }

  const togglePublish = async (post: BlogPost) => {
    const supabase = createClient()
    await supabase.from('blog_posts').update({ published: !post.published }).eq('id', post.id)
    loadPosts()
  }

  const deletePost = async (id: string) => {
    if (!confirm('Delete this post?')) return
    const supabase = createClient()
    await supabase.from('blog_posts').delete().eq('id', id)
    loadPosts()
  }

  const handleLogout = async () => {
    await fetch('/api/admin-logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0a0a0a' }}>

      {/* Sidebar */}
      <div style={{ width: '240px', backgroundColor: '#111111', borderRight: '1px solid #2B2B2B', display: 'flex', flexDirection: 'column', padding: '32px 0', flexShrink: 0 }}>
        <div style={{ padding: '0 24px 32px', borderBottom: '1px solid #2B2B2B' }}>
          <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '18px', fontWeight: '800', color: '#D4AF37', marginBottom: '4px' }}>Photo Mengie</h1>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', color: '#F5F5F5', opacity: 0.4, letterSpacing: '2px', textTransform: 'uppercase' }}>Admin Panel</p>
        </div>
        <div style={{ padding: '24px 0', flex: 1 }}>
          {sidebarLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 24px', color: '#F5F5F5', opacity: link.href === '/admin/blog' ? 1 : 0.7, cursor: 'pointer', backgroundColor: link.href === '/admin/blog' ? 'rgba(212,175,55,0.1)' : 'transparent' }}>
                  <Icon size={18} color="#D4AF37" />
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}>{link.label}</span>
                </div>
              </Link>
            )
          })}
        </div>
        <div style={{ padding: '24px', borderTop: '1px solid #2B2B2B' }}>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: '#e06fa8', fontFamily: 'Poppins, sans-serif', fontSize: '14px', width: '100%' }}>
            <LogOut size={18} color="#e06fa8" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
          <div>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '28px', fontWeight: '800', color: '#F5F5F5', marginBottom: '8px' }}>Blog Posts</h2>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#F5F5F5', opacity: 0.5 }}>Write and manage your blog posts.</p>
          </div>
          <button onClick={() => setShowForm(!showForm)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', color: '#111111', backgroundColor: '#D4AF37', padding: '12px 24px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>
            <Plus size={16} color="#111111" /> New Post
          </button>
        </div>

        {/* New Post Form */}
        {showForm && (
          <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #D4AF37', borderRadius: '8px', padding: '32px', marginBottom: '32px' }}>
            <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '20px', fontWeight: '700', color: '#F5F5F5', marginBottom: '24px' }}>Write New Post</h3>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', color: '#D4AF37', display: 'block', marginBottom: '8px' }}>Post Title *</label>
                  <input type="text" required placeholder="Enter post title" value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) })}
                    style={{ width: '100%', padding: '12px', backgroundColor: '#2B2B2B', border: '1px solid #444', borderRadius: '6px', color: '#F5F5F5', fontFamily: 'Poppins, sans-serif', fontSize: '13px', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', color: '#D4AF37', display: 'block', marginBottom: '8px' }}>Category *</label>
                  <select required value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    style={{ width: '100%', padding: '12px', backgroundColor: '#2B2B2B', border: '1px solid #444', borderRadius: '6px', color: '#F5F5F5', fontFamily: 'Poppins, sans-serif', fontSize: '13px', outline: 'none', cursor: 'pointer' }}>
                    <option value="">Select category</option>
                    {categories.map(cat => <option key={cat} value={cat} style={{ backgroundColor: '#2B2B2B' }}>{cat}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', color: '#D4AF37', display: 'block', marginBottom: '8px' }}>URL Slug (auto-generated)</label>
                <input type="text" placeholder="url-slug" value={formData.slug}
                  onChange={e => setFormData({ ...formData, slug: e.target.value })}
                  style={{ width: '100%', padding: '12px', backgroundColor: '#2B2B2B', border: '1px solid #444', borderRadius: '6px', color: '#F5F5F5', fontFamily: 'Poppins, sans-serif', fontSize: '13px', outline: 'none', opacity: 0.7 }} />
              </div>

              <div>
                <label style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', color: '#D4AF37', display: 'block', marginBottom: '8px' }}>Excerpt *</label>
                <textarea required placeholder="Brief description..." rows={2} value={formData.excerpt}
                  onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                  style={{ width: '100%', padding: '12px', backgroundColor: '#2B2B2B', border: '1px solid #444', borderRadius: '6px', color: '#F5F5F5', fontFamily: 'Poppins, sans-serif', fontSize: '13px', outline: 'none', resize: 'vertical' }} />
              </div>

              <div>
                <label style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', color: '#D4AF37', display: 'block', marginBottom: '8px' }}>Full Content *</label>
                <textarea required placeholder="Write your full blog post here..." rows={12} value={formData.content}
                  onChange={e => setFormData({ ...formData, content: e.target.value })}
                  style={{ width: '100%', padding: '12px', backgroundColor: '#2B2B2B', border: '1px solid #444', borderRadius: '6px', color: '#F5F5F5', fontFamily: 'Poppins, sans-serif', fontSize: '13px', outline: 'none', resize: 'vertical', lineHeight: '1.7' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" id="published" checked={formData.published}
                  onChange={e => setFormData({ ...formData, published: e.target.checked })} />
                <label htmlFor="published" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#F5F5F5', opacity: 0.8, cursor: 'pointer' }}>
                  Publish immediately
                </label>
              </div>

              {message && (
                <div style={{ padding: '12px', backgroundColor: message.includes('success') ? 'rgba(62,207,178,0.1)' : 'rgba(224,111,168,0.1)', border: `1px solid ${message.includes('success') ? '#3ecfb2' : '#e06fa8'}`, borderRadius: '6px', color: message.includes('success') ? '#3ecfb2' : '#e06fa8', fontFamily: 'Poppins, sans-serif', fontSize: '13px' }}>
                  {message}
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="submit" disabled={saving}
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '700', color: '#111111', backgroundColor: '#D4AF37', padding: '14px 32px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>
                  {saving ? 'Saving...' : 'Save Post'}
                </button>
                <button type="button" onClick={() => setShowForm(false)}
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', color: '#F5F5F5', backgroundColor: 'transparent', padding: '14px 32px', borderRadius: '6px', border: '1px solid #444', cursor: 'pointer' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Posts List */}
        <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #2B2B2B', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #2B2B2B', backgroundColor: '#111111' }}>
                {['Title', 'Category', 'Date', 'Status', 'Actions'].map((h) => (
                  <th key={h} style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', color: '#D4AF37', textAlign: 'left', padding: '14px 16px', letterSpacing: '1px', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={5} style={{ padding: '40px', textAlign: 'center', fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#F5F5F5', opacity: 0.5 }}>Loading posts...</td></tr>
              )}
              {!loading && posts.length === 0 && (
                <tr><td colSpan={5} style={{ padding: '40px', textAlign: 'center', fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#F5F5F5', opacity: 0.5 }}>No posts yet. Click "New Post" to write your first blog post!</td></tr>
              )}
              {posts.map((post) => (
                <tr key={post.id} style={{ borderBottom: '1px solid #111111' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#222222'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#F5F5F5', padding: '14px 16px' }}>
                    <p style={{ margin: 0, fontWeight: '600' }}>{post.title}</p>
                    <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#F5F5F5', opacity: 0.4 }}>/blog/{post.slug}</p>
                  </td>
                  <td style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#D4AF37', padding: '14px 16px' }}>{post.category}</td>
                  <td style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#F5F5F5', opacity: 0.6, padding: '14px 16px', whiteSpace: 'nowrap' }}>
                    {new Date(post.created_at).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', fontWeight: '600', padding: '4px 10px', borderRadius: '20px', backgroundColor: post.published ? 'rgba(62,207,178,0.1)' : 'rgba(212,175,55,0.1)', color: post.published ? '#3ecfb2' : '#D4AF37', border: `1px solid ${post.published ? '#3ecfb2' : '#D4AF37'}` }}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => togglePublish(post)}
                        style={{ backgroundColor: post.published ? 'rgba(212,175,55,0.1)' : 'rgba(62,207,178,0.1)', border: `1px solid ${post.published ? '#D4AF37' : '#3ecfb2'}`, borderRadius: '4px', padding: '5px 10px', color: post.published ? '#D4AF37' : '#3ecfb2', fontFamily: 'Poppins, sans-serif', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {post.published ? <><EyeOff size={12} /> Unpublish</> : <><Eye size={12} /> Publish</>}
                      </button>
                      <button onClick={() => deletePost(post.id)}
                        style={{ backgroundColor: 'rgba(224,111,168,0.1)', border: '1px solid #e06fa8', borderRadius: '4px', padding: '5px 10px', color: '#e06fa8', fontFamily: 'Poppins, sans-serif', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}