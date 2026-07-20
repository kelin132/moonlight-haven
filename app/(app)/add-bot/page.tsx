import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { requireUser } from "@/lib/auth"
import { Bot, Check } from "lucide-react"

export const dynamic = "force-dynamic"

const FEATURES = [
  "Auto-moderation and spam protection",
  "Card drops and collection tracking",
  "Casino games right inside your server",
  "Leaderboard sync with Moonlight Haven",
  "Custom welcome messages and roles",
]

export default async function AddBotPage() {
  await requireUser()

  return (
    <div className="space-y-8">
      <PageHeader
        title="Add the Bot"
        description="Bring Moonlight Haven to your own community."
        icon={<Bot className="size-5" />}
      />
      <Card className="glass overflow-hidden">
        <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/30">
              <Bot className="size-7" />
            </span>
            <div>
              <h2 className="text-lg font-semibold">Moonlight Bot</h2>
              <p className="mt-1 max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
                Invite the official bot to unlock cards, casino games, and moderation tools for your server.
              </p>
            </div>
          </div>
          <Button size="lg" className="shrink-0" disabled>
            Invite (Coming Soon)
          </Button>
        </CardContent>
      </Card>
      <div className="grid gap-3 sm:grid-cols-2">
        {FEATURES.map((f) => (
          <div key={f} className="glass flex items-center gap-3 rounded-xl px-4 py-3 text-sm">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Check className="size-3.5" />
            </span>
            <span className="text-pretty">{f}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
