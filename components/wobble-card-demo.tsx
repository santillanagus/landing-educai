"use client";

import React from "react";
import Image from "next/image";

import { WobbleCard } from "@/components/ui/wobble-card";

const CARD_CONTENT = [
  {
    title: "Retroalimentacion inteligente y personalizada",
    copy:
      "El docente visualiza en tiempo real el nivel de comprension, fortalezas y aspectos a mejorar, optimizando su tiempo y el acompanamiento individual.",
    image: {
      src: "/images/retroalimentacion-sc.webp",
      alt: "Retroalimentacion EducAI",
      sizes: "(max-width: 1024px) 60vw, 420px",
      className: "absolute -right-4 lg:-right-[40%] -bottom-10 h-auto w-[320px] rounded-2xl object-contain grayscale",
    },
    containerClassName: "col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]",
  },
  {
    title: "Analisis automatico del desempeno academico",
    copy:
      "Con algoritmos de IA, EducAI identifica patrones de aprendizaje, dificultades y progresos por grupo o curso. Ofrece metricas claras y visuales que facilitan decisiones pedagogicas basadas en datos.",
    containerClassName: "col-span-1 min-h-[300px]",
  },
  {
    title: "Areas de mejora y recomendaciones",
    copy:
      "El sistema detecta automaticamente las areas donde los estudiantes presentan mas desafios y propone estrategias de refuerzo especificas, impulsando mejoras concretas en el aprendizaje.",
    image: {
      src: "/images/areas-de-mejora.webp",
      alt: "Panel de recomendaciones EducAI",
      sizes: "(max-width: 1024px) 70vw, 460px",
      className: "absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 h-auto w-[360px] rounded-2xl object-contain",
    },
    containerClassName: "col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]",
  },
];

export default function WobbleCardDemo() {
  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 lg:grid-cols-3">
      {CARD_CONTENT.map((card, index) => (
        <WobbleCard key={card.title} containerClassName={card.containerClassName}>
          <div className="max-w-sm">
            <h2 className="text-left text-balance text-base font-semibold tracking-[-0.015em] text-white md:text-xl lg:text-3xl">
              {card.title}
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">{card.copy}</p>
          </div>
          {card.image ? (
            <Image
              src={card.image.src}
              alt={card.image.alt}
              width={500}
              height={500}
              sizes={card.image.sizes}
              className={card.image.className}
              loading="lazy"
            />
          ) : null}
        </WobbleCard>
      ))}
    </div>
  );
}
