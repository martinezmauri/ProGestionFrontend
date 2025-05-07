import React, { useState } from "react";

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
    <div className="flex flex-col items-start">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#fbf8ef] border-none text-black py-[4px] px-[12px] rounded-lg cursor-pointer"
      >
        Seleccionar días laborales
      </button>

      {isOpen && (
        <div className="mt-[0.5] grid grid-cols-4 gap-[12px]">
          {weekDays.map((day) => (
            <button
              key={day}
              type="button"
              className={`bg-[#f8f8f8] rounded-[20px] p-1 cursor-pointer text-center border-2 ${
                selectedDays.includes(day)
                  ? "border-[#3595fc]"
                  : "border-[#f8f8f8]"
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
