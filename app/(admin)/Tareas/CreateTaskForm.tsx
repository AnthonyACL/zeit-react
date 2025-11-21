'use client';

import { useState } from 'react';

type Subtarea = {
  id: string;
  texto: string;
  completada: boolean;
};

type Tarea = {
  id: string;
  titulo: string;
  descripcion: string;
  imagenUrl?: string;
  subtareas: Subtarea[];
  colaboradores: string[];
  estado: string;
  areaId: string;
};

type Colaborador = {
  id: string;
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
  const [colaboradoresSeleccionados, setColaboradoresSeleccionados] = useState<string[]>([]);

  const handleAddSubtarea = () => setSubtareas([...subtareas, '']);
  const handleSubtareaChange = (index: number, value: string) => {
    const nuevas = [...subtareas];
    nuevas[index] = value;
    setSubtareas(nuevas);
  };

  const handleSubmit = () => {
    const nuevaTarea: Partial<Tarea> = {
      titulo,
      descripcion,
      imagenUrl: imagen ? URL.createObjectURL(imagen) : undefined,
      subtareas: subtareas.map((texto, i) => ({
        id: `s${i}`,
        texto,
        completada: false,
      })),
      colaboradores: colaboradoresSeleccionados,
    };
    onCreate(nuevaTarea);
  };

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-xl">
      <h2 className="text-xl font-bold mb-4">Crear nueva tarea</h2>

      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      <label className="block mb-2 font-semibold">Imagen:</label>
      <input
        type="file"
        onChange={(e) => setImagen(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <label className="block mb-2">
        <input
          type="checkbox"
          checked={usarSubtareas}
          onChange={() => setUsarSubtareas(!usarSubtareas)}
        />
        {' '}Usar subtareas
      </label>

      {usarSubtareas && (
        <div className="mb-3">
          {subtareas.map((s, i) => (
            <input
              key={i}
              type="text"
              value={s}
              onChange={(e) => handleSubtareaChange(i, e.target.value)}
              placeholder={`Subtarea ${i + 1}`}
              className="w-full mb-2 p-2 border rounded"
            />
          ))}
          <button
            onClick={handleAddSubtarea}
            className="text-blue-600 text-sm"
          >
            + Añadir subtarea
          </button>
        </div>
      )}

      <label className="block mb-2 font-semibold">Asignar colaboradores (opcional):</label>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {colaboradores.map((c) => (
          <label key={c.id} className="flex items-center gap-2">
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
            />
            {c.nombre}
          </label>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Crear tarea
      </button>
    </div>
  );
}