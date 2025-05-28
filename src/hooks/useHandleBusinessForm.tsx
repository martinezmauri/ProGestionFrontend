import { useEffect, useState } from "react";
import { ICategory } from "@interfaces/ICategory";
import getCategories from "@api/getCategories";

const useHandleBusinessForm = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data ?? []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories };
};

export default useHandleBusinessForm;
