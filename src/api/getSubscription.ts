import api from "./axiosInstance";

export interface ISubscription {
    id: number;
    tier: "BASIC" | "PROFESSIONAL" | "ENTERPRISE";
    status: "ACTIVE" | "EXPIRED" | "CANCELLED";
    startDate: string;
    endDate: string | null;
    userId: number;
}

export const getMySubscription = async (): Promise<ISubscription | null> => {
    try {
        const response = await api.get(
            `${import.meta.env.VITE_API_URL}/subscriptions/my`
        );

        if (response.status === 200) {
            return response.data;
        }
        return null;
    } catch (error) {
        console.error("Error fetching subscription:", error);
        return null;
    }
};
