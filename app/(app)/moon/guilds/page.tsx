import { PageHeader, EmptyState } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getGuilds } from "@/lib/data"
import { Users2, ExternalLink } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function MoonGuildsPage() {
  const guilds = await getGuilds()

  return (
    <div className="space-y-8">
      <PageHeader
        title="Guild Management"
        description={`${guilds.length} guild${guilds.length === 1 ? "" : "s"} registered.`}
        icon={<Users2 className="size-5" />}
      />
      {guilds.length === 0 ? (
        <EmptyState title="No guilds found" description="Guilds will appear here once they exist in the database." />
      ) : (
        <Card className="glass overflow-hidden">
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {guilds.map((g) => (
                <div key={g.id} className="flex items-center gap-4 p-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{g.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{g.description || "No description"}</p>
                  </div>
                  <span className="hidden tabular-nums text-sm text-muted-foreground sm:inline">
                    {g.members.toLocaleString()} members
                  </span>
                  {g.previewUrl ? (
                    <a
                      href={g.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      Preview
                      <ExternalLink className="size-3.5" />
                    </a>
                  ) : (
                    <Badge variant="outline">No preview</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
