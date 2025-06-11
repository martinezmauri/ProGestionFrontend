import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { CheckCircle2, Eye, EyeOff, LockKeyhole, Mail, X } from "lucide-react";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@context/AuthContext";

interface ModalProps {
  onClose: () => void;
  onOpenRegister: () => void;
}
export const FormLogin = ({ onClose, onOpenRegister }: ModalProps) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: false, password: false });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { loginWithRedirect } = useAuth0();
  const { login } = useAuth();

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
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signIn`,
        loginData
      );
      if (response.status === 200) {
        const { id, token } = response.data;

        login(id, token);
        onClose();
        toast.success("Bienvenido!", {
          description: "Has iniciado sesión correctamente.",
          icon: <CheckCircle2 className="h-4 w-4" />,
          duration: 1000,
        });
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Ocurrió un error inesperado";
      toast.error(message, { duration: 3000 });
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handleRedirectLogin = (redirect: string) => {
    loginWithRedirect({
      authorizationParams: { connection: redirect },
    });
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
              className={`w-full px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
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
              className={`w-full px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
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

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                O continúa con
              </span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <button
              className="flex justify-center items-center py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              onClick={() => handleRedirectLogin("facebook")}
            >
              <img
                className="w-9"
                src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745445649/qrubt0avnlt3w3gz48kn.png"
                alt="Logo de facebook"
              />
            </button>

            <button
              className="flex justify-center items-center py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              onClick={() => handleRedirectLogin("apple")}
            >
              <img
                className="w-7"
                src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745445629/oanftqh36xcvujdeoodr.png"
                alt="Logo de apple"
              />
            </button>

            <button
              className="flex justify-center items-center py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              onClick={() => handleRedirectLogin("google-oauth2")}
            >
              <img
                className="w-7"
                src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745445666/r8xibykn0lqfspnslacj.png"
                alt="Logo de google"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
