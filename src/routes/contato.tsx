import { createFileRoute } from "@tanstack/react-router";
import rebeccaImg from "@/assets/rebecca.jpeg";
import julioImg from "@/assets/julio.jpeg";
import grupoImg from "@/assets/grupo.jpeg";
import { PageLayout } from "@/components/PageLayout";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Família Segolin" },
      { name: "description", content: "Entre em contato com a Família Segolin via WhatsApp." },
    ],
  }),
  component: Contato,
});

const contatos = [
  {
    href: "https://api.whatsapp.com/send?phone=819063493221&text=Ol%C3%A1%2C%20Rebecca!",
    img: rebeccaImg,
    nome: "WhatsApp da Rebecca",
    sub: "",
  },
  {
    href: "https://api.whatsapp.com/send?phone=817022824829&text=Ol%C3%A1%2C%20J%C3%BAlio!",
    img: julioImg,
    nome: "WhatsApp do Júlio César",
    sub: "",
  },
  {
    href: "https://chat.whatsapp.com/BfkTFQK31rU9ThG0Ek1Ogu?mode=wwt",
    img: grupoImg,
    nome: "Grupo de Informativos",
    sub: "Por favor, se identifique no privado para ser aceito no grupo.",
  },
];

function Contato() {
  return (
    <PageLayout>
      <div className="news-border-b px-8 py-4">
        <p className="font-sans-news text-[10px] tracking-[0.3em] uppercase text-destructive mb-1">
          WhatsApp
        </p>
        <h1 className="font-serif font-black text-4xl">Contato</h1>
      </div>

      <div className="p-8">
        <p className="font-sans-news text-[11px] tracking-[0.15em] text-muted-foreground mb-8">
          Entre em contato conosco via WhatsApp.
        </p>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-1.5 max-w-3xl">
          {contatos.map((c) => (
            <a
              key={c.href}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 p-4 news-border hover:bg-foreground hover:text-background transition-colors group"
            >
              <img
                src={c.img}
                alt={c.nome}
                className="w-12 h-12 rounded-full object-cover object-top shrink-0 border border-border group-hover:border-background/30"
              />
              <div className="flex-1 min-w-0">
                <p className="font-sans-news text-[11px] tracking-[0.06em] uppercase font-semibold">
                  {c.nome}
                </p>
                {c.sub && (
                  <p className="font-serif text-[12px] text-muted-foreground mt-0.5 group-hover:text-background/60">
                    {c.sub}
                  </p>
                )}
              </div>
              <span className="opacity-40 group-hover:opacity-100">→</span>
            </a>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
