import React, { useEffect, useState } from "react";
import styles from "./serviceView.module.css";
import { IService } from "../../interfaces/IService";

export const ServiceView = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [newService, setNewService] = useState<IService>({
    id: "",
    name: "",
    description: "",
    duration: 0,
    price: 0,
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/v0/services")
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewService({ ...newService, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    fetch("http://localhost:8080/api/v0/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newService),
    })
      .then((response) => response.json())
      .then((data) => setServices([...services, data]))
      .catch((error) => console.error("Error saving service:", error));
  };

  const handleDelete = (id: string) => {
    fetch(`http://localhost:8080/api/v0/services/${id}`, {
      method: "DELETE",
    })
      .then(() => setServices(services.filter((service) => service.id !== id)))
      .catch((error) => console.error("Error deleting service:", error));
  };

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>SERVICIOS</h1>
        {services.map((service) => (
          <div key={service.id} className={styles.itemList}>
            <input type="text" placeholder={service.name} readOnly />
            <input type="text" placeholder={service.description} readOnly />
            <input type="text" placeholder={service.duration.toString()} readOnly />
            <input type="text" placeholder={service.price.toString()} readOnly />
            <button>Editar</button>
            <button onClick={() => handleDelete(service.id)}>Eliminar</button>
          </div>
        ))}
        <div className={styles.addServiceContainer}>
          <button className={styles.addButton} onClick={handleSave}>+</button>
        </div>
      </div>
      <div className={styles.containerButtons}>
        <button style={{ backgroundColor: "#295366" }}>Volver</button>
        <button style={{ backgroundColor: "#F96E2A" }}>Crear y aceptar</button>
      </div>
    </section>
  );
};
