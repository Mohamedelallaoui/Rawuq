'use client'
import { useTheme } from './ThemeContext'

export default function ThemeToggle() {
  const { dark, toggle } = useTheme()
  return (
    <button onClick={toggle} style={{
      background: 'none',
      border: `1px solid ${dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'}`,
      borderRadius: 20, padding: '4px 12px',
      cursor: 'pointer', fontSize: 13,
      color: dark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
    }}>
      {dark ? ' فاتح' : ' داكن'}
    </button>
  )
}