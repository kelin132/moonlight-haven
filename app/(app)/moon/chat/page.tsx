import { PageHeader, EmptyState } from "@/components/page-header"
import { MessageSquare } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function MoonChatPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Chat Moderation"
        description="Monitor conversations and take action on reported messages."
        icon={<MessageSquare className="size-5" />}
      />
      <EmptyState
        title="No flagged messages"
        description="Reported or auto-flagged messages will surface here for staff review. Connect a messages collection to populate this queue."
        icon={<MessageSquare className="size-6" />}
      />
    </div>
  )
}
