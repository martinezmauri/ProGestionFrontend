import { useEffect, useState } from "react";
import { ICategory } from "@interfaces/ICategory";
import { IRegisterBusiness } from "@interfaces/IRegisterBusiness";
import category from "@helpers/category.json";

const useHandleBusinessForm = (): { categories: ICategory[] } => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    setCategories(category);
  }, []);

  return { categories };
};

export default useHandleBusinessForm;
