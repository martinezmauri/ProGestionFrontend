import React, { useState } from "react";
import styles from "./RegisterBusiness.module.css";
import { IRegisterBusiness } from "../../interfaces/IRegisterBusiness";
import { useRegistrationBusiness } from "../../hooks/useRegistrationBusiness";
import { DropdownCheckbox } from "./DropDownDays/DropdownCheckbox";
import { WeekDays } from "../../enum/WeekDays";
import { useNavigate } from "react-router-dom";
import { IWorkSchedule } from "../../interfaces/IWorkSchedule";
import Swal from "sweetalert2";

const dayMap: Record<string, WeekDays> = {
  Lunes: WeekDays.Monday,
  Martes: WeekDays.Tuesday,
  Miércoles: WeekDays.Wednesday,
  Jueves: WeekDays.Thursday,
  Viernes: WeekDays.Friday,
  Sábado: WeekDays.Saturday,
  Domingo: WeekDays.Sunday,
};

export const RegistersBusiness = () => {
  /*ORDER DE CREACION: user, category(insomnia), address, business, service, employee */

  const navigate = useNavigate();
  const [businessWorkSchedule, setbusinessWorkSchedule] = useState<
    IWorkSchedule[]
  >([]);
  const [registerData, setRegisterData] = useState<IRegisterBusiness>({
    business: {
      name: "",
      description: "",
      phone_number: "",
      work_days: [],
      logo: "",
    },
    address: {
      id: 0,
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

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    registerBusiness(registerData, businessWorkSchedule);
    if (success) {
      Swal.fire({
        title: "Registro exitoso",
        text: "El negocio ha sido registrado correctamente.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
      navigate("/personalView");
    }
  };

  const handleHoursChange = (
    dayEnum: WeekDays,
    shift: "morning" | "evening",
    type: "opening" | "closing",
    value: string
  ) => {
    setbusinessWorkSchedule((prev) => {
      const updated = prev.map((entry) => {
        if (entry.dayOfWeek !== dayEnum) return entry;

        const updatedEntry = { ...entry };

        if (shift === "morning") {
          if (type === "opening") updatedEntry.openingMorningTime = value;
          else updatedEntry.closingMorningTime = value;
        } else {
          if (type === "opening") updatedEntry.openingEveningTime = value;
          else updatedEntry.closingEveningTime = value;
        }

        return updatedEntry;
      });

      return updated;
    });
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
              <DropdownCheckbox onDaysChange={handleSelectedDaysChange} />
            </li>
            {registerData.business.work_days.length > 0 && (
              <div className={styles.containerHours}>
                <h1 className={styles.titleHours}>Horarios de atencion</h1>
                {registerData.business.work_days.map((dayEs) => {
                  const dayEnum = dayMap[dayEs];
                  const schedule = businessWorkSchedule.find(
                    (s) => s.dayOfWeek === dayEnum
                  );

                  return (
                    <section key={dayEnum} className={styles.heroShifts}>
                      <h2 className={styles.day}>{dayEs}</h2>

                      {/* mañana */}
                      <div className={styles.morning}>
                        <h2 className={styles.titleShift}>Turno mañana</h2>

                        <div className={styles.opening}>
                          <h2>Desde:</h2>
                          <input
                            type="time"
                            value={schedule?.openingMorningTime || ""}
                            onChange={(e) =>
                              handleHoursChange(
                                dayEnum,
                                "morning",
                                "opening",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className={styles.closing}>
                          <h2>Hasta:</h2>
                          <input
                            type="time"
                            value={schedule?.closingMorningTime || ""}
                            onChange={(e) =>
                              handleHoursChange(
                                dayEnum,
                                "morning",
                                "closing",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>

                      {/* tarde */}
                      <div className={styles.afternoon}>
                        <h2 className={styles.titleShift}>Turno Tarde</h2>

                        <div className={styles.opening}>
                          <h2>Desde:</h2>
                          <input
                            type="time"
                            value={schedule?.openingEveningTime || ""}
                            onChange={(e) =>
                              handleHoursChange(
                                dayEnum,
                                "evening",
                                "opening",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className={styles.closing}>
                          <h2>Hasta:</h2>
                          <input
                            type="time"
                            value={schedule?.closingEveningTime || ""}
                            onChange={(e) =>
                              handleHoursChange(
                                dayEnum,
                                "evening",
                                "closing",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </section>
                  );
                })}
              </div>
            )}
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
