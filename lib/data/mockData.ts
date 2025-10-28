// Tipos base
export type DayKey = 'L' | 'M' | 'Mi' | 'J' | 'V' | 'S' | 'D';

export interface BaseUser {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
  usuario: string;
  cargo: string;
  area: string;
  areas: string[];
  institucion: string;
  sede: string;
  avatar: string;
  dni: string;
}

// Usuarios base consistentes
export const baseUsers: BaseUser[] = [
  {
    id: 1,
    nombre: 'Diego Alonso',
    correo: 'dialollp@gmail.com',
    telefono: '997472680',
    usuario: 'diego_a',
    cargo: 'Desarrollador Senior',
    area: 'Desarrollo React',
    areas: ['Desarrollo React', 'Desarrollo Mobile'],
    institucion: 'SENATI',
    sede: 'Independencia',
    avatar: '/avatars/diego.jpg',
    dni: '45678912'
  },
  {
    id: 2,
    nombre: 'Manuel Echeverria',
    correo: 'manuel@gmail.com',
    telefono: '995368680',
    usuario: 'manuel_e',
    cargo: 'Desarrollador FullStack',
    area: 'Desarrollo Angular',
    areas: ['Desarrollo Angular', 'Desarrollo Node.js'],
    institucion: 'SENATI',
    sede: 'Independencia',
    avatar: '/avatars/manuel.jpg',
    dni: '45678913'
  },
  {
    id: 3,
    nombre: 'Oscar Arias',
    correo: 'oscar@gmail.com',
    telefono: '925368690',
    usuario: 'oscar_a',
    cargo: 'Tech Lead',
    area: 'Desarrollo Python',
    areas: ['Desarrollo Python', 'DevOps'],
    institucion: 'SENATI',
    sede: 'Independencia',
    avatar: '/avatars/oscar.jpg',
    dni: '45678914'
  },
  {
    id: 4,
    nombre: 'Andrea Santiesteban',
    correo: 'andrea@gmail.com',
    telefono: '927658620',
    usuario: 'andrea_s',
    cargo: 'RRHH',
    area: 'Recursos Humanos',
    areas: ['Recursos Humanos'],
    institucion: 'SENATI',
    sede: 'Independencia',
    avatar: '/avatars/andrea.jpg',
    dni: '45678915'
  },
  {
    id: 5,
    nombre: 'Marcelo Scerpella',
    correo: 'marcelo@gmail.com',
    telefono: '927876640',
    usuario: 'marcelo_s',
    cargo: 'Desarrollador Frontend',
    area: 'Desarrollo React',
    areas: ['Desarrollo React'],
    institucion: 'UPC',
    sede: 'San Miguel',
    avatar: '/avatars/marcelo.jpg',
    dni: '45678916'
  }
];

// Áreas disponibles
export const baseAreas = [
  'Desarrollo React',
  'Desarrollo Angular',
  'Desarrollo Vue.js',
  'Desarrollo Python',
  'Desarrollo Mobile',
  'Desarrollo Node.js',
  'DevOps',
  'Recursos Humanos'
];

// Cargos disponibles
export const baseCargos = [
  'Desarrollador Junior',
  'Desarrollador Senior',
  'Desarrollador FullStack',
  'Tech Lead',
  'RRHH',
  'Desarrollador Frontend',
  'Desarrollador Backend'
];

// Instituciones disponibles
export const baseInstituciones = [
  'SENATI',
  'UPC',
  'TECSUP',
  'PUCP',
  'UNMSM',
  'UNI'
];

// Sedes disponibles
export const baseSedes = [
  'Independencia',
  'San Miguel',
  'Lima Centro',
  'Los Olivos',
  'San Juan de Lurigancho'
];

// Horarios base
export const baseSchedule = {
  L: { start: '08:00', end: '17:00', type: 'Virtual' },
  M: { start: '08:00', end: '17:00', type: 'Virtual' },
  Mi: { start: '08:00', end: '17:00', type: 'Virtual' },
  J: { start: '08:00', end: '17:00', type: 'Virtual' },
  V: { start: '09:00', end: '12:30', type: 'Presencial' },
  S: { type: 'Descanso' },
  D: { type: 'Descanso' }
};

// Datos para el chat
export const baseChatMessages = [
  { sender: 'other', text: '¿Cómo va el avance del proyecto?' },
  { sender: 'me', text: 'Vamos según el cronograma, terminaré el módulo hoy.' },
  { sender: 'other', text: '¡Excelente! ¿Necesitas algún recurso adicional?' },
  { sender: 'me', text: 'Por ahora todo bien, gracias.' }
];

// Datos para informes
export const baseInformeAreas = [
  {
    nombre: 'Desarrollo React',
    horas: { trabajadas: 24.5, descansos: 1.5, extras: 2.0 },
    tareas: [
      { id: 1, nombre: 'Implementar autenticación', estado: 'Completada' },
      { id: 2, nombre: 'Diseño responsive', estado: 'En progreso' },
      { id: 3, nombre: 'Optimización de rendimiento', estado: 'Pendiente' }
    ],
    dentro: 4,
    fuera: 1
  },
  {
    nombre: 'Desarrollo Python',
    horas: { trabajadas: 22.0, descansos: 1.0, extras: 1.5 },
    tareas: [
      { id: 1, nombre: 'API REST', estado: 'Completada' },
      { id: 2, nombre: 'Tests unitarios', estado: 'En progreso' }
    ],
    dentro: 3,
    fuera: 0
  }
];