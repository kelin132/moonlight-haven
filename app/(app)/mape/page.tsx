import { PageHeader, EmptyState } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { requireUser } from "@/lib/auth"
import { MapIcon } from "lucide-react"

export const dynamic = "force-dynamic"

const REGIONS = [
  { name: "Lunar Plaza", desc: "The social heart of the haven where members gather and trade." },
  { name: "Crescent Market", desc: "Browse the shop, buy cards, and spend your coins." },
  { name: "Eclipse Arena", desc: "Compete in casino games and climb the leaderboard." },
  { name: "Guild Halls", desc: "Home to every guild and their preview showcases." },
]

export default async function MapePage() {
  await requireUser()

  return (
    <div className="space-y-8">
      <PageHeader
        title="World Map"
        description="Explore the regions that make up Moonlight Haven."
        icon={<MapIcon className="size-5" />}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {REGIONS.map((r) => (
          <Card key={r.name} className="glass group overflow-hidden">
            <CardContent className="flex items-start gap-4 p-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30 transition-transform group-hover:scale-110">
                <MapIcon className="size-5" />
              </span>
              <div>
                <h3 className="font-medium">{r.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground text-pretty">{r.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <EmptyState
        title="Interactive map coming soon"
        description="A fully navigable map of the haven is on the way."
        icon={<MapIcon className="size-6" />}
      />
    </div>
  )
}
