'use client';

import { useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';

import { AppSidebar } from '@/app/(admin)/-componentes/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

// Importa el mapa dinámicamente SIN SSR
const Mapa = dynamic(() => import('@/app/(admin)/-componentes/map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <p>Cargando mapa...</p>
    </div>
  ),
});

const distritos = [
  { nombre: 'Miraflores', lat: -12.121, lng: -77.03 },
  { nombre: 'San Isidro', lat: -12.097, lng: -77.036 },
];

const trabajadores = [
  { id: '1', nombre: 'Carlos', lat: -12.122, lng: -77.031, distrito: 'Miraflores', avatar: '/avatars/carlos.jpg', role: 'Operador' },
  { id: '2', nombre: 'Lucía', lat: -12.123, lng: -77.032, distrito: 'Miraflores', avatar: '/avatars/lucia.jpg', role: 'Supervisor' },
  { id: '3', nombre: 'Pedro', lat: -12.098, lng: -77.037, distrito: 'San Isidro', avatar: '/avatars/pedro.jpg', role: 'Administración' },
  { id: '4', nombre: 'María', lat: -12.095, lng: -77.038, distrito: 'San Isidro', avatar: '/avatars/maria.jpg', role: 'Operador' },
];

function isNear(d1: { lat: number; lng: number }, d2: { lat: number; lng: number }) {
  const distance = Math.sqrt(Math.pow(d1.lat - d2.lat, 2) + Math.pow(d1.lng - d2.lng, 2));
  return distance < 0.01;
}

export default function Page() {
  const [zoom, setZoom] = useState(12);
  const [selectedDistrito, setSelectedDistrito] = useState<null | { nombre: string; lat: number; lng: number }>(null);

  const colaboradoresVisibles = useMemo(() => {
    if (!selectedDistrito) return [];
    return trabajadores.filter(t => t.distrito === selectedDistrito.nombre || isNear(t, selectedDistrito));
  }, [selectedDistrito]);

  // Usa useCallback para evitar recrear la función en cada render
  const handleZoomChange = useCallback((newZoom: number) => {
    setZoom(newZoom);
  }, []);

  const handleDistritoChange = useCallback((distrito: { nombre: string; lat: number; lng: number } | null) => {
    setSelectedDistrito(distrito);
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="bg-white w-full h-[80px] flex items-center px-8 shadow-sm ">
          <span className="font-bold" style={{ fontSize: 27 }}>Localizaciones</span>
        </div>

        <div className="p-8 flex flex-col gap-8">
          {/* Mapa real */}
          <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-md">
            <Mapa
              distritos={distritos}
              trabajadores={trabajadores}
              zoom={zoom}
              setZoom={handleZoomChange}
              setSelectedDistrito={handleDistritoChange}
            />
          </div>

          {/* Cards de colaboradores */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Colaboradores en el distrito seleccionado</h2>
            {selectedDistrito ? (
              colaboradoresVisibles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {colaboradoresVisibles.map((user) => (
                    <div key={user.id} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
                      <img src={user.avatar} alt={user.nombre} className="w-16 h-16 rounded-full mb-3 object-cover border-2 border-blue-200" />
                      <span className="font-bold text-lg text-gray-800">{user.nombre}</span>
                      <span className="text-sm text-gray-500">{user.role}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No hay colaboradores cercanos al distrito seleccionado.</p>
              )
            ) : (
              <p>Selecciona un distrito en el mapa para ver colaboradores cercanos.</p>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}