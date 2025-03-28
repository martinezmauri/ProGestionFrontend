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
                value={searchData.nameEstablishment}
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
                value={searchData.location}
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
            <img
              src="src/assets/box-logo.png"
              alt=""
              className={styles.inputIcon}
            />
            <input
              type="text"
              id="category"
              className={styles.categoryForm}
              value={searchData.category}
              onChange={(event) => handleChange(event, "category")}
              onFocus={() => handleLabelClick("category")}
              onBlur={() => handleBlur("category")}
            />
            {labelVisibility.category && (
              <label htmlFor="category" className={styles.labelCategory}>
                Selecciona la categoria
              </label>
            )}
          </div>
        </section>
        <div className={styles.containerButton}>
          <button className={styles.buttonSearch}>Buscar</button>
        </div>
      </form>
    </main>
  );
};
