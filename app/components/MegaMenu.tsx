'use client'
import { useState, useRef } from 'react'
import { useTheme } from './ThemeContext'
import { categories } from '../config/categories'
import Link from 'next/link'

export default function MegaMenu() {
  const { dark } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDesktop, setActiveDesktop] = useState<string | null>(null)
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null)

  // ✅ FIXED: proper typing + initial value
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = (name: string) => {
    // ✅ FIXED: safe clear
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
    }
    setActiveDesktop(name)
  }

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setActiveDesktop(null), 200)
  }

  const activeCat = categories.find(c => c.name === activeDesktop)
  const navBg = dark ? 'rgba(30,30,30,0.98)' : 'rgba(255,255,255,0.98)'
  const textColor = dark ? '#f5f5f7' : '#1d1d1f'
  const subTextColor = dark ? '#a1a1a6' : '#6e6e73'
  const borderColor = dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
  const bg = dark ? '#000' : '#fff'

  return (
    <>
      {/* DESKTOP MENU */}
      <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center' }}>
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
                color: activeDesktop === cat.name ? (dark ? '#fff' : '#000') : subTextColor,
                textDecoration: 'none',
                padding: '0 12px',
                height: 44,
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              {cat.name}
            </Link>
          </div>
        ))}
      </div>

      {/* Desktop Dropdown */}
      {activeDesktop && activeCat && (
        <div
          onMouseEnter={() => handleMouseEnter(activeDesktop)}
          onMouseLeave={handleMouseLeave}
          style={{
            position: 'fixed',
            top: 44,
            left: 0,
            right: 0,
            zIndex: 999,
            background: navBg,
            backdropFilter: 'blur(20px)',
            borderBottom: `1px solid ${borderColor}`,
            padding: '32px 0',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }}
        >
          <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', direction: 'rtl' }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: subTextColor,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 20,
              }}
            >
              {activeCat.name}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Link
                href={`/category/${encodeURIComponent(activeCat.name)}`}
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: textColor,
                  textDecoration: 'none',
                  padding: '4px 0',
                }}
              >
                كل {activeCat.name}
              </Link>

              {activeCat.sub.map(sub => (
                <Link
                  key={sub}
                  href={`/category/${encodeURIComponent(sub)}`}
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: textColor,
                    textDecoration: 'none',
                    padding: '4px 0',
                    opacity: 0.5,
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0.5')}
                >
                  {sub}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MOBILE BUTTON */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 4,
          color: dark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
          alignItems: 'center',
        }}
      >
        <span style={{ width: 22, height: 1.5, background: 'currentColor' }} />
        <span style={{ width: 22, height: 1.5, background: 'currentColor' }} />
        <span style={{ width: 22, height: 1.5, background: 'currentColor' }} />
      </button>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 998,
            background: bg,
            overflowY: 'auto',
            direction: 'rtl',
          }}
        >
          {categories.map(cat => (
            <div key={cat.name}>
              <button
                onClick={() =>
                  setExpandedMobile(expandedMobile === cat.name ? null : cat.name)
                }
              >
                {cat.name}
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  )
}