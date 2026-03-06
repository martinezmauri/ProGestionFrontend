import api from "./axiosInstance";

export interface UpdateUserPayload {
    name?: string;
    phoneNumber?: string;
    password?: string;
}

export const updateUser = async (id: string | number, payload: UpdateUserPayload) => {
    try {
        const response = await api.put(
            `${import.meta.env.VITE_API_URL}/user/update/${id}`,
            payload
        );
        return response.data;
    } catch (error) {
        console.error(`Error updating user ${id}:`, error);
        throw error;
    }
};
