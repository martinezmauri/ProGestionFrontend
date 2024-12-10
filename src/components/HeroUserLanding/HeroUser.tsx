import React, { useState } from "react";
import styles from "./HeroUser.module.css";

export const HeroUser = () => {
  const [searchData, setSearchData] = useState({
    nameEstablishment: "",
    location: "",
    category: "",
  });
  const [labelVisibility, setLabelVisibility] = useState({
    nameEstablishment: true,
    location: true,
    category: true,
  });

  const handleLabelClick = (field: string) => {
    setLabelVisibility((prevState) => ({
      ...prevState,
      [field]: false,
    }));
  };

  const handleBlur = (field: string) => {
    setLabelVisibility((prevState) => ({
      ...prevState,
      [field]: searchData[field as keyof typeof searchData] === "",
    }));
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setSearchData((prevState) => ({
      ...prevState,
      [field]: event.target.value,
    }));
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
          <section>
            <label
              htmlFor="establishment"
              className={styles.labelForm}
              style={{
                display: labelVisibility.nameEstablishment ? "block" : "none",
              }}
            >
              <img
                src="src/assets/search-logo.png"
                alt=""
                className={styles.inputIcon}
              />
              Nombre del establecimiento
            </label>
            <input
              type="text"
              id="establishment"
              className={styles.inputForm}
              value={searchData.nameEstablishment}
              onChange={(event) => handleChange(event, "nameEstablishment")}
              onClick={() => handleLabelClick("nameEstablishment")}
              onBlur={() => handleBlur("nameEstablishment")}
            />
          </section>
          <section>
            <label
              htmlFor="location"
              className={styles.labelForm}
              style={{
                display: labelVisibility.location ? "block" : "none",
              }}
            >
              <img
                src="src/assets/location-logo.png"
                alt=""
                className={styles.inputIcon}
              />
              Selecciona tu localidad
            </label>
            <input
              type="text"
              id="location"
              className={styles.inputForm}
              value={searchData.location}
              onChange={(event) => handleChange(event, "location")}
              onClick={() => handleLabelClick("location")}
              onBlur={() => handleBlur("location")}
            />
          </section>
        </div>
        <section className={styles.categoryContainer}>
          <label
            htmlFor="category"
            className={styles.labelCategory}
            style={{
              display: labelVisibility.category ? "block" : "none",
            }}
          >
            <img
              src="src/assets/box-logo.png"
              alt=""
              className={styles.inputIcon}
            />
            Selecciona la categoria
          </label>
          <input
            type="text"
            id="category"
            className={styles.categoryForm}
            value={searchData.category}
            onChange={(event) => handleChange(event, "category")}
            onClick={() => handleLabelClick("category")}
            onBlur={() => handleBlur("category")}
          />
        </section>
        <div className={styles.containerButton}>
          <button className={styles.buttonSearch}>Buscar</button>
        </div>
      </form>
    </main>
  );
};
