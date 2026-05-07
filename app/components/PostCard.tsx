'use client'
import Link from 'next/link'

type PostCardProps = {
  post: any
  featured?: boolean
  size?: 'featured' | 'medium' | 'small' | 'compact'
}

export default function PostCard({ post, featured, size = 'medium' }: PostCardProps) {
  // Resolve effective size — `featured` prop takes priority
  const effectiveSize = featured ? 'featured' : size

  /* ── PER-SIZE DESIGN TOKENS ─────────────────────────────────── */
  const config = {
    featured: {
      imgHeight: 480,
      titleSize: 32,
      titleColor: '#ffffff',
      bg: '#000000',
      excerptColor: 'rgba(255,255,255,0.70)',
      metaColor: 'rgba(255,255,255,0.45)',
      accentColor: '#2997ff',
      padding: '32px 40px',
      minHeight: 480,
      showExcerpt: true,
      showImage: true,
      layout: 'vertical' as const,
    },
    medium: {
      imgHeight: 200,
      titleSize: 20,
      titleColor: 'var(--text-primary)',
      bg: 'var(--card-bg)',
      excerptColor: 'var(--text-secondary)',
      metaColor: 'var(--text-tertiary)',
      accentColor: 'var(--accent)',
      padding: '16px 20px',
      minHeight: 0,
      showExcerpt: true,
      showImage: true,
      layout: 'vertical' as const,
    },
    small: {
      imgHeight: 140,
      titleSize: 16,
      titleColor: 'var(--text-primary)',
      bg: 'var(--card-bg)',
      excerptColor: 'var(--text-secondary)',
      metaColor: 'var(--text-tertiary)',
      accentColor: 'var(--accent)',
      padding: '12px 16px',
      minHeight: 0,
      showExcerpt: false,
      showImage: true,
      layout: 'vertical' as const,
    },
    compact: {
      imgHeight: 80,
      titleSize: 14,
      titleColor: 'var(--text-primary)',
      bg: 'transparent',
      excerptColor: 'var(--text-secondary)',
      metaColor: 'var(--text-tertiary)',
      accentColor: 'var(--accent)',
      padding: '0',
      minHeight: 0,
      showExcerpt: false,
      showImage: true,
      layout: 'horizontal' as const,
    },
  }

  const c = config[effectiveSize]

  /* ── COMPACT: side-by-side thumbnail + text ─────────────────── */
  if (c.layout === 'horizontal') {
    return (
      <Link
        href={`/posts/${post.slug?.current}`}
        style={{ textDecoration: 'none', display: 'block' }}
      >
        <article
          style={{
            display: 'flex',
            gap: 12,
            alignItems: 'flex-start',
            cursor: 'pointer',
            direction: 'rtl',
          }}
          onMouseEnter={e => {
            const title = e.currentTarget.querySelector<HTMLElement>('.pc-title')
            if (title) title.style.color = 'var(--accent)'
          }}
          onMouseLeave={e => {
            const title = e.currentTarget.querySelector<HTMLElement>('.pc-title')
            if (title) title.style.color = c.titleColor
          }}
        >
          {post.mainImage && (
            <div style={{
              width: 88,
              height: c.imgHeight,
              flexShrink: 0,
              borderRadius: 6,
              overflow: 'hidden',
              background: 'var(--border)',
            }}>
              <img
                src={post.mainImage}
                alt={post.mainImageAlt || post.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          )}

          <div style={{ flex: 1, paddingTop: 2 }}>
            {post.categories?.[0] && (
              <span style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                color: c.accentColor, display: 'block', marginBottom: 5,
              }}>
                {post.categories[0]}
              </span>
            )}
            <h3
              className="pc-title"
              style={{
                fontSize: c.titleSize,
                fontWeight: 700,
                lineHeight: 1.4,
                color: c.titleColor,
                marginBottom: 6,
                transition: 'color 0.2s',
              }}
            >
              {post.title}
            </h3>
            <span style={{ fontSize: 11, color: c.metaColor, display: 'block' }}>
              {post.author && `${post.author} · `}
              {post.publishedAt && new Date(post.publishedAt).toLocaleDateString('ar-MA', {
                month: 'short', day: 'numeric', year: 'numeric',
              })}
            </span>
          </div>
        </article>
      </Link>
    )
  }

  /* ── FEATURED: full-width edge-to-edge hero with overlay ─────── */
  if (effectiveSize === 'featured') {
    return (
      <Link
        href={`/posts/${post.slug?.current}`}
        style={{ textDecoration: 'none', display: 'block' }}
      >
        <article
          style={{
            position: 'relative',
            width: '100%',
            height: c.minHeight,
            overflow: 'hidden',
            cursor: 'pointer',
            background: '#111',
          }}
          onMouseEnter={e => {
            const img = e.currentTarget.querySelector<HTMLElement>('.hero-img')
            if (img) img.style.transform = 'scale(1.03)'
          }}
          onMouseLeave={e => {
            const img = e.currentTarget.querySelector<HTMLElement>('.hero-img')
            if (img) img.style.transform = 'scale(1)'
          }}
        >
          {/* Full-bleed image */}
          {post.mainImage && (
            <img
              className="hero-img"
              src={post.mainImage}
              alt={post.mainImageAlt || post.title}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                transition: 'transform 0.6s ease',
                display: 'block',
              }}
            />
          )}

          {/* Gradient overlay — stronger at bottom for legibility */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.05) 100%)',
          }} />

          {/* Text content pinned to bottom */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            padding: c.padding,
            direction: 'rtl',
          }}>
            {post.categories?.[0] && (
              <span style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
                textTransform: 'uppercase' as const,
                color: c.accentColor, display: 'inline-block', marginBottom: 10,
                background: 'rgba(41,151,255,0.15)',
                border: '1px solid rgba(41,151,255,0.4)',
                borderRadius: 4,
                padding: '2px 8px',
              }}>
                {post.categories[0]}
              </span>
            )}
            <h2 style={{
              fontSize: c.titleSize,
              fontWeight: 800,
              lineHeight: 1.3,
              color: c.titleColor,
              marginBottom: 10,
              maxWidth: 780,
              textShadow: '0 2px 12px rgba(0,0,0,0.5)',
            }}>
              {post.title}
            </h2>
            {post.excerpt && (
              <p style={{
                fontSize: 14, lineHeight: 1.7,
                color: c.excerptColor,
                marginBottom: 14,
                maxWidth: 600,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              } as any}>
                {post.excerpt}
              </p>
            )}
            <span style={{ fontSize: 12, color: c.metaColor, display: 'block' }}>
              {post.author && `${post.author} · `}
              {post.publishedAt && new Date(post.publishedAt).toLocaleDateString('ar-MA', {
                month: 'long', day: 'numeric', year: 'numeric',
              })}
            </span>
          </div>
        </article>
      </Link>
    )
  }

  /* ── VERTICAL (medium / small) ───────────────────────────────── */
  return (
    <Link
      href={`/posts/${post.slug?.current}`}
      style={{ textDecoration: 'none', display: 'block', height: '100%' }}
    >
      <article
        style={{
          background: c.bg,
          borderRadius: 10,
          overflow: 'hidden',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          cursor: 'pointer',
          border: '1px solid var(--border)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-3px)'
          e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {/* Image */}
        {post.mainImage && c.showImage && (
          <div style={{
            width: '100%',
            height: c.imgHeight,
            overflow: 'hidden',
            flexShrink: 0,
          }}>
            <img
              src={post.mainImage}
              alt={post.mainImageAlt || post.title}
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                transition: 'transform 0.4s ease',
                display: 'block',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            />
          </div>
        )}

        {/* Content */}
        <div style={{ padding: c.padding, flex: 1, display: 'flex', flexDirection: 'column' }}>
          {post.categories?.[0] && (
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
              color: c.accentColor, display: 'block', marginBottom: 8,
            }}>
              {post.categories[0]}
            </span>
          )}
          <h2 style={{
            fontSize: c.titleSize,
            fontWeight: 700,
            lineHeight: 1.35,
            color: c.titleColor,
            marginBottom: 8,
            flex: 1,
          }}>
            {post.title}
          </h2>
          {c.showExcerpt && post.excerpt && (
            <p style={{
              fontSize: 13, lineHeight: 1.7,
              color: c.excerptColor,
              marginBottom: 14,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            } as any}>
              {post.excerpt}
            </p>
          )}
          <span style={{ fontSize: 11, color: c.metaColor, marginTop: 'auto', display: 'block' }}>
            {post.author && `${post.author} · `}
            {post.publishedAt && new Date(post.publishedAt).toLocaleDateString('ar-MA', {
              month: 'long', day: 'numeric', year: 'numeric',
            })}
          </span>
        </div>
      </article>
    </Link>
  )
}