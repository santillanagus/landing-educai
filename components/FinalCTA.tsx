import { useState, FormEvent } from "react";

import { Button } from "@/components/ui/button";

export default function FinalCTA() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;

    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (!endpoint) {
      setError(true);
      setSuccess(false);
      return;
    }

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      role: formData.get("role"),
      ua: navigator.userAgent,
    };

    setLoading(true);
    setError(false);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setName("");
        setEmail("");
        setRole("");
        setSuccess(true);
        setError(false);
        event.currentTarget.reset();
      } else {
        setError(true);
        setSuccess(false);
      }
    } catch (err) {
      setError(true);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="demoCTA" className="container mx-auto max-w-7xl px-6 md:px-8 py-12 md:py-16">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/80 p-8 shadow-2xl shadow-black/40 backdrop-blur md:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(253,76,97,0.3),_rgba(7,7,9,0)_65%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,16,20,0.88),rgba(16,16,20,0.45))]" />
        </div>

        <div className="relative text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Unete a la lista de espera</h2>
          <p className="mt-4 text-base/7 text-white/70">
            Enterate primero de las novedades y lanzamientos de EducAI para tu institucion o aula.
          </p>
        </div>

        <form className="relative mt-8 space-y-6" noValidate onSubmit={handleSubmit}>
          <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2 text-left">
              <label htmlFor="name" className="text-sm font-medium text-white/80">
                Nombre completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 transition-colors focus:border-[#fd4c61] focus:outline-none focus:ring-1 focus:ring-[#fd4c61]"
                placeholder="Tu nombre completo"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </div>
            <div className="space-y-2 text-left">
              <label htmlFor="email" className="text-sm font-medium text-white/80">
                Correo electronico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 transition-colors focus:border-[#fd4c61] focus:outline-none focus:ring-1 focus:ring-[#fd4c61]"
                placeholder="tu@email.com"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2 text-left">
            <label htmlFor="role" className="text-sm font-medium text-white/80">
              Cual es tu rol? (opcional)
            </label>
            <select
              id="role"
              name="role"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-colors focus:border-[#fd4c61] focus:outline-none focus:ring-1 focus:ring-[#fd4c61] [&>option]:bg-white [&>option]:text-black"
              value={role}
              onChange={event => setRole(event.target.value)}
            >
              <option value="">Selecciona una opcion</option>
              <option value="profesor">Profesor</option>
              <option value="estudiante">Estudiante</option>
              <option value="institucion">Institucion</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <Button
            type="submit"
            className="w-full rounded-xl bg-[#fd4c61] py-4 text-lg font-medium text-white shadow-lg shadow-[#fd4c61]/30 transition hover:bg-[#fd4c61]/90"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Unirme a la lista de espera"}
          </Button>
          {success && <p className="text-green-400 text-sm mt-3">? ¡Gracias! Te contactaremos pronto.</p>}
          {error && <p className="text-red-400 text-sm mt-3">?? Ocurrió un error, inténtalo nuevamente.</p>}
        </form>
        <p className="relative mt-6 text-center text-sm text-white/40">
          Tu informacion esta segura. No compartimos datos con terceros.
        </p>
      </div>
    </section>
  );
}
