'use client'
import Link from 'next/link'

export default function PostCard({ post, featured }: { post: any, featured: boolean }) {
  return (
    <Link href={`/posts/${post.slug?.current}`} style={{ textDecoration: 'none' }}>
      <article
        style={{
          background: featured ? '#000000' : 'var(--card-bg)',
          borderRadius: 18,
          overflow: 'hidden',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          cursor: 'pointer',
          border: '1px solid var(--border)',
          minHeight: featured ? 400 : 280,
          position: 'relative',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {/* Image */}
        {post.mainImage && (
          <div style={{
            width: '100%',
            height: featured ? 280 : 180,
            overflow: 'hidden',
          }}>
            <img
              src={post.mainImage}
              alt={post.mainImageAlt || post.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.4s ease',
              }}
            />
          </div>
        )}

        {/* Content */}
        <div style={{ padding: featured ? '32px 36px' : '20px 24px' }}>
          {post.categories?.[0] && (
            <span style={{
              fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              color: featured ? '#2997ff' : 'var(--accent)',
              display: 'block', marginBottom: 10
            }}>
              {post.categories[0]}
            </span>
          )}
          <h2 style={{
            fontSize: featured ? 28 : 18,
            fontWeight: 700,
            lineHeight: 1.3,
            color: featured ? '#ffffff' : 'var(--text-primary)',
            marginBottom: 10,
          }}>
            {post.title}
          </h2>
          {post.excerpt && (
            <p style={{
              fontSize: 14, lineHeight: 1.7,
              color: featured ? 'rgba(255,255,255,0.65)' : 'var(--text-secondary)',
              marginBottom: 16
            }}>
              {post.excerpt}
            </p>
          )}
          <span style={{ fontSize: 12, color: featured ? 'rgba(255,255,255,0.4)' : 'var(--text-tertiary)' }}>
            {post.author && `${post.author} · `}
            {post.publishedAt && new Date(post.publishedAt).toLocaleDateString('ar-MA', {
              month: 'long', day: 'numeric', year: 'numeric'
            })}
          </span>
        </div>
      </article>
    </Link>
  )
}