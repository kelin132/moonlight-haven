import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { requireUser } from "@/lib/auth"

export const dynamic = "force-dynamic"

const RULES = [
  {
    title: "Respect Everyone",
    body: "Treat all members with kindness. Harassment, hate speech, discrimination, or personal attacks of any kind will not be tolerated.",
  },
  {
    title: "No Spam or Self-Promotion",
    body: "Avoid flooding channels, posting repetitive content, or advertising other communities without staff approval.",
  },
  {
    title: "Keep It Safe For Everyone",
    body: "No NSFW, gore, or otherwise disturbing content. Keep conversations appropriate for a general audience.",
  },
  {
    title: "Use The Right Channels",
    body: "Post content where it belongs. Off-topic messages in focused channels may be moved or removed.",
  },
  {
    title: "No Cheating or Exploits",
    body: "Abusing bugs in casino games, cards, or the economy will result in suspension and possible loss of balance.",
  },
  {
    title: "Listen To Staff",
    body: "Moderators and owners have the final say. If you disagree with a decision, open a support ticket instead of arguing publicly.",
  },
]

export default async function RulesPage() {
  await requireUser()

  return (
    <div className="space-y-8">
      <PageHeader
        title="Community Rules"
        description="A few simple guidelines that keep Moonlight Haven welcoming for everyone."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {RULES.map((rule, i) => (
          <Card key={rule.title} className="glass">
            <CardHeader className="flex flex-row items-start gap-3 space-y-0">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/15 font-serif text-sm font-semibold text-primary">
                {i + 1}
              </span>
              <CardTitle className="text-balance text-base leading-tight">{rule.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-pretty text-sm leading-relaxed text-muted-foreground">{rule.body}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
