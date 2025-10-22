// // pages/index.tsx
// import { useState } from 'react';
// // import Mapa from './-componentes/map';

// const distritos = [
//   { nombre: 'Miraflores', lat: -12.121, lng: -77.03 },
//   { nombre: 'San Isidro', lat: -12.097, lng: -77.036 },
// ];

// const trabajadores = [
//   { id: '1', nombre: 'Carlos', lat: -12.122, lng: -77.031, distrito: 'Miraflores' },
//   { id: '2', nombre: 'Lucía', lat: -12.123, lng: -77.032, distrito: 'Miraflores' },
//   { id: '3', nombre: 'Pedro', lat: -12.098, lng: -77.037, distrito: 'San Isidro' },
// ];

// export default function Home() {
//   const [selectedDistrito, setSelectedDistrito] = useState<string | null>(null);

//   return (
//     <main>
//       <h1>Mapa de trabajadores</h1>
//       <Mapa
//         distritos={distritos}
//         trabajadores={trabajadores}
//         selectedDistrito={selectedDistrito}
//         onDistritoClick={setSelectedDistrito}
//       />

//       <section>
//         <h2>Trabajadores en {selectedDistrito || '...'}</h2>
//         <ul>
//           {trabajadores
//             .filter(t => t.distrito === selectedDistrito)
//             .map(t => (
//               <li key={t.id}>{t.nombre}</li>
//             ))}
//         </ul>
//       </section>
//     </main>
//   );
// }