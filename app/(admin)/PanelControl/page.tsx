"use client"
import { AppSidebar } from '@/app/(admin)/-componentes/app-sidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { useState } from 'react'

export default function Page() {
    const [resumen, setResumen] = useState<'diario' | 'semanal' | 'mensual'>('diario')
    const [popupArea, setPopupArea] = useState<string | null>(null)

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
            fuera: 1,
            descanso: 4
        },
        {
            nombre: 'Diseño',
            horas: { trabajadas: 18.2, descansos: 0.8, extras: 2.5 },
            tareas: [
                { id: 1, nombre: 'Mockup landing', estado: 'Completada' },
                { id: 2, nombre: 'Revisión UX', estado: 'Pendiente' }
            ],
            dentro: 2,
            fuera: 0,
            descanso: 2
        }
    ]

    function openPopup(nombre: string) {
        setPopupArea(nombre)
    }
    function closePopup() {
        setPopupArea(null)
    }

    //
    const area = areas[1]
    if (!area) return null

    const totalTareas = area.tareas.length
    const completadas = area.tareas.filter(t => t.estado === 'Completada').length
    const enProceso = area.tareas.filter(t => t.estado === 'En progreso').length
    const pendientes = area.tareas.filter(t => t.estado === 'Pendiente').length
    const totalHoras = area.horas.trabajadas + area.horas.descansos + area.horas.extras
    
    const totalDentro = areas.reduce((sum, a) => sum + a.dentro, 0);
    const totalFuera = areas.reduce((sum, a) => sum + a.fuera, 0);
    const totalDescanso = areas.reduce((sum, a) => sum + a.descanso, 0);
    const [filtro, setFiltro] = useState<'dentro' | 'fuera' | 'descanso' | null>('dentro');
    //

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="bg-white w-full h-[80px] flex items-center px-8 shadow-sm">
                    <span className="font-bold text-2xl">Panel de control</span>
                </div>

                <div className="flex">
                    {/* CONTENIDO PRINCIPAL */}
                    <div className="flex-1 p-6 bg-gray-50">
                        <div className="flex gap-1 mb-8 bg-white rounded-lg p-1 w-fit">
                            {['diario', 'semanal', 'mensual'].map((r) => (
                                <button
                                    key={r}
                                    onClick={() => setResumen(r as any)}
                                    className={`px-6 py-2 rounded-md font-medium text-sm ${
                                        resumen === r ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    {r.charAt(0).toUpperCase() + r.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* TABLA RESUMEN DE ÁREAS */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-lg font-bold mb-4 text-center">RESUMEN DE ÁREAS</h3>
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
                            
                            {/*
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
                            */}
                        </div>
                    </div>

                    {/* PANEL DERECHO */}
                    <div className="w-80 bg-white shadow-lg p-6 h-[calc(100vh-80px)] overflow-y-auto">
                        <div className="text-center mb-4">
                            <span className="text-sm text-gray-600">¿Quién está dentro/fuera?</span>
                        </div>
                        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-4">
                            <button onClick={() => setFiltro('dentro')}
                                className = {`flex-1 py-2 px-3 cursor-pointer rounded-md text-sm ${filtro === 'dentro' ? 'bg-blue-500 text-white font-medium' : 'text-gray-600'}`}
                            >
                                {totalDentro} Dentro
                            </button>
                            <button onClick={() => setFiltro('descanso')} 
                                className = {`flex-1 py-2 px-3 cursor-pointer rounded-md text-sm ${filtro === 'descanso' ? 'bg-blue-500 text-white font-medium' : 'text-gray-600'}`}>
                                {totalDescanso} Descanso</button>
                            <button onClick={() => setFiltro('fuera')} 
                                className = {`flex-1 py-2 px-3 cursor-pointer rounded-md text-sm ${filtro === 'fuera' ? 'bg-blue-500 text-white font-medium' : 'text-gray-600'}`}>
                                {totalFuera} Fuera</button>
                        </div>
                        <div>
                            {filtro && (
                                <div className=''>
                                    {areas
                                        .filter((a) => a[filtro] > 0)
                                        .map((a, index) => (
                                            <p key={index} className=''>
                                                {a.nombre} ({a[filtro]})
                                                {index < areas.filter((a) => a[filtro] > 0).length -1}
                                            </p>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
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
            </SidebarInset>
        </SidebarProvider>
    )
}
