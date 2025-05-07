import { Dashboard } from "@components/Sidebar/Dashboard";
import { Card } from "@ui/card";
import React from "react";

export const Support = () => {
  return (
    <div className="flex m-auto">
      <Dashboard />
      <div className="flex justify-center items-center ">
        <Card className="bg-[#295362] flex">
          <h1 className="text-center text-[2em] font-bold">Soporte</h1>
          <div className="flex p-10 gap-5">
            <div className="w-40">
              <p className="text-[1.3em] text-blue-300 font-semibold">
                Comunicate con el equipo de soporte a tráves de:
              </p>
            </div>
            <div className="text-white">
              <h5 className="text-[1.5em] font-semibold">Email</h5>
              <p>progestion@gmail.com</p>
              <h5 className="text-[1.5em] font-semibold">Whatsapp</h5>
              <p>+54 223323452</p>
              <h5 className="text-[1.5em] font-semibold">Instagram</h5>
              <p>@Progestion</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
