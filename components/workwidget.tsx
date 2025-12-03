'use client';

import { useState, useEffect } from 'react';
import { useWorkSession } from '@/app/(views)/-componentes/WorkSessionContext'; // Asegúrate que la ruta sea correcta

// Función para formatear el tiempo
const formatTime = (totalSeconds: number) => {
  const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const s = (totalSeconds % 60).toString().padStart(2, '0');
  // Si no hay horas, mostramos solo MM:SS para ahorrar espacio en modo pequeño
  if (h === '00') return `${m}:${s}`;
  return `${h}:${m}:${s}`;
};

// Iconos
const IconPlay = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 3l14 9-14 9V3z" /></svg>;
const IconCoffee = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" /></svg>;
const IconSquare = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>;
const IconCheck = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;

export default function WorkWidget() {
  const { status, workSeconds, breakSeconds, startWork, startBreak, endWork } = useWorkSession();
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // Lógica de estilos dinámica
  const getWidgetStyles = () => {
    // 1. Si está EXPANDIDO: Siempre fondo blanco tipo tarjeta
    if (isExpanded) {
      return 'w-72 h-auto bg-white rounded-2xl shadow-2xl border border-gray-100';
    }

    // 2. Si está COLAPSADO: Fondo de color sólido según estado
    const baseClasses = 'w-16 h-16 rounded-full shadow-lg cursor-pointer hover:scale-110 flex items-center justify-center transition-transform';
    
    switch (status) {
      case 'working': return `${baseClasses} bg-green-500 text-white border-2 border-green-600`;
      case 'break': return `${baseClasses} bg-yellow-400 text-yellow-900 border-2 border-yellow-500`; // Texto oscuro en amarillo para leer mejor
      case 'finished': return `${baseClasses} bg-red-600 text-white border-2 border-red-700`;
      default: return `${baseClasses} bg-white text-gray-800 border border-gray-200`; // Idle
    }
  };

  // Mensaje flotante de éxito
  if (status === 'submitted') {
    return (
      <div className="fixed top-6 right-6 z-5000 animate-bounce">
        <div className="bg-green-500 text-white shadow-xl rounded-full px-6 py-3 flex items-center gap-2">
          <IconCheck />
          <span className="font-bold">¡Enviado!</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      // Aplicamos las clases calculadas
      className={`fixed top-6 right-6 z-500 overflow-hidden transition-all duration-300 ease-in-out ${getWidgetStyles()}`}
      onClick={() => !isExpanded && setIsExpanded(true)}
    >
      {/* ---------------------------
          VISTA COLAPSADA (Pequeña)
         --------------------------- */}
      {!isExpanded && (
        <div className="flex flex-col items-center justify-center leading-none">
          {status === 'idle' ? (
            <IconPlay />
          ) : (
            <>
              {/* Icono pequeño indicando estado */}
              <div className="mb-0.5 opacity-80">
                {status === 'working' && <span className="text-[8px] uppercase font-bold tracking-wider">ON</span>}
                {status === 'break' && <IconCoffee />}
              </div>
              
              {/* Contador en vivo */}
              <span className="text-xs font-mono font-bold">
                {status === 'break' ? formatTime(breakSeconds) : formatTime(workSeconds)}
              </span>
            </>
          )}
        </div>
      )}

      {/* ---------------------------
          VISTA EXPANDIDA (Grande)
         --------------------------- */}
      {isExpanded && (
        <div className="p-5 flex flex-col h-full relative">
            {/* Botón cerrar */}
            <button 
                onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-1"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>

            {/* Header de Estado */}
            <div className="flex items-center gap-2 mb-4">
                <div className={`w-2.5 h-2.5 rounded-full ${status === 'working' ? 'bg-green-500 animate-pulse' : status === 'break' ? 'bg-yellow-500 animate-pulse' : 'bg-gray-300'}`} />
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    {status === 'idle' && 'Nueva Jornada'}
                    {status === 'working' && 'Trabajando'}
                    {status === 'break' && 'Descanso'}
                    {status === 'finished' && 'Cerrando...'}
                </span>
            </div>

            {/* Cronómetros con Lógica de Intercambio */}
            <div className="flex flex-col items-center mb-6">
                
                {/* 1. Contador Secundario (El que está en pausa) */}
                <div className="h-6 mb-1">
                    {status === 'break' && (
                        <div className="flex items-center gap-2 text-gray-400 text-xs font-mono animate-in slide-in-from-bottom-2 fade-in">
                            <span>Trabajo:</span>
                            <span>{formatTime(workSeconds)}</span>
                        </div>
                    )}
                    {status === 'working' && breakSeconds > 0 && (
                        <div className="flex items-center gap-2 text-gray-400 text-xs font-mono animate-in slide-in-from-bottom-2 fade-in">
                            <span>Descanso:</span>
                            <span>{formatTime(breakSeconds)}</span>
                        </div>
                    )}
                </div>

                {/* 2. Contador Principal (El activo) */}
                <div className={`text-5xl font-mono font-bold tracking-tighter
                    ${status === 'working' ? 'text-gray-800' : ''}
                    ${status === 'break' ? 'text-yellow-500' : ''}
                    ${status === 'idle' ? 'text-gray-300' : ''}
                `}>
                    {status === 'break' ? formatTime(breakSeconds) : formatTime(workSeconds)}
                </div>
            </div>

            {/* Botones de Acción */}
            <div className="grid gap-2">
                {status === 'idle' && (
                    <button onClick={startWork} className="bg-black text-white py-3 rounded-xl font-medium text-sm hover:bg-gray-800 transition shadow-lg flex justify-center items-center gap-2">
                       <IconPlay /> Iniciar
                    </button>
                )}

                {(status === 'working' || status === 'break') && (
                    <div className="flex gap-2">
                        {status === 'working' ? (
                            <button onClick={startBreak} className="flex-1 bg-yellow-100 text-yellow-700 py-3 rounded-xl font-bold text-sm hover:bg-yellow-200 transition flex justify-center items-center gap-2">
                                <IconCoffee /> Pausa
                            </button>
                        ) : (
                            <button onClick={startWork} className="flex-1 bg-green-100 text-green-700 py-3 rounded-xl font-bold text-sm hover:bg-green-200 transition flex justify-center items-center gap-2">
                                <IconPlay /> Seguir
                            </button>
                        )}

                        <button onClick={endWork} className="w-14 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition flex items-center justify-center border border-red-100">
                            <IconSquare />
                        </button>
                    </div>
                )}
            </div>
        </div>
      )}
    </div>
  );
}