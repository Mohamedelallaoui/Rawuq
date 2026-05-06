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
      // isolation instead of z-index so the nav doesn't create a stacking
      // context that would trap the MegaMenu fixed panel behind it
      isolation: 'isolate',
      zIndex: 100,
      borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '0 16px', height: 44,
        display: 'flex', alignItems: 'center',
        // RTL layout: right → left
        direction: 'rtl',
      }}>

        {/*
          RTL order:
            [RIGHT] Logo  |  Desktop categories / hamburger  |  Theme + Search [LEFT]

          In RTL flex:
            - first child renders on the RIGHT
            - last child renders on the LEFT
        */}

        {/* RIGHT: Logo */}
        <Link
          href="/"
          style={{ lineHeight: 0, flexShrink: 0, marginInlineEnd: 16 }}
        >
          <img
            src="/logo.svg"
            alt="راووق"
            className="logo"
            style={{ height: 60, width: 'auto', cursor: 'pointer', display: 'block' }}
          />
        </Link>

        {/* MIDDLE: desktop category links OR (mobile) hamburger */}
        <div style={{
          flex: 1, minWidth: 0,
          display: 'flex', alignItems: 'center',
          // align desktop links to the right side of this space; on mobile
          // the hamburger naturally sits at the inline-start (visual left)
          justifyContent: 'flex-start',
        }}>
          <MegaMenu />
        </div>

        {/* LEFT: theme toggle + search */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          flexShrink: 0,
        }}>
          <ThemeToggle />
          <SearchOverlay />
        </div>

      </div>
    </nav>
  )
}