import { Link } from "react-router-dom";

export const HeroClient = () => {
  return (
    <main>
      <section className="flex gap-[8rem] items-center mt-[2rem]">
        <section className="flex flex-col w-[60%] px-[4rem] mb-[5vh]">
          <h1 className="text-[#f96e2a] text-[1.2em] font-bold">
            ORGANIZA TU NEGOCIO
          </h1>
          <p className="text-[#295366] text-[2em] font-bold">
            Optimiza de la mejor manera los turnos de tu negocio.
          </p>
          <p className="text-[#295366] text-[1em] font-normal">
            Desde cualquier dispositivo en cualquier momento a toda hora dales a
            tus clientes la mejor experiencia del mercado con ProGestion.
          </p>
          <nav className="flex mt-[5vh] justify-evenly">
            <Link
              className="bg-[#f96e2a] rounded-3xl text-[#295366] font-medium text-[1em] p-2"
              to={"/plans"}
            >
              Ver planes
            </Link>
            <Link
              className="bg-[#f96e2a] rounded-3xl text-[#295366] font-medium text-[1em] p-2"
              to={"/about"}
            >
              Contáctanos
            </Link>
          </nav>
        </section>
        <section className="w-[100%] mt-[5vh]">
          <img
            className="w-[100%]"
            src="https://res.cloudinary.com/dcmi9bxvv/image/upload/v1745446087/lnh40csjj725fa1m3aec.png"
            alt="Vista de un iPad y un teléfono mostrando ProGestion"
          />
        </section>
      </section>
    </main>
  );
};
