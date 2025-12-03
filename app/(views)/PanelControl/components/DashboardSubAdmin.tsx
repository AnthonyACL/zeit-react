'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Trophy, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  MoreHorizontal,
  Briefcase,
  ChevronRight,
  Star
} from 'lucide-react';
import { MOCK_COLABORADORES, MOCK_AREAS, MOCK_PROYECTOS, MOCK_PROYECTOS_ESTADISTICAS } from '@/data/mockData';

export default function DashboardSubjefe() {
    const router = useRouter();
    
    // --- ESTADO: Selector de Grupo ---
    const [grupoSeleccionado, setGrupoSeleccionado] = useState('Todos');
    const [rangoFechas, setRangoFechas] = useState<'dia' | 'semana' | 'mes'>('mes');

    // --- OBTENER ÁREAS ÚNICAS ---
    const areasUnicas = useMemo(() => {
      const areas = MOCK_AREAS.map(a => a.nombre);
      return areas;
    }, []);

    // --- CONVERTIR MOCK_AREAS a formato de proyectos con nombres dinámicos ---
    const proyectos = useMemo(() => {
      return MOCK_PROYECTOS_ESTADISTICAS.map((proyecto) => ({
        id: proyecto.id,
        nombre: proyecto.nombre,
        area: proyecto.area,
        grupo: proyecto.area,
        avance: proyecto[rangoFechas].avance,
        estado: proyecto[rangoFechas].estado,
        tareasTotales: proyecto[rangoFechas].tareasTotales,
        tareasCompletas: proyecto[rangoFechas].tareasCompletas,
        teamLeaderId: null
      }));
    }, [rangoFechas]);

    // --- GENERAR TAREAS PRÓXIMAS A VENCER (basadas en colaboradores) ---
    const tareasVencimiento = useMemo(() => {
      return MOCK_COLABORADORES.slice(0, 4).map((col, idx) => ({
        id: 100 + idx,
        tarea: ['Revisión código', 'Testing', 'Documentación', 'Deploy'][idx],
        responsable: col.nombre,
        fecha: ['Hoy, 18:00', 'Mañana, 09:00', 'Mañana, 12:00', 'En 2 días'][idx],
        prioridad: ['Alta', 'Media', 'Alta', 'Baja'][idx],
        avatar: col.nombre.split(' ').map(n => n[0]).join('')
      }));
    }, []);

    // --- COLABORADOR DESTACADO (del primero que NO sea Admin) ---
    const colaboradorDestacado = useMemo(() => {
      const colNoAdmin = MOCK_COLABORADORES.find(col => col.rol !== 'Admin');
      const col = colNoAdmin || MOCK_COLABORADORES[1];
      return {
        nombre: col.nombre,
        rol: col.cargo,
        avatar: col.nombre.split(' ').map(n => n[0]).join(''),
        tareasCompletadas: Math.floor(Math.random() * 20) + 10,
        racha: Math.floor(Math.random() * 5) + 1 + ' días sin retrasos',
        badge: 'Top Performer'
      };
    }, []);

    // --- CARGA DE TRABAJO (basada en MOCK_AREAS) ---
    const cargaTrabajo = useMemo(() => {
      const colores = ['bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 'bg-pink-500', 'bg-indigo-500', 'bg-cyan-500'];
      return MOCK_AREAS.slice(0, 6).map((area, idx) => ({
        area: area.nombre,
        porcentaje: Math.floor(Math.random() * 60) + 40, // 40-100%
        color: colores[idx % colores.length]
      }));
    }, []);

    // --- LÓGICA DE UI ---
    
    const proyectosFiltrados = grupoSeleccionado === 'Todos' 
        ? proyectos 
        : proyectos.filter(p => p.area === grupoSeleccionado);

    const totalTareas = proyectosFiltrados.reduce((acc, curr) => acc + curr.tareasTotales, 0);
    const totalCompletas = proyectosFiltrados.reduce((acc, curr) => acc + curr.tareasCompletas, 0);
    const porcentajeGlobal = Math.round((totalCompletas / totalTareas) * 100) || 0;

    const getEstadoColor = (estado: string) => {
        switch(estado) {
            case 'Retrasado': return 'text-red-600 bg-red-50 border-red-200';
            case 'Adelantado': return 'text-green-600 bg-green-50 border-green-200';
            default: return 'text-blue-600 bg-blue-50 border-blue-200';
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-900">
            
            {/* --- HEADER PRINCIPAL --- */}
            <div className="mb-8">
                {/* --- KPI CARDS --- */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
                    {/* Card 1: Avance Global */}
                    <div className="col-span-1 md:col-span-2 bg-indigo-600 text-white p-6 rounded-xl shadow-md flex items-center justify-between relative overflow-hidden">
                        <div className="relative z-10">
                            <p className="text-indigo-200 text-xs font-bold uppercase tracking-wider">Avance General del Periodo</p>
                            <h3 className="text-4xl font-bold mt-1">{porcentajeGlobal}%</h3>
                            <p className="text-sm text-indigo-100 mt-2 flex items-center gap-1">
                                <CheckCircle2 size={14}/> {totalCompletas} de {totalTareas} tareas finalizadas
                            </p>
                            {/* Selector de Rango de Fechas */}
                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={() => setRangoFechas('dia')}
                                    className={`px-3 py-1 text-xs font-bold rounded transition-all ${
                                        rangoFechas === 'dia'
                                            ? 'bg-white text-indigo-600'
                                            : 'bg-white/20 text-white hover:bg-white/30'
                                    }`}
                                >
                                    Día
                                </button>
                                <button
                                    onClick={() => setRangoFechas('semana')}
                                    className={`px-3 py-1 text-xs font-bold rounded transition-all ${
                                        rangoFechas === 'semana'
                                            ? 'bg-white text-indigo-600'
                                            : 'bg-white/20 text-white hover:bg-white/30'
                                    }`}
                                >
                                    Semana
                                </button>
                                <button
                                    onClick={() => setRangoFechas('mes')}
                                    className={`px-3 py-1 text-xs font-bold rounded transition-all ${
                                        rangoFechas === 'mes'
                                            ? 'bg-white text-indigo-600'
                                            : 'bg-white/20 text-white hover:bg-white/30'
                                    }`}
                                >
                                    Mes
                                </button>
                            </div>
                        </div>
                        <div className="w-24 h-24 rounded-full border-4 border-indigo-400 border-t-white flex items-center justify-center relative z-10">
                            <TrendingUp size={32} />
                        </div>
                        <div className="absolute right-0 bottom-0 w-32 h-32 bg-white opacity-5 rounded-full translate-y-1/2 translate-x-1/2"></div>
                    </div>

                    {/* Card 2: Riesgos */}
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Riesgo / Retraso</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-1">2</h3>
                            </div>
                            <div className="p-2 bg-red-50 text-red-500 rounded-lg">
                                <AlertCircle size={20}/>
                            </div>
                        </div>
                        <p className="text-xs text-red-600 font-medium mt-2">Áreas requieren atención</p>
                    </div>

                    {/* Card 3: Equipo Activo */}
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Equipo Activo</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-1">{MOCK_COLABORADORES.length}</h3>
                            </div>
                            <div className="p-2 bg-blue-50 text-blue-500 rounded-lg">
                                <Users size={20}/>
                            </div>
                        </div>
                        <p className="text-xs text-green-600 font-medium mt-2 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span> Todos online
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* --- COLUMNA IZQUIERDA: GESTIÓN DE TAREAS Y PROYECTOS (2/3) --- */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Sección 1: Desglose de Proyectos/Áreas */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                <Briefcase size={18} className="text-gray-400"/>
                                Avance por Áreas
                            </h3>
                            <button className="text-sm text-indigo-600 font-medium hover:text-indigo-800">Ver detalles</button>
                        </div>
                        
                        <div className="space-y-6">
                            {proyectosFiltrados.map((proyecto) => (
                                <div key={proyecto.id}>
                                    <div className="flex justify-between items-end mb-1">
                                        <div>
                                            <span className="text-xs font-bold text-gray-400 uppercase">{proyecto.area}</span>
                                            <h4 className="font-bold text-gray-800">{proyecto.nombre}</h4>
                                        </div>
                                        <div className="text-right">
                                            <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase ${getEstadoColor(proyecto.estado)}`}>
                                                {proyecto.estado}
                                            </span>
                                            <p className="text-sm font-bold text-gray-700 mt-1">{proyecto.avance}%</p>
                                        </div>
                                    </div>
                                    {/* Barra de Progreso */}
                                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                                        <div 
                                            className={`h-2.5 rounded-full transition-all duration-1000 ${
                                                proyecto.avance < 50 ? 'bg-orange-500' : 
                                                proyecto.avance > 90 ? 'bg-green-500' : 'bg-indigo-600'
                                            }`} 
                                            style={{ width: `${proyecto.avance}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sección 2: Tareas Próximas a Vencer */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-100 bg-red-50/30 flex justify-between items-center">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                <Clock size={18} className="text-red-500"/>
                                Próximas Entregas (Urgente)
                            </h3>
                            <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-bold">
                                {tareasVencimiento.length} pendientes
                            </span>
                        </div>
                        
                        <div className="divide-y divide-gray-100">
                            {tareasVencimiento.map((tarea) => (
                                <div key={tarea.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600 border-2 border-white shadow-sm">
                                        {tarea.avatar}
                                    </div>

                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                            {tarea.tarea}
                                        </h4>
                                        <p className="text-xs text-gray-500">Asignado a: {tarea.responsable}</p>
                                    </div>

                                    <div className="text-right flex flex-col items-end">
                                        <span className={`flex items-center gap-1 text-xs font-bold mb-1 ${
                                            tarea.fecha.includes('Hoy') ? 'text-red-600' : 'text-orange-500'
                                        }`}>
                                            <Calendar size={12}/> {tarea.fecha}
                                        </span>
                                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                                            tarea.prioridad === 'Alta' ? 'bg-red-50 border-red-100 text-red-600' : 'bg-gray-50 border-gray-100 text-gray-500'
                                        }`}>
                                            {tarea.prioridad}
                                        </span>
                                    </div>

                                    <button className="text-gray-300 hover:text-gray-600">
                                        <MoreHorizontal size={16}/>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="p-3 bg-gray-50 text-center border-t border-gray-100">
                            <button onClick={() => router.push('/Proyectos')} className="text-xs text-gray-500 hover:text-indigo-600 font-medium flex items-center justify-center gap-1 mx-auto">
                                Ver calendario completo <ChevronRight size={12}/>
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- COLUMNA DERECHA: TALENTO Y ACTIVIDAD (1/3) --- */}
                <div className="space-y-6">
                    
                    {/* WIDGET: Colaborador Destacado (MODIFICADO: Sin Puntos) */}
                    <div className="relative rounded-xl overflow-hidden shadow-lg group">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500"></div>
                        <div className="absolute top-0 right-0 p-4 opacity-20 transform group-hover:scale-110 transition-transform duration-700">
                            <Trophy size={120} className="text-white"/>
                        </div>
                        
                        <div className="relative p-6 text-white">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                                    <Star size={16} className="text-yellow-100 fill-yellow-100"/>
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider text-yellow-50">Colaborador Destacado</span>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-white p-1 shadow-md">
                                    <img 
                                        src={`https://ui-avatars.com/api/?name=${colaboradorDestacado.nombre}&background=random`} 
                                        alt="Avatar" 
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg leading-tight">{colaboradorDestacado.nombre}</h3>
                                    <p className="text-yellow-100 text-sm">{colaboradorDestacado.rol}</p>
                                </div>
                            </div>

                            {/* Solo mostramos Tareas Completadas, los puntos se han ido */}
                            <div className="mt-6">
                                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm text-center">
                                    <p className="text-[10px] text-yellow-100 uppercase mb-1">Tareas completadas este mes</p>
                                    <p className="font-bold text-2xl">{colaboradorDestacado.tareasCompletadas}</p>
                                </div>
                            </div>
                            
                            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-yellow-50 bg-white/10 py-1.5 px-3 rounded-full w-full">
                                <TrendingUp size={12}/> {colaboradorDestacado.racha}
                            </div>
                        </div>
                    </div>

                    {/* Widget Secundario: Distribución de Carga (MODIFICADO: Nombres de Áreas dinámicos) */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4 text-sm">Distribución de Carga</h3>
                        <div className="space-y-4">
                            {cargaTrabajo.map((item, index) => (
                                <div key={index}>
                                    <div className="flex justify-between text-xs mb-1">
                                        {/* Nombre del área visible explícitamente */}
                                        <span className="font-bold text-gray-700">{item.area}</span>
                                        <span className="text-gray-500">{item.porcentaje}% ocupado</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                                        <div 
                                            className={`${item.color} h-1.5 rounded-full`} 
                                            style={{width: `${item.porcentaje}%`}}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}