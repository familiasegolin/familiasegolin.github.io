import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Quem Somos — Família Segolin" },
      {
        name: "description",
        content: "Conheça a Família Segolin, missionários em Saku, Nagano, no Japão.",
      },
    ],
  }),
  component: Sobre,
});

const blocos = [
  {
    titulo: "Nossa família",
    texto:
      "Somos Rebecca, Júlio César e nossa pequena Himawari, que nasceu aqui no Japão. Nos casamos em dezembro de 2021 e nos mudamos para o Japão em novembro de 2024.",
  },
  {
    titulo: "O que fazemos",
    texto:
      "Moramos em Saku, Nagano, onde pioneiramos a Base Missionária da Rising Sun for Asia. Estudamos japonês, cuidamos da Base, realizamos dois acampamentos por ano para jovens e adolescentes e recebemos missionários que precisam de descanso. Nosso desejo é abrir uma igreja japonesa nessa região.",
  },
  {
    titulo: "Por que o Japão?",
    texto:
      "O Japão é o segundo país menos evangelizado do mundo: cerca de 0,3% da população é cristã evangélica. Nosso foco é alcançar os japoneses.",
  },
  {
    titulo: "Como vivemos",
    texto:
      "Somos missionários em tempo integral e o visto religioso não nos permite ter um trabalho no Japão. Nosso sustento vem de igrejas e mantenedores mensais.",
  },
];

function Sobre() {
  return (
    <PageLayout>
      <div className="cabecalho-pagina">
        <p className="text-xs mb-1">Sobre nós</p>
        <h1 className="font-display text-5xl lg:text-7xl">Quem Somos</h1>
      </div>

      <div className="px-5 lg:px-14 pb-12 grid gap-8 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-10">
        {blocos.map((b) => (
          <section key={b.titulo}>
            <h2 className="font-display text-3xl lg:text-4xl mb-3">{b.titulo}</h2>
            <p className="text-lg leading-relaxed">{b.texto}</p>
          </section>
        ))}

        <div className="lg:col-span-2">
          <p className="text-base mb-5">
            Somos enviados pela Igreja Atos 2, em Maricá (RJ), e pela Igreja Batista Monte das
            Oliveiras, em Guararapes (SP).
          </p>
          <Link to="/apoio" className="botao-poster inline-block !mt-0">
            Torne-se um mantenedor
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
