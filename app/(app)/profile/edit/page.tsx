import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { Pencil } from 'lucide-react'
import { getCurrentUser } from '@/lib/auth'
import { PageHeader } from '@/components/page-header'
import { EditForm } from './edit-form'

export const metadata: Metadata = { title: 'Edit Profile' }

export default async function EditProfilePage() {
  const user = await getCurrentUser()
  if (!user) redirect('/login')

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader
        title="Edit Profile"
        description="Update your bio and set images by URL."
        icon={<Pencil className="size-5" />}
      />
      <EditForm user={user} />
    </div>
  )
}
