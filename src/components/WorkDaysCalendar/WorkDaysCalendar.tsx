import React, { useState } from "react";
import styles from "./WorkDaysCalendar.module.css";

interface Props {
  selectedDays: string[];
  setSelectedDays: React.Dispatch<React.SetStateAction<string[]>>;
}

export const WorkDaysCalendar: React.FC<Props> = ({
  selectedDays,
  setSelectedDays,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const weekDays = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  const toggleDay = (day: string) => {
    setSelectedDays((prevSelected) =>
      prevSelected.includes(day)
        ? prevSelected.filter((d) => d !== day)
        : [...prevSelected, day]
    );
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={styles.buttonToggle}
      >
        Seleccionar días laborales
      </button>

      {isOpen && (
        <div className={styles.gridWrapper}>
          {weekDays.map((day) => (
            <button
              key={day}
              type="button"
              className={`${styles.dayButton} ${
                selectedDays.includes(day) ? styles.selected : ""
              }`}
              onClick={() => toggleDay(day)}
            >
              {day}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
