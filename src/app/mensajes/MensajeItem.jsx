// MensajeItem.jsx
import style from "@/styles/mensaje.module.css";

export default function MensajeItem({ item, onEditar, onEliminar }) {
    return (
        <div className={style.item}>
            <div className={style.itemContent}>
                <h3>{item.title}</h3>
                <p>{item.content}</p>
            </div>

            <div className={style.itemActions}>
                <button
                    className={`${style.btn} ${style.small}`}
                    onClick={() => onEditar(item)}
                >
                    Ver o Editar
                </button>
                <button
                    className={`${style.btn} ${style.ghost} ${style.small}`}
                    onClick={() => onEliminar(item.id)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
}
