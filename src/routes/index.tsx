import { createFileRoute, Link } from "@tanstack/react-router";
import gallery1 from "@/assets/gallery-1.jpeg";
import gallery3 from "@/assets/gallery-3.jpg";
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
      {/* PÔSTER */}
      <main className="poster">
        <h1 className="poster-titulo font-display">
          Peregrinos
          <br />
          no Japão
        </h1>
        <div className="poster-foto">
          <span className="poster-sol" aria-hidden="true" />
          <img
            src={gallery3}
            alt="Julio, Rebecca e Himawari no Japão"
            className="news-img"
            fetchPriority="high"
          />
          <p className="poster-frase" lang="ja">
            諸国はイエスのものです。
          </p>
        </div>
        <div className="poster-texto">
          <p className="text-lg lg:text-xl leading-normal">
            Somos Julio, Rebecca e Himawari, uma família de missionários em tempo integral em Saku,
            Nagano.
          </p>
          <Link to="/apoio" className="botao-poster hidden lg:inline-block">
            Torne-se um mantenedor
          </Link>
        </div>
      </main>

      {/* Verbete: missionário */}
      <section className="bg-foreground text-background px-5 lg:px-14 py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <h2 className="font-display text-5xl lg:text-7xl mb-2">missionário</h2>
            <p className="text-sm mb-1 opacity-70">[ mis · si · o · ná · ri · o ]</p>
            <p className="text-sm mb-6 text-[#FF7A66]">substantivo masculino</p>
            <p className="text-xl lg:text-2xl leading-normal">
              &ldquo;aquele enviado para proclamar o evangelho entre as nações, edificando pontes de
              fé, amor e serviço.&rdquo;
            </p>
          </div>
          <div>
            <p className="text-sm mb-3 opacity-70">Ingredientes</p>
            <ul className="space-y-2">
              {[
                "Fé inabalável",
                "Amor pelo próximo",
                "Serviço às nações",
                "Conexão cultural",
                "Prontidão para a jornada",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-base">
                  <span className="w-2 h-2 rounded-full bg-[#FF5A45] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Sobre Nós */}
      <section className="grid gap-8 lg:grid-cols-2 lg:gap-16 px-5 lg:px-14 py-12 lg:py-16 news-border-b">
        <div>
          <p className="text-sm mb-2 font-semibold text-destructive">Sobre Nós</p>
          <h2 className="font-display text-5xl lg:text-6xl mb-5">Nossa História</h2>
          <p className="text-base lg:text-lg leading-relaxed mb-5">
            Somos a Família Segolin, uma família de missionários em tempo integral, vivendo em Saku,
            Nagano, Japão. Compartilhamos nossa jornada de fé, descobertas e desafios nessa terra de
            cultura rica e tradições milenares. Somos em três: Julio, Rebecca e nossa pequena
            Himawari, que nasceu aqui no Japão.
            <br />
            Te convidamos a conhecer mais sobre nossa trajetória.
          </p>
          <a href="/sobre" className="font-semibold underline underline-offset-4 hover:text-destructive">
            Conhecer Mais →
          </a>
        </div>

        <img
          src={gallery1}
          alt="Rebecca e Julio mostrando os passaportes"
          loading="lazy"
          className="w-full max-w-[460px] aspect-square object-cover object-top news-img lg:justify-self-end"
        />
      </section>

      {/* Mantenedores */}
      <section className="bg-[var(--sol)] text-white px-5 lg:px-14 py-12 lg:py-16">
                <h2 className="font-display text-6xl lg:text-8xl mb-4">Mantenedores</h2>
        <p className="text-lg lg:text-xl leading-normal max-w-2xl mb-6">
          Seja um mantenedor da obra missionária e faça parte da expansão do Reino de Deus nessa
          terra!
        </p>
        <a href="/apoio" className="inline-block bg-white text-black font-bold px-6 py-4">
          Torne-se um mantenedor →
        </a>
      </section>

      {/* FOOTER CONTACT */}
      <section className="grid gap-8 lg:grid-cols-3 px-5 lg:px-14 py-12">
        <div>
          <h2 className="font-display text-4xl lg:text-5xl mb-3">Vamos Conversar?</h2>
          <p className="text-base leading-snug">
            Tem dúvidas ou quer saber mais? Fale com a gente!
          </p>
        </div>
        <div className="flex flex-col justify-center gap-3">
          <a
            href="mailto:familiasegolin@gmail.com"
            className="flex items-center gap-3 text-base hover:text-destructive transition-colors"
          >
            <Mail className="h-5 w-5 shrink-0" /> familiasegolin@gmail.com
          </a>
          <a
            href="https://www.instagram.com/familiasegolin/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 text-base hover:text-destructive transition-colors"
          >
            <InstagramSvg className="h-5 w-5 shrink-0" /> @familiasegolin
          </a>
          <a
            href="https://www.youtube.com/@familiasegolin"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 text-base hover:text-destructive transition-colors"
          >
            <YoutubeSvg className="h-5 w-5 shrink-0" /> @familiasegolin
          </a>
          <a
            href="/contato"
            className="flex items-center gap-3 text-base hover:text-destructive transition-colors"
          >
            <WhatsAppIcon className="h-5 w-5 shrink-0" /> Fale conosco
          </a>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <p className="font-japones text-xl font-bold" lang="ja">
            諸国はイエスのものです。
          </p>
          <p className="text-base">As nações pertencem a Jesus.</p>
        </div>
      </section>
    </PageLayout>
  );
}
