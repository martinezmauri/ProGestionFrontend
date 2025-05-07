import ServicesGrid from "@components/Dropdowns/ServicesGrid";
import { GridFooter } from "@components/Footer/GridFooter";
import Grid from "@components/Grid/Grid";
import { NavbarUser } from "@components/Navbars/NavbarUser";
import useLoadDataGrid from "@hooks/useLoadDataGrid";
import React from "react";
import { useParams } from "react-router-dom";

const AppointmentGrid = () => {
  const { id } = useParams();
  const { dataGrid } = useLoadDataGrid();

  return (
    <div>
      <NavbarUser />
      <div className="p-10 ">
        <div className="bg-[#295366] overflow-hidden rounded-xl">
          <div className="h-[300px] w-full">
            <img
              src={dataGrid?.logo}
              alt="Imagen del Negocio"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-center font-bold text-[2.5em] text-white">
            {dataGrid?.name.toLocaleUpperCase()}
          </h1>
          {dataGrid && <ServicesGrid services={dataGrid?.services} />}
          <Grid />
          <GridFooter />
        </div>
      </div>
    </div>
  );
};

export default AppointmentGrid;
