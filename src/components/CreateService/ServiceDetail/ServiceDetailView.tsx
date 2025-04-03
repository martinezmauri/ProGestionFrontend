import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./ServiceDetailView.module.css";
import { IService } from "../../../interfaces/IService";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const request = id
      ? axios.put(`http://localhost:8080/api/v0/service/update/${id}`, service)
      : axios.post("http://localhost:8080/api/v0/service/save", service);

    request
      .then(() => navigate("/services"))
      .catch((error) => console.error("Error saving service:", error));
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>SERVICIOS EDIT</h1>
      <div className={styles.form}>
        <input type="text" name="name" placeholder="Nombre" value={service.name} onChange={handleChange} />
        <div className={styles.inlineInputs}>
          <div>
            <span>Precio</span>
            <input type="number" name="price" value={service.price} onChange={handleChange} />
          </div>
          <div>
            <span>Duración estimada</span>
            <input type="number" name="duration" value={service.duration} onChange={handleChange} />
          </div>
        </div>
        <textarea name="description" placeholder="Descripción" value={service.description} onChange={handleChange} />
      </div>
      <div className={styles.buttons}>
        <button onClick={() => navigate("/services")} className={styles.backButton}>
          Volver
        </button>
        <button onClick={handleSave} className={styles.saveButton}>
          Crear y aceptar
        </button>
      </div>
    </section>
  );
};
