"use client";

import style from "@/styles/mensaje.module.css";
import { MENSAJES_INTERNOS } from "./mensajesInternos";
import { useState } from "react";

export default function MensajesActions({
    itemsCount,
    onNuevo,
    onEliminarTodo,
    items,
    setItems,
}) {
    const [mensajeInterno, setMensajeInterno] = useState("");

    function exportarJSON() {
        const blob = new Blob([JSON.stringify(items, null, 2)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "mensajes.json";
        a.click();
        URL.revokeObjectURL(url);
    }

    function importarJSON(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = ev => {
            try {
                const parsed = JSON.parse(ev.target.result);
                if (!Array.isArray(parsed)) {
                    alert("El JSON debe ser un arreglo");
                    return;
                }
                setItems(parsed);
            } catch {
                alert("JSON inválido");
            }
        };

        reader.readAsText(file);
        e.target.value = "";
    }

    function importarInternoSeleccionado(e) {
        const key = e.target.value;
        if (!key) return;

        const origen = MENSAJES_INTERNOS[key];
        if (!origen) {
            alert("Opción inválida");
            return;
        }

        const confirmar = confirm(
            "Esto reemplazará los mensajes actuales.\n\nAceptar = Importar\nCancelar = No hacer nada"
        );
        if (!confirmar) return;

        setItems(
            origen.mensajes.map((m, i) => ({
                id: i + 1,
                title: m.titulo,
                content: m.texto,
            }))
        );
        setMensajeInterno(""); // reinicia el select
    }

    return (
        <div className={style.actionsTop}>
            <div className={style.actionsRow}>
                <button className={style.btn} onClick={onNuevo}>
                    ➕ Nuevo mensaje
                </button>

                <button
                    className={`${style.btn} ${style.ghost} ${style.small}`}
                    onClick={exportarJSON}
                >
                    Exportar .json
                </button>

                <label className={`${style.btn} ${style.ghost} ${style.small}`}>
                    Importar .json
                    <input
                        type="file"
                        accept="application/json"
                        onChange={importarJSON}
                    />
                </label>

                <select
                    className={`${style.btn} ${style.ghost} ${style.small}`}
                    value={mensajeInterno}
                    onChange={importarInternoSeleccionado}
                >
                    <option value="">Importar interno</option>
                    {Object.keys(MENSAJES_INTERNOS).map(key => (
                        <option key={key} value={key}>
                            {MENSAJES_INTERNOS[key].tema}
                        </option>
                    ))}
                </select>
            </div>

            <div className={style.metaRow}>
                <button
                    className={`${style.btn} ${style.danger} ${style.small}`}
                    onClick={onEliminarTodo}
                >
                    Eliminar todo
                </button>

                <div className={style.info}>
                    Elementos: {itemsCount}
                </div>
            </div>
        </div>
    );
}
