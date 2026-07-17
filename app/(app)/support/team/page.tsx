import type { Metadata } from 'next'
import { ShieldCheck } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { PageHeader, EmptyState } from '@/components/page-header'
import { getTeam } from '@/lib/data'
import { isStaffRole } from '@/lib/types'

export const metadata: Metadata = { title: 'Support Team' }

export default async function TeamPage() {
  const team = await getTeam()

  return (
    <div>
      <PageHeader
        title="Support Team"
        description="The people keeping Moonlight Haven running."
        icon={<ShieldCheck className="size-5" />}
      />

      {team.length === 0 ? (
        <EmptyState
          title="No team members listed"
          description="Add a team collection or staff-role users to populate this page."
          icon={<ShieldCheck className="size-6" />}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => {
            const initials = (m.username || 'U').slice(0, 2).toUpperCase()
            return (
              <Card key={m.id} className="glass border-border/60">
                <CardContent className="flex flex-col gap-3 p-5">
                  <div className="flex items-center gap-3">
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
                      <Badge
                        variant={isStaffRole(m.role) ? 'default' : 'secondary'}
                        className={`mt-0.5 ${isStaffRole(m.role) ? 'bg-accent text-accent-foreground' : ''}`}
                      >
                        {m.role}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground text-pretty">
                    {m.description || 'No description provided.'}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
