import { createFileRoute } from "@tanstack/react-router";
import heroJapan from "@/assets/hero-japan.png";
import gallery1 from "@/assets/gallery-1.jpeg";
import gallery2 from "@/assets/gallery-2.png";
import gallery3 from "@/assets/gallery-3.jpg";
import seedIcon from "@/assets/seed-icon.png";
import phoneIcon from "@/assets/phone-icon.png";
import { PageLayout, WhatsAppIcon, InstagramSvg, YoutubeSvg, Mail } from "@/components/PageLayout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Família Segolin" },
      {
        name: "description",
        content:
          "Família Segolin é uma família de missionários vivendo no Japão. Compartilhamos nossa jornada de fé, descobertas e desafios nessa terra de cultura rica e tradições milenares.",
      },
      { property: "og:title", content: "Família Segolin — Vida & Missão" },
      {
        property: "og:description",
        content: "Família Segolin é uma família de missionários vivendo no Japão. Compartilhamos nossa jornada de fé, descobertas e desafios nessa terra de cultura rica e tradições milenares.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <PageLayout>
      {/* MAIN GRID */}
      <main className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] news-border-b items-stretch">
        {/* Verbete: missionário */}
        <section className="p-6 news-border-b lg:border-b-0 lg:news-border-r">
          <h2 className="font-serif font-black text-4xl leading-none mb-1">missionário</h2>
          <p className="font-sans-news text-[10px] text-muted-foreground mb-1">
            [ mis · si · o · ná · ri · o ]
          </p>
          <p className="font-sans-news text-[9px] tracking-[0.22em] uppercase text-destructive mb-3">
            substantivo masculino
          </p>

          <hr className="border-border mb-3" />

          <p className="font-serif italic text-[13px] leading-relaxed mb-4">
            &ldquo;aquele enviado para proclamar o evangelho entre as nações, edificando pontes de
            fé, amor e serviço.&rdquo;
          </p>

          <p className="font-sans-news text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
            Ingredientes
          </p>
          <ul className="space-y-[5px] mb-4">
            {[
              "Fé inabalável",
              "Amor pelo próximo",
              "Serviço às nações",
              "Conexão cultural",
              "Prontidão para a jornada",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 font-sans-news text-[11px]">
                <span className="w-[5px] h-[5px] rounded-full bg-destructive shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Hero image */}
        <div className="relative overflow-hidden h-64 lg:h-auto">
          <img
            src={heroJapan}
            alt="Pagode japonês com vista para montanhas em Saku"
            className="absolute inset-0 w-full h-full object-cover news-img"
          />
        </div>
      </main>

      {/* THREE COLUMN SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-3 news-border-b">
        {/* Galeria */}
        <article className="p-6 news-border-b lg:border-b-0 lg:news-border-r flex flex-col">
          <p className="font-sans-news text-[10px] tracking-[0.25em] uppercase mb-2 font-bold text-destructive">
            Galeria
          </p>
          <h3 className="font-serif font-black text-3xl mb-4">Fotos da Missão</h3>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[gallery1, gallery2, gallery3].map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Galeria ${i + 1}`}
                loading="lazy"
                width={512}
                height={512}
                className="aspect-square object-cover news-img"
              />
            ))}
          </div>
          <a
            href="/galeria"
            className="font-sans-news text-[11px] tracking-[0.25em] uppercase font-bold mt-auto hover:underline"
          >
            Ver Galeria →
          </a>
        </article>

        {/* Sobre Nós */}
        <article className="p-6 news-border-b lg:border-b-0 lg:news-border-r flex flex-col">
          <p className="font-sans-news text-[10px] tracking-[0.25em] uppercase mb-2 font-bold text-destructive">
            Sobre Nós
          </p>
          <h3 className="font-serif font-black text-3xl mb-4">Nossa História</h3>
          <p className="font-serif text-[15px] leading-relaxed mb-6">
            Somos a Família Segolin, uma família de missionários em tempo integral, vivendo em Saku,
            Nagano, Japão. Compartilhamos nossa jornada de fé, descobertas e desafios nessa terra de
            cultura rica e tradições milenares. Somos em três: Julio, Rebecca e nossa pequena
            Himawari, que nasceu aqui no Japão.
            <br />
            Te convidamos a conhecer mais sobre nossa trajetória.
          </p>
          <a
            href="/sobre"
            className="font-sans-news text-[11px] tracking-[0.25em] uppercase font-bold mt-auto hover:underline"
          >
            Conhecer Mais →
          </a>
        </article>

        {/* Apoie-nos */}
        <article className="p-6 flex flex-col">
          <p className="font-sans-news text-[10px] tracking-[0.25em] uppercase mb-2 font-bold text-destructive">
            Apoie-nos
          </p>
          <h3 className="font-serif font-black text-3xl mb-3">Semeadores</h3>
          <div className="flex justify-center mb-3">
            <img src={seedIcon} alt="" width={200} height={120} className="h-24 object-contain" />
          </div>
          <p className="font-serif text-[15px] leading-relaxed mb-4">
            Seja um semeador na obra missionária e faça parte da expansão do Reino de Deus nessa
            terra!
          </p>
          <a
            href="/apoio"
            className="font-sans-news text-[11px] tracking-[0.25em] uppercase font-bold mt-auto hover:underline"
          >
            Apoie-nos →
          </a>
        </article>
      </section>

      {/* FOOTER CONTACT */}
      <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_1fr] gap-0 p-5">
        <div className="border border-dashed border-foreground p-4 flex items-center gap-4 mb-4 lg:mb-0">
          <img
            src={phoneIcon}
            alt=""
            width={100}
            height={100}
            className="h-16 w-16 object-contain shrink-0"
          />
          <div>
            <h4 className="font-sans-news font-black text-base tracking-[0.15em] uppercase mb-1">
              Vamos Conversar?
            </h4>
            <p className="font-serif text-sm leading-snug">
              Tem dúvidas ou quer saber mais? Fale com a gente!
            </p>
          </div>
        </div>
        <div className="px-6 flex flex-col justify-center gap-2 font-serif py-4 lg:py-0">
          <a
            href="mailto:familiasegolin@gmail.com"
            className="flex items-center gap-3 text-sm hover:opacity-70 transition-opacity"
          >
            <Mail className="h-4 w-4 shrink-0" /> familiasegolin@gmail.com
          </a>
          <a
            href="https://www.instagram.com/familiasegolin/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 text-sm hover:opacity-70 transition-opacity"
          >
            <InstagramSvg className="h-4 w-4 shrink-0" /> @familiasegolin
          </a>
          <a
            href="https://www.youtube.com/@familiasegolin"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 text-sm hover:opacity-70 transition-opacity"
          >
            <YoutubeSvg className="h-4 w-4 shrink-0" /> @familiasegolin
          </a>
          <a
            href="/contato"
            className="flex items-center gap-3 text-sm hover:opacity-70 transition-opacity"
          >
            <WhatsAppIcon className="h-4 w-4 shrink-0" /> Fale conosco
          </a>
        </div>
        <div className="px-6 flex flex-col justify-center font-serif italic text-base leading-snug gap-2 py-4 lg:py-0">
          <p className="font-bold">諸国はイエスのものです。</p>
          <p>As nações pertencem a Jesus.</p>
        </div>
      </section>
    </PageLayout>
  );
}
