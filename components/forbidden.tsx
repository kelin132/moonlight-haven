import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldAlert } from "lucide-react"

export function Forbidden() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <span className="flex size-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive ring-1 ring-destructive/30">
        <ShieldAlert className="size-8" />
      </span>
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-widest text-destructive">403 Forbidden</p>
        <h1 className="text-2xl font-semibold text-balance">You don&apos;t have access to this area</h1>
        <p className="mx-auto max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
          The staff dashboard is restricted to True Owners, Owners, and Mods. If you believe this is a mistake, contact
          a server administrator.
        </p>
      </div>
      <Button render={<Link href="/profile" />} variant="outline">
        Back to your profile
      </Button>
    </div>
  )
}
