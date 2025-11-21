"use client";
import React, { useState } from "react";
import { Search, Edit2, Eye } from "lucide-react";
import { AppSidebar } from "@/app/(admin)/-componentes/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  recurso: string;
  grupoAsignado: string;
  estado: string;
  fechaEntrega: string;
}

export default function ProyectosPage() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([
    {
      id: 1,
      nombre: "Proyecto A",
      descripcion: "Diseño de campaña publicitaria",
      recurso: "Canva",
      grupoAsignado: "Área 1",
      estado: "Activo",
      fechaEntrega: "2025-12-15",
    },
    {
      id: 2,
      nombre: "Proyecto B",
      descripcion: "Optimización de servidor",
      recurso: "AWS",
      grupoAsignado: "Área 2",
      estado: "Pendiente",
      fechaEntrega: "2026-01-20",
    },
  ]);

  const [searchProyectos, setSearchProyectos] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [selectedProyecto, setSelectedProyecto] = useState<Proyecto | null>(null);
  const [grupos, setGrupos] = useState(["Área 1", "Área 2", "Área 3"]);

  const [formData, setFormData] = useState<Proyecto>({
    id: 0,
    nombre: "",
    descripcion: "",
    recurso: "",
    grupoAsignado: "",
    estado: "",
    fechaEntrega: "",
  });

  const resetForm = () => {
    setFormData({
      id: 0,
      nombre: "",
      descripcion: "",
      recurso: "",
      grupoAsignado: "",
      estado: "",
      fechaEntrega: "",
    });
  };

  const handleAdd = () => {
    resetForm();
    setSelectedProyecto(null);
    setModalMode("add");
    setModalOpen(true);
  };

  const handleEdit = (proyecto: Proyecto) => {
    setSelectedProyecto(proyecto);
    setFormData({ ...proyecto });
    setModalMode("edit");
    setModalOpen(true);
  };

  const handleView = (proyecto: Proyecto) => {
    setSelectedProyecto(proyecto);
    setFormData({ ...proyecto });
    setModalMode("view");
    setModalOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.grupoAsignado.trim()) return alert("Selecciona o escribe un grupo.");

    let estadoAuto = "";
    if (formData.fechaEntrega) {
      const hoy = new Date();
      const fecha = new Date(formData.fechaEntrega);
      estadoAuto = fecha > hoy ? "Activo" : "Finalizado";
    }

    if (!grupos.includes(formData.grupoAsignado)) {
      setGrupos([...grupos, formData.grupoAsignado]);
    }

    if (modalMode === "add") {
      const newProyecto = {
        ...formData,
        id: proyectos.length + 1,
        estado: estadoAuto || "Pendiente",
      };
      setProyectos([...proyectos, newProyecto]);
    } else if (selectedProyecto && modalMode === "edit") {
      setProyectos(
        proyectos.map((p) =>
          p.id === selectedProyecto.id
            ? { ...formData, id: p.id, estado: estadoAuto || p.estado }
            : p
        )
      );
    }

    setModalOpen(false);
    resetForm();
  };

  const handleCancel = () => {
    setModalOpen(false);
    resetForm();
    setSelectedProyecto(null);
  };

  const filteredProyectos = proyectos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(searchProyectos.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(searchProyectos.toLowerCase()) ||
      p.grupoAsignado.toLowerCase().includes(searchProyectos.toLowerCase()) ||
      p.estado.toLowerCase().includes(searchProyectos.toLowerCase())
  );

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

              {/* Botón añadir */}
              <button
                onClick={handleAdd}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Añadir proyecto
              </button>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-700">ID</th>
                    <th className="text-left p-4 font-medium text-gray-700">Nombre</th>
                    <th className="text-left p-4 font-medium text-gray-700">Grupo Asignado</th>
                    <th className="text-left p-4 font-medium text-gray-700">Estado</th>
                    <th className="text-left p-4 font-medium text-gray-700">Fecha Entrega</th>
                    <th className="w-24"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProyectos.map((proyecto) => (
                    <tr key={proyecto.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">{proyecto.id}</td>
                      <td className="p-4">{proyecto.nombre}</td>
                      <td className="p-4">{proyecto.grupoAsignado}</td>
                      <td className="p-4">{proyecto.estado}</td>
                      <td className="p-4">{proyecto.fechaEntrega}</td>
                      <td className="p-4 flex gap-3">
                        <button
                          onClick={() => handleView(proyecto)}
                          className="text-blue-500 hover:text-blue-700 transition-colors"
                        >
                          <Eye size={20} />
                        </button>
                        <button
                          onClick={() => handleEdit(proyecto)}
                          className="text-blue-500 hover:text-blue-700 transition-colors"
                        >
                          <Edit2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredProyectos.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-6 text-center text-gray-500">
                        No hay proyectos que coincidan con la búsqueda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8">
              <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                {modalMode === "add"
                  ? "Añadir proyecto"
                  : modalMode === "edit"
                  ? "Editar proyecto"
                  : "Ver proyecto"}
              </h2>

              {/* Formulario */}
              <div className="space-y-4">
                {[
                  { label: "Nombre", key: "nombre" },
                  { label: "Descripción", key: "descripcion" },
                  { label: "Recurso", key: "recurso" },
                ].map((field) => (
                  <div key={field.key} className="flex items-center gap-4">
                    <label className="w-40 text-right text-gray-700">{field.label}</label>
                    <input
                      type="text"
                      value={(formData as any)[field.key]}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.key]: e.target.value })
                      }
                      className="flex-1 border px-4 py-2 rounded-lg"
                      disabled={modalMode === "view"}
                    />
                  </div>
                ))}

                {/* Grupo Asignado */}
                <div className="flex items-center gap-4">
                  <label className="w-40 text-right text-gray-700">Grupo Asignado</label>
                  {modalMode === "view" ? (
                    <input
                      type="text"
                      value={formData.grupoAsignado}
                      className="flex-1 border px-4 py-2 rounded-lg bg-gray-100"
                      disabled
                    />
                  ) : (
                    <>
                      <input
                        list="grupos"
                        value={formData.grupoAsignado}
                        onChange={(e) =>
                          setFormData({ ...formData, grupoAsignado: e.target.value })
                        }
                        placeholder="Escribe o selecciona un grupo"
                        className="flex-1 border px-4 py-2 rounded-lg"
                      />
                      <datalist id="grupos">
                        {grupos.map((g, i) => (
                          <option key={i} value={g} />
                        ))}
                      </datalist>
                    </>
                  )}
                </div>

                {/* Estado (solo visible en modo view) */}
                {modalMode === "view" && (
                  <div className="flex items-center gap-4">
                    <label className="w-40 text-right text-gray-700">Estado</label>
                    <input
                      type="text"
                      value={formData.estado}
                      readOnly
                      className="flex-1 border px-4 py-2 rounded-lg bg-gray-100 text-gray-700"
                    />
                  </div>
                )}

                {/* Fecha Entrega */}
                <div className="flex items-center gap-4">
                  <label className="w-40 text-right text-gray-700">Fecha Entrega</label>
                  <input
                    type="date"
                    value={formData.fechaEntrega}
                    onChange={(e) =>
                      setFormData({ ...formData, fechaEntrega: e.target.value })
                    }
                    className="flex-1 border px-4 py-2 rounded-lg"
                    disabled={modalMode === "view"}
                  />
                </div>
              </div>

              {/* Botones */}
              <div className="flex justify-center gap-4 mt-8">
                {modalMode !== "view" ? (
                  <button
                    onClick={handleSubmit}
                    className="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                  >
                    {modalMode === "add" ? "Añadir" : "Guardar cambios"}
                  </button>
                ) : null}
                <button
                  onClick={handleCancel}
                  className="px-8 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
                >
                  {modalMode === "view" ? "Cerrar" : "Cancelar"}
                </button>
              </div>
            </div>
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}