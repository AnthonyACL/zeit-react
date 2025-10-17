"use client"
import { AppSidebar } from '@/app/(admin)/-componentes/app-sidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import {   Carousel,CarouselContent,CarouselItem,CarouselNext,CarouselPrevious } from '@/components/ui/carousel'

export default function Page() {
	const users = [
		{ name: 'Diego Alonso', role: 'Administración', avatar: '/avatars/diego.jpg' },
		{ name: 'Ana Torres', role: 'Supervisor', avatar: '/avatars/ana.jpg' },
		{ name: 'Luis Pérez', role: 'Operador', avatar: '/avatars/luis.jpg' },
	]
}