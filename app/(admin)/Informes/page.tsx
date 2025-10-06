"use client";

import { AppSidebar } from '@/app/(admin)/-componentes/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function Page() {
  const users = [
    { name: 'Diego Alonso', role: 'Administración', avatar: '/avatars/diego.jpg' },
    { name: 'Ana Torres', role: 'Supervisor', avatar: '/avatars/ana.jpg' },
    { name: 'Luis Pérez', role: 'Operador', avatar: '/avatars/luis.jpg' },
  ];

  const progressData: Record<string, { name: string; value: number; color: string }[]> = {
    L: [{ name: 'Completado', value: 100, color: '#22c55e' }],
    M: [
      { name: 'Completado', value: 85, color: '#22c55e' },
      { name: 'Pendiente', value: 10, color: '#f97316' },
      { name: 'No Completado', value: 5, color: '#ef4444' }
    ],
    M2: [
      { name: 'Completado', value: 90, color: '#22c55e' },
      { name: 'No Completado', value: 10, color: '#ef4444' }
    ],
    J: [
      { name: 'Completado', value: 92, color: '#22c55e' },
      { name: 'Pendiente', value: 8, color: '#f97316' }
    ],
    V: [
      { name: 'Completado', value: 70, color: '#22c55e' },
      { name: 'No Completado', value: 30, color: '#ef4444' }
    ],
    S: [
      { name: 'Completado', value: 95, color: '#22c55e' },
      { name: 'Pendiente', value: 5, color: '#f97316' }
    ]
  };

  const colaboradores = [
    { name: 'Diego Alonso', email: 'diegoalo@gmail.com', status: 'Activo' },
    { name: 'Oscar Arias', email: 'osarias@gmail.com', status: 'Inactivo' },
    { name: 'Marcelo Scarpela', email: 'marceloscer@gmail.com', status: 'Activo' }
  ];

  const months = [
    { key: 'L', label: 'L' },
    { key: 'M', label: 'M' },
    { key: 'M2', label: 'M' },
    { key: 'J', label: 'J' },
    { key: 'V', label: 'V' },
    { key: 'S', label: 'S' }
  ];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="bg-white w-full h-[80px] flex items-center px-8 shadow-sm mb-8">
          <span className="font-bold text-[27px]">Informes</span>
        </div>

        <div className="px-8 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">PROGRESO</h2>
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm">COMPLETADO</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-sm">PENDIENTE</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm">NO COMPLETADO</span>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-4">
              {months.map((month) => (
                <div key={month.key} className="flex flex-col items-center">
                  <ResponsiveContainer width="100%" height={120}>
                    <PieChart>
                      <Pie
                        data={progressData[month.key as keyof typeof progressData]}
                        cx="50%"
                        cy="50%"
                        innerRadius={25}
                        outerRadius={45}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {progressData[month.key as keyof typeof progressData].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <span className="text-sm font-semibold mt-2">{month.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">COLABORADORES</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Nombre</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Correo Electrónico</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Estado</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {colaboradores.map((colaborador, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">{colaborador.name}</td>
                      <td className="py-4 px-4">{colaborador.email}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          colaborador.status === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {colaborador.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button className="text-blue-600 hover:text-blue-800 font-medium">ver</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
