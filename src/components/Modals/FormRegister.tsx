import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  CircleUserRound,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Phone,
  X,
} from "lucide-react";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { Rol } from "@enum/UserRol";
import { toast } from "sonner";
import { useAuth } from "@context/AuthContext";

interface ModalProps {
  onClose: () => void;
  onOpenLogin: () => void;
}

export const FormRegister = ({ onClose, onOpenLogin }: ModalProps) => {
  const navigate = useNavigate();
  const { login } = useAuth();
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
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signUp`,
        {
          name: registerData.nameUser,
          password: registerData.password,
          phone: registerData.phone,
          email: registerData.email,
          confirmPassword: registerData.confirmPassword,
        }
      );

      if (response.status === 201) {
        const { id, token } = response.data;
        login(id, token);
        onClose();
        toast.success("Usuario registrado!", {
          description: "Te has registrado correctamente.",
          icon: <CheckCircle2 className="h-4 w-4" />,
          duration: 3000,
        });
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Ocurrió un error inesperado";
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
              className={`w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
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
              className={`w-full px-3 py-2 border ${
                errors.nameUser ? "border-red-500" : "border-gray-300"
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
              className={`w-full px-3 py-2 border ${
                errors.phone ? "border-red-500" : "border-gray-300"
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
              className={`w-full px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
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
              className={`w-full px-3 py-2 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
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
      </div>
    </div>
  );
};
