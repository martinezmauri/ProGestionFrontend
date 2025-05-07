import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IService } from "@interfaces/IService";
import { Dashboard } from "@components/Sidebar/Dashboard";

export const ServiceView = () => {
  const [services, setServices] = useState<IService[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v0/service/findAll")
      .then((response) => setServices(response.data))
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  const handleDelete = (id: string) => {
    axios
      .delete(`http://localhost:8080/api/v0/service/delete/${id}`)
      .then(() =>
        setServices((prev) => prev.filter((service) => service.id !== id))
      )
      .catch((error) => console.error("Error deleting service:", error));
  };

  return (
    <section className="flex w-full">
      <Dashboard />
      <div className="flex flex-col items-center justify-center min-h-[100vh] m-auto">
        <div className="bg-[#78b3ce] p-[20px] rounded-xl w-[80%] max-w-[900px] min-w-[80vh]">
          <h1 className="text-center text-[#fbf8ef] text-[24px] font-bold mb-[15px]">
            SERVICIOS
          </h1>
          {services.map((service) => (
            <div
              key={service.id}
              className="flex items-center justify-between bg-[#c9e6f0] p-[10px] rounded-lg mb-[10px]"
            >
              <input
                className="border-none p-[8px] rounded-lg bg-[#fbf8ef] text-[#295366] text-[14px] w-[18%]"
                type="text"
                placeholder={service.name}
                readOnly
              />
              <input
                className="border-none p-[8px] rounded-lg bg-[#fbf8ef] text-[#295366] text-[14px] w-[18%]"
                type="text"
                placeholder={service.description}
                readOnly
              />
              <input
                className="border-none p-[8px] rounded-lg bg-[#fbf8ef] text-[#295366] text-[14px] w-[18%]"
                type="text"
                placeholder={`${service.duration} min`}
                readOnly
              />
              <input
                className="border-none p-[8px] rounded-lg bg-[#fbf8ef] text-[#295366] text-[14px] w-[18%]"
                type="text"
                placeholder={`$${service.price}`}
                readOnly
              />
              <button
                className="border-none px-[12px] py-[8px] cursor-pointer font-bold text-white"
                onClick={() => navigate(`/services/edit/${service.id}`)}
              >
                Editar
              </button>
              <button
                className="border-none px-[12px] py-[8px] cursor-pointer font-bold text-white"
                onClick={() => handleDelete(service.id)}
              >
                Eliminar
              </button>
            </div>
          ))}
          <div className="flex items-center justify-center bg-[#c9e6f0] p-[10px] rounded-lg cursor-pointer">
            <button
              className="bg-[#f96e2a] border-none text-white text-[24px] px-[12px] py-[8px] rounded-3xl cursor-pointer"
              onClick={() => navigate("/services/new")}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex justify-between w-[80%] max-w-[900px] mt-[20px]">
          <button
            className="px-[15px] py-[10px] rounded-lg text-[16px] cursor-pointer text-white border-none bg-[#295366]"
            onClick={() => navigate("/")}
          >
            Volver
          </button>
          <button
            className="px-[15px] py-[10px] rounded-lg text-[16px] cursor-pointer text-white border-none bg-[#F96E2A]"
            onClick={() => navigate("/homeclient")}
          >
            Aceptar y Guardar
          </button>
        </div>
      </div>
    </section>
  );
};
