// Replica el pie de pagina minimalista con dos columnas descrito en la referencia.
import Image from "next/image";
import Link from "next/link";

const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/educai__",
    label: "Instagram",
  },
  {
    href: "https://www.linkedin.com/company/educai-edtech/",
    label: "LinkedIn",
  },
];

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black/40 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div className="space-y-6">
            <Link href="#top" prefetch={false} className="flex items-center gap-3">
              <Image
                src="/images/logo-blanco.webp"
                alt="EducAI"
                width={150}
                height={48}
                className="h-10 w-auto"
              />
            </Link>
            <p className="max-w-xs text-sm/7 text-white/60">
              La revolución de la educación con la inteligencia artificial.
            </p>
          </div>
          <div className="flex flex-col items-start gap-6 md:items-end">
            <div className="space-y-2 text-sm text-white/60">
              <p className="font-semibold text-white">Contacto</p>
              <p>educai.home@gmail.com</p>
            </div>
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/60 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/40">
          &copy; {currentYear} EducAI. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
