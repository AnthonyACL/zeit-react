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
  }
}) {
  const displayName = user.nombre || user.name || 'Usuario'
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="w-full justify-start gap-3 px-3 py-3 hover:bg-gray-50">
          <Avatar className="h-8 w-8 rounded-full">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={displayName} />
            <AvatarFallback className="rounded-full bg-gray-200 text-gray-600">
              {displayName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium text-gray-900">{displayName}</span>
            <span className="truncate text-xs text-gray-500">{user.role || user.email}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
