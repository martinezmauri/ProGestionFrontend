import React, { useEffect, useState } from "react";
import styles from "./PersonalView.module.css";
import employee from "../../helpers/Employee.json";
import { IEmployee } from "../../interfaces/IEmployee";
import { Dashboard } from "../Dashboard/Dashboard";

export const PersonalView = () => {
  /* debemos tener en cuenta el plan seleccionado aqui para restringir la cantidad de empleados*/
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState<IEmployee>({
    id: "",
    name: "",
    profile_picture: "src/assets/user-logo.png",
    WorkSchedule: "",
    service: "",
    rol: "",
  });

  useEffect(() => {
    setEmployees(employee);
  }, []);

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setNewEmployee({
      id: "",
      name: "",
      profile_picture: "src/assets/user-logo.png",
      WorkSchedule: "",
      service: "",
      rol: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!newEmployee.name || !newEmployee.WorkSchedule || !newEmployee.rol)
      return;

    setEmployees([
      ...employees,
      { ...newEmployee, id: (employees.length + 1).toString() },
    ]);
    handleCloseForm();
  };

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>PERSONAL</h1>
        {employees.map((employee, index) => (
          <div key={employee.id} className={styles.itemList}>
            <img src={employee.profile_picture} alt="Imagen de usuario" />
            <input type="text" placeholder={employee.name} />
            <input type="text" placeholder={employee.WorkSchedule} />
            <input type="text" placeholder={employee.service} />
            <input type="text" placeholder={employee.rol} />
            <button>Editar</button> {/* Abre el viewDetail (modal) */}
            <button>Eliminar</button>
          </div>
        ))}
        {!showForm && (
          <div className={styles.addEmployeeContainer} onClick={handleOpenForm}>
            <img
              src="src/assets/user-logo.png"
              alt="Agregar empleado"
              className={styles.addProfileImage}
            />
            <button className={styles.addButton}>+</button>
          </div>
        )}
        {showForm && (
          <div className={styles.itemList}>
            <img src="src/assets/user-logo.png" alt="" />
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={newEmployee.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="WorkSchedule"
              placeholder="Work Schedule"
              value={newEmployee.WorkSchedule}
              onChange={handleChange}
            />
            <input
              type="text"
              name="service"
              placeholder="Servicio"
              value={newEmployee.service}
              onChange={handleChange}
            />
            <input
              type="text"
              name="rol"
              placeholder="Rol"
              value={newEmployee.rol}
              onChange={handleChange}
            />
            <div className={styles.formButtons}>
              <button onClick={handleSave}>Guardar</button>
              <button onClick={handleCloseForm}>Cancelar</button>
            </div>
          </div>
        )}
      </div>
      <div className={styles.containerButtons}>
        <button style={{ backgroundColor: "#295366" }}>Volver</button>
        <button style={{ backgroundColor: "#F96E2A" }}>Crear y aceptar</button>
      </div>
    </section>
  );
};
