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
import { MOCK_COLABORADORES, MOCK_AREAS } from '@/data/mockData'
const DashboardColaborador = ({ userName = 'Ana Gómez', userArea = 'Desarrollo' }: { userName?: string, userArea?: string }) => {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [filtroGrupo, setFiltroGrupo] = useState<'activo' | 'descanso' | 'fuera'>('activo');
    
    useEffect(() => {
        const user = localStorage.getItem('currentUser');
        if (user) {
            setCurrentUser(JSON.parse(user));
        }
    }, []);
    
    const handleChatClick = (usuario: any) => {
        localStorage.setItem('selectedChatUser', JSON.stringify(usuario));
        router.push('/Chat');
    };
    
    // Obtener área actual del mock data
    const areaModerador = useMemo(() => {
        let area = userArea;
        
        if (!area && currentUser) {
            const colaborador = MOCK_COLABORADORES.find(c => c.id === parseInt(currentUser.id));
            if (colaborador) {
                area = colaborador.area;
            }
        }
        
        return MOCK_AREAS.find(a => a.nombre === area) || MOCK_AREAS[3];
    }, [userArea, currentUser]);

    // Obtener colaboradores del área actual
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

    // Colaboradores filtrados por estado
    const colaboradoresFiltrados = useMemo(() => {
        return colaboradoresArea.filter(c => c.estado === filtroGrupo);
    }, [colaboradoresArea, filtroGrupo]);

    // Mock tareas locales
    const LOCAL_DATA = {
        myTasks: [
            { id: 1, nombre: 'Frontend Login', estado: 'Completada', fechaLimite: 'Hoy 18:00' },
            { id: 2, nombre: 'Revisión API', estado: 'En progreso', fechaLimite: 'Mañana 10:00' },
            { id: 4, nombre: 'Documentación V1', estado: 'Pendiente', fechaLimite: 'Viernes' }
        ]
    };

    return (
        <div className="w-full space-y-6 animate-in zoom-in-95 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Contenedor Izquierdo (Banner + Tareas + Métricas) */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Banner de Bienvenida */}
                    <div className="bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-0.5 bg-white/20 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">Colaborador</span>
                                    <span className="px-2 py-0.5 bg-white/10 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">{userArea}</span>
                                </div>
                                <h2 className="text-3xl font-bold mb-2">Hola, {userName}</h2>
                                <p className="text-indigo-200 text-sm max-w-md">Tienes {LOCAL_DATA.myTasks.filter(t => t.estado !== 'Completada').length} tareas pendientes para hoy. ¡Sigue con el buen trabajo!</p>
                            </div>
                            
                            <div className="flex gap-6 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                                <div className="text-center px-2">
                                    <span className="text-3xl font-bold block">{LOCAL_DATA.myTasks.filter(t => t.estado === 'Completada').length}</span>
                                    <span className="text-[10px] text-indigo-200 uppercase tracking-wider">Completadas</span>
                                </div>
                                <div className="w-px bg-white/20"></div>
                                <div className="text-center px-2">
                                    <span className="text-3xl font-bold block text-yellow-400">{LOCAL_DATA.myTasks.filter(t => t.estado !== 'Completada').length}</span>
                                    <span className="text-[10px] text-yellow-200 uppercase tracking-wider">Pendientes</span>
                                </div>
                            </div>
                        </div>
                        {/* Decoración de fondo */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>
                    </div>

                    {/* Tareas y Métricas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Columna Izquierda: Tareas */}
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-lg">
                                <CheckCircle2 size={20} className="text-indigo-600"/>
                                Mis Tareas Prioritarias
                            </h3>
                            <div className="space-y-3">
                                {LOCAL_DATA.myTasks.map(t => (
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
                                {LOCAL_DATA.myTasks.length === 0 && (
                                    <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                                        <p className="text-gray-400 font-medium">¡Estás al día! 🎉</p>
                                        <p className="text-xs text-gray-400 mt-1">No tienes tareas asignadas por ahora.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Columna Derecha: Métricas */}
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
                    </div>
                </div>

                {/* Sidebar Derecho: Mi Equipo (Ocupa 1 espacio, se extiende desde arriba) */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm sticky top-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                <Users size={18} className="text-indigo-600"/> Mi Equipo
                            </h3>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{colaboradoresFiltrados.length}</span>
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

                        <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1 custom-scrollbar">
                            {colaboradoresFiltrados.map((c, i) => (
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
                            {colaboradoresFiltrados.length === 0 && (
                                <div className="text-center py-8 text-gray-400 text-xs flex flex-col items-center">
                                    <Filter size={24} className="mb-2 opacity-20"/>
                                    No hay miembros con este filtro.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DashboardColaborador;