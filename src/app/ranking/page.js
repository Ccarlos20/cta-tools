"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import TopNav from "@/components/TopNav";
import stylesHome from "@/styles/page.module.css";
import style from "@/styles/ranking.module.css";

import ActionButtons from "@/components/ranking/ActionButtons";
import CrudModal from "@/components/ranking/CrudModal";
import AddModal from "@/components/ranking/AddModal";
import RankingTable from "@/components/ranking/RankingTable";

export default function RankingPage() {
    const [mostrarCRUD, setMostrarCRUD] = useState(false);
    const [mostrarAgregar, setMostrarAgregar] = useState(false);
    const [gremios, setGremios] = useState([]);

    const [mostrarEditar, setMostrarEditar] = useState(false);
    const [indiceEditar, setIndiceEditar] = useState(null);

    /* ===== Carga inicial ===== */
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("gremios")) || [];
        setGremios(data);
    }, []);

    /* ===== Persistencia ===== */
    useEffect(() => {
        localStorage.setItem("gremios", JSON.stringify(gremios));
    }, [gremios]);

    /* ===== Captura ===== */

    const obtenerFechaArchivo = () => {
        const hoy = new Date();
        const day = String(hoy.getDate()).padStart(2, "0");
        const month = String(hoy.getMonth() + 1).padStart(2, "0");
        const year = hoy.getFullYear();

        return `${day}-${month}-${year}`;
    };

    const capturarPantalla = async () => {
        const html2canvas = (await import("html2canvas")).default;
        const canvas = await html2canvas(document.body, { useCORS: true });

        const fecha = obtenerFechaArchivo();

        const enlace = document.createElement("a");
        enlace.download = `${fecha}.png`;
        enlace.href = canvas.toDataURL("image/png");
        enlace.click();
    };

    /* ===== Agregar gremio ===== */
    const agregarGremio = (rank, nombre, puntaje, estado) => {
        setGremios([...gremios, [rank, nombre, puntaje, estado]]);
        setMostrarAgregar(false);
    };

    const eliminarGremio = (index) => {
        setGremios(gremios.filter((_, i) => i !== index));
    };

    const editarGremio = (index) => {
        setIndiceEditar(index);
        setMostrarEditar(true);
    };

    const fechaHoy = new Date().toLocaleDateString("es-PE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });

    return (
        <div className={stylesHome.page}>
            <TopNav paginaActiva="ranking" />

            <main className={`${stylesHome.main} ${style.layout}`}>
                <ActionButtons
                    onCapturar={capturarPantalla}
                    onGestionar={() => setMostrarCRUD(true)}
                />
                {mostrarCRUD && (
                    <CrudModal
                        gremios={gremios}
                        onEliminar={eliminarGremio}
                        onAgregar={() => setMostrarAgregar(true)}
                        onEditar={editarGremio}
                        onCerrar={() => setMostrarCRUD(false)}
                    />
                )}

                {mostrarAgregar && (
                    <AddModal
                        onGuardar={agregarGremio}
                        onCancelar={() => setMostrarAgregar(false)}
                    />
                )}

                {mostrarEditar && (
                    <AddModal
                        valoresIniciales={gremios[indiceEditar]}
                        onGuardar={(rank, nombre, puntaje, estado) => {
                            const copia = [...gremios];
                            copia[indiceEditar] = [rank, nombre, puntaje, estado];
                            setGremios(copia);
                            setMostrarEditar(false);
                            setIndiceEditar(null);
                        }
                        }
                        onCancelar={() => {
                            setMostrarEditar(false);
                            setIndiceEditar(null);
                        }}
                    />
                )}

                <div className={style.statsContainer}>
                    <div className={style.contenidoRanking}>
                        <div className={style.fechaWrapper}>
                            <div className={style.fechaBarra}>
                                Fecha: {fechaHoy}
                            </div>

                            <Image
                                src="/imagen1.png"
                                alt="Imagen superior"
                                width={500}
                                height={94}
                                loading="eager"
                                className={style.imagenHeader}
                            />
                        </div>

                        <RankingTable gremios={gremios} />

                        <Image
                            src="/imagen2.jpg"
                            alt="Imagen inferior"
                            width={180}
                            height={180}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
