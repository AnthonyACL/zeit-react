"use client"
import { useMemo } from 'react'
import { MOCK_PROYECTOS, MOCK_KPI } from '@/data/mockData'
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Clock, 
  Download,
  Calendar,
  MoreVertical,
  Search,
  Filter
} from 'lucide-react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'

// --- DEFINICIÓN DE TIPOS (Interfaces) ---
interface AreaAccumulator {
    name: string;
    totalAvance: number;
    count: number;
}

const DashboardAdmin = () => {
    // --- Usar datos de mockData ---
    const proyectos = MOCK_PROYECTOS;
    const kpi = MOCK_KPI;

    // --- PROCESAMIENTO DE DATOS PARA GRÁFICOS (useMemo) ---
    
    // 1. Datos para Gráfico de Barras (Avance promedio por Área)
    const chartDataAreas = useMemo(() => {
        // Solución error TS: Definimos explícitamente que el objeto es un Record de strings a AreaAccumulator
        const areasMap: Record<string, AreaAccumulator> = {};
        
        proyectos.forEach(p => {
            if (!areasMap[p.area]) {
                areasMap[p.area] = { name: p.area, totalAvance: 0, count: 0 };
            }
            areasMap[p.area].totalAvance += p.avance;
            areasMap[p.area].count += 1;
        });

        return Object.values(areasMap).map((item) => ({
            name: item.name,
            promedio: Math.round(item.totalAvance / item.count),
            proyectos: item.count
        }));
    }, [proyectos]); // Agregada dependencia correcta

    // 2. Datos para Gráfico Circular (Estado de Proyectos)
    const chartDataStatus = useMemo(() => {
        const statusMap: Record<string, number> = { 'Completado': 0, 'En progreso': 0, 'Pendiente': 0 };
        
        proyectos.forEach(p => {
            if (statusMap[p.estado] !== undefined) {
                statusMap[p.estado]++;
            }
        });

        return [
            { name: 'Completado', value: statusMap['Completado'], color: '#10B981' }, 
            { name: 'En progreso', value: statusMap['En progreso'], color: '#3B82F6' },
            { name: 'Pendiente', value: statusMap['Pendiente'], color: '#F59E0B' },   
        ];
    }, [proyectos]);

    // --- UTILIDADES DE UI ---
    const getStatusColor = (status: string) => {
        switch(status) {
            case 'Completado': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'En progreso': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Pendiente': return 'bg-amber-100 text-amber-700 border-amber-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen animate-in fade-in duration-700">
            
            {/* Header Principal */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <p className="text-gray-500 text-sm mt-1">Resumen ejecutivo y métricas de rendimiento en tiempo real.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 shadow-sm transition-all">
                        <Calendar size={16} /> Hoy: {new Date().toLocaleDateString()}
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all">
                        <Download size={16} /> Exportar Reporte
                    </button>
                </div>
            </div>

            {/* Sección de KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* KPI 1: Personal */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Personal Activo</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-2 group-hover:text-indigo-600 transition-colors">
                                {kpi.activos} <span className="text-gray-400 text-lg font-normal">/ {kpi.totalPersonal}</span>
                            </h3>
                        </div>
                        <div className="p-3 bg-indigo-50 rounded-xl group-hover:bg-indigo-100 transition-colors">
                            <Users className="text-indigo-600" size={24}/>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded-full">
                        <span>+12% vs mes anterior</span>
                    </div>
                </div>

                {/* KPI 2: Proyectos Críticos */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Atención Requerida</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-2 group-hover:text-red-600 transition-colors">
                                {kpi.proyectosRetrasados}
                            </h3>
                        </div>
                        <div className="p-3 bg-red-50 rounded-xl group-hover:bg-red-100 transition-colors">
                            <Clock className="text-red-600" size={24}/>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-4">Proyectos con retraso {'>'} 24h</p>
                </div>

                {/* KPI 3: Total Proyectos */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Proyectos Totales</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-2">
                                {proyectos.length}
                            </h3>
                        </div>
                        <div className="p-3 bg-emerald-50 rounded-xl group-hover:bg-emerald-100 transition-colors">
                            <Briefcase className="text-emerald-600" size={24}/>
                        </div>
                    </div>
                    <div className="mt-4 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[70%]"></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-right">70% de capacidad operativa</p>
                </div>
            </div>

            {/* Sección de Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Gráfico 1: Barras - Avance por Área */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">Rendimiento Promedio por Área</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartDataAreas} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis 
                                    dataKey="name" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#6B7280', fontSize: 12 }} 
                                    dy={10}
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#6B7280', fontSize: 12 }} 
                                    unit="%"
                                />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ fill: '#F3F4F6' }}
                                />
                                <Bar 
                                    dataKey="promedio" 
                                    fill="#4F46E5" 
                                    radius={[6, 6, 0, 0]} 
                                    barSize={40}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Gráfico 2: Pie - Estado de Proyectos */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Estado General</h3>
                    <div className="flex-1 min-h-[250px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartDataStatus}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {chartDataStatus.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}/>
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Texto central del Donut */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-center mt-[-30px]">
                                <span className="text-3xl font-bold text-gray-900">{MOCK_PROYECTOS.length}</span>
                                <p className="text-xs text-gray-500">Total</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabla Detallada de Proyectos */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h3 className="text-lg font-bold text-gray-800">Desglose de Proyectos</h3>
                    <div className="flex gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input 
                                type="text" 
                                placeholder="Buscar proyecto..." 
                                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
                            />
                        </div>
                        <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
                            <tr>
                                <th className="px-6 py-4 font-medium">Nombre del Proyecto</th>
                                <th className="px-6 py-4 font-medium">Área</th>
                                <th className="px-6 py-4 font-medium">Líder</th>
                                <th className="px-6 py-4 font-medium text-center">Estado</th>
                                <th className="px-6 py-4 font-medium">Progreso</th>
                                <th className="px-6 py-4 font-medium text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {proyectos.map((proyecto) => (
                                <tr key={proyecto.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4 font-medium text-gray-900">{proyecto.nombre}</td>
                                    <td className="px-6 py-4 text-gray-500">{proyecto.area}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                                                {proyecto.manager.charAt(0)}
                                            </div>
                                            <span className="text-gray-600">{proyecto.manager}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(proyecto.estado)}`}>
                                            {proyecto.estado}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 min-w-[150px]">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-bold text-gray-700 w-8">{proyecto.avance}%</span>
                                            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full rounded-full ${proyecto.avance === 100 ? 'bg-emerald-500' : 'bg-indigo-600'}`} 
                                                    style={{ width: `${proyecto.avance}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default DashboardAdmin;