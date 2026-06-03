"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [aprendizajes, setAprendizajes] = useState<string[]>([]);
  const [nuevo, setNuevo] = useState("");

  useEffect(() => {
    const guardados = localStorage.getItem("aprendizajes");
    if (guardados) {
      setAprendizajes(JSON.parse(guardados));
    }
  }, []);

  const agregar = () => {
    if (!nuevo.trim()) return;

    const actualizados = [...aprendizajes, nuevo];

    setAprendizajes(actualizados);
    localStorage.setItem(
      "aprendizajes",
      JSON.stringify(actualizados)
    );

    setNuevo("");
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
              onClick={agregar}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Agregar
            </button>
          </div>

          <ul className="space-y-2">
            {aprendizajes.map((item, index) => (
              <li key={index}>
                ✅ {item}
              </li>
            ))}
          </ul>
        </section>

      </div>
    </main>
  );
}
