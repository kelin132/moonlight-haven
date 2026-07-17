import type { Metadata } from 'next'
import { Moon, Sparkles } from 'lucide-react'
import { LoginForm } from './login-form'

export const metadata: Metadata = {
  title: 'Sign in',
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>
}) {
  const { from } = await searchParams

  return (
    <main className="moon-backdrop relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-10">
      {/* Decorative moon */}
      <div className="animate-float-slow pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-[80%] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/15 ring-1 ring-primary/30">
            <Moon className="size-7 text-primary" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-balance">
            Moonlight Haven
          </h1>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Sparkles className="size-3.5 text-accent" />
            Sign in to enter the community
          </p>
        </div>

        <div className="glass-strong rounded-2xl p-6 shadow-2xl sm:p-8">
          <LoginForm from={from ?? ''} />
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {'© '}
          {new Date().getFullYear()} Moonlight Haven. All rights reserved.
        </p>
      </div>
    </main>
  )
}
