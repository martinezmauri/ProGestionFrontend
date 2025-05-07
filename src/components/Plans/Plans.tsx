import { WhatsAppButton } from "../WhatsApp/WhatsAppButton";

export const PlansClient = () => {
  return (
    <>
      <div className="flex justify-around flex-wrap gap-4 py-[70px] px-[30px] ">
        <section className="flex flex-col items-center w-[25%] h-[500px] bg-[#f96f2a5d] rounded-xl">
          <h1 className="text-[#295366] pt-10px text-[30px]">Estándar</h1>
        </section>
        <section className="flex flex-col items-center w-[25%] h-[500px] bg-[#f96f2a5d] rounded-xl">
          <h1 className="text-[#295366] pt-10px text-[30px]">Premium</h1>
        </section>
        <section className="flex flex-col items-center w-[25%] h-[500px] bg-[#f96f2a5d] rounded-xl">
          <h1 className="text-[#295366] pt-10px text-[30px]">Pro</h1>
        </section>
      </div>
      <WhatsAppButton />
    </>
  );
};
