// // components/Mapa.tsx
// import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
// // import 'leaflet/dist/leaflet.css';
// import { useEffect, useState } from 'react';

// type Trabajador = {
//   id: string;
//   nombre: string;
//   lat: number;
//   lng: number;
//   distrito: string;
// };

// type Distrito = {
//   nombre: string;
//   lat: number;
//   lng: number;
// };

// type MapaProps = {
//   distritos: Distrito[];
//   trabajadores: Trabajador[];
//   onDistritoClick: (distrito: string) => void;
//   selectedDistrito: string | null;
// };

// export default function Mapa({ distritos, trabajadores, onDistritoClick, selectedDistrito }: MapaProps) {
//   const filtered = selectedDistrito
//     ? trabajadores.filter(t => t.distrito === selectedDistrito)
//     : [];

//   return (
//     <MapContainer center={[-12.0464, -77.0428]} zoom={12} style={{ height: '500px', width: '100%' }}>
//       <TileLayer
//         attribution='&copy; OpenStreetMap contributors'
//         url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />

//       {!selectedDistrito &&
//         distritos.map(d => (
//           <Marker key={d.nombre} position={[d.lat, d.lng]} eventHandlers={{
//             click: () => onDistritoClick(d.nombre),
//           }}>
//             <Popup>{d.nombre}</Popup>
//           </Marker>
//         ))}

//       {selectedDistrito &&
//         filtered.map(t => (
//           <Marker key={t.id} position={[t.lat, t.lng]}>
//             <Popup>{t.nombre}</Popup>
//           </Marker>
//         ))}
//     </MapContainer>
//   );
// }