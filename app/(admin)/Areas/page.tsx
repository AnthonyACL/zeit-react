"use client";

import React, { useState } from "react";
import { Clock, Plus, Search, User, Square, CheckSquare, X, Edit2, Trash2 } from "lucide-react";
import { AppSidebar } from "@/app/(admin)/-componentes/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

type DayKey = "L" | "M" | "Mi" | "J" | "V" | "S" | "D";

interface TimeSlot {
  start: string;
  end: string;
  v: boolean;
  p: boolean;
}

interface Colaborador {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

interface Schedule {
  id: number;
  name: string;
  teamLeaderId: number | null;
  collaborators: number[];
  days: Record<DayKey, boolean>;
  times: {
    lunes: TimeSlot;
    martes: TimeSlot;
    miercoles: TimeSlot;
    jueves: TimeSlot;
    viernes: TimeSlot;
    sabado: TimeSlot;
    domingo: TimeSlot;
  };
}

const allUsers: Colaborador[] = [
  { id: 1, name: "Diego Alonso", role: "Administración", avatar: "/avatars/diego.jpg" },
  { id: 2, name: "Ana Torres", role: "Supervisor", avatar: "/avatars/ana.jpg" },
  { id: 3, name: "Luis Pérez", role: "Operador", avatar: "/avatars/luis.jpg" },
  { id: 4, name: "Carla Rodriguez", role: "Diseñadora", avatar: "/avatars/carla.jpg" },
];

const blankSchedule: Schedule = {
  id: 0,
  name: "",
  teamLeaderId: null,
  collaborators: [],
  days: { L: false, M: false, Mi: false, J: false, V: false, S: false, D: false },
  times: {
    lunes: { start: "08:00", end: "17:00", v: false, p: false },
    martes: { start: "08:00", end: "17:00", v: false, p: false },
    miercoles: { start: "08:00", end: "17:00", v: false, p: false },
    jueves: { start: "08:00", end: "17:00", v: false, p: false },
    viernes: { start: "08:00", end: "17:00", v: false, p: false },
    sabado: { start: "08:00", end: "17:00", v: false, p: false },
    domingo: { start: "08:00", end: "17:00", v: false, p: false },
  },
};

const dayLabels: Record<DayKey, string> = {
  L: "Lunes",
  M: "Martes",
  Mi: "Miércoles",
  J: "Jueves",
  V: "Viernes",
  S: "Sábado",
  D: "Domingo",
};

const dayKeyToTimeKey: Record<DayKey, keyof Schedule["times"]> = {
  L: "lunes",
  M: "martes",
  Mi: "miercoles",
  J: "jueves",
  V: "viernes",
  S: "sabado",
  D: "domingo",
};

export default function Page() {
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: 1,
      name: "Android - Análisis",
      teamLeaderId: 1,
      collaborators: [1, 3],
      days: { L: true, M: true, Mi: true, J: true, V: true, S: false, D: false },
      times: {
        lunes: { start: "08:00", end: "17:00", v: true, p: false },
        martes: { start: "08:00", end: "17:00", v: true, p: false },
        miercoles: { start: "08:00", end: "17:00", v: true, p: false },
        jueves: { start: "08:00", end: "17:00", v: false, p: true },
        viernes: { start: "09:00", end: "12:30", v: false, p: true },
        sabado: { start: "08:00", end: "17:00", v: false, p: false },
        domingo: { start: "08:00", end: "17:00", v: false, p: false },
      },
    },
    {
      id: 2,
      name: "Diseño UI/UX",
      teamLeaderId: 2,
      collaborators: [2, 4],
      days: { L: true, M: true, Mi: true, J: false, V: false, S: true, D: false },
      times: {
        lunes: { start: "09:00", end: "18:00", v: false, p: true },
        martes: { start: "09:00", end: "18:00", v: false, p: true },
        miercoles: { start: "09:00", end: "18:00", v: true, p: false },
        jueves: { start: "08:00", end: "17:00", v: false, p: false },
        viernes: { start: "08:00", end: "17:00", v: false, p: false },
        sabado: { start: "09:00", end: "13:00", v: true, p: false },
        domingo: { start: "08:00", end: "17:00", v: false, p: false },
      },
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [formData, setFormData] = useState<Schedule>(blankSchedule);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState<Schedule | null>(null);
  const [collaboratorSearch, setCollaboratorSearch] = useState("");

  const handleAdd = () => {
    setFormData(blankSchedule);
    setModalMode('add');
    setModalOpen(true);
    setCollaboratorSearch("");
  };

  const handleEdit = (schedule: Schedule) => {
    setFormData(JSON.parse(JSON.stringify(schedule)));
    setModalMode('edit');
    setModalOpen(true);
    setCollaboratorSearch("");
  };

  const handleCancel = () => {
    setModalOpen(false);
    setFormData(blankSchedule);
    setCollaboratorSearch("");
  };

  const handleSubmit = () => {
    if (modalMode === 'add') {
      const newSchedule = {
        ...formData,
        id: Math.max(...schedules.map((s) => s.id), 0) + 1,
      };
      setSchedules([...schedules, newSchedule]);
    } else {
      setSchedules(
        schedules.map((s) => (s.id === formData.id ? { ...formData } : s))
      );
    }
    handleCancel();
  };

  const handleDeleteClick = (schedule: Schedule) => {
    setScheduleToDelete(schedule);
    setDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setScheduleToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (scheduleToDelete) {
      setSchedules(
        schedules.filter((s) => s.id !== scheduleToDelete.id)
      );
    }
    handleCancelDelete();
  };

  const handleDayToggle = (day: DayKey) => {
    setFormData((prev) => ({
      ...prev,
      days: { ...prev.days, [day]: !prev.days[day] },
    }));
  };

  const handleTimeChange = (day: keyof Schedule["times"], field: keyof TimeSlot, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      times: {
        ...prev.times,
        [day]: { ...prev.times[day], [field]: value },
      },
    }));
  };

  const handleCollaboratorToggle = (id: number) => {
    setFormData((prev) => {
      const isSelected = prev.collaborators.includes(id);
      if (isSelected) {
        return {
          ...prev,
          collaborators: prev.collaborators.filter((collabId) => collabId !== id),
          teamLeaderId: prev.teamLeaderId === id ? null : prev.teamLeaderId,
        };
      } else {
        return {
          ...prev,
          collaborators: [...prev.collaborators, id],
        };
      }
    });
  };

  const filteredSchedules = schedules.filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const filteredModalCollaborators = allUsers.filter(user =>
    user.name.toLowerCase().includes(collaboratorSearch.toLowerCase())
  );

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="bg-white w-full h-[80px] flex items-center px-8 shadow-sm mb-8">
          <span className="font-bold text-2xl" style={{ fontSize: 27 }}>Areas</span>
        </div>

        <div className="px-8">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1">
                <Search className="text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar área..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 outline-none text-gray-700 border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <button
                onClick={handleAdd}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Añadir Area
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-700">
                      Nombre del Area
                    </th>
                    <th className="text-left p-4 font-medium text-gray-700">
                      Jefe de Grupo
                    </th>
                    <th className="text-left p-4 font-medium text-gray-700">
                      N° Colaboradores
                    </th>
                    <th className="w-32"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSchedules.map((schedule) => {
                    const leader = allUsers.find(u => u.id === schedule.teamLeaderId);
                    return (
                      <tr key={schedule.id} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-900">
                          {schedule.name}
                        </td>
                        <td className="p-4 text-gray-700">
                          {leader ? (
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                <User className="w-5 h-5 text-gray-600" />
                              </div>
                              {leader.name}
                            </div>
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </td>
                        <td className="p-4 text-gray-700">
                          {schedule.collaborators.length}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleEdit(schedule)}
                              className="text-blue-500 hover:text-blue-700 transition-colors"
                              title="Editar"
                            >
                              <Edit2 size={20} />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(schedule)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredSchedules.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-6 text-center text-gray-500">
                        No se encontraron áreas que coincidan con la búsqueda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh]">
              <div className="p-6 flex justify-between items-center border-b">
                <h2 className="text-xl font-semibold text-gray-800">
                  {modalMode === 'add' ? 'Añadir Nueva Area' : 'Editar Area'}
                </h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 140px)' }}>
                {(() => {
                  const availableLeaders = allUsers.filter(user => formData.collaborators.includes(user.id));
                  
                  return (
                    <>
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-800">
                              Nombre del Area
                            </label>
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-800">
                              Jefe de Grupo
                            </label>
                            <select
                              value={formData.teamLeaderId ?? ''}
                              onChange={(e) => setFormData({ ...formData, teamLeaderId: e.target.value ? parseInt(e.target.value) : null })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                              disabled={availableLeaders.length === 0}
                            >
                              <option value="">
                                {availableLeaders.length === 0 ? "-- Añade colaboradores --" : "-- Sin Asignar --"}
                              </option>
                              {availableLeaders.map(user => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="mb-6">
                          <label className="block text-sm font-medium mb-2 text-gray-800">
                            Colaboradores (Opcional)
                          </label>
                          
                          <div className="relative mb-3">
                            <input
                              type="text"
                              placeholder="Buscar colaborador..."
                              value={collaboratorSearch}
                              onChange={(e) => setCollaboratorSearch(e.target.value)}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-2">
                            {filteredModalCollaborators.map((user) => {
                              const isSelected = formData.collaborators.includes(user.id);
                              return (
                                <button
                                  key={user.id}
                                  onClick={() => handleCollaboratorToggle(user.id)}
                                  className={`flex items-center w-full p-3 border rounded-lg text-left transition-colors ${
                                    isSelected 
                                      ? "bg-blue-50 border-blue-300" 
                                      : "bg-white border-gray-200 hover:bg-gray-50"
                                  }`}
                                >
                                  {isSelected ? (
                                    <CheckSquare size={20} className="text-blue-500 mr-3 flex-shrink-0" />
                                  ) : (
                                    <Square size={20} className="text-gray-400 mr-3 flex-shrink-0" />
                                  )}
                                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3 flex-shrink-0">
                                    <User className="w-6 h-6 text-gray-600" />
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.role}</div>
                                  </div>
                                </button>
                              );
                            })}
                            {filteredModalCollaborators.length === 0 && (
                              <div className="text-sm text-gray-500 col-span-1 md:col-span-2 text-center py-4">
                                No se encontraron colaboradores.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="p-6 border-t border-gray-200">
                        <div className="grid grid-cols-4 gap-4 items-center mb-6">
                          <label className="text-right text-sm font-medium text-gray-700 col-span-1">
                            Día de la semana
                          </label>
                          <div className="col-span-3 flex gap-2 flex-wrap">
                            {(Object.keys(dayLabels) as DayKey[]).map((day) => (
                              <button
                                key={day}
                                onClick={() => handleDayToggle(day)}
                                className={`px-4 py-2 border-2 rounded-md transition-colors font-medium ${
                                  formData.days[day]
                                    ? "border-blue-500 text-blue-500 bg-blue-50 hover:bg-blue-100"
                                    : "border-gray-300 text-gray-400 bg-gray-50 hover:border-gray-400"
                                }`}
                              >
                                {day}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          {(Object.keys(dayLabels) as DayKey[]).map((dayKey) => {
                            const label = dayLabels[dayKey];
                            const isDayActive = formData.days[dayKey];
                            const timeKey = dayKeyToTimeKey[dayKey];

                            return (
                              <div key={dayKey} className="grid grid-cols-4 gap-4 items-center min-h-[50px]">
                                <label className="text-right text-sm font-medium text-gray-700">
                                  {label}
                                </label>
                                
                                {isDayActive ? (
                                  <div className="col-span-3 flex items-center gap-2 flex-wrap">
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="time"
                                        value={formData.times[timeKey].start}
                                        onChange={(e) => handleTimeChange(timeKey, "start", e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                                      />
                                      <Clock className="w-4 h-4 text-gray-400" />
                                    </div>
                                    <span className="text-gray-500">a</span>
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="time"
                                        value={formData.times[timeKey].end}
                                        onChange={(e) => handleTimeChange(timeKey, "end", e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                                      />
                                      <Clock className="w-4 h-4 text-gray-400" />
                                    </div>
                                    <span className="text-gray-500">-</span>
                                    <div className="flex gap-2">
                                      <button
                                        onClick={() => handleTimeChange(timeKey, "v", !formData.times[timeKey].v)}
                                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                          formData.times[timeKey].v
                                            ? "bg-blue-500 text-white"
                                            : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                                        }`}
                                      >
                                        Virtual
                                      </button>
                                      <span className="text-gray-500">o</span>
                                      <button
                                        onClick={() => handleTimeChange(timeKey, "p", !formData.times[timeKey].p)}
                                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                          formData.times[timeKey].p
                                            ? "bg-blue-500 text-white"
                                            : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                                        }`}
                                      >
                                        Presencial
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="col-span-3 text-sm text-gray-600">
                                    Día de descanso
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )
                })()}
              </div>

              <div className="p-6 flex justify-end gap-3 bg-gray-50 rounded-b-lg border-t">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  {modalMode === 'add' ? 'Crear Area' : 'Guardar Cambios'}
                </button>
              </div>
            </div>
          </div>
        )}

        {deleteModalOpen && scheduleToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
              <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                Confirmar Eliminación
              </h2>
              <p className="text-center text-gray-600 mb-8">
                ¿Estás seguro de que deseas eliminar el área{" "}
                <strong>{scheduleToDelete.name}</strong>?
              </p>
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={handleConfirmDelete}
                  className="px-8 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                >
                  Eliminar
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="px-8 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
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