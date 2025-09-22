"use client"
import { AppSidebar } from '@/app/(admin)/-componentes/app-sidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { useState } from 'react'

export default function Page() {
    const [resumen, setResumen] = useState('diario')
    const tareas = [
        { id: 1, nombre: 'Revisión de informes', estado: 'Completada', fecha: '2025-09-10' },
        { id: 2, nombre: 'Asistencia reunión', estado: 'Pendiente', fecha: '2025-09-11' },
        { id: 3, nombre: 'Entrega tarea', estado: 'En progreso', fecha: '2025-09-12' },
    ]
    const totalTareas = tareas.length
    const completadas = tareas.filter(t => t.estado === 'Completada').length
    const porcentaje = Math.round((completadas / totalTareas) * 100)
    function cn(...classes: (string | undefined | false | null)[]): string {
        return classes.filter(Boolean).join(' ')
    }
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="bg-white w-full h-[80px] flex items-center px-8 shadow-sm mb-8">
                    <span className="font-bold" style={{ fontSize: 27 }}>Panel de control</span>
                </div>
                <div className="p-8">
                    <div className="flex justify-center gap-4 mb-8">
                        <button
                            className={cn(
                                'px-6 py-2 rounded-full font-semibold border transition-colors',
                                resumen === 'diario' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
                            )}
                            onClick={() => setResumen('diario')}
                        >
                            Diario
                        </button>
                        <button
                            className={cn(
                                'px-6 py-2 rounded-full font-semibold border transition-colors',
                                resumen === 'semanal' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
                            )}
                            onClick={() => setResumen('semanal')}
                        >
                            Semanal
                        </button>
                        <button
                            className={cn(
                                'px-6 py-2 rounded-full font-semibold border transition-colors',
                                resumen === 'mensual' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
                            )}
                            onClick={() => setResumen('mensual')}
                        >
                            Mensual
                        </button>
                    </div>
                    <h1 className="text-3xl font-bold mb-8 text-center">Panel de Progresos</h1>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-10">
                        <div className="flex flex-col gap-10 md:flex-row items-center">
                            <div className="flex flex-col items-center">
                                <div className="relative flex items-center justify-center w-64 h-64">
                                    <svg width="220" height="220" viewBox="0 0 220 220">
                                        <circle cx="110" cy="110" r="90" stroke="#e5e7eb" strokeWidth="20" fill="none" />
                                        <circle
                                            cx="110"
                                            cy="110"
                                            r="90"
                                            stroke="#2563eb"
                                            strokeWidth="20"
                                            fill="none"
                                            strokeDasharray={2 * Math.PI * 90}
                                            strokeDashoffset={2 * Math.PI * 90 * (1 - porcentaje / 100)}
                                            strokeLinecap="round"
                                            style={{ transition: 'stroke-dashoffset 1s' }}
                                        />
                                        <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="2.5rem" fill="#2563eb" fontWeight="bold">{porcentaje}%</text>
                                    </svg>
                                </div>
                                <span className="text-lg font-bold mt-4">Progreso general</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="relative flex items-center justify-center w-64 h-64">
                                    {(() => {
                                        const totalAsistencias = 20
                                        const asistencias = 16
                                        const porcentajeAsist = Math.round((asistencias / totalAsistencias) * 100)
                                        return (
                                            <svg width="220" height="220" viewBox="0 0 220 220">
                                                <circle cx="110" cy="110" r="90" stroke="#e5e7eb" strokeWidth="20" fill="none" />
                                                <circle
                                                    cx="110"
                                                    cy="110"
                                                    r="90"
                                                    stroke="#22c55e"
                                                    strokeWidth="20"
                                                    fill="none"
                                                    strokeDasharray={2 * Math.PI * 90}
                                                    strokeDashoffset={2 * Math.PI * 90 * (1 - porcentajeAsist / 100)}
                                                    strokeLinecap="round"
                                                    style={{ transition: 'stroke-dashoffset 1s' }}
                                                />
                                                <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="2.5rem" fill="#22c55e" fontWeight="bold">{porcentajeAsist}%</text>
                                            </svg>
                                        )
                                    })()}
                                </div>
                                <span className="text-lg font-bold mt-4">Asistencias</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 bg-white rounded-xl shadow-md p-8 min-w-[180px] ml-8 items-center justify-center">
                            <span className="text-base text-gray-500">Tareas totales</span>
                            <span className="text-4xl font-bold text-blue-600">3</span>
                            <span className="text-base text-gray-500 mt-2">Completadas</span>
                            <span className="text-4xl font-bold text-green-600">1</span>
                            <span className="text-base text-gray-500 mt-2">Pendientes</span>
                            <span className="text-4xl font-bold text-yellow-500">2</span>
                        </div>
                    </div>
                    
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
