import { useEffect, useState } from "react";
import styles from "./FormLogin.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Eye, EyeOff, LockKeyhole, Mail, X } from "lucide-react";
import { Input } from "@ui/input";
import { Button } from "@ui/button";

interface ModalProps {
  onClose: () => void;
  onOpenRegister: () => void;
}
export const FormLogin = ({ onClose, onOpenRegister }: ModalProps) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [labelVisibility, setLabelVisibility] = useState({
    email: true,
    password: true,
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { loginWithRedirect } = useAuth0();

  const handleLabelClick = (field: string) => {
    setLabelVisibility((prevState) => ({
      ...prevState,
      [field]: false,
    }));
  };

  const handleBlur = (field: string) => {
    setLabelVisibility((prevState) => ({
      ...prevState,
      [field]: loginData[field as keyof typeof loginData] === "",
    }));
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setLoginData((prevState) => ({
      ...prevState,
      [field]: event.target.value,
    }));
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
    <main className="fixed bg-[#000000e7] top-0 left-0 w-[100%] h-[100%] z-1000 flex justify-center items-center text-[#fff]">
      <div
        className="absolute top-0 left-0 w-[100%] h-[100%] bg-[#00000000] z-1"
        onClick={onClose}
      ></div>
      <div className="relative z-2 bg-[#000000e7] rounded-3xl p-[20px] w-[100%] flex flex-col max-w-[450px] max-h-[550px]">
        <section className="flex flex-col w-[65%]">
          <h1 className="font-medium text-[1.2em]">Iniciar Sesión</h1>
          <p className="text-[0.8em] font-light">
            Si no tienes una cuenta creada puedes
          </p>
          <button
            onClick={onOpenRegister}
            className="text-[0.8em] cursor-pointer w-[110px] underline"
          >
            Registrarte aqui!
          </button>
          <X
            onClick={onClose}
            className="cursor-pointer absolute right-[20px] w-[30px]"
          />
        </section>
        <form className="mt-5">
          <section>
            <h5 className="text-[0.8em]">Email</h5>
            <div className="flex relative items-center w-full">
              <Mail
                color="#ffffff"
                className="absolute w-[20px] mr-[10px] pl-1"
              />
              <Input
                type="email"
                value={loginData.email}
                onChange={(event) => handleChange(event, "email")}
                name="email"
                id="email"
                className="pl-7  text-white"
                placeholder="Email"
              />
            </div>
          </section>
          <section className="mt-2">
            <h5 className="text-[0.8em]">Contraseña</h5>
            <div className="flex relative items-center w-full">
              <LockKeyhole
                color="#ffffff"
                className="absolute w-[20px] mr-[10px] pl-1"
              />
              <Input
                type={isPasswordVisible ? "text" : "password"}
                className="pl-7  text-white"
                onChange={(event) => handleChange(event, "password")}
                value={loginData.password}
                placeholder="Contraseña"
              />
              {isPasswordVisible ? (
                <Eye
                  color="#ffffff"
                  onClick={togglePasswordVisibility}
                  className="absolute right-[20px] w-[20px]"
                />
              ) : (
                <EyeOff
                  color="#ffffff"
                  onClick={togglePasswordVisibility}
                  className="absolute right-[20px] w-[20px]"
                />
              )}
            </div>
          </section>
          <section className="flex flex-col mt-2">
            <div>
              <input type="checkbox" id="remember-me" className="w-[15px] " />
              <label htmlFor="remember-me" className="text-[0.8em] pl-[0.5rem]">
                Mantener sesión iniciada
              </label>
            </div>
            <div>
              <a className="text-white text-[0.8em] pl-[15rem]">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </section>
          <Button className="bg-[#353535] mt-[15px] mb-[15px] w-full h-full border-none cursor-pointer">
            Iniciar Sesión
          </Button>
        </form>
        <section>
          <h1 className="text-[0.8em] font-light">O puedes iniciar con:</h1>
          <div className="flex flex-row justify-center gap-5 mt-5">
            <Button
              onClick={() => handleRedirectLogin("facebook")}
              variant={"default"}
              className="w-15 h-full"
            >
              <img
                className="w-10"
                src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745445649/qrubt0avnlt3w3gz48kn.png"
                alt="Logo de facebook"
              />
            </Button>

            <Button
              onClick={() => handleRedirectLogin("apple")}
              variant={"default"}
              className="w-15 h-full"
            >
              <img
                className="w-10"
                src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745445629/oanftqh36xcvujdeoodr.png"
                alt="Logo de apple"
              />
            </Button>
            <Button
              onClick={() => handleRedirectLogin("google-oauth2")}
              variant={"default"}
              className="w-15 h-full"
            >
              <img
                className="w-10"
                src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745445666/r8xibykn0lqfspnslacj.png"
                alt="Logo de google"
              />
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
};
