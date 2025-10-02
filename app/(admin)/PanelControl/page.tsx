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
        { id: 4, nombre: 'Realizar vista Configuración', estado: 'Completada', fecha: '2025-09-10' },
        { id: 5, nombre: 'Realizar vista', estado: 'En progreso', fecha: '2025-09-11' },
        { id: 6, nombre: 'Crear vista notificaciones en figma', estado: 'Pendiente', fecha: '2025-09-12' },
    ]
    
    const totalTareas = tareas.length
    const completadas = tareas.filter(t => t.estado === 'Completada').length
    const enProceso = tareas.filter(t => t.estado === 'En progreso').length
    const pendientes = tareas.filter(t => t.estado === 'Pendiente').length
    const porcentaje = Math.round((completadas / totalTareas) * 100)
    
    // Datos para el gráfico de horas
    const horasData = {
        trabajadas: { valor: 24.44, color: '#22c55e' },
        descansos: { valor: 1.19, color: '#f97316' },
        extras: { valor: 0, color: '#ef4444' }
    }
    
    const maxHoras = 33.20
    
    function cn(...classes: (string | undefined | null | false)[]) {
        return classes.filter(Boolean).join(' ')
    }
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="bg-white w-full h-[80px] flex items-center px-8 shadow-sm ">
                    <span className="font-bold" style={{ fontSize: 27 }}>Panel de control</span>
                </div>
                
                <div className="flex">
                    {/* Contenido principal */}
                    <div className="flex-1 p-6 bg-gray-50">
                        {/* Botones de período */}
                        <div className="flex gap-1 mb-8 bg-white rounded-lg p-1 w-fit">
                            <button
                                className={cn(
                                    'px-6 py-2 rounded-md font-medium transition-colors text-sm',
                                    resumen === 'diario' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                                )}
                                onClick={() => setResumen('diario')}
                            >
                                Día
                            </button>
                            <button
                                className={cn(
                                    'px-6 py-2 rounded-md font-medium transition-colors text-sm',
                                    resumen === 'semanal' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                                )}
                                onClick={() => setResumen('semanal')}
                            >
                                Semana
                            </button>
                            <button
                                className={cn(
                                    'px-6 py-2 rounded-md font-medium transition-colors text-sm',
                                    resumen === 'mensual' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                                )}
                                onClick={() => setResumen('mensual')}
                            >
                                Mes
                            </button>
                        </div>
                        
                        {/* Grid principal */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                            <BarChart />
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <DonutChart />
                                <TaskList title="TAREAS" tasks={tareas.slice(0, 6)} />
                            </div>
                        </div>
                    </div>
                    
                    {/* Panel lateral derecho */}
                    <div className="w-80 bg-white shadow-lg p-6 h-[calc(100vh-80px)] overflow-y-auto">
                        <div className="mb-6">
                            <div className="text-center mb-4">
                                <span className="text-sm text-gray-600">¿Quién está dentro/fuera?</span>
                            </div>
                            
                            <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-4">
                                <button className="flex-1 py-2 px-3 bg-blue-500 text-white rounded-md text-sm font-medium">
                                    1 Dentro
                                </button>
                                <button className="flex-1 py-2 px-3 text-gray-600 text-sm">
                                    3 Descanso
                                </button>
                                <button className="flex-1 py-2 px-3 text-gray-600 text-sm">
                                    0 Fuera
                                </button>
                            </div>
                            
                            <div className="relative mb-4">
                                <input 
                                    type="text" 
                                    placeholder="Buscar miembros..." 
                                    className="w-full p-3 border border-gray-200 rounded-lg pl-10"
                                />
                                <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                        <span className="text-white font-medium text-sm">A</span>
                                    </div>
                                    <span className="text-sm font-medium">Alonso</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
    // Componente para el gráfico de barras
    function BarChart() {
        return (
            <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold mb-4 text-center">HORAS REGISTRADAS</h3>
                <div className="flex items-end justify-center h-48 gap-4">
                    <div className="flex flex-col items-center">
                        <div className="text-xs text-gray-500 mb-2">{maxHoras}m</div>
                        <div 
                            className="bg-green-500 rounded-t-md w-16 transition-all duration-1000"
                            style={{ height: `${(horasData.trabajadas.valor / maxHoras) * 100}%` }}
                        ></div>
                        <div className="text-xs mt-2 text-center">
                            <div className="flex items-center gap-1 mb-1">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span>HORAS TRABAJADAS</span>
                            </div>
                            <span className="font-bold">{horasData.trabajadas.valor}h</span>
                        </div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                        <div className="text-xs text-gray-500 mb-2">25h</div>
                        <div 
                            className="bg-orange-500 rounded-t-md w-16 transition-all duration-1000"
                            style={{ height: `${(horasData.descansos.valor / maxHoras) * 100}%` }}
                        ></div>
                        <div className="text-xs mt-2 text-center">
                            <div className="flex items-center gap-1 mb-1">
                                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                <span>DESCANSOS</span>
                            </div>
                            <span className="font-bold">{horasData.descansos.valor}m</span>
                        </div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                        <div className="text-xs text-gray-500 mb-2">16h 40m</div>
                        <div 
                            className="bg-red-500 rounded-t-md w-16 transition-all duration-1000"
                            style={{ height: `${(horasData.extras.valor / maxHoras) * 100}%` }}
                        ></div>
                        <div className="text-xs mt-2 text-center">
                            <div className="flex items-center gap-1 mb-1">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <span>HORAS EXTRAS</span>
                            </div>
                            <span className="font-bold">{horasData.extras.valor}h {horasData.extras.valor}m</span>
                        </div>
                    </div>
                </div>
                <div className="text-xs text-gray-500 text-center mt-2">0s</div>
            </div>
        )
    }
    
    // Componente para el gráfico de dona
    function DonutChart() {
        const terminado = 25
        const enProcesoPct = 50
        const pausado = 25
        
        const radius = 70
        const circumference = 2 * Math.PI * radius
        const strokeWidth = 25
        
        return (
            <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold mb-4 text-center">TAREAS</h3>
                <div className="flex items-center justify-center">
                    <div className="relative">
                        <svg width="180" height="180" viewBox="0 0 180 180">
                            {/* Círculo base */}
                            <circle
                                cx="90"
                                cy="90"
                                r={radius}
                                stroke="#e5e7eb"
                                strokeWidth={strokeWidth}
                                fill="none"
                            />
                            
                            {/* Segmento completado (verde) */}
                            <circle
                                cx="90"
                                cy="90"
                                r={radius}
                                stroke="#22c55e"
                                strokeWidth={strokeWidth}
                                fill="none"
                                strokeDasharray={circumference}
                                strokeDashoffset={circumference * (1 - terminado / 100)}
                                strokeLinecap="round"
                                transform="rotate(-90 90 90)"
                                style={{ transition: 'stroke-dashoffset 1s' }}
                            />
                            
                            {/* Segmento en proceso (naranja) */}
                            <circle
                                cx="90"
                                cy="90"
                                r={radius}
                                stroke="#f97316"
                                strokeWidth={strokeWidth}
                                fill="none"
                                strokeDasharray={circumference}
                                strokeDashoffset={circumference * (1 - enProcesoPct / 100)}
                                strokeLinecap="round"
                                transform={`rotate(${(terminado / 100) * 360 - 90} 90 90)`}
                                style={{ transition: 'stroke-dashoffset 1s' }}
                            />
                            
                            {/* Segmento pausado (rojo) */}
                            <circle
                                cx="90"
                                cy="90"
                                r={radius}
                                stroke="#ef4444"
                                strokeWidth={strokeWidth}
                                fill="none"
                                strokeDasharray={circumference}
                                strokeDashoffset={circumference * (1 - pausado / 100)}
                                strokeLinecap="round"
                                transform={`rotate(${((terminado + enProcesoPct) / 100) * 360 - 90} 90 90)`}
                                style={{ transition: 'stroke-dashoffset 1s' }}
                            />
                        </svg>
                    </div>
                </div>
                
                <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm">Terminado</span>
                        </div>
                        <span className="text-sm font-bold">{terminado}%</span>
                    </div>
                    <div className="text-xs text-gray-500 ml-5">25% de 100%</div>
                    
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                            <span className="text-sm">En proceso</span>
                        </div>
                        <span className="text-sm font-bold">{enProcesoPct}%</span>
                    </div>
                    <div className="text-xs text-gray-500 ml-5">25% de 100%</div>
                    
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-sm">Pausado</span>
                        </div>
                        <span className="text-sm font-bold">{pausado}%</span>
                    </div>
                    <div className="text-xs text-gray-500 ml-5">50% de 100%</div>
                </div>
            </div>
        )
    }
    
    // Componente para la lista de tareas
    type Task = {
        id: number
        nombre: string
        estado: string
        fecha: string
    }
    type TaskListProps = {
        title: string
        tasks: Task[]
    }
    function TaskList({ title, tasks }: TaskListProps) {
        return (
            <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold mb-4 text-center">{title}</h3>
                <div className="space-y-3">
                    {tasks.map((tarea) => (
                        <div key={tarea.id} className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${
                                tarea.estado === 'Completada' ? 'bg-green-500' :
                                tarea.estado === 'En progreso' ? 'bg-orange-500' :
                                'bg-red-500'
                            }`}></div>
                            <span className="text-sm">{tarea.nombre}</span>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    
    
}