import { IEmployeeResponse } from "../interfaces/IEmployee";
import { IService } from "../interfaces/IService";
import { EmployeeRol } from "../enum/EmployeeRol";
import { IAppointmentGrid } from "../hooks/useAppointmentGrid";

export const MOCK_SERVICES: IService[] = [
  {
    id: "1",
    name: "Corte Masculino",
    duration: 30,
    price: 3500,
    description: "Corte clásico con tijera y máquina",
  },
  {
    id: "2",
    name: "Corte + Barba",
    duration: 60,
    price: 5000,
    description: "Combo completo de corte y perfilado",
  },
  {
    id: "3",
    name: "Color / Tintura",
    duration: 90,
    price: 8000,
    description: "Cambio de color o cobertura de canas",
  },
];

export const MOCK_EMPLOYEES: IEmployeeResponse[] = [
  {
    id: "1",
    name: "Juan (Barbero)",
    email: "juan@barberia.com",
    role: EmployeeRol.ADMIN,
    services: [
      { id: "1", name: "Corte Masculino" },
      { id: "2", name: "Corte + Barba" },
    ],
    businessId: "barber-01",
    employeeHours: [],
  },
  {
    id: "2",
    name: "Pedro (Estilista)",
    email: "pedro@barberia.com",
    role: EmployeeRol.MANAGER,
    services: [
      { id: "1", name: "Corte Masculino" },
      { id: "3", name: "Color / Tintura" },
    ],
    businessId: "barber-01",
    employeeHours: [],
  },
];

export const MOCK_GRID_DATA: IAppointmentGrid = {
  serviceName: "Todos los servicios",
  serviceDuration: 30,
  timeSlots: [
    { startTime: "08:00:00", endTime: "08:30:00", available: true },
    { startTime: "08:30:00", endTime: "09:00:00", available: true },
    { startTime: "09:00:00", endTime: "09:30:00", available: true },
    { startTime: "09:30:00", endTime: "10:00:00", available: true },
    { startTime: "10:00:00", endTime: "10:30:00", available: true },
    { startTime: "10:30:00", endTime: "11:00:00", available: true },
    { startTime: "11:00:00", endTime: "11:30:00", available: true },
    { startTime: "11:30:00", endTime: "12:00:00", available: true },
  ],
  employeeAvailabilities: [
    {
      employeeId: 1,
      employeeName: "Juan (Barbero)",
      timeSlots: [
        { startTime: "08:00:00", endTime: "08:30:00", available: true },
        {
          startTime: "08:30:00",
          endTime: "09:30:00",
          available: false,
          appointmentId: 101,
        }, // 60 min
        { startTime: "09:30:00", endTime: "10:00:00", available: true },
        { startTime: "10:00:00", endTime: "10:30:00", available: true },
        { startTime: "10:30:00", endTime: "11:00:00", available: true },
        { startTime: "11:00:00", endTime: "11:30:00", available: true },
        { startTime: "11:30:00", endTime: "12:00:00", available: true },
      ],
    },
    {
      employeeId: 2,
      employeeName: "Pedro (Estilista)",
      timeSlots: [
        { startTime: "08:00:00", endTime: "08:30:00", available: true },
        { startTime: "08:30:00", endTime: "09:00:00", available: true },
        {
          startTime: "09:00:00",
          endTime: "10:30:00",
          available: false,
          appointmentId: 102,
        }, // 90 min
        { startTime: "10:30:00", endTime: "11:00:00", available: true },
        { startTime: "11:00:00", endTime: "11:30:00", available: true },
        { startTime: "11:30:00", endTime: "12:00:00", available: true },
      ],
    },
  ],
};
