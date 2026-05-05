'use client'
import { useTheme } from './ThemeContext'
import NavLinks from './NavLinks'
import Link from 'next/link'

export default function NavBar() {
  const { dark } = useTheme()
  return (
    <nav style={{
      background: dark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        maxWidth: 700,
        margin: '0 auto',
        padding: '0 24px',
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Link href="/">
          <img
            src="/logo.svg"
            alt="راووق"
            className="logo"
            style={{ height: 60, width: 'auto', cursor: 'pointer' }}
          />
        </Link>
        <NavLinks />
      </div>
    </nav>
  )
}