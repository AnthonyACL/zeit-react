"use client";

import React, { useState } from "react";
import { Clock, Plus } from "lucide-react";
import { AppSidebar } from "@/app/(admin)/-componentes/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

type DayKey = "L" | "M" | "Mi" | "J" | "V" | "S" | "D";

interface TimeSlot {
  start: string;
  end: string;
  v: boolean;
  p: boolean;
}

interface Schedule {
  id: number;
  name: string;
  selected: boolean;
  days: Record<DayKey, boolean>;
  times: {
    lunes: TimeSlot;
    martes: TimeSlot;
    miercoles: TimeSlot;
    jueves: TimeSlot;
    viernes: TimeSlot;
  };
}

export default function Page() {
  const users = [
    { name: "Diego Alonso", role: "Administración", avatar: "/avatars/diego.jpg" },
    { name: "Ana Torres", role: "Supervisor", avatar: "/avatars/ana.jpg" },
    { name: "Luis Pérez", role: "Operador", avatar: "/avatars/luis.jpg" },
  ];

  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: 1,
      name: "Android - Análisis",
      selected: true,
      days: { L: false, M: false, Mi: false, J: false, V: false, S: false, D: false },
      times: {
        lunes: { start: "8:00 am", end: "5:00 pm", v: false, p: false },
        martes: { start: "8:00 am", end: "5:00 pm", v: false, p: false },
        miercoles: { start: "8:00 am", end: "5:00 pm", v: false, p: false },
        jueves: { start: "8:00 am", end: "5:00 pm", v: false, p: false },
        viernes: { start: "9:00 am", end: "12:30 pm", v: false, p: false },
      },
    },
  ]);

  const [currentSchedule, setCurrentSchedule] = useState<Schedule>(schedules[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const dayLabels: Record<DayKey, string> = {
    L: "Lunes",
    M: "Martes",
    Mi: "Miércoles",
    J: "Jueves",
    V: "Viernes",
    S: "Sábado",
    D: "Domingo",
  };

  const handleDayToggle = (day: DayKey) => {
    setCurrentSchedule((prev) => ({
      ...prev,
      days: { ...prev.days, [day]: !prev.days[day] },
    }));
  };

  const handleTimeChange = (day: keyof Schedule["times"], field: keyof TimeSlot, value: string | boolean) => {
    setCurrentSchedule((prev) => ({
      ...prev,
      times: {
        ...prev.times,
        [day]: { ...prev.times[day], [field]: value },
      },
    }));
  };

  const handleAddSchedule = () => {
    const newId = Math.max(...schedules.map((s) => s.id), 0) + 1;
    const newSchedule: Schedule = {
      id: newId,
      name: `Horario ${newId}`,
      selected: false,
      days: { L: false, M: false, Mi: false, J: false, V: false, S: false, D: false },
      times: {
        lunes: { start: "8:00 am", end: "5:00 pm", v: false, p: false },
        martes: { start: "8:00 am", end: "5:00 pm", v: false, p: false },
        miercoles: { start: "8:00 am", end: "5:00 pm", v: false, p: false },
        jueves: { start: "8:00 am", end: "5:00 pm", v: false, p: false },
        viernes: { start: "9:00 am", end: "12:30 pm", v: false, p: false },
      },
    };
    setSchedules([...schedules, newSchedule]);
  };

  const handleSelectSchedule = (id: number) => {
    setSchedules((prev) => prev.map((s) => ({ ...s, selected: s.id === id })));
    const selected = schedules.find((s) => s.id === id);
    if (selected) setCurrentSchedule(selected);
  };

  const filteredSchedules = schedules.filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Título fijo */}
        <div className="bg-white w-full h-[80px] flex items-center px-8 shadow-sm mb-8">
          <span className="font-bold text-2xl">Areas</span>
        </div>

        <div className="flex h-[calc(100vh-80px)] bg-gray-100">
          {/* Sidebar de schedules */}
          <div className="w-64 bg-white border-r border-gray-200">
            <div className="p-4">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute left-2 top-2.5 text-gray-400">🔍</span>
              </div>
              <button
                onClick={handleAddSchedule}
                className="w-full flex items-center justify-center gap-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
              >
                <Plus size={16} />
                Añadir nueva area
              </button>
            </div>
            <div className="overflow-y-auto">
              {filteredSchedules.map((schedule) => (
                <div
                  key={schedule.id}
                  onClick={() => handleSelectSchedule(schedule.id)}
                  className={`px-4 py-3 cursor-pointer border-b border-gray-100 ${
                    schedule.selected ? "bg-blue-50 border-l-4 border-l-blue-500" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="font-medium text-sm">{schedule.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">

              {/* Schedule Name */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Nombre del Area</label>
                <input
                  type="text"
                  value={currentSchedule.name}
                  onChange={(e) => setCurrentSchedule({ ...currentSchedule, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Days */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Día de la semana</label>
                <div className="flex gap-2">
                  {(Object.keys(dayLabels) as DayKey[]).map((day) => (
                    <button
                      key={day}
                      onClick={() => handleDayToggle(day)}
                      className={`px-4 py-2 rounded border ${
                        currentSchedule.days[day]
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Times */}
              <div className="space-y-3">
                {(Object.entries({
                  lunes: "Lunes",
                  martes: "Martes",
                  miercoles: "Miércoles",
                  jueves: "Jueves",
                  viernes: "Viernes",
                }) as [keyof Schedule["times"], string][]).map(([key, label]) => (
                  <div key={key} className="flex items-center gap-3">
                    <div className="w-24 text-sm text-gray-600">{label}</div>
                    <input
                      type="text"
                      value={currentSchedule.times[key].start}
                      onChange={(e) => handleTimeChange(key, "start", e.target.value)}
                      className="w-28 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Clock size={16} className="text-gray-400" />
                    <span className="text-gray-500">a</span>
                    <input
                      type="text"
                      value={currentSchedule.times[key].end}
                      onChange={(e) => handleTimeChange(key, "end", e.target.value)}
                      className="w-28 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Clock size={16} className="text-gray-400" />
                    <span className="text-gray-500">-</span>
                    <button
                      onClick={() => handleTimeChange(key, "v", !currentSchedule.times[key].v)}
                      className={`px-3 py-1.5 text-sm rounded border ${
                        currentSchedule.times[key].v
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white text-gray-700 border-gray-300"
                      }`}
                    >
                      V
                    </button>
                    <span className="text-gray-500">o</span>
                    <button
                      onClick={() => handleTimeChange(key, "p", !currentSchedule.times[key].p)}
                      className={`px-3 py-1.5 text-sm rounded border ${
                        currentSchedule.times[key].p
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white text-gray-700 border-gray-300"
                      }`}
                    >
                      P
                    </button>
                  </div>
                ))}

                {/* Weekend */}
                <div className="flex items-center gap-3">
                  <div className="w-24 text-sm text-gray-600">Sábado</div>
                  <span className="text-gray-500">Día de descanso</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 text-sm text-gray-600">Domingo</div>
                  <span className="text-gray-500">Día de descanso</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-4 mt-8">
                <button className="px-8 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                  Aceptar
                </button>
                <button className="px-8 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}