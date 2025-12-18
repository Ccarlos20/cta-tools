import style from "@/styles/ranking.module.css";
import { useEffect, useState } from "react";

export default function AddModal({
    onGuardar,
    onCancelar,
    valoresIniciales
}) {
    const [rank, setRank] = useState("");
    const [nombre, setNombre] = useState("");
    const [puntaje, setPuntaje] = useState("");
    const [estado, setEstado] = useState("nada");

    useEffect(() => {
        if (valoresIniciales) {
            setRank(valoresIniciales[0]);
            setNombre(valoresIniciales[1]);
            setPuntaje(valoresIniciales[2]);
            setEstado(valoresIniciales[3] ?? "nada");
        }
    }, [valoresIniciales]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onGuardar(Number(rank), nombre, Number(puntaje), estado);
    };

    return (
        <div className={style.pnCrud}>
            <div className={style.pnContenido}>
                <h2>
                    {valoresIniciales ? "Editar Gremio" : "Agregar Gremio"}
                </h2>

                <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="number"
                                        min={1}
                                        required
                                        value={rank}
                                        onChange={(e) => setRank(e.target.value)}
                                        placeholder="Rank"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        required
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        placeholder="Nombre"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        min={1}
                                        required
                                        value={puntaje}
                                        onChange={(e) => setPuntaje(e.target.value)}
                                        placeholder="Puntaje"
                                    />
                                </td>
                                <td>
                                    <select
                                        value={estado}
                                        onChange={(e) => setEstado(e.target.value)}
                                    >
                                        <option value="nada">Sin cambio</option>
                                        <option value="subio">Subió</option>
                                        <option value="bajo">Bajó</option>
                                    </select>
                                </td>
                                <td>
                                    <button className={style.btn} type="submit">
                                        Guardar
                                    </button>
                                    <button
                                        type="button"
                                        className={`${style.btn} ${style.cancelar}`}
                                        onClick={onCancelar}
                                    >
                                        Cancelar
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
}
