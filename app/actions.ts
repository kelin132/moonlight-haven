'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { destroySession, getCurrentUser } from '@/lib/auth'
import { updateUserProfile } from '@/lib/data'

export async function logoutAction() {
  await destroySession()
  redirect('/login')
}

export type ProfileState = { ok: boolean; message: string | null }

export async function updateProfileAction(
  _prev: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const user = await getCurrentUser()
  if (!user) redirect('/login')

  const bio = String(formData.get('bio') || '').slice(0, 500)
  const avatarUrl = String(formData.get('avatarUrl') || '').trim()
  const bannerUrl = String(formData.get('bannerUrl') || '').trim()

  const isValidUrl = (v: string) => v === '' || /^https?:\/\/.+/i.test(v)
  if (!isValidUrl(avatarUrl) || !isValidUrl(bannerUrl)) {
    return { ok: false, message: 'Image URLs must start with http:// or https://' }
  }

  const ok = await updateUserProfile(user.id, { bio, avatarUrl, bannerUrl })
  if (!ok) return { ok: false, message: 'Could not save changes. Try again.' }

  revalidatePath('/profile')
  revalidatePath(`/user/${user.moonId}`)
  return { ok: true, message: 'Profile updated.' }
}
