'use client';

import { useState } from 'react';
import Image from 'next/image';
import CreateTaskForm from './CreateTaskForm';
import TaskDetails from './TaskDetails';
import EditTaskForm from './EditTaskForm';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '../-componentes/app-sidebar';

type Subtarea = {
  id: string;
  texto: string;
  completada: boolean;
};

type Tarea = {
  id: string;
  titulo: string;
  descripcion: string;
  imagenUrl?: string;
  subtareas: Subtarea[];
  estado: 'no_asignada' | 'asignada' | 'en_proceso' | 'por_revisar' | 'completada';
  colaboradores: string[];
  areaId: string;
};

type Area = {
  id: string;
  nombre: string;
};

type Colaborador = {
  id: string;
  nombre: string;
  avatar: string;
};

const areas: Area[] = [
  { id: 'a1', nombre: 'Logística' },
  { id: 'a2', nombre: 'Atención al cliente' },
];

const colaboradores: Colaborador[] = [
  { id: 'c1', nombre: 'Carlos', avatar: '/avatars/carlos.jpg' },
  { id: 'c2', nombre: 'Lucía', avatar: '/avatars/lucia.jpg' },
];

const tareasIniciales: Tarea[] = [
  {
    id: 't1',
    titulo: 'Revisar inventario',
    descripcion: 'Verificar stock en almacén central.',
    imagenUrl: '/images/inventario.jpg',
    subtareas: [
      { id: 's1', texto: 'Contar cajas', completada: false },
      { id: 's2', texto: 'Actualizar sistema', completada: false },
    ],
    estado: 'no_asignada',
    colaboradores: [],
    areaId: 'a1',
  },
  {
    id: 't2',
    titulo: 'Responder reclamos',
    descripcion: 'Atender correos pendientes de clientes.',
    imagenUrl: '/images/reclamos.jpg',
    subtareas: [],
    estado: 'asignada',
    colaboradores: ['c2'],
    areaId: 'a2',
  },
];

export default function TareasPage() {
  const [modo, setModo] = useState<'kanban' | 'crear' | 'ver' | 'editar'>('kanban');
  const [areaSeleccionada, setAreaSeleccionada] = useState<string | null>(null);
  const [tareas, setTareas] = useState<Tarea[]>(tareasIniciales);
  const [tareaActual, setTareaActual] = useState<Tarea | null>(null);

  const columnas = [
    { estado: 'no_asignada', titulo: 'No asignadas' },
    { estado: 'asignada', titulo: 'Asignadas' },
    { estado: 'en_proceso', titulo: 'En proceso' },
    { estado: 'por_revisar', titulo: 'Por revisar' },
    { estado: 'completada', titulo: 'Completadas' },
  ];

  const tareasFiltradas = tareas.filter((t) => t.areaId === areaSeleccionada);

  const handleCrear = (data: any) => {
    const nuevaTarea: Tarea = {
      id: `t${tareas.length + 1}`,
      titulo: data.titulo || '',
      descripcion: data.descripcion || '',
      imagenUrl: data.imagenUrl,
      subtareas: data.subtareas || [],
      colaboradores: data.colaboradores || [],
      estado: (data.colaboradores?.length ?? 0) > 0 ? 'asignada' : 'no_asignada',
      areaId: areaSeleccionada || '',
    };
    setTareas([...tareas, nuevaTarea]);
    setModo('kanban');
  };

  const handleEditar = (actualizada: Tarea) => {
    setTareas(tareas.map((t) => (t.id === actualizada.id ? actualizada : t)));
    setModo('kanban');
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header*/}
        <div className="bg-white w-full h-[80px] flex items-center px-8 shadow-sm mb-8">
          <span className="font-bold" style={{ fontSize: 27 }}>Gestor de Tareas</span>
        </div>
    <div className="p-8">
      <div className="flex gap-4 mb-6">
        {areas.map((area) => (
          <button
            key={area.id}
            onClick={() => {
              setAreaSeleccionada(area.id);
              setModo('kanban');
            }}
            className={`px-4 py-2 rounded ${
              areaSeleccionada === area.id ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {area.nombre}
          </button>
        ))}
      </div>

      {areaSeleccionada && modo === 'kanban' && (
        <>
          <button
            onClick={() => setModo('crear')}
            className="mb-6 bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Nueva tarea
          </button>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {columnas.map((col) => (
              <div key={col.estado} className="bg-gray-100 rounded-lg p-4 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">{col.titulo}</h2>
                {tareasFiltradas
                  .filter((t) => t.estado === col.estado)
                  .map((tarea) => (
                    <div
                      key={tarea.id}
                      className="bg-white rounded-md p-4 mb-4 shadow cursor-pointer"
                      onClick={() => {
                        setTareaActual(tarea);
                        setModo('ver');
                      }}
                    >
                      <h3 className="font-bold text-gray-800">{tarea.titulo}</h3>
                      <p className="text-sm text-gray-600 mb-2">{tarea.descripcion}</p>
                      {tarea.imagenUrl && (
                        <Image
                          src={tarea.imagenUrl}
                          alt={tarea.titulo}
                          width={300}
                          height={200}
                          className="rounded mb-2 object-cover"
                        />
                      )}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </>
      )}

      {modo === 'crear' && (
        <CreateTaskForm colaboradores={colaboradores} onCreate={handleCrear} />
      )}

      {modo === 'ver' && tareaActual && (
        <TaskDetails
          tarea={tareaActual}
          colaboradores={colaboradores}
          onEdit={() => setModo('editar')}
        />
      )}

      {modo === 'editar' && tareaActual && (
        <EditTaskForm
          tarea={tareaActual}
          colaboradores={colaboradores}
          onSave={handleEditar}
        />
      )}
    </div>
    </SidebarInset>
    </SidebarProvider>
  );
}