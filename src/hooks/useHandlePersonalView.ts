import { IService } from "@interfaces/IService";
import React, { useEffect, useState } from "react";
import getService from "@api/getServices";

const useHandlePersonalView = () => {
  const [services, setServices] = useState<IService[]>([]);

  const fetchServices = async () => {
    const data = await getService();
    if (data) setServices(data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return { services };
};

export default useHandlePersonalView;
