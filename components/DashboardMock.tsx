import Image from "next/image";

const SCENES = [
  {
    title: "Seguimiento en tiempo real",
    description: "Visualiza el rendimiento con metricas claras mientras navegas.",
    imageSrc: "/images/dashboard-banner.webp",
  },
  {
    title: "Informacion accionable",
    description: "Identifica patrones y oportunidades de mejora sin esfuerzo.",
    imageSrc: "/images/dashboard-banner.webp",
  },
  {
    title: "Decisiones con confianza",
    description: "Toma decisiones basadas en datos con una vista simple e intuitiva.",
    imageSrc: "/images/dashboard-banner.webp",
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
