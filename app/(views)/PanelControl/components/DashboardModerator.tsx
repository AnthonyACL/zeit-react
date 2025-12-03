"use client"
import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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
  ChevronDown,
  MessageCircle
} from 'lucide-react'
import { MOCK_COLABORADORES, MOCK_PROYECTOS, MOCK_AREAS } from '@/data/mockData'


const DashboardModerator = ({ areaName }: { areaName?: string }) => {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState<any>(null);
    
    useEffect(() => {
        const user = localStorage.getItem('currentUser');
        if (user) {
            setCurrentUser(JSON.parse(user));
        }
    }, []);
    
    const handleChatClick = (usuario: any) => {
        // Guardar el usuario seleccionado en localStorage para que Chat lo use
        localStorage.setItem('selectedChatUser', JSON.stringify(usuario));
        router.push('/Chat');
    };
    
    // Obtener área actual del mock data - si no viene areaName, obtenerla del usuario logueado
    const areaModerador = useMemo(() => {
        let area = areaName;
        
        // Si no viene areaName, buscar el área del usuario logueado
        if (!area && currentUser) {
            const colaborador = MOCK_COLABORADORES.find(c => c.id === parseInt(currentUser.id));
            if (colaborador) {
                area = colaborador.area;
            }
        }
        
        return MOCK_AREAS.find(a => a.nombre === area) || MOCK_AREAS[3]; // Default a 'Desarrollo React'
    }, [areaName, currentUser]);

    // Obtener colaboradores del área actual (excluyendo al moderador)
    const colaboradoresArea = useMemo(() => {
        return MOCK_COLABORADORES.filter(col => 
            areaModerador.collaborators.includes(col.id) && col.id !== areaModerador.teamLeaderId
        ).map(col => ({
            id: col.id,
            nombre: col.nombre,
            area: col.area,
            estado: col.estado || 'activo' as 'activo' | 'descanso' | 'fuera',
            rol: col.rol,
            cargo: col.cargo
        }));
    }, [areaModerador]);

    // Obtener proyectos del área
    const proyectosArea = useMemo(() => {
        return MOCK_PROYECTOS.filter(p => p.area === areaName || p.area === areaModerador.nombre);
    }, [areaName, areaModerador]);

    // Mock tareas (mantener para ahora)
    const tareasArea = [
        { id: 1, nombre: 'Frontend Login', estado: 'Completada', asignadoA: colaboradoresArea[0]?.nombre || 'Sin asignar' },
        { id: 2, nombre: 'Revisión API', estado: 'En progreso', asignadoA: colaboradoresArea[0]?.nombre || 'Sin asignar' },
        { id: 3, nombre: 'Diseño Dashboard', estado: 'Pendiente', asignadoA: colaboradoresArea[1]?.nombre || 'Sin asignar' },
        { id: 4, nombre: 'Refactor Auth', estado: 'En progreso', asignadoA: colaboradoresArea[1]?.nombre || 'Sin asignar' }
    ];

    // Stats por área (horas de trabajo - valores base)
    const areaStats = {
        horas: { trabajadas: 24.44, descansos: 5.19, extras: 2.8 }
    };

    // Estado local para filtros UI
    const [filtroGrupo, setFiltroGrupo] = useState<'activo' | 'descanso' | 'fuera'>('activo');

    // Datos filtrados para el Moderator (Usando MOCK_DATA)
    const dataJefe = useMemo(() => {
        const filteredCollaborators = colaboradoresArea.filter(c => c.estado === filtroGrupo);

        return {
            areaNombre: areaModerador.nombre,
            collaborators: filteredCollaborators,
            projects: proyectosArea,
            tasks: tareasArea,
            stats: areaStats.horas
        }
    }, [filtroGrupo, colaboradoresArea, areaModerador, proyectosArea, tareasArea, areaStats])

    return (
        <div className="flex flex-col lg:flex-row gap-6 animate-in slide-in-from-right-4 duration-500">
            {/* IZQUIERDA: Gestión Operativa */}
            <div className="flex-1 space-y-5">
                {/* Header de Grupo */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded uppercase">Grupo</span>
                            <h2 className="text-2xl font-bold text-gray-800">{dataJefe.areaNombre}</h2>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Panel de control de asignaciones y tiempos.</p>
                    </div>
                    <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-lg border border-gray-100">
                        <div className="text-right">
                            <div className="text-xl font-bold text-indigo-600">{dataJefe.stats.trabajadas}h</div>
                            <div className="text-[10px] text-gray-400 uppercase font-bold">Semanal</div>
                        </div>
                        <div className="h-8 w-px bg-gray-200"></div>
                        <div className="text-right">
                            <div className="text-xl font-bold text-purple-600">{dataJefe.stats.extras}h</div>
                            <div className="text-[10px] text-gray-400 uppercase font-bold">Extras</div>
                        </div>
                    </div>
                </div>

                {/* Proyectos Asignados */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-3 text-lg">Proyectos Activos</h3>
                    <div className="space-y-3">
                        {dataJefe.projects.map(p => (
                            <div key={p.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors gap-3 group">
                                <div className="flex items-center gap-4">
                                    <div className={`w-2 h-10 rounded-full ${p.estado === 'Completado' ? 'bg-green-500' : p.estado === 'Pendiente' ? 'bg-yellow-400' : 'bg-blue-500'}`}></div>
                                    <div>
                                        <h5 className="font-bold text-gray-800">{p.nombre}</h5>
                                        <p className="text-xs text-gray-500 flex items-center gap-1">
                                            <UserCircle size={12}/> Líder: {p.manager}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                    <div className="flex-1 sm:w-32 bg-gray-200 h-2.5 rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full ${p.estado === 'Completado' ? 'bg-green-500' : 'bg-blue-500'}`} style={{width: `${p.avance}%`}}></div>
                                    </div>
                                    <span className="text-sm font-bold min-w-[3ch] text-right">{p.avance}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Tabla de Tareas */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-gray-800 text-lg">Control de Tareas</h3>
                        <button className="text-xs text-indigo-600 font-medium hover:underline">Ver todas</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-gray-400 border-b">
                                    <th className="pb-3 font-medium pl-2">Tarea</th>
                                    <th className="pb-3 font-medium">Responsable</th>
                                    <th className="pb-3 font-medium">Prioridad</th>
                                    <th className="pb-3 font-medium">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataJefe.tasks.map(t => (
                                    <tr key={t.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 group">
                                        <td className="py-3 pl-2 font-medium text-gray-700">{t.nombre}</td>
                                        <td className="py-3 text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-full bg-gray-200 text-xs flex items-center justify-center text-gray-600">
                                                    {t.asignadoA ? t.asignadoA.charAt(0) : '-'}
                                                </div>
                                                {t.asignadoA || 'Sin asignar'}
                                            </div>
                                        </td>
                                        <td className="py-3"><span className="text-xs font-medium text-orange-500 bg-orange-50 px-2 py-0.5 rounded">Alta</span></td>
                                        <td className="py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${t.estado === 'Completada' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{t.estado}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* DERECHA: Sidebar Contextual (Miembros) */}
            <div className="w-full lg:w-80 bg-white p-5 rounded-xl border border-gray-100 shadow-sm h-fit sticky top-6">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-gray-800 flex items-center gap-2">
                        <Users size={18} className="text-indigo-600"/> Mi Equipo
                    </h4>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{dataJefe.collaborators.length}</span>
                </div>
                
                {/* Filtros de Equipo */}
                <div className="flex gap-1 mb-4 p-1 bg-gray-100 rounded-lg">
                    {(['activo', 'descanso', 'fuera'] as const).map(f => (
                        <button 
                            key={f}
                            onClick={() => setFiltroGrupo(f)}
                            className={`flex-1 py-1.5 text-[10px] uppercase font-bold rounded transition-all ${filtroGrupo === f ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
                    {dataJefe.collaborators.map((c, i) => (
                        <div 
                            key={i} 
                            onClick={() => handleChatClick(c)}
                            className="flex items-center gap-3 p-2.5 hover:bg-indigo-50 rounded-lg transition-colors border border-transparent hover:border-indigo-200 group cursor-pointer"
                        >
                            <div className="relative">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600 flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
                                    {c.nombre.charAt(0)}
                                </div>
                                <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${c.estado === 'activo' ? 'bg-green-500' : c.estado === 'descanso' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-700 truncate">{c.nombre}</p>
                                <p className="text-xs text-gray-400 capitalize flex items-center gap-1">
                                    {c.estado === 'activo' ? 'Activo' : c.estado === 'descanso' ? 'Descanso' : 'Fuera'}
                                </p>
                            </div>
                            <MessageCircle size={16} className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    ))}
                    {dataJefe.collaborators.length === 0 && (
                        <div className="text-center py-8 text-gray-400 text-xs flex flex-col items-center">
                            <Filter size={24} className="mb-2 opacity-20"/>
                            No hay miembros con este filtro.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DashboardModerator;