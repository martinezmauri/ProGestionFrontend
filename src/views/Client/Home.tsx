import React from "react";
import styles from "./HomeClient.module.css";
import { Dashboard } from "../../components/Sidebar/Dashboard";
import { Link } from "react-router-dom";

export const HomeClient = () => {
  return (
    <div className="flex">
      <Dashboard />
      <main>
        <div className="pt-[10vh] pl-[40vh] grid grid-cols-3 grid-rows-2 gap-[30px] text-[#295366] font-bold">
          <div className="bg-[#fbf8ef] rounded-xl p-[20px]">
            <Link to={"/personal"} className="text-center">
              <img
                className="p-[20px] w-[150px]"
                src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745446184/moepwmyrbvrrblfjvwpo.png"
                alt="Logo referido a la vista PERSONAL"
              />
              <p>PERSONAL</p>
            </Link>
          </div>
          <div className="bg-[#fbf8ef] rounded-xl p-[20px]">
            <Link to={"/services"} className="text-center">
              <img
                className="p-[20px] w-[150px]"
                src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745446203/kqweob0pxuuhpbiifgtu.png"
                alt="Logo sobre SERVICIOS"
              />
              <p>SERVICIOS</p>
            </Link>
          </div>
          <div className="bg-[#fbf8ef] rounded-xl p-[20px]">
            <Link to={"/turnos"} className="text-center">
              <img
                className="p-[20px] w-[150px]"
                src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745446222/u2erdekuep0dos7lqr2o.png"
                alt="Logo sobre TURNOS"
              />
              <p>TURNOS</p>
            </Link>
          </div>
          <div className="bg-[#fbf8ef] rounded-xl p-[20px]">
            <Link to={"/register-business"} className="text-center">
              <img
                className="p-[20px] w-[150px]"
                src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745446236/rwpjzqtno1fjvmjfvlb8.png"
                alt="Logo sobre EMPRESA"
              />
              <p>EMPRESA</p>
            </Link>
          </div>
          <div className="bg-[#fbf8ef] rounded-xl p-[20px]">
            <Link to={"/ajustes"} className="text-center">
              <img
                className="p-[20px] w-[150px]"
                src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745446255/aghzamax91klrtunfudb.png"
                alt="Logo sobre CONFIGURACION"
              />
              <p>CONFIGURACION</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
