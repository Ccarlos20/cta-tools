import style from "@/styles/ranking.module.css";

export default function ActionButtons({ onCapturar, onGestionar }) {
    return (
        <div className={style.btnSuperior}>
            <button onClick={onCapturar}>Capturar</button>
            <button onClick={onGestionar}>Gestionar Tabla</button>
        </div>
    );
}
