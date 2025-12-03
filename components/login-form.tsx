'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MOCK_USERS, MOCK_COLABORADORES } from '@/data/mockData';

export function LoginForm({ className, ...props }: React.ComponentProps<'form'>) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      // Buscar usuario en mockData
      const user = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        throw new Error('Credenciales incorrectas');
      }

      console.log('✅ Login exitoso:', user);

      // Obtener datos del colaborador
      const colaborador = MOCK_COLABORADORES.find(c => c.correo === email);
      
      // Guardar datos en localStorage
      localStorage.setItem('currentUser', JSON.stringify({
        ...user,
        nombre: colaborador?.nombre,
        avatar: colaborador?.avatar
      }));

      // LÓGICA DE REDIRECCIÓN POR ROL
      router.push('/PanelControl');

    } catch (err: any) {
      console.error(err);
      // Mensaje de error más amigable
      // alert('❌ Error: Credenciales incorrectas (Prueba: admin@test.com / 123)');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'flex flex-col gap-6 shadow-xl rounded-xl bg-white/90',
        'p-6 sm:p-10', 
        'w-full max-w-[380px] mx-auto', 
        'className'
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-xl sm:text-2xl font-bold">Entrar al sistema</h1>
        {/* <p className="text-muted-foreground text-sm">
          Use: <b>admin@test.com</b> / <b>123</b>
        </p> */}
      </div>

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            placeholder="Ingrese su correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white"
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="password">Contraseña</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pr-10 bg-white"
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-1 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          {loading ? 'Verificando datos...' : 'Iniciar sesión'}
        </Button>
      </div>
    </form>
  );
}