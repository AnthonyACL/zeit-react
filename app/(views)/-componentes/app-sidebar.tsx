"use client"

import React from "react"
import { LayoutDashboard, MapPin, Clock, Users, MessageCircle, Calendar, FileText, LayoutGrid } from "lucide-react"
import Link from "next/link"
import { usePathname } from 'next/navigation';
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

const navByRole = {
  Admin: [
    { title: "Panel de control", url: "/PanelControl", icon: LayoutDashboard },
    { title: "Localizaciones", url: "/Localizaciones", icon: MapPin },
    { title: "Proyectos", url: "/Proyectos", icon: FileText },
    { title: "Colaboradores", url: "/Colaboradores", icon: Users },
    { title: "Areas", url: "/Areas", icon: LayoutGrid },
    { title: "Chat", url: "/Chat", icon: MessageCircle },
  ],
  SubAdmin: [ 
    { title: "Panel de control", url: "/PanelControl", icon: LayoutDashboard },
    { title: "Localizaciones", url: "/Localizaciones", icon: MapPin },
    { title: "Horarios", url: "/Horarios", icon: Clock },
    { title: "Colaboradores", url: "/Colaboradores", icon: Users },
    { title: "Proyectos", url: "/Proyectos", icon: FileText },
    { title: "Chat", url: "/Chat", icon: MessageCircle },
  ],
  Moderator: [
    { title: "Panel de control", url: "/PanelControl", icon: LayoutDashboard },
    { title: "Proyectos", url: "/Proyectos", icon: FileText },
    { title: "Tareas", url: "/Tareas", icon: Calendar },
    { title: "Chat", url: "/Chat", icon: MessageCircle },
  ],
  Collaborator: [ // Importante: ajusté a "Collaborator" para que coincida con la key
    { title: "Panel de control", url: "/PanelControl", icon: LayoutDashboard },
    { title: "Tareas", url: "/Tareas", icon: Calendar },
    { title: "Chat", url: "/Chat", icon: MessageCircle },
  ],

};
type UserRole = keyof typeof navByRole;

const defaultUser = {
  name: "Diego Alonso",
  email: "diego@hello.com",
  avatar: "/avatars/diego.jpg",
  role: "Collaborator",
};

// --- 3. COMPONENTE PRINCIPAL ---
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname(); // Obtiene la ruta actual
  const [currentUser, setCurrentUser] = React.useState(defaultUser);
  
  // Obtener usuario del localStorage (lado del cliente)
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('currentUser');
      if (user) {
        try {
          setCurrentUser(JSON.parse(user));
        } catch (e) {
          console.error('Error parsing user from localStorage:', e);
        }
      }
    }
  }, []);
  
  const userRole = (currentUser.role || 'Collaborator') as UserRole;
  const rawNavItems = navByRole[userRole] || [];
  const filteredNavItems = rawNavItems.map(item => ({
    ...item,
    isActive: pathname === item.url,
  }));

  return (
    <Sidebar collapsible="icon" className="border-r border-gray-200" {...props}>
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-1">
          <img src="/images/logomenu.png" alt="Logo" className="h-20 w-auto center" />
        </div>
      </SidebarHeader>   
      <SidebarContent className="px-3">
        <NavMain items={filteredNavItems} />
      </SidebarContent>
      <SidebarFooter className="p-3">
        <Link href="/MiPerfil" className="w-full block">
            <NavUser user={currentUser} />
        </Link>
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  )
}