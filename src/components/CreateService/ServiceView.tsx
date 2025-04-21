import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./serviceView.module.css";
import { IService } from "../../interfaces/IService";
import { Dashboard } from "../Dashboard/Dashboard";

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
    <section className={styles.heroMain}>
      <Dashboard extend={false} />
      <div className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>SERVICIOS</h1>
          {services.map((service) => (
            <div key={service.id} className={styles.itemList}>
              <input type="text" placeholder={service.name} readOnly />
              <input type="text" placeholder={service.description} readOnly />
              <input
                type="text"
                placeholder={`${service.duration} min`}
                readOnly
              />
              <input type="text" placeholder={`$${service.price}`} readOnly />
              <button onClick={() => navigate(`/services/edit/${service.id}`)}>
                Editar
              </button>
              <button onClick={() => handleDelete(service.id)}>Eliminar</button>
            </div>
          ))}
          <div className={styles.addServiceContainer}>
            <button
              className={styles.addButton}
              onClick={() => navigate("/services/new")}
            >
              +
            </button>
          </div>
        </div>
        <div className={styles.containerButtons}>
          <button
            style={{ backgroundColor: "#295366" }}
            onClick={() => navigate("/")}
          >
            Volver
          </button>
          <button
            style={{ backgroundColor: "#F96E2A" }}
            onClick={() => navigate("/homeclient")}
          >
            Aceptar y Guardar
          </button>
        </div>
      </div>
    </section>
  );
};
