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
  estado: 'no_asignada' | 'asignada' | 'en_proceso' | 'por_revisar' | 'completada';
  colaboradores: string[];
  areaId: string;
};
type Colaborador = {
  id: string;
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
  const [colaboradoresSeleccionados, setColaboradoresSeleccionados] = useState<string[]>(tarea.colaboradores);

  const handleSubtareaChange = (index: number, value: string) => {
    const nuevas = [...subtareas];
    nuevas[index].texto = value;
    setSubtareas(nuevas);
  };

  const handleSave = () => {
    const tareaActualizada: Tarea = {
      ...tarea,
      titulo,
      descripcion,
      subtareas,
      colaboradores: colaboradoresSeleccionados,
      estado: colaboradoresSeleccionados.length > 0 ? 'asignada' : 'no_asignada',
      areaId: tarea.areaId, // ✅ aseguramos que esté presente
    };
    onSave(tareaActualizada);
  };

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-xl">
      <h2 className="text-xl font-bold mb-4">Editar tarea</h2>

      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      <h3 className="font-semibold mb-2">Subtareas:</h3>
      {subtareas.map((s, i) => (
        <input
          key={s.id}
          type="text"
          value={s.texto}
          onChange={(e) => handleSubtareaChange(i, e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
      ))}

      <h3 className="font-semibold mb-2">Colaboradores:</h3>
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
        onClick={handleSave}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Guardar cambios
      </button>
    </div>
  );
}