"use client"
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Edit2, ChevronDown, Plus, Trash2 } from 'lucide-react';
import { AppSidebar } from '@/app/(views)/-componentes/app-sidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { MOCK_COLABORADORES, MOCK_CARGOS, MOCK_ROLES, MOCK_AREAS, MOCK_INSTITUCIONES, Colaborador, UserRole } from '@/data/mockData';

export default function Page() {
  const searchParams = useSearchParams();
  const [colaboradores, setColaboradores] = useState<Colaborador[]>(MOCK_COLABORADORES);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('currentUser');
      if (user) setCurrentUser(JSON.parse(user));
    }
  }, []);

  // Leer el parámetro 'area' de la URL y preseleccionar el filtro
  const [filtroArea, setFiltroArea] = useState<string>('todos');
  
  useEffect(() => {
    const areaParam = searchParams.get('area');
    if (areaParam) {
      setFiltroArea(decodeURIComponent(areaParam));
    }
  }, [searchParams]);

  // Determinar qué roles puede crear el usuario actual
  const getAvailableRoles = (): UserRole[] => {
    switch (currentUser?.role) {
      case 'Admin':
        return ['SubAdmin', 'Moderator', 'Collaborator'];
      case 'SubAdmin':
        return ['Moderator', 'Collaborator'];
      case 'Moderator':
        return ['Collaborator'];
      case 'Collaborator':
        return [];
      default:
        return ['Collaborator'];
    }
  };

  const availableRoles = getAvailableRoles();

  const cargosOptions = MOCK_CARGOS;
  const rolesOptions = availableRoles;
  const areasOptions = MOCK_AREAS.map(area => area.nombre);
  const institucionesOptions = MOCK_INSTITUCIONES;
  
  const [searchColaboradores, setSearchColaboradores] = useState(""); 
  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedColaborador, setSelectedColaborador] = useState<any>(null);
  const [formData, setFormData] = useState<Omit<Colaborador, 'id'>>({
    nombre: '',
    dni: '',
    correo: '',
    telefono: '',
    cargo: '',
    rol: 'Collaborator',
    area: '',
    institucion: ''
  });
  
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [areaSearch, setAreaSearch] = useState('');
  const [institucionSearch, setInstitucionSearch] = useState('');
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);
  const [showInstitucionDropdown, setShowInstitucionDropdown] = useState(false);
  const [showCargoDropdown, setShowCargoDropdown] = useState(false);
  const [showRolDropdown, setShowRolDropdown] = useState(false);

  // [NUEVO] Estados para el modal de eliminación
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [colaboradorToDelete, setColaboradorToDelete] = useState<any>(null);
  
  const resetForm = () => {
    setFormData({
      nombre: '',
      dni: '',
      correo: '',
      telefono: '',
      cargo: '',
      rol: 'Collaborator',
      area: '',
      institucion: ''
    });
    setAreaSearch('');
    setInstitucionSearch('');
    setSelectedAreas([]);
  };

  const handleAdd = () => {
    // ... (función sin cambios)
    resetForm();
    setSelectedColaborador(null);
    setModalMode('add');
    setModalOpen(true);
  };

  const handleEdit = (colaborador: Colaborador) => {
    setSelectedColaborador(colaborador);
    setFormData({ ...colaborador });
    setAreaSearch(colaborador.area || '');
    setInstitucionSearch(colaborador.institucion || '');
    setSelectedAreas(colaborador.area ? [colaborador.area] : []);
    setModalMode('edit');
    setModalOpen(true);
  };

  const handleSubmit = () => {
    if (modalMode === 'add') {
      const newColaborador: Colaborador = {
        ...formData,
        id: colaboradores.length + 1,
        rol: formData.rol as UserRole,
      };
      setColaboradores([...colaboradores, newColaborador]);
    } else if (selectedColaborador) {
      setColaboradores(
        colaboradores.map((col) =>
          col.id === selectedColaborador.id ? { ...formData, id: col.id, rol: formData.rol as UserRole } : col
        ));
    }
    setModalOpen(false);
    resetForm();
  };

  const handleCancel = () => {
    // ... (función sin cambios)
    setModalOpen(false);
    resetForm();
    setSelectedColaborador(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ... (función sin cambios)
    const { name, value } = e.target;
    setFormData((prev) => ({ 
        ...prev, 
        [name]: value 
    }));
  };

  const handleCargoSelect = (cargo: string) => {
    // ... (función sin cambios)
    setFormData((prev) => ({ ...prev, cargo }));
    setShowCargoDropdown(false);
  };

  const handleAreaSearch = (value: string) => {
    // ... (función sin cambios)
    setAreaSearch(value);
    setFormData((prev) => ({ ...prev, area: value }));
    setShowAreaDropdown(true);
  };

  const handleAreaSelect = (area: string) => {
    // ... (función sin cambios)
    setAreaSearch(area);
    setFormData((prev) => ({ ...prev, area }));
    setShowAreaDropdown(false);
  };

  const handleInstitucionSearch = (value: string) => {
    // ... (función sin cambios)
    setInstitucionSearch(value);
    setFormData((prev) => ({ ...prev, institucion: value }));
    setShowInstitucionDropdown(true);
  };

  const handleInstitucionSelect = (institucion: string) => {
    // ... (función sin cambios)
    setInstitucionSearch(institucion);
    setFormData((prev) => ({ ...prev, institucion }));
    setShowInstitucionDropdown(false);
  };

  // [NUEVO] Abrir modal de confirmación de borrado
  const handleDeleteClick = (colaborador: Colaborador) => {
    setColaboradorToDelete(colaborador);
    setDeleteModalOpen(true);
  };

  // [NUEVO] Cancelar borrado
  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setColaboradorToDelete(null);
  };

  // [NUEVO] Confirmar y ejecutar borrado
  const handleConfirmDelete = () => {
    if (colaboradorToDelete) {
      setColaboradores(
        colaboradores.filter((col) => col.id !== colaboradorToDelete.id)
      );
    }
    handleCancelDelete(); // Cierra el modal y resetea el estado
  };

  const filteredAreas = areasOptions.filter((areaName) =>
    areaName.toLowerCase().includes(areaSearch.toLowerCase())
  );

  const filteredColaboradores = colaboradores.filter(
    // ... (lógica de filtro sin cambios)
    (col) => {
      const matchArea = filtroArea === 'todos' || col.area === filtroArea;
      const searchTerm = searchColaboradores.toLowerCase();
      const matchSearch =
        col.nombre.toLowerCase().includes(searchTerm) ||
        col.correo.toLowerCase().includes(searchTerm);
      return matchArea && matchSearch;
    }
  );


  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header (sin cambios) */}
        <div className="bg-white w-full h-[80px] flex items-center px-8 shadow-sm mb-8">
          <span className="font-bold" style={{ fontSize: 27 }}>Colaboradores</span>
        </div>

        <div className="px-8">
          <div className="bg-white rounded-lg shadow-sm">
            
            {/* Barra de controles unificada (sin cambios) */}
            <div className="p-6 border-b flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3 flex-1 min-w-[300px]">
                <Search className="text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar colaborador por nombre o correo..."
                  value={searchColaboradores}
                  onChange={(e) => setSearchColaboradores(e.target.value)}
                  className="flex-1 outline-none text-gray-700 border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div className="flex items-center gap-2">
                 <label htmlFor="areaFilter" className="text-gray-700 font-medium">
                   Filtrar por Área:
                 </label>
                 <select
                   id="areaFilter"
                   value={filtroArea}
                   onChange={(e) => setFiltroArea(e.target.value)}
                   className="border border-gray-300 rounded-lg px-3 py-2 outline-none text-gray-700 bg-white"
                 >
                   <option value="todos">Todas las áreas</option>
                   {areasOptions.map((area) => (
                     <option key={area} value={area}>{area}</option>
                   ))}
                 </select>
              </div>
              <button
                onClick={handleAdd}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Añadir colaborador
              </button>
            </div>

            {/* Tabla de colaboradores filtrados */}
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* ... (thead sin cambios) ... */}
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-700">
                      Nombre
                    </th>
                    <th className="text-left p-4 font-medium text-gray-700">
                      Correo electrónico
                    </th>
                    <th className="text-left p-4 font-medium text-gray-700">
                      Teléfono
                    </th>
                    <th className="text-left p-4 font-medium text-gray-700">
                      Institucion
                    </th>
                    <th className="text-left p-4 font-medium text-gray-700">
                      Área
                    </th>
                    <th className="w-16"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredColaboradores.map((colaborador) => (
                    <tr
                      key={colaborador.id}
                      className="border-b hover:bg-gray-50"
                    >
                      {/* ... (td de nombre, correo, telefono, institucion, area sin cambios) ... */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                              <circle cx="12" cy="7" r="4" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{colaborador.nombre}</div>
                            <div className="text-sm text-gray-500">{colaborador.rol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-gray-700">
                        {colaborador.correo}
                      </td>
                      <td className="p-4 text-gray-700">
                        {colaborador.telefono}
                      </td>
                      <td className="p-4 text-gray-700">
                        {colaborador.institucion}
                      </td>
                      <td className="p-4 text-gray-700">
                        {colaborador.area}
                      </td>
                      
                      {/* [CAMBIO] Celda de acciones con ambos botones */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleEdit(colaborador)}
                            className="text-blue-500 hover:text-blue-700 transition-colors"
                            title="Editar"
                          >
                            <Edit2 size={20} />
                          </button>
                          
                          {/* [NUEVO] Botón de eliminar */}
                          <button
                            onClick={() => handleDeleteClick(colaborador)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  {/* Mensaje cuando no hay colaboradores (sin cambios) */}
                  {filteredColaboradores.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="p-6 text-center text-gray-500"
                      >
                        No hay colaboradores que coincidan con la búsqueda o filtro.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* MODAL: Añadir / Editar (Sin cambios) */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            {/* ... (todo el contenido del modal de añadir/editar) ... */}
            <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8">
              <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                {modalMode === "add"
                  ? "Añadir colaborador"
                  : "Editar colaborador"}
              </h2>
              {/* Formulario */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="w-40 text-right text-gray-700">Nombre Completo</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Ingrese el nombre"
                    className="flex-1 border px-4 py-2 rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-40 text-right text-gray-700">DNI</label>
                  <input
                    type="text"
                    name="dni"
                    value={formData.dni}
                    onChange={handleInputChange}
                    placeholder="Ingrese DNI"
                    className="flex-1 border px-4 py-2 rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-40 text-right text-gray-700">
                    Correo
                  </label>
                  <input
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleInputChange}
                    placeholder="Ingrese el correo"
                    className="flex-1 border px-4 py-2 rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-40 text-right text-gray-700">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    placeholder="Ingrese el número de telefono"
                    className="flex-1 border px-4 py-2 rounded-lg"
                  />
                </div>
                {/* Cargo con dropdown */}
                <div className="flex items-center gap-4">
                  <label className="w-40 text-right text-gray-700">Cargo</label>
                  <div className="flex-1 relative">
                    <button
                      type="button"
                      onClick={() => setShowCargoDropdown(!showCargoDropdown)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-between text-left"
                    >
                      <span
                        className={
                          formData.cargo ? "text-gray-900" : "text-gray-400"
                        }
                      >
                        {formData.cargo || "Seleccione el cargo"}
                      </span>
                      <ChevronDown size={20} className="text-gray-400" />
                    </button>
                    {showCargoDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {cargosOptions.map((cargo) => (
                          <button
                            key={cargo}
                            type="button"
                            onClick={() => handleCargoSelect(cargo)}
                            className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
                          >
                            {cargo}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {/* Rol con dropdown */}
                <div className="flex items-center gap-4">
                  <label className="w-40 text-right text-gray-700">Rol</label>
                  <div className="flex-1 relative">
                    <button
                      type="button"
                      onClick={() => setShowRolDropdown(!showRolDropdown)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-between text-left"
                      disabled={availableRoles.length === 0}
                    >
                      <span
                        className={
                          formData.rol ? "text-gray-900" : "text-gray-400"
                        }
                      >
                        {formData.rol || "Seleccione el rol"}
                      </span>
                      <ChevronDown size={20} className="text-gray-400" />
                    </button>
                    {availableRoles.length === 0 && (
                      <div className="text-xs text-gray-500 mt-1">
                        No tienes permisos para crear colaboradores con otros roles.
                      </div>
                    )}
                    {showRolDropdown && availableRoles.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {availableRoles.map((role) => (
                          <button
                            key={role}
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, rol: role }));
                              setShowRolDropdown(false);
                            }}
                            className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
                          >
                            {role}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {/* Área con búsqueda + dropdown */}
                <div className="flex items-center gap-4">
                  <label className="w-40 text-right text-gray-700">Área de trabajo</label>
                  <div className="flex-1 relative">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={areaSearch}
                        onChange={(e) => handleAreaSearch(e.target.value)}
                        onFocus={() => setShowAreaDropdown(true)}
                        placeholder="Buscar o seleccionar área"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const areaToAdd = areaSearch || formData.area;
                          if (areaToAdd && !selectedAreas.includes(areaToAdd)) {
                            setSelectedAreas(prev => [...prev, areaToAdd]);
                          }
                        }}
                        className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
                        title="Agregar área"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    {showAreaDropdown && filteredAreas.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {filteredAreas.map((a) => (
                          <button
                            key={a}
                            type="button"
                            onClick={() => handleAreaSelect(a)}
                            className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
                          >
                            {a}
                          </button>
                        ))}
                      </div>
                    )}
                    {selectedAreas.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selectedAreas.map(a => (
                          <div key={a} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm">
                            <span>{a}</span>
                            <button
                              type="button"
                              onClick={() => setSelectedAreas(prev => prev.filter(x => x !== a))}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {/* Institución con búsqueda + dropdown */}
                <div className="flex items-center gap-4">
                  <label className="w-40 text-right text-gray-700">Institución</label>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={institucionSearch}
                      onChange={(e) => handleInstitucionSearch(e.target.value)}
                      onFocus={() => setShowInstitucionDropdown(true)}
                      placeholder="Buscar o seleccionar institución"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    {showInstitucionDropdown &&
                      institucionesOptions.filter((inst) =>
                        inst
                          .toLowerCase()
                          .includes(institucionSearch.toLowerCase())
                      ).length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {institucionesOptions
                            .filter((inst) =>
                              inst
                                .toLowerCase()
                                .includes(institucionSearch.toLowerCase())
                            )
                            .map((inst) => (
                              <button
                                key={inst}
                                type="button"
                                onClick={() => handleInstitucionSelect(inst)}
                                className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
                              >
                                {inst}
                              </button>
                            ))}
                        </div>
                      )}
                  </div>
                </div>
              </div>
              {/* BOTONES GUARDAR / CANCELAR */}
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={handleSubmit}
                  className="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                >
                  {modalMode === "add" ? "Añadir" : "Editar"}
                </button>
                <button
                  onClick={handleCancel}
                  className="px-8 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* [NUEVO] MODAL: Confirmación de Eliminación */}
        {deleteModalOpen && colaboradorToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
              <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                Confirmar Eliminación
              </h2>
              <p className="text-center text-gray-600 mb-8">
                ¿Estás seguro de que deseas eliminar al colaborador{" "}
                <strong>{colaboradorToDelete.nombre}</strong>?
                <br />
                Esta acción no se puede deshacer.
              </p>
              
              {/* BOTONES CONFIRMAR / CANCELAR */}
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