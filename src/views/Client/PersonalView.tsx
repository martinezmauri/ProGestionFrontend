import React, { useEffect, useState } from "react";

import { IEmployee, IEmployeeResponse } from "../../interfaces/IEmployee";
import { useNavigate } from "react-router-dom";
import { Dashboard } from "../../components/Sidebar/Dashboard";
import axios from "axios";
import deleteEmployee from "../../api/deleteEmployee";

export const PersonalView = () => {
  /* debemos tener en cuenta el plan seleccionado aqui para restringir la cantidad de empleados*/
  const [employees, setEmployees] = useState<IEmployeeResponse[]>([]);
  const navigate = useNavigate();

  const imageDefault = "src/assets/employee-logo.png";
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v0/employee/findAll/1" /* business.id */
        );
        console.log(response.data);

        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/personal/edit");
  };

  /* No permite borrar los empleados por la relacion con EmployeeHours  */
  const handleOnClickDelete = async (
    event: React.MouseEvent<HTMLButtonElement>,
    employeeID: string | null
  ) => {
    event.preventDefault();
    if (!employeeID) return;
    try {
      const response = await deleteEmployee(employeeID);
      if (response === 200) {
        setEmployees((prev) => prev.filter((e) => e.id !== employeeID));
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <section className="flex w-[100vw] min-h-[100vh]">
      <Dashboard />
      <div className="flex justify-center items-center flex-col flex-1">
        <div className="flex flex-col bg-[#35637ac0] rounded-3xl min-w-[60rem]">
          <h1 className="text-center text-[1.5em] p-3 font-semibold border-b">
            PERSONAL
          </h1>
          {employees.map((employee, index) => (
            <div
              key={employee.id}
              className="flex justify-center gap-[30px] p-[20px] max-h-[80px] border-b "
            >
              <img
                className="rounded-3xl w-[40px] bg-[#d9d9d9] p-[0.5vh] min-w-[40px] min-h-[40px]"
                src={employee.profilePicture ?? imageDefault}
                alt="Imagen de usuario"
              />
              <span className="bg-[#b8b6b6] text-black rounded-3xl flex justify-center items-center text-ellipsis w-[150px] max-w-[150px]">
                {employee.name}
              </span>
              <div className="flex gap-[5px] items-center">
                <h5>De:</h5>
                <span className="bg-[#b8b6b6] text-black rounded-3xl flex justify-center items-center text-ellipsis w-[50px] ">
                  12
                </span>
                <h5>Hasta:</h5>
                <span className="bg-[#b8b6b6] text-black rounded-3xl flex justify-center items-center text-ellipsis w-[50px] ">
                  12
                </span>
              </div>
              <span className="bg-[#b8b6b6] text-black rounded-3xl flex justify-center items-center text-ellipsis w-[150px] max-w-[150px] ">
                {employee.service.name}
              </span>
              <span className="min-w-[120px] bg-[#b8b6b6] text-black rounded-3xl flex justify-center items-center">
                Employee
              </span>
              <div className="border p-2 bg-[#fff]  cursor-pointer flex gap-[10px] justify-center items-center">
                <img
                  className="w-[30px] h-[30px]"
                  src="src/assets/logo-editar.png"
                  alt=""
                />
                <button onClick={handleOnClick} className="cursor-pointer">
                  Editar
                </button>
              </div>
              <div className="border p-2 bg-[#fff] cursor-pointer flex gap-[10px] justify-center items-center">
                <img
                  className="w-[30px] h-[30px]"
                  src="src/assets/logo-eliminar.png"
                  alt=""
                />
                <button
                  className="cursor-pointer"
                  onClick={(e) => handleOnClickDelete(e, employee.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <div className="flex  p-[20px] gap-[30px]">
            <img
              src="src/assets/employee-logo.png"
              alt="Agregar empleado"
              className="rounded-3xl w-[40px] bg-[#d9d9d9] p-[0.5vh]"
            />
            <button
              className="w-[40px] h-[40px] rounded-3xl bg-[#fbf8ef] border-none cursor-pointer text-[20px] flex justify-center items-center"
              onClick={handleOnClick}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex gap-[20px] pt-[3vh]">
          <button
            style={{ backgroundColor: "#295366" }}
            className="rounded-xl p-[15px] text-[#fff] cursor-pointer"
          >
            Volver
          </button>
          <button
            style={{ backgroundColor: "#F96E2A" }}
            className="rounded-xl p-[15px] text-[#fff] cursor-pointer"
          >
            Crear y aceptar
          </button>
        </div>
      </div>
    </section>
  );
};
