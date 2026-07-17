'use client'

import { useActionState, useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { Loader2, Save } from 'lucide-react'
import { toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { updateProfileAction, type ProfileState } from '@/app/actions'
import type { AppUser } from '@/lib/types'

function SaveButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
      Save changes
    </Button>
  )
}

export function EditForm({ user }: { user: AppUser }) {
  const [state, formAction] = useActionState<ProfileState, FormData>(
    updateProfileAction,
    { ok: false, message: null },
  )
  const [avatar, setAvatar] = useState(user.avatarUrl ?? '')
  const [banner, setBanner] = useState(user.bannerUrl ?? '')

  useEffect(() => {
    if (state.message) {
      if (state.ok) toast.success(state.message)
      else toast.error(state.message)
    }
  }, [state])

  const initials = (user.username || user.moonId).slice(0, 2).toUpperCase()

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {/* Live preview */}
      <Card className="glass overflow-hidden border-border/60 pt-0">
        <div className="relative h-36 w-full bg-secondary">
          {banner ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={banner} alt="" className="size-full object-cover" />
          ) : (
            <div className="size-full bg-gradient-to-br from-primary/25 to-card" />
          )}
        </div>
        <CardContent className="-mt-10 flex items-end gap-3">
          <Avatar className="size-20 rounded-2xl ring-4 ring-card">
            {avatar ? <AvatarImage src={avatar} alt={user.username} /> : null}
            <AvatarFallback className="rounded-2xl bg-primary/20 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="pb-1">
            <p className="font-medium">{user.username}</p>
            <p className="font-mono text-xs text-muted-foreground">{user.moonId}</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-2">
        <Label htmlFor="avatarUrl">Profile picture URL</Label>
        <Input
          id="avatarUrl"
          name="avatarUrl"
          placeholder="https://example.com/avatar.png"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          inputMode="url"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="bannerUrl">Banner / background URL</Label>
        <Input
          id="bannerUrl"
          name="bannerUrl"
          placeholder="https://example.com/banner.png"
          value={banner}
          onChange={(e) => setBanner(e.target.value)}
          inputMode="url"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          rows={5}
          maxLength={500}
          defaultValue={user.bio}
          placeholder="Tell the community about yourself…"
        />
      </div>

      <div className="flex justify-end gap-2">
        <SaveButton />
      </div>
    </form>
  )
}
