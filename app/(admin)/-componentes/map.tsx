'use client';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from 'react-leaflet';
import { Icon } from 'leaflet';
// @ts-ignore
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';

const iconDistrito = new Icon({
  iconUrl:
    '/icons/marker-icon-green.png',
  iconRetinaUrl:
    '/icons/marker-icon-green.png',
  shadowUrl:
    '/icons/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -35],  
});

const iconTrabajador = new Icon({
  iconUrl:
    '/icons/marker-icon-blue.png',
  iconRetinaUrl:
    '/icons/marker-icon-blue.png',
  shadowUrl:
    '/icons/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -35],  
});

type Trabajador = {
  id: string;
  nombre: string;
  lat: number;
  lng: number;
  distrito: string;
};

type Distrito = {
  nombre: string;
  lat: number;
  lng: number;
};

type MapaProps = {
  distritos: Distrito[];
  trabajadores: Trabajador[];
  zoom: number;
  setZoom: (z: number) => void;
};

function ZoomListener({ setZoom }: { setZoom: (z: number) => void }) {
  useMapEvents({
    zoomend: (e) => {
      setZoom(e.target.getZoom());
    },
  });
  return null;
}

function ZoomToDistrito({ distrito }: { distrito: Distrito }) {
  const map = useMap();

  useEffect(() => {
    map.setView([distrito.lat, distrito.lng], 16);
  }, [distrito, map]);

  return null;
}

export default function Mapa({
  distritos,
  trabajadores,
  zoom,
  setZoom,
}: MapaProps) {
  const [selectedDistrito, setSelectedDistrito] = useState<Distrito | null>(
    null
  );
  const mostrarDistritos = zoom <= 13;

  return (
    <div style={{ position: 'relative' }}>
      <MapContainer
        center={[-12.0464, -77.0428]}
        zoom={zoom}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"

        />

        <ZoomListener setZoom={setZoom} />

        {selectedDistrito && <ZoomToDistrito distrito={selectedDistrito} />}

        {mostrarDistritos
        ? distritos.map((d) => (
            <Marker
              key={d.nombre}
              position={[d.lat, d.lng]}
              icon={iconDistrito}
              eventHandlers={{
                click: () => setSelectedDistrito(d),
                mouseover: (e) => e.target.openPopup(),
                mouseout: (e) => e.target.closePopup(),
              }}
            >
              <Popup closeButton={false}>{d.nombre}</Popup>
            </Marker>
          ))
        : trabajadores.map((t) => (
            <Marker
              key={t.id}
              position={[t.lat, t.lng]}
              icon={iconTrabajador}
              eventHandlers={{
                mouseover: (e) => e.target.openPopup(),
                mouseout: (e) => e.target.closePopup(),
              }}
            >
              <Popup closeButton={false}>{t.nombre}</Popup>
            </Marker>
          ))}

      </MapContainer>

      {!mostrarDistritos && (
        <button
          onClick={() => {
            setSelectedDistrito(null);
            setZoom(12);
          }}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 1000,
            padding: '8px 12px',
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Volver a vista general
        </button>
      )}
    </div>
  );
}