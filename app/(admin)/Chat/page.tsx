"use client"
import { AppSidebar } from '@/app/(admin)/-componentes/app-sidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'

export default function Page() {
  const users = [
    { id: 1, name: 'Oscar Arias', role: 'Jefe de Área' },
    { id: 2, name: 'Manuel Echeverría', role: 'Asesor de Ventas' },
    { id: 3, name: 'Andrea Santiesteban', role: 'RRHH' },
    { id: 4, name: 'Marcelo Scerpella', role: 'Colaborador' },
  ]
  const manuel = {
    name: 'Manuel Echeverría',
    role: 'Asesor de Ventas',
    institucion: 'SENATI',
    sede: 'Independencia',
    correo: 'manuel@gmail.com',
    numero: '995368680',
    horas: '3h 15m',
    entrada: '8:15 am',
    messages: [
      { sender: 'other', text: 'Hola, ¿sucede algo?' },
      { sender: 'me', text: 'Necesito que me envíes algunos datos' },
      { sender: 'other', text: '¿Cuáles?' },
      { sender: 'me', text: 'Horario de tu institución' },
      { sender: 'other', text: 'Dame un momento' },
      { sender: 'other', text: 'Aún no lo tengo cuando' },
      { sender: 'me', text: 'Envíalo lo más antes posible' },
      { sender: 'other', text: 'Está bien' },
    ]
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/*Título*/}
        <div className="bg-white w-full h-[80px] flex items-center px-8 shadow-sm mb-8">
          <span className="font-bold" style={{ fontSize: 27 }}>Chat</span>
        </div>
        <div className="grid grid-cols-3 gap-4 h-[calc(100vh-120px)] px-8">
          <div className="px-8">
            <ul>
              {users.map((user) => (
                <li
                  key={user.id}
                  className={`flex items-center gap-3 p-3 cursor-default ${
                    user.id === 2 ? 'bg-blue-100 font-semibold' : ''
                  }`}
                >
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <div>{user.name}</div>
                    <div className="text-sm text-gray-500">{user.role}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/*Conversación*/}
          <div className="border rounded-xl flex flex-col shadow-sm">
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {manuel.messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[70%] p-2 rounded-lg ${
                    msg.sender === 'me'
                      ? 'ml-auto bg-blue-100'
                      : 'bg-gray-100'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="border-t p-2 flex">
              <input
                type="text"
                placeholder="Escriba un mensaje..."
                className="flex-1 p-2 border rounded-lg outline-none bg-gray-50 text-gray-600"
                disabled
              />
              <button
                className="ml-2 bg-blue-500 text-white px-4 rounded-lg cursor-not-allowed"
                disabled
              >
                Enviar
              </button>
            </div>
          </div>
          <div className="border rounded-xl p-4 shadow-sm">
            <h3 className="font-bold text-lg mb-2">{manuel.name}</h3>
            <p className="text-gray-600 mb-4">{manuel.role}</p>
            <p><strong>Institución:</strong> {manuel.institucion}</p>
            <p><strong>Sede:</strong> {manuel.sede}</p>
            <p><strong>Correo:</strong> {manuel.correo}</p>
            <p><strong>Número:</strong> {manuel.numero}</p>
            <p><strong>Horas trabajadas:</strong> {manuel.horas}</p>
            <p><strong>Hora de entrada:</strong> {manuel.entrada}</p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}