import { client } from '@/sanity/lib/client'
import PostCard from './components/PostCard'
import NavBar from './components/NavBar'
import SocialIcons from './components/SocialIcons'

async function getPosts() {
  return client.fetch(`*[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, publishedAt, excerpt,
    "author": author->name,
    "categories": categories[]->title,
    "mainImage": mainImage.asset->url,
    "mainImageAlt": mainImage.alt
  }`)
}

export default async function Home() {
  const posts = await getPosts()

  const hero      = posts[0]
  const secondary = posts.slice(1, 3)
  const tertiary  = posts.slice(3, 6)
  const rest      = posts.slice(6)

  return (
    <div style={{ minHeight: '100vh', direction: 'rtl', background: 'var(--bg)' }}>
      <NavBar />

      {/* ── NEWSPAPER MASTHEAD ─────────────────────────────────────── */}
      <header style={{
        background: 'var(--bg)',
        padding: '5px 8px 4px',
        textAlign: 'center',
         overflow: 'hidden', // ← clip anything that sticks out
      }}>
        <div style={{ borderTop: 0 , marginBottom: 6 }} />

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: 1100,
          margin: '0 auto',
          gap: 8,
        }}>
          {/* Date — hidden on mobile to give logo room */}
          <span className="masthead-meta" style={{
            fontSize: 11, color: 'var(--text-tertiary)',
            letterSpacing: '0.04em', whiteSpace: 'nowrap',
          }}>
            {new Date().toLocaleDateString('ar-SA', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            })}
          </span>

          {/* Logo — constrained so it never blows up on mobile */}
          <div style={{ flex: 1, textAlign: 'center' }}>
            <img
              src="/logo.svg"
              alt="راووق"
              className="logo masthead-logo"
              style={{ margin: '0 auto', display: 'block', height: 120, width: 'auto'}}
            />
            <p style={{
              fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'var(--text-tertiary)', marginTop: -20,
            }}>
              منصة أخبار التقنية
            </p>
          </div>

          {/* Edition — hidden on mobile */}
          <span className="masthead-meta" style={{
            fontSize: 11, color: 'var(--text-tertiary)',
            letterSpacing: '0.04em', whiteSpace: 'nowrap',
          }}>
            الإصدار الرقمي
          </span>
        </div>

        <div style={{ borderTop: 0, marginTop: 6 }} />
      </header>

      {posts.length === 0 ? (
        <main style={{ maxWidth: 1100, margin: '0 auto', padding: '0 12px 64px' }}>
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ color: 'var(--text-tertiary)', fontSize: 17 }}>لا توجد مقالات بعد.</p>
            <a href="/studio" style={{
              display: 'inline-block', marginTop: 16,
              fontSize: 15, color: 'var(--accent)', textDecoration: 'none',
            }}>
              أضف أول مقال في الاستوديو ←
            </a>
          </div>
        </main>
      ) : (
        <>
          {/* ── TIER 1: HERO — FULL WIDTH (outside main container) ── */}
          {hero && (
            <section style={{
              width: '100%',
              borderBottom: '2px solid var(--text-primary)',
            }}>
              <PostCard post={hero} featured />
            </section>
          )}

          {/* ── MAIN CONTENT ───────────────────────────────────────── */}
          <main style={{ maxWidth: 1100, margin: '0 auto', padding: '0 12px 64px' }}>

            {/* ── TIER 2: TWO SECONDARY STORIES ───────────────────── */}
            {secondary.length > 0 && (
              <section style={{ borderBottom: 0 }}>
                <div className="np-two-col">
                  {secondary.map((post: any, i: number) => (
                    <div key={post._id}
                      className={i === 1 ? 'np-two-col__border' : ''}
                      style={{ padding: '20px 0' }}
                    >
                      <PostCard post={post} size="medium" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── SECTION LABEL ────────────────────────────────────── */}
            {tertiary.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 0 0' }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.15em',
                  textTransform: 'uppercase', color: 'var(--accent)', whiteSpace: 'nowrap',
                }}>أحدث الأخبار</span>
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              </div>
            )}

            {/* ── TIER 3: THREE TERTIARY STORIES ───────────────────── */}
            {tertiary.length > 0 && (
              <section style={{ borderBottom: 0 }}>
                <div className="np-three-col">
                  {tertiary.map((post: any, i: number) => (
                    <div key={post._id}
                      className={i > 0 ? 'np-three-col__border' : ''}
                      style={{ padding: '16px 0' }}
                    >
                      <PostCard post={post} size="small" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── REST: COMPACT LIST ────────────────────────────────── */}
            {rest.length > 0 && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 0 0' }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.15em',
                    textTransform: 'uppercase', color: 'var(--text-secondary)', whiteSpace: 'nowrap',
                  }}>المزيد من المقالات</span>
                  <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                </div>
                <section style={{ padding: '4px 0' }}>
                  <div className="np-four-col">
                    {rest.map((post: any) => (
                      <div key={post._id} style={{ padding: '14px 0', borderBottom: 0 }}>
                        <PostCard post={post} size="compact" />
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

          </main>
        </>
      )}

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer style={{
        borderTop: '3px double var(--border)',
        padding: '32px 16px',
        textAlign: 'center',
        background: 'var(--bg-secondary)',
      }}>
        <img src="/logo.svg" alt="راووق" className="logo"
          style={{ height: 24, opacity: 0.5, display: 'block', margin: '0 auto 12px' }} />
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
          <SocialIcons color="var(--text-tertiary)" />
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
          © {new Date().getFullYear()} راووق. جميع الحقوق محفوظة.
        </p>
      </footer>

      <style>{`
        /* ── Masthead logo: small on mobile, larger on desktop ── */
        .masthead-logo {
          height: 28px;
          width: auto;
          max-width: 120px;
        }
        @media (min-width: 640px) {
          .masthead-logo { height: 36px; max-width: 160px; }
        }

        /* ── Hide date/edition on small screens ── */
        @media (max-width: 479px) {
          .masthead-meta { display: none; }
        }

        /* ── Two-column grid ─────────────────────────── */
        .np-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 16px;
        }
        .np-two-col__border {
          border-right: 0;
          padding-right: 16px;
        }
        @media (max-width: 599px) {
          .np-two-col { grid-template-columns: 1fr; gap: 0; }
          .np-two-col__border {
            border-right: none; padding-right: 0;
            border-top: 0;
          }
        }

        /* ── Three-column grid ───────────────────────── */
        .np-three-col {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0 16px;
        }
        .np-three-col__border {
          border-right: 0;
          padding-right: 16px;
        }
        @media (max-width: 767px) {
          .np-three-col { grid-template-columns: 1fr 1fr; }
          .np-three-col__border { border-right: none; padding-right: 0; }
          .np-three-col > div:nth-child(even) {
            border-right: 0; padding-right: 12px;
          }
          .np-three-col > div { border-bottom: 0; }
          .np-three-col > div:last-child { border-bottom: none; }
        }
        @media (max-width: 479px) {
          .np-three-col { grid-template-columns: 1fr; }
          .np-three-col > div:nth-child(even) {
            border-right: none !important; padding-right: 0 !important;
          }
        }

        /* ── Four-column grid ───────────────────────── */
        .np-four-col {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0 20px;
        }
        @media (max-width: 899px) {
          .np-four-col { grid-template-columns: 1fr 1fr; gap: 0 14px; }
        }
        @media (max-width: 499px) {
          .np-four-col { grid-template-columns: 1fr; gap: 0; }
        }
      `}</style>
    </div>
  )
}