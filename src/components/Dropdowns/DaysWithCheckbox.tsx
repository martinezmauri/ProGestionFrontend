import React, { useState } from "react";
import days from "../../helpers/workDays.json";
import { WeekDays } from "../../enum/WeekDays";
import { Button } from "../../ui/button";

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

export const DaysWithCheckbox: React.FC<Props> = ({ onDaysChange }) => {
  const [selectedDays, setSelectedDays] = useState<WeekDays[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (id: number, dayName: string) => {
    const enumDay = dayMap[id];
    if (!enumDay) return;

    setSelectedDays((prev) =>
      prev.includes(enumDay)
        ? prev.filter((day) => day !== enumDay)
        : [...prev, enumDay]
    );
  };

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const uppercasedDays = selectedDays.map((day) => day.toUpperCase());
    onDaysChange(uppercasedDays as WeekDays[]);
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={(event) => toggleDropdown(event)}
        className=" p-[1vh] w-58 rounded-lg border border-black text-[0.9em] text-[#7383AD] "
      >
        Dias laborales
      </button>

      {isOpen && (
        <div className="flex flex-col bg-white gap-[10px] p-[10px] w-58 border border-black rounded-lg absolute">
          {days.map((day) => (
            <label
              key={day.id}
              className="flex items-center gap-[8px] text-black"
            >
              <input
                type="checkbox"
                checked={selectedDays.includes(dayMap[day.id])}
                onChange={() => handleCheckboxChange(day.id, day.dia)}
              />
              {day.dia}
            </label>
          ))}
          <Button className="bg-[#474950]" onClick={(e) => handleOnClick(e)}>
            Guardar
          </Button>
        </div>
      )}
    </div>
  );
};
