"use client"

import type * as React from "react"
import { LayoutDashboard, MapPin, Clock, Users, MessageCircle, Calendar, FileText } from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Diego Alonso",
    email: "diego@hello.com",
    avatar: "/avatars/diego.jpg",
    role: "Administración",
  },
  navMain: [
    {
      title: "Panel de control",
      url: "/PanelControl",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Localizaciones",
      url: "/Localizaciones",
      icon: MapPin,
    },
    {
      title: "Horarios",
      url: "/Horarios",
      icon: Clock,
    },
    {
      title: "Colaboradores",
      url: "/Colaboradores",
      icon: Users,
    },
    {
      title: "Chat",
      url: "/Chat",
      icon: MessageCircle,
    },
    {
      title: "Areas",
      url: "/Areas",
      icon: Calendar,
    },
    {
      title: "Informes",
      url: "/Informes",
      icon: FileText,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="border-r border-gray-200" {...props}>
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-1">
          <img src="/images/logomenu.png" alt="Logo" className="h-20 w-auto center" />
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="p-3">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
