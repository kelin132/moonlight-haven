import type { ReactNode } from "react"
import { Card } from "@/components/ui/card"

export function InfoPanel({
  icon,
  title,
  children,
}: {
  icon?: ReactNode
  title: string
  children: ReactNode
}) {
  return (
    <Card className="glass flex flex-col items-center gap-4 p-10 text-center">
      {icon ? (
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">{icon}</div>
      ) : null}
      <h2 className="text-balance text-xl font-semibold">{title}</h2>
      <div className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">{children}</div>
    </Card>
  )
}
