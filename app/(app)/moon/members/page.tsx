import { PageHeader } from "@/components/page-header"
import { EmptyState } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { getUsers } from "@/lib/data"
import { Users } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function MoonMembersPage() {
  const users = await getUsers(500)

  return (
    <div className="space-y-8">
      <PageHeader
        title="Member Management"
        description={`${users.length} registered member${users.length === 1 ? "" : "s"}.`}
        icon={<Users className="size-5" />}
      />
      {users.length === 0 ? (
        <EmptyState title="No members found" description="Members will appear here once they exist in the database." />
      ) : (
        <Card className="glass overflow-hidden">
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {users.map((u) => (
                <div key={u.id} className="flex items-center gap-4 p-4">
                  <Avatar className="size-10">
                    <AvatarImage src={u.avatarUrl ?? undefined} alt={u.username} />
                    <AvatarFallback>{u.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{u.username}</p>
                    <p className="truncate text-xs text-muted-foreground">Moon ID: {u.moonId}</p>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="hidden tabular-nums text-muted-foreground sm:inline">Lvl {u.level}</span>
                    <span className="hidden tabular-nums text-muted-foreground sm:inline">
                      {u.coins.toLocaleString()} coins
                    </span>
                    <Badge variant="secondary">{u.role}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
