import Link from 'next/link'
import type { Metadata } from 'next'
import { Users } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { PageHeader, EmptyState } from '@/components/page-header'
import { getUsers } from '@/lib/data'
import { isStaffRole } from '@/lib/types'

export const metadata: Metadata = { title: 'Members' }

export default async function MembersPage() {
  const members = await getUsers(120)

  return (
    <div>
      <PageHeader
        title="Members"
        description="Everyone who calls Moonlight Haven home."
        icon={<Users className="size-5" />}
      />

      {members.length === 0 ? (
        <EmptyState
          title="No members found"
          description="Once your users collection has entries, they will appear here."
          icon={<Users className="size-6" />}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {members.map((m) => {
            const initials = (m.username || m.moonId || 'U').slice(0, 2).toUpperCase()
            return (
              <Link key={m.id} href={`/user/${m.moonId}`}>
                <Card className="glass h-full border-border/60 transition-colors hover:border-primary/50">
                  <CardContent className="flex items-center gap-3 p-4">
                    <Avatar className="size-12 ring-1 ring-border">
                      {m.avatarUrl ? (
                        <AvatarImage src={m.avatarUrl} alt={m.username} />
                      ) : null}
                      <AvatarFallback className="bg-primary/15 text-primary">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate font-medium">{m.username}</p>
                      <p className="truncate font-mono text-xs text-muted-foreground">
                        {m.moonId}
                      </p>
                    </div>
                    <Badge
                      variant={isStaffRole(m.role) ? 'default' : 'secondary'}
                      className={`ml-auto shrink-0 ${isStaffRole(m.role) ? 'bg-accent text-accent-foreground' : ''}`}
                    >
                      {m.role}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
