'use client';
import { AppSidebar } from "@/app/(admin)/-componentes/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useState, useRef } from "react";
import { Search, Send, Paperclip } from "lucide-react";

export default function Page() {
  const [areas, setAreas] = useState([
    {
      id: 1,
      nombre: "Recursos Humanos",
      personas: [
        {
          id: 1,
          name: "Andrea Santiesteban",
          role: "RRHH",
          institucion: "SENATI",
          sede: "Independencia",
          correo: "andrea@gmail.com",
          numero: "927658620",
          horas: "5h 20m",
          entrada: "7:45 am",
          messages: [
            { sender: "other", text: "Hola, ¿ya revisaste los contratos?" },
            { sender: "me", text: "Sí, pero falta la firma de dos colaboradores." },
          ],
        },
      ],
    },
    {
      id: 2,
      nombre: "Ventas",
      personas: [
        {
          id: 2,
          name: "Manuel Echeverria",
          role: "Asesor de Ventas",
          institucion: "SENATI",
          sede: "Independencia",
          correo: "manuel@gmail.com",
          numero: "995368680",
          horas: "4h 05m",
          entrada: "8:00 am",
          messages: [
            { sender: "other", text: "Buenos días, ¿cómo va el avance?" },
            { sender: "me", text: "Todo bien, pero necesito los informes de ventas." },
          ],
        },
      ],
    },
    {
      id: 3,
      nombre: "Desarrollo",
      personas: [
        {
          id: 3,
          name: "Marcelo Scerpella",
          role: "Colaborador",
          institucion: "UPC",
          sede: "Monterrico",
          correo: "marcelo@gmail.com",
          numero: "927876640",
          horas: "3h 50m",
          entrada: "8:30 am",
          messages: [
            { sender: "other", text: "Hola Marcelo, ¿cómo va el desarrollo React?" },
            { sender: "me", text: "Voy avanzando con el módulo de usuarios." },
          ],
        },
        {
          id: 4,
          name: "Oscar Arias",
          role: "Jefe de Área",
          institucion: "SENATI",
          sede: "Independencia",
          correo: "oscar@gmail.com",
          numero: "925368690",
          horas: "2h 45m",
          entrada: "9:00 am",
          messages: [
            { sender: "me", text: "Oscar, ¿confirmas la reunión de hoy?" },
            { sender: "other", text: "Sí, a las 3:00 pm en la sala de proyectos." },
          ],
        },
      ],
    },
  ]);

  type Persona = {
    id: number;
    name: string;
    role: string;
    institucion: string;
    sede: string;
    correo: string;
    numero: string;
    horas: string;
    entrada: string;
    messages: { sender: string; text: string }[];
  };

  const [selectedArea, setSelectedArea] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<Persona | null>(null);
  const [searchColaboradores, setSearchColaboradores] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedUser || selectedArea === null) return;

    const updatedAreas = areas.map((area) =>
      area.id === selectedArea
        ? {
            ...area,
            personas: area.personas.map((p) =>
              p.id === selectedUser.id
                ? { ...p, messages: [...p.messages, { sender: "me", text: newMessage.trim() }] }
                : p
            ),
          }
        : area
    );

    setAreas(updatedAreas);
    const updatedUser = updatedAreas
      .find((a) => a.id === selectedArea)
      ?.personas.find((p) => p.id === selectedUser.id);
    setSelectedUser(updatedUser || null);
    setNewMessage("");
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) alert(`Archivo seleccionado: ${file.name}`);
  };

  const filteredAreas = areas
    .filter((area) =>
      area.nombre.toLowerCase().includes(searchColaboradores.toLowerCase()) ||
      area.personas.some((p) =>
        p.name.toLowerCase().includes(searchColaboradores.toLowerCase())
      )
    )
    .map((area) => ({
      ...area,
      personas: area.personas.filter((p) =>
        p.name.toLowerCase().includes(searchColaboradores.toLowerCase()) ||
        area.nombre.toLowerCase().includes(searchColaboradores.toLowerCase())
      ),
    }));

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="bg-white w-full h-[80px] flex items-center px-8 shadow-sm mb-8">
          <span className="font-bold" style={{ fontSize: 27 }}>
            Chat
          </span>
        </div>

        <div className="px-8">
          <div className="border border-gray-300 rounded-lg p-4 bg-white h-[calc(100vh-120px)]">
            <div className="grid grid-cols-[20%_60%_20%] h-full">
              {/* Lista de áreas / personas */}
              <div className="h-full w-full border-r border-gray-300 pr-4">
                <div className="flex items-center gap-3 mb-4">
                  <Search className="text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Buscar colaborador o área..."
                    value={searchColaboradores}
                    onChange={(e) => setSearchColaboradores(e.target.value)}
                    className="flex-1 outline-none text-gray-700 border border-gray-300 rounded-lg px-3 py-1"
                  />
                </div>

                <ul className="w-full flex-1 overflow-y-auto space-y-2">
                  {filteredAreas.map((area) => (
                    <li key={area.id}>
                      <div
                        onClick={() =>
                          setSelectedArea(area.id === selectedArea ? null : area.id)
                        }
                        className={`cursor-pointer p-3 font-bold rounded-lg ${
                          selectedArea === area.id
                            ? "bg-gray-300 border border-gray-400"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {area.nombre}
                      </div>

                      {selectedArea === area.id && (
                        <ul className="pl-4 mt-2 space-y-2">
                          {area.personas.map((p) => (
                            <li
                              key={p.id}
                              onClick={() => {
                                setSelectedUser(p);
                                setNewMessage("");
                              }}
                              className={`flex items-center gap-3 p-2 cursor-pointer font-semibold rounded-lg ${
                                selectedUser?.id === p.id
                                  ? "bg-blue-100 border border-blue-300"
                                  : "hover:bg-gray-50"
                              }`}
                            >
                              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                  <circle cx="12" cy="7" r="4" />
                                </svg>
                              </div>
                              <div>{p.name}</div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Chat */}
              <div className="flex flex-col border-r border-gray-300 px-4">
                {selectedUser && (
                  <div className="flex items-center gap-3 py-3 border-b border-gray-200">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{selectedUser.name}</div>
                    </div>
                  </div>
                )}

                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {selectedUser && (
                    <div className="flex flex-col gap-3">
                      {selectedUser.messages.map((msg, index) => (
                        <div
                          key={index}
                          className={`max-w-[70%] p-2 rounded-lg ${
                            msg.sender === "me" ? "bg-blue-100 ml-auto" : "bg-gray-100"
                          }`}
                        >
                          {msg.text}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-2">
                  <div className="relative w-full flex items-center">
                    <input
                      type="text"
                      placeholder="Escriba un mensaje..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="w-full p-2 pr-20 border rounded-lg outline-none bg-gray-50 text-gray-600"
                    />
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                      <Paperclip
                        size={20}
                        className="text-gray-500 cursor-pointer hover:text-gray-700"
                        onClick={handleFileClick}
                      />
                      <Send
                        size={20}
                        className="text-blue-500 cursor-pointer hover:text-blue-600"
                        onClick={handleSendMessage}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Detalles */}
              <div className="px-4">
                {selectedUser && (
                  <>
                    <h3 className="font-bold text-lg mb-2">{selectedUser.name}</h3>
                    <p className="text-gray-600 mb-4">{selectedUser.role}</p>
                    <p><strong>Institución:</strong> {selectedUser.institucion}</p>
                    <p><strong>Sede:</strong> {selectedUser.sede}</p>
                    <p><strong>Correo:</strong> {selectedUser.correo}</p>
                    <p><strong>Número:</strong> {selectedUser.numero}</p>
                    <p><strong>Horas trabajadas:</strong> {selectedUser.horas}</p>
                    <p><strong>Hora de entrada:</strong> {selectedUser.entrada}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
