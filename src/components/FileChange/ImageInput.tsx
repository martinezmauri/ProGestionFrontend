import { Plus } from "lucide-react";
import React from "react";
interface Props {
  profilePicture: string;
}
/* falta conectar con PersonalDetailView */
export const ImageInput = ({ profilePicture }: Props) => {
  return (
    <div className="relative w-[60px] h-[60px] bg-[#fbf8ef]">
      <img
        className="w-full h-full object-cover block"
        src={
          profilePicture
            ? profilePicture
            : "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
        }
        alt="Imagen del usuario."
      />
      <input type="file" style={{ display: "none" }} accept="image/*" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00000099] w-[30px] h-[30px] rounded-3xl flex justify-center items-center cursor-pointer text-[20px]">
        <Plus color="#ffffff" />
      </div>
    </div>
  );
};
