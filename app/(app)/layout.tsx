import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { SidebarNav } from '@/components/sidebar-nav'
import { MobileNav } from '@/components/mobile-nav'
import { UserMenu } from '@/components/user-menu'
import { Toaster } from '@/components/ui/sonner'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  if (!user) redirect('/login')

  return (
    <div className="moon-backdrop min-h-dvh">
      <div className="mx-auto flex min-h-dvh w-full max-w-[1600px]">
        {/* Desktop sidebar */}
        <aside className="sticky top-0 hidden h-dvh w-72 shrink-0 border-r border-sidebar-border bg-sidebar/60 backdrop-blur-xl lg:block">
          <SidebarNav role={user.role} />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top bar */}
          <header className="glass sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b px-4 sm:px-6">
            <div className="flex items-center gap-2">
              <MobileNav role={user.role} />
              <span className="text-sm text-muted-foreground">
                Welcome back,{' '}
                <span className="font-medium text-foreground">
                  {user.username}
                </span>
              </span>
            </div>
            <UserMenu user={user} />
          </header>

          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
