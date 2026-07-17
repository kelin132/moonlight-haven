'use server'

import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'
import { getDb } from '@/lib/mongodb'
import { createSession } from '@/lib/auth'

export type LoginState = { error: string | null }

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const moonId = String(formData.get('moonId') || '').trim()
  const password = String(formData.get('password') || '')
  const fromRaw = String(formData.get('from') || '')
  const destination = fromRaw.startsWith('/') && !fromRaw.startsWith('/login') ? fromRaw : '/profile'

  if (!moonId || !password) {
    return { error: 'Please enter your Moon ID and password.' }
  }

  let user: Record<string, unknown> | null = null

  try {
    const db = await getDb()
    user = await db.collection('users').findOne({ moonId })
  } catch {
    return { error: 'Unable to reach the server. Please try again.' }
  }

  const invalid = { error: 'Invalid Moon ID or password.' }

  if (!user) return invalid

  const hash = user.webPassword as string | null | undefined
  if (!hash) {
    return {
      error: 'This account has no web password set. Contact a staff member.',
    }
  }

  const ok = await bcrypt.compare(password, hash)
  if (!ok) return invalid

  await createSession(String((user as { _id: unknown })._id))
  redirect(destination)
}
