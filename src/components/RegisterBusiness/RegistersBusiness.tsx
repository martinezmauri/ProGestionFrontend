import React, { useState } from "react";
import styles from "./RegisterBusiness.module.css";
import { IRegisterBusiness } from "../../interfaces/IRegisterBusiness";
import { useRegistrationBusiness } from "../../hooks/useRegistrationBusiness";
export const RegistersBusiness = () => {
  /*ORDER DE CREACION: user, category, address, business */

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
  };

  return (
    <div>
      <form className={styles.hero}>
        <section className={styles.heroUser}>
          <h1>Datos principales</h1>
          <ul className={styles.listInputs}>
            <li>
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                value={registerData.business.name}
                onChange={(event) => handleChange(event, "business", "name")}
              />
            </li>
            <li>
              <label htmlFor="phone">Numero telefonico de empresa</label>
              <input
                type="number"
                id="phone"
                value={registerData.business.phone_number}
                onChange={(event) =>
                  handleChange(event, "business", "phone_number")
                }
              />
            </li>
            <li>
              <label htmlFor="category">Categoria</label>
              <input
                type="text"
                id="category"
                value={registerData.category.name}
                onChange={(event) => handleChange(event, "category", "name")}
              />
            </li>
            <li>
              <div className={styles.hoursBusiness}>
                <div>
                  <label htmlFor="open">Abre</label>
                  <input
                    type="number"
                    id="open"
                    value={registerData.business.opening_hours.open}
                    onChange={(event) =>
                      handleOpeningHoursChange(event, "open")
                    }
                  />
                </div>
                <div>
                  <label htmlFor="close">Cierra</label>
                  <input
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
              <label htmlFor="description">Descripcion</label>
              <input
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
        <section className={styles.listInputs}>
          <h1>Direccion/Ubicacion</h1>
          <div className={styles.sectionData}>
            <div>
              <label htmlFor="streetName">Nombre de calle</label>
              <input
                type="text"
                id="streetName"
                value={registerData.address.street}
                onChange={(event) => handleChange(event, "address", "street")}
              />
            </div>
            <div>
              <label htmlFor="streetHeight">Altura</label>
              <input
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
              <label htmlFor="city">Ciudad</label>
              <input
                type="text"
                id="city"
                value={registerData.address.city}
                onChange={(event) => handleChange(event, "address", "city")}
              />
            </div>
            <div>
              <label htmlFor="province">Provincia</label>
              <input
                type="text"
                id="province"
                value={registerData.address.province}
                onChange={(event) => handleChange(event, "address", "province")}
              />
            </div>
          </div>
          <section className={styles.sectionContryData}>
            <label htmlFor="country">Pais</label>
            <input
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
      {success && <p>Creado Correctamente</p>}
    </div>
  );
};
