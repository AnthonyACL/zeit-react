import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* COLUMNA 1 (IMAGEN):
        - hidden: Oculto por defecto (en móvil).
        - lg:flex: Se vuelve visible y flexible solo en pantallas grandes (Large).
      */}
      <div className="hidden lg:flex bg-blue-600 items-center justify-center min-h-svh">
        <img
          src="/images/Zeit_login_image.png"
          alt="Imagen de login"
          className="h-[250px] w-auto object-contain drop-shadow-xl rounded-xl mx-auto"
        />
      </div>

      {/* COLUMNA 2 (FORMULARIO):
        - bg-blue-600: En móvil, el fondo será azul (para llenar la pantalla).
        - lg:bg-white: En desktop, el fondo cambia a blanco (para el diseño dividido).
      */}
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-blue-600 lg:bg-white justify-center items-center">
        <div className="flex flex-1 items-center justify-center w-full">
          {/* Quitamos 'max-w-xs' para que el LoginForm decida su propio ancho 
             (que configuramos en el paso anterior como max-w-[380px]).
          */}
          <div className="w-full flex justify-center">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}