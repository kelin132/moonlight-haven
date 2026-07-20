import { PageHeader } from "@/components/page-header"
import { requireUser } from "@/lib/auth"
import { SlotsGame } from "./slots-game"
import { Cherry } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function SlotsPage() {
  const user = await requireUser()

  return (
    <div className="space-y-8">
      <PageHeader
        title="Lunar Slots"
        description="Spin the reels and chase the jackpot."
        icon={<Cherry className="size-5" />}
      />
      <SlotsGame initialCoins={user.coins} />
      <p className="text-center text-xs text-muted-foreground">
        Balance changes are session-only for now and reset on reload.
      </p>
    </div>
  )
}
