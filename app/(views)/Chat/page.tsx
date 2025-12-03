'use client';
import { AppSidebar } from "@/app/(views)/-componentes/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useState, useRef, useEffect, useMemo } from "react";
import { Search, Send, Paperclip, X, Check, CheckCheck, Image as ImageIcon } from "lucide-react";
import { MOCK_COLABORADORES, MOCK_AREAS } from "@/data/mockData";

interface Message {
  id: string;
  sender: 'me' | 'other';
  text: string;
  timestamp: Date;
  status: 'sending' | 'sent' | 'read';
  image?: string; // base64 image
}

export default function Page() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchColaboradores, setSearchColaboradores] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [messageThreads, setMessageThreads] = useState<{ [key: number]: Message[] }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }

    // Verificar si hay un usuario pre-seleccionado desde Mi Equipo
    const selectedUser = localStorage.getItem('selectedChatUser');
    if (selectedUser) {
      const userData = JSON.parse(selectedUser);
      setSelectedUser(userData);
      // Buscar el área para expandirla
      setSelectedArea(userData.area);
      // Limpiar el localStorage
      localStorage.removeItem('selectedChatUser');
    }
  }, []);

  // Auto-scroll al final del chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageThreads, selectedUser]);

  // Obtener usuarios disponibles según el rol del usuario actual
  const availableUsers = useMemo(() => {
    if (!currentUser) return [];

    const currentUserData = MOCK_COLABORADORES.find(c => c.id === parseInt(currentUser.id));
    if (!currentUserData) return [];

    let filtered = MOCK_COLABORADORES.filter(c => c.id !== currentUserData.id); // Excluir usuario actual

    if (currentUserData.rol === 'Admin') {
      // Admin puede hablar con todos
      return filtered;
    } else if (currentUserData.rol === 'SubAdmin') {
      // SubAdmin puede hablar con todos
      return filtered;
    } else if (currentUserData.rol === 'Moderator') {
      // Moderator solo puede hablar con otros Moderators, SubAdmins, RRHH y miembros de su área
      const userArea = MOCK_AREAS.find(a => a.nombre === currentUserData.area);
      const areaMembers = userArea?.collaborators || [];
      
      return filtered.filter(c => 
        c.rol === 'Moderator' || 
        c.rol === 'SubAdmin' || 
        areaMembers.includes(c.id)
      );
    } else if (currentUserData.rol === 'Collaborator') {
      // Collaborator puede hablar con su jefe del área y otros en su área
      const userArea = MOCK_AREAS.find(a => a.nombre === currentUserData.area);
      const areaMembers = userArea?.collaborators || [];
      
      return filtered.filter(c => areaMembers.includes(c.id));
    }

    return filtered;
  }, [currentUser]);

  // Agrupar usuarios por área
  const groupedUsers = useMemo(() => {
    const groups: { [key: string]: any[] } = {};
    
    availableUsers.forEach(user => {
      if (!groups[user.area]) {
        groups[user.area] = [];
      }
      groups[user.area].push(user);
    });

    return Object.entries(groups).map(([area, users]) => ({
      id: area,
      nombre: area,
      personas: users
    }));
  }, [availableUsers]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedUser) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'me',
      text: newMessage.trim(),
      timestamp: new Date(),
      status: 'sent',
      image: imagePreview || undefined
    };

    setMessageThreads(prev => ({
      ...prev,
      [selectedUser.id]: [
        ...(prev[selectedUser.id] || []),
        newMsg
      ]
    }));

    setNewMessage("");
    setImagePreview(null);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredGroups = groupedUsers
    .map(area => ({
      ...area,
      personas: area.personas.filter(p =>
        p.nombre.toLowerCase().includes(searchColaboradores.toLowerCase()) ||
        area.nombre.toLowerCase().includes(searchColaboradores.toLowerCase())
      )
    }))
    .filter(area => area.personas.length > 0);

  const userMessages = selectedUser ? (messageThreads[selectedUser.id] || []) : [];

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
                  {filteredGroups.map((area) => (
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
                              onClick={() => setSelectedUser(p)}
                              className={`flex items-center gap-3 p-2 cursor-pointer font-semibold rounded-lg ${
                                selectedUser?.id === p.id
                                  ? "bg-blue-100 border border-blue-300"
                                  : "hover:bg-gray-50"
                              }`}
                            >
                              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold">
                                {p.nombre.charAt(0)}
                              </div>
                              <div>
                                <div>{p.nombre}</div>
                                <div className="text-xs text-gray-400">{p.cargo}</div>
                              </div>
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
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold">
                      {selectedUser.nombre.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{selectedUser.nombre}</div>
                      <div className="text-xs text-gray-400">{selectedUser.cargo}</div>
                    </div>
                  </div>
                )}

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedUser && (
                    <div className="flex flex-col gap-4">
                      {userMessages.length === 0 ? (
                        <div className="text-center text-gray-400 py-8">
                          <p>No hay mensajes aún. ¡Inicia la conversación!</p>
                        </div>
                      ) : (
                        userMessages.map((msg, index) => {
                          const currentDate = msg.timestamp.toLocaleDateString();
                          const prevDate = index > 0 ? userMessages[index - 1].timestamp.toLocaleDateString() : null;
                          const showDateSeparator = index === 0 || currentDate !== prevDate;
                          const time = msg.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

                          return (
                            <div key={msg.id}>
                              {showDateSeparator && (
                                <div className="flex items-center gap-3 my-4">
                                  <div className="flex-1 border-t border-gray-200"></div>
                                  <span className="text-xs text-gray-400 font-medium px-2">
                                    {currentDate === new Date().toLocaleDateString() ? 'Hoy' :
                                     currentDate === new Date(Date.now() - 86400000).toLocaleDateString() ? 'Ayer' :
                                     currentDate}
                                  </span>
                                  <div className="flex-1 border-t border-gray-200"></div>
                                </div>
                              )}

                              <div className={`flex gap-3 ${msg.sender === 'me' ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className={`flex-1 flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                  <div className={`max-w-xs ${msg.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-lg p-3`}>
                                    {/* Imagen si existe */}
                                    {msg.image && (
                                      <img 
                                        src={msg.image} 
                                        alt="mensaje" 
                                        className="max-w-full h-auto rounded mb-2 cursor-pointer hover:opacity-90 transition-opacity"
                                        onClick={() => {
                                          // Abrir imagen en fullscreen
                                          const modal = document.createElement('div');
                                          modal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50';
                                          modal.innerHTML = `
                                            <div class="relative max-w-4xl max-h-screen">
                                              <img src="${msg.image}" alt="fullscreen" class="max-w-full max-h-screen"/>
                                              <button class="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl font-bold" onclick="this.parentElement.parentElement.remove()">×</button>
                                            </div>
                                          `;
                                          document.body.appendChild(modal);
                                        }}
                                      />
                                    )}
                                    <p className="break-words">{msg.text}</p>
                                    <div className={`flex items-center gap-1 mt-1 text-xs ${msg.sender === 'me' ? 'text-blue-100' : 'text-gray-500'}`}>
                                      <span>{time}</span>
                                      {msg.sender === 'me' && (
                                        <>
                                          {msg.status === 'sending' && <span>•••</span>}
                                          {msg.status === 'sent' && <Check size={14} />}
                                          {msg.status === 'read' && <CheckCheck size={14} className="text-yellow-300" />}
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                      <div ref={chatEndRef} />
                    </div>
                  )}
                </div>

                <div className="p-2 space-y-2">
                  {/* Preview de imagen */}
                  {imagePreview && (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                      <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                      <button
                        onClick={() => setImagePreview(null)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}

                  <div className="relative w-full flex items-center">
                    <input
                      type="text"
                      placeholder="Escriba un mensaje..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      disabled={!selectedUser}
                      className="w-full p-2 pr-20 border rounded-lg outline-none bg-gray-50 text-gray-600 disabled:opacity-50"
                    />
                    <input
                      type="file"
                      ref={imageInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageSelect}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                      <ImageIcon
                        size={20}
                        className="text-gray-500 cursor-pointer hover:text-gray-700"
                        onClick={() => imageInputRef.current?.click()}
                      />
                      <Send
                        size={20}
                        className={`cursor-pointer ${newMessage.trim() || imagePreview ? 'text-blue-500 hover:text-blue-600' : 'text-gray-300'}`}
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
                    <h3 className="font-bold text-lg mb-2">{selectedUser.nombre}</h3>
                    <p className="text-gray-600 mb-4">{selectedUser.cargo}</p>
                    <p><strong>Rol:</strong> {selectedUser.rol}</p>
                    <p><strong>Área:</strong> {selectedUser.area}</p>
                    <p><strong>Institución:</strong> {selectedUser.institucion}</p>
                    <p><strong>Correo:</strong> {selectedUser.correo}</p>
                    <p><strong>Teléfono:</strong> {selectedUser.telefono}</p>
                    <p><strong>DNI:</strong> {selectedUser.dni}</p>
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
