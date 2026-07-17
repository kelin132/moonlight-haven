import {
  Bot,
  Coins,
  Dices,
  LayoutDashboard,
  LifeBuoy,
  Map,
  MessageSquare,
  ScrollText,
  ShieldAlert,
  ShoppingBag,
  Sparkles,
  Trophy,
  User,
  Users,
  Users2,
  type LucideIcon,
} from 'lucide-react'

export type NavItem = {
  label: string
  href: string
  icon: LucideIcon
}

export type NavSection = {
  title: string
  items: NavItem[]
}

export const NAV_SECTIONS: NavSection[] = [
  {
    title: 'Community',
    items: [
      { label: 'Profile', href: '/profile', icon: User },
      { label: 'Members', href: '/members', icon: Users },
      { label: 'Guilds', href: '/guild', icon: Users2 },
      { label: 'Leaderboard', href: '/leaderboard', icon: Trophy },
      { label: 'Chat', href: '/chat', icon: MessageSquare },
    ],
  },
  {
    title: 'Collection',
    items: [
      { label: 'Shop', href: '/shop', icon: ShoppingBag },
      { label: 'Cards', href: '/cards', icon: Sparkles },
      { label: 'Map', href: '/mape', icon: Map },
    ],
  },
  {
    title: 'Casino',
    items: [
      { label: 'Casino', href: '/casinos/casino', icon: Dices },
      { label: 'Slots', href: '/casinos/slots', icon: Coins },
      { label: 'Betting', href: '/casinos/bet', icon: Trophy },
    ],
  },
  {
    title: 'More',
    items: [
      { label: 'Rules', href: '/rules', icon: ScrollText },
      { label: 'Support', href: '/support', icon: LifeBuoy },
      { label: 'Add Bot', href: '/add-bot', icon: Bot },
      { label: 'Legacy', href: '/lagacy', icon: ScrollText },
    ],
  },
]

export const STAFF_NAV: NavSection = {
  title: 'Staff',
  items: [
    { label: 'Members', href: '/moon/members', icon: Users },
    { label: 'Guilds', href: '/moon/guilds', icon: Users2 },
    { label: 'Chat', href: '/moon/chat', icon: MessageSquare },
    { label: 'Suspends', href: '/moon/suspends', icon: ShieldAlert },
  ],
}

export const DASHBOARD_ICON = LayoutDashboard
