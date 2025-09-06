import { useState } from "react";
import users from "@helpers/DataBase/user.json";
import address from "@helpers/DataBase/address.json";
import categories from "@helpers/DataBase/category.json";
import business from "@helpers/DataBase/business.json";
import services from "@helpers/DataBase/service.json";
import employees from "@helpers/DataBase/employee.json";
import businessSchedule from "../../helpers/DataBase/businessSchedule.json";
import employeeSchedule from "@helpers/DataBase/employeeSchedule.json";
import axios from "axios";

export const useSeedData = () => {
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar el loading

  const seedData = async () => {
    console.log("Cargando datos....");

    setIsLoading(true); // Activar loading
    try {
      // Creación de usuarios
      for (const user of users) {
        await axios.post("http://localhost:8080/api/v0/user/save", user);
      }

      // Creación de direcciones
      for (const add of address) {
        await axios.post("http://localhost:8080/api/v0/address/save", add);
      }

      // Creación de categorías
      for (const category of categories) {
        await axios.post(
          "http://localhost:8080/api/v0/category/save",
          category
        );
      }

      // Creación de negocios
      for (const bus of business) {
        await axios.post("http://localhost:8080/api/v0/business/save", bus);
      }

      // Creación de servicios
      for (const service of services) {
        await axios.post("http://localhost:8080/api/v0/service/save", service);
      }

      // Creación de empleados
      for (const employee of employees) {
        await axios.post(
          "http://localhost:8080/api/v0/employee/save",
          employee
        );
      }

      // Creación de horarios para los negocios
      const businessIds = ["1", "2", "3"];
      for (const businessId of businessIds) {
        await axios.post(
          `http://localhost:8080/api/v0/business/${businessId}/hours`,
          businessSchedule
        );
      }

      // Creación de horarios para los empleados
      const employeesIds = ["1", "2", "3"];
      for (const employeeId of employeesIds) {
        await axios.post(
          `http://localhost:8080/api/v0/employees/${employeeId}/hours`,
          employeeSchedule
        );
      }
    } catch (error) {
      console.error("Error al cargar los datos", error);
    } finally {
      setIsLoading(false); // Desactivar loading
      console.log("Datos cargados correctamente");
    }
  };

  return { seedData, isLoading };
};
