import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: "Galeria — Família Segolin" },
      {
        name: "description",
        content: "Álbuns de fotos da jornada missionária da Família Segolin no Japão.",
      },
    ],
  }),
  component: Galeria,
});

const albums = [
  {
    ano: "2026",
    sub: "Japão",
    itens: [{ label: "Japão 2026", href: "https://photos.app.goo.gl/aLtpPgSGT3eWGxxH6" }],
  },
  {
    ano: "2024–2025",
    sub: "Japão & Brasil",
    itens: [
      { label: "Japão 2024–2025", href: "https://photos.app.goo.gl/BFbxWe61oppBqfvb6" },
      { label: "São Paulo 2024", href: "https://photos.app.goo.gl/CzbRCMxLwb3EzPsQ9" },
      { label: "Rio de Janeiro 2024", href: "https://photos.app.goo.gl/BDygW2R6q5tFzYYr6" },
      { label: "Sertão da Paraíba 2024", href: "https://photos.app.goo.gl/jsPEVqm7vqnygDu3A" },
    ],
  },
  {
    ano: "2023",
    sub: "Japão & Brasil",
    itens: [
      { label: "São Paulo 2023", href: "https://photos.app.goo.gl/uUrXkTvzdvBhk2aq5" },
      { label: "Rio de Janeiro 2023", href: "https://photos.app.goo.gl/99cGr4G8H4p8GL2z7" },
      { label: "Japão 2022–2023", href: "https://photos.app.goo.gl/sjvwEy1fM3oqkSqr5" },
    ],
  },
  {
    ano: "2022",
    sub: "Missões Brasil",
    itens: [
      { label: "Paraná 2022", href: "https://photos.app.goo.gl/z8Mtnt34h79iCvf6A" },
      { label: "Amazonas 2022", href: "https://photos.app.goo.gl/pfSTNBgs2RCFT1UdA" },
      { label: "Rio de Janeiro 2022", href: "https://photos.app.goo.gl/jDaDZdAns7z3gG6p7" },
      { label: "Casamento 2021–2022", href: "https://photos.app.goo.gl/stafWMW8iYvXvrr87" },
    ],
  },
  {
    ano: "2020–2021",
    sub: "",
    itens: [
      { label: "Paraná 2021", href: "https://photos.app.goo.gl/HrrhDURJbV1CN6Yy7" },
      { label: "Rio de Janeiro 2021", href: "https://photos.app.goo.gl/ESd8ygksBb9oKyKVA" },
      { label: "São Paulo 2021", href: "https://photos.app.goo.gl/m2xMFbWGc95ZxneM9" },
      {
        label: "Pantanal & Bolívia 2020–2021 (Rebecca)",
        href: "https://photos.app.goo.gl/peiMiKePFzNd4aiv9",
      },
      { label: "Paraná 2020 (Rebecca)", href: "https://photos.app.goo.gl/53vz6YKJGm4GnGgz8" },
      { label: "2018–2020 (Rebecca)", href: "https://photos.app.goo.gl/BJSoQzTCrEn95j1NA" },
    ],
  },
];

function Galeria() {
  return (
    <PageLayout>
      <div className="news-border-b px-8 py-4">
        <p className="font-sans-news text-[10px] tracking-[0.3em] uppercase text-destructive mb-1">
          Álbuns
        </p>
        <h1 className="font-serif font-black text-4xl">Galeria</h1>
      </div>

      <div className="p-8">
        <p className="font-sans-news text-[11px] tracking-[0.15em] text-muted-foreground mb-8">
          Acesse nossos álbuns de fotos e vídeos por temporada.
        </p>

        <div className="space-y-8">
          {albums.map((grupo) => (
            <div key={grupo.ano}>
              <div className="flex items-baseline gap-3 pb-2 news-border-b mb-3">
                <h2 className="font-serif font-black text-2xl">{grupo.ano}</h2>
                {grupo.sub && (
                  <span className="font-sans-news text-[9px] tracking-[0.3em] uppercase text-muted-foreground">
                    {grupo.sub}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-1.5">
                {grupo.itens.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between px-3.5 py-2.5 news-border font-sans-news text-[11px] tracking-[0.06em] hover:bg-foreground hover:text-background transition-colors"
                  >
                    {item.label}
                    <span className="opacity-40 ml-2">→</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
