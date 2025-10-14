// Replica la cuadricula de tres features con hover sutil como en la referencia.
import type { LucideIcon } from "lucide-react";
import { Brain, TrendingUp, Users } from "lucide-react";

const FEATURES: Array<{ title: string; description: string; icon: LucideIcon }> = [
  {
    title: "IA avanzada",
    description: "Modelos de IA que entienden cómo aprende cada estudiante y transforman los datos en estrategias de enseñanza más efectivas.",
    icon: Brain,
  },
  {
    title: "Para todos",
    description: "Una experiencia pensada para docentes, estudiantes y equipos directivos que buscan innovar sin complicaciones.",
    icon: Users,
  },
  {
    title: "Resultados medibles",
    description: "Evaluaciones continuas que te ayudan a detectar avances, desafíos y oportunidades de crecimiento.",
    icon: TrendingUp,
  },
];

export default function FeaturesGrid() {
  return (
    <section id="caracteristicas" className="section-reveal container mx-auto max-w-7xl px-6 text-center md:px-8 py-12 md:py-16">
      <div className="mx-auto max-w-3xl space-y-4">
        <h2 className="reveal-up--title text-3xl font-bold tracking-tight md:text-4xl">IA avanzada</h2>
        <p className="reveal-up--desc text-base/7 text-white/70">
          Algoritmos que comprenden cada entrega y generan aprendizajes accionables.
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(feature => (
          <article
            key={feature.title}
            className="reveal-up--card group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-lg shadow-black/30 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04]"
          >
            <span className="mb-5 inline-flex size-16 items-center justify-center rounded-2xl bg-[#fd4c61]/15 text-[#fd4c61]">
              <feature.icon className="size-7" aria-hidden="true" />
            </span>
            <h3 className="text-left text-xl font-semibold">{feature.title}</h3>
            <p className="mt-4 text-left text-sm/7 text-white/60">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
