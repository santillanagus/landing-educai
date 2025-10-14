import React from "react";

const DATA = [
  { label: "Sin IA", value: 55 },
  { label: "Con IA", value: 85 },
];

export default function AssistantSection() {
  const maxVal = Math.max(...DATA.map(d => d.value));
  const viewW = 768;
  const viewH = 240;
  const padX = 22;
  const padYTop = 24;
  const padYBottom = 36;

  const usableW = viewW - padX * 2;
  const usableH = viewH - padYTop - padYBottom;

  const xStep = DATA.length > 1 ? usableW / (DATA.length - 1) : 0;

  const points = DATA.map((d, i) => {
    const x = padX + i * xStep;
    const y = padYTop + (1 - d.value / maxVal) * usableH;
    return { ...d, x, y };
  });

  const pathD =
    points.length > 0
      ? `M ${points[0].x},${points[0].y} ` +
        points
          .slice(1)
          .map(p => `L ${p.x},${p.y}`)
          .join(" ")
      : "";

  return (
    <section id="nosotros" className="container mx-auto max-w-7xl px-6 md:px-8 py-12 md:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <span className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/60 shadow-black/40 backdrop-blur">
          IA AVANZADA
        </span>
        <h2 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-white md:text-4xl lg:text-5xl">
          Enseñar con IA nunca fue tan simple
        </h2>
        <p className="mt-3 text-base/7 text-white/70 md:text-lg/8">
          Diseñamos herramientas para que la inteligencia artificial llegue a cada aula.
          EducAI te permite optimizar el tiempo, personalizar el aprendizaje y mejorar
          los resultados reales de tus estudiantes.
        </p>
      </div>

      <div className="mt-12 md:mt-14 grid md:grid-cols-1">
        <article className="rounded-2xl border border-white/10 bg-black/10 p-8 shadow-lg shadow-black/30">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-white/50">
            Resultados medibles
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            Aprendizaje asistido con IA vs. sin IA
          </h3>

          <figure className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-6">
            <svg
              viewBox={`0 0 ${viewW} ${viewH}`}
              role="img"
              aria-label="Comparativa de aprendizaje sin IA frente a con IA"
              className="block h-[220px] w-full select-none md:h-[280px]"
            >
              <defs>
                <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(253,76,97,0.9)" />
                  <stop offset="100%" stopColor="rgba(253,76,97,0.6)" />
                </linearGradient>
                <linearGradient id="gradient-area" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0" stopColor="rgba(253,76,97,0.25)" />
                  <stop offset="1" stopColor="rgba(253,76,97,0)" />
                </linearGradient>
                <clipPath id="chart-clip">
                  <rect x="0" y="0" width={viewW} height={viewH} rx="12" />
                </clipPath>
              </defs>

              {points.length >= 2 && (
                <path
                  d={`${pathD} L ${padX + usableW},${viewH - padYBottom} L ${padX},${viewH - padYBottom} Z`}
                  fill="url(#gradient-area)"
                  clipPath="url(#chart-clip)"
                />
              )}

              <path
                d={pathD}
                fill="none"
                stroke="url(#gradient-line)"
                strokeWidth={3}
                strokeLinecap="round"
              />

              {points.map(p => (
                <g key={p.label}>
                  <circle cx={p.x} cy={p.y} r="5" fill="#fd4c61" />
                  <text
                    x={p.x}
                    y={p.y - 10}
                    className="fill-white text-[10px]"
                    textAnchor="middle"
                  >
                    {p.value}%
                  </text>
                </g>
              ))}
            </svg>

            <div className="mt-6 grid grid-cols-2 gap-4 md:gap-5">
              {points.map(p => (
                <div
                  key={p.label}
                  className="rounded-xl border border-white/10 bg-black/30 p-4 text-center"
                >
                  <p className="text-sm text-white/60">{p.label}</p>
                  <p className="text-2xl font-semibold text-white">{p.value}%</p>
                </div>
              ))}
            </div>
            <figcaption className="sr-only">
              El aprendizaje asistido con IA muestra mayor rendimiento que el aprendizaje sin IA.
            </figcaption>
          </figure>
        </article>
      </div>
    </section>
  );
}
