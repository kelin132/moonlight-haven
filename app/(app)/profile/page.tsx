import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { getCurrentUser } from '@/lib/auth'
import { ProfileView } from '@/components/profile-view'

export const metadata: Metadata = { title: 'Profile' }

export default async function ProfilePage() {
  const user = await getCurrentUser()
  if (!user) redirect('/login')
  return <ProfileView user={user} isOwner />
}
