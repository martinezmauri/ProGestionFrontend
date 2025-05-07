import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
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

interface ModalProps {
  onClose: () => void;
  onOpenLogin: () => void;
}
export const FormRegister = ({ onClose, onOpenLogin }: ModalProps) => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    email: "",
    nameUser: "",
    phone: "",
    password: "",
    confirmPassword: "",
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
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v0/user/save",
        {
          name: registerData.nameUser,
          password: registerData.password,
          phoneNumber: registerData.phone,
          email: registerData.email,
          role: "CLIENT",
        }
      );

      if (response.status === 201) {
        navigate("/registerBusiness");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="fixed bg-[#000000e7] top-0 left-0 w-[100%] h-[100%] z-1000 flex justify-center items-center text-[#fff]">
      <div
        className="absolute top-0 left-0 w-[100%] h-[100%] bg-[#00000000] z-1"
        onClick={onClose}
      ></div>
      <div className="relative z-2 bg-[#000000e7] rounded-3xl p-[20px] w-[100%] flex flex-col max-w-[450px] max-h-[550px]">
        <section className="flex flex-col">
          <h1 className="font-medium text-[1.2em]">Registrarse</h1>
          <p className="font-light text-[0.8em]">
            Si ya tienes una cuenta creada inicia sesión
          </p>
          <button
            onClick={onOpenLogin}
            className="text-[0.8em] cursor-pointer w-[40px] underline"
          >
            Aqui!
          </button>
          <X
            onClick={onClose}
            className="cursor-pointer absolute right-[20px] w-[30px]"
          />
        </section>
        <form
          onSubmit={handleOnSubmit}
          className="mt-[15px] flex flex-col gap-3"
        >
          <section>
            <h5 className="text-[0.8em]">Email</h5>
            <div className="flex relative items-center w-full">
              <Mail
                color="#ffffff"
                className="absolute w-[20px] mr-[10px] pl-1"
              />
              <Input
                type="email"
                value={registerData.email}
                onChange={(event) => handleChange(event, "email")}
                className="pl-7  text-white"
                placeholder="Email"
              />
            </div>
          </section>
          <section>
            <h5 className="text-[0.8em]">Nombre de Usuario</h5>
            <div className="flex relative items-center w-full">
              <CircleUserRound
                color="#ffffff"
                className="absolute w-[20px] mr-[10px] pl-1"
              />
              <Input
                type="text"
                value={registerData.nameUser}
                onChange={(event) => handleChange(event, "nameUser")}
                className="pl-7 text-white"
                placeholder="Nombre de usuario"
              />
            </div>
          </section>
          <section>
            <h5 className="text-[0.8em]">Numero de telefono</h5>
            <div className="flex relative items-center w-full">
              <Phone
                color="#ffffff"
                className="absolute w-[20px] mr-[10px] pl-1"
              />
              <Input
                type="number"
                value={registerData.phone}
                onChange={(event) => handleChange(event, "phone")}
                className="pl-7 text-white no-spinner"
                placeholder="Numero de telefono"
              />
            </div>
          </section>
          <section>
            <h5 className="text-[0.8em]">Contraseña</h5>
            <div className="flex relative items-center w-full">
              <LockKeyhole
                color="#ffffff"
                className="absolute w-[20px] mr-[10px] pl-1"
              />
              <Input
                type={passwordVisibility.password ? "text" : "password"}
                value={registerData.password}
                onChange={(event) => handleChange(event, "password")}
                className="pl-7 text-white"
                placeholder="Contraseña"
              />
              {passwordVisibility.password ? (
                <Eye
                  color="#ffffff"
                  onClick={() => togglePasswordVisibility("password")}
                  className="absolute right-[20px] w-[20px]"
                />
              ) : (
                <EyeOff
                  color="#ffffff"
                  onClick={() => togglePasswordVisibility("password")}
                  className="absolute right-[20px] w-[20px]"
                />
              )}
            </div>
          </section>
          <section>
            <h5 className="text-[0.8em]">Confirmar Contraseña</h5>
            <div className="flex relative items-center w-full">
              <LockKeyhole
                color="#ffffff"
                className="absolute w-[20px] mr-[10px] pl-1"
              />
              <Input
                type={passwordVisibility.confirmPassword ? "text" : "password"}
                value={registerData.confirmPassword}
                onChange={(event) => handleChange(event, "confirmPassword")}
                className="pl-7 text-white"
                placeholder="Confirmar contraseña"
              />

              {passwordVisibility.confirmPassword ? (
                <Eye
                  color="#ffffff"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className="absolute right-[20px] w-[20px]"
                />
              ) : (
                <EyeOff
                  color="#ffffff"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className="absolute right-[20px] w-[20px]"
                />
              )}
            </div>
          </section>
          <Button className="bg-[#353535] mt-[15px] mb-[15px] w-full h-full border-none cursor-pointer">
            Registrarse
          </Button>
        </form>
      </div>
    </main>
  );
};
