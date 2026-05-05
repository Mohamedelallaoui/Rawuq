import { client } from '@/sanity/lib/client'
import PostCard from '@/app/components/PostCard'
import NavBar from '@/app/components/NavBar'

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ cat: string }>
}) {
  const { cat } = await params
  const posts = await client.fetch(
    `*[_type == "post" && $cat in categories[]->title] | order(publishedAt desc) {
      _id, title, slug, publishedAt, excerpt,
      "author": author->name,
      "categories": categories[]->title,
      "mainImage": mainImage.asset->url,
      "mainImageAlt": mainImage.alt
    }`,
    { cat }
  )

  return (
    <div style={{ minHeight: '100vh', direction: 'rtl' }}>
      <NavBar />
      <main style={{ maxWidth: 980, margin: '0 auto', padding: '60px 24px' }}>
        <h1 style={{
          fontSize: 40, fontWeight: 700,
          color: 'var(--text-primary)', marginBottom: 48
        }}>
          {cat}
        </h1>
        {posts.length === 0 ? (
          <p style={{ color: 'var(--text-tertiary)' }}>لا توجد مقالات في هذا القسم بعد.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {posts.map((post: any, i: number) => (
              <div key={post._id} style={{ gridColumn: i === 0 ? 'span 3' : 'span 1' }}>
                <PostCard post={post} featured={i === 0} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}