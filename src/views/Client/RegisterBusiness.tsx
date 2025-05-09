import React, { useEffect, useState } from "react";
import { IRegisterBusiness } from "@interfaces/IRegisterBusiness";
import { useRegistrationBusiness } from "@hooks/useRegistrationBusiness";
import { WeekDays } from "@enum/WeekDays";
import { useNavigate } from "react-router-dom";
import { IWorkSchedule } from "@interfaces/IWorkSchedule";
import { AddressForm } from "@components/Forms/AddressForm";
import { DaysWithCheckbox } from "@components/Dropdowns/DaysWithCheckbox";
import { BusinessSchedule } from "@components/Schedules/BusinessSchedule";
import { BusinessForm } from "@components/Forms/BusinessForm";
import { Card } from "@ui/card";
import { IAddress } from "@interfaces/IAddress";
import { toast } from "sonner";

export const RegistersBusiness = () => {
  const navigate = useNavigate();
  const [workDays, setWorkDays] = useState<WeekDays[]>([]);
  const [businessSchedule, setbusinessSchedule] = useState<IWorkSchedule[]>([]);
  const [businessData, setBusinessData] = useState<IRegisterBusiness>({
    business: { name: "", description: "", phone_number: "", logo: "" },
    id_category: null,
  });
  const [addressData, setAddressData] = useState<IAddress>({
    street_number: null,
    province: "",
    country: "",
    street: "",
    city: "",
  });

  const { registerBusiness, loading, error, success } =
    useRegistrationBusiness();

  const handleScheduleChange = (newSchedule: IWorkSchedule[]) => {
    setbusinessSchedule(newSchedule);
  };

  const handleOnClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    await registerBusiness(businessSchedule, businessData, addressData);

    if (success) {
      toast.success("Negocio creado!", {
        description: `Se ha creado correctamente el negocio ${businessData.business.name}`,
      });
      navigate("/personal");
    }
  };

  return (
    <div>
      <h1 className="text-[#ff8245] px-[20px] font-bold text-[3em]">
        ProGestion
      </h1>

      <form className="flex flex-col justify-center items-center mt-5">
        <Card className="flex flex-row justify-evenly bg-[#78b3ce] w-[80%]">
          <BusinessForm
            registerData={businessData}
            setRegisterData={setBusinessData}
          />
          <AddressForm
            addressData={addressData}
            setAddressData={setAddressData}
          />
        </Card>
        <Card className="w-[70%] flex justify-center m-auto mt-10 p-5 ">
          <div className="flex gap-10 items-center">
            <p>Seleccione sus dias laborales:</p>
            <DaysWithCheckbox onDaysChange={setWorkDays} />
          </div>

          <BusinessSchedule
            work_days={workDays}
            onScheduleChange={handleScheduleChange}
          />
        </Card>
      </form>

      <div className="flex gap-[20px] absolute right-[200px] mt-10">
        <button className="bg-[#295366] rounded-xl p-[15px] text-white">
          Cancelar
        </button>
        <button
          className="bg-[#F96E2A] rounded-xl p-[15px] text-white"
          onClick={handleOnClick}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};
