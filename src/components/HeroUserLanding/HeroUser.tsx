import React, { useEffect, useState } from "react";
import styles from "./HeroUser.module.css";
import category from "../../helpers/category.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface ICategory {
  id: number;
  name: string;
}

export const HeroUser = () => {
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

  const navigate = useNavigate();

  useEffect(() => {
    setCategories(category);
  }, []);

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
    console.log(event.target.value);

    setSearchBusiness((prevState) => ({
      ...prevState,
      [field]: event.target.value,
    }));
  };

  const handleOnSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:8080/api/v0/business/search?name=&${searchBusiness.nameEstablishment}&category=${searchBusiness.category}&city=${searchBusiness.location}`
      );
      if (response.status !== 200) {
        throw new Error("Error en la busqueda.");
      }

      setResultSearch(response.data);

      navigate("/search", { state: { searchBusiness, resultSearch } });
    } catch (error) {
      console.error("Error al realizar la busqueda.", error);
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
                src="src/assets/search-logo.png"
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
                src="src/assets/location-logo.png"
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
          <button className={styles.buttonSearch} onClick={handleOnSubmit}>
            Buscar
          </button>
        </div>
      </form>
    </main>
  );
};
