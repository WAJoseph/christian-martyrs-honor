'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  GalleryHorizontal,
  Clock,
  Users,
  Heart,
} from 'lucide-react'

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: '/',               icon: Home,                label: 'Home'      },
    { href: '/gallery',        icon: GalleryHorizontal,    label: 'Gallery'   },
    { href: '/timeline',       icon: Clock,               label: 'Timeline'  },
    { href: '/community',      icon: Users,               label: 'Community' },
    { href: '/donate',         icon: Heart,               label: 'Donate'    },
  ]

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="scroll-panel px-6 py-3">
        <div className="flex items-center space-x-6">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={
                  `icon-frame p-3 transition-all duration-300 hover:scale-110 group ` +
                  (isActive ? 'animate-glow' : '')
                }
              >
                <div className="icon-inner p-2">
                  <Icon
                    size={20}
                    className={
                      `transition-colors duration-300 ` +
                      (isActive
                        ? 'gold-text'
                        : 'text-slate-300 group-hover:gold-text')
                    }
                  />
                </div>
                <span className="sr-only">{label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
