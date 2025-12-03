'use client';

import { useState } from 'react';
import { Tarea, Subtarea } from '@/data/mockData';

type Colaborador = {
  id: number;
  nombre: string;
};

type Props = {
  colaboradores: Colaborador[];
  onCreate: (tarea: Partial<Tarea>) => void;
};

export default function CreateTaskForm({ colaboradores, onCreate }: Props) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);
  const [usarSubtareas, setUsarSubtareas] = useState(false);
  const [subtareas, setSubtareas] = useState<string[]>([]);
  const [colaboradoresSeleccionados, setColaboradoresSeleccionados] = useState<number[]>([]);

  const handleAddSubtarea = () => setSubtareas([...subtareas, '']);
  
  const handleSubtareaChange = (index: number, value: string) => {
    const nuevas = [...subtareas];
    nuevas[index] = value;
    setSubtareas(nuevas);
  };

  const handleRemoveSubtarea = (index: number) => {
    setSubtareas(subtareas.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!titulo.trim()) {
      alert('El título es obligatorio');
      return;
    }

    const nuevaTarea: Partial<Tarea> = {
      titulo,
      descripcion,
      imagenUrl: imagen ? URL.createObjectURL(imagen) : undefined,
      subtareas: subtareas
        .filter((s) => s.trim())
        .map((titulo, i) => ({
          id: `sub-${Date.now()}-${i}`,
          titulo,
          completada: false,
        } as Subtarea)),
      colaboradores: colaboradoresSeleccionados,
    };
    onCreate(nuevaTarea);
  };

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Crear nueva tarea</h2>

      <input
        type="text"
        placeholder="Título *"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
      />

      <label className="block mb-2 font-semibold">Imagen (opcional):</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImagen(e.target.files?.[0] || null)}
        className="mb-4 w-full"
      />

      <label className="block mb-2">
        <input
          type="checkbox"
          checked={usarSubtareas}
          onChange={() => setUsarSubtareas(!usarSubtareas)}
          className="mr-2"
        />
        Usar subtareas
      </label>

      {usarSubtareas && (
        <div className="mb-3 bg-gray-50 p-3 rounded">
          {subtareas.map((s, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="text"
                value={s}
                onChange={(e) => handleSubtareaChange(i, e.target.value)}
                placeholder={`Subtarea ${i + 1}`}
                className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleRemoveSubtarea(i)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={handleAddSubtarea}
            className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
          >
            + Añadir subtarea
          </button>
        </div>
      )}

      <label className="block mb-2 font-semibold">Asignar colaboradores (opcional):</label>
      <div className="grid grid-cols-2 gap-2 mb-4 bg-gray-50 p-3 rounded">
        {colaboradores.length > 0 ? (
          colaboradores.map((c) => (
            <label key={c.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={colaboradoresSeleccionados.includes(c.id)}
                onChange={() => {
                  setColaboradoresSeleccionados((prev) =>
                    prev.includes(c.id)
                      ? prev.filter((id) => id !== c.id)
                      : [...prev, c.id]
                  );
                }}
                className="w-4 h-4"
              />
              <span>{c.nombre}</span>
            </label>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No hay colaboradores en esta área</p>
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold"
      >
        Crear tarea
      </button>
    </div>
  );
}