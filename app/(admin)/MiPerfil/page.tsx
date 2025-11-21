"use client";

import React from "react";
import { AppSidebar } from "@/app/(admin)/-componentes/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function Perfil() {
  const perfil = {
    nombre: "Alexander Cipriano Gómez",
    dni: "76543210",
    email: "alexander.cipriano@gmail.com",
    telefono: "924304811",
    direccion: "Av. Los Olivos 123, Lima, Perú",
    carrera: "Ingeniería de Sistemas",
    institucion: "SENATI",
    area: "Desarrollo React",
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* HEADER */}
        <div className="bg-white w-full h-[80px] flex items-center px-8 shadow-sm mb-10">
          <span className="font-bold text-[27px]">Perfil</span>
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
            <p className="text-gray-500">{perfil.carrera}</p>
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