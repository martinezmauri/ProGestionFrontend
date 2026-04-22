import React, { useState } from "react";
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
  onOpenLogin: () => void;
  redirectOnSuccess?: boolean;
}

export const FormRegister = ({ onClose, onOpenLogin }: ModalProps) => {
  const { signUp, signInWithGoogle } = useAuth();
  const [registerData, setRegisterData] = useState({
    email: "",
    nameUser: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: false,
    nameUser: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setRegisterData((prevState) => ({
      ...prevState,
      [field]: event.target.value,
    }));
  };

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleOnSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors = {
      email: registerData.email.trim() === "",
      nameUser: registerData.nameUser.trim() === "",
      phone: registerData.phone.trim() === "",
      password: registerData.password.trim() === "",
      confirmPassword: registerData.confirmPassword.trim() === "",
    };

    setErrors(newErrors);
    if (
      newErrors.email ||
      newErrors.nameUser ||
      newErrors.password ||
      newErrors.phone ||
      newErrors.confirmPassword
    )
      return;

    try {
      await signUp(registerData.email, registerData.password);
      toast.success("¡Revisá tu email!", {
        description: `Te enviamos un enlace de confirmación a ${registerData.email}. Confirmá tu cuenta antes de iniciar sesión.`,
        icon: <CheckCircle2 className="h-4 w-4" />,
        duration: 8000,
      });
      onClose();
    } catch (error: any) {
      const message = error?.message || "Ocurrió un error inesperado";
      toast.error(message, { duration: 3000 });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Crear Cuenta</h2>
          <button
            onClick={() => onClose()}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <p className="text-gray-600 mb-4 flex gap-2">
          ¿Ya tienes cuenta?{" "}
          <button
            onClick={() => {
              onOpenLogin();
            }}
            className="text-sky-600 hover:text-sky-700 font-medium"
          >
            Inicia sesión aquí
          </button>
        </p>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="register-email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="register-email"
              className={`w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500`}
              placeholder="tu@email.com"
              value={registerData.email}
              onChange={(e) => handleChange(e, "email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">El correo es obligatorio.</p>
            )}
          </div>

          <div>
            <label
              htmlFor="register-name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nombre completo
            </label>
            <input
              type="text"
              id="register-name"
              className={`w-full px-3 py-2 border ${errors.nameUser ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500`}
              placeholder="Tu nombre completo"
              value={registerData.nameUser}
              onChange={(e) => handleChange(e, "nameUser")}
            />
            {errors.nameUser && (
              <p className="text-sm text-red-500">El nombre es obligatorio.</p>
            )}
          </div>

          <div>
            <label
              htmlFor="register-phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Número de teléfono
            </label>
            <input
              type="tel"
              id="register-phone"
              className={`w-full px-3 py-2 border ${errors.phone ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500`}
              placeholder="+54 11 1234-5678"
              value={registerData.phone}
              onChange={(e) => handleChange(e, "phone")}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">
                El numero de telefono es obligatorio.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="register-password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="register-password"
              className={`w-full px-3 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500`}
              placeholder="••••••••"
              value={registerData.password}
              onChange={(e) => handleChange(e, "password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">
                La contraseña es obligatoria.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="register-confirm-password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirmar contraseña
            </label>
            <input
              type="password"
              id="register-confirm-password"
              className={`w-full px-3 py-2 border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500`}
              placeholder="••••••••"
              value={registerData.confirmPassword}
              onChange={(e) => handleChange(e, "confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                Debes confirmar la contraseña.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 transition-colors"
            onClick={handleOnSubmit}
          >
            Crear Cuenta
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
            } catch (error: any) {
              toast.error(error?.message || "Error al continuar con Google", { duration: 3000 })
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
