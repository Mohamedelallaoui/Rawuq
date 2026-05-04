import { client } from '@/sanity/lib/client'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      publishedAt,
      "author": author->name,
      "categories": categories[]->title,
      body
    }`,
    { slug }
  )

  if (!post) return notFound()

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '60px 24px', direction: 'rtl', fontFamily: 'sans-serif' }}>
      {post.categories?.[0] && (
        <span style={{
          fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: 'var(--accent)',
          display: 'block', marginBottom: 14
        }}>
          {post.categories[0]}
        </span>
      )}

      <h1 style={{ fontSize: 40, fontWeight: 600, lineHeight: 1.2, marginBottom: 16, color: 'var(--text-primary)' }}>
        {post.title}
      </h1>

      <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 48, borderBottom: '1px solid var(--border)', paddingBottom: 24 }}>
        {post.author && `${post.author} · `}
        {post.publishedAt && new Date(post.publishedAt).toLocaleDateString('ar-MA', {
          month: 'long', day: 'numeric', year: 'numeric'
        })}
      </p>

      {post.body ? (
        <div style={{ fontSize: 18, lineHeight: 2, color: 'var(--text-secondary)' }}>
          <PortableText value={post.body} />
        </div>
      ) : (
        <p style={{ color: 'var(--text-tertiary)' }}>لا يوجد محتوى.</p>
      )}
    </main>
  )
}

export async function generateStaticParams() {
  const posts = await client.fetch(`*[_type == "post"]{ slug }`)
  return posts.map((post: any) => ({ slug: post.slug.current }))
}