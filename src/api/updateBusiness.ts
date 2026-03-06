import api from "./axiosInstance";
import { IAddress } from "@interfaces/IAddress";

export interface UpdateBusinessPayload {
    name: string;
    description: string;
    phoneNumber: string;
    logo: string;
    categoryId: string;
    address: IAddress;
}

export const updateBusiness = async (id: string | number, payload: UpdateBusinessPayload) => {
    try {
        const formattedPayload = {
            name: payload.name,
            description: payload.description,
            phoneNumber: payload.phoneNumber,
            logo: payload.logo || "",
            category: { id: payload.categoryId }, // matches BusinessUpdateDto Category structure
            address: payload.address
        };

        const response = await api.put(
            `${import.meta.env.VITE_API_URL}/business/update/${id}`,
            formattedPayload
        );
        return response.data;
    } catch (error) {
        console.error(`Error updating business ${id}:`, error);
        throw error;
    }
};
