// data/mockData.ts

// 1. Definimos los roles posibles
export type UserRole = 'Admin' | 'SubAdmin' | 'Moderator' | 'Collaborator';

// 2. Definimos la interfaz del Usuario (credenciales de login)
export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
}

// 3. Interfaces para Proyectos y Áreas
export interface Proyecto {
  id: number;
  nombre: string;
  estado: 'Completado' | 'En progreso' | 'Pendiente';
  avance: number;
  manager: string;
  area: string;
}

export interface ProyectoDetallado {
  id: number;
  nombre: string;
  descripcion: string;
  recurso: string;
  grupoAsignado: string;
  estado: string;
  fechaEntrega: string;
}

export interface Colaborador {
  id: number;
  nombre: string;
  dni: string;
  correo: string;
  telefono: string;
  cargo: string;
  rol: UserRole;
  area: string;
  institucion: string;
  avatar?: string;
  carrera?: string;
  direccion?: string;
  schedule?: Schedule;
  estado?: 'activo' | 'descanso' | 'fuera'; // No aplica para Admin
}

export interface KPI {
  totalPersonal: number;
  activos: number;
  proyectosRetrasados: number;
}

export interface Area {
  id: number;
  nombre: string;
  teamLeaderId: number | null;
  collaborators: number[];
  days: Record<string, boolean>;
  times: Record<string, TimeSlot>;
}

export interface TimeSlot {
  start: string;
  end: string;
  v: boolean;
  p: boolean;
}

export interface Schedule {
  [key: string]: {
    start?: string;
    end?: string;
    type: string;
  };
}

export interface ProyectoEstadisticas {
  id: number;
  nombre: string;
  area: string;
  dia: {
    avance: number;
    estado: 'A tiempo' | 'Retrasado' | 'Adelantado';
    tareasTotales: number;
    tareasCompletas: number;
  };
  semana: {
    avance: number;
    estado: 'A tiempo' | 'Retrasado' | 'Adelantado';
    tareasTotales: number;
    tareasCompletas: number;
  };
  mes: {
    avance: number;
    estado: 'A tiempo' | 'Retrasado' | 'Adelantado';
    tareasTotales: number;
    tareasCompletas: number;
  };
}

// 4. Mock Data: Usuarios (solo credenciales de login)
// 1 Admin + 2 SubAdmins (Ventas, RRHH) + 3 Moderators (1 por área) + 6 Collaborators (2 por área) = 12 usuarios
export const MOCK_USERS: User[] = [
  // 1. Admin
  {
    id: '1',
    email: 'admin@test.com',
    password: '123',
    role: 'Admin'
  },
  // 2-3. SubAdmins
  {
    id: '2',
    email: 'subadmin.ventas@test.com',
    password: '123',
    role: 'SubAdmin'
  },
  {
    id: '3',
    email: 'subadmin.rrhh@test.com',
    password: '123',
    role: 'SubAdmin'
  },
  // 4-6. Moderators (1 por área: Análisis, Desarrollo React, Desarrollo Laravel)
  {
    id: '4',
    email: 'mod.analisis@test.com',
    password: '123',
    role: 'Moderator'
  },
  {
    id: '5',
    email: 'mod.react@test.com',
    password: '123',
    role: 'Moderator'
  },
  {
    id: '6',
    email: 'mod.laravel@test.com',
    password: '123',
    role: 'Moderator'
  },
  // 7-8. Collaborators - Análisis
  {
    id: '7',
    email: 'coll.analisis1@test.com',
    password: '123',
    role: 'Collaborator'
  },
  {
    id: '8',
    email: 'coll.analisis2@test.com',
    password: '123',
    role: 'Collaborator'
  },
  // 9-10. Collaborators - Desarrollo React
  {
    id: '9',
    email: 'coll.react1@test.com',
    password: '123',
    role: 'Collaborator'
  },
  {
    id: '10',
    email: 'coll.react2@test.com',
    password: '123',
    role: 'Collaborator'
  },
  // 11-12. Collaborators - Desarrollo Laravel
  {
    id: '11',
    email: 'coll.laravel1@test.com',
    password: '123',
    role: 'Collaborator'
  },
  {
    id: '12',
    email: 'coll.laravel2@test.com',
    password: '123',
    role: 'Collaborator'
  },
];

// 5. Mock Data: Proyectos (5 proyectos, uno por área)
export const MOCK_PROYECTOS: Proyecto[] = [
  { id: 1, nombre: 'Plataforma Ventas Online', estado: 'En progreso', avance: 70, manager: 'Carlos Ventas', area: 'Ventas' },
  { id: 2, nombre: 'Sistema Gestión RR.HH', estado: 'En progreso', avance: 85, manager: 'Marta RRHH', area: 'RRHH' },
  { id: 3, nombre: 'Dashboard Analytics', estado: 'En progreso', avance: 65, manager: 'Juan Análisis', area: 'Análisis' },
  { id: 4, nombre: 'App React Admin', estado: 'En progreso', avance: 80, manager: 'Diego React', area: 'Desarrollo React' },
  { id: 5, nombre: 'API Laravel REST', estado: 'Completado', avance: 100, manager: 'Pedro Laravel', area: 'Desarrollo Laravel' }
];

// 6. Mock Data: KPI
export const MOCK_KPI: KPI = {
  totalPersonal: 80,
  activos: 28,
  proyectosRetrasados: 2
};

// 7. Mock Data: Proyectos Detallados (para la página de Proyectos)
export const MOCK_PROYECTOS_DETALLADOS: ProyectoDetallado[] = [
  {
    id: 1,
    nombre: "Proyecto A",
    descripcion: "Diseño de campaña publicitaria",
    recurso: "Canva",
    grupoAsignado: "Área 1",
    estado: "Activo",
    fechaEntrega: "2025-12-15",
  },
  {
    id: 2,
    nombre: "Proyecto B",
    descripcion: "Optimización de servidor",
    recurso: "AWS",
    grupoAsignado: "Área 2",
    estado: "Pendiente",
    fechaEntrega: "2026-01-20",
  },
  {
    id: 3,
    nombre: "Proyecto C",
    descripcion: "Desarrollo de aplicación móvil",
    recurso: "Flutter",
    grupoAsignado: "Área 3",
    estado: "En Progreso",
    fechaEntrega: "2025-11-30",
  },
  {
    id: 4,
    nombre: "Proyecto D",
    descripcion: "Migración de base de datos",
    recurso: "PostgreSQL",
    grupoAsignado: "Área 1",
    estado: "Completado",
    fechaEntrega: "2025-10-10",
  },
  {
    id: 5,
    nombre: "Proyecto E",
    descripcion: "Implementación de CI/CD",
    recurso: "GitHub Actions",
    grupoAsignado: "Área 2",
    estado: "Activo",
    fechaEntrega: "2025-12-01",
  },
];

// 8. Mock Data: Grupos de Proyectos
export const MOCK_GRUPOS = ["Área 1", "Área 2", "Área 3"];

// 9. Mock Data: Cargos disponibles
export const MOCK_CARGOS = ['RRHH', 'Asesor de Ventas', 'Jefe de Area', 'Colaborador'];

// 10. Mock Data: Roles disponibles
export const MOCK_ROLES: UserRole[] = ['Admin', 'SubAdmin', 'Moderator', 'Collaborator'];

// 11. Mock Data: Áreas disponibles (5 áreas: Ventas, RRHH, Análisis, Desarrollo React, Desarrollo Laravel)
// Cada área tiene: 1 Jefe (Moderator o SubAdmin) + colaboradores
// El jefe está incluido en el array de collaborators
export const MOCK_AREAS: Area[] = [
  {
    id: 1,
    nombre: 'Ventas',
    teamLeaderId: 2, // SubAdmin Ventas (Carlos)
    collaborators: [2], // SubAdmin también es miembro del área
    days: { L: true, M: true, Mi: true, J: true, V: true, S: false, D: false },
    times: {
      lunes: { start: '08:00', end: '17:00', v: true, p: false },
      martes: { start: '08:00', end: '17:00', v: true, p: false },
      miercoles: { start: '08:00', end: '17:00', v: true, p: false },
      jueves: { start: '08:00', end: '17:00', v: false, p: true },
      viernes: { start: '09:00', end: '12:30', v: false, p: true },
      sabado: { start: '08:00', end: '17:00', v: false, p: false },
      domingo: { start: '08:00', end: '17:00', v: false, p: false },
    },
  },
  {
    id: 2,
    nombre: 'RRHH',
    teamLeaderId: 3, // SubAdmin RRHH (Marta)
    collaborators: [3], // SubAdmin también es miembro del área
    days: { L: true, M: true, Mi: true, J: true, V: true, S: false, D: false },
    times: {
      lunes: { start: '09:00', end: '18:00', v: false, p: true },
      martes: { start: '09:00', end: '18:00', v: false, p: true },
      miercoles: { start: '09:00', end: '18:00', v: true, p: false },
      jueves: { start: '09:00', end: '18:00', v: true, p: false },
      viernes: { start: '09:00', end: '17:00', v: false, p: true },
      sabado: { start: '08:00', end: '17:00', v: false, p: false },
      domingo: { start: '08:00', end: '17:00', v: false, p: false },
    },
  },
  {
    id: 3,
    nombre: 'Análisis',
    teamLeaderId: 4, // Moderator ID 4 (Juan Análisis)
    collaborators: [4, 7, 8], // Jefe + 2 Collaborators
    days: { L: true, M: true, Mi: true, J: true, V: true, S: false, D: false },
    times: {
      lunes: { start: '08:30', end: '17:30', v: true, p: false },
      martes: { start: '08:30', end: '17:30', v: true, p: false },
      miercoles: { start: '08:30', end: '17:30', v: true, p: false },
      jueves: { start: '08:30', end: '17:30', v: false, p: true },
      viernes: { start: '08:00', end: '16:00', v: true, p: false },
      sabado: { start: '08:00', end: '17:00', v: false, p: false },
      domingo: { start: '08:00', end: '17:00', v: false, p: false },
    },
  },
  {
    id: 4,
    nombre: 'Desarrollo React',
    teamLeaderId: 5, // Moderator ID 5 (Diego React)
    collaborators: [5, 9, 10], // Jefe + 2 Collaborators
    days: { L: true, M: true, Mi: true, J: true, V: true, S: false, D: false },
    times: {
      lunes: { start: '08:00', end: '17:00', v: true, p: false },
      martes: { start: '08:00', end: '17:00', v: true, p: false },
      miercoles: { start: '08:00', end: '17:00', v: true, p: false },
      jueves: { start: '08:00', end: '17:00', v: false, p: true },
      viernes: { start: '09:00', end: '12:30', v: false, p: true },
      sabado: { start: '08:00', end: '17:00', v: false, p: false },
      domingo: { start: '08:00', end: '17:00', v: false, p: false },
    },
  },
  {
    id: 5,
    nombre: 'Desarrollo Laravel',
    teamLeaderId: 6, // Moderator ID 6 (Pedro Laravel)
    collaborators: [6, 11, 12], // Jefe + 2 Collaborators
    days: { L: true, M: true, Mi: true, J: true, V: true, S: true, D: false },
    times: {
      lunes: { start: '07:00', end: '16:00', v: true, p: false },
      martes: { start: '07:00', end: '16:00', v: true, p: false },
      miercoles: { start: '07:00', end: '16:00', v: true, p: false },
      jueves: { start: '07:00', end: '16:00', v: true, p: false },
      viernes: { start: '07:00', end: '16:00', v: false, p: true },
      sabado: { start: '08:00', end: '12:00', v: true, p: false },
      domingo: { start: '08:00', end: '17:00', v: false, p: false },
    },
  },
];

// 12. Mock Data: Instituciones disponibles
export const MOCK_INSTITUCIONES = [
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

// 13. Mock Data: Estadísticas de Proyectos por Rango de Fechas (5 proyectos, uno por área)
export const MOCK_PROYECTOS_ESTADISTICAS: ProyectoEstadisticas[] = [
  {
    id: 1,
    nombre: 'Plataforma Ventas Online',
    area: 'Ventas',
    dia: { avance: 65, estado: 'A tiempo', tareasTotales: 8, tareasCompletas: 5 },
    semana: { avance: 70, estado: 'A tiempo', tareasTotales: 30, tareasCompletas: 21 },
    mes: { avance: 70, estado: 'A tiempo', tareasTotales: 50, tareasCompletas: 35 }
  },
  {
    id: 2,
    nombre: 'Sistema Gestión RR.HH',
    area: 'RRHH',
    dia: { avance: 80, estado: 'Adelantado', tareasTotales: 6, tareasCompletas: 5 },
    semana: { avance: 85, estado: 'Adelantado', tareasTotales: 24, tareasCompletas: 20 },
    mes: { avance: 85, estado: 'Adelantado', tareasTotales: 48, tareasCompletas: 41 }
  },
  {
    id: 3,
    nombre: 'Dashboard Analytics',
    area: 'Análisis',
    dia: { avance: 60, estado: 'Retrasado', tareasTotales: 7, tareasCompletas: 4 },
    semana: { avance: 65, estado: 'Retrasado', tareasTotales: 28, tareasCompletas: 18 },
    mes: { avance: 65, estado: 'Retrasado', tareasTotales: 52, tareasCompletas: 34 }
  },
  {
    id: 4,
    nombre: 'App React Admin',
    area: 'Desarrollo React',
    dia: { avance: 75, estado: 'A tiempo', tareasTotales: 5, tareasCompletas: 4 },
    semana: { avance: 82, estado: 'A tiempo', tareasTotales: 22, tareasCompletas: 18 },
    mes: { avance: 80, estado: 'A tiempo', tareasTotales: 45, tareasCompletas: 36 }
  },
  {
    id: 5,
    nombre: 'API Laravel REST',
    area: 'Desarrollo Laravel',
    dia: { avance: 95, estado: 'Adelantado', tareasTotales: 4, tareasCompletas: 4 },
    semana: { avance: 98, estado: 'Adelantado', tareasTotales: 18, tareasCompletas: 18 },
    mes: { avance: 100, estado: 'Adelantado', tareasTotales: 40, tareasCompletas: 40 }
  }
];

// 14. Mock Data: Colaboradores (datos de trabajador)
// Estructura: 1 Admin + 2 SubAdmins + 3 Moderators + 6 Collaborators = 12 usuarios
// Admin NO tiene campo estado. Todos los demás tienen: activo, descanso, fuera
export const MOCK_COLABORADORES: Colaborador[] = [
  // 1. Admin (SIN estado)
  {
    id: 1,
    nombre: 'Roberto Admin',
    dni: '12345678',
    correo: 'admin@test.com',
    telefono: '987654321',
    cargo: 'Administrador',
    rol: 'Admin',
    area: 'Administración',
    institucion: 'N/A',
    avatar: 'https://i.pravatar.cc/150?u=admin',
    carrera: 'Ingeniería de Sistemas',
    direccion: 'Av. Paseo de la República 3500, Lima, Perú',
    schedule: {
      L: { start: '08:00', end: '17:00', type: 'Virtual' },
      M: { start: '08:00', end: '17:00', type: 'Virtual' },
      Mi: { start: '08:00', end: '17:00', type: 'Virtual' },
      J: { start: '08:00', end: '17:00', type: 'Virtual' },
      V: { start: '09:00', end: '12:30', type: 'Presencial' },
      S: { type: 'Descanso' },
      D: { type: 'Descanso' }
    }
  },
  // 2. SubAdmin Ventas (CON estado)
  {
    id: 2,
    nombre: 'Carlos Ventas',
    dni: '23456789',
    correo: 'subadmin.ventas@test.com',
    telefono: '987654322',
    cargo: 'Gerente Ventas',
    rol: 'SubAdmin',
    area: 'Ventas',
    institucion: 'UPC',
    avatar: 'https://i.pravatar.cc/150?u=carlos',
    carrera: 'Administración de Empresas',
    direccion: 'Calle Las Flores 245, San Isidro, Lima, Perú',
    estado: 'descanso',
    schedule: {
      L: { start: '08:00', end: '17:00', type: 'Presencial' },
      M: { start: '08:00', end: '17:00', type: 'Presencial' },
      Mi: { start: '08:00', end: '17:00', type: 'Virtual' },
      J: { start: '08:00', end: '17:00', type: 'Presencial' },
      V: { start: '09:00', end: '12:30', type: 'Presencial' },
      S: { type: 'Descanso' },
      D: { type: 'Descanso' }
    }
  },
  // 3. SubAdmin RRHH (CON estado)
  {
    id: 3,
    nombre: 'Marta RRHH',
    dni: '34567890',
    correo: 'subadmin.rrhh@test.com',
    telefono: '987654323',
    cargo: 'Gerente RRHH',
    rol: 'SubAdmin',
    area: 'RRHH',
    institucion: 'PUCP',
    avatar: 'https://i.pravatar.cc/150?u=marta',
    carrera: 'Gestión del Talento Humano',
    direccion: 'Av. del Parque 1200, Miraflores, Lima, Perú',
    estado: 'fuera',
    schedule: {
      L: { start: '09:00', end: '18:00', type: 'Presencial' },
      M: { start: '09:00', end: '18:00', type: 'Presencial' },
      Mi: { start: '09:00', end: '18:00', type: 'Virtual' },
      J: { start: '09:00', end: '18:00', type: 'Virtual' },
      V: { start: '09:00', end: '17:00', type: 'Presencial' },
      S: { type: 'Descanso' },
      D: { type: 'Descanso' }
    }
  },
  // 4. Moderator Análisis (CON estado)
  {
    id: 4,
    nombre: 'Juan Análisis',
    dni: '45678901',
    correo: 'mod.analisis@test.com',
    telefono: '987654324',
    cargo: 'Jefe Grupo Análisis',
    rol: 'Moderator',
    area: 'Análisis',
    institucion: 'TECSUP',
    avatar: 'https://i.pravatar.cc/150?u=juan',
    carrera: 'Ingeniería de Sistemas',
    direccion: 'Jr. Amazonas 567, Pueblo Libre, Lima, Perú',
    estado: 'fuera',
    schedule: {
      L: { start: '08:30', end: '17:30', type: 'Virtual' },
      M: { start: '08:30', end: '17:30', type: 'Virtual' },
      Mi: { start: '08:30', end: '17:30', type: 'Virtual' },
      J: { start: '08:30', end: '17:30', type: 'Presencial' },
      V: { start: '08:00', end: '16:00', type: 'Virtual' },
      S: { type: 'Descanso' },
      D: { type: 'Descanso' }
    }
  },
  // 5. Moderator Desarrollo React (CON estado)
  {
    id: 5,
    nombre: 'Diego React',
    dni: '56789012',
    correo: 'mod.react@test.com',
    telefono: '987654325',
    cargo: 'Jefe Grupo React',
    rol: 'Moderator',
    area: 'Desarrollo React',
    institucion: 'SENATI',
    avatar: 'https://i.pravatar.cc/150?u=diego',
    carrera: 'Ingeniería Informática',
    direccion: 'Av. Los Andes 890, Lima, Perú',
    estado: 'fuera',
    schedule: {
      L: { start: '08:00', end: '17:00', type: 'Virtual' },
      M: { start: '08:00', end: '17:00', type: 'Virtual' },
      Mi: { start: '08:00', end: '17:00', type: 'Virtual' },
      J: { start: '08:00', end: '17:00', type: 'Presencial' },
      V: { start: '09:00', end: '12:30', type: 'Presencial' },
      S: { type: 'Descanso' },
      D: { type: 'Descanso' }
    }
  },
  // 6. Moderator Desarrollo Laravel (CON estado)
  {
    id: 6,
    nombre: 'Pedro Laravel',
    dni: '67890123',
    correo: 'mod.laravel@test.com',
    telefono: '987654326',
    cargo: 'Jefe Grupo Laravel',
    rol: 'Moderator',
    area: 'Desarrollo Laravel',
    institucion: 'UPC',
    avatar: 'https://i.pravatar.cc/150?u=pedro',
    carrera: 'Ingeniería de Software',
    direccion: 'Calle Principal 456, Breña, Lima, Perú',
    estado: 'activo',
    schedule: {
      L: { start: '07:00', end: '16:00', type: 'Virtual' },
      M: { start: '07:00', end: '16:00', type: 'Virtual' },
      Mi: { start: '07:00', end: '16:00', type: 'Virtual' },
      J: { start: '07:00', end: '16:00', type: 'Virtual' },
      V: { start: '07:00', end: '16:00', type: 'Presencial' },
      S: { start: '08:00', end: '12:00', type: 'Virtual' },
      D: { type: 'Descanso' }
    }
  },
  // 7. Collaborator Análisis (CON estado)
  {
    id: 7,
    nombre: 'Ana Analista',
    dni: '78901234',
    correo: 'coll.analisis1@test.com',
    telefono: '987654327',
    cargo: 'Analista',
    rol: 'Collaborator',
    area: 'Análisis',
    institucion: 'TECSUP',
    avatar: 'https://i.pravatar.cc/150?u=ana',
    carrera: 'Análisis de Sistemas',
    direccion: 'Av. Principal 123, Cercado, Lima, Perú',
    estado: 'activo',
    schedule: {
      L: { start: '08:30', end: '17:30', type: 'Virtual' },
      M: { start: '08:30', end: '17:30', type: 'Virtual' },
      Mi: { start: '08:30', end: '17:30', type: 'Virtual' },
      J: { start: '08:30', end: '17:30', type: 'Presencial' },
      V: { start: '08:00', end: '16:00', type: 'Virtual' },
      S: { type: 'Descanso' },
      D: { type: 'Descanso' }
    }
  },
  // 8. Collaborator Análisis (CON estado)
  {
    id: 8,
    nombre: 'Luis Analista',
    dni: '89012345',
    correo: 'coll.analisis2@test.com',
    telefono: '987654328',
    cargo: 'Analista Datos',
    rol: 'Collaborator',
    area: 'Análisis',
    institucion: 'PUCP',
    avatar: 'https://i.pravatar.cc/150?u=luis',
    carrera: 'Ciencia de Datos',
    direccion: 'Jr. Libertad 789, Surco, Lima, Perú',
    estado: 'fuera',
    schedule: {
      L: { start: '08:30', end: '17:30', type: 'Virtual' },
      M: { start: '08:30', end: '17:30', type: 'Virtual' },
      Mi: { start: '08:30', end: '17:30', type: 'Presencial' },
      J: { start: '08:30', end: '17:30', type: 'Presencial' },
      V: { start: '08:00', end: '16:00', type: 'Virtual' },
      S: { type: 'Descanso' },
      D: { type: 'Descanso' }
    }
  },
  // 9. Collaborator Desarrollo React (CON estado)
  {
    id: 9,
    nombre: 'Sofia React',
    dni: '90123456',
    correo: 'coll.react1@test.com',
    telefono: '987654329',
    cargo: 'Desarrolladora Frontend',
    rol: 'Collaborator',
    area: 'Desarrollo React',
    institucion: 'SENATI',
    avatar: 'https://i.pravatar.cc/150?u=sofia',
    carrera: 'Programación de Sistemas',
    direccion: 'Av. Arequipa 1000, Miraflores, Lima, Perú',
    estado: 'descanso',
    schedule: {
      L: { start: '08:00', end: '17:00', type: 'Virtual' },
      M: { start: '08:00', end: '17:00', type: 'Virtual' },
      Mi: { start: '08:00', end: '17:00', type: 'Virtual' },
      J: { start: '08:00', end: '17:00', type: 'Presencial' },
      V: { start: '09:00', end: '12:30', type: 'Presencial' },
      S: { type: 'Descanso' },
      D: { type: 'Descanso' }
    }
  },
  // 10. Collaborator Desarrollo React (CON estado)
  {
    id: 10,
    nombre: 'Miguel React',
    dni: '01234567',
    correo: 'coll.react2@test.com',
    telefono: '987654330',
    cargo: 'Desarrollador React',
    rol: 'Collaborator',
    area: 'Desarrollo React',
    institucion: 'UPC',
    avatar: 'https://i.pravatar.cc/150?u=miguel',
    carrera: 'Ingeniería de Sistemas',
    direccion: 'Calle Bolognesi 555, San Isidro, Lima, Perú',
    estado: 'descanso',
    schedule: {
      L: { start: '08:00', end: '17:00', type: 'Virtual' },
      M: { start: '08:00', end: '17:00', type: 'Virtual' },
      Mi: { start: '08:00', end: '17:00', type: 'Presencial' },
      J: { start: '08:00', end: '17:00', type: 'Virtual' },
      V: { start: '09:00', end: '12:30', type: 'Presencial' },
      S: { type: 'Descanso' },
      D: { type: 'Descanso' }
    }
  },
  // 11. Collaborator Desarrollo Laravel (CON estado)
  {
    id: 11,
    nombre: 'Elena Laravel',
    dni: '12345670',
    correo: 'coll.laravel1@test.com',
    telefono: '987654331',
    cargo: 'Desarrolladora Backend',
    rol: 'Collaborator',
    area: 'Desarrollo Laravel',
    institucion: 'TECSUP',
    avatar: 'https://i.pravatar.cc/150?u=elena',
    carrera: 'Desarrollo Web',
    direccion: 'Av. Javier Prado 2000, La Molina, Lima, Perú',
    estado: 'descanso',
    schedule: {
      L: { start: '07:00', end: '16:00', type: 'Virtual' },
      M: { start: '07:00', end: '16:00', type: 'Virtual' },
      Mi: { start: '07:00', end: '16:00', type: 'Virtual' },
      J: { start: '07:00', end: '16:00', type: 'Virtual' },
      V: { start: '07:00', end: '16:00', type: 'Presencial' },
      S: { start: '08:00', end: '12:00', type: 'Virtual' },
      D: { type: 'Descanso' }
    }
  },
  // 12. Collaborator Desarrollo Laravel (CON estado)
  {
    id: 12,
    nombre: 'Rafael Laravel',
    dni: '23456701',
    correo: 'coll.laravel2@test.com',
    telefono: '987654332',
    cargo: 'Desarrollador Laravel',
    rol: 'Collaborator',
    area: 'Desarrollo Laravel',
    institucion: 'PUCP',
    avatar: 'https://i.pravatar.cc/150?u=rafael',
    carrera: 'Ingeniería Informática',
    direccion: 'Jr. Machu Picchu 3000, Rimac, Lima, Perú',
    estado: 'fuera',
    schedule: {
      L: { start: '07:00', end: '16:00', type: 'Virtual' },
      M: { start: '07:00', end: '16:00', type: 'Presencial' },
      Mi: { start: '07:00', end: '16:00', type: 'Virtual' },
      J: { start: '07:00', end: '16:00', type: 'Virtual' },
      V: { start: '07:00', end: '16:00', type: 'Presencial' },
      S: { start: '08:00', end: '12:00', type: 'Virtual' },
      D: { type: 'Descanso' }
    }
  }
];

// Task System Interfaces
export interface Subtarea {
  id: string;
  titulo: string;
  completada: boolean;
}

export interface Submission {
  colaboradorId: number;
  text: string;
  image?: string;
  timestamp: Date;
}

export interface Review {
  moderatorId: number;
  status: 'aceptada' | 'denegada';
  reason?: string;
  timestamp: Date;
}

export interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  imagenUrl?: string;
  subtareas: Subtarea[];
  estado: 'no_asignada' | 'asignada' | 'en_proceso' | 'por_revisar' | 'completada';
  colaboradores: number[];
  areaId: number;
  submission?: Submission;
  review?: Review;
  createdBy: number;
  createdAt: Date;
}

// Mock Tasks Data
export const MOCK_TASKS: Tarea[] = [
  // ==================== VENTAS (Proyecto: Plataforma Ventas Online) ====================
  {
    id: 'task-1',
    titulo: 'Diseñar interfaz de tienda online',
    descripcion: 'Crear wireframes y diseños de la plataforma de ventas',
    imagenUrl: undefined,
    subtareas: [
      { id: 'sub-1-1', titulo: 'Wireframes de páginas principales', completada: true },
      { id: 'sub-1-2', titulo: 'Diseño de carrito de compras', completada: true },
      { id: 'sub-1-3', titulo: 'Diseño de checkout', completada: false }
    ],
    estado: 'en_proceso',
    colaboradores: [],
    areaId: 1,
    createdBy: 2,
    createdAt: new Date('2024-11-01')
  },
  {
    id: 'task-2',
    titulo: 'Integración de pasarela de pagos',
    descripcion: 'Integrar Stripe o PayPal en la plataforma',
    imagenUrl: undefined,
    subtareas: [
      { id: 'sub-2-1', titulo: 'Elegir proveedor de pagos', completada: true },
      { id: 'sub-2-2', titulo: 'Configurar credenciales', completada: true },
      { id: 'sub-2-3', titulo: 'Pruebas de transacciones', completada: false }
    ],
    estado: 'asignada',
    colaboradores: [],
    areaId: 1,
    createdBy: 2,
    createdAt: new Date('2024-11-05')
  },
  {
    id: 'task-3',
    titulo: 'Implementar sistema de inventario',
    descripcion: 'Sistema de control y gestión de stock',
    imagenUrl: undefined,
    subtareas: [
      { id: 'sub-3-1', titulo: 'Diseñar base de datos', completada: true },
      { id: 'sub-3-2', titulo: 'Crear endpoints de API', completada: false },
      { id: 'sub-3-3', titulo: 'Pruebas unitarias', completada: false }
    ],
    estado: 'no_asignada',
    colaboradores: [],
    areaId: 1,
    createdBy: 2,
    createdAt: new Date('2024-11-08')
  },
  {
    id: 'task-4',
    titulo: 'Campaña de lanzamiento',
    descripcion: 'Planificar y ejecutar campaña de marketing para el lanzamiento',
    imagenUrl: undefined,
    subtareas: [
      { id: 'sub-4-1', titulo: 'Crear materiales publicitarios', completada: true },
      { id: 'sub-4-2', titulo: 'Publicar en redes sociales', completada: true },
      { id: 'sub-4-3', titulo: 'Medir resultados', completada: true }
    ],
    estado: 'completada',
    colaboradores: [],
    areaId: 1,
    createdBy: 2,
    createdAt: new Date('2024-10-20'),
    review: {
      moderatorId: 2,
      status: 'aceptada',
      timestamp: new Date('2024-11-10')
    }
  },

  // ==================== RRHH (Proyecto: Sistema Gestión RR.HH) ====================
  {
    id: 'task-5',
    titulo: 'Diseño del módulo de nómina',
    descripcion: 'Crear interface para gestión de nómina y salarios',
    imagenUrl: undefined,
    subtareas: [
      { id: 'sub-5-1', titulo: 'Análisis de requerimientos', completada: true },
      { id: 'sub-5-2', titulo: 'Diseño de base de datos', completada: true },
      { id: 'sub-5-3', titulo: 'Prototipo UI', completada: false }
    ],
    estado: 'en_proceso',
    colaboradores: [],
    areaId: 2,
    createdBy: 3,
    createdAt: new Date('2024-11-03')
  },
  {
    id: 'task-6',
    titulo: 'Módulo de solicitud de vacaciones',
    descripcion: 'Implementar sistema de solicitud y aprobación de vacaciones',
    imagenUrl: undefined,
    subtareas: [
      { id: 'sub-6-1', titulo: 'Diseño de flujo', completada: true },
      { id: 'sub-6-2', titulo: 'Desarrollo de backend', completada: true },
      { id: 'sub-6-3', titulo: 'Testing', completada: false }
    ],
    estado: 'por_revisar',
    colaboradores: [],
    areaId: 2,
    createdBy: 3,
    createdAt: new Date('2024-11-06'),
    submission: {
      colaboradorId: 3,
      text: 'Completé el módulo de solicitud de vacaciones. El sistema valida fechas y notifica a supervisores automáticamente.',
      image: undefined,
      timestamp: new Date('2024-11-12')
    }
  },
  {
    id: 'task-7',
    titulo: 'Capacitación de usuarios finales',
    descripcion: 'Capacitar a los usuarios en el uso del nuevo sistema',
    imagenUrl: undefined,
    subtareas: [
      { id: 'sub-7-1', titulo: 'Preparar material educativo', completada: true },
      { id: 'sub-7-2', titulo: 'Realizar sesiones de capacitación', completada: false },
      { id: 'sub-7-3', titulo: 'Documentación de usuario', completada: false }
    ],
    estado: 'asignada',
    colaboradores: [],
    areaId: 2,
    createdBy: 3,
    createdAt: new Date('2024-11-09')
  },
  {
    id: 'task-8',
    titulo: 'Validación de cumplimiento normativo',
    descripcion: 'Asegurar que el sistema cumple con normas laborales',
    imagenUrl: undefined,
    subtareas: [
      { id: 'sub-8-1', titulo: 'Revisar normativas vigentes', completada: true },
      { id: 'sub-8-2', titulo: 'Auditoría interna', completada: true },
      { id: 'sub-8-3', titulo: 'Certificación', completada: true }
    ],
    estado: 'completada',
    colaboradores: [],
    areaId: 2,
    createdBy: 3,
    createdAt: new Date('2024-10-15'),
    review: {
      moderatorId: 3,
      status: 'aceptada',
      timestamp: new Date('2024-11-05')
    }
  },

  // ==================== ANÁLISIS (Proyecto: Dashboard Analytics) ====================
  {
    id: 'task-9',
    titulo: 'Análisis de datos de ventas Q1',
    descripcion: 'Generar reporte con tendencias de ventas del primer trimestre',
    imagenUrl: undefined,
    subtareas: [
      { id: 'sub-9-1', titulo: 'Extraer datos de BD', completada: true },
      { id: 'sub-9-2', titulo: 'Limpiar y validar', completada: true },
      { id: 'sub-9-3', titulo: 'Crear visualizaciones', completada: false }
    ],
    estado: 'en_proceso',
    colaboradores: [7, 8],
    areaId: 3,
    createdBy: 4,
    createdAt: new Date('2024-11-01')
  },
  {
    id: 'task-10',
    titulo: 'Análisis competitivo de mercado',
    descripcion: 'Investigar y documentar estrategias de la competencia',
    imagenUrl: undefined,
    subtareas: [
      { id: 'sub-10-1', titulo: 'Investigar competidores', completada: true },
      { id: 'sub-10-2', titulo: 'Documentar hallazgos', completada: true },
      { id: 'sub-10-3', titulo: 'Presentar conclusiones', completada: false }
    ],
    estado: 'por_revisar',
    colaboradores: [7],
    areaId: 3,
    createdBy: 4,
    createdAt: new Date('2024-11-04'),
    submission: {
      colaboradorId: 7,
      text: 'Completé la investigación de 8 competidores principales. Identifiqué oportunidades en pricing y diferenciación.',
      image: undefined,
      timestamp: new Date('2024-11-11')
    }
  },
  {
    id: 'task-11',
    titulo: 'Verificación de calidad de datos',
    descripcion: 'Revisar integridad y consistencia de la base de datos',
    imagenUrl: undefined,
    subtareas: [
      { id: 'sub-11-1', titulo: 'Validar registros duplicados', completada: true },
      { id: 'sub-11-2', titulo: 'Revisar campos vacíos', completada: true },
      { id: 'sub-11-3', titulo: 'Generar reporte de calidad', completada: true }
    ],
    estado: 'completada',
    colaboradores: [8],
    areaId: 3,
    createdBy: 4,
    createdAt: new Date('2024-10-25'),
    review: {
      moderatorId: 4,
      status: 'aceptada',
      timestamp: new Date('2024-11-08')
    }
  },
  {
    id: 'task-12',
    titulo: 'Dashboard de métricas clave',
    descripcion: 'Crear dashboard con KPIs principales del negocio',
    imagenUrl: undefined,
    subtareas: [
      { id: 'sub-12-1', titulo: 'Definir KPIs', completada: true },
      { id: 'sub-12-2', titulo: 'Conectar a data sources', completada: false },
      { id: 'sub-12-3', titulo: 'Diseñar visualizaciones', completada: false }
    ],
    estado: 'asignada',
    colaboradores: [7, 8],
    areaId: 3,
    createdBy: 4,
    createdAt: new Date('2024-11-07')
  },

  // ==================== DESARROLLO REACT (Proyecto: App React Admin) ====================
  {
    id: 'task-13',
    titulo: 'Configurar proyecto React con TypeScript',
    descripcion: 'Setup inicial del proyecto con Vite y TypeScript',
    imagenUrl: undefined,
    subtareas: [
      { id: 'sub-13-1', titulo: 'Crear proyecto Vite', completada: true },
      { id: 'sub-13-2', titulo: 'Configurar TypeScript', completada: true },
      { id: 'sub-13-3', titulo: 'Setup de linting', completada: true }
    ],
    estado: 'completada',
    colaboradores: [5, 9, 10],
    areaId: 4,
    createdBy: 5,
    createdAt: new Date('2024-10-10'),
    review: {
      moderatorId: 5,
      status: 'aceptada',
      timestamp: new Date('2024-10-20')
    }
  },
  {
    id: 'task-14',
    titulo: 'Componentes base del admin panel',
    descripcion: 'Desarrollar componentes reutilizables principales',
    imagenUrl: undefined,
    subtareas: [
      { id: 'sub-14-1', titulo: 'Sidebar navigation', completada: true },
      { id: 'sub-14-2', titulo: 'Header con user menu', completada: true },
      { id: 'sub-14-3', titulo: 'Modal y Forms', completada: false }
    ],
    estado: 'en_proceso',
    colaboradores: [9, 10],
    areaId: 4,
    createdBy: 5,
    createdAt: new Date('2024-11-02')
  },
  {
    id: 'task-15',
    titulo: 'Integración con API REST',
    descripcion: 'Conectar frontend con backend usando Axios',
    imagenUrl: undefined,
    subtareas: [
      { id: 'sub-15-1', titulo: 'Configurar cliente HTTP', completada: true },
      { id: 'sub-15-2', titulo: 'Crear servicios de API', completada: false },
      { id: 'sub-15-3', titulo: 'Error handling', completada: false }
    ],
    estado: 'por_revisar',
    colaboradores: [9],
    areaId: 4,
    createdBy: 5,
    createdAt: new Date('2024-11-05'),
    submission: {
      colaboradorId: 9,
      text: 'Completé la configuración de Axios y creé los primeros servicios de autenticación. Falta validar con el backend real.',
      image: undefined,
      timestamp: new Date('2024-11-10')
    }
  },
  {
    id: 'task-16',
    titulo: 'Testing con Vitest y React Testing Library',
    descripcion: 'Implementar suite de tests para componentes',
    imagenUrl: undefined,
    subtareas: [
      { id: 'sub-16-1', titulo: 'Setup de Vitest', completada: true },
      { id: 'sub-16-2', titulo: 'Tests de componentes', completada: false },
      { id: 'sub-16-3', titulo: 'Cobertura > 80%', completada: false }
    ],
    estado: 'asignada',
    colaboradores: [10],
    areaId: 4,
    createdBy: 5,
    createdAt: new Date('2024-11-08')
  },

  // ==================== DESARROLLO LARAVEL (Proyecto: API Laravel REST) ====================
  {
    id: 'task-17',
    titulo: 'Estructura inicial del proyecto Laravel',
    descripcion: 'Setup de proyecto con estructura MVC',
    imagenUrl: undefined,
    subtareas: [
      { id: 'sub-17-1', titulo: 'Crear proyecto Laravel', completada: true },
      { id: 'sub-17-2', titulo: 'Configurar BD', completada: true },
      { id: 'sub-17-3', titulo: 'Setup de migraciones', completada: true }
    ],
    estado: 'completada',
    colaboradores: [6, 11, 12],
    areaId: 5,
    createdBy: 6,
    createdAt: new Date('2024-10-01'),
    review: {
      moderatorId: 6,
      status: 'aceptada',
      timestamp: new Date('2024-10-15')
    }
  },
  {
    id: 'task-18',
    titulo: 'Autenticación y autorización',
    descripcion: 'Implementar autenticación JWT y roles',
    imagenUrl: undefined,
    subtareas: [
      { id: 'sub-18-1', titulo: 'Middleware de autenticación', completada: true },
      { id: 'sub-18-2', titulo: 'Tokens JWT', completada: true },
      { id: 'sub-18-3', titulo: 'Control de roles', completada: true }
    ],
    estado: 'completada',
    colaboradores: [11, 12],
    areaId: 5,
    createdBy: 6,
    createdAt: new Date('2024-10-08'),
    review: {
      moderatorId: 6,
      status: 'aceptada',
      timestamp: new Date('2024-10-22')
    }
  },
  {
    id: 'task-19',
    titulo: 'Endpoints CRUD principales',
    descripcion: 'Desarrollar endpoints para usuarios, productos, pedidos',
    imagenUrl: undefined,
    subtareas: [
      { id: 'sub-19-1', titulo: 'Endpoints de usuarios', completada: true },
      { id: 'sub-19-2', titulo: 'Endpoints de productos', completada: true },
      { id: 'sub-19-3', titulo: 'Endpoints de pedidos', completada: true }
    ],
    estado: 'completada',
    colaboradores: [6, 11, 12],
    areaId: 5,
    createdBy: 6,
    createdAt: new Date('2024-10-15'),
    review: {
      moderatorId: 6,
      status: 'aceptada',
      timestamp: new Date('2024-10-29')
    }
  },
  {
    id: 'task-20',
    titulo: 'Documentación con Swagger/OpenAPI',
    descripcion: 'Documentar todos los endpoints de la API',
    imagenUrl: undefined,
    subtareas: [
      { id: 'sub-20-1', titulo: 'Instalar y configurar Swagger', completada: true },
      { id: 'sub-20-2', titulo: 'Documentar todos los endpoints', completada: true },
      { id: 'sub-20-3', titulo: 'Testing en Swagger UI', completada: true }
    ],
    estado: 'completada',
    colaboradores: [12],
    areaId: 5,
    createdBy: 6,
    createdAt: new Date('2024-10-20'),
    review: {
      moderatorId: 6,
      status: 'aceptada',
      timestamp: new Date('2024-11-05')
    }
  },
  {
    id: 'task-21',
    titulo: 'Pruebas unitarias y de integración',
    descripcion: 'Cobertura de tests para toda la API',
    imagenUrl: undefined,
    subtareas: [
      { id: 'sub-21-1', titulo: 'Tests unitarios', completada: true },
      { id: 'sub-21-2', titulo: 'Tests de integración', completada: true },
      { id: 'sub-21-3', titulo: 'Cobertura > 85%', completada: true }
    ],
    estado: 'completada',
    colaboradores: [6, 11, 12],
    areaId: 5,
    createdBy: 6,
    createdAt: new Date('2024-10-25'),
    review: {
      moderatorId: 6,
      status: 'aceptada',
      timestamp: new Date('2024-11-08')
    }
  }
];
