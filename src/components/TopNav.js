import styles from "@/styles/nav.module.css";

export default function TopNav({ paginaActiva }) {
    return (
        <nav className={styles.nav}>
            <a href="/" className={styles.navTitle}>
                CTA tools
            </a>

            <ul className={styles.navList}>
                <li>
                    <a
                        href="/ranking"
                        className={paginaActiva === "ranking" ? styles.active : ""}
                    >
                        Gestionar Ranking
                    </a>
                </li>

                <li>
                    <a
                        href="/mensajes"
                        className={paginaActiva === "mensajes" ? styles.active : ""}
                    >
                        Gestionar Mensajes
                    </a>
                </li>
            </ul>
        </nav>
    );
}