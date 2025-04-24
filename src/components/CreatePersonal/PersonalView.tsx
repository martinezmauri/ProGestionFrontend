import React, { useEffect, useState } from "react";
import styles from "./PersonalView.module.css";
import employee from "../../helpers/Employee.json";
import { IEmployee } from "../../interfaces/IEmployee";
import { Rol } from "../../enum/UserRol";
import { useNavigate } from "react-router-dom";
import { Dashboard } from "../Dashboard/Dashboard";
import axios from "axios";
import deleteEmployee from "../../api/deleteEmployee";

export const PersonalView = () => {
  /* debemos tener en cuenta el plan seleccionado aqui para restringir la cantidad de empleados*/
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const navigate = useNavigate();

  /* Un get que traiga los empleados por el businessID y los empleados no estan bindeados al servicio */
  const imageDefault = "src/assets/employee-logo.png";
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v0/employee/findAll"
        );
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
    employeeID: string
  ) => {
    event.preventDefault();
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
    <section className={styles.hero}>
      <Dashboard extend={false} />
      <div className={styles.containerMain}>
        <div className={styles.container}>
          <h1 className={styles.title}>PERSONAL</h1>
          {employees.map((employee, index) => (
            <div key={employee.id} className={styles.itemList}>
              <img
                className={styles.profileImage}
                src={employee.profilePicture ?? imageDefault}
                alt="Imagen de usuario"
              />
              <span className={`${styles.infoUser} ${styles.spanName}`}>
                {employee.name}
              </span>
              <div className={styles.containerSchedule}>
                <h5>De:</h5>
                <span className={`${styles.infoUser} ${styles.spanSchedule}`}>
                  12
                </span>
                <h5>Hasta:</h5>
                <span className={`${styles.infoUser} ${styles.spanSchedule}`}>
                  12
                </span>
              </div>
              <span className={`${styles.infoUser} ${styles.spanService}`}>
                {employee.service}
              </span>
              <span className={styles.rol}>Employee</span>
              <div className={styles.buttonsActions}>
                <img
                  className={styles.actionsLogo}
                  src="src/assets/logo-editar.png"
                  alt=""
                />
                <button onClick={handleOnClick}>Editar</button>
              </div>
              <div className={styles.buttonsActions}>
                <img
                  className={styles.actionsLogo}
                  src="src/assets/logo-eliminar.png"
                  alt=""
                />
                <button onClick={(e) => handleOnClickDelete(e, employee.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <div className={styles.addEmployeeContainer}>
            <img
              src="src/assets/employee-logo.png"
              alt="Agregar empleado"
              className={styles.addProfileImage}
            />
            <button className={styles.addButton} onClick={handleOnClick}>
              +
            </button>
          </div>
        </div>
        <div className={styles.containerButtons}>
          <button style={{ backgroundColor: "#295366" }}>Volver</button>
          <button style={{ backgroundColor: "#F96E2A" }}>
            Crear y aceptar
          </button>
        </div>
      </div>
    </section>
  );
};
