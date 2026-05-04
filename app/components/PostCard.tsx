'use client'
import Link from 'next/link'

export default function PostCard({ post, featured }: { post: any, featured: boolean }) {
  return (
    <Link href={`/posts/${post.slug?.current}`} style={{ textDecoration: 'none' }}>
      <article
        style={{
          background: featured ? 'var(--text-primary)' : 'var(--card-bg)',
          padding: '40px 36px',
          transition: 'transform 0.2s ease',
          cursor: 'pointer',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.01)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
      >
        {post.categories?.[0] && (
          <span style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            color: featured ? 'rgba(255,255,255,0.5)' : 'var(--accent)',
            display: 'block', marginBottom: 14
          }}>
            {post.categories[0]}
          </span>
        )}
        <h2 style={{
          fontSize: featured ? 32 : 20, fontWeight: 600,
          letterSpacing: '-0.5px', lineHeight: 1.2,
          color: featured ? '#ffffff' : 'var(--text-primary)', marginBottom: 12
        }}>
          {post.title}
        </h2>
        {post.excerpt && (
          <p style={{
            fontSize: 15, lineHeight: 1.6,
            color: featured ? 'rgba(255,255,255,0.65)' : 'var(--text-secondary)',
            marginBottom: 24
          }}>
            {post.excerpt}
          </p>
        )}
        <span style={{ fontSize: 13, color: featured ? 'rgba(255,255,255,0.4)' : 'var(--text-tertiary)' }}>
          {post.author && `${post.author} · `}
          {post.publishedAt && new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </article>
    </Link>
  )
}