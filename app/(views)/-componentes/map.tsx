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
import 'leaflet/dist/leaflet.css';
import { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MOCK_COLABORADORES } from '@/data/mockData';

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
  setSelectedDistrito?: (d: Distrito | null) => void;
};

function ZoomListener({ setZoom }: { setZoom: (z: number) => void }) {
  const map = useMapEvents({
    zoomend: () => {
      const newZoom = map.getZoom();
      setZoom(newZoom);
    },
  });
  return null;
}

function ZoomToDistrito({ distrito }: { distrito: Distrito }) {
  const map = useMap();
  const hasZoomed = useRef(false);
  
  useEffect(() => {
    if (!hasZoomed.current) {
      map.setView([distrito.lat, distrito.lng], 14);
      hasZoomed.current = true;
    }
  }, [distrito.lat, distrito.lng, map]);
  
  return null;
}

type ResetViewButtonProps = {
  setSelectedDistrito?: (d: Distrito | null) => void;
  setLocalDistrito: (d: Distrito | null) => void;
  initialCenter: [number, number];
  initialZoom: number;
  showReset: boolean;
};

function ResetViewButton({
  setSelectedDistrito,
  setLocalDistrito,
  initialCenter,
  initialZoom,
  showReset,
}: ResetViewButtonProps) {
  const map = useMap();

  if (!showReset) return null;

  return (
    <button
      onClick={() => {
        setLocalDistrito(null);
        setSelectedDistrito?.(null);
        map.setView(initialCenter, initialZoom);
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
  );
}

export default function Mapa({
  distritos,
  trabajadores: trabajadoresFromProps,
  zoom,
  setZoom,
  setSelectedDistrito,
}: MapaProps) {
  const router = useRouter();
  const [localDistrito, setLocalDistrito] = useState<Distrito | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const initialCenter: [number, number] = [-12.0464, -77.0428];
  const initialZoom = 12;

  // Convertir MOCK_COLABORADORES a formato de trabajadores
  const trabajadores = useMemo(() => {
    return MOCK_COLABORADORES.map((col, idx) => ({
      id: col.id.toString(),
      nombre: col.nombre,
      lat: -12.0464 + (idx % 3) * 0.01,
      lng: -77.0428 + (idx % 3) * 0.01,
      distrito: col.area || 'Lima',
      email: col.correo,
    }));
  }, []);

  // Determina qué mostrar basado en zoom ACTUAL, no en props
  const [currentZoom, setCurrentZoom] = useState(initialZoom);
  const mostrarDistritos = currentZoom <= 13;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const iconDistrito = useMemo(() => new Icon({
    iconUrl: '/icons/marker-icon-green.png',
    iconRetinaUrl: '/icons/marker-icon-green.png',
    shadowUrl: '/icons/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -35],
  }), []);

  const iconTrabajador = useMemo(() => new Icon({
    iconUrl: '/icons/marker-icon-blue.png',
    iconRetinaUrl: '/icons/marker-icon-blue.png',
    shadowUrl: '/icons/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -35],
  }), []);

  const handleZoomChange = (newZoom: number) => {
    setCurrentZoom(newZoom);
    setZoom(newZoom);
  };

  if (!isMounted) {
    return (
      <div style={{ height: '500px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6' }}>
        <p>Cargando mapa...</p>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', height: '500px', width: '100%' }}>
      <MapContainer
        center={initialCenter}
        zoom={initialZoom}
        style={{ height: '100%', width: '100%' }}
        preferCanvas={true}
        scrollWheelZoom={true}
        whenReady={() => {
          console.log('Mapa inicializado correctamente');
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        <ZoomListener setZoom={handleZoomChange} />
        {localDistrito && <ZoomToDistrito distrito={localDistrito} key={localDistrito.nombre} />}
        {!mostrarDistritos && (
          <ResetViewButton
            setSelectedDistrito={setSelectedDistrito}
            setLocalDistrito={setLocalDistrito}
            initialCenter={initialCenter}
            initialZoom={initialZoom}
            showReset={!mostrarDistritos}
          />
        )}

        {mostrarDistritos
          ? distritos.map((d) => (
              <Marker
                key={d.nombre}
                position={[d.lat, d.lng]}
                icon={iconDistrito}
                eventHandlers={{
                  click: () => {
                    setLocalDistrito(d);
                    setSelectedDistrito?.(d);
                  },
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
                  click: () => router.push(`/Chat?user=${t.id}`),
                  mouseover: (e) => e.target.openPopup(),
                  mouseout: (e) => e.target.closePopup(),
                }}
              >
                <Popup closeButton={false}>{t.nombre}</Popup>
              </Marker>
            ))}
      </MapContainer>
    </div>
  );
}