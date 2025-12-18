"use client";

import TopNav from "@/components/TopNav";
import stylesHome from "@/styles/page.module.css";
import style from "@/styles/mensaje.module.css";
import { useEffect, useState } from "react";

import MensajesActions from "./MensajesActions";
import MensajesModal from "./MensajesModal";
import MensajesList from "./MensajesList";

const STORAGE_KEY = "crud_items_v1";

export default function MensajesPage() {
    const [items, setItems] = useState([]);
    const [mostrarPanel, setMostrarPanel] = useState(false);
    const [editando, setEditando] = useState(null);
    const [titulo, setTitulo] = useState("");
    const [contenido, setContenido] = useState("");

    useEffect(() => {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            try {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) setItems(parsed);
            } catch {
                console.warn("JSON inválido en localStorage");
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    function abrirNuevo() {
        setEditando(null);
        setTitulo("");
        setContenido("");
        setMostrarPanel(true);
    }

    function abrirEdicion(item) {
        setEditando(item.id);
        setTitulo(item.title);
        setContenido(item.content);
        setMostrarPanel(true);
    }

    function guardarMensaje(e) {
        e.preventDefault();

        if (!titulo.trim()) return alert("El título es obligatorio");
        if (!contenido.trim()) return alert("El contenido es obligatorio");

        if (editando) {
            setItems(items =>
                items.map(it =>
                    it.id === editando
                        ? { ...it, title: titulo, content: contenido }
                        : it
                )
            );
        } else {
            const nextId =
                items.length === 0 ? 1 : Math.max(...items.map(i => i.id)) + 1;

            setItems(items => [
                ...items,
                { id: nextId, title: titulo, content: contenido },
            ]);
        }

        setMostrarPanel(false);
    }

    function eliminarUno(id) {
        if (!confirm("¿Eliminar este elemento?")) return;
        setItems(items => items.filter(i => i.id !== id));
    }

    function eliminarTodo() {
        if (!confirm("¿Eliminar TODO?")) return;
        setItems([]);
    }

    return (
        <div className={stylesHome.page}>
            <TopNav paginaActiva="mensajes" />

            <main className={`${stylesHome.main} ${style.layout}`}>
                <div className={style.container}>
                    <h1>Gestionar Mensajes</h1>

                    <MensajesActions
                        itemsCount={items.length}
                        onNuevo={abrirNuevo}
                        onEliminarTodo={eliminarTodo}
                        items={items}
                        setItems={setItems}
                    />

                    <MensajesList
                        items={items}
                        onEditar={abrirEdicion}
                        onEliminar={eliminarUno}
                    />

                    {mostrarPanel && (
                        <MensajesModal
                            editando={!!editando}
                            titulo={titulo}
                            contenido={contenido}
                            setTitulo={setTitulo}
                            setContenido={setContenido}
                            onGuardar={guardarMensaje}
                            onCerrar={() => setMostrarPanel(false)}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}
