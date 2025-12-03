'use client';

import Image from 'next/image';
import { Tarea, MOCK_COLABORADORES } from '@/data/mockData';
import { CheckCircle, XCircle } from 'lucide-react';

type Colaborador = {
  id: number;
  nombre: string;
  avatar: string;
};

type CurrentUser = {
  id: number;
  email: string;
  rol: 'Admin' | 'SubAdmin' | 'Moderator' | 'Collaborator';
};

type Props = {
  tarea: Tarea;
  colaboradores: Colaborador[];
  currentUser: CurrentUser;
  onEdit: () => void;
};

export default function TaskDetails({ tarea, colaboradores, currentUser, onEdit }: Props) {
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'no_asignada':
        return 'bg-gray-100 text-gray-800';
      case 'asignada':
        return 'bg-blue-100 text-blue-800';
      case 'en_proceso':
        return 'bg-yellow-100 text-yellow-800';
      case 'por_revisar':
        return 'bg-orange-100 text-orange-800';
      case 'completada':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-4xl">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold mb-2">{tarea.titulo}</h2>
          <span className={`inline-block px-3 py-1 rounded text-sm font-semibold ${getEstadoColor(tarea.estado)}`}>
            {tarea.estado}
          </span>
        </div>
      </div>

      <p className="mb-3 text-gray-700">{tarea.descripcion}</p>

      {tarea.imagenUrl && (
        <Image
          src={tarea.imagenUrl}
          alt={tarea.titulo}
          width={400}
          height={250}
          className="rounded mb-4 object-cover"
        />
      )}

      {/* Subtareas */}
      {tarea.subtareas.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Subtareas:</h3>
          <ul className="list-disc pl-5 text-sm">
            {tarea.subtareas.map((s) => (
              <li key={s.id}>
                {s.completada ? '✅' : '⬜'} {s.titulo}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Colaboradores */}
      {tarea.colaboradores.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Colaboradores asignados:</h3>
          <div className="flex gap-3 flex-wrap">
            {tarea.colaboradores.map((id) => {
              const col = MOCK_COLABORADORES.find((c) => c.id === id);
              return (
                col && (
                  <div key={col.id} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded">
                    {col.avatar && (
                      <Image src={col.avatar} alt={col.nombre} width={32} height={32} className="rounded-full" />
                    )}
                    <span className="text-sm">{col.nombre}</span>
                  </div>
                )
              );
            })}
          </div>
        </div>
      )}

      {/* Submission History */}
      {tarea.submission && (
        <div className="mb-4 border-l-4 border-orange-500 bg-orange-50 p-4 rounded">
          <h3 className="font-semibold mb-2 text-orange-900">Envío del Colaborador:</h3>
          <div className="text-sm">
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">De:</span> {MOCK_COLABORADORES.find((c) => c.id === tarea.submission!.colaboradorId)?.nombre}
            </p>
            <p className="text-gray-600 text-xs mb-2">
              {new Date(tarea.submission.timestamp).toLocaleString()}
            </p>
            <p className="text-gray-800 whitespace-pre-wrap mb-3">{tarea.submission.text}</p>
            {tarea.submission.image && (
              <Image
                src={tarea.submission.image}
                alt="Submitted image"
                width={300}
                height={200}
                className="rounded object-cover"
              />
            )}
          </div>
        </div>
      )}

      {/* Review History */}
      {tarea.review && (
        <div
          className={`mb-4 border-l-4 p-4 rounded ${
            tarea.review.status === 'aceptada'
              ? 'border-green-500 bg-green-50'
              : 'border-red-500 bg-red-50'
          }`}
        >
          <div className="flex items-start gap-3">
            {tarea.review.status === 'aceptada' ? (
              <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
            ) : (
              <XCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
            )}
            <div className="text-sm flex-1">
              <p className="font-semibold">
                {tarea.review.status === 'aceptada' ? '✓ Envío Aceptado' : '✗ Envío Denegado'}
              </p>
              <p className="text-gray-600 text-xs mb-2">
                {new Date(tarea.review.timestamp).toLocaleString()}
              </p>
              {tarea.review.reason && (
                <p className="text-gray-800">
                  <span className="font-semibold">Razón:</span> {tarea.review.reason}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 mt-6">
        {(currentUser.rol === 'Moderator' || currentUser.rol === 'SubAdmin' || currentUser.rol === 'Admin') && (
          <button
            onClick={onEdit}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded font-semibold"
          >
            Editar tarea
          </button>
        )}
      </div>
    </div>
  );
}