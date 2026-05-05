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
      position: 'sticky', top: 0, zIndex: 100,
      borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '0 24px', height: 44,
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link href="/">
          <img
            src="/logo.svg"
            alt="راووق"
            className="logo"
            style={{ height: 60, width: 'auto', cursor: 'pointer' }}
          />
        </Link>

        {/* Desktop categories in center */}
        <MegaMenu />

        {/* Right icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <ThemeToggle />
          <SearchOverlay />
        </div>
      </div>
    </nav>
  )
}