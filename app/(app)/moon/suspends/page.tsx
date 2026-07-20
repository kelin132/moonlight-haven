import { PageHeader, EmptyState } from "@/components/page-header"
import { ShieldAlert } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function MoonSuspendsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Suspensions"
        description="Review and manage suspended or banned members."
        icon={<ShieldAlert className="size-5" />}
      />
      <EmptyState
        title="No active suspensions"
        description="Suspended members will appear here. Connect a suspensions collection to manage bans and timeouts."
        icon={<ShieldAlert className="size-6" />}
      />
    </div>
  )
}
