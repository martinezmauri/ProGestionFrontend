import axiosInstance from "./axiosInstance";

export interface BusinessHoliday {
    id?: number;
    holidayDate: string;
    description: string;
    isFullDay: boolean;
    startTime?: string;
    endTime?: string;
}

export const getHolidays = async (businessId: number): Promise<BusinessHoliday[]> => {
    try {
        const response = await axiosInstance.get(`/business/${businessId}/config/holidays`);
        return response.data as BusinessHoliday[];
    } catch {
        return [];
    }
};

export const addHoliday = async (businessId: number, holiday: BusinessHoliday) => {
    const response = await axiosInstance.post(`/business/${businessId}/config/holidays`, holiday);
    return response.data;
};

export const deleteHoliday = async (businessId: number, holidayId: number) => {
    await axiosInstance.delete(`/business/${businessId}/config/holidays/${holidayId}`);
};

export const updateSlotDuration = async (businessId: number, slotDuration: number) => {
    try {
        const response = await axiosInstance.patch(`/business/${businessId}/config/slot-duration`, { slotDuration });
        return response.data;
    } catch {
        return null;
    }
};

export const checkAvailabilitySync = async (businessId: number) => {
    try {
        const response = await axiosInstance.get(`/business/${businessId}/config/availability-check`);
        return response.data as { status: string; message: string };
    } catch {
        return null;
    }
};
