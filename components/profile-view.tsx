import Link from 'next/link'
import { Coins, Pencil, Sparkles, Star, Zap } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { isStaffRole, type AppUser } from '@/lib/types'

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string | number
}) {
  return (
    <Card className="glass border-border/60">
      <CardContent className="flex items-center gap-3 p-4">
        <span className="flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
          {icon}
        </span>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-lg font-semibold">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function ProfileView({
  user,
  isOwner = false,
}: {
  user: AppUser
  isOwner?: boolean
}) {
  const initials = (user.username || user.moonId || 'U').slice(0, 2).toUpperCase()

  return (
    <div className="flex flex-col gap-6">
      {/* Banner + identity */}
      <div className="overflow-hidden rounded-2xl border border-border/60">
        <div className="relative h-40 w-full sm:h-56">
          {user.bannerUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.bannerUrl}
              alt=""
              className="size-full object-cover"
            />
          ) : (
            <div className="size-full bg-gradient-to-br from-primary/25 via-card to-card" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        </div>

        <div className="relative -mt-14 flex flex-col gap-4 px-5 pb-5 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <Avatar className="size-24 rounded-2xl ring-4 ring-card sm:size-28">
              {user.avatarUrl ? (
                <AvatarImage src={user.avatarUrl} alt={user.username} />
              ) : null}
              <AvatarFallback className="rounded-2xl bg-primary/20 text-2xl text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="pb-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-semibold tracking-tight">
                  {user.username}
                </h1>
                <Badge
                  variant={isStaffRole(user.role) ? 'default' : 'secondary'}
                  className={isStaffRole(user.role) ? 'bg-accent text-accent-foreground' : ''}
                >
                  {user.role}
                </Badge>
              </div>
              <p className="mt-0.5 font-mono text-sm text-muted-foreground">
                {user.moonId}
              </p>
            </div>
          </div>

          {isOwner ? (
            <Button
              render={<Link href="/profile/edit" />}
              variant="secondary"
              className="self-start sm:self-auto"
            >
              <Pencil className="size-4" />
              Edit Profile
            </Button>
          ) : null}
        </div>
      </div>

      {/* Bio */}
      <Card className="glass border-border/60">
        <CardContent className="p-5">
          <h2 className="mb-2 text-sm font-medium text-muted-foreground">About</h2>
          <p className="text-pretty leading-relaxed">
            {user.bio || 'This member has not written a bio yet.'}
          </p>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat icon={<Star className="size-5" />} label="Level" value={user.level} />
        <Stat icon={<Zap className="size-5" />} label="XP" value={user.xp.toLocaleString()} />
        <Stat icon={<Coins className="size-5" />} label="Coins" value={user.coins.toLocaleString()} />
        <Stat
          icon={<Sparkles className="size-5" />}
          label="Member since"
          value={user.createdAt ? new Date(user.createdAt).getFullYear() : '—'}
        />
      </div>
    </div>
  )
}
