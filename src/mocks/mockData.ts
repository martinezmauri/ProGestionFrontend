import { IEmployeeResponse } from "../interfaces/IEmployee";
import { IService } from "../interfaces/IService";
import { EmployeeRol } from "../enum/EmployeeRol";
import type { IAppointment, IBusinessDayConfig, IGridEmployee } from "../interfaces/IAppointment";

// ──────────────────────────────── Legacy types (kept for backwards compat) ────
export interface ITimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
  appointmentId?: number;
}
export interface IEmployeeSchedule {
  employeeId: number;
  employeeName: string;
  timeSlots: ITimeSlot[];
}
export interface IAppointmentGrid {
  serviceName: string;
  serviceDuration: number;
  timeSlots: ITimeSlot[];
  employeeAvailabilities: IEmployeeSchedule[];
}

// ──────────────────────────────── Services ────────────────────────────────────
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

// ──────────────────────────────── Employees ───────────────────────────────────
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

export const MOCK_EMPLOYEES_GRID: IGridEmployee[] = [
  { id: 1, name: "Juan (Barbero)" },
  { id: 2, name: "Pedro (Estilista)" },
  { id: 3, name: "Ana (Colorista)" },
];

// ──────────────────────────────── Legacy Grid ─────────────────────────────────
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
        { startTime: "08:30:00", endTime: "09:30:00", available: false, appointmentId: 101 },
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
        { startTime: "09:00:00", endTime: "10:30:00", available: false, appointmentId: 102 },
        { startTime: "10:30:00", endTime: "11:00:00", available: true },
        { startTime: "11:00:00", endTime: "11:30:00", available: true },
        { startTime: "11:30:00", endTime: "12:00:00", available: true },
      ],
    },
  ],
};

// ──────────────────────────────── Business Hours Config ────────────────────────
export const MOCK_BUSINESS_HOURS_CONFIG: IBusinessDayConfig[] = [
  { dayOfWeek: 0, isWorkingDay: false, morningStart: null, morningEnd: null, afternoonStart: null, afternoonEnd: null },
  { dayOfWeek: 1, isWorkingDay: true, morningStart: "09:00", morningEnd: "13:00", afternoonStart: "14:00", afternoonEnd: "18:00" },
  { dayOfWeek: 2, isWorkingDay: true, morningStart: "09:00", morningEnd: "13:00", afternoonStart: "14:00", afternoonEnd: "18:00" },
  { dayOfWeek: 3, isWorkingDay: true, morningStart: "09:00", morningEnd: "13:00", afternoonStart: "14:00", afternoonEnd: "18:00" },
  { dayOfWeek: 4, isWorkingDay: true, morningStart: "09:00", morningEnd: "13:00", afternoonStart: "14:00", afternoonEnd: "18:00" },
  { dayOfWeek: 5, isWorkingDay: true, morningStart: "09:00", morningEnd: "13:00", afternoonStart: null, afternoonEnd: null },
  { dayOfWeek: 6, isWorkingDay: false, morningStart: null, morningEnd: null, afternoonStart: null, afternoonEnd: null },
];

// ──────────────────────────────── Weekly Appointments ──────────────────────────
const today = new Date();
const monday = new Date(today);
monday.setDate(today.getDate() - ((today.getDay() + 6) % 7)); // Monday of current week
const fmt = (d: Date) => d.toISOString().split("T")[0];
const addDays = (d: Date, n: number) => { const r = new Date(d); r.setDate(d.getDate() + n); return r; };

export const MOCK_WEEKLY_APPOINTMENTS: IAppointment[] = [
  // Monday — approved
  { id: 101, status: "APPROVED", appointmentDate: fmt(monday), startTime: "09:00", endTime: "09:30", businessId: 1, employeeId: 1, employeeName: "Juan (Barbero)", serviceId: 1, serviceName: "Corte Masculino", userId: 10, customerName: "Carlos Méndez" },
  { id: 102, status: "APPROVED", appointmentDate: fmt(monday), startTime: "10:00", endTime: "11:00", businessId: 1, employeeId: 2, employeeName: "Pedro (Estilista)", serviceId: 2, serviceName: "Corte + Barba", userId: 11, customerName: "Roberto Sánchez" },
  // Tuesday — approved + pending
  { id: 103, status: "APPROVED", appointmentDate: fmt(addDays(monday, 1)), startTime: "11:00", endTime: "11:30", businessId: 1, employeeId: 1, employeeName: "Juan (Barbero)", serviceId: 1, serviceName: "Corte Masculino", userId: 12, customerName: "Laura Martínez" },
  { id: 104, status: "PENDING",  appointmentDate: fmt(addDays(monday, 1)), startTime: "14:00", endTime: "15:30", businessId: 1, employeeId: 3, employeeName: "Ana (Colorista)", serviceId: 3, serviceName: "Color / Tintura", userId: 13, customerName: "María González" },
  // Wednesday
  { id: 105, status: "APPROVED", appointmentDate: fmt(addDays(monday, 2)), startTime: "09:30", endTime: "10:00", businessId: 1, employeeId: 1, employeeName: "Juan (Barbero)", serviceId: 1, serviceName: "Corte Masculino", userId: 14, customerName: "Diego Ramírez" },
  { id: 106, status: "PENDING",  appointmentDate: fmt(addDays(monday, 2)), startTime: "15:00", endTime: "15:30", businessId: 1, employeeId: 2, employeeName: "Pedro (Estilista)", serviceId: 1, serviceName: "Corte Masculino", userId: 15, customerName: "Elena Valdés" },
  // Thursday
  { id: 107, status: "APPROVED", appointmentDate: fmt(addDays(monday, 3)), startTime: "10:00", endTime: "11:30", businessId: 1, employeeId: 3, employeeName: "Ana (Colorista)", serviceId: 3, serviceName: "Color / Tintura", userId: 16, customerName: "Sofía Ruiz" },
  // Friday
  { id: 108, status: "PENDING", appointmentDate: fmt(addDays(monday, 4)), startTime: "09:00", endTime: "10:00", businessId: 1, employeeId: 2, employeeName: "Pedro (Estilista)", serviceId: 2, serviceName: "Corte + Barba", userId: 17, customerName: "Martín Gómez" },
];
