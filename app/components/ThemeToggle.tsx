'use client'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') {
      setDark(true)
      document.documentElement.setAttribute('data-theme', 'dark')
      document.body.setAttribute('data-theme', 'dark')
    }
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    const theme = next ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
    document.body.setAttribute('data-theme', theme)
    document.documentElement.style.backgroundColor = next ? '#000000' : '#ffffff'
    document.body.style.backgroundColor = next ? '#000000' : '#ffffff'
    localStorage.setItem('theme', theme)
  }

  return (
    <button
      onClick={toggle}
      style={{
        background: 'none',
        border: '1px solid var(--border)',
        borderRadius: 20,
        padding: '4px 12px',
        cursor: 'pointer',
        fontSize: 13,
        color: 'var(--text-secondary)',
        transition: 'all 0.2s',
      }}
    >
      {dark ? ' فاتح' : ' داكن'}
    </button>
  )
}