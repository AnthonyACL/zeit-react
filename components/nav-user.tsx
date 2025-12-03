"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

export function NavUser({
  user,
}: {
  user: {
    nombre?: string
    name?: string
    email: string
    avatar?: string
    role?: string
    rol?: string
  }
}) {
  const displayName = user.nombre || user.name || 'Usuario'
  const displayRole = user.rol || user.role || 'Usuario'
  const roleFormatted = displayRole.charAt(0).toUpperCase() + displayRole.slice(1)
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="w-full justify-start gap-4 px-3 py-4 hover:bg-gray-100 transition-colors">
          <Avatar className="h-10 w-10 rounded-full flex-shrink-0">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={displayName} />
            <AvatarFallback className="rounded-full bg-blue-200 text-blue-700 font-semibold">
              {displayName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight min-w-0">
            <span className="truncate font-semibold text-gray-900 text-base">{displayName}</span>
            <span className="truncate text-xs text-gray-500 font-medium">{roleFormatted}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
