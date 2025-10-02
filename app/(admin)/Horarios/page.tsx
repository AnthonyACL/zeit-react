"use client";

import React, { useState } from 'react';
import { Search, Edit2, User } from 'lucide-react';
import { AppSidebar } from '@/app/(admin)/-componentes/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

// Tipos para tu schedule
type WorkDay = {
  start: string;
  end: string;
  type: string;
};

type RestDay = {
  type: string;
};

type DaySchedule = WorkDay | RestDay;

type PersonSchedule = {
  id: number;
  name: string;
  role: string;
  schedule: {
    L: DaySchedule;
    M: DaySchedule;
    Mi: DaySchedule;
    J: DaySchedule;
    V: DaySchedule;
    S: DaySchedule;
    D: DaySchedule;
  };
};

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [schedules, setSchedules] = useState<PersonSchedule[]>([
    {
      id: 1,
      name: 'Diego Alonso',
      role: 'Android - Analisis',
      schedule: {
        L: { start: '8:00 am', end: '5:00 pm', type: 'Virtual' },
        M: { start: '8:00 am', end: '5:00 pm', type: 'Virtual' },
        Mi: { start: '8:00 am', end: '5:00 pm', type: 'Virtual' },
        J: { start: '8:00 am', end: '5:00 pm', type: 'Virtual' },
        V: { start: '9:00 am', end: '12:30 pm', type: 'Presencial' },
        S: { type: 'Descanso' },
        D: { type: 'Descanso' },
      },
    },
    // ... tus otras personas (Manuel, Oscar, etc.) igual
  ]);

  const dayLabels = ['L', 'M', 'Mi', 'J', 'V', 'S', 'D'];

  const filteredSchedules = schedules.filter(
    (person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id: number) => {
    console.log('Editar persona con ID:', id);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="bg-white w-full h-[80px] flex items-center px-8 shadow-sm mb-8">
          <span className="font-bold" style={{ fontSize: 27 }}>
            Horarios
          </span>
        </div>
        <div className="px-8 pb-8">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="border-b border-gray-200 p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700"></th>
                    {dayLabels.map((day, idx) => (
                      <th key={idx} className="px-4 py-3 text-center text-sm font-medium text-gray-700">
                        {day}
                      </th>
                    ))}
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-700"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredSchedules.map((person) => (
                    <tr key={person.id} className="hover:bg-gray-50 transition-colors">
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
                      {dayLabels.map((day, idx) => {
                        const schedule = person.schedule[day as keyof typeof person.schedule];

                        return (
                          <td key={idx} className="px-4 py-4 text-center">
                            {"start" in schedule ? (
                              <div className="text-sm">
                                <div className="text-gray-900">{schedule.start}</div>
                                <div className="text-gray-900">{schedule.end}</div>
                                <div className="text-gray-500 mt-1">{schedule.type}</div>
                              </div>
                            ) : (
                              <div className="text-sm text-gray-600">{schedule.type}</div>
                            )}
                          </td>
                        );
                      })}
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

            {filteredSchedules.length === 0 && (
              <div className="text-center py-12 text-gray-500">No se encontraron resultados</div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
