"use client"
import { useState, useMemo } from 'react'
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  CheckCircle2, 
  BarChart3, 
  Clock, 
  Filter,
  UserCircle,
  Menu,
  Bell,
  ChevronDown
} from 'lucide-react'
const DashboardColaborador = ({ userName = 'Ana Gómez', userArea = 'Desarrollo' }: { userName?: string, userArea?: string }) => {
    // --- MOCK DATA LOCAL (Reemplazar con fetch a /api/colaborador/mis-tareas) ---
    const LOCAL_DATA = {
        myTasks: [
            { id: 1, nombre: 'Frontend Login', estado: 'Completada', fechaLimite: 'Hoy 18:00' },
            { id: 2, nombre: 'Revisión API', estado: 'En progreso', fechaLimite: 'Mañana 10:00' },
            { id: 4, nombre: 'Documentación V1', estado: 'Pendiente', fechaLimite: 'Viernes' }
        ],
        teamMates: [
            { nombre: 'Micaela Bastidas', estado: 'dentro' },
            { nombre: 'Julio Riberyro', estado: 'dentro' },
            { nombre: 'Marcel Proust', estado: 'descanso' } // Opcional, si solo quieres ver activos
        ]
    };

    // Datos específicos del colaborador (Usando LOCAL_DATA)
    const dataColab = useMemo(() => {
        const activeTeammates = LOCAL_DATA.teamMates.filter(c => c.estado === 'dentro');
        return { tasks: LOCAL_DATA.myTasks, teammates: activeTeammates };
    }, [LOCAL_DATA]);

    return (
        <div className="max-w-5xl mx-auto space-y-6 animate-in zoom-in-95 duration-500">
            {/* Banner de Bienvenida */}
            <div className="bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 bg-white/20 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">Colaborador</span>
                            <span className="px-2 py-0.5 bg-white/10 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">{userArea}</span>
                        </div>
                        <h2 className="text-3xl font-bold mb-2">Hola, {userName}</h2>
                        <p className="text-indigo-200 text-sm max-w-md">Tienes {dataColab.tasks.filter(t => t.estado !== 'Completada').length} tareas pendientes para hoy. ¡Sigue con el buen trabajo!</p>
                    </div>
                    
                    <div className="flex gap-6 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                        <div className="text-center px-2">
                            <span className="text-3xl font-bold block">{dataColab.tasks.filter(t => t.estado === 'Completada').length}</span>
                            <span className="text-[10px] text-indigo-200 uppercase tracking-wider">Completadas</span>
                        </div>
                        <div className="w-px bg-white/20"></div>
                        <div className="text-center px-2">
                            <span className="text-3xl font-bold block text-yellow-400">{dataColab.tasks.filter(t => t.estado !== 'Completada').length}</span>
                            <span className="text-[10px] text-yellow-200 uppercase tracking-wider">Pendientes</span>
                        </div>
                    </div>
                </div>
                {/* Decoración de fondo */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Columna Izquierda: Tareas (Ocupa 2 espacios) */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-lg">
                            <CheckCircle2 size={20} className="text-indigo-600"/>
                            Mis Tareas Prioritarias
                        </h3>
                        <div className="space-y-3">
                            {dataColab.tasks.map(t => (
                                <div key={t.id} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer group">
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${t.estado === 'Completada' ? 'border-green-500 bg-green-500' : 'border-gray-300 group-hover:border-indigo-400'}`}>
                                        {t.estado === 'Completada' && <CheckCircle2 size={16} className="text-white"/>}
                                    </div>
                                    <div className="flex-1">
                                        <p className={`text-sm font-medium ${t.estado === 'Completada' ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{t.nombre}</p>
                                        <p className="text-xs text-gray-400">{t.fechaLimite}</p>
                                    </div>
                                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium uppercase ${t.estado === 'Completada' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                                        {t.estado}
                                    </span>
                                </div>
                            ))}
                            {dataColab.tasks.length === 0 && (
                                <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                                    <p className="text-gray-400 font-medium">¡Estás al día! 🎉</p>
                                    <p className="text-xs text-gray-400 mt-1">No tienes tareas asignadas por ahora.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Columna Derecha: Métricas y Equipo (Ocupa 1 espacio) */}
                <div className="space-y-6">
                    {/* Rendimiento */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <BarChart3 size={20} className="text-indigo-600"/>
                            Métricas de Hoy
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-xs mb-2">
                                    <span className="font-bold text-gray-700">Horas Trabajadas</span>
                                    <span className="font-bold text-indigo-600">6.5h <span className="text-gray-400 font-normal">/ 8h</span></span>
                                </div>
                                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: '80%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-2">
                                    <span className="font-medium text-gray-500">Eficiencia vs Grupo</span>
                                    <span className="text-gray-600">+12%</span>
                                </div>
                                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                                    <div className="bg-gray-400 h-full rounded-full" style={{ width: '88%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Compañeros */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-800 text-sm">Equipo Activo</h3>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">{dataColab.teammates.length} online</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            {dataColab.teammates.map((mate, i) => (
                                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="relative">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                            {mate.nombre.charAt(0)}
                                        </div>
                                        <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-600">{mate.nombre}</span>
                                </div>
                            ))}
                            {dataColab.teammates.length === 0 && (
                                <p className="text-xs text-gray-400 italic">No hay nadie más conectado de tu área.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DashboardColaborador;