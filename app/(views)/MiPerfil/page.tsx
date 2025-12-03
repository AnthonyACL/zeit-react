"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/app/(views)/-componentes/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { MOCK_COLABORADORES } from "@/data/mockData";

export default function Perfil() {
  const router = useRouter();
  const [perfil, setPerfil] = useState({
    nombre: "",
    dni: "",
    email: "",
    telefono: "",
    direccion: "",
    carrera: "",
    institucion: "",
    area: "",
    rol: "",
  });

  // Obtener datos del usuario desde localStorage y MOCK_COLABORADORES
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('currentUser');
      if (user) {
        try {
          const userData = JSON.parse(user);
          // Buscar el colaborador completo por email en MOCK_COLABORADORES
          const colaborador = MOCK_COLABORADORES.find(col => col.correo === userData.email);
          
          if (colaborador) {
            setPerfil({
              nombre: colaborador.nombre,
              dni: colaborador.dni,
              email: colaborador.correo,
              telefono: colaborador.telefono,
              direccion: colaborador.direccion || "N/A",
              carrera: colaborador.carrera || "N/A",
              institucion: colaborador.institucion,
              area: colaborador.area,
              rol: colaborador.rol,
            });
          } else {
            console.warn('Colaborador no encontrado en MOCK_COLABORADORES');
          }
        } catch (e) {
          console.error('Error parsing user:', e);
        }
      }
    }
  }, []);

  const handleLogout = () => {
    // Limpiar localStorage
    localStorage.removeItem('currentUser');
    // Redirigir al home
    router.push('/');
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* HEADER */}
        <div className="bg-white w-full h-[80px] flex items-center justify-between px-8 shadow-sm mb-10">
          <span className="font-bold text-[27px]">Perfil</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            Cerrar sesión
          </button>
        </div>

        {/* CONTENIDO */}
        <div className="flex flex-col items-center px-8">
          {/* AVATAR */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center shadow-md">
              <svg
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-500"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">
              {perfil.nombre}
            </h2>
            <p className="text-sm text-gray-600 font-medium">{perfil.rol}</p>
          </div>

          {/* INFORMACIÓN PERSONAL */}
          <div className="w-full max-w-5xl">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Información Personal
            </h3>

            <div className="flex flex-col md:flex-row border-t border-gray-200">
              {/* COLUMNA IZQUIERDA */}
              <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-gray-200 p-6">
                <div className="space-y-4">
                  <div>
                    <span className="block text-gray-500 text-sm">Nombre completo</span>
                    <span className="block text-gray-800 font-medium">{perfil.nombre}</span>
                  </div>
                  <hr className="border-gray-100" />
                  <div>
                    <span className="block text-gray-500 text-sm">DNI</span>
                    <span className="block text-gray-800 font-medium">{perfil.dni}</span>
                  </div>
                  <hr className="border-gray-100" />
                  <div>
                    <span className="block text-gray-500 text-sm">Correo electrónico</span>
                    <span className="block text-gray-800 font-medium">{perfil.email}</span>
                  </div>
                  <hr className="border-gray-100" />
                  <div>
                    <span className="block text-gray-500 text-sm">Teléfono</span>
                    <span className="block text-gray-800 font-medium">{perfil.telefono}</span>
                  </div>
                  <hr className="border-gray-100" />
                  <div>
                    <span className="block text-gray-500 text-sm">Dirección</span>
                    <span className="block text-gray-800 font-medium">{perfil.direccion}</span>
                  </div>
                </div>
              </div>

              {/* COLUMNA DERECHA */}
              <div className="w-full md:w-1/2 p-6">
                <div className="space-y-4">
                  <div>
                    <span className="block text-gray-500 text-sm">Carrera</span>
                    <span className="block text-gray-800 font-medium">{perfil.carrera}</span>
                  </div>
                  <hr className="border-gray-100" />
                  <div>
                    <span className="block text-gray-500 text-sm">Institución</span>
                    <span className="block text-gray-800 font-medium">{perfil.institucion}</span>
                  </div>
                  <hr className="border-gray-100" />
                  <div>
                    <span className="block text-gray-500 text-sm">Área</span>
                    <span className="block text-gray-800 font-medium">{perfil.area}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}