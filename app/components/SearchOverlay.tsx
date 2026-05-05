'use client'
import { useState } from 'react'
import { useTheme } from './ThemeContext'

export default function SearchOverlay() {
  const { dark } = useTheme()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  return (
    <>
      {/* Search button */}
      <button
        onClick={() => setOpen(true)}
        style={{
          background: 'none', border: 'none',
          cursor: 'pointer', padding: 4,
          color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'center'
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
      </button>

      {/* Overlay */}
      {open && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: dark ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.97)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', paddingTop: 120,
        }}>
          <button
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute', top: 20, left: 24,
              background: 'none', border: 'none',
              fontSize: 28, cursor: 'pointer',
              color: dark ? '#fff' : '#000'
            }}
          >
            ✕
          </button>
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="ابحث في راووق..."
            style={{
              width: '90%', maxWidth: 600,
              fontSize: 28, padding: '16px 24px',
              border: 'none',
              borderBottom: `2px solid ${dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}`,
              background: 'transparent',
              color: dark ? '#fff' : '#000',
              outline: 'none',
              textAlign: 'right',
              direction: 'rtl',
            }}
          />
          <p style={{ marginTop: 16, fontSize: 14, color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}>
            اضغط Enter للبحث
          </p>
        </div>
      )}
    </>
  )
}