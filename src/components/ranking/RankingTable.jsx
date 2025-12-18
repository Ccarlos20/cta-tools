import style from "@/styles/ranking.module.css";

export default function RankingTable({ gremios }) {

    const gremiosOrdenados = [...gremios].sort(
        (a, b) => a[0] - b[0]
    );

    const menorRank = gremiosOrdenados.length
        ? gremiosOrdenados[0][0]
        : null;

    return (
        <table className={style.table}>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Nombre</th>
                    <th>Puntaje</th>
                </tr>
            </thead>
            <tbody>
                {gremiosOrdenados.map((g, i) => (
                    <tr key={i}>
                        <td>
                            {g[0]}
                            {g[3] === "subio" && (
                                <span className={style.flechaSube}> ▲</span>
                            )}
                            {g[3] === "bajo" && (
                                <span className={style.flechaBaja}> ▼</span>
                            )}
                        </td>
                        <td>
                            {g[1]}
                            {g[0] === menorRank && " 👑"}
                        </td>
                        <td>{g[2]} 🏆</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
