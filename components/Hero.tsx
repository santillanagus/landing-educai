import Link from "next/link";

import { Button } from "@/components/ui/button";
import TextType from "@/components/ui/TextType";

export default function Hero() {
  return (
    <section
      id="top"
      className="container mx-auto max-w-7xl px-6 md:px-8 py-0"
    >
      <div className="relative isolate flex min-h-[80svh] max-h-[980px] flex-col items-center justify-start gap-6 pt-[calc(var(--nav-h)+2rem)] text-center mask-bottom-fade scroll-fade md:gap-8 md:pt-[calc(var(--nav-h)+3rem)]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(61,46,114,0.25),_transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(35,28,85,0.2),_transparent_65%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(188deg,rgba(7,9,0,0.15),rgba(7,9,0,0.3)_100%)]" />
        </div>

        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/60 shadow-lg shadow-black/40 backdrop-blur">
          La revolucion de la
        </span>

        <h1 className="max-w-4xl text-balance text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
          <TextType
            text={["Educacion + IA"]}
            showCursor
            cursorCharacter="_"
            typingSpeed={70}
            pauseDuration={1600}
            startOnVisible
            className="block text-4xl md:text-6xl lg:text-7xl"
          />
        </h1>

        <p className="max-w-2xl text-base/7 text-white/70 md:text-lg lg:text-xl">
          Una plataforma que potencia la ensenanza y el aprendizaje con flujos asistidos por inteligencia artificial.
        </p>

        <div className="flex w-full flex-col items-center justify-start gap-3 sm:w-auto sm:flex-row">
          <Button
            asChild
            className="w-full rounded-full bg-[#fd4c61] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#fd4c61]/40 transition hover:bg-[#fd4c61]/90 sm:w-auto"
          >
            <Link href="#demo" prefetch={false}>
              Quiero saber mas
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full rounded-full border-white/30 bg-transparent px-8 py-4 text-base font-semibold text-white transition hover:bg-white hover:text-black sm:w-auto"
          >
            <Link href="#demoCTA" prefetch={false}>
              Unirme a la lista de espera
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
