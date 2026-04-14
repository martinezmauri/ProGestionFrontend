export interface IAppointment {
    id: number;
    appointmentDate: string; // ISO date YYYY-MM-DD
    startTime: string; // HH:mm
    endTime: string; // HH:mm
    status: 'PENDING' | 'PENDING_CONFIRMATION' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
    businessId: number;
    employeeId: number;
    employeeName: string;
    serviceId: number;
    serviceName: string;
    userId?: number;
    userName?: string;
    notes?: string;
    clientName?: string;
    clientPhone?: string;
}

export interface IAppointmentCreate {
    appointmentDate: string;
    startTime: string;
    businessId: number;
    employeeId: number;
    serviceId: number;
    userId?: number;
    clientName?: string;
    clientPhone?: string;
    clientEmail?: string;
    notes?: string;
}
