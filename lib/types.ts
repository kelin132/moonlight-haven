export const STAFF_ROLES = ['True Owner', 'Owner', 'Mod'] as const
export type StaffRole = (typeof STAFF_ROLES)[number]

export type UserRole = StaffRole | 'Member' | string

export interface AppUser {
  id: string
  moonId: string
  username: string
  role: UserRole
  bio: string
  description: string
  avatarUrl: string | null
  bannerUrl: string | null
  coins: number
  level: number
  xp: number
  createdAt: string | null
}

export interface Guild {
  id: string
  name: string
  description: string
  imageUrl: string | null
  previewUrl: string | null
  members: number
  tag: string | null
}

export interface Card {
  id: string
  name: string
  description: string
  imageUrl: string | null
  rarity: string
  price: number
  power: number
}

export interface TeamMember {
  id: string
  username: string
  description: string
  role: string
  avatarUrl: string | null
}

export interface LegacyEntry {
  id: string
  title: string
  subtitle: string | null
  description: string | null
}

export function isStaffRole(role: string | null | undefined): role is StaffRole {
  return !!role && (STAFF_ROLES as readonly string[]).includes(role)
}
