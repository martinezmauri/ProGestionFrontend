import React, { useEffect, useState } from "react";
import styles from "./BusinessSearch.module.css";
import { NavbarUser } from "../NavbarUserLanding/NavbarUser";
import categories from "../../helpers/category.json";
import { useLocation } from "react-router-dom";
import { SearchDetail } from "./SearchDetail/SearchDetail";
import data from "../../helpers/business.json";

export const BusinessSearch = () => {
  const location = useLocation();
  const stateSearchBusiness = location.state?.searchBusiness || {
    nameEstablishment: "",
    location: "",
    category: "",
  };

  const [searchBusiness, setSearchBusiness] = useState(stateSearchBusiness);
  const [labelVisibility, setLabelVisibility] = useState({
    nameEstablishment: !stateSearchBusiness.nameEstablishment,
    location: !stateSearchBusiness.location,
    category: !stateSearchBusiness.category,
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
      [field]: searchBusiness[field as keyof typeof searchBusiness] === "",
    }));
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string
  ) => {
    setSearchBusiness((prevState: any) => ({
      ...prevState,
      [field]: event.target.value,
    }));
  };
  return (
    <div>
      <NavbarUser />
      <form className={styles.formContainer}>
        <div className={styles.hero}>
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
                value={searchBusiness.location}
                onChange={(event) => handleChange(event, "location")}
                onFocus={() => handleLabelClick("location")}
                onBlur={() => handleBlur("location")}
                className={styles.inputForm}
              />
              {labelVisibility.location && (
                <label htmlFor="location" className={styles.labelForm}>
                  Selecciona tu localidad
                </label>
              )}
            </div>
          </section>
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
                <label htmlFor="nameEstablishment" className={styles.labelForm}>
                  Nombre del establecimiento
                </label>
              )}
            </div>
          </section>
          <section className={styles.sectionForm}>
            <div className={styles.inputWrapper}>
              <select
                id="category"
                value={searchBusiness.category}
                onChange={(event) => handleChange(event, "category")}
                onFocus={() => handleLabelClick("category")}
                onBlur={() => handleBlur("category")}
                className={styles.categoryForm}
              >
                <option value="">Seleccione una categoría</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </section>
          <button className={styles.buttonSearch}>
            <img src="src/assets/search-logo.png" alt="" />
            Buscar
          </button>
        </div>
      </form>
      <SearchDetail />
    </div>
  );
};
