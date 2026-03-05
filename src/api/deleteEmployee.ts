import api from "./axiosInstance";

const deleteEmployee = async (employeeId: string): Promise<number> => {
  try {
    const response = await api.delete(
      `${import.meta.env.VITE_API_URL}/employee/deleteById/${employeeId}`
    );

    return response.status;
  } catch (error) {
    console.error(error);
    return 400;
  }
};

export default deleteEmployee;
