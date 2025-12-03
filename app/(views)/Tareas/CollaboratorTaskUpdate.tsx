'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Tarea, Submission } from '@/data/mockData';
import { X } from 'lucide-react';

interface CollaboratorTaskUpdateProps {
  tarea: Tarea;
  currentUserId: number;
  onSubmit: (submission: Submission) => void;
  onCancel: () => void;
}

export default function CollaboratorTaskUpdate({
  tarea,
  currentUserId,
  onSubmit,
  onCancel,
}: CollaboratorTaskUpdateProps) {
  const [text, setText] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      alert('Por favor, escribe una actualización');
      return;
    }

    setIsLoading(true);

    const submission: Submission = {
      colaboradorId: currentUserId,
      text: text.trim(),
      image: image || undefined,
      timestamp: new Date(),
    };

    onSubmit(submission);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Enviar Actualización</h2>
        <p className="text-gray-600 mb-4">Tarea: <span className="font-semibold">{tarea.titulo}</span></p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Text Input */}
          <div>
            <label className="block text-sm font-semibold mb-2">Actualización *</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Describe el progreso de la tarea..."
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={4}
              disabled={isLoading}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold mb-2">Adjuntar imagen (opcional)</label>
            {image ? (
              <div className="relative">
                <Image
                  src={image}
                  alt="Preview"
                  width={300}
                  height={200}
                  className="rounded object-cover w-full"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  disabled={isLoading}
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div
                className="border-2 border-dashed border-gray-300 rounded px-4 py-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
                onClick={() => fileInputRef.current?.click()}
              >
                <p className="text-gray-600 text-sm">Click para cargar imagen</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={isLoading}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isLoading || !text.trim()}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Enviando...' : 'Enviar Actualización'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
