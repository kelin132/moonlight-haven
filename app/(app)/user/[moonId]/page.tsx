import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCurrentUser } from '@/lib/auth'
import { getUserByMoonId } from '@/lib/data'
import { ProfileView } from '@/components/profile-view'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moonId: string }>
}): Promise<Metadata> {
  const { moonId } = await params
  const user = await getUserByMoonId(moonId)
  return { title: user ? user.username : 'Member' }
}

export default async function UserPage({
  params,
}: {
  params: Promise<{ moonId: string }>
}) {
  const { moonId } = await params
  const [user, current] = await Promise.all([
    getUserByMoonId(moonId),
    getCurrentUser(),
  ])
  if (!user) notFound()
  return <ProfileView user={user} isOwner={current?.moonId === user.moonId} />
}
