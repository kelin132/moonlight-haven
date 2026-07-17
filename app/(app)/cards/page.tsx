import type { Metadata } from 'next'
import { Sparkles } from 'lucide-react'
import { PageHeader, EmptyState } from '@/components/page-header'
import { CardGrid } from '@/components/card-grid'
import { getCards } from '@/lib/data'

export const metadata: Metadata = { title: 'Cards' }

export default async function CardsPage() {
  const cards = await getCards()

  return (
    <div>
      <PageHeader
        title="Cards"
        description="Browse the full Moonlight Haven card collection."
        icon={<Sparkles className="size-5" />}
      />
      {cards.length === 0 ? (
        <EmptyState
          title="No cards yet"
          description="Cards from your database will appear here."
          icon={<Sparkles className="size-6" />}
        />
      ) : (
        <CardGrid cards={cards} />
      )}
    </div>
  )
}
