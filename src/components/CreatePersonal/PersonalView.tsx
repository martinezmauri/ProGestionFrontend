import React, { useEffect, useState } from "react";
import styles from "./PersonalView.module.css";
import employee from "../../helpers/Employee.json";
import { IEmployee } from "../../interfaces/IEmployee";
import { Rol } from "../../enum/UserRol";
import { useNavigate } from "react-router-dom";
import { Dashboard } from "../Dashboard/Dashboard";

export const PersonalView = () => {
  /* debemos tener en cuenta el plan seleccionado aqui para restringir la cantidad de empleados*/
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const navigate = useNavigate();
  const roles = Object.values(Rol);

  useEffect(() => {
    setEmployees(employee);
  }, []);

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/personal/edit");
  };

  return (
    <section className={styles.hero}>
      <Dashboard extend={false} />
      <div className={styles.containerMain}>
        <div className={styles.container}>
          <h1 className={styles.title}>PERSONAL</h1>
          {employees.map((employee, index) => (
            <div key={employee.id} className={styles.itemList}>
              <img src={employee.profilePicture} alt="Imagen de usuario" />
              <span className={`${styles.infoUser} ${styles.spanName}`}>
                {employee.name}
              </span>
              <div className={styles.containerSchedule}>
                <h5>De:</h5>
                <span className={`${styles.infoUser} ${styles.spanSchedule}`}>
                  {employee.WorkSchedule}
                </span>
                <h5>Hasta:</h5>
                <span className={`${styles.infoUser} ${styles.spanSchedule}`}>
                  {employee.WorkSchedule}
                </span>
              </div>
              <span className={`${styles.infoUser} ${styles.spanService}`}>
                {employee.service}
              </span>
              <select className={styles.rol}>
                {roles.map((role) => (
                  <option value={role} key={role}>
                    {role}
                  </option>
                ))}
              </select>
              <button>Editar</button> {/* Abre el viewDetail (modal) */}
              <button>Eliminar</button>
            </div>
          ))}
          <div className={styles.addEmployeeContainer}>
            <img
              src="src/assets/user-logo.png"
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
