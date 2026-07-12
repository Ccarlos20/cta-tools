import style from "@/styles/ranking.module.css";

export default function CrudModal({
    gremios,
    onEliminar,
    onAgregar,
    onEditar,
    onCerrar
}) {
    const estado = {
        nada: "Sin cambios",
        subio: "Subió",
        bajo: "Bajó"
    }

    return (
        <div className={style.pnCrud}>
            <div className={style.pnContenido}>
                <h2>Gestionar Gremios</h2>

                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Nombre</th>
                            <th>Puntaje</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gremios.map((g, i) => (
                            <tr key={i}>
                                <td>{g[0]}</td>
                                <td>{g[1]}</td>
                                <td>{g[2]}</td>
                                <td>{estado[g[3]]}</td>
                                <td>
                                    <button
                                        className={style.btn}
                                        onClick={() => onEditar(i)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className={`${style.btn} ${style.cancelar}`}
                                        onClick={() => onEliminar(i)}
                                    >
                                        Eliminar
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

                <div>
                    <button className={style.btn} onClick={onAgregar}>
                        Agregar
                    </button>
                    <button
                        className={`${style.btn} ${style.cancelar}`}
                        onClick={onCerrar}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}
