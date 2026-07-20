import type { Metadata } from 'next'
import { ExternalLink, Users2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { PageHeader, EmptyState } from '@/components/page-header'
import { getGuilds } from '@/lib/data'

export const metadata: Metadata = { title: 'Guilds' }

export default async function GuildPage() {
  const guilds = await getGuilds()

  return (
    <div>
      <PageHeader
        title="Guilds"
        description="Discover and preview every guild in Moonlight Haven."
        icon={<Users2 className="size-5" />}
      />

      {guilds.length === 0 ? (
        <EmptyState
          title="No guilds yet"
          description="Guilds from your database will show up here with preview cards."
          icon={<Users2 className="size-6" />}
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guilds.map((g) => (
            <Card
              key={g.id}
              className="glass flex flex-col overflow-hidden border-border/60 pt-0"
            >
              <div className="relative h-40 w-full overflow-hidden bg-secondary">
                {g.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={g.imageUrl}
                    alt={g.name}
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center bg-gradient-to-br from-primary/25 to-card">
                    <Users2 className="size-10 text-primary/70" />
                  </div>
                )}
              </div>

              <CardHeader className="gap-1">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg font-semibold leading-tight">{g.name}</h2>
                  {g.tag ? <Badge variant="secondary">{g.tag}</Badge> : null}
                </div>
                <p className="text-xs text-muted-foreground">
                  {g.members.toLocaleString()} members
                </p>
              </CardHeader>

              <CardContent className="flex-1">
                <p className="line-clamp-3 text-sm text-muted-foreground text-pretty">
                  {g.description || 'No description provided.'}
                </p>
              </CardContent>

              {g.previewUrl ? (
                <CardFooter>
                  <Button
                    render={<a href={g.previewUrl} target="_blank" rel="noopener noreferrer" />}
                    className="w-full"
                  >
                    <ExternalLink className="size-4" />
                    Preview
                  </Button>
                </CardFooter>
              ) : null}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
