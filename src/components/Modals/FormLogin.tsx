import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@context/AuthContext";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

interface ModalProps {
  onClose: () => void;
  onOpenRegister: () => void;
  redirectOnSuccess?: boolean;
}
export const FormLogin = ({ onClose, onOpenRegister, redirectOnSuccess = true }: ModalProps) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: false, password: false });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { signIn, signInWithGoogle } = useAuth();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setLoginData((prevState) => ({
      ...prevState,
      [field]: event.target.value,
    }));
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newErrors = {
      email: loginData.email.trim() === "",
      password: loginData.password.trim() === "",
    };
    setErrors(newErrors);

    if (newErrors.email || newErrors.password) return;

    try {
      await signIn(loginData.email, loginData.password);
      toast.success("Bienvenido!", {
        description: "Has iniciado sesión correctamente.",
        icon: <CheckCircle2 className="h-4 w-4" />,
        duration: 1000,
      });
      // El routing post-login lo maneja AuthContext via onAuthStateChange → syncProfile → navigate
      onClose();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Ocurrió un error inesperado";
      toast.error(message, { duration: 3000 });
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Iniciar Sesión</h2>
          <button
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={() => onClose()}
          >
            X
          </button>
        </div>
        <p className="text-gray-600 mb-4 flex gap-2">
          ¿No tienes cuenta?
          <button
            onClick={() => onOpenRegister()}
            className="text-sky-600 hover:text-sky-700 font-medium cursor-pointer "
          >
            Regístrate aquí
          </button>
        </p>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`w-full px-3 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500`}
              placeholder="tu@email.com"
              onChange={(e) => handleChange(e, "email")}
              value={loginData.email}
            />
            {errors.email && (
              <p className="text-sm text-red-500">El correo es obligatorio.</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className={`w-full px-3 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500`}
              placeholder="••••••••"
              onChange={(e) => handleChange(e, "password")}
              value={loginData.password}
            />
            {errors.password && (
              <p className="text-sm text-red-500">
                La contraseña es obligatoria.
              </p>
            )}
          </div>
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-sky-600 hover:text-sky-700"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 transition-colors"
            onClick={(e) => handleLogin(e)}
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-200" />
          <span className="mx-3 text-sm text-gray-400">o continuar con</span>
          <div className="flex-1 border-t border-gray-200" />
        </div>

        <button
          type="button"
          onClick={async () => {
            try {
              await signInWithGoogle()
            } catch (error) {
              const message = error instanceof Error ? error.message : "Error al iniciar sesión con Google";
              toast.error(message, { duration: 3000 })
            }
          }}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <GoogleIcon />
          Continuar con Google
        </button>

      </div>
    </div>
  );
};
