'use client'
import ThemeToggle from './ThemeToggle'

export default function NavLinks() {
  const links = ['أخبار', 'ذكاء اصطناعي', 'شركات ناشئة', 'عن المنصة']
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
      {links.map(item => (
        <a key={item} href="#" style={{ fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none' }}>
          {item}
        </a>
      ))}
      <ThemeToggle />
    </div>
  )
}