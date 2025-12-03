// app/not-found.tsx

import Link from 'next/link';
import React from 'react';



const NotFoundPage: React.FC = () => {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>404 - Ruta No Encontrada 🚫</h1>
      <p>
        La dirección que has intentado acceder no existe o no tiene acceso a ella.
      </p>
      {/* Usar el componente Link de Next.js es la mejor práctica */}
      <Link href="/" style={{ marginTop: '20px', display: 'inline-block' }}>
        Volver a la página de inicio
      </Link>
    </div>
  );
};

export default NotFoundPage;