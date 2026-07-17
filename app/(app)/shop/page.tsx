import type { Metadata } from 'next'
import { Coins, Gift, ShoppingBag, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PageHeader, EmptyState } from '@/components/page-header'
import { CardGrid } from '@/components/card-grid'
import { getCards } from '@/lib/data'

export const metadata: Metadata = { title: 'Shop' }

const BUNDLES = [
  { name: 'Starter Pack', desc: '3 random cards + 500 coins', price: 500, icon: Gift },
  { name: 'Moonlight Chest', desc: '5 cards, guaranteed rare', price: 1200, icon: Sparkles },
  { name: 'Coin Bundle', desc: '2,500 coins instantly', price: 2000, icon: Coins },
]

export default async function ShopPage() {
  const cards = await getCards()

  return (
    <div className="flex flex-col gap-10">
      <div>
        <PageHeader
          title="Shop"
          description="Spend your coins on bundles, boosts, and cards."
          icon={<ShoppingBag className="size-5" />}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BUNDLES.map((b) => (
            <Card key={b.name} className="glass border-border/60">
              <CardContent className="flex flex-col gap-3 p-5">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <b.icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-semibold">{b.name}</h3>
                  <p className="text-sm text-muted-foreground">{b.desc}</p>
                </div>
                <Button className="mt-1 w-full">
                  <Coins className="size-4" />
                  {b.price.toLocaleString()}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Anchor target for /shop#cards */}
      <section id="cards" className="scroll-mt-24">
        <div className="mb-5 flex items-center gap-2">
          <Sparkles className="size-5 text-primary" />
          <h2 className="text-xl font-semibold tracking-tight">Card Market</h2>
          <Badge variant="secondary" className="ml-1">
            {cards.length}
          </Badge>
        </div>
        {cards.length === 0 ? (
          <EmptyState
            title="No cards for sale"
            description="Cards from your database will be listed here."
            icon={<Sparkles className="size-6" />}
          />
        ) : (
          <CardGrid cards={cards} />
        )}
      </section>
    </div>
  )
}
