"use client";

import React from "react";
import { WobbleCard } from "@/components/ui/wobble-card";

export default function WobbleCardDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Retroalimentación inteligente y personalizada
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
          El docente visualiza en tiempo real el nivel de comprensión, fortalezas y aspectos a mejorar, optimizando su tiempo y el acompañamiento individual.          </p>
        </div>
        <img
          src="/images/retroalimentación-sc.png"
          width={500}
          height={500}
          alt="Retroalimentación EducAI"
          className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
        Análisis automático del desempeño académico
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
        Con algoritmos de IA, EducAI identifica patrones de aprendizaje, dificultades y progresos por grupo o curso. Ofrece métricas claras y visuales que facilitan decisiones pedagógicas basadas en datos.        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Áreas de mejora y recomendaciones
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
          El sistema detecta automáticamente las áreas donde los estudiantes presentan más desafíos y propone estrategias de refuerzo específicas, impulsando mejoras concretas en el aprendizaje.          </p>
        </div>
        <img
          src="/images/areas-de-mejora.png"
          width={500}
          height={500}
          alt="Retroalimentación EducAI"
          className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
    </div>
  );
}

