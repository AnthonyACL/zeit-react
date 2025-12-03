"use client"
import { AppSidebar } from '@/app/(views)/-componentes/app-sidebar'
import { Button } from '@/components/ui/button'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { useState, useEffect } from 'react'

//Imports de los componentes de roles
import DashboardAdmin from './components/DashboardAdmin'
import DashboardModerator from './components/DashboardModerator'
import DashboardSubAdmin from './components/DashboardSubAdmin'
import DashboardColaborator from './components/DashboardCollaborator'

export default function Page() {
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [resumen, setResumen] = useState<'diario' | 'semanal' | 'mensual'>('diario');
    const [popupArea, setPopupArea] = useState<string | null>(null);
    
    // Obtener usuario del localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('currentUser');
            if (user) {
                try {
                    setCurrentUser(JSON.parse(user));
                } catch (e) {
                    console.error('Error parsing user:', e);
                }
            }
        }
    }, []);
    const [verColaboradores, setVerColaboradores] = useState<string | null>(null);
    const [filtro, setFiltro] = useState<'dentro' | 'fuera' | 'descanso' | null>('dentro');

    // --- DATOS (Tus datos originales) ---
    const proyectos = [
        { id: 1, nombre: 'Proyecto X', estado: 'En progreso', avance: 70, manager: 'Ana G.' },
        { id: 2, nombre: 'Proyecto Y', estado: 'Completado', avance: 100, manager: 'Carlos S.' },
        { id: 3, nombre: 'Proyecto Z', estado: 'En progreso', avance: 15, manager: 'Santiago P.' },
        { id: 4, nombre: 'Proyecto D', estado: 'En progreso', avance: 45, manager: 'Martin F.' },
        { id: 5, nombre: 'Proyecto A', estado: 'Completado', avance: 100, manager: 'Gicela M.' },
        { id: 6, nombre: 'Proyecto B', estado: 'En progreso', avance: 60, manager: 'Julio R.' },
        { id: 7, nombre: 'Proyecto C', estado: 'Pendiente', avance: 0, manager: 'Pendiente' }
    ]

    const areas = [
        {
            nombre: 'Desarrollo',
            horas: { trabajadas: 24.44, descansos: 5.19, extras: 2.8 },
            proyecto: ['Proyecto Y', 'Proyecto A', 'Proyecto B', 'Proyecto C'],
            tareas: [
                { id: 1, nombre: 'Frontend Login', estado: 'Completada' },
                { id: 2, nombre: 'Revisión API', estado: 'En progreso' },
                { id: 3, nombre: 'Diseño Dashboard', estado: 'Pendiente' }
            ],
            dentro: 3, fuera: 1, descanso: 4
        },
        {
            nombre: 'Diseño',
            horas: { trabajadas: 10.2, descansos: 6.8, extras: 0.5 },
            proyecto: ['Proyecto X', 'Proyecto A'],
            tareas: [
                { id: 1, nombre: 'Mockup landing', estado: 'Completada' },
                { id: 2, nombre: 'Revisión UX', estado: 'Pendiente' }
            ],
            dentro: 2, fuera: 0, descanso: 2
        },
        {
            nombre: 'Análisis',
            horas: { trabajadas: 18.2, descansos: 0.8, extras: 2.5 },
            proyecto: ['Proyecto X'],
            tareas: [
                { id: 1, nombre: 'Mockup landing', estado: 'Pendiente' },
                { id: 2, nombre: 'Revisión UX', estado: 'Pendiente' }
            ],
            dentro: 2, fuera: 0, descanso: 2
        },
        {
            nombre: 'Implementación React',
            horas: { trabajadas: 24.44, descansos: 1.19, extras: 0.8 },
            proyecto: ['Proyecto Y'],
            tareas: [
                { id: 1, nombre: 'Frontend Login', estado: 'Completada' },
                { id: 2, nombre: 'Revisión API', estado: 'En progreso' },
                { id: 3, nombre: 'Diseño Dashboard', estado: 'Pendiente' }
            ],
            dentro: 3, fuera: 1, descanso: 4
        },
        {
            nombre: 'Implementación Angular',
            horas: { trabajadas: 30.44, descansos: 7.19, extras: 16.8 },
            proyecto: ['Proyecto Z'],
            tareas: [
                { id: 1, nombre: 'Frontend Login', estado: 'Completada' },
                { id: 2, nombre: 'Creación bd', estado: 'En progreso' },
                { id: 3, nombre: 'Diseño Dashboard', estado: 'En progreso' }
            ],
            dentro: 2, fuera: 1, descanso: 1
        },
        {
            nombre: 'Desarrollo Móvil',
            horas: { trabajadas: 24.44, descansos: 4.19, extras: 10.8 },
            proyecto: ['Proyecto D'],
            tareas: [
                { id: 1, nombre: 'Frontend Login', estado: 'Completada' },
                { id: 2, nombre: 'Creación bd', estado: 'En progreso' },
                { id: 3, nombre: 'Diseño Dashboard', estado: 'En progreso' },
                { id: 4, nombre: 'Diseño Inicio', estado: 'En progreso' }
            ],
            dentro: 2, fuera: 1, descanso: 2
        }
    ]

    const colaboradores = [
        // Tus datos de colaboradores (sin cambios)
        { nombre: 'Ana Gómez', area: 'Desarrollo', estado: 'dentro' },
        { nombre: 'Micaela Bastidas', area: 'Desarrollo', estado: 'dentro' },
        { nombre: 'Julio Riberyro', area: 'Desarrollo', estado: 'dentro' },
        { nombre: 'Marcel Proust', area: 'Desarrollo', estado: 'descanso' },
        { nombre: 'Tupac Amaru', area: 'Desarrollo', estado: 'descanso' },
        { nombre: 'Gicela Montes', area: 'Diseño', estado: 'dentro' },
        { nombre: 'Miranda Asoka', area: 'Diseño', estado: 'dentro' },
        { nombre: 'Morita García', area: 'Diseño', estado: 'descanso' },
        { nombre: 'Marta Gomez', area: 'Diseño', estado: 'descanso' },
        { nombre: 'Luciano Torres', area: 'Análisis', estado: 'descanso' },
        { nombre: 'Marta Rodríguez', area: 'Análisis', estado: 'descanso' },
        { nombre: 'Carlos Sánchez', area: 'Análisis', estado: 'dentro' },
        { nombre: 'Sofía Fernández', area: 'Análisis', estado: 'dentro' },
        { nombre: 'Valeria Ruiz', area: 'Implementación React', estado: 'dentro' },
        { nombre: 'Diego López', area: 'Implementación React', estado: 'dentro' },
        { nombre: 'Camila Jiménez', area: 'Implementación React', estado: 'dentro' },
        { nombre: 'Fernando Castro', area: 'Implementación React', estado: 'descanso' },
        { nombre: 'Lucía Morales', area: 'Implementación React', estado: 'descanso' },
        { nombre: 'Fernando Gonzales', area: 'Implementación React', estado: 'descanso' },
        { nombre: 'Lucero Ruiz', area: 'Implementación React', estado: 'descanso' },
        { nombre: 'Margaret Echenique', area: 'Implementación React', estado: 'fuera' },
        { nombre: 'Santiago Pérez', area: 'Implementación Angular', estado: 'dentro' },
        { nombre: 'Natalia Díaz', area: 'Implementación Angular', estado: 'dentro' },
        { nombre: 'Andrés Gómez', area: 'Implementación Angular', estado: 'descanso' },
        { nombre: 'Isabella Torres', area: 'Implementación Angular', estado: 'fuera' },
        { nombre: 'Martín Fernández', area: 'Desarrollo Móvil', estado: 'dentro' },
        { nombre: 'Camila Rodríguez', area: 'Desarrollo Móvil', estado: 'dentro' },
        { nombre: 'Valentina Torres', area: 'Desarrollo Móvil', estado: 'descanso' },
        { nombre: 'Dexter Melón', area: 'Desarrollo Móvil', estado: 'descanso' },
        { nombre: 'Joaquín Ruiz', area: 'Desarrollo Móvil', estado: 'fuera' },
    ]

    // --- LÓGICA / FUNCIONES ---
    function openPopup(nombre: string) { setPopupArea(nombre) }
    function closePopup() { setPopupArea(null) }
    function toggleColaboradores(name_area: string) {
        setVerColaboradores((prev) => prev === name_area ? null : name_area)
    }
    const cambioFiltro = (nameFiltro: 'dentro' | 'fuera' | 'descanso' | null) => {
        setFiltro(nameFiltro);
        setVerColaboradores(null);
    }

    // --- CÁLCULOS KPI ---
    const totalDentroUsers = colaboradores.filter(c => c.estado === 'dentro').length
    const totalFueraUsers = colaboradores.filter(c => c.estado === 'fuera').length
    const totalDescansoUsers = colaboradores.filter(c => c.estado === 'descanso').length
    const totalStaff = colaboradores.length;
    const activeProjects = proyectos.filter(p => p.estado === 'En progreso').length;
    const tasaActividad = Math.round((totalDentroUsers / totalStaff) * 100);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completado': return 'bg-green-100 text-green-700';
            case 'En progreso': return 'bg-blue-100 text-blue-700';
            case 'Pendiente': return 'bg-yellow-100 text-yellow-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    }

    const proyectosDestacados = proyectos
        .sort((a, b) => (a.estado === 'En progreso' ? -1 : 1)) // Priorizar 'En progreso'
        .slice(0, 3);

    const areasDestacadas = areas.slice(0, 3);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="bg-white w-full h-[80px] flex items-center px-8 shadow-sm">
                    <span className="font-bold text-2xl">Panel de control</span>
                </div>
                <div className=' m-10'>
                    {currentUser?.rol === 'Admin' && <DashboardAdmin />}
                    {currentUser?.rol === 'SubAdmin' && <DashboardSubAdmin />}
                    {currentUser?.rol === 'Moderator' && <DashboardModerator />}
                    {(currentUser?.rol === 'Collaborator' || !currentUser) && <DashboardColaborator />}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}