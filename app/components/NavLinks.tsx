'use client'
import ThemeToggle from './ThemeToggle'
import { useTheme } from './ThemeContext'

export default function NavLinks() {
  const { dark } = useTheme()
  const links = ['أخبار', 'ذكاء اصطناعي', 'شركات ناشئة', 'عن المنصة']
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
      {links.map(item => (
        <a key={item} href="#" style={{
          fontSize: 13,
          color: dark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
          textDecoration: 'none',
        }}>
          {item}
        </a>
      ))}
      <ThemeToggle />
    </div>
  )
}