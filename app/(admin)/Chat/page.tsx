"use client"
import { AppSidebar } from '@/app/(admin)/-componentes/app-sidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'

export default function Page() {
	const users = [
		{ name: 'Diego Alonso', role: 'Administración', avatar: '/avatars/diego.jpg' },
		{ name: 'Ana Torres', role: 'Supervisor', avatar: '/avatars/ana.jpg' },
		{ name: 'Luis Pérez', role: 'Operador', avatar: '/avatars/luis.jpg' },
	]
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<div className="bg-white w-full h-[80px] flex items-center px-8 shadow-sm mb-8">
					<span className="font-bold" style={{ fontSize: 27 }}>Chat</span>
				</div>
				Esta pagina esta en proceso de desarrollo 😉

			</SidebarInset>
		</SidebarProvider>
	)
}