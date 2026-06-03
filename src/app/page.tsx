"use client";

import { useEffect, useState } from "react";

type Contenido = {
  fecha: string;
  tipo: string;
  nombre: string;
  resultado: string;
};

export default function Home() {
  const [aprendizajes, setAprendizajes] = useState<string[]>([]);
  const [nuevo, setNuevo] = useState("");

  const [contenidos, setContenidos] = useState<Contenido[]>([]);
  const [contenido, setContenido] = useState<Contenido>({
    fecha: "",
    tipo: "",
    nombre: "",
    resultado: "",
  });

  useEffect(() => {
    const aprendizajesGuardados = localStorage.getItem("aprendizajes");
    const contenidosGuardados = localStorage.getItem("contenidos");

    if (aprendizajesGuardados) {
      setAprendizajes(JSON.parse(aprendizajesGuardados));
    }

    if (contenidosGuardados) {
      setContenidos(JSON.parse(contenidosGuardados));
    }
  }, []);

  const guardarAprendizajes = (lista: string[]) => {
    setAprendizajes(lista);
    localStorage.setItem("aprendizajes", JSON.stringify(lista));
  };

  const agregarAprendizaje = () => {
    if (!nuevo.trim()) return;

    guardarAprendizajes([...aprendizajes, nuevo]);
    setNuevo("");
  };

  const eliminarAprendizaje = (index: number) => {
    guardarAprendizajes(aprendizajes.filter((_, i) => i !== index));
  };

  const guardarContenidos = (lista: Contenido[]) => {
    setContenidos(lista);
    localStorage.setItem("contenidos", JSON.stringify(lista));
  };

  const agregarContenido = () => {
    if (!contenido.nombre.trim()) return;

    guardarContenidos([...contenidos, contenido]);

    setContenido({
      fecha: "",
      tipo: "",
      nombre: "",
      resultado: "",
    });
  };

  const eliminarContenido = (index: number) => {
    guardarContenidos(contenidos.filter((_, i) => i !== index));
  };

  return (
    <main className="min-h-screen bg-zinc-100 p-8">
      <h1 className="text-4xl font-bold mb-8">
        NOA Brand OS
      </h1>

      <div className="grid gap-6 md:grid-cols-2">

        <section className="bg-white rounded-xl p-6 shadow">
          <h2 className="text-2xl font-semibold mb-4">
            ADN NOA
          </h2>

          <ul className="space-y-2">
            <li>Crecimiento profesional y personal para asesores de seguros.</li>
            <li>Tecnología invisible.</li>
            <li>Personas antes que software.</li>
          </ul>
        </section>

        <section className="bg-white rounded-xl p-6 shadow">
          <h2 className="text-2xl font-semibold mb-4">
            Aprendizajes
          </h2>

          <div className="flex gap-2 mb-4">
            <input
              value={nuevo}
              onChange={(e) => setNuevo(e.target.value)}
              placeholder="Nuevo aprendizaje"
              className="border rounded px-3 py-2 flex-1"
            />

            <button
              onClick={agregarAprendizaje}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Agregar
            </button>
          </div>

          <ul className="space-y-2">
            {aprendizajes.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center border rounded p-2 bg-white"
              >
                <span>✅ {item}</span>

                <button
                  onClick={() => eliminarAprendizaje(index)}
                  className="text-red-600 font-bold"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-xl p-6 shadow md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">
            Contenido
          </h2>

          <div className="grid gap-2 md:grid-cols-4 mb-4">
            <input
              value={contenido.fecha}
              onChange={(e) =>
                setContenido({ ...contenido, fecha: e.target.value })
              }
              placeholder="Fecha"
              className="border rounded px-3 py-2"
            />

            <input
              value={contenido.tipo}
              onChange={(e) =>
                setContenido({ ...contenido, tipo: e.target.value })
              }
              placeholder="Tipo"
              className="border rounded px-3 py-2"
            />

            <input
              value={contenido.nombre}
              onChange={(e) =>
                setContenido({ ...contenido, nombre: e.target.value })
              }
              placeholder="Nombre de pieza"
              className="border rounded px-3 py-2"
            />

            <input
              value={contenido.resultado}
              onChange={(e) =>
                setContenido({ ...contenido, resultado: e.target.value })
              }
              placeholder="Resultado"
              className="border rounded px-3 py-2"
            />
          </div>

          <button
            onClick={agregarContenido}
            className="bg-black text-white px-4 py-2 rounded mb-4"
          >
            Agregar contenido
          </button>

          <ul className="space-y-2">
            {contenidos.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center border rounded p-2 bg-white"
              >
                <span>
                  {item.fecha} · {item.tipo} · {item.nombre} · {item.resultado}
                </span>

                <button
                  onClick={() => eliminarContenido(index)}
                  className="text-red-600 font-bold"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </main>
  );
}
