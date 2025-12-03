'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Tarea, Submission } from '@/data/mockData';
import { MOCK_COLABORADORES } from '@/data/mockData';
import { X } from 'lucide-react';

interface ModeratorTaskReviewProps {
  tarea: Tarea;
  submission: Submission;
  onAccept: () => void;
  onDeny: (reason: string) => void;
  onCancel: () => void;
}

export default function ModeratorTaskReview({
  tarea,
  submission,
  onAccept,
  onDeny,
  onCancel,
}: ModeratorTaskReviewProps) {
  const [denyReason, setDenyReason] = useState('');
  const [isDenying, setIsDenying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const colaborador = MOCK_COLABORADORES.find((col) => col.id === submission.colaboradorId);

  const handleAccept = () => {
    setIsLoading(true);
    onAccept();
    setIsLoading(false);
  };

  const handleDeny = () => {
    if (!denyReason.trim()) {
      alert('Por favor, escribe una razón para denegar');
      return;
    }

    setIsLoading(true);
    onDeny(denyReason);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Revisar Envío</h2>

        {/* Task Info */}
        <div className="bg-gray-50 rounded p-4 mb-6">
          <h3 className="font-semibold text-lg mb-2">{tarea.titulo}</h3>
          <p className="text-gray-600 text-sm">{tarea.descripcion}</p>
        </div>

        {/* Collaborator Info */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-2">Enviado por:</p>
          <div className="flex items-center gap-3">
            {colaborador?.avatar && (
              <Image
                src={colaborador.avatar}
                alt={colaborador.nombre}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <div>
              <p className="font-semibold">{colaborador?.nombre || 'Colaborador desconocido'}</p>
              <p className="text-xs text-gray-600">{new Date(submission.timestamp).toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Submission Content */}
        <div className="border border-gray-300 rounded p-4 mb-6 bg-gray-50">
          <p className="font-semibold mb-3">Actualización:</p>
          <p className="text-gray-800 whitespace-pre-wrap mb-4">{submission.text}</p>

          {submission.image && (
            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">Imagen adjunta:</p>
              <Image
                src={submission.image}
                alt="Submission image"
                width={400}
                height={300}
                className="rounded object-cover max-w-full"
              />
            </div>
          )}
        </div>

        {/* Decision Section */}
        {!isDenying ? (
          <div className="flex gap-3 mb-6">
            <button
              onClick={handleAccept}
              disabled={isLoading}
              className="flex-1 bg-green-600 text-white px-4 py-3 rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
            >
              {isLoading ? 'Procesando...' : '✓ Aceptar Envío'}
            </button>
            <button
              onClick={() => setIsDenying(true)}
              disabled={isLoading}
              className="flex-1 bg-red-600 text-white px-4 py-3 rounded hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
            >
              ✗ Denegar Envío
            </button>
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 bg-gray-400 text-white px-4 py-3 rounded hover:bg-gray-500 disabled:cursor-not-allowed font-semibold"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <div className="space-y-4 mb-6 bg-red-50 rounded p-4 border border-red-200">
            <p className="font-semibold text-red-800">¿Por qué deseas denegar este envío?</p>
            <textarea
              value={denyReason}
              onChange={(e) => setDenyReason(e.target.value)}
              placeholder="Explica las razones de la denegación. La tarea volverá a 'En proceso'..."
              className="w-full border border-red-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
              rows={4}
              disabled={isLoading}
            />

            <div className="flex gap-3">
              <button
                onClick={handleDeny}
                disabled={isLoading || !denyReason.trim()}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
              >
                {isLoading ? 'Procesando...' : 'Confirmar Denegación'}
              </button>
              <button
                onClick={() => {
                  setIsDenying(false);
                  setDenyReason('');
                }}
                disabled={isLoading}
                className="flex-1 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 disabled:cursor-not-allowed"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
