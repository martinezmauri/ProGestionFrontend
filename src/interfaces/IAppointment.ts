export interface IAppointment {
  id: number;
  status: 'PENDING' | 'PENDING_CONFIRMATION' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  appointmentDate: string; // YYYY-MM-DD
  startTime: string;       // HH:mm
  endTime: string;         // HH:mm
  businessId: number;
  employeeId: number;
  employeeName?: string;
  serviceId: number;
  serviceName?: string;
  userId?: number;
  userName?: string;
  customerName?: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  notes?: string;
}

export interface IBusinessDayConfig {
  dayOfWeek: number;
  isWorkingDay: boolean;
  morningStart: string | null;
  morningEnd: string | null;
  afternoonStart: string | null;
  afternoonEnd: string | null;
}

export interface IGridEmployee {
  id: number;
  name: string;
  profilePicture?: string;
}

export interface IWeeklyGridData {
  weekStart: string;
  weekEnd: string;
  businessHours: IBusinessDayConfig[];
  employees: IGridEmployee[];
  appointments: IAppointment[];
}
