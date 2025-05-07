import React from "react";
import { Input } from "../../ui/input";
import { IAddress } from "../../interfaces/IAddress";
interface Props {
  addressData: IAddress;
  setAddressData: React.Dispatch<React.SetStateAction<IAddress>>;
}

export const AddressForm = ({ addressData, setAddressData }: Props) => {
  return (
    <div className="flex gap-[20px] flex-col">
      <h1 className="w-[60vh] text-center bg-[#ff8245] p-2 text-[1em] font-medium">
        Ubicación del negocio
      </h1>
      <div className="flex gap-[20px] w-full">
        <Input
          className="w-full p-[1vh] border-black border rounded-lg"
          placeholder="Calle"
          type="text"
          id="streetName"
          value={addressData.street}
          onChange={(event) =>
            setAddressData({ ...addressData, street: event.target.value })
          }
        />
        <Input
          className="w-full p-[1vh] border-black border rounded-lg [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          placeholder="Altura"
          type="number"
          id="streetHeight"
          value={addressData.street_number ?? ""}
          onChange={(event) =>
            setAddressData({
              ...addressData,
              street_number: Number(event.target.value),
            })
          }
        />
      </div>
      <div className="flex gap-[20px] w-full">
        <Input
          className="w-full p-[1vh] border-black border rounded-lg"
          placeholder="Ciudad"
          type="text"
          id="city"
          value={addressData.city}
          onChange={(event) =>
            setAddressData({ ...addressData, city: event.target.value })
          }
        />
        <Input
          className="w-full p-[1vh] border-black border rounded-lg"
          placeholder="Provincia"
          type="text"
          id="province"
          value={addressData.province}
          onChange={(event) =>
            setAddressData({ ...addressData, province: event.target.value })
          }
        />
      </div>
      <section className="flex justify-center">
        <Input
          className="w-full p-[1vh] border-black border rounded-lg text-center"
          placeholder="Pais"
          type="text"
          id="country"
          value={addressData.country}
          onChange={(event) =>
            setAddressData({ ...addressData, country: event.target.value })
          }
        />
      </section>
    </div>
  );
};
