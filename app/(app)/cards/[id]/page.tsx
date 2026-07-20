import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowLeft, Coins, Sparkles, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getCardById } from '@/lib/data'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const card = await getCardById(id)
  return { title: card ? card.name : 'Card' }
}

export default async function CardDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const card = await getCardById(id)
  if (!card) notFound()

  return (
    <div className="mx-auto max-w-4xl">
      <Button render={<Link href="/cards" />} variant="ghost" size="sm" className="mb-4">
        <ArrowLeft className="size-4" />
        Back to cards
      </Button>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glass overflow-hidden border-border/60 pt-0">
          <div className="relative aspect-[3/4] w-full bg-secondary">
            {card.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={card.imageUrl} alt={card.name} className="size-full object-cover" />
            ) : (
              <div className="flex size-full items-center justify-center bg-gradient-to-br from-primary/25 to-card">
                <Sparkles className="size-12 text-primary/70" />
              </div>
            )}
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          <div>
            <Badge className="mb-2 capitalize">{card.rarity}</Badge>
            <h1 className="text-3xl font-semibold tracking-tight">{card.name}</h1>
          </div>
          <p className="leading-relaxed text-muted-foreground text-pretty">
            {card.description || 'No description available for this card.'}
          </p>

          <div className="grid grid-cols-2 gap-4">
            <Card className="glass border-border/60">
              <CardContent className="flex items-center gap-3 p-4">
                <Coins className="size-5 text-accent" />
                <div>
                  <p className="text-xs text-muted-foreground">Price</p>
                  <p className="text-lg font-semibold">{card.price.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="glass border-border/60">
              <CardContent className="flex items-center gap-3 p-4">
                <Zap className="size-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Power</p>
                  <p className="text-lg font-semibold">{card.power}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button size="lg" className="mt-2">
            <Coins className="size-4" />
            Purchase for {card.price.toLocaleString()}
          </Button>
        </div>
      </div>
    </div>
  )
}
