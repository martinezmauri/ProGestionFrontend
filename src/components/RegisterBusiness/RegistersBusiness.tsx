import React, { useState } from "react";
import styles from "./RegisterBusiness.module.css";
import { IRegisterBusiness } from "../../interfaces/IRegisterBusiness";
import { useRegistrationBusiness } from "../../hooks/useRegistrationBusiness";
import categories from "../../helpers/category.json"; /*  uso temporal para el desarrollo del dropdown */
import { DropdownCheckbox } from "./DropDownDays/DropdownCheckbox";
import { WeekDays } from "../../enum/WeekDays";
import { useNavigate } from "react-router-dom";

export const RegistersBusiness = () => {
  /*ORDER DE CREACION: user, category(insomnia), address, business, service, employee */

  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState<IRegisterBusiness>({
    business: {
      name: "",
      description: "",
      phone_number: "",
      opening_hours: { open: "", close: "" },
      work_days: [],
      logo: "",
    },
    address: {
      street_number: 0,
      province: "",
      country: "",
      street: "",
      city: "",
    },
    category: {
      name: "",
    },
  });

  const { registerBusiness, loading, error, success } =
    useRegistrationBusiness();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    section: keyof IRegisterBusiness,
    field: string
  ) => {
    setRegisterData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: event.target.value,
      },
    }));
  };

  const handleOpeningHoursChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: "open" | "close"
  ) => {
    setRegisterData((prevState) => ({
      ...prevState,
      business: {
        ...prevState.business,
        opening_hours: {
          ...prevState.business.opening_hours,
          [field]: event.target.value,
        },
      },
    }));
  };

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    registerBusiness(registerData);
    if (success) {
      navigate("/personalView");
    }
  };

  const handleSelectedDaysChange = (days: WeekDays[]) => {
    setRegisterData((prevState) => ({
      ...prevState,
      business: {
        ...prevState.business,
        work_days: days,
      },
    }));
  };

  return (
    <div className={styles.heroPather}>
      <h1 className={styles.logo}>ProGestion</h1>
      <form className={styles.hero}>
        <section className={styles.heroUser}>
          <h1 className={styles.title}>Datos principales</h1>
          <ul className={styles.containerInputs}>
            <li>
              <label htmlFor="name" className={styles.listLabel}>
                Nombre
              </label>
              <input
                className={styles.listInput}
                type="text"
                id="name"
                value={registerData.business.name}
                onChange={(event) => handleChange(event, "business", "name")}
              />
            </li>
            <li>
              <label className={styles.listLabel} htmlFor="phone">
                Numero telefonico de empresa
              </label>
              <input
                className={styles.listInput}
                type="number"
                id="phone"
                value={registerData.business.phone_number}
                onChange={(event) =>
                  handleChange(event, "business", "phone_number")
                }
              />
            </li>
            <li>
              <label className={styles.listLabel} htmlFor="category">
                Categoria
              </label>
              <input
                className={styles.listInput}
                type="text"
                id="category"
                value={registerData.category.name}
                onChange={(event) => handleChange(event, "category", "name")}
              />
            </li>
            <li>
              <div className={styles.hoursBusiness}>
                <div>
                  <label className={styles.listLabel} htmlFor="open">
                    Abre
                  </label>
                  <input
                    className={styles.listInput}
                    type="number"
                    id="open"
                    value={registerData.business.opening_hours.open}
                    onChange={(event) =>
                      handleOpeningHoursChange(event, "open")
                    }
                  />
                </div>
                <span className={styles.colonSymbol}>:</span>
                <div>
                  <label className={styles.listLabel} htmlFor="close">
                    Cierra
                  </label>
                  <input
                    className={styles.listInput}
                    type="number"
                    id="close"
                    value={registerData.business.opening_hours.close}
                    onChange={(event) =>
                      handleOpeningHoursChange(event, "close")
                    }
                  />
                </div>
              </div>
            </li>
            <li>
              <DropdownCheckbox onDaysChange={handleSelectedDaysChange} />
            </li>
            <li>
              <label className={styles.listLabel} htmlFor="description">
                Descripcion
              </label>
              <input
                className={styles.listInput}
                type="text"
                id="description"
                value={registerData.business.description}
                onChange={(event) =>
                  handleChange(event, "business", "description")
                }
              />
            </li>
          </ul>
        </section>
        <section className={styles.locationSection}>
          <h1 className={styles.title}>Ubicación del negocio</h1>
          <div className={styles.sectionData}>
            <div>
              <label className={styles.listLabel} htmlFor="streetName">
                Nombre de calle
              </label>
              <input
                className={styles.listInput}
                type="text"
                id="streetName"
                value={registerData.address.street}
                onChange={(event) => handleChange(event, "address", "street")}
              />
            </div>
            <div>
              <label className={styles.listLabel} htmlFor="streetHeight">
                Altura
              </label>
              <input
                className={styles.listInput}
                type="text"
                id="streetHeight"
                value={registerData.address.street_number}
                onChange={(event) =>
                  handleChange(event, "address", "street_number")
                }
              />
            </div>
          </div>
          <div className={styles.sectionData}>
            <div>
              <label className={styles.listLabel} htmlFor="city">
                Ciudad
              </label>
              <input
                className={styles.listInput}
                type="text"
                id="city"
                value={registerData.address.city}
                onChange={(event) => handleChange(event, "address", "city")}
              />
            </div>
            <div>
              <label className={styles.listLabel} htmlFor="province">
                Provincia
              </label>
              <input
                className={styles.listInput}
                type="text"
                id="province"
                value={registerData.address.province}
                onChange={(event) => handleChange(event, "address", "province")}
              />
            </div>
          </div>
          <section className={styles.sectionContryData}>
            <label className={styles.listLabel} htmlFor="country">
              Pais
            </label>
            <input
              className={styles.listInput}
              type="text"
              id="country"
              value={registerData.address.country}
              onChange={(event) => handleChange(event, "address", "country")}
            />
          </section>
          <section className={styles.sectionAddressMap}>MAP</section>
        </section>
      </form>
      <div className={styles.containerButtons}>
        <button style={{ backgroundColor: "#295366" }}>Cancelar</button>
        <button style={{ backgroundColor: "#F96E2A" }} onClick={handleOnClick}>
          Continuar
        </button>
      </div>
    </div>
  );
};
