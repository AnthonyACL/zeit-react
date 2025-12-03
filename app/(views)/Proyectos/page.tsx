"use client";
import React, { useState, useEffect } from "react";
import { Search, Edit2, Eye, Plus, Trash2 } from "lucide-react";
import { AppSidebar } from "@/app/(views)/-componentes/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { MOCK_PROYECTOS, MOCK_COLABORADORES, MOCK_AREAS } from "@/data/mockData";

interface ProyectoUI {
  id: number;
  nombre: string;
  estado: string;
  avance: number;
  manager: string;
  area: string;
  recurso?: string;
  fechaEntrega?: string;
}

export default function ProyectosPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [proyectos, setProyectos] = useState<ProyectoUI[]>(MOCK_PROYECTOS);
  const [searchProyectos, setSearchProyectos] = useState("");
  const [selectedProyecto, setSelectedProyecto] = useState<ProyectoUI | null>(null);
  const [mostrarFormularioCrear, setMostrarFormularioCrear] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    area: "",
    manager: "",
    estado: "En progreso",
    avance: 0,
    recurso: "",
    fechaEntrega: "",
  });

  // Obtener usuario del localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('currentUser');
      if (user) {
        try {
          setCurrentUser(JSON.parse(user));
        } catch (e) {
          console.error('Error parsing user:', e);
        }
      }
    }
  }, []);

  // Filtrar proyectos según el rol
  const getVisibleProyectos = () => {
    if (!currentUser) return [];

    const searchTerm = searchProyectos.toLowerCase();
    let filtered = MOCK_PROYECTOS.filter(p => 
      p.nombre.toLowerCase().includes(searchTerm)
    );

    // Si es Moderador, solo ve su proyecto asignado
    if (currentUser.rol === 'Moderator') {
      const colaborador = MOCK_COLABORADORES.find(c => c.correo === currentUser.email);
      if (colaborador) {
        // Filtrar solo el proyecto del área del moderador
        filtered = filtered.filter(p => p.area === colaborador.area);
      } else {
        filtered = [];
      }
    }
    // Si es Collaborator, solo ve su proyecto asignado (del área)
    else if (currentUser.rol === 'Collaborator') {
      const colaborador = MOCK_COLABORADORES.find(c => c.correo === currentUser.email);
      if (colaborador) {
        filtered = filtered.filter(p => p.area === colaborador.area);
      } else {
        filtered = [];
      }
    }
    // Si es SubAdmin o Admin, ve todos los proyectos
    // (Sin filtro por área)

    return filtered;
  };

  const visibleProyectos = getVisibleProyectos();

  const handleView = (proyecto: ProyectoUI) => {
    setSelectedProyecto(proyecto);
  };

  const handleCloseDetail = () => {
    setSelectedProyecto(null);
  };

  const handleCrearProyecto = () => {
    if (!formData.nombre || !formData.area || !formData.manager) {
      alert("Por favor, completa los campos requeridos");
      return;
    }

    const nuevoProyecto: ProyectoUI = {
      id: Math.max(...proyectos.map(p => p.id), 0) + 1,
      nombre: formData.nombre,
      area: formData.area,
      manager: formData.manager,
      estado: formData.estado,
      avance: formData.avance,
      recurso: formData.recurso,
      fechaEntrega: formData.fechaEntrega,
    };

    setProyectos([...proyectos, nuevoProyecto]);
    setMostrarFormularioCrear(false);
    setFormData({
      nombre: "",
      area: "",
      manager: "",
      estado: "En progreso",
      avance: 0,
      recurso: "",
      fechaEntrega: "",
    });
  };

  const handleEliminarProyecto = (id: number) => {
    if (confirm("¿Estás seguro que deseas eliminar este proyecto?")) {
      setProyectos(proyectos.filter(p => p.id !== id));
      setSelectedProyecto(null);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="bg-white w-full h-[80px] flex items-center px-8 shadow-sm mb-8">
          <span className="font-bold text-2xl">Proyectos</span>
        </div>

        <div className="px-8">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b flex items-center justify-between gap-4 flex-wrap">
              {/* Buscador */}
              <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                <Search className="text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar proyecto..."
                  value={searchProyectos}
                  onChange={(e) => setSearchProyectos(e.target.value)}
                  className="flex-1 outline-none text-gray-700 border border-gray-300 rounded-lg px-3 py-1"
                />
              </div>
              {/* Botón Crear Proyecto - Solo para Admin y SubAdmin */}
              {(currentUser?.rol === 'Admin' || currentUser?.rol === 'SubAdmin') && (
                <button
                  onClick={() => setMostrarFormularioCrear(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                  <Plus size={20} />
                  Nuevo Proyecto
                </button>
              )}
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-700">ID</th>
                    <th className="text-left p-4 font-medium text-gray-700">Nombre</th>
                    <th className="text-left p-4 font-medium text-gray-700">Área</th>
                    <th className="text-left p-4 font-medium text-gray-700">Manager</th>
                    <th className="text-left p-4 font-medium text-gray-700">Estado</th>
                    <th className="text-left p-4 font-medium text-gray-700">Avance</th>
                    <th className="w-16"></th>
                  </tr>
                </thead>
                <tbody>
                  {visibleProyectos.map((proyecto) => (
                    <tr key={proyecto.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">{proyecto.id}</td>
                      <td className="p-4 font-medium">{proyecto.nombre}</td>
                      <td className="p-4">{proyecto.area}</td>
                      <td className="p-4">{proyecto.manager}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          proyecto.estado === 'En progreso' ? 'bg-blue-100 text-blue-700' :
                          proyecto.estado === 'Completado' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {proyecto.estado}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${proyecto.avance}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600">{proyecto.avance}%</span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleView(proyecto)}
                          className="text-blue-500 hover:text-blue-700 transition-colors"
                          title="Ver detalles"
                        >
                          <Eye size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {visibleProyectos.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-6 text-center text-gray-500">
                        {currentUser?.rol === 'Moderator' || currentUser?.rol === 'Collaborator' 
                          ? "No tienes proyectos asignados en tu área."
                          : "No hay proyectos que coincidan con la búsqueda."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Panel de detalles */}
        {selectedProyecto && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {selectedProyecto.nombre}
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Área</p>
                    <p className="font-medium">{selectedProyecto.area}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Manager</p>
                    <p className="font-medium">{selectedProyecto.manager}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Estado</p>
                    <p className="font-medium">{selectedProyecto.estado}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Avance</p>
                    <p className="font-medium">{selectedProyecto.avance}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Recurso</p>
                    {selectedProyecto.recurso ? (
                      <a 
                        href={selectedProyecto.recurso} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 hover:text-blue-800 hover:underline break-all"
                      >
                        {selectedProyecto.recurso}
                      </a>
                    ) : (
                      <p className="font-medium">N/A</p>
                    )}
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Fecha de Entrega</p>
                    <p className="font-medium">{selectedProyecto.fechaEntrega || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleCloseDetail}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Cerrar
                </button>
                {(currentUser?.rol === 'Admin' || currentUser?.rol === 'SubAdmin') && (
                  <button
                    onClick={() => handleEliminarProyecto(selectedProyecto.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 size={18} />
                    Eliminar
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Modal Crear Proyecto */}
        {mostrarFormularioCrear && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Crear Nuevo Proyecto</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Nombre del Proyecto *</label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nombre del proyecto"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Área *</label>
                  <select
                    value={formData.area}
                    onChange={(e) => setFormData({...formData, area: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecciona un área</option>
                    {MOCK_AREAS.map((area) => (
                      <option key={area.id} value={area.nombre}>
                        {area.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Manager *</label>
                  <input
                    type="text"
                    value={formData.manager}
                    onChange={(e) => setFormData({...formData, manager: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nombre del manager"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Estado</label>
                    <select
                      value={formData.estado}
                      onChange={(e) => setFormData({...formData, estado: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="En progreso">En progreso</option>
                      <option value="Pendiente">Pendiente</option>
                      <option value="Completado">Completado</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Avance (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.avance}
                      onChange={(e) => setFormData({...formData, avance: parseInt(e.target.value) || 0})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Recurso (URL)</label>
                  <input
                    type="url"
                    value={formData.recurso}
                    onChange={(e) => setFormData({...formData, recurso: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://ejemplo.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Fecha de Entrega</label>
                  <input
                    type="date"
                    value={formData.fechaEntrega}
                    onChange={(e) => setFormData({...formData, fechaEntrega: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCrearProyecto}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Crear Proyecto
                </button>
                <button
                  onClick={() => setMostrarFormularioCrear(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}