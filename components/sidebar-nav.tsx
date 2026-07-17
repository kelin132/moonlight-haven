'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Moon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_SECTIONS, STAFF_NAV } from '@/lib/nav'
import { isStaffRole } from '@/lib/types'

export function SidebarNav({
  role,
  onNavigate,
}: {
  role: string
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  const sections = isStaffRole(role) ? [...NAV_SECTIONS, STAFF_NAV] : NAV_SECTIONS

  const isActive = (href: string) =>
    pathname === href || (href !== '/profile' && pathname.startsWith(href))

  return (
    <nav className="flex h-full flex-col gap-6 p-4" aria-label="Primary">
      <Link
        href="/profile"
        onClick={onNavigate}
        className="flex items-center gap-2.5 px-2"
      >
        <span className="flex size-9 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
          <Moon className="size-5 text-primary" />
        </span>
        <span className="text-lg font-semibold tracking-tight">
          Moonlight Haven
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-6 overflow-y-auto">
        {sections.map((section) => {
          const staff = section.title === 'Staff'
          return (
            <div key={section.title} className="flex flex-col gap-1">
              <p
                className={cn(
                  'px-3 pb-1 text-xs font-medium uppercase tracking-wider',
                  staff ? 'text-accent' : 'text-muted-foreground',
                )}
              >
                {section.title}
              </p>
              {section.items.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      active
                        ? 'bg-primary/15 text-primary'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                    )}
                    aria-current={active ? 'page' : undefined}
                  >
                    <item.icon className="size-4 shrink-0" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          )
        })}
      </div>
    </nav>
  )
}
