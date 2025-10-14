import Image from "next/image";

const SCENES = [
  {
    title: "Dashboard simple y fácil de usar",
    description:
      "Seguimiento en tiempo real de asistencia, entregas y progreso. Visualizá métricas claras mientras navegás, detectá desvíos al instante y tomá acción sin salir de tu flujo de trabajo.",
    imageSrc: "/images/dashboard-banner.webp",
  },
  {
    title: "Retroalimentación inteligente",
    description:
      "Recibí análisis automáticos y sugerencias personalizadas para cada alumno y cada clase. Identificá oportunidades de mejora y obtené comentarios listos para compartir en segundos.",
    imageSrc: "/images/retroalimentacion-sc.webp",
  },
  {
    title: "Áreas de mejora con foco",
    description:
      "Priorizá acciones concretas por curso y tema con una vista simple e intuitiva. Planificá intervenciones que impacten y hacé seguimiento con recomendaciones y alertas contextuales.",
    imageSrc: "/images/areas-de-mejora.webp",
  },
];

export default function DashboardMock() {
  return (
    <section
      id="demo"
      className="container mx-auto max-w-7xl px-6 md:px-8 py-12 md:py-16 scroll-mt-[var(--nav-h)]"
    >
      <div className="story-pin">
        {SCENES.map((s, i) => (
          <section key={i} className="story-slide">
            <div className="story-sticky grid items-center gap-8 md:grid-cols-2 md:gap-12">
              <figure className="overflow-hidden rounded-3xl">
                <Image
                  src={s.imageSrc}
                  alt={s.title}
                  width={2400}
                  height={1400}
                  sizes="(min-width:1024px) 52vw, 100vw"
                  priority={false}
                  className="pointer-events-none block h-auto w-full select-none object-cover"
                />
              </figure>

              <aside className="flex flex-col gap-3">
                <h3 className="text-2xl font-semibold text-white md:text-3xl">
                  {s.title}
                </h3>
                <p className="text-base leading-relaxed text-white/70 md:text-lg">
                  {s.description}
                </p>
              </aside>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
