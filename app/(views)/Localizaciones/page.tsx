'use client';

import { useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import { AppSidebar } from '@/app/(views)/-componentes/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { MOCK_COLABORADORES } from '@/data/mockData';

// Importa el mapa dinámicamente SIN SSR
const Mapa = dynamic(() => import('@/app/(views)/-componentes/map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <p>Cargando mapa...</p>
    </div>
  ),
});

// Distritos/puntos verdes en el mapa
const distritos = [
  { nombre: 'Miraflores', lat: -12.121, lng: -77.03 },
  { nombre: 'San Isidro', lat: -12.097, lng: -77.036 },
  { nombre: 'Lince', lat: -12.085, lng: -77.032 },
  { nombre: 'Breña', lat: -12.064, lng: -77.037 },
];

// Asociar colaboradores con distritos según su lat/lng
function obtenerDistritoColaborador(lat: number | undefined, lng: number | undefined): string {
  if (!lat || !lng) return 'Lima';
  
  // Encontrar el distrito más cercano
  let districtoCercano = distritos[0];
  let distanciaMinima = Infinity;
  
  for (const distrito of distritos) {
    const distancia = Math.sqrt(Math.pow(lat - distrito.lat, 2) + Math.pow(lng - distrito.lng, 2));
    if (distancia < distanciaMinima) {
      distanciaMinima = distancia;
      districtoCercano = distrito;
    }
  }
  
  return districtoCercano.nombre;
}

export default function Page() {
  const router = useRouter();
  const [zoom, setZoom] = useState(12);
  const [selectedDistrito, setSelectedDistrito] = useState<null | { nombre: string; lat: number; lng: number }>(null);

  // Convertir MOCK_COLABORADORES a formato de trabajadores con distritos asociados
  const trabajadores = useMemo(() => {
    return MOCK_COLABORADORES.map((col) => ({
      id: col.id.toString(),
      nombre: col.nombre,
      lat: col.lat || -12.097,
      lng: col.lng || -77.036,
      distrito: obtenerDistritoColaborador(col.lat, col.lng),
      avatar: col.avatar,
      rol: col.rol,
      area: col.area,
      correo: col.correo,
    }));
  }, []);

  // Filtrar colaboradores visibles en el distrito seleccionado
  const colaboradoresVisibles = useMemo(() => {
    if (!selectedDistrito) return [];
    return trabajadores.filter(t => t.distrito === selectedDistrito.nombre);
  }, [selectedDistrito, trabajadores]);

  // Usa useCallback para evitar recrear la función en cada render
  const handleZoomChange = useCallback((newZoom: number) => {
    setZoom(newZoom);
  }, []);

  const handleDistritoChange = useCallback((distrito: { nombre: string; lat: number; lng: number } | null) => {
    setSelectedDistrito(distrito);
  }, []);

  const handleColaboradorClick = (colaboradorId: string) => {
    router.push(`/Chat?user=${colaboradorId}`);
  };

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
            <h2 className="text-xl font-semibold mb-4">
              {selectedDistrito 
                ? `Colaboradores en ${selectedDistrito.nombre}` 
                : 'Selecciona un distrito en el mapa'}
            </h2>
            {selectedDistrito ? (
              colaboradoresVisibles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {colaboradoresVisibles.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => handleColaboradorClick(user.id)}
                      className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200"
                    >
                      <img
                        src={user.avatar || `https://i.pravatar.cc/150?u=${user.id}`}
                        alt={user.nombre}
                        className="w-16 h-16 rounded-full mb-3 object-cover border-2 border-blue-200"
                      />
                      <span className="font-bold text-lg text-gray-800">{user.nombre}</span>
                      <span className="text-sm text-gray-500">{user.area}</span>
                      <span className="text-xs text-gray-400 mt-2">{user.correo}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleColaboradorClick(user.id);
                        }}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Enviar mensaje
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No hay colaboradores en este distrito.</p>
              )
            ) : (
              <p className="text-gray-400">Haz clic en un punto verde del mapa para ver colaboradores.</p>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}