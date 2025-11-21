'use client';

import Image from 'next/image';

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
  avatar: string;
};

type Props = {
  tarea: Tarea;
  colaboradores: Colaborador[];
  onEdit: () => void;
};

export default function TaskDetails({ tarea, colaboradores, onEdit }: Props) {
  return (
    <div className="p-6 bg-white rounded shadow-md max-w-xl">
      <h2 className="text-xl font-bold mb-2">{tarea.titulo}</h2>
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

      {tarea.subtareas.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Subtareas:</h3>
          <ul className="list-disc pl-5 text-sm">
            {tarea.subtareas.map((s) => (
              <li key={s.id}>
                {s.completada ? '✅' : '⬜'} {s.texto}
              </li>
            ))}
          </ul>
        </div>
      )}

      {tarea.colaboradores.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Colaboradores:</h3>
          <div className="flex gap-3">
            {tarea.colaboradores.map((id) => {
              const col = colaboradores.find((c) => c.id === id);
              return (
                col && (
                  <div key={col.id} className="flex items-center gap-2">
                    <Image src={col.avatar} alt={col.nombre} width={32} height={32} className="rounded-full" />
                    <span className="text-sm">{col.nombre}</span>
                  </div>
                )
              );
            })}
          </div>
        </div>
      )}

      <button onClick={onEdit} className="bg-yellow-500 text-white px-4 py-2 rounded">
        Editar tarea
      </button>
    </div>
  );
}