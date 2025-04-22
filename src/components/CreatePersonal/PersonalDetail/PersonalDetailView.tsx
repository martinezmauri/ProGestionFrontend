import React, { useEffect, useState, useRef } from "react";
import styles from "./PersonalDetailView.module.css";
import { IService } from "../../../interfaces/IService";
import getService from "../../../api/getServices";
import { WorkDaysCalendar } from "../../WorkDaysCalendar/WorkDaysCalendar";
import axios from "axios";
import { Rol } from "../../../enum/UserRol";
import { IEmployee } from "../../../interfaces/IEmployee";
import getEmployee from "../../../api/getEmployee";
import { Dashboard } from "../../Dashboard/Dashboard";
import { EmployeeWorkSchedule } from "../../../interfaces/EmployeeWorkSchedule";
import { WeekDays } from "../../../enum/WeekDays";

const dayMap: Record<string, WeekDays> = {
  Lunes: WeekDays.Monday,
  Martes: WeekDays.Tuesday,
  Miércoles: WeekDays.Wednesday,
  Jueves: WeekDays.Thursday,
  Viernes: WeekDays.Friday,
  Sábado: WeekDays.Saturday,
  Domingo: WeekDays.Sunday,
};
/* User - address - category - business - businessHours - service - (Employee - employeeHours) */

export const PersonalDetailView = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(
    "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const roles = Object.values(Rol);
  const [dataEmployee, setDataEmployee] = useState<IEmployee>({
    id: "",
    name: "",
    profilePicture: "",
    service: "",
    rol: Rol.Employee,
  });
  const [workDays, setWorkDays] = useState<string[]>([]);
  const [employeeWorkSchedule, setEmployeeWorkSchedule] = useState<
    EmployeeWorkSchedule[]
  >([]);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await getService();
      if (data) setServices(data);
    };

    const fetchEmployee = async () => {
      const data = await getEmployee();
      if (data) {
        setDataEmployee(data);
      }
    };

    fetchServices();
    fetchEmployee();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cambiar estado de servicios seleccionados
  const toggleService = (serviceId: string) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(serviceId)
        ? prevSelected.filter((id) => id !== serviceId)
        : [...prevSelected, serviceId]
    );
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setDataEmployee((prev) =>
        prev ? { ...prev, profilePicture: imageUrl } : prev
      );
    }
  };

  const handleSaveEmployee = async () => {
    try {
      const { id, ...employeeWithoutId } = dataEmployee || {};
      const bodyObject = {
        ...employeeWithoutId,
        serviceIds: selectedServices,
        businessId: 1,
      };

      const response = await axios.post(
        "http://localhost:8080/api/v0/employee/save",
        bodyObject
      );
      if (response.status === 201) {
        alert("Employee created");
      }
    } catch (error) {
      console.error("Error al guardar empleado", error);
    }
  };

  const handleSaveWorkScheduleEmployee = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v0/employees/1/hours",
        employeeWorkSchedule
      );
      if (response.status === 201) {
        alert("Employee schedule created");
      }
    } catch (error) {
      console.error("Error al guardar horarios del empleado", error);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedName = e.target.value;
    setDataEmployee((prevData) =>
      prevData ? { ...prevData, name: updatedName } : prevData
    );
  };

  const handleChange = (
    dayEnum: WeekDays,
    shift: "morning" | "evening",
    type: "opening" | "closing",
    value: string
  ) => {
    setEmployeeWorkSchedule((prev) => {
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

  useEffect(() => {
    const newDays = workDays
      .map((dayEs) => dayMap[dayEs])
      .filter(
        (dayEnum) =>
          !employeeWorkSchedule.some(
            (schedule) => schedule.dayOfWeek === dayEnum
          )
      );

    if (newDays.length > 0) {
      const newSchedules = newDays.map((dayEnum) => ({
        dayOfWeek: dayEnum,
        openingMorningTime: "",
        closingMorningTime: "",
        openingEveningTime: "",
        closingEveningTime: "",
      }));

      setEmployeeWorkSchedule((prev) => [...prev, ...newSchedules]);
    }
  }, [workDays, employeeWorkSchedule]);

  return (
    <main className={styles.container}>
      <Dashboard extend={false} />
      <div className={styles.hero}>
        <article className={styles.box}>
          <h1 className={styles.title}>Personal Edit</h1>
          <section className={styles.firtSection}>
            <div className={styles.image}>
              <img
                src={dataEmployee ? dataEmployee.profilePicture : profileImage}
                alt="Imagen del usuario."
              />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept="image/*"
              />
              <div onClick={handleFileClick} className={styles.imageOverlay}>
                <span>+</span>
              </div>
            </div>
            <div>
              <input
                type="text"
                placeholder={"Nombre"}
                className={styles.inputGroup}
                value={dataEmployee?.name ?? ""}
                onChange={handleNameChange}
              />
            </div>
            <div>
              Rol:
              <select
                name="rol"
                id="rol"
                value={dataEmployee?.rol}
                onChange={(e) =>
                  setDataEmployee({
                    ...dataEmployee,
                    rol: e.target.value as Rol,
                  })
                }
              >
                {roles.map((rol) => (
                  <option key={rol} value={rol}>
                    {rol}
                  </option>
                ))}
              </select>
            </div>
          </section>
          <section className={styles.workDays}>
            <WorkDaysCalendar
              selectedDays={workDays}
              setSelectedDays={setWorkDays}
            />
          </section>
          <section className={styles.lastSection}>
            <div className={styles.dropdownWrapper} ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={styles.dropdownButton}
              >
                Seleccionar servicios
              </button>
              {isDropdownOpen && (
                <div className={styles.dropdownContent}>
                  {services.map((service) => (
                    <label key={service.id} className={styles.checkboxItem}>
                      <input
                        type="checkbox"
                        value={service.id}
                        checked={selectedServices.includes(service.id)}
                        onChange={() => toggleService(service.id)}
                      />
                      {service.name}
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Provincia"
                className={styles.inputGroup}
              />
            </div>
          </section>
          <button
            className={styles.dropdownButton}
            onClick={handleSaveEmployee}
            style={{
              backgroundColor: "#F96E2A",
              marginTop: "10px",
              color: "white",
            }}
          >
            Crear Empleado
          </button>
        </article>
        <article>
          {workDays.length > 0 && (
            <div className={styles.containerHours}>
              <h1 className={styles.titleHours}>
                Configurar horarios de atencion
              </h1>
              {workDays.map((dayEs) => {
                const dayEnum = dayMap[dayEs];
                const schedule = employeeWorkSchedule.find(
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
                            handleChange(
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
                            handleChange(
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
                            handleChange(
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
                            handleChange(
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
          <button
            className={styles.dropdownButton}
            onClick={handleSaveWorkScheduleEmployee}
            style={{
              backgroundColor: "#F96E2A",
              marginTop: "10px",
              color: "white",
            }}
          >
            Guardar Horarios
          </button>
        </article>

        <article className={styles.buttonGroup}>
          <button style={{ backgroundColor: "#295366" }}>Volver</button>
          <button style={{ backgroundColor: "#F96E2A" }}>Aceptar</button>
        </article>
      </div>
    </main>
  );
};
