import Link from 'next/link'
import type { Metadata } from 'next'
import { BookOpen, LifeBuoy, MessageSquare, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PageHeader } from '@/components/page-header'

export const metadata: Metadata = { title: 'Support' }

const LINKS = [
  {
    title: 'Meet the Team',
    desc: 'See the staff and moderators here to help.',
    href: '/support/team',
    icon: Users,
  },
  {
    title: 'Community Chat',
    desc: 'Ask questions and get help from members.',
    href: '/chat',
    icon: MessageSquare,
  },
  {
    title: 'Rules & Guidelines',
    desc: 'Read the community rules before posting.',
    href: '/rules',
    icon: BookOpen,
  },
]

export default function SupportPage() {
  return (
    <div>
      <PageHeader
        title="Support"
        description="Need a hand? Here is where to go."
        icon={<LifeBuoy className="size-5" />}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LINKS.map((l) => (
          <Card key={l.href} className="glass border-border/60">
            <CardContent className="flex flex-col gap-3 p-5">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <l.icon className="size-5" />
              </span>
              <div>
                <h3 className="font-semibold">{l.title}</h3>
                <p className="text-sm text-muted-foreground text-pretty">{l.desc}</p>
              </div>
              <Button asChild variant="secondary" className="mt-1 w-full">
                <Link href={l.href}>Open</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
