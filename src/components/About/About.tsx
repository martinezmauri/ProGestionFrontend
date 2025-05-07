import React from "react";
import { motion } from "framer-motion";

export const AboutClient = () => {
  return (
    <main>
      <motion.section
        className="px-[80px] py-[30px] flex gap-[20px]"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <section className="flex flex-col gap-[20px] w-[30vh]">
          <div className="bg-[#f96f2a6b] rounded-lg grow p-[20px]">
            <h1 className="text-[#295366] pb-[10px]">Lorem Ipsum</h1>
            <p className="text-[#295366] text-[12px]">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima
              fuga illo est eaque natus accusamus similique sint, provident
              suscipit deserunt inventore possimus consequuntur id! Id omnis
              nisi doloribus alias hic.
            </p>
          </div>
          <div className="bg-[#f96f2a6b] rounded-lg grow p-[20px]">
            <h1 className="text-[#295366] pb-[10px]">Lorem Ipsum</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos aut
              voluptatem eos dolorum ab dolores labore nisi eius error commodi,
              numquam vero unde placeat illum ea eum blanditiis, adipisci quam?
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque
              delectus, distinctio mollitia excepturi modi, voluptatibus velit
              quasi minus exercitationem quam sunt libero harum ullam provident
              possimus aspernatur, at totam molestias?
            </p>
          </div>
        </section>
        <section className="flex justify-center w-[40%]">
          <div className="bg-[#f96f2a6b] rounded-lg grow p-[20px]">
            <h1 className="text-[#295366] pb-[10px}">Lorem Ipsum</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
              minima molestiae dolores, perspiciatis veniam in amet blanditiis
              asperiores cumque. Ullam consequuntur dolor necessitatibus ipsam
              quis, sed iure doloremque possimus pariatur! Lorem ipsum, dolor
              sit amet consectetur adipisicing elit. Provident amet perferendis
              repellat facilis magni nobis harum laborum! Animi totam
              voluptatibus aut cupiditate dicta eos a quos nobis! Ipsam, ratione
              minus.
            </p>
          </div>
        </section>
        <section className="flex flex-col gap-[20px] w-[40%]">
          <div className="bg-[#f96f2a6b] rounded-lg grow p-[20px]">
            <h1 className="text-[#295366] pb-[10px]">Lorem Ipsum</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam
              quisquam quidem omnis illum voluptates officiis quibusdam possimus
              amet, facilis dolor commodi nostrum? Dolore earum quaerat possimus
              accusantium, dolorum maxime vero.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Doloremque rerum aspernatur voluptatibus deleniti porro autem
              labore. A distinctio nesciunt non, cumque, odio saepe numquam
              blanditiis dolorem enim sed architecto praesentium.
            </p>
          </div>
          <section className="flex gap-[20px]">
            <div className="bg-[#f96f2a6b] rounded-lg grow p-[20px]">
              <h1 className="text-[#295366] pb-[10px]">Lorem Ipsum</h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Tempora provident voluptatibus id suscipit, consectetur commodi?
                Ipsa eum quis laudantium at! Voluptate dolor aliquid possimus
                enim doloremque libero aut quos consequuntur.
              </p>
            </div>
            <div className="bg-[#f96f2a6b] rounded-lg grow p-[20px]">
              <h1 className="text-[#295366] pb-[10px]">Lorem Ipsum</h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Repellendus doloribus hic est perferendis, excepturi, asperiores
                quaerat veritatis facere dolore fugiat nemo odit sunt rerum
                atque delectus voluptate dolorum quas? Hic.
              </p>
            </div>
          </section>
        </section>
      </motion.section>
    </main>
  );
};
