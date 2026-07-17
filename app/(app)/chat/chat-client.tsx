'use client'

import { useRef, useState } from 'react'
import { Send } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { AppUser } from '@/lib/types'

type Message = {
  id: number
  author: string
  moonId: string
  text: string
  self?: boolean
}

const SEED: Message[] = [
  { id: 1, author: 'Luna', moonId: 'luna', text: 'Welcome to the Moonlight Haven chat!' },
  { id: 2, author: 'Orion', moonId: 'orion', text: 'Anyone up for a casino round tonight?' },
]

export function ChatClient({ user }: { user: AppUser }) {
  const [messages, setMessages] = useState<Message[]>(SEED)
  const [text, setText] = useState('')
  const idRef = useRef(SEED.length + 1)

  function send() {
    const trimmed = text.trim()
    if (!trimmed) return
    setMessages((m) => [
      ...m,
      {
        id: idRef.current++,
        author: user.username,
        moonId: user.moonId,
        text: trimmed,
        self: true,
      },
    ])
    setText('')
  }

  return (
    <div className="glass flex h-[calc(100dvh-11rem)] flex-col overflow-hidden rounded-2xl border-border/60">
      <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
        {messages.map((m) => {
          const initials = (m.author || 'U').slice(0, 2).toUpperCase()
          return (
            <div
              key={m.id}
              className={`flex gap-3 ${m.self ? 'flex-row-reverse' : ''}`}
            >
              <Avatar className="size-9 shrink-0 ring-1 ring-border">
                {m.self && user.avatarUrl ? (
                  <AvatarImage src={user.avatarUrl} alt={m.author} />
                ) : null}
                <AvatarFallback className="bg-primary/15 text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className={`max-w-[75%] ${m.self ? 'text-right' : ''}`}>
                <p className="mb-1 text-xs text-muted-foreground">{m.author}</p>
                <div
                  className={`inline-block rounded-2xl px-3.5 py-2 text-sm ${
                    m.self
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex items-center gap-2 border-t border-border p-3">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (
              e.key === 'Enter' &&
              !e.nativeEvent.isComposing &&
              e.keyCode !== 229
            ) {
              e.preventDefault()
              send()
            }
          }}
          placeholder="Message the community…"
          aria-label="Message"
        />
        <Button onClick={send} size="icon" aria-label="Send message">
          <Send className="size-4" />
        </Button>
      </div>
    </div>
  )
}
