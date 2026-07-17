import Link from 'next/link'
import { Coins, Sparkles, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Card as CardType } from '@/lib/types'

const RARITY_STYLES: Record<string, string> = {
  common: 'text-muted-foreground ring-border',
  rare: 'text-primary ring-primary/40',
  epic: 'text-chart-4 ring-chart-4/40',
  legendary: 'text-accent ring-accent/50',
}

function rarityStyle(rarity: string) {
  return RARITY_STYLES[rarity.toLowerCase()] ?? RARITY_STYLES.common
}

export function CardGrid({ cards }: { cards: CardType[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {cards.map((c) => (
        <Link key={c.id} href={`/cards/${c.id}`}>
          <Card
            className={cn(
              'glass group h-full overflow-hidden border-border/60 pt-0 ring-1 transition-all hover:-translate-y-1',
              rarityStyle(c.rarity),
            )}
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-secondary">
              {c.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={c.imageUrl}
                  alt={c.name}
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex size-full items-center justify-center bg-gradient-to-br from-primary/25 to-card">
                  <Sparkles className="size-8 text-primary/70" />
                </div>
              )}
              <Badge className="absolute left-2 top-2 bg-background/80 capitalize backdrop-blur">
                {c.rarity}
              </Badge>
            </div>
            <CardContent className="px-3 pb-3">
              <p className="truncate font-medium">{c.name}</p>
              <div className="mt-1.5 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-accent">
                  <Coins className="size-3.5" />
                  {c.price.toLocaleString()}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Zap className="size-3.5" />
                  {c.power}
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
