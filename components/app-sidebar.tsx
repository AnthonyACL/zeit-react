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
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Localizaciones",
      url: "#",
      icon: MapPin,
    },
    {
      title: "Horarios",
      url: "#",
      icon: Clock,
    },
    {
      title: "Colaboradores",
      url: "#",
      icon: Users,
    },
    {
      title: "Chat",
      url: "#",
      icon: MessageCircle,
    },
    {
      title: "Horarios de trabajo",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Informes",
      url: "#",
      icon: FileText,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="border-r border-gray-200" {...props}>
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-1">
          <img src="/images/logo.png" alt="Logo" className="h-8 w-auto" />
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
