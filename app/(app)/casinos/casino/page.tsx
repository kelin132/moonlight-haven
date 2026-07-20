import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { requireUser } from "@/lib/auth"
import { Dice5, Coins, Cherry, Sparkles, ArrowRight } from "lucide-react"

export const dynamic = "force-dynamic"

const GAMES = [
  {
    href: "/casinos/slots",
    title: "Lunar Slots",
    desc: "Spin the reels and match symbols to win big.",
    icon: Cherry,
  },
  {
    href: "/casinos/bet",
    title: "High Stakes Bet",
    desc: "Pick your odds and wager your coins on the roll.",
    icon: Dice5,
  },
]

export default async function CasinoPage() {
  const user = await requireUser()

  return (
    <div className="space-y-8">
      <PageHeader
        title="The Casino"
        description="Try your luck in the Eclipse Arena."
        icon={<Sparkles className="size-5" />}
      />

      <Card className="glass overflow-hidden">
        <CardContent className="flex items-center justify-between gap-4 p-6">
          <div className="flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/30">
              <Coins className="size-6" />
            </span>
            <div>
              <p className="text-sm text-muted-foreground">Your balance</p>
              <p className="text-2xl font-semibold tabular-nums">{user.coins.toLocaleString()}</p>
            </div>
          </div>
          <span className="text-sm text-muted-foreground">coins</span>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        {GAMES.map((g) => {
          const Icon = g.icon
          return (
            <Link key={g.href} href={g.href} className="group">
              <Card className="glass h-full overflow-hidden transition-colors hover:border-primary/40">
                <CardContent className="flex h-full flex-col gap-4 p-6">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/30 transition-transform group-hover:scale-110">
                    <Icon className="size-6" />
                  </span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{g.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground text-pretty">{g.desc}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Play now
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
