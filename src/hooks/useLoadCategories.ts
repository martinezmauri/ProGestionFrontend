import { ICategory } from "@interfaces/ICategory";
import api from "@api/axiosInstance";
import { useEffect, useState } from "react";

const useLoadCategories = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const fetchCategories = async () => {
    setLoading(true);

    try {
      const response = await api.get(
        `${import.meta.env.VITE_API_URL}/category/findAll`
      );
      setCategories(response.data.content || response.data || []);
    } catch (error) {
      console.error("Error interno");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return { categories, loading };
};

export default useLoadCategories;
