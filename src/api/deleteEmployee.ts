import axios from "axios";

const deleteEmployee = async (employeeId: string): Promise<number> => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/v0/employee/deleteById/${employeeId}`
    );

    return response.status;
  } catch (error) {
    console.error(error);
    return 400;
  }
};

export default deleteEmployee;
