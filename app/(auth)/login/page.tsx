import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-blue-600 flex items-center justify-center lg:flex min-h-svh">
        <img
          src="/images/Zeit_login_image.png"
          alt="Imagen de login"
          className="h-[250px] w-auto object-contain drop-shadow-xl rounded-xl mx-auto"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center " >
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
// huevon el que lo lea