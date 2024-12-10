import React from "react";
import styles from "./About.module.css";

export const AboutClient = () => {
  return (
    <main className={styles.hero}>
      <div className={styles.title}>
        <h1>¿Que Ofrece ProGestion?</h1>
      </div>
      <section className={styles.heroCards}>
        <section className={styles.sectionLeft}>
          <div className={styles.card}>
            <h1>Lorem Ipsum</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima
              fuga illo est eaque natus accusamus similique sint, provident
              suscipit deserunt inventore possimus consequuntur id! Id omnis
              nisi doloribus alias hic.
            </p>
          </div>
          <div className={styles.card}>
            <h1>Lorem Ipsum</h1>
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
        <section className={styles.sectionMiddle}>
          <div className={styles.card}>
            <h1>Lorem Ipsum</h1>
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
        <section className={styles.sectionRightTop}>
          <div className={styles.card}>
            <h1>Lorem Ipsum</h1>
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
          <section className={styles.sectionRightBottom}>
            <div className={styles.card}>
              <h1>Lorem Ipsum</h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Tempora provident voluptatibus id suscipit, consectetur commodi?
                Ipsa eum quis laudantium at! Voluptate dolor aliquid possimus
                enim doloremque libero aut quos consequuntur.
              </p>
            </div>
            <div className={styles.card}>
              <h1>Lorem Ipsum</h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Repellendus doloribus hic est perferendis, excepturi, asperiores
                quaerat veritatis facere dolore fugiat nemo odit sunt rerum
                atque delectus voluptate dolorum quas? Hic.
              </p>
            </div>
          </section>
        </section>
      </section>
    </main>
  );
};
