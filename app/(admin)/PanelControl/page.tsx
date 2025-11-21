"use client"
import { AppSidebar } from '@/app/(admin)/-componentes/app-sidebar'
import { Button } from '@/components/ui/button'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { useState } from 'react'

export default function Page() {
    const [resumen, setResumen] = useState<'diario' | 'semanal' | 'mensual'>('diario');
    const [popupArea, setPopupArea] = useState<string | null>(null);
    const [verColaboradores, setVerColaboradores] = useState<string | null>(null);
    const [filtro, setFiltro] = useState<'dentro' | 'fuera' | 'descanso' | null>('dentro');

    // --- DATOS (Tus datos originales) ---
    const proyectos = [
        { id: 1, nombre: 'Proyecto X', estado: 'En progreso', avance: 70, manager: 'Ana G.' },
        { id: 2, nombre: 'Proyecto Y', estado: 'Completado', avance: 100, manager: 'Carlos S.' },
        { id: 3, nombre: 'Proyecto Z', estado: 'En progreso', avance: 15, manager: 'Santiago P.' },
        { id: 4, nombre: 'Proyecto D', estado: 'En progreso', avance: 45, manager: 'Martin F.' },
        { id: 5, nombre: 'Proyecto A', estado: 'Completado', avance: 100, manager: 'Gicela M.' },
        { id: 6, nombre: 'Proyecto B', estado: 'En progreso', avance: 60, manager: 'Julio R.' },
        { id: 7, nombre: 'Proyecto C', estado: 'Pendiente', avance: 0, manager: 'Pendiente' }
    ]

    const areas = [
        {
            nombre: 'Desarrollo',
            horas: { trabajadas: 24.44, descansos: 5.19, extras: 2.8 },
            proyecto: ['Proyecto Y', 'Proyecto A', 'Proyecto B', 'Proyecto C'],
            tareas: [
                { id: 1, nombre: 'Frontend Login', estado: 'Completada' },
                { id: 2, nombre: 'Revisión API', estado: 'En progreso' },
                { id: 3, nombre: 'Diseño Dashboard', estado: 'Pendiente' }
            ],
            dentro: 3, fuera: 1, descanso: 4
        },
        {
            nombre: 'Diseño',
            horas: { trabajadas: 10.2, descansos: 6.8, extras: 0.5 },
            proyecto: ['Proyecto X', 'Proyecto A'],
            tareas: [
                { id: 1, nombre: 'Mockup landing', estado: 'Completada' },
                { id: 2, nombre: 'Revisión UX', estado: 'Pendiente' }
            ],
            dentro: 2, fuera: 0, descanso: 2
        },
        {
            nombre: 'Análisis',
            horas: { trabajadas: 18.2, descansos: 0.8, extras: 2.5 },
            proyecto: ['Proyecto X'],
            tareas: [
                { id: 1, nombre: 'Mockup landing', estado: 'Pendiente' },
                { id: 2, nombre: 'Revisión UX', estado: 'Pendiente' }
            ],
            dentro: 2, fuera: 0, descanso: 2
        },
        {
            nombre: 'Implementación React',
            horas: { trabajadas: 24.44, descansos: 1.19, extras: 0.8 },
            proyecto: ['Proyecto Y'],
            tareas: [
                { id: 1, nombre: 'Frontend Login', estado: 'Completada' },
                { id: 2, nombre: 'Revisión API', estado: 'En progreso' },
                { id: 3, nombre: 'Diseño Dashboard', estado: 'Pendiente' }
            ],
            dentro: 3, fuera: 1, descanso: 4
        },
        {
            nombre: 'Implementación Angular',
            horas: { trabajadas: 30.44, descansos: 7.19, extras: 16.8 },
            proyecto: ['Proyecto Z'],
            tareas: [
                { id: 1, nombre: 'Frontend Login', estado: 'Completada' },
                { id: 2, nombre: 'Creación bd', estado: 'En progreso' },
                { id: 3, nombre: 'Diseño Dashboard', estado: 'En progreso' }
            ],
            dentro: 2, fuera: 1, descanso: 1
        },
        {
            nombre: 'Desarrollo Móvil',
            horas: { trabajadas: 24.44, descansos: 4.19, extras: 10.8 },
            proyecto: ['Proyecto D'],
            tareas: [
                { id: 1, nombre: 'Frontend Login', estado: 'Completada' },
                { id: 2, nombre: 'Creación bd', estado: 'En progreso' },
                { id: 3, nombre: 'Diseño Dashboard', estado: 'En progreso' },
                { id: 4, nombre: 'Diseño Inicio', estado: 'En progreso' }
            ],
            dentro: 2, fuera: 1, descanso: 2
        }
    ]

    const colaboradores = [
        // Tus datos de colaboradores (sin cambios)
        { nombre: 'Ana Gómez', area: 'Desarrollo', estado: 'dentro' },
        { nombre: 'Micaela Bastidas', area: 'Desarrollo', estado: 'dentro' },
        { nombre: 'Julio Riberyro', area: 'Desarrollo', estado: 'dentro' },
        { nombre: 'Marcel Proust', area: 'Desarrollo', estado: 'descanso' },
        { nombre: 'Tupac Amaru', area: 'Desarrollo', estado: 'descanso' },
        { nombre: 'Gicela Montes', area: 'Diseño', estado: 'dentro' },
        { nombre: 'Miranda Asoka', area: 'Diseño', estado: 'dentro' },
        { nombre: 'Morita García', area: 'Diseño', estado: 'descanso' },
        { nombre: 'Marta Gomez', area: 'Diseño', estado: 'descanso' },
        { nombre: 'Luciano Torres', area: 'Análisis', estado: 'descanso' },
        { nombre: 'Marta Rodríguez', area: 'Análisis', estado: 'descanso' },
        { nombre: 'Carlos Sánchez', area: 'Análisis', estado: 'dentro' },
        { nombre: 'Sofía Fernández', area: 'Análisis', estado: 'dentro' },
        { nombre: 'Valeria Ruiz', area: 'Implementación React', estado: 'dentro' },
        { nombre: 'Diego López', area: 'Implementación React', estado: 'dentro' },
        { nombre: 'Camila Jiménez', area: 'Implementación React', estado: 'dentro' },
        { nombre: 'Fernando Castro', area: 'Implementación React', estado: 'descanso' },
        { nombre: 'Lucía Morales', area: 'Implementación React', estado: 'descanso' },
        { nombre: 'Fernando Gonzales', area: 'Implementación React', estado: 'descanso' },
        { nombre: 'Lucero Ruiz', area: 'Implementación React', estado: 'descanso' },
        { nombre: 'Margaret Echenique', area: 'Implementación React', estado: 'fuera' },
        { nombre: 'Santiago Pérez', area: 'Implementación Angular', estado: 'dentro' },
        { nombre: 'Natalia Díaz', area: 'Implementación Angular', estado: 'dentro' },
        { nombre: 'Andrés Gómez', area: 'Implementación Angular', estado: 'descanso' },
        { nombre: 'Isabella Torres', area: 'Implementación Angular', estado: 'fuera' },
        { nombre: 'Martín Fernández', area: 'Desarrollo Móvil', estado: 'dentro' },
        { nombre: 'Camila Rodríguez', area: 'Desarrollo Móvil', estado: 'dentro' },
        { nombre: 'Valentina Torres', area: 'Desarrollo Móvil', estado: 'descanso' },
        { nombre: 'Dexter Melón', area: 'Desarrollo Móvil', estado: 'descanso' },
        { nombre: 'Joaquín Ruiz', area: 'Desarrollo Móvil', estado: 'fuera' },
    ]

    // --- LÓGICA / FUNCIONES ---
    function openPopup(nombre: string) { setPopupArea(nombre) }
    function closePopup() { setPopupArea(null) }
    function toggleColaboradores(name_area: string) {
        setVerColaboradores((prev) => prev === name_area ? null : name_area)
    }
    const cambioFiltro = (nameFiltro: 'dentro' | 'fuera' | 'descanso' | null) => {
        setFiltro(nameFiltro);
        setVerColaboradores(null);
    }

    // --- CÁLCULOS KPI ---
    const totalDentroUsers = colaboradores.filter(c => c.estado === 'dentro').length
    const totalFueraUsers = colaboradores.filter(c => c.estado === 'fuera').length
    const totalDescansoUsers = colaboradores.filter(c => c.estado === 'descanso').length
    const totalStaff = colaboradores.length;
    const activeProjects = proyectos.filter(p => p.estado === 'En progreso').length;
    const tasaActividad = Math.round((totalDentroUsers / totalStaff) * 100);

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'Completado': return 'bg-green-100 text-green-700';
            case 'En progreso': return 'bg-blue-100 text-blue-700';
            case 'Pendiente': return 'bg-yellow-100 text-yellow-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    }

    // --- DATOS FILTRADOS PARA "DESTACADOS" (Top 3) ---
    // Tomamos los primeros 3 proyectos que estén 'En progreso', si no hay suficientes, rellenamos con el resto
    const proyectosDestacados = proyectos
        .sort((a, b) => (a.estado === 'En progreso' ? -1 : 1)) // Priorizar 'En progreso'
        .slice(0, 3);

    const areasDestacadas = areas.slice(0, 3);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                {/* Header Simple */}
                <div className="bg-white w-full h-[70px] flex items-center px-8 border-b border-gray-200 justify-between">
                    <span className="font-bold text-xl text-gray-800">Dashboard Administrativo</span>
                    <div className="flex gap-2 text-sm">
                        {['diario', 'semanal', 'mensual'].map((r) => (
                            <button
                                key={r}
                                onClick={() => setResumen(r as any)}
                                className={`px-4 py-1 rounded-full transition-colors ${
                                    resumen === r ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'
                                }`}
                            >
                                {r.charAt(0).toUpperCase() + r.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row h-[calc(100vh-70px)] bg-gray-50 overflow-hidden">
                    
                    {/* 1. COLUMNA PRINCIPAL (IZQUIERDA) */}
                    <div className="flex-1 p-6 overflow-y-auto space-y-6">
                        
                        {/* SECCIÓN A: KPIs / Métricas Clave */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <p className="text-gray-500 text-xs font-medium uppercase">Total Personal</p>
                                <div className="flex items-end justify-between mt-2">
                                    <h3 className="text-3xl font-bold text-gray-800">{totalStaff}</h3>
                                    <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">Activos</span>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <p className="text-gray-500 text-xs font-medium uppercase">Proyectos Activos</p>
                                <div className="flex items-end justify-between mt-2">
                                    <h3 className="text-3xl font-bold text-gray-800">{activeProjects}</h3>
                                    <span className="text-blue-600 text-xs font-bold bg-blue-50 px-2 py-1 rounded-full">En curso</span>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <p className="text-gray-500 text-xs font-medium uppercase">Tasa Actividad (Hoy)</p>
                                <div className="flex items-end justify-between mt-2">
                                    <h3 className="text-3xl font-bold text-gray-800">{tasaActividad}%</h3>
                                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500" style={{width: `${tasaActividad}%`}}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <p className="text-gray-500 text-xs font-medium uppercase">Atención Requerida</p>
                                <div className="flex items-end justify-between mt-2">
                                    <h3 className="text-3xl font-bold text-gray-800">{proyectos.filter(p => p.avance === 0).length}</h3>
                                    <span className="text-red-600 text-xs font-bold bg-red-50 px-2 py-1 rounded-full">Sin iniciar</span>
                                </div>
                            </div>
                        </div>

                        {/* SECCIÓN B: Tabla de Proyectos DESTACADOS (Top 3) */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="font-bold text-gray-800">Proyectos Destacados</h3>
                                <Button variant="ghost" size="sm" className="text-xs text-blue-600 hover:text-blue-800">Ver todos</Button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3">Proyecto</th>
                                            <th className="px-6 py-3">Manager</th>
                                            <th className="px-6 py-3">Estado</th>
                                            <th className="px-6 py-3">Avance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Aquí usamos la variable filtrada proyectosDestacados */}
                                        {proyectosDestacados.map((p) => (
                                            <tr key={p.id} className="border-b hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 font-medium text-gray-900">{p.nombre}</td>
                                                <td className="px-6 py-4 text-gray-500">{p.manager || 'N/A'}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(p.estado)}`}>
                                                        {p.estado}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                                                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${p.avance}%` }}></div>
                                                    </div>
                                                    <span className="text-xs text-gray-500">{p.avance}%</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* SECCIÓN C: Áreas DESTACADAS (Top 3) */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-gray-800">Áreas Destacadas</h3>
                                <Button variant="ghost" size="sm" className="text-xs text-gray-500 hover:text-gray-800">Ver todas</Button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Aquí usamos la variable filtrada areasDestacadas */}
                                {areasDestacadas.map((area) => (
                                    <div key={area.nombre} onClick={() => openPopup(area.nombre)} 
                                         className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-semibold text-gray-700">{area.nombre}</span>
                                            <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">→</span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex text-xs justify-between text-gray-500 mb-1">
                                                <span>Horas Total: {(area.horas.trabajadas + area.horas.extras).toFixed(1)}h</span>
                                            </div>
                                            <div className="w-full h-3 flex rounded-full overflow-hidden bg-gray-100">
                                                <div className="bg-blue-500 h-full" style={{width: `${(area.horas.trabajadas / 40) * 100}%`}} title="Trabajadas"></div>
                                                <div className="bg-yellow-400 h-full" style={{width: `${(area.horas.descansos / 40) * 100}%`}} title="Descanso"></div>
                                                <div className="bg-purple-500 h-full" style={{width: `${(area.horas.extras / 40) * 100}%`}} title="Extras"></div>
                                            </div>
                                            <div className="flex gap-3 mt-2">
                                                <div className="flex items-center gap-1 text-xs text-gray-500"><div className="w-2 h-2 bg-blue-500 rounded-full"></div>Reg</div>
                                                <div className="flex items-center gap-1 text-xs text-gray-500"><div className="w-2 h-2 bg-purple-500 rounded-full"></div>Ext</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 2. PANEL DERECHO (RECURSOS - Se mantiene igual pero optimizado visualmente) */}
                    <div className="w-full lg:w-80 bg-white border-l border-gray-200 flex flex-col h-full">
                        <div className="p-5 border-b border-gray-100">
                            <h3 className="font-bold text-gray-800">Disponibilidad</h3>
                            <p className="text-xs text-gray-500">Estado del personal en tiempo real</p>
                        </div>

                        <div className="p-4 flex gap-1 justify-between bg-gray-50/50">
                            <button onClick={() => cambioFiltro('dentro')}
                                className={`flex-1 py-1.5 px-1 rounded text-xs font-medium transition-all ${filtro === 'dentro' ? 'bg-white text-green-600 shadow-sm border border-gray-200' : 'text-gray-500 hover:bg-gray-200'}`}>
                                <span className="block text-lg">{totalDentroUsers}</span> En Línea
                            </button>
                            <button onClick={() => cambioFiltro('descanso')}
                                className={`flex-1 py-1.5 px-1 rounded text-xs font-medium transition-all ${filtro === 'descanso' ? 'bg-white text-yellow-600 shadow-sm border border-gray-200' : 'text-gray-500 hover:bg-gray-200'}`}>
                                <span className="block text-lg">{totalDescansoUsers}</span> Pause
                            </button>
                            <button onClick={() => cambioFiltro('fuera')}
                                className={`flex-1 py-1.5 px-1 rounded text-xs font-medium transition-all ${filtro === 'fuera' ? 'bg-white text-gray-600 shadow-sm border border-gray-200' : 'text-gray-500 hover:bg-gray-200'}`}>
                                <span className="block text-lg">{totalFueraUsers}</span> Off
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4">
                            {filtro && areas
                                .filter(a => colaboradores.some(c => c.estado === filtro && c.area === a.nombre))
                                .map((a) => (
                                    <div key={a.nombre} className="mb-4">
                                        <div 
                                            onClick={() => toggleColaboradores(a.nombre)}
                                            className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 cursor-pointer group"
                                        >
                                            <span className="font-medium text-sm text-gray-700">{a.nombre}</span>
                                            <span className="bg-gray-100 text-gray-600 text-xs py-0.5 px-2 rounded-full group-hover:bg-gray-200">
                                                {colaboradores.filter(c => c.estado === filtro && c.area === a.nombre).length}
                                            </span>
                                        </div>
                                        <div className={`pl-3 mt-1 space-y-1 ${a.nombre !== verColaboradores ? 'hidden' : 'block'}`}>
                                            {colaboradores
                                                .filter(c => c.estado === filtro && c.area === a.nombre)
                                                .map((c) => (
                                                    <div key={c.nombre} className="flex items-center gap-2 p-1.5 rounded text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                                                        <div className={`w-2 h-2 rounded-full ${
                                                            c.estado === 'dentro' ? 'bg-green-500' : 
                                                            c.estado === 'descanso' ? 'bg-yellow-500' : 'bg-gray-300'
                                                        }`}></div>
                                                        {c.nombre}
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>

                {/* POPUP MODAL (Sin cambios) */}
                {popupArea && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-2xl p-6 w-[600px] max-w-[90%] relative animate-in fade-in zoom-in duration-200">
                            <button onClick={closePopup} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500">✕</button>
                            
                            <h3 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Detalle: {popupArea}</h3>
                            
                            {(() => {
                                const area = areas.find(a => a.nombre === popupArea)
                                if (!area) return null
                                
                                const proyectosCompletados = proyectos.filter(p => area.proyecto.includes(p.nombre) && p.estado == "Completado").length
                                const proyectosEnProceso = proyectos.filter(p => area.proyecto.includes(p.nombre) && p.estado == "En progreso").length
                                const proyectosPendientes = proyectos.filter(p => area.proyecto.includes(p.nombre) && p.estado == "Pendiente").length
                                const totalProyectos = area.proyecto.length

                                return (
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                        <div className='bg-gray-50 rounded-lg p-4 h-full'>
                                            <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Proyectos Asignados</h4>
                                            {area.proyecto.map((p) =>(
                                                <div key={p} className='flex items-center justify-between mb-2 bg-white p-2 rounded border border-gray-100 shadow-sm'>
                                                    <span className='text-sm font-medium text-gray-700 truncate max-w-[120px]'>{p}</span>
                                                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${getStatusColor(proyectos.find(proj => proj.nombre === p)?.estado || '')}`}>
                                                        {proyectos.find(proj => proj.nombre === p)?.estado}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-4">
                                             <div className="relative w-32 h-32">
                                                <svg className="w-full h-full" viewBox="0 0 160 160">
                                                    <circle cx="80" cy="80" r="60" stroke="#e5e7eb" strokeWidth="12" fill="none" />
                                                    <circle cx="80" cy="80" r="60" stroke="#22c55e" strokeWidth="12" fill="none"
                                                        strokeDasharray={`${(proyectosCompletados / totalProyectos) * 377} 377`}
                                                        transform="rotate(-90 80 80)" strokeLinecap="round" />
                                                </svg>
                                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                    <span className="text-2xl font-bold text-gray-800">{totalProyectos}</span>
                                                    <span className="text-[10px] text-gray-500 uppercase">Proyectos</span>
                                                </div>
                                             </div>
                                             <div className="mt-4 w-full space-y-1 text-xs">
                                                <div className="flex justify-between"><span>Completados</span><span className="font-bold">{proyectosCompletados}</span></div>
                                                <div className="flex justify-between"><span>En Curso</span><span className="font-bold">{proyectosEnProceso}</span></div>
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