import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { MessageSquare } from 'lucide-react'
import { getCurrentUser } from '@/lib/auth'
import { PageHeader } from '@/components/page-header'
import { ChatClient } from './chat-client'

export const metadata: Metadata = { title: 'Chat' }

export default async function ChatPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/login')

  return (
    <div>
      <PageHeader
        title="Community Chat"
        description="Talk with other members of Moonlight Haven."
        icon={<MessageSquare className="size-5" />}
      />
      <ChatClient user={user} />
    </div>
  )
}
