"use client"

import type * as React from "react"
import { LayoutDashboard, MapPin, Clock, Users, MessageCircle, Calendar, FileText } from "lucide-react"
import Link from "next/link"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

const navByRole = {
  //Aqui se deben elegir las vistas segun el rol del usuario,
  //En proceso de implementacion de roles
  Admin: [
    { title: "Panel de control", url: "/PanelControl", icon: LayoutDashboard },
    { title: "Localizaciones", url: "/Localizaciones", icon: MapPin },
    { title: "Horarios", url: "/Horarios", icon: Clock },
    { title: "Colaboradores", url: "/Colaboradores", icon: Users },
    { title: "Chat", url: "/Chat", icon: MessageCircle },
    { title: "Areas", url: "/Areas", icon: Calendar },
    { title: "Informes", url: "/Informes", icon: FileText },
  ],
  Subadmin: [
    { title: "Panel de control", url: "/PanelControl", icon: LayoutDashboard },
    { title: "Localizaciones", url: "/Localizaciones", icon: MapPin },
    { title: "Horarios", url: "/Horarios", icon: Clock },
    { title: "Colaboradores", url: "/Colaboradores", icon: Users },
    { title: "Chat", url: "/Chat", icon: MessageCircle },
    { title: "Areas", url: "/Areas", icon: Calendar },
    { title: "Informes", url: "/Informes", icon: FileText },
  ],
  Moderator: [
    { title: "Panel de control", url: "/PanelControl", icon: LayoutDashboard },
    { title: "Localizaciones", url: "/Localizaciones", icon: MapPin },
    { title: "Horarios", url: "/Horarios", icon: Clock },
    { title: "Colaboradores", url: "/Colaboradores", icon: Users },
    { title: "Chat", url: "/Chat", icon: MessageCircle },
    { title: "Areas", url: "/Areas", icon: Calendar },
    { title: "Informes", url: "/Informes", icon: FileText },
  ],
  Worker: [
    { title: "Panel de control", url: "/PanelControl", icon: LayoutDashboard },
    // { title: "Localizaciones", url: "/Localizaciones", icon: MapPin },
    { title: "Horarios", url: "/Horarios", icon: Clock },
    { title: "Colaboradores", url: "/Colaboradores", icon: Users },
    { title: "Chat", url: "/Chat", icon: MessageCircle },
    { title: "Areas", url: "/Areas", icon: Calendar },
    { title: "Informes", url: "/Informes", icon: FileText },
  ],
}

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
      title: "Proyectos",
      url: "/Proyectos",
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
        {/* 2. Envolvemos NavUser en el Link */}
        <Link href="/MiPerfil" className="w-full block">
            <NavUser user={data.user} />
        </Link>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
