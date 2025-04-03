import React, { useState } from "react";
import days from "../../../helpers/workDays.json";
import styles from "./DropdownCheckbox.module.css";
import { WeekDays } from "../../../enum/WeekDays";

interface Props {
  onDaysChange: (selectedDays: WeekDays[]) => void;
}

const dayMap: Record<number, WeekDays> = {
  1: WeekDays.Monday,
  2: WeekDays.Tuesday,
  3: WeekDays.Wednesday,
  4: WeekDays.Thursday,
  5: WeekDays.Friday,
  6: WeekDays.Saturday,
  7: WeekDays.Sunday,
};

export const DropdownCheckbox: React.FC<Props> = ({ onDaysChange }) => {
  const [selectedDays, setSelectedDays] = useState<WeekDays[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (id: number, dayName: string) => {
    const enumDay = dayMap[id];

    if (!enumDay) return;

    setSelectedDays((prev) => {
      const updatedDays = prev.includes(enumDay)
        ? prev.filter((day) => day !== enumDay)
        : [...prev, enumDay];

      setTimeout(() => onDaysChange(updatedDays), 0);
      return updatedDays;
    });
  };

  return (
    <div className={styles.hero}>
      <button
        onClick={(event) => toggleDropdown(event)}
        className={styles.selectDays}
      >
        Dias de apertura
      </button>

      {isOpen && (
        <div className={styles.itemDay}>
          {days.map((day) => (
            <label key={day.id}>
              <input
                type="checkbox"
                checked={selectedDays.includes(dayMap[day.id])}
                onChange={() => handleCheckboxChange(day.id, day.dia)}
              />
              {day.dia}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
