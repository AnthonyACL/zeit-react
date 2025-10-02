
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
				<div className="bg-white w-full h-[80px] flex items-center px-8 shadow-sm ">
					<span className="font-bold" style={{ fontSize: 27 }}>Localizaciones</span>
				</div>
				<div className="p-8 flex flex-col gap-8">
								{/* Mapa real con iframe */}
								<div className="w-full h-[350px] rounded-xl overflow-hidden shadow-md flex items-center justify-center">
									<iframe
										src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15606.196893191594!2d-77.04496431534425!3d-12.074505647738103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2spe!4v1757641406536!5m2!1ses-419!2spe"
										width="100%"
										height="350"
										style={{ border: 0 }}
										allowFullScreen={true}
										loading="lazy"
										referrerPolicy="no-referrer-when-downgrade"
									/>
								</div>
					{/* Cards de usuario */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
						{users.map((user, idx) => (
							<div key={idx} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
								<img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full mb-3 object-cover border-2 border-blue-200" />
								<span className="font-bold text-lg text-gray-800">{user.name}</span>
								<span className="text-sm text-gray-500">{user.role}</span>
							</div>
						))}
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
