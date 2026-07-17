import 'server-only'
import { ObjectId, type WithId, type Document } from 'mongodb'
import { getDb } from './mongodb'
import { normalizeUser } from './auth'
import type { AppUser, Card, Guild, TeamMember } from './types'

function toGuild(doc: WithId<Document>): Guild {
  return {
    id: doc._id.toString(),
    name: doc.name ?? doc.title ?? 'Unnamed Guild',
    description: doc.description ?? '',
    imageUrl: doc.imageUrl ?? doc.image ?? doc.thumbnail ?? null,
    previewUrl: doc.previewUrl ?? doc.preview ?? doc.link ?? null,
    members: typeof doc.members === 'number' ? doc.members : (doc.memberCount ?? 0),
    tag: doc.tag ?? null,
  }
}

function toCard(doc: WithId<Document>): Card {
  return {
    id: doc._id.toString(),
    name: doc.name ?? doc.title ?? 'Card',
    description: doc.description ?? '',
    imageUrl: doc.imageUrl ?? doc.image ?? null,
    rarity: doc.rarity ?? 'Common',
    price: typeof doc.price === 'number' ? doc.price : 0,
    power: typeof doc.power === 'number' ? doc.power : 0,
  }
}

function toTeamMember(doc: WithId<Document>): TeamMember {
  return {
    id: doc._id.toString(),
    username: doc.username ?? doc.name ?? doc.moonId ?? 'Unknown',
    description: doc.description ?? doc.bio ?? '',
    role: doc.role ?? 'Staff',
    avatarUrl: doc.avatarUrl ?? doc.avatar ?? null,
  }
}

export async function getUsers(limit = 100): Promise<AppUser[]> {
  try {
    const db = await getDb()
    const docs = await db.collection('users').find({}).limit(limit).toArray()
    return docs.map(normalizeUser)
  } catch {
    return []
  }
}

export async function getUserByMoonId(moonId: string): Promise<AppUser | null> {
  try {
    const db = await getDb()
    const doc = await db.collection('users').findOne({ moonId })
    return doc ? normalizeUser(doc) : null
  } catch {
    return null
  }
}

export async function getLeaderboard(limit = 50): Promise<AppUser[]> {
  try {
    const db = await getDb()
    const docs = await db
      .collection('users')
      .find({})
      .sort({ level: -1, xp: -1, coins: -1 })
      .limit(limit)
      .toArray()
    return docs.map(normalizeUser)
  } catch {
    return []
  }
}

export async function getGuilds(): Promise<Guild[]> {
  try {
    const db = await getDb()
    const docs = await db.collection('guilds').find({}).toArray()
    return docs.map(toGuild)
  } catch {
    return []
  }
}

export async function getCards(): Promise<Card[]> {
  try {
    const db = await getDb()
    const docs = await db.collection('cards').find({}).toArray()
    return docs.map(toCard)
  } catch {
    return []
  }
}

export async function getCardById(id: string): Promise<Card | null> {
  try {
    const db = await getDb()
    if (!ObjectId.isValid(id)) return null
    const doc = await db.collection('cards').findOne({ _id: new ObjectId(id) })
    return doc ? toCard(doc) : null
  } catch {
    return null
  }
}

export async function getTeam(): Promise<TeamMember[]> {
  try {
    const db = await getDb()
    // Prefer a dedicated team collection; fall back to staff-role users.
    const teamDocs = await db.collection('team').find({}).toArray()
    if (teamDocs.length > 0) return teamDocs.map(toTeamMember)

    const staff = await db
      .collection('users')
      .find({ role: { $in: ['True Owner', 'Owner', 'Mod'] } })
      .toArray()
    return staff.map(toTeamMember)
  } catch {
    return []
  }
}

export async function updateUserProfile(
  userId: string,
  updates: { bio?: string; avatarUrl?: string; bannerUrl?: string },
): Promise<boolean> {
  try {
    const db = await getDb()
    const set: Record<string, string> = {}
    if (typeof updates.bio === 'string') set.bio = updates.bio
    if (typeof updates.avatarUrl === 'string') set.avatarUrl = updates.avatarUrl
    if (typeof updates.bannerUrl === 'string') set.bannerUrl = updates.bannerUrl
    if (Object.keys(set).length === 0) return true
    await db
      .collection('users')
      .updateOne({ _id: new ObjectId(userId) }, { $set: set })
    return true
  } catch {
    return false
  }
}
