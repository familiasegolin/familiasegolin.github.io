import { useState } from "react";
import logoJapa from "@/assets/logo.svg";
import { Link, useRouterState } from "@tanstack/react-router";
export { Mail } from "lucide-react";

const navItems = [
  { label: "Início", to: "/" as const },
  { label: "Quem Somos", to: "/sobre" as const },
  { label: "Galeria", to: "/galeria" as const },
  { label: "Apoie-nos", to: "/apoio" as const },
  { label: "Como Ofertar", to: "/oferta" as const },
  { label: "Contato", to: "/contato" as const },
];

export function InstagramSvg({ className }: { readonly className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export function YoutubeSvg({ className }: { readonly className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: { readonly className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.78 17.5 2 12.04 2zm0 1.67c2.2 0 4.26.86 5.82 2.42 1.55 1.56 2.4 3.63 2.4 5.83 0 4.54-3.69 8.23-8.23 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.19-.32A8.17 8.17 0 0 1 3.8 11.9c.01-4.54 3.7-8.24 8.24-8.24zm-3.51 4.34c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07s.89 2.4 1.01 2.57c.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.1-.22-.16-.47-.27-.25-.14-1.47-.74-1.69-.82-.23-.08-.39-.12-.56.13-.17.24-.65.8-.79.96-.15.17-.29.19-.53.07-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.24-.01-.38.11-.5.11-.11.26-.29.38-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.57-1.35-.78-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01z" />
    </svg>
  );
}

export function PageLayout({ children }: { children: React.ReactNode }) {
  const { location } = useRouterState();
  const pathname = location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground p-3 lg:p-4">
      <div className="mx-auto max-w-[1400px] news-border bg-background">
        {/* MASTHEAD */}
        <header className="news-border-b">
          {/* Desktop: 3 columns */}
          <div className="hidden lg:grid grid-cols-[180px_1fr_220px]">
            <div className="flex items-center justify-center news-border-r p-4">
              <img
                src={logoJapa}
                alt="Família Segolin logo"
                className="h-20 w-auto object-contain"
              />
            </div>
            <div className="text-center px-6 py-4">
              <p className="font-sans-news text-[11px] tracking-[0.3em] uppercase mb-1">
                Japão • missão
              </p>
              <Link to="/">
                <h1 className="font-serif font-black text-5xl lg:text-6xl tracking-tight leading-none hover:opacity-80 transition-opacity">
                  FAMÍLIA SEGOLIN
                </h1>
              </Link>
              <p className="font-sans-news text-[11px] tracking-[0.25em] uppercase mt-2">
                peregrinos na terra do sol nascente
              </p>
            </div>
            <div className="text-center news-border-l p-4 flex flex-col justify-center font-sans-news text-[11px] tracking-[0.2em] uppercase">
              <p className="font-bold">Saku</p>
              <p className="mb-3">Nagano, Japão</p>
              <p>08 de maio, 2025</p>
              <p>Edição #01</p>
            </div>
          </div>

          {/* Mobile: logo + title + hamburger */}
          <div className="lg:hidden grid grid-cols-[56px_1fr_56px] items-stretch">
            <div className="flex items-center justify-center news-border-r p-3">
              <img
                src={logoJapa}
                alt="Família Segolin logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="text-center px-3 py-3">
              <p className="font-sans-news text-[9px] tracking-[0.3em] uppercase mb-0.5">
                Japão • missão
              </p>
              <Link to="/">
                <h1 className="font-serif font-black text-2xl tracking-tight leading-none">
                  FAMÍLIA SEGOLIN
                </h1>
              </Link>
              <p className="font-sans-news text-[9px] tracking-[0.2em] uppercase mt-1">
                peregrinos na terra do sol nascente
              </p>
            </div>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="news-border-l flex items-center justify-center p-3 text-xl"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>

          {/* Mobile date strip */}
          <div className="lg:hidden news-border-t text-center py-2 font-sans-news text-[9px] tracking-[0.2em] uppercase">
            <span className="font-bold">Saku</span>
            {" · "}Nagano, Japão{" · "}08 de maio, 2025{" · "}Edição #01
          </div>

          {/* Mobile dropdown nav */}
          {menuOpen && (
            <nav className="lg:hidden news-border-t">
              {navItems.map((item, i) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-3 px-5 font-serif italic text-base transition-colors ${
                    i < navItems.length - 1 ? "news-border-b" : ""
                  } ${
                    pathname === item.to
                      ? "bg-foreground text-background"
                      : "hover:bg-foreground hover:text-background"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </header>

        {/* Desktop NAV */}
        <nav className="hidden lg:grid grid-cols-6 news-border-b">
          {navItems.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              className={`text-center py-3 font-serif italic text-base transition-colors ${i > 0 ? "news-border-l" : ""} ${
                pathname === item.to
                  ? "bg-foreground text-background"
                  : "hover:bg-foreground hover:text-background"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {children}

        {/* COPYRIGHT */}
        <footer className="news-border-t grid grid-cols-3 p-3 font-sans-news text-[10px] tracking-[0.2em] uppercase">
          <p>© Desenvolvido por Rebecca Segolin</p>
          <p className="text-center flex items-center justify-center gap-3">
            <a
              href="https://www.instagram.com/familiasegolin/"
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-60 transition-opacity"
            >
              <InstagramSvg className="h-3 w-3" />
            </a>
            <a
              href="https://www.youtube.com/@familiasegolin"
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-60 transition-opacity"
            >
              <YoutubeSvg className="h-3 w-3" />
            </a>
            <a href="/contato" className="hover:opacity-60 transition-opacity">
              <WhatsAppIcon className="h-3 w-3" />
            </a>
          </p>
          <p className="text-right">YHWH</p>
        </footer>
      </div>
    </div>
  );
}
