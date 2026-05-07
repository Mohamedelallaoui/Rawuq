'use client'
import { useTheme } from './ThemeContext'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import SearchOverlay from './SearchOverlay'
import MegaMenu from './MegaMenu'

export default function NavBar() {
  const { dark } = useTheme()

  return (
    <nav style={{
      background: dark ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(20px)',
      position: 'sticky', top: 0,
      // Do NOT set z-index here — use isolation so the nav forms its own
      // stacking context without trapping the MegaMenu fixed panel.
      isolation: 'isolate',
      zIndex: 100,
      borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        // Use LTR layout with explicit placement so we fully control order:
        //   [Logo RIGHT] ... [Categories/Hamburger MIDDLE] ... [Icons LEFT]
        padding: '0 16px', height: 44,
        display: 'flex', alignItems: 'center',
       flexDirection: 'row-reverse',         // LTR — we place items manually
        justifyContent: 'space-between',
      }}>

        {/* ── LEFT side: icons (theme + search) ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <SearchOverlay />
          <ThemeToggle />
        </div>

        {/* ── MIDDLE: desktop categories OR mobile hamburger ── */}
        {/*
          flex: 1 fills the space between the two fixed sides.
          On mobile the desktop links are display:none, leaving only the
          hamburger button which is naturally the sole child → sits at
          flex-start = visual LEFT edge of this slot = far left of page.
          On desktop the category links fill this space from the right.
        */}
        <div style={{
          flex: 1, minWidth: 0,
          display: 'flex', alignItems: 'center',
          justifyContent: 'flex-end',   // push desktop links toward the logo (right)
        }}>
          <MegaMenu />
        </div>

        {/* ── RIGHT side: Logo ── */}
        <Link
          href="/"
          style={{ lineHeight: 0, flexShrink: 0, marginInlineStart: 12 }}
        >
          <img
            src="/logo.svg"
            alt="راووق"
            className="logo"
            style={{ height: 70, width: 'auto', cursor: 'pointer', display: 'block' }}
          />
        </Link>

      </div>
    </nav>
  )
}