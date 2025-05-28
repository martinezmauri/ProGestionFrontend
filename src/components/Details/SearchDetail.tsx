import React from "react";
import { IAddress } from "../../interfaces/IAddress";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PropsBusiness {
  id: string;
  logo: string;
  name: string;
  address: IAddress;
  open: boolean;
}

export const SearchDetail = ({ business }: { business: PropsBusiness[] }) => {
  const navigate = useNavigate();

  const handleOnClick = (id: string) => {
    navigate(`/appointment/${id}`);
  };
  return (
    <div>
      {business.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5 p-[2vh]">
          {business.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOnClick(item.id)}
              className="bg-[#295366] rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              <img
                src={item.logo}
                alt="Imagen del negocio"
                className="w-full h-[125px] rounded-xl object-cover"
              />
              <div className="py-[10px] px-[10px]">
                <h1 className="text-[1.2em] font-semibold text-white">
                  {item.name}
                </h1>
                <div className="flex gap-[5px] items-center">
                  <MapPin color="#ffffff" className="w-[15px] h-[15px]" />
                  <p className="text-[0.8em] text-white">
                    {item.address?.street}
                  </p>
                </div>
              </div>

              {item.open ? (
                <p className="text-green-500 text-[0.8em] pl-3 p-3">
                  Abierto ahora mismo.
                </p>
              ) : (
                <p className="text-red-500 text-[0.8em] pl-3 p-3">
                  Cerrado ahora mismo.
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-black text-[1.3em] font-light text-center mt-[40px]">
          No se han encontrado establecimientos.
        </p>
      )}
    </div>
  );
};
