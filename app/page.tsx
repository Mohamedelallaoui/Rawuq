import { client } from '@/sanity/lib/client'
import PostCard from './components/PostCard'
import NavLinks from './components/NavLinks'

async function getPosts() {
  return client.fetch(`*[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, publishedAt, excerpt,
    "author": author->name,
    "categories": categories[]->title
  }`)
}

export default async function Home() {
  const posts = await getPosts()

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', direction: 'rtl', fontFamily: 'sans-serif' }}>

      <nav style={{
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(20px)',
        background: 'rgba(255,255,255,0.85)',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '0 24px', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
         <img src="/logo.svg" alt="راووق" style={{ height: 50, width: 'auto' }} />
          <NavLinks />
        </div>
      </nav>

      <section style={{ background: 'var(--bg-secondary)', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
            منصة أخبار التقنية
          </p>
          <h1 style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.2, color: 'var(--text-primary)', marginBottom: 20 }}>
            مستقبل التقنية،<br />بلا فلتر.
          </h1>
          <p style={{ fontSize: 19, color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300 }}>
            رَوُق يغطي الذكاء الاصطناعي، الشركات الناشئة، الأمن السيبراني، وكل ما يصنع الغد.
          </p>
        </div>
      </section>

      <section style={{ maxWidth: 980, margin: '0 auto', padding: '64px 24px' }}>
        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ color: 'var(--text-tertiary)', fontSize: 17 }}>لا توجد مقالات بعد.</p>
            <a href="/studio" style={{ display: 'inline-block', marginTop: 16, fontSize: 15, color: 'var(--accent)', textDecoration: 'none' }}>
              أضف أول مقال في الاستوديو ←
            </a>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2 }}>
            {posts.map((post: any, i: number) => (
              <div key={post._id} style={{ gridColumn: i === 0 ? 'span 2' : 'span 1' }}>
                <PostCard post={post} featured={i === 0} />
              </div>
            ))}
          </div>
        )}
      </section>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '32px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>
          © {new Date().getFullYear()}   .جميع الحقوق محفوظة لرَاوُوق.
        </p>
      </footer>

    </div>
  )
}