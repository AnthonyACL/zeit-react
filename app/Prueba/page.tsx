'use client';

import { useState } from 'react';
import Mapa from '../(admin)/-componentes/map';

const distritos = [
  { nombre: 'Miraflores', lat: -12.121, lng: -77.03 },
  { nombre: 'San Isidro', lat: -12.097, lng: -77.036 },
];

const trabajadores = [
  { id: '1', nombre: 'Carlos', lat: -12.122, lng: -77.031, distrito: 'Miraflores' },
  { id: '2', nombre: 'Lucía', lat: -12.123, lng: -77.032, distrito: 'Miraflores' },
  { id: '3', nombre: 'Pedro', lat: -12.098, lng: -77.037, distrito: 'San Isidro' },
];

export default function Home() {
  const [zoom, setZoom] = useState(12);

  const mostrarTrabajadores = zoom > 13;
  const trabajadoresVisibles = mostrarTrabajadores ? trabajadores : [];

  return (
    <main style={{ padding: '1rem' }}>
      <h1>Mapa de trabajadores</h1>

      <Mapa
        distritos={distritos}
        trabajadores={trabajadores}
        zoom={zoom}
        setZoom={setZoom}
      />

      <section style={{ marginTop: '2rem' }}>
        <h2>Trabajadores visibles</h2>
        {trabajadoresVisibles.length === 0 ? (
          <p>Haz zoom para ver trabajadores individuales.</p>
        ) : (
          <ul>
            {trabajadoresVisibles.map(t => (
              <li key={t.id}>
                {t.nombre} — {t.distrito}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}