import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@context/AuthContext";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  onClose: () => void;
  onOpenRegister: () => void;
}
export const FormLogin = ({ onClose, onOpenRegister }: ModalProps) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: false, password: false });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

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
      onClose();
      toast.success("Bienvenido!", {
        description: "Has iniciado sesión correctamente.",
        icon: <CheckCircle2 className="h-4 w-4" />,
        duration: 1000,
      });
      // TODO(SMS-28): navigate to /dashboard if userProfile has businessId once available
      setTimeout(() => {
        navigate("/onboarding/plans");
      }, 100);
    } catch (error: any) {
      const message = error?.message || "Ocurrió un error inesperado";
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

      </div>
    </div>
  );
};
