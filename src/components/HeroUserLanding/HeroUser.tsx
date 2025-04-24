import React, { useEffect, useRef, useState } from "react";
import styles from "./HeroUser.module.css";
import category from "../../helpers/category.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";

interface ICategory {
  id: number;
  name: string;
}

export const HeroUser = () => {
  const { isAuthenticated } = useAuth0();
  const [searchBusiness, setSearchBusiness] = useState({
    nameEstablishment: "",
    location: "",
    category: "",
  });
  const [labelVisibility, setLabelVisibility] = useState({
    nameEstablishment: true,
    location: true,
    category: true,
  });
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [resultSearch, setResultSearch] = useState();
  const showWelcome = useRef(false);

  const navigate = useNavigate();

  useEffect(() => {
    setCategories(category);
  }, []);

  useEffect(() => {
    if (isAuthenticated && !showWelcome.current) {
      Swal.fire({
        title: "Bienvenido!",
        icon: "success",
      });
      showWelcome.current = true;
    }
  }, [isAuthenticated]);

  const handleLabelClick = (field: string) => {
    setLabelVisibility((prevState) => ({
      ...prevState,
      [field]: false,
    }));
  };

  const handleBlur = (field: string) => {
    setLabelVisibility((prevState) => ({
      ...prevState,
      [field]: searchBusiness[field as keyof typeof searchBusiness] === "",
    }));
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string
  ) => {
    setSearchBusiness((prevState) => ({
      ...prevState,
      [field]: event.target.value,
    }));
  };

  const handleOnSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        "http://localhost:8080/api/v0/business/search",
        {
          params: {
            name: searchBusiness.nameEstablishment,
            category: searchBusiness.category,
            city: searchBusiness.location,
          },
        }
      );

      setResultSearch(response.data);
    } catch (error) {
      console.error("Error al realizar la busqueda.", error);
    } finally {
      navigate("/search", {
        state: { searchBusiness, resultSearch },
      });
    }
  };

  return (
    <main className={styles.hero}>
      <section className={styles.description}>
        <h1>Sacá tu turno de manera facil y rapida</h1>
        <p>
          Seleccioná tu ubicación y elige el establecimiento que mas te
          convenga!
        </p>
      </section>
      <form className={styles.formulary}>
        <div className={styles.formHeader}>
          <section className={styles.sectionForm}>
            <div className={styles.inputWrapper}>
              <img
                src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745445939/d471lx491bxsfuugmohs.png"
                alt=""
                className={styles.inputIcon}
              />
              <input
                type="text"
                id="establishment"
                className={styles.inputForm}
                value={searchBusiness.nameEstablishment}
                onChange={(event) => handleChange(event, "nameEstablishment")}
                onFocus={() => handleLabelClick("nameEstablishment")}
                onBlur={() => handleBlur("nameEstablishment")}
              />
              {labelVisibility.nameEstablishment && (
                <label htmlFor="establishment" className={styles.labelForm}>
                  Nombre del establecimiento
                </label>
              )}
            </div>
          </section>
          <section className={styles.sectionForm}>
            <div className={styles.inputWrapper}>
              <img
                src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745445922/fux2jiezuqbgxf3dr3r8.png"
                alt=""
                className={styles.inputIcon}
              />

              <input
                type="text"
                id="location"
                className={styles.inputForm}
                value={searchBusiness.location}
                onChange={(event) => handleChange(event, "location")}
                onFocus={() => handleLabelClick("location")}
                onBlur={() => handleBlur("location")}
              />
              {labelVisibility.location && (
                <label htmlFor="location" className={styles.labelForm}>
                  Selecciona tu localidad
                </label>
              )}
            </div>
          </section>
        </div>
        <section className={styles.categoryContainer}>
          <div className={styles.inputWrapper}>
            <select
              id="category"
              className={styles.categoryForm}
              value={searchBusiness.category}
              onChange={(event) => handleChange(event, "category")}
            >
              <option value="">Seleccione una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </section>
        <div className={styles.containerButton}>
          <button
            type="button"
            className={styles.buttonSearch}
            onClick={handleOnSubmit}
          >
            Buscar
          </button>
        </div>
      </form>
    </main>
  );
};
