import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { IService } from "../../interfaces/IService";
import { Dashboard } from "../Sidebar/Dashboard";
/* Esta vista crea uno nuevo, no actualiza el anterior y tambien hay q revisar el useParams */
export const ServiceDetailView = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [service, setService] = useState<IService>({
    id: "",
    name: "",
    duration: 0,
    description: "",
    price: 0,
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/api/v0/service/${id}`)
        .then((response) => setService(response.data))
        .catch((error) => console.error("Error fetching service:", error));
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Service to save:", service);

    const request = id
      ? axios.put(`http://localhost:8080/api/v0/service/update/${id}`, service)
      : axios.post("http://localhost:8080/api/v0/service/save", {
          ...service,
          businessId: "1",
        });

    request
      .then(() => navigate("/services"))
      .catch((error) => console.error("Error saving service:", error));
  };

  return (
    <section className="flex w-full">
      <Dashboard />
      <div className="flex flex-col items-center justify-center bg-[#c9e6f0] p-[20px] rounded-lg w-[400px] m-auto">
        <h1 className="text-[#f96e2a] text-[24px] font-bold">SERVICIOS EDIT</h1>
        <div className="w-full flex flex-col gap-[10px]">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={service.name}
            onChange={handleChange}
            className="w-full p-[8px] rounded-lg border-1 border-[#78b3ce]"
          />
          <div className="flex gap-10">
            <div className="flex flex-col items-center">
              <span>Precio</span>
              <input
                type="number"
                name="price"
                value={service.price}
                onChange={handleChange}
                className="w-full p-[8px] rounded-lg border-1 border-[#78b3ce]"
              />
            </div>
            <div className="flex flex-col items-center">
              <span>Duración estimada</span>
              <input
                type="number"
                name="duration"
                value={service.duration}
                onChange={handleChange}
                className="w-full p-[8px] rounded-lg border-1 border-[#78b3ce]"
              />
            </div>
          </div>
          <textarea
            name="description"
            placeholder="Descripción"
            value={service.description}
            onChange={handleChange}
            className="w-full p-[8px] rounded-lg border-1 border-[#78b3ce]"
          />
        </div>
        <div className="flex gap-5 mt-[10px]">
          <button
            onClick={() => navigate("/services")}
            className="bg-[#295366] text-white p-[10px] border-none rounded-lg"
          >
            Volver
          </button>
          <button
            onClick={handleSave}
            className="bg-[#f96e2a] text-white p-[10px] borded-none rounded-lg"
          >
            {id ? "Guardar cambios" : "Crear y aceptar"}
          </button>
        </div>
      </div>
    </section>
  );
};
