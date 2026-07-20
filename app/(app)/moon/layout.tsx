import { requireStaff } from "@/lib/auth"
import { Forbidden } from "@/components/forbidden"

export default async function MoonLayout({ children }: { children: React.ReactNode }) {
  const staff = await requireStaff()
  if (!staff) return <Forbidden />
  return <>{children}</>
}
