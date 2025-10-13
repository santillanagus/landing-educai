import Image from "next/image";
import Link from "next/link";

export default function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-black/10 backdrop-blur supports-[backdrop-filter]:bg-black/0">
      <div className="mx-auto flex h-[var(--nav-h)] max-w-7xl items-center justify-center px-6 md:px-8">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <Image
            priority
            src="/images/logo-blanco.webp"
            alt="EducAI"
            width={72}
            height={72}
            className="object-contain"
          />
        </Link>
      </div>
    </header>
  );
}
