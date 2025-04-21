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
  const [dataEmployee, setDataEmployee] = useState<IEmployee | null>();

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
      const bodyObject = { ...employeeWithoutId, serviceIds: selectedServices };

      const response = await axios.post(
        "http://localhost:8080/api/v0/employee/save",
        bodyObject
      );
    } catch (error) {
      console.error("Error al guardar empleado", error);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedName = e.target.value;
    setDataEmployee((prevData) =>
      prevData ? { ...prevData, name: updatedName } : prevData
    );
  };

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
                placeholder={dataEmployee ? dataEmployee.name : "Nombre"}
                className={styles.inputGroup}
                value={dataEmployee?.name ? dataEmployee.name : ""}
                onChange={handleNameChange}
              />
            </div>
            <div>
              Rol:
              <select name="" id="">
                {roles.map((rol) => (
                  <option key={rol.length} value={rol}>
                    {/* No deberia ser .length */}
                    {rol}
                  </option>
                ))}
              </select>
            </div>
          </section>
          <section className={styles.workDays}>
            <WorkDaysCalendar />
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
        </article>

        <article className={styles.buttonGroup}>
          <button style={{ backgroundColor: "#295366" }}>Volver</button>
          <button
            style={{ backgroundColor: "#F96E2A" }}
            onClick={handleSaveEmployee}
          >
            Aceptar
          </button>
        </article>
      </div>
    </main>
  );
};
