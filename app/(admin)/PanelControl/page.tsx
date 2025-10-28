'use client'
import { AppSidebar } from '@/app/(admin)/-componentes/app-sidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { useState } from 'react'

export default function Page() {
  const [resumen, setResumen] = useState<'diario' | 'semanal' | 'mensual'>('diario')
  const [filtro, setFiltro] = useState<'dentro' | 'fuera' | 'descanso' | null>('dentro')
  const [busqueda, setBusqueda] = useState('')

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
      descanso: 4,
      trabajadores: [
        { nombre: 'Carlos', estado: 'dentro' },
        { nombre: 'Ana', estado: 'fuera' },
        { nombre: 'Luis', estado: 'dentro' },
        { nombre: 'María', estado: 'descanso' },
        { nombre: 'Jorge', estado: 'descanso' },
        { nombre: 'Elena', estado: 'descanso' },
        { nombre: 'Pablo', estado: 'dentro' },
        { nombre: 'Claudia', estado: 'descanso' }
      ]
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
      descanso: 2,
      trabajadores: [
        { nombre: 'Pedro', estado: 'dentro' },
        { nombre: 'Lucía', estado: 'descanso' },
        { nombre: 'Andrea', estado: 'dentro' },
        { nombre: 'Julián', estado: 'descanso' }
      ]
    },
    {
      nombre: 'Finanzas',
      horas: { trabajadas: 22.6, descansos: 1.4, extras: 0.9 },
      tareas: [
        { id: 1, nombre: 'Conciliación mensual', estado: 'Completada' },
        { id: 2, nombre: 'Auditoría interna', estado: 'En progreso' }
      ],
      dentro: 3,
      fuera: 2,
      descanso: 1,
      trabajadores: [
        { nombre: 'Sofía', estado: 'dentro' },
        { nombre: 'Héctor', estado: 'fuera' },
        { nombre: 'Marcos', estado: 'dentro' },
        { nombre: 'Paula', estado: 'fuera' },
        { nombre: 'Esteban', estado: 'dentro' },
        { nombre: 'Nadia', estado: 'descanso' }
      ]
    },
    {
      nombre: 'Operaciones',
      horas: { trabajadas: 28.1, descansos: 1.7, extras: 3.2 },
      tareas: [
        { id: 1, nombre: 'Mantenimiento equipos', estado: 'En progreso' },
        { id: 2, nombre: 'Capacitación interna', estado: 'Completada' },
        { id: 3, nombre: 'Reporte mensual', estado: 'Pendiente' }
      ],
      dentro: 4,
      fuera: 3,
      descanso: 2,
      trabajadores: [
        { nombre: 'Tomás', estado: 'dentro' },
        { nombre: 'Isabel', estado: 'fuera' },
        { nombre: 'Felipe', estado: 'dentro' },
        { nombre: 'Martina', estado: 'descanso' },
        { nombre: 'Cristóbal', estado: 'fuera' },
        { nombre: 'Daniel', estado: 'dentro' },
        { nombre: 'Natalia', estado: 'fuera' },
        { nombre: 'Fernando', estado: 'dentro' },
        { nombre: 'Camila', estado: 'descanso' }
      ]
    }
  ]

  const area = areas[0]
  const totalTareas = area.tareas.length
  const completadas = area.tareas.filter(t => t.estado === 'Completada').length
  const enProceso = area.tareas.filter(t => t.estado === 'En progreso').length
  const pendientes = area.tareas.filter(t => t.estado === 'Pendiente').length
  const totalHoras = area.horas.trabajadas + area.horas.descansos + area.horas.extras

  const totalDentro = areas.reduce((sum, a) => sum + a.dentro, 0)
  const totalFuera = areas.reduce((sum, a) => sum + a.fuera, 0)
  const totalDescanso = areas.reduce((sum, a) => sum + a.descanso, 0)

  const areasFiltradas = areas.filter(a =>
    a.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="bg-white w-full h-[80px] flex items-center px-8 shadow-sm">
          <span className="font-bold text-2xl" style={{ fontSize: 27 }}>Panel de control</span>
        </div>

        <div className="flex">
          {/* CONTENIDO PRINCIPAL */}
          <div className="flex-1 p-6 bg-gray-50">
            <div className="flex gap-1 mb-8 bg-white rounded-lg p-1 w-fit">
              {['diario', 'semanal', 'mensual'].map((r) => (
                <button
                  key={r}
                  onClick={() => setResumen(r as any)}
                  className={`px-6 py-2 rounded-md font-medium text-sm ${resumen === r ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
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
                          style={{ height: `${(d.valor / totalHoras) * 100}%`, backgroundColor: d.color }}
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
                      <circle cx="80" cy="80" r="60" stroke="#22c55e" strokeWidth="20" fill="none" strokeDasharray={`${(completadas / totalTareas) * 377} 377`} transform="rotate(-90 80 80)" strokeLinecap="round" />
                      <circle cx="80" cy="80" r="60" stroke="#f97316" strokeWidth="20" fill="none" strokeDasharray={`${(enProceso / totalTareas) * 377} 377`} transform={`rotate(${(completadas / totalTareas) * 360 - 90} 80 80)`} strokeLinecap="round" />
                      <circle cx="80" cy="80" r="60" stroke="#ef4444" strokeWidth="20" fill="none" strokeDasharray={`${(pendientes / totalTareas) * 377} 377`} transform={`rotate(${((completadas + enProceso) / totalTareas) * 360 - 90} 80 80)`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-xl font-bold">{Math.round((completadas / totalTareas) * 100)}%</span>
                      <div className="text-xs text-gray-500">Completado</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PANEL DERECHO */}
          <div className="w-80 bg-white shadow-lg p-6 h-[calc(100vh-80px)] overflow-y-auto">
            <div className="text-center mb-4">
              <span className="text-sm text-gray-600">¿Quién está dentro o fuera?</span>
            </div>

            <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-3">
              <button onClick={() => setFiltro('dentro')} className={`flex-1 py-2 px-3 rounded-md text-sm ${filtro === 'dentro' ? 'bg-blue-500 text-white font-medium' : 'text-gray-600'}`}>{totalDentro} Dentro</button>
              <button onClick={() => setFiltro('descanso')} className={`flex-1 py-2 px-3 rounded-md text-sm ${filtro === 'descanso' ? 'bg-blue-500 text-white font-medium' : 'text-gray-600'}`}>{totalDescanso} Descanso</button>
              <button onClick={() => setFiltro('fuera')} className={`flex-1 py-2 px-3 rounded-md text-sm ${filtro === 'fuera' ? 'bg-blue-500 text-white font-medium' : 'text-gray-600'}`}>{totalFuera} Fuera</button>
            </div>

            <input
              type="text"
              placeholder="Buscar área..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full mb-4 border border-gray-300 rounded-md px-3 py-2 text-sm"
            />

            {filtro && (
              <div>
                {areasFiltradas
                  .filter(a => a[filtro] > 0)
                  .map((a, i) => (
                    <div key={i} className="mb-3">
                      <p className="font-medium">{a.nombre} ({a[filtro]})</p>
                      <ul className="ml-4 mt-1 text-sm text-gray-600">
                        {a.trabajadores
                          .filter(t => t.estado === filtro)
                          .map((t, idx) => (
                            <li key={idx}>{t.nombre}</li>
                          ))}
                      </ul>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
