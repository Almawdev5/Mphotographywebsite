import { createClient } from '@/lib/supabase/server'
import { Navbar } from '@/components/ui/Navbar'
import { Footer } from '@/components/ui/Footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!post) notFound()

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#111111', minHeight: '100vh' }}>

        {/* Hero */}
        <section style={{ padding: '160px 24px 60px', textAlign: 'center', borderBottom: '1px solid #2B2B2B' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '16px', display: 'block' }}>
              {post.category}
            </span>
            <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: '800', color: '#F5F5F5', marginBottom: '24px', lineHeight: '1.2' }}>
              {post.title}
            </h1>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#F5F5F5', opacity: 0.5 }}>
              {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <div style={{ width: '60px', height: '2px', backgroundColor: '#D4AF37', margin: '24px auto 0' }} />
          </div>
        </section>

        {/* Cover Image */}
        {post.cover_image_url && (
          <div style={{ maxWidth: '900px', margin: '48px auto 0', padding: '0 24px' }}>
            <img src={post.cover_image_url} alt={post.title}
              style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #2B2B2B' }} />
          </div>
        )}

        {/* Content */}
        <section style={{ padding: '60px 24px 80px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>

            {/* Excerpt */}
            {post.excerpt && (
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', color: '#F5F5F5', opacity: 0.8, lineHeight: '1.8', marginBottom: '40px', fontStyle: 'italic', borderLeft: '3px solid #D4AF37', paddingLeft: '24px' }}>
                {post.excerpt}
              </p>
            )}

            {/* Full Content */}
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '15px', color: '#F5F5F5', opacity: 0.8, lineHeight: '2', whiteSpace: 'pre-wrap' }}>
              {post.content}
            </div>

            {/* Back to Blog */}
            <div style={{ marginTop: '60px', paddingTop: '40px', borderTop: '1px solid #2B2B2B' }}>
              <Link href="/blog" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', color: '#D4AF37', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                ← Back to Blog
              </Link>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}