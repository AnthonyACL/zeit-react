'use client';

import { useState } from 'react';
import { Tarea, Subtarea } from '@/data/mockData';

type Colaborador = {
  id: number;
  nombre: string;
};

type Props = {
  tarea: Tarea;
  colaboradores: Colaborador[];
  onSave: (tarea: Tarea) => void;
};

export default function EditTaskForm({ tarea, colaboradores, onSave }: Props) {
  const [titulo, setTitulo] = useState(tarea.titulo);
  const [descripcion, setDescripcion] = useState(tarea.descripcion);
  const [subtareas, setSubtareas] = useState<Subtarea[]>(tarea.subtareas);
  const [colaboradoresSeleccionados, setColaboradoresSeleccionados] = useState<number[]>(tarea.colaboradores);

  const handleSubtareaChange = (index: number, value: string) => {
    const nuevas = [...subtareas];
    nuevas[index].titulo = value;
    setSubtareas(nuevas);
  };

  const handleToggleSubtarea = (index: number) => {
    const nuevas = [...subtareas];
    nuevas[index].completada = !nuevas[index].completada;
    setSubtareas(nuevas);
  };

  const handleAddSubtarea = () => {
    setSubtareas([
      ...subtareas,
      {
        id: `sub-${Date.now()}`,
        titulo: '',
        completada: false,
      },
    ]);
  };

  const handleRemoveSubtarea = (index: number) => {
    setSubtareas(subtareas.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const tareaActualizada: Tarea = {
      ...tarea,
      titulo,
      descripcion,
      subtareas,
      colaboradores: colaboradoresSeleccionados,
      estado:
        colaboradoresSeleccionados.length > 0 && tarea.estado === 'no_asignada'
          ? 'asignada'
          : tarea.estado,
      areaId: tarea.areaId,
    };
    onSave(tareaActualizada);
  };

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Editar tarea</h2>

      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
      />

      <h3 className="font-semibold mb-2">Subtareas:</h3>
      <div className="bg-gray-50 p-3 rounded mb-4">
        {subtareas.map((s, i) => (
          <div key={s.id} className="flex gap-2 mb-2 items-center">
            <input
              type="checkbox"
              checked={s.completada}
              onChange={() => handleToggleSubtarea(i)}
              className="w-4 h-4"
            />
            <input
              type="text"
              value={s.titulo}
              onChange={(e) => handleSubtareaChange(i, e.target.value)}
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

      <h3 className="font-semibold mb-2">Colaboradores asignados:</h3>
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
        onClick={handleSave}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold"
      >
        Guardar cambios
      </button>
    </div>
  );
}