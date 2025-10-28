"use client"
import React, { useState } from 'react';
import { Search, Edit2, ChevronDown, Plus } from 'lucide-react';
import { AppSidebar } from '@/app/(admin)/-componentes/app-sidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
export default function Page() {
  const [colaboradores, setColaboradores] = useState([
    {
      id: 1,
      nombre: 'Diego Alonso',
      dni: '',
      correo: 'dialollp@gmail.com',
      telefono: '997472680',
      usuario: 'diego_uwu',
      contraseña: 'admin123',
      cargo: 'Colaborador',
      area: 'Desarrollo React',
      institucion: 'SENATI'
    },
    {
      id: 2,
      nombre: 'Manuel Echeverria',
      dni: '',
      correo: 'manuel@gmail.com',
      telefono: '995368680',
      usuario: 'manuel_m',
      contraseña: 'pass123',
      cargo: 'Asesor de Ventas',
      area: 'Desarrollo Angular',
      institucion: 'SENATI'
    },
    {
      id: 3,
      nombre: 'Oscar Arias',
      dni: '',
      correo: 'oscar@gmail.com',
      telefono: '925368690',
      usuario: 'oscar_a',
      contraseña: 'pass456',
      cargo: 'Jefe de Area',
      area: 'Desarrollo Python',
      institucion: 'SENATI'
    },
    {
      id: 4,
      nombre: 'Andrea Santiesteban',
      dni: '',
      correo: 'andrea@gmail.com',
      telefono: '927658620',
      usuario: 'andrea_s',
      contraseña: 'pass789',
      cargo: 'RRHH',
      area: 'Desarrollo Vue.js',
      institucion: 'SENATI'
    },
    {
      id: 5,
      nombre: 'Marcelo Scerpella',
      dni: '',
      correo: 'marcelo@gmail.com',
      telefono: '927876640',
      usuario: 'marcelo_s',
      contraseña: 'pass321',
      cargo: 'Colaborador',
      area: 'Desarrollo React',
      institucion: 'UPC'
    },
  ]);
  const cargosOptions = [ 'RRHH', 'Asesor de Ventas', 'Jefe de Area', 'Colaborador'];
  const areasOptions = [
    'Desarrollo React',
    'Desarrollo Angular',
    'Desarrollo Vue.js',
    'Desarrollo Python',
    'Desarrollo Java',
    'Desarrollo .NET',
    'Desarrollo Node.js',
    'Desarrollo PHP',
    'Desarrollo Mobile (Android)',
    'Desarrollo Mobile (iOS)',
    'Desarrollo Flutter',
    'Data Science',
    'Machine Learning',
    'DevOps',
    'Cloud Computing',
    'Ciberseguridad',
    'UI/UX Design',
    'QA Testing'
  ];
  const institucionesOptions = [
    'SENATI',
    'TECSUP',
    'UPC - Universidad Peruana de Ciencias Aplicadas',
    'PUCP - Pontificia Universidad Católica del Perú',
    'UNMSM - Universidad Nacional Mayor de San Marcos',
    'UNI - Universidad Nacional de Ingeniería',
    'USIL - Universidad San Ignacio de Loyola',
    'UPN - Universidad Privada del Norte',
    'UTEC - Universidad de Ingeniería y Tecnología',
    'ULIMA - Universidad de Lima',
    'USMP - Universidad de San Martín de Porres',
    'UAP - Universidad Alas Peruanas',
    'UTP - Universidad Tecnológica del Perú',
    'UCSUR - Universidad Científica del Sur',
    'UNSA - Universidad Nacional de San Agustín',
    'UNT - Universidad Nacional de Trujillo',
    'UPAO - Universidad Privada Antenor Orrego',
    'UNFV - Universidad Nacional Federico Villarreal',
    'IDAT - Instituto de Educación Superior Tecnológico Privado',
    'CIBERTEC',
    'CERTUS',
    'ISIL - Instituto San Ignacio de Loyola'
  ];
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [searchAreas, setSearchAreas] = useState(""); 
  const [searchColaboradores, setSearchColaboradores] = useState(""); 
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedColaborador, setSelectedColaborador] = useState<any>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    dni: '',
    correo: '',
    telefono: '',
    usuario: '',
    contraseña: '',
    cargo: '',
    area: '',
    institucion: ''
  });
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [areaSearch, setAreaSearch] = useState('');
  const [institucionSearch, setInstitucionSearch] = useState('');
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);
  const [showInstitucionDropdown, setShowInstitucionDropdown] = useState(false);
  const [showCargoDropdown, setShowCargoDropdown] = useState(false);
  const resetForm = () => {
    setFormData({
      nombre: '',
      dni: '',
      correo: '',
      telefono: '',
      usuario: '',
      contraseña: '',
      cargo: '',
      area: '',
      institucion: ''
    });
    setAreaSearch('');
    setInstitucionSearch('');
    setSelectedAreas([]);
  };
  const handleAdd = () => {
    resetForm();
    setSelectedColaborador(null);
    setModalMode('add');
    setModalOpen(true);
  };
  const handleEdit = (colaborador: any) => {
    setSelectedColaborador(colaborador);
    setFormData({ ...colaborador });
    setAreaSearch(colaborador.area || '');
    setInstitucionSearch(colaborador.institucion || '');
    // inicializar areas seleccionadas si existen
    setSelectedAreas(colaborador.areas ? [...colaborador.areas] : (colaborador.area ? [colaborador.area] : []));
    setModalMode('edit');
    setModalOpen(true);
  };
  const handleSubmit = () => {
    if (modalMode === 'add') {
      const newColaborador = {
        ...formData,
        id: colaboradores.length + 1,
        areas: selectedAreas.length ? selectedAreas : (formData.area ? [formData.area] : []),
        area: selectedAreas.length ? selectedAreas[0] : formData.area,
      };
      setColaboradores([...colaboradores, newColaborador]);
    } else {
      setColaboradores(
        colaboradores.map((col) =>
          col.id === selectedColaborador?.id ? { ...formData, id: col.id, areas: selectedAreas.length ? selectedAreas : (formData.area ? [formData.area] : []), area: selectedAreas.length ? selectedAreas[0] : formData.area } : col
        ));
    }
    setModalOpen(false);
    resetForm();
  };
  const handleCancel = () => {
    setModalOpen(false);
    resetForm();
    setSelectedColaborador(null);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
        ...prev, 
        [name]: value 
    }));
  };
  const handleCargoSelect = (cargo: string) => {
    setFormData((prev) => ({ ...prev, cargo }));
    setShowCargoDropdown(false);
  };
  const handleAreaSearch = (value: string) => {
    setAreaSearch(value);
    setFormData((prev) => ({ ...prev, area: value }));
    setShowAreaDropdown(true);
  };
  const handleAreaSelect = (area: string) => {
    setAreaSearch(area);
    setFormData((prev) => ({ ...prev, area }));
    setShowAreaDropdown(false);
  };
  const handleInstitucionSearch = (value: string) => {
    setInstitucionSearch(value);
    setFormData((prev) => ({ ...prev, institucion: value }));
    setShowInstitucionDropdown(true);
  };
  const handleInstitucionSelect = (institucion: string) => {
    setInstitucionSearch(institucion);
    setFormData((prev) => ({ ...prev, institucion }));
    setShowInstitucionDropdown(false);
  };
  const filteredAreas = areasOptions.filter((area) =>
    area.toLowerCase().includes(searchAreas.toLowerCase())
  );
  const colaboradoresPorArea = selectedArea
    ? colaboradores.filter((col) => col.area === selectedArea)
    : [];
  const filteredColaboradores = colaboradoresPorArea.filter(
    (col) =>
      col.nombre.toLowerCase().includes(searchColaboradores.toLowerCase()) ||
      col.correo.toLowerCase().includes(searchColaboradores.toLowerCase())
  );
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <div className="bg-white w-full h-[80px] flex items-center px-8 shadow-sm mb-8">
          <span className="font-bold" style={{ fontSize: 27 }}>Colaboradores</span>
        </div>
        {/* VISTA A: Lista de Áreas (searchAreas)
            - aquí está EL BOTÓN "Añadir colaborador" */}
        {!selectedArea && (
          <div className="px-8">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b flex items-center justify-between">
                {/* Buscador para áreas */}
                <div className="flex items-center gap-3 flex-1">
                  <Search className="text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Buscar área..."
                    value={searchAreas}
                    onChange={(e) => setSearchAreas(e.target.value)}
                    className="flex-1 outline-none text-gray-700"
                  />
                </div>
                {/* BOTÓN Añadir colaborador -> visible SÓLO en vista de áreas */}
                <button
                  onClick={handleAdd}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Añadir colaborador
                </button>
              </div>
              {/* Tabla que lista las áreas y la cantidad de colaboradores por área */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-700">
                        Área
                      </th>
                      <th className="text-left p-4 font-medium text-gray-700">
                        N° colaboradores
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAreas.map((area) => {
                      const count = colaboradores.filter(
                        (c) => c.area === area
                      ).length;
                      return (
                        <tr
                          key={area}
                          className="border-b hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            setSelectedArea(area);
                            setSearchColaboradores(""); // limpiar buscador de colaboradores al entrar
                          }}
                        >
                          <td className="p-4 text-gray-800 font-medium">
                            {area}
                          </td>
                          <td className="p-4 text-gray-600">{count}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {/* VISTA B: Colaboradores de una Área seleccionada (searchColaboradores)*/}
        {selectedArea && (
          <div className="px-8">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b flex items-center justify-between">
                {/* Volver a áreas */}
                <div className="flex items-center gap-3 flex-1">
                  <button
                    onClick={() => {
                      setSelectedArea(null);
                      setSearchAreas("");
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    ← Volver a áreas
                  </button>
                  <h2 className="font-semibold text-gray-800 ml-4">
                    {selectedArea}
                  </h2>
                </div>
                {/* Buscador para colaboradores (solo en vista de área) */}
                <div className="flex items-center gap-3 flex-1 justify-end">
                  <Search className="text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Buscar colaborador..."
                    value={searchColaboradores}
                    onChange={(e) => setSearchColaboradores(e.target.value)}
                    className="flex-1 outline-none text-gray-700 border border-gray-300 rounded-lg px-3 py-1"
                  />
                </div>
              </div>
              {/* Tabla de colaboradores filtrados por área + búsqueda */}
              <div className="overflow-x-auto">
                <table className="w-full">
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
                      <th className="w-16"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredColaboradores.map((colaborador) => (
                      <tr
                        key={colaborador.id}
                        className="border-b hover:bg-gray-50"
                      >
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
                            <div className="text-sm text-gray-500">{colaborador.cargo}</div>
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
                        <td className="p-4">
                          <button
                            onClick={() => handleEdit(colaborador)}
                            className="text-blue-500 hover:text-blue-700 transition-colors"
                          >
                            <Edit2 size={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {/* Mensaje cuando no hay colaboradores en el área */}
                    {filteredColaboradores.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="p-6 text-center text-gray-500"
                        >
                          No hay colaboradores que coincidan con la búsqueda.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {/* MODAL: Añadir / Editar */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
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
                <div className="flex items-center gap-4">
                  <label className="w-40 text-right text-gray-700">
                    Usuario
                  </label>
                  <input
                    type="text"
                    name="usuario"
                    value={formData.usuario}
                    onChange={handleInputChange}
                    placeholder="Ingrese el usuario"
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
                    {/* Chips con las áreas seleccionadas */}
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
      </SidebarInset>
    </SidebarProvider>
  );
}