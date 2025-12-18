// MensajesList.jsx
import MensajeItem from "./MensajeItem";
import style from "@/styles/mensaje.module.css";

export default function MensajesList({ items, onEditar, onEliminar }) {
    return (
        <div className={style.list}>
            {[...items]
                .sort((a, b) => b.id - a.id)
                .map(it => (
                    <MensajeItem
                        key={it.id}
                        item={it}
                        onEditar={onEditar}
                        onEliminar={onEliminar}
                    />
                ))}
        </div>
    );
}
