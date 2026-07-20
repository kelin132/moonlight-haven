import { PageHeader, EmptyState } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { requireUser } from "@/lib/auth"
import { getLegacyEntries } from "@/lib/data"
import { Crown, Trophy } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function LegacyPage() {
  await requireUser()
  const entries = await getLegacyEntries()

  return (
    <div className="space-y-8">
      <PageHeader
        title="Legacy"
        description="Honoring the members who shaped the haven."
        icon={<Crown className="size-5" />}
      />
      {entries.length === 0 ? (
        <EmptyState
          title="No legacy entries yet"
          description="Hall of fame records will appear here once they are added."
          icon={<Trophy className="size-6" />}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((e) => (
            <Card key={e.id} className="glass group overflow-hidden">
              <CardContent className="flex flex-col gap-3 p-5">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                  <Crown className="size-5" />
                </span>
                <div>
                  <h3 className="font-medium">{e.title}</h3>
                  {e.subtitle ? <p className="text-sm text-muted-foreground">{e.subtitle}</p> : null}
                </div>
                {e.description ? (
                  <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{e.description}</p>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
