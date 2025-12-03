'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import CreateTaskForm from './CreateTaskForm';
import TaskDetails from './TaskDetails';
import EditTaskForm from './EditTaskForm';
import CollaboratorTaskUpdate from './CollaboratorTaskUpdate';
import ModeratorTaskReview from './ModeratorTaskReview';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '../-componentes/app-sidebar';
import { MOCK_TASKS, MOCK_AREAS, MOCK_COLABORADORES, MOCK_PROYECTOS, Tarea, Submission, Review } from '@/data/mockData';
import { Trash2, CheckCircle, XCircle } from 'lucide-react';

type CurrentUser = {
  id: number | string;
  email: string;
  rol: 'Admin' | 'SubAdmin' | 'Moderator' | 'Collaborator';
};

export default function TareasPage() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [modo, setModo] = useState<'kanban' | 'crear' | 'ver' | 'editar' | 'actualizar' | 'revisar'>('kanban');
  const [areaSeleccionada, setAreaSeleccionada] = useState<number | null>(null);
  const [tareas, setTareas] = useState<Tarea[]>(MOCK_TASKS);
  const [tareaActual, setTareaActual] = useState<Tarea | null>(null);
  const [userArea, setUserArea] = useState<typeof MOCK_AREAS[0] | null>(null);

  // Load user from localStorage
  useEffect(() => {
    const usuario = localStorage.getItem('currentUser');
    if (usuario) {
      const parsedUser = JSON.parse(usuario);
      // Convertir ID a número si es string
      if (typeof parsedUser.id === 'string') {
        parsedUser.id = parseInt(parsedUser.id, 10);
      }
      setCurrentUser(parsedUser);
    }
  }, []);

  // Obtener ID numérico del usuario actual
  const currentUserId = currentUser ? (typeof currentUser.id === 'string' ? parseInt(currentUser.id, 10) : currentUser.id) : null;

  // Find current user's area - ONLY ONE AREA PER USER
  useEffect(() => {
    if (currentUser && currentUserId) {
      let userAreaFound = null;

      // Check if user is a TeamLead (Moderator/SubAdmin) by teamLeaderId
      userAreaFound = MOCK_AREAS.find((area) => area.teamLeaderId === currentUserId);

      // If not found as TeamLead, check if user is in collaborators array
      if (!userAreaFound) {
        userAreaFound = MOCK_AREAS.find((area) =>
          area.collaborators.includes(currentUserId)
        );
      }

      if (userAreaFound) {
        setUserArea(userAreaFound);
        setAreaSeleccionada(userAreaFound.id);
      } else if (currentUser.rol === 'Admin') {
        // Admin puede ver la primera área por defecto
        setUserArea(MOCK_AREAS[0]);
        setAreaSeleccionada(MOCK_AREAS[0].id);
      }
    }
  }, [currentUser, currentUserId]);

  // Get colaboradores for the selected area
  const colaboradoresArea = MOCK_COLABORADORES.filter((col) => {
    const area = MOCK_AREAS.find((a) => a.id === areaSeleccionada);
    return area?.collaborators.includes(col.id);
  }).map((col) => ({
    id: col.id,
    nombre: col.nombre,
    avatar: col.avatar || '/avatars/default.jpg',
  }));

  // Filter tasks based on user role and area
  const tareasFiltradas = tareas.filter((t) => {
    if (currentUser?.rol === 'Admin') return true;
    if (currentUser?.rol === 'SubAdmin' || currentUser?.rol === 'Moderator') {
      return t.areaId === areaSeleccionada;
    }
    if (currentUser?.rol === 'Collaborator') {
      return t.areaId === areaSeleccionada && t.colaboradores.includes(currentUserId!);
    }
    return false;
  });

  const columnas = [
    { estado: 'no_asignada', titulo: 'No asignadas' },
    { estado: 'asignada', titulo: 'Asignadas' },
    { estado: 'en_proceso', titulo: 'En proceso' },
    { estado: 'por_revisar', titulo: 'Por revisar' },
    { estado: 'completada', titulo: 'Completadas' },
  ];

  const handleCrear = (data: any) => {
    if (!currentUser || (currentUser.rol !== 'Moderator' && currentUser.rol !== 'SubAdmin' && currentUser.rol !== 'Admin')) {
      alert('Solo moderadores pueden crear tareas');
      return;
    }

    const nuevaTarea: Tarea = {
      id: `task-${Date.now()}`,
      titulo: data.titulo || '',
      descripcion: data.descripcion || '',
      imagenUrl: data.imagenUrl,
      subtareas: data.subtareas || [],
      colaboradores: data.colaboradores || [],
      estado: (data.colaboradores?.length ?? 0) > 0 ? 'asignada' : 'no_asignada',
      areaId: areaSeleccionada || 0,
      createdBy: currentUserId!,
      createdAt: new Date(),
    };
    setTareas([...tareas, nuevaTarea]);
    setModo('kanban');
  };

  const handleEditar = (actualizada: Tarea) => {
    if (!currentUser || (currentUser.rol !== 'Moderator' && currentUser.rol !== 'SubAdmin' && currentUser.rol !== 'Admin')) {
      alert('Solo moderadores pueden editar tareas');
      return;
    }
    setTareas(tareas.map((t) => (t.id === actualizada.id ? actualizada : t)));
    setModo('kanban');
  };

  const handleEliminar = (tareaId: string) => {
    if (!currentUser || (currentUser.rol !== 'Moderator' && currentUser.rol !== 'SubAdmin' && currentUser.rol !== 'Admin')) {
      alert('Solo moderadores pueden eliminar tareas');
      return;
    }
    if (confirm('¿Estás seguro que deseas eliminar esta tarea?')) {
      setTareas(tareas.filter((t) => t.id !== tareaId));
      setModo('kanban');
    }
  };

  const handleColaboratorSubmit = (submission: Submission) => {
    if (!tareaActual || currentUser?.rol !== 'Collaborator') return;

    const tareaActualizada: Tarea = {
      ...tareaActual,
      estado: 'por_revisar',
      submission,
    };

    setTareas(tareas.map((t) => (t.id === tareaActual.id ? tareaActualizada : t)));
    setTareaActual(tareaActualizada);
    setModo('ver');
  };

  const handleModeratorAccept = () => {
    if (!tareaActual || !currentUser) return;

    const moderatorId = typeof currentUser.id === 'string' ? parseInt(currentUser.id, 10) : currentUser.id;

    const tareaActualizada: Tarea = {
      ...tareaActual,
      review: {
        moderatorId,
        status: 'aceptada',
        timestamp: new Date(),
      },
    };

    setTareas(tareas.map((t) => (t.id === tareaActual.id ? tareaActualizada : t)));
    setTareaActual(tareaActualizada);
    setModo('ver');
  };

  const handleModeratorDeny = (reason: string) => {
    if (!tareaActual || !currentUser) return;

    const moderatorId = typeof currentUser.id === 'string' ? parseInt(currentUser.id, 10) : currentUser.id;

    const tareaActualizada: Tarea = {
      ...tareaActual,
      estado: 'en_proceso',
      submission: undefined,
      review: {
        moderatorId,
        status: 'denegada',
        reason,
        timestamp: new Date(),
      },
    };

    setTareas(tareas.map((t) => (t.id === tareaActual.id ? tareaActualizada : t)));
    setTareaActual(tareaActualizada);
    setModo('ver');
  };

  const handleMarkComplete = (tareaId: string) => {
    if (!currentUser || (currentUser.rol !== 'Moderator' && currentUser.rol !== 'SubAdmin' && currentUser.rol !== 'Admin')) {
      alert('Solo moderadores pueden marcar tareas como completadas');
      return;
    }

    const moderatorId = typeof currentUser.id === 'string' ? parseInt(currentUser.id, 10) : currentUser.id;

    setTareas(
      tareas.map((t) =>
        t.id === tareaId
          ? {
              ...t,
              estado: 'completada',
              review: {
                moderatorId,
                status: 'aceptada',
                timestamp: new Date(),
              },
            }
          : t
      )
    );
  };

  if (!currentUser) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <p className="text-lg mb-4">Por favor, inicia sesión primero</p>
              <p className="text-sm text-gray-500">No se encontró usuario en localStorage</p>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  if (!userArea) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <p className="text-lg mb-4">Sin área asignada</p>
              <p className="text-sm text-gray-500">El usuario {currentUser.email} no tiene un área asignada</p>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  // Buscar el proyecto correspondiente al área actual
  const currentProject = MOCK_PROYECTOS.find((p) => {
    const projectAreaMap: Record<string, string> = {
      'Plataforma Ventas Online': 'Ventas',
      'Sistema Gestión RR.HH': 'RRHH',
      'Dashboard Analytics': 'Análisis',
      'App React Admin': 'Desarrollo React',
      'API Laravel REST': 'Desarrollo Laravel',
    };
    return projectAreaMap[p.nombre] === userArea?.nombre;
  });

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header*/}
        <div className="bg-white w-full h-[80px] flex items-center justify-between px-8 shadow-sm mb-8">
          <span className="font-bold" style={{ fontSize: 27 }}>{userArea.nombre}</span>
          <span className="text-sm text-gray-600">({currentUser.rol})</span>
        </div>
        <div className="p-8">
          {/* Título del Proyecto */}
          {currentProject && (
            <div className="mb-6 pb-4 border-b border-gray-200">
              <h1 className="text-2xl font-semibold text-gray-800">{currentProject.nombre}</h1>
            </div>
          )}

          {/* Botón agregar tarea */}
          {(currentUser.rol === 'Moderator' || currentUser.rol === 'SubAdmin' || currentUser.rol === 'Admin') && (
            <button
              onClick={() => setModo('crear')}
              className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold"
            >
              + Nueva tarea
            </button>
          )}

          {areaSeleccionada && modo === 'kanban' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {columnas.map((col) => (
                  <div key={col.estado} className="bg-gray-100 rounded-lg p-4 shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">{col.titulo}</h2>
                    {tareasFiltradas
                      .filter((t) => t.estado === col.estado)
                      .map((tarea) => (
                        <div key={tarea.id} className="bg-white rounded-md p-4 mb-4 shadow">
                          <div
                            className="cursor-pointer flex-1"
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
                          {(currentUser.rol === 'Moderator' || currentUser.rol === 'SubAdmin' || currentUser.rol === 'Admin') && (
                            <div className="flex gap-2 mt-3 pt-3 border-t">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMarkComplete(tarea.id);
                                }}
                                className="text-green-600 hover:text-green-700 flex-1 text-xs"
                                title="Marcar como completada"
                              >
                                <CheckCircle size={16} className="mx-auto" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEliminar(tarea.id);
                                }}
                                className="text-red-600 hover:text-red-700 flex-1 text-xs"
                                title="Eliminar tarea"
                              >
                                <Trash2 size={16} className="mx-auto" />
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </>
          )}

          {modo === 'crear' && (
            <CreateTaskForm colaboradores={colaboradoresArea} onCreate={handleCrear} />
          )}

          {modo === 'ver' && tareaActual && (
            <>
              <TaskDetails
                tarea={tareaActual}
                colaboradores={colaboradoresArea}
                currentUser={{
                  id: currentUserId || 0,
                  email: currentUser.email,
                  rol: currentUser.rol,
                }}
                onEdit={() => (currentUser.rol === 'Moderator' || currentUser.rol === 'SubAdmin' || currentUser.rol === 'Admin') && setModo('editar')}
              />

              {currentUser.rol === 'Collaborator' && tareaActual.colaboradores.includes(currentUserId!) && tareaActual.estado === 'en_proceso' && !tareaActual.submission && (
                <button
                  onClick={() => setModo('actualizar')}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Enviar actualización
                </button>
              )}

              {(currentUser.rol === 'Moderator' || currentUser.rol === 'SubAdmin' || currentUser.rol === 'Admin') && tareaActual.estado === 'por_revisar' && tareaActual.submission && !tareaActual.review && (
                <button
                  onClick={() => setModo('revisar')}
                  className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded"
                >
                  Revisar envío
                </button>
              )}

              <button onClick={() => setModo('kanban')} className="mt-4 ml-2 bg-gray-400 text-white px-4 py-2 rounded">
                Volver
              </button>
            </>
          )}

          {modo === 'editar' && tareaActual && (
            <EditTaskForm
              tarea={tareaActual}
              colaboradores={colaboradoresArea}
              onSave={handleEditar}
            />
          )}

          {modo === 'actualizar' && tareaActual && (
            <CollaboratorTaskUpdate
              tarea={tareaActual}
              currentUserId={currentUserId!}
              onSubmit={handleColaboratorSubmit}
              onCancel={() => setModo('ver')}
            />
          )}

          {modo === 'revisar' && tareaActual && tareaActual.submission && (
            <ModeratorTaskReview
              tarea={tareaActual}
              submission={tareaActual.submission}
              onAccept={handleModeratorAccept}
              onDeny={handleModeratorDeny}
              onCancel={() => setModo('ver')}
            />
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}