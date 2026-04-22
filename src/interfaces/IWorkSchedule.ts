export interface IWorkSchedule {
  /** 
   * Día de la semana. Por convención universal de JS (Date.getDay()):
   * 0 = Domingo, 1 = Lunes, 2 = Martes, 3 = Miércoles, 4 = Jueves, 5 = Viernes, 6 = Sábado
   */
  dayOfWeek: number;

  /** Indica si la sucursal o el empleado atiende ese día */
  isWorkingDay: boolean;

  /** Inicio del primer bloque (ej: "09:00"), null si no trabaja  */
  morningStart: string | null;

  /** Fin del primer bloque (ej: "13:00" o "18:00" si hace horario de corrido) */
  morningEnd: string | null;

  /** Inicio del turno tarde (ej: "16:00"). Si trabaja de corrido o solo medio día, será null */
  afternoonStart: string | null;

  /** Fin del turno tarde (ej: "20:00"). Si no hay segundo bloque, será null */
  afternoonEnd: string | null;
}
