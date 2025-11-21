"use client"

import React, { useState, useMemo } from 'react';
import { Search, Edit2, User, Clock, X } from 'lucide-react';
import { AppSidebar } from '@/app/(admin)/-componentes/app-sidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroArea, setFiltroArea] = useState<string>('todos');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  type DayKey = 'L' | 'M' | 'Mi' | 'J' | 'V' | 'S' | 'D';
  type DaySchedule = { start?: string; end?: string; type: string };

  interface Person {
    id: number;
    name: string;
    role: string;
    areas: string[];
    area: string; 
    schedule: Record<DayKey, DaySchedule>;
  }

  const [editedSchedule, setEditedSchedule] = useState<Record<DayKey, DaySchedule> | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  const [schedules, setSchedules] = useState<Person[]>([
    {
      id: 1,
      name: 'Diego Alonso',
      role: 'Android - Analisis',
      areas: ['Android - Analisis', 'Operaciones'],
      area: 'Android - Analisis',
      schedule: {
        L: { start: '8:00 am', end: '5:00 pm', type: 'Virtual' },
        M: { start: '8:00 am', end: '5:00 pm', type: 'Virtual' },
        Mi: { start: '8:00 am', end: '5:00 pm', type: 'Virtual' },
        J: { start: '8:00 am', end: '5:00 pm', type: 'Virtual' },
        V: { start: '9:00 am', end: '12:30 pm', type: 'Presencial' },
        S: { type: 'Descanso' },
        D: { type: 'Descanso' }
      }
    },
    {
      id: 2,
      name: 'Manuel Echeverria',
      role: 'Android - Analisis',
      areas: ['Android - Analisis'],
      area: 'Android - Analisis',
      schedule: {
        L: { start: '8:00 am', end: '5:00 pm', type: 'Virtual' },
        M: { start: '8:00 am', end: '5:00 pm', type: 'Virtual' },
        Mi: { start: '8:00 am', end: '5:00 pm', type: 'Virtual' },
        J: { start: '8:00 am', end: '5:00 pm', type: 'Virtual' },
        V: { start: '9:00 am', end: '12:30 pm', type: 'Presencial' },
        S: { type: 'Descanso' },
        D: { type: 'Descanso' }
      }
    },
    {
      id: 3,
      name: 'Oscar Arias',
      role: 'Android - Analisis',
      areas: ['Android - Analisis'],
      area: 'Android - Analisis',
      schedule: {
        L: { start: '8:00 am', end: '5:00 pm', type: 'Virtual' },
        M: { start: '8:00 am', end: '5:00 pm', type: 'Virtual' },
        Mi: { start: '8:00 am', end: '5:00 pm', type: 'Virtual' },
        J: { start: '8:00 am', end: '5:00 pm', type: 'Virtual' },
        V: { start: '9:00 am', end: '12:30 pm', type: 'Presencial' },
        S: { type: 'Descanso' },
        D: { type: 'Descanso' }
      }
    },
    {
      id: 4,
      name: 'Andrea Santiesteban',
      role: 'Android - Analisis',
      areas: ['Android - Analisis'],
      area: 'Android - Analisis',
      schedule: {
        L: { start: '8:00 am', end: '5:00 pm', type: 'Virtual' },
        M: { start: '8:00 am', end: '5:00 pm', type: 'Virtual' },
        Mi: { start: '8:00 am', end: '5:00 pm', type: 'Virtual' },
        J: { start: '8:00 am', end: '5:00 pm', type: 'Virtual' },
        V: { start: '9:00 am', end: '12:30 pm', type: 'Presencial' },
        S: { type: 'Descanso' },
        D: { type: 'Descanso' }
      }
    },
    {
      id: 5,
      name: 'Marcelo Scerpella',
      role: 'Android - Analisis',
      areas: ['Android - Analisis'],
      area: 'Android - Analisis',
      schedule: {
        L: { start: '8:00 am', end: '5:00 pm', type: 'Virtual' },
        M: { start: '8:00 am', end: '5:00 pm', type: 'Virtual' },
        Mi: { start: '8:00 am', end: '5:00 pm', type: 'Virtual' },
        J: { start: '8:00 am', end: '5:00 pm', type: 'Virtual' },
        V: { start: '9:00 am', end: '12:30 pm', type: 'Presencial' },
        S: { type: 'Descanso' },
        D: { type: 'Descanso' }
      }
    },
    {
      id: 6,
      name: 'Carla Rodriguez',
      role: 'Diseñadora Gráfica',
      areas: ['Marketing', 'Diseño'],
      area: 'Marketing',
      schedule: {
        L: { start: '9:00 am', end: '6:00 pm', type: 'Presencial' },
        M: { start: '9:00 am', end: '6:00 pm', type: 'Presencial' },
        Mi: { start: '9:00 am', end: '6:00 pm', type: 'Virtual' },
        J: { start: '9:00 am', end: '6:00 pm', type: 'Presencial' },
        V: { start: '9:00 am', end: '6:00 pm', type: 'Virtual' },
        S: { type: 'Descanso' },
        D: { type: 'Descanso' }
      }
    }
  ]);

  const dayLabels: DayKey[] = ['L', 'M', 'Mi', 'J', 'V', 'S', 'D'];
  const dayNames = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

  const allAreas = useMemo(() => {
    const areas = [...new Set(schedules.map(person => person.area))];
    areas.sort();
    return areas;
  }, [schedules]);

  function formatTimeString(value?: string) {
    if (!value) return '';
    const v = value.trim();
    if (/^\d{1,2}:\d{2}$/.test(v)) {
      const [h, m] = v.split(':');
      return `${h.padStart(2, '0')}:${m}`;
    }
    const m = v.match(/^(\d{1,2}):(\d{2})\s*(am|pm)?$/i);
    if (!m) return v;
    let hour = parseInt(m[1], 10);
    const minute = m[2];
    const ampm = (m[3] || '').toLowerCase();
    if (ampm === 'am') {
      if (hour === 12) hour = 0;
    } else if (ampm === 'pm') {
      if (hour !== 12) hour += 12;
    }
    return `${String(hour).padStart(2, '0')}:${minute}`;
  }

  const filteredSchedules = schedules.filter(person => {
    const matchArea = filtroArea === 'todos' || person.area === filtroArea;
    const lowerSearchTerm = searchTerm.toLowerCase();
    const matchSearch =
      person.name.toLowerCase().includes(lowerSearchTerm) ||
      person.role.toLowerCase().includes(lowerSearchTerm);

    return matchArea && matchSearch;
  });

  const handleEdit = (id: number) => {
    const person = schedules.find(p => p.id === id);
    if (person) {
      setSelectedPerson(person as Person);
      setEditedSchedule({ ...person.schedule } as Record<DayKey, DaySchedule>);
      setSelectedArea(person.area ?? (person.areas?.[0] ?? null));
      setSelectedAreas(person.areas ? [...person.areas] : []);
      setIsModalOpen(true);
    }
  };

  const handleTimeChange = (day: DayKey, field: 'start' | 'end', value: string) => {
    setEditedSchedule((prev) => ({
      ...(prev as Record<DayKey, DaySchedule>),
      [day]: {
        ...((prev as Record<DayKey, DaySchedule>)[day] || {}),
        [field]: value
      }
    }));
  };

  const handleTypeChange = (day: DayKey, type: string) => {
    setEditedSchedule((prev) => ({
      ...(prev as Record<DayKey, DaySchedule>),
      [day]: {
        ...((prev as Record<DayKey, DaySchedule>)[day] || {}),
        type: type
      }
    }));
  };

  const handleDayTypeToggle = (day: DayKey, isRestDay: boolean) => {
    if (isRestDay) {
      setEditedSchedule((prev) => ({
        ...(prev as Record<DayKey, DaySchedule>),
        [day]: { type: 'Descanso' }
      }));
    } else {
      setEditedSchedule((prev) => ({
        ...(prev as Record<DayKey, DaySchedule>),
        [day]: {
          start: '8:00 am',
          end: '5:00 pm',
          type: 'Virtual'
        }
      }));
    }
  };

  const handleSave = () => {
    if (selectedPerson) {
      setSchedules(prev => prev.map(p => 
        p.id === selectedPerson.id 
          ? { ...p, schedule: editedSchedule as Record<DayKey, DaySchedule>, area: selectedArea ?? p.area, areas: selectedAreas.length ? selectedAreas : p.areas }
          : p
      ));
      setIsModalOpen(false);
      setSelectedPerson(null);
      setEditedSchedule(null);
      setSelectedArea(null);
      setSelectedAreas([]);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedPerson(null);
    setEditedSchedule(null);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header*/}
        <div className="bg-white w-full h-[80px] flex items-center px-8 shadow-sm mb-8">
          <span className="font-bold" style={{ fontSize: 27 }}>Horarios</span>
        </div>

        {/* Content */}
        <div className="px-8 pb-8">
          <div className="bg-white rounded-lg shadow-sm">
            
            {/* Search Bar + Filtro de Área */}
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center gap-4">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar por nombre o rol..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                {/* Filtro de Área */}
                <div className="flex items-center gap-2">
                  <label htmlFor="areaFilter" className="text-sm font-medium text-gray-700 whitespace-nowrap">
                    Filtrar por Área:
                  </label>
                  <select
                    id="areaFilter"
                    value={filtroArea}
                    onChange={(e) => setFiltroArea(e.target.value)}
                    className="border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="todos">Todas las áreas</option>
                    {allAreas.map((area) => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>

              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* ... (thead) ... */}
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700"></th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Área</th>
                    {dayLabels.map((day, idx) => (
                      <th key={idx} className="px-4 py-3 text-center text-sm font-medium text-gray-700">
                        {day}
                      </th>
                    ))}
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-700"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/*  Itera sobre filteredSchedules */}
                  {filteredSchedules.map((person) => (
                    <tr key={person.id} className="hover:bg-gray-50 transition-colors">
                      {/* ... (td de persona ) ... */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="w-6 h-6 text-gray-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{person.name}</div>
                            <div className="text-sm text-gray-500">{person.role}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-gray-700">{person.area}</td>

                      {/* ... (td de horarios ) ... */}
                      {dayLabels.map((day, idx) => {
                        const schedule = person.schedule[day as keyof typeof person.schedule];
                        if (schedule.type === 'Descanso') {
                          return (
                            <td key={idx} className="px-4 py-4 text-center">
                              <div className="text-sm text-gray-600">{schedule.type}</div>
                            </td>
                          );
                        }
                        const start = formatTimeString(schedule.start);
                        const end = formatTimeString(schedule.end);
                        return (
                          <td key={idx} className="px-4 py-4 text-center">
                            <div className="text-sm font-medium text-gray-900">{start} - {end}</div>
                            <div className="text-xs text-gray-500 mt-1">{schedule.type}</div>
                          </td>
                        );
                      })}

                      {/* ... (td de botón editar ) ... */}
                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={() => handleEdit(person.id)}
                          className="text-blue-500 hover:text-blue-700 transition-colors"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* [CAMBIO] Mensaje de "No se encontraron resultados" */}
            {filteredSchedules.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No se encontraron resultados para los filtros aplicados.
              </div>
            )}
          </div>
        </div>

        {/* Modal (sin cambios en su lógica interna) */}
        {isModalOpen && selectedPerson && editedSchedule && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="border-b border-gray-200 p-6 flex justify-between items-center sticky top-0 bg-white">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Editar Horario</h2>
                </div>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Nombre */}
                <div className="grid grid-cols-4 gap-4 items-center">
                  <label className="text-right text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    type="text"
                    value={selectedPerson.name}
                    disabled
                    className="col-span-3 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                  />
                </div>

                {/* Área (si tiene más de una) */}
                <div className="grid grid-cols-4 gap-4 items-center">
                  <label className="text-right text-sm font-medium text-gray-700">Área</label>
                  <div className="col-span-3">
                    {selectedPerson.areas && selectedPerson.areas.length > 1 ? (
                      <select
                        value={selectedArea ?? ''}
                        onChange={(e) => setSelectedArea(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                      >
                        {selectedPerson.areas.map((a: string) => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={selectedPerson.area}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-600"
                      />
                    )}
                  </div>
                </div>

                {/* Día de la semana */}
                <div className="grid grid-cols-4 gap-4 items-center">
                  <label className="text-right text-sm font-medium text-gray-700">Dia de la semana</label>
                  <div className="col-span-3 flex gap-2">
                    {dayLabels.map((day) => {
                      const isRestDay = editedSchedule[day].type === 'Descanso';
                      return (
                        <button
                          key={day}
                          onClick={() => handleDayTypeToggle(day, !isRestDay)}
                          className={`px-4 py-2 border-2 rounded-md transition-colors font-medium ${
                            isRestDay
                              ? 'border-gray-300 text-gray-400 bg-gray-50'
                              : 'border-blue-500 text-blue-500 hover:bg-blue-50'
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Horarios por día */}
                {dayLabels.map((day, idx) => {
                  const schedule = editedSchedule[day];
                  const isRestDay = schedule.type === 'Descanso';

                  return (
                    <div key={day} className="grid grid-cols-4 gap-4 items-center">
                      <label className="text-right text-sm font-medium text-gray-700">
                        {dayNames[idx]}
                      </label>
                      
                      {isRestDay ? (
                        <div className="col-span-3 flex items-center gap-4">
                          <span className="text-sm text-gray-600">Dia de descanso</span>
                          <button
                            onClick={() => handleDayTypeToggle(day, false)}
                            className="text-blue-500 text-sm hover:underline"
                          >
                            Cambiar a día laboral
                          </button>
                        </div>
                      ) : (
                        <div className="col-span-3 flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="time"
                              value={schedule.start?.replace(' am', '').replace(' pm', '') || '08:00'}
                              onChange={(e) => handleTimeChange(day, 'start', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                            <Clock className="w-4 h-4 text-gray-400" />
                          </div>
                          
                          <span className="text-gray-500">a</span>
                          
                          <div className="flex items-center gap-2">
                            <input
                              type="time"
                              value={schedule.end?.replace(' am', '').replace(' pm', '') || '17:00'}
                              onChange={(e) => handleTimeChange(day, 'end', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                            <Clock className="w-4 h-4 text-gray-400" />
                          </div>

                          <span className="text-gray-500">-</span>

                          <div className="flex gap-2">
                            <button
                              onClick={() => handleTypeChange(day, 'Virtual')}
                              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                schedule.type === 'Virtual'
                                  ? 'bg-blue-500 text-white'
                                  : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              Virtual
                            </button>
                            <span className="text-gray-500">o</span>
                            <button
                              onClick={() => handleTypeChange(day, 'Presencial')}
                              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                schedule.type === 'Presencial'
                                  ? 'bg-blue-500 text-white'
                                  : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              Presencial
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Modal Footer */}
              <div className="border-t border-gray-200 p-6 flex justify-end gap-3 sticky bottom-0 bg-white">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}