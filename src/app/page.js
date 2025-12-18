
import styles from "@/styles/page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h2>
            CTA tools
          </h2>
          <span className={styles.subtitle}>
            Proyecto personal
          </span>
        </div>

        <div className={styles.list}>
          <div className={styles.listTitle}>
            Opciones
          </div>

          <a href="/ranking">
            Gestionar Ranking
          </a>

          <a href="/mensajes">
            Gestionar Mensajes
          </a>
        </div>
      </main>
    </div>
  );
}
