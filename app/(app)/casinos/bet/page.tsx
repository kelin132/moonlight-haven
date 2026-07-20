import { PageHeader } from "@/components/page-header"
import { requireUser } from "@/lib/auth"
import { BetGame } from "./bet-game"
import { Dice5 } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function BetPage() {
  const user = await requireUser()

  return (
    <div className="space-y-8">
      <PageHeader
        title="High Stakes Bet"
        description="Set your odds and roll for the payout."
        icon={<Dice5 className="size-5" />}
      />
      <BetGame initialCoins={user.coins} />
      <p className="text-center text-xs text-muted-foreground">
        Balance changes are session-only for now and reset on reload.
      </p>
    </div>
  )
}
