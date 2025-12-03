"use client";

import { AppSidebar } from '@/app/(views)/-componentes/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function Page() {
  const users = [
    { name: 'Diego Alonso', role: 'Administración', avatar: '/avatars/diego.jpg' },
    { name: 'Ana Torres', role: 'Supervisor', avatar: '/avatars/ana.jpg' },
    { name: 'Luis Pérez', role: 'Operador', avatar: '/avatars/luis.jpg' },
  ];

  //asdf
  const [popupArea, setPopupArea] = useState<string | null>(null);
  
  function openPopup(nombre: string) {
        setPopupArea(nombre)
    }
    function closePopup() {
        setPopupArea(null)
    }

  const areas = [
    {
        nombre: 'Desarrollo',
        horas: { trabajadas: 24.44, descansos: 1.19, extras: 0.8 },
        tareas: [
            { id: 1, nombre: 'Frontend Login', estado: 'Completada' },
            { id: 2, nombre: 'Revisión API', estado: 'En progreso' },
            { id: 3, nombre: 'Diseño Dashboard', estado: 'Pendiente' }
        ],
        dentro: 3,
        fuera: 1
    },
    {
        nombre: 'Diseño',
        horas: { trabajadas: 18.2, descansos: 0.8, extras: 2.5 },
        tareas: [
            { id: 1, nombre: 'Mockup landing', estado: 'Completada' },
            { id: 2, nombre: 'Revisión UX', estado: 'Pendiente' }
        ],
        dentro: 2,
        fuera: 0
    }
  ]
  //fin

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
          {/*
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
          */}

          {/* TABLA RESUMEN DE ÁREAS */}
          <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold mb-4 text-center">RESUMEN DE ÁREAS</h3>
              <table className="w-full text-sm text-left border-collapse">
                  <thead>
                      <tr className="border-b">
                          <th className="p-2">Área</th>
                          <th className="p-2 text-center">Horas trabajadas</th>
                          <th className="p-2 text-center">Descansos</th>
                          <th className="p-2 text-center">Extras</th>
                          <th className="p-2 text-center">Ver más</th>
                      </tr>
                  </thead>
                  <tbody>
                      {areas.map((a) => (
                          <tr key={a.nombre} className="hover:bg-gray-50">
                              <td className="p-2 font-medium">{a.nombre}</td>
                              <td className="p-2 text-center text-green-600">{a.horas.trabajadas}h</td>
                              <td className="p-2 text-center text-orange-600">{a.horas.descansos}h</td>
                              <td className="p-2 text-center text-red-600">{a.horas.extras}h</td>
                              <td className="p-2 text-center">
                                  <button
                                      onClick={() => openPopup(a.nombre)}
                                      className="text-blue-600 hover:underline"
                                  >
                                      Detalle
                                  </button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
          {/* POPUP RESUMEN DE ÁREA */}
            {popupArea && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-xl shadow-lg p-6 w-[600px] relative">
                      <button
                          onClick={closePopup}
                          className="absolute top-3 right-4 text-gray-400 hover:text-black text-lg"
                      >
                          ✕
                      </button>

                      <h3 className="text-lg font-bold mb-4 text-center">Resumen: {popupArea}</h3>

                      {(() => {
                          const area = areas.find(a => a.nombre === popupArea)
                          if (!area) return null

                          const totalTareas = area.tareas.length
                          const completadas = area.tareas.filter(t => t.estado === 'Completada').length
                          const enProceso = area.tareas.filter(t => t.estado === 'En progreso').length
                          const pendientes = area.tareas.filter(t => t.estado === 'Pendiente').length
                          const totalHoras = area.horas.trabajadas + area.horas.descansos + area.horas.extras

                          return (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* GRÁFICO DE HORAS */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="text-sm font-semibold mb-2 text-center">Asistencias</h4>
                                    <div className="flex items-end justify-center h-40 gap-4">
                                        {[
                                            { label: 'Trabajadas', color: '#22c55e', valor: area.horas.trabajadas },
                                            { label: 'Descansos', color: '#f97316', valor: area.horas.descansos },
                                            { label: 'Extras', color: '#ef4444', valor: area.horas.extras }
                                        ].map((d) => (
                                            <div key={d.label} className="flex flex-col items-center">
                                                <div
                                                    className="rounded-t-md w-12 transition-all duration-700"
                                                    style={{
                                                        height: `${(d.valor / totalHoras) * 100}%`,
                                                        backgroundColor: d.color
                                                    }}
                                                ></div>
                                                <span className="text-xs mt-2">{d.label}</span>
                                                <span className="text-xs font-bold">{d.valor}h</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* GRÁFICO DE TAREAS */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="text-sm font-semibold mb-2 text-center">Tareas</h4>
                                    <div className="flex items-center justify-center relative">
                                        <svg width="160" height="160" viewBox="0 0 160 160">
                                            <circle cx="80" cy="80" r="60" stroke="#e5e7eb" strokeWidth="20" fill="none" />
                                            <circle
                                                cx="80" cy="80" r="60"
                                                stroke="#22c55e" strokeWidth="20" fill="none"
                                                strokeDasharray={`${(completadas / totalTareas) * 377} 377`}
                                                transform="rotate(-90 80 80)" strokeLinecap="round"
                                            />
                                            <circle
                                                cx="80" cy="80" r="60"
                                                stroke="#f97316" strokeWidth="20" fill="none"
                                                strokeDasharray={`${(enProceso / totalTareas) * 377} 377`}
                                                transform={`rotate(${(completadas / totalTareas) * 360 - 90} 80 80)`}
                                                strokeLinecap="round"
                                            />
                                            <circle
                                                cx="80" cy="80" r="60"
                                                stroke="#ef4444" strokeWidth="20" fill="none"
                                                strokeDasharray={`${(pendientes / totalTareas) * 377} 377`}
                                                transform={`rotate(${((completadas + enProceso) / totalTareas) * 360 - 90} 80 80)`}
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <div className="absolute text-center">
                                            <span className="text-xl font-bold">{Math.round((completadas / totalTareas) * 100)}%</span>
                                            <div className="text-xs text-gray-500">Completado</div>
                                        </div>
                                    </div>
                                    <div className="mt-2 text-xs text-gray-600 space-y-1">
                                        <div><span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>Completadas ({completadas})</div>
                                        <div><span className="inline-block w-3 h-3 bg-orange-500 rounded-full mr-2"></span>En progreso ({enProceso})</div>
                                        <div><span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>Pendientes ({pendientes})</div>
                                    </div>
                                </div>
                            </div>
                          )
                      })()}
                  </div>
              </div>
            )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
