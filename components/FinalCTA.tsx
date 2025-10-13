"use client";

// Replica el bloque final con degradado radial y CTA centrado de la referencia.
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function FinalCTA() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [gotcha, setGotcha] = useState(""); // honeypot

  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    if (gotcha.trim() !== "") return;

    if (!name.trim() || !email.trim()) {
      toast({
        title: "Faltan datos",
        description: "Por favor completa tu nombre y correo electrónico.",
        variant: "destructive",
      });
      return;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      toast({
        title: "Correo inválido",
        description: "Revisa el formato del email.",
        variant: "destructive",
      });
      return;
    }

    if (!endpoint) {
      toast({
        title: "Configuración faltante",
        description:
          "No está definida NEXT_PUBLIC_FORMSPREE_ENDPOINT en .env.local",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          role,
          ua: typeof navigator !== "undefined" ? navigator.userAgent : "",
        }),
      });

      if (res.ok) {
        setName("");
        setEmail("");
        setRole("");
        toast({
          title: "¡Enviado!",
          description:
            "Gracias por unirte a la lista de espera. Te contactaremos pronto.",
        });
      } else {
        toast({
          title: "No se pudo enviar",
          description: "Inténtalo nuevamente en unos segundos.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error de red",
        description: "No pudimos contactar al servidor.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="demoCTA" className="container mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-24">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/80 p-8 shadow-2xl shadow-black/40 backdrop-blur md:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(253,76,97,0.3),_rgba(7,7,9,0)_65%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,16,20,0.88),rgba(16,16,20,0.45))]" />
        </div>

        <div className="relative text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Únete a la lista de espera</h2>
          <p className="mt-4 text-base/7 text-white/70">
            Entérate primero de las novedades y lanzamientos de EducAI para tu institución o aula.
          </p>
        </div>

        <form
          className="relative mt-8 space-y-6"
          noValidate
          onSubmit={handleSubmit}
          aria-live="polite"
        >
          <input
            type="text"
            name="_gotcha"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            value={gotcha}
            onChange={(e) => setGotcha(e.target.value)}
          />

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2 text-left">
              <label htmlFor="name" className="text-sm font-medium text-white/80">
                Nombre completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 transition-colors focus:border-[#fd4c61] focus:outline-none focus:ring-1 focus:ring-[#fd4c61]"
                placeholder="Tu nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2 text-left">
              <label htmlFor="email" className="text-sm font-medium text-white/80">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 transition-colors focus:border-[#fd4c61] focus:outline-none focus:ring-1 focus:ring-[#fd4c61]"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2 text-left">
            <label htmlFor="role" className="text-sm font-medium text-white/80">
              ¿Cuál es tu rol? (opcional)
            </label>
            <select
              id="role"
              name="role"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-colors focus:border-[#fd4c61] focus:outline-none focus:ring-1 focus:ring-[#fd4c61] [&>option]:bg-white [&>option]:text-black"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Selecciona una opción</option>
              <option value="Profesor/a">Profesor/a</option>
              <option value="Estudiante">Estudiante</option>
              <option value="Institución">Institución</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#fd4c61] py-4 text-lg font-medium text-white shadow-lg shadow-[#fd4c61]/30 transition hover:bg-[#fd4c61]/90 disabled:opacity-70"
          >
            {loading ? "Enviando..." : "Unirme a la lista de espera"}
          </Button>
        </form>

        <p className="relative mt-6 text-center text-sm text-white/40">
          Tu información está segura. No compartimos datos con terceros.
        </p>
      </div>
    </section>
  );
}
