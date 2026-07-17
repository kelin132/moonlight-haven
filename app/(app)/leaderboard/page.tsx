import Link from 'next/link'
import type { Metadata } from 'next'
import { Coins, Trophy } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { PageHeader, EmptyState } from '@/components/page-header'
import { getLeaderboard } from '@/lib/data'
import { cn } from '@/lib/utils'

export const metadata: Metadata = { title: 'Leaderboard' }

const RANK_STYLES: Record<number, string> = {
  1: 'bg-accent text-accent-foreground',
  2: 'bg-secondary text-secondary-foreground',
  3: 'bg-primary/20 text-primary',
}

export default async function LeaderboardPage() {
  const users = await getLeaderboard(50)

  return (
    <div>
      <PageHeader
        title="Leaderboard"
        description="The most legendary members of Moonlight Haven."
        icon={<Trophy className="size-5" />}
      />

      {users.length === 0 ? (
        <EmptyState
          title="No rankings yet"
          description="Rankings appear as members earn levels, XP, and coins."
          icon={<Trophy className="size-6" />}
        />
      ) : (
        <div className="flex flex-col gap-2">
          {users.map((u, i) => {
            const rank = i + 1
            const initials = (u.username || u.moonId).slice(0, 2).toUpperCase()
            return (
              <Link key={u.id} href={`/user/${u.moonId}`}>
                <Card className="glass border-border/60 transition-colors hover:border-primary/50">
                  <CardContent className="flex items-center gap-4 p-3 sm:p-4">
                    <span
                      className={cn(
                        'flex size-9 shrink-0 items-center justify-center rounded-lg text-sm font-semibold',
                        RANK_STYLES[rank] ?? 'bg-secondary text-muted-foreground',
                      )}
                    >
                      {rank}
                    </span>
                    <Avatar className="size-10 ring-1 ring-border">
                      {u.avatarUrl ? (
                        <AvatarImage src={u.avatarUrl} alt={u.username} />
                      ) : null}
                      <AvatarFallback className="bg-primary/15 text-primary">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{u.username}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        Level {u.level} · {u.xp.toLocaleString()} XP
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent">
                      <Coins className="size-4" />
                      {u.coins.toLocaleString()}
                    </div>
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
