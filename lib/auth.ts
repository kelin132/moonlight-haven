import 'server-only'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { randomBytes } from 'crypto'
import { ObjectId, type WithId, type Document } from 'mongodb'
import { getDb } from './mongodb'
import { STAFF_ROLES, type AppUser } from './types'

export const SESSION_COOKIE = 'mh_session'
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30 // 30 days

export function normalizeUser(doc: WithId<Document>): AppUser {
  return {
    id: doc._id.toString(),
    moonId: doc.moonId ?? '',
    username: doc.username ?? doc.name ?? doc.moonId ?? 'Unknown',
    role: doc.role ?? 'Member',
    bio: doc.bio ?? '',
    description: doc.description ?? '',
    avatarUrl: doc.avatarUrl ?? doc.avatar ?? null,
    bannerUrl: doc.bannerUrl ?? doc.banner ?? null,
    coins: typeof doc.coins === 'number' ? doc.coins : 0,
    level: typeof doc.level === 'number' ? doc.level : 1,
    xp: typeof doc.xp === 'number' ? doc.xp : 0,
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : null,
  }
}

export async function createSession(userId: string): Promise<void> {
  const db = await getDb()
  const token = randomBytes(32).toString('hex')
  const now = new Date()
  await db.collection('sessions').insertOne({
    token,
    userId,
    createdAt: now,
    expiresAt: new Date(now.getTime() + SESSION_TTL_MS),
  })

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_MS / 1000,
  })
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (token) {
    const db = await getDb()
    await db.collection('sessions').deleteOne({ token })
  }
  cookieStore.delete(SESSION_COOKIE)
}

export async function getCurrentUser(): Promise<AppUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) return null

  const db = await getDb()
  const session = await db.collection('sessions').findOne({ token })
  if (!session) return null

  if (session.expiresAt && new Date(session.expiresAt) < new Date()) {
    await db.collection('sessions').deleteOne({ token })
    return null
  }

  let userDoc: WithId<Document> | null = null
  try {
    userDoc = await db
      .collection('users')
      .findOne({ _id: new ObjectId(String(session.userId)) })
  } catch {
    userDoc = await db.collection('users').findOne({ moonId: session.userId })
  }
  if (!userDoc) return null

  return normalizeUser(userDoc)
}

/**
 * Ensures a user is authenticated. Redirects to /login if not.
 * Use at the top of every protected page/server action.
 */
export async function requireUser(): Promise<AppUser> {
  const user = await getCurrentUser()
  if (!user) redirect('/login')
  return user
}

/**
 * Ensures the current user holds a staff role. Returns null when the user
 * is authenticated but lacks permission (caller should render 403), and
 * redirects to /login when no user is present at all.
 */
export async function requireStaff(): Promise<AppUser | null> {
  const user = await requireUser()
  if (!STAFF_ROLES.includes(user.role as (typeof STAFF_ROLES)[number])) {
    return null
  }
  return user
}
