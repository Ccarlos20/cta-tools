import { useState } from "react";
import style from "@/styles/mensaje.module.css";

export default function MensajesModal({
    editando,
    titulo,
    contenido,
    setTitulo,
    setContenido,
    onGuardar,
    onCerrar,
}) {
    const [copiado, setCopiado] = useState(null); // "titulo" | "contenido" | null

    function copiarTexto(texto, tipo) {
        if (!texto) return;

        navigator.clipboard.writeText(texto);
        setCopiado(tipo);

        setTimeout(() => {
            setCopiado(null);
        }, 1200);
    }

    return (
        <div className={style.modalBg} onClick={onCerrar}>
            <div className={style.modal} onClick={e => e.stopPropagation()}>
                <h2>{editando ? "Editar mensaje" : "Nuevo mensaje"}</h2>

                <form onSubmit={onGuardar}>
                    <div className={style.formGroup}>
                        <label>Título</label>

                        <div className={style.inlineField}>
                            <input
                                type="text"
                                value={titulo}
                                onChange={e => setTitulo(e.target.value)}
                            />
                            <button
                                type="button"
                                className={`${style.btn} ${style.small} ${style.ghost} ${copiado === "titulo" ? style.copiado : ""
                                    }`}
                                onClick={() => copiarTexto(titulo, "titulo")}
                            >
                                {copiado === "titulo" ? "Copiado ✓" : "Copiar"}
                            </button>
                        </div>
                    </div>

                    <div className={style.formGroup}>
                        <label>Contenido</label>

                        <textarea
                            value={contenido}
                            onChange={e => setContenido(e.target.value)}
                            maxLength={500}
                        />

                        <div className={style.contentActions}>
                            <span className={style.charCount}>
                                {contenido.length} / 500
                            </span>

                            <button
                                type="button"
                                className={`${style.btn} ${style.small} ${style.ghost} ${copiado === "contenido" ? style.copiado : ""
                                    }`}
                                onClick={() =>
                                    copiarTexto(contenido, "contenido")
                                }
                            >
                                {copiado === "contenido"
                                    ? "Copiado ✓"
                                    : "Copiar contenido"}
                            </button>
                        </div>
                    </div>

                    <div className={style.panelActions}>
                        <button className={style.btn}>Guardar</button>
                        <button
                            type="button"
                            className={`${style.btn} ${style.ghost}`}
                            onClick={onCerrar}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
