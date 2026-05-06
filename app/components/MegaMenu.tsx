'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from './ThemeContext'
import { categories } from '../config/categories'
import Link from 'next/link'

export default function MegaMenu() {
  const { dark } = useTheme()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDesktop, setActiveDesktop] = useState<string | null>(null)
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  // Fix: use number (browser setTimeout returns number, not NodeJS.Timeout)
  const closeTimer = useRef<number | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleMouseEnter = (name: string) => {
    if (closeTimer.current !== null) clearTimeout(closeTimer.current)
    setActiveDesktop(name)
  }

  const handleMouseLeave = () => {
    closeTimer.current = window.setTimeout(() => setActiveDesktop(null), 200)
  }

  const handleSearch = () => {
    const q = searchQuery.trim()
    if (!q) return
    setMobileOpen(false)
    setSearchQuery('')
    router.push(`/search?q=${encodeURIComponent(q)}`)
  }

  const handleSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch()
  }

  const activeCat = categories.find(c => c.name === activeDesktop)

  const navBg       = dark ? 'rgba(18,18,18,0.98)' : 'rgba(255,255,255,0.98)'
  const textColor    = dark ? '#f5f5f7' : '#1d1d1f'
  const subTextColor = dark ? '#a1a1a6' : '#6e6e73'
  const borderColor  = dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
  const bg           = dark ? '#000' : '#fff'
  const inputBg      = dark ? '#1c1c1e' : '#f5f5f7'

  return (
    <>
      {/* ── DESKTOP CATEGORY LINKS ─────────────────────────────── */}
      <div className="mega-desktop-menu" style={{ display: 'flex', alignItems: 'center' }}>
        {categories.map(cat => (
          <div
            key={cat.name}
            onMouseEnter={() => handleMouseEnter(cat.name)}
            onMouseLeave={handleMouseLeave}
            style={{ position: 'relative' }}
          >
            <Link
              href={`/category/${encodeURIComponent(cat.name)}`}
              style={{
                fontSize: 13,
                color: activeDesktop === cat.name ? textColor : subTextColor,
                textDecoration: 'none',
                padding: '0 12px',
                height: 44,
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.2s',
                whiteSpace: 'nowrap',
                fontWeight: activeDesktop === cat.name ? 600 : 400,
              }}
            >
              {cat.name}
            </Link>
          </div>
        ))}
      </div>

      {/* ── DESKTOP DROPDOWN ─────────────────────────────────────── */}
      {activeDesktop && activeCat && (
        <div
          onMouseEnter={() => handleMouseEnter(activeDesktop)}
          onMouseLeave={handleMouseLeave}
          style={{
            position: 'fixed', top: 44, left: 0, right: 0, zIndex: 999,
            background: navBg, backdropFilter: 'blur(20px)',
            borderBottom: `1px solid ${borderColor}`,
            padding: '28px 0',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }}
        >
          <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', direction: 'rtl' }}>
            <p style={{
              fontSize: 11, fontWeight: 600, color: 'var(--accent)',
              letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16,
            }}>
              {activeCat.name}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px 0' }}>
              <Link
                href={`/category/${encodeURIComponent(activeCat.name)}`}
                style={{
                  fontSize: 26, fontWeight: 700, color: textColor,
                  textDecoration: 'none', padding: '4px 0',
                  width: '100%', display: 'block',
                }}
              >
                كل {activeCat.name}
              </Link>
              {activeCat.sub.map(sub => (
                <Link
                  key={sub}
                  href={`/category/${encodeURIComponent(sub)}`}
                  style={{
                    fontSize: 22, fontWeight: 600, color: subTextColor,
                    textDecoration: 'none', padding: '4px 0',
                    width: '100%', display: 'block',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = textColor)}
                  onMouseLeave={e => (e.currentTarget.style.color = subTextColor)}
                >
                  {sub}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── MOBILE HAMBURGER BUTTON ───────────────────────────────── */}
      <button
        className="mega-mobile-btn"
        onClick={() => setMobileOpen(v => !v)}
        aria-label={mobileOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          padding: '8px 4px',
          color: dark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.75)',
          display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <span style={{
          display: 'block', width: 22, height: 1.5,
          background: 'currentColor', transition: 'all 0.3s',
          transform: mobileOpen ? 'rotate(45deg) translateY(6.5px)' : 'none',
        }} />
        <span style={{
          display: 'block', width: 22, height: 1.5,
          background: 'currentColor', transition: 'all 0.3s',
          opacity: mobileOpen ? 0 : 1,
        }} />
        <span style={{
          display: 'block', width: 22, height: 1.5,
          background: 'currentColor', transition: 'all 0.3s',
          transform: mobileOpen ? 'rotate(-45deg) translateY(-6.5px)' : 'none',
        }} />
      </button>

      {/* ── MOBILE FULL-SCREEN PANEL ──────────────────────────────── */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', inset: 0,
          // 9999 ensures it escapes any stacking context in the nav
          zIndex: 9999,
          background: bg, overflowY: 'auto',
          direction: 'rtl',
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
        }}>

          {/* Panel header — logo RIGHT, close LEFT (RTL) */}
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px', height: 44,
            borderBottom: `1px solid ${borderColor}`,
            position: 'sticky', top: 0, background: bg, zIndex: 1,
            direction: 'rtl',
          }}>
            <Link href="/" onClick={() => setMobileOpen(false)}>
              <img src="/logo.svg" alt="راووق" className="logo" style={{ height: 18 }} />
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="إغلاق"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                width: 32, height: 32, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                color: subTextColor, fontSize: 20, lineHeight: 1,
                borderRadius: 6,
              }}
            >
              ✕
            </button>
          </div>

          {/* ── SEARCH BAR ── */}
          <div style={{ padding: '10px 14px', borderBottom: `1px solid ${borderColor}` }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', direction: 'rtl' }}>
              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKey}
                placeholder="ابحث في راووق..."
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                style={{
                  flex: 1, minWidth: 0,
                  height: 38,
                  padding: '0 12px',
                  border: `1px solid ${borderColor}`,
                  borderRadius: 8,
                  fontSize: 16,
                  background: inputBg,
                  color: textColor,
                  outline: 'none',
                  direction: 'rtl',
                  WebkitAppearance: 'none',
                  boxSizing: 'border-box',
                }}
              />
              <button
                onClick={handleSearch}
                style={{
                  height: 38, width: 64, flexShrink: 0,
                  background: searchQuery.trim() ? 'var(--accent)' : (dark ? '#3a3a3c' : '#d2d2d7'),
                  color: searchQuery.trim() ? '#fff' : subTextColor,
                  border: 'none', borderRadius: 8,
                  fontSize: 14, fontWeight: 600,
                  cursor: searchQuery.trim() ? 'pointer' : 'default',
                  transition: 'background 0.2s',
                }}
              >
                بحث
              </button>
            </div>
          </div>

          {/* ── HOME LINK ── */}
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0 16px', height: 52,
              fontSize: 16, fontWeight: 600,
              color: textColor, textDecoration: 'none',
              borderBottom: `1px solid ${borderColor}`,
            }}
          >
            الرئيسية
            <span style={{ color: subTextColor, fontSize: 18 }}>‹</span>
          </Link>

          {/* ── CATEGORIES WITH ACCORDION ── */}
          {categories.map(cat => (
            <div key={cat.name} style={{ borderBottom: `1px solid ${borderColor}` }}>
              <button
                onClick={() =>
                  setExpandedMobile(expandedMobile === cat.name ? null : cat.name)
                }
                style={{
                  width: '100%', background: 'none', border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0 16px', height: 52, cursor: 'pointer',
                  color: textColor, direction: 'rtl',
                }}
              >
                <span style={{ fontSize: 16, fontWeight: 600 }}>{cat.name}</span>
                <span style={{
                  fontSize: 18, color: subTextColor,
                  transition: 'transform 0.25s',
                  display: 'inline-block',
                  transform: expandedMobile === cat.name ? 'rotate(-90deg)' : 'rotate(0deg)',
                }}>
                  ‹
                </span>
              </button>

              {expandedMobile === cat.name && (
                <div style={{ background: dark ? '#111' : '#fafafa', padding: '4px 0' }}>
                  <Link
                    href={`/category/${encodeURIComponent(cat.name)}`}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '0 24px', height: 44,
                      fontSize: 15, fontWeight: 600,
                      color: 'var(--accent)', textDecoration: 'none',
                      borderBottom: `1px solid ${borderColor}`,
                    }}
                  >
                    كل {cat.name}
                  </Link>
                  {cat.sub.map(sub => (
                    <Link
                      key={sub}
                      href={`/category/${encodeURIComponent(sub)}`}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        display: 'flex', alignItems: 'center',
                        padding: '0 24px', height: 44,
                        fontSize: 15, color: subTextColor,
                        textDecoration: 'none',
                        borderBottom: `1px solid ${borderColor}`,
                      }}
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div style={{ height: 'env(safe-area-inset-bottom, 20px)', minHeight: 20 }} />
        </div>
      )}

      <style>{`
        @media (max-width: 768px)  { .mega-desktop-menu { display: none !important; } }
        @media (min-width: 769px)  { .mega-mobile-btn   { display: none !important; } }
      `}</style>
    </>
  )
}