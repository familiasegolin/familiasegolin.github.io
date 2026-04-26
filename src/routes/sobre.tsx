import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Quem Somos — Família Segolin" },
      {
        name: "description",
        content: "Conheça a história da Família Segolin, missionários no Japão desde 2023.",
      },
    ],
  }),
  component: Sobre,
});

const secoes = [
  {
    id: "apresentacao",
    label: "Apresentação",
    titulo: "Apresentação pessoal",
    conteudo: [
      "Me chamo Rebecca, sou carioca e meu marido Júlio César é do interior de São Paulo. Somos ambos missionários e nos casamos em dezembro de 2021. Sempre envolvidos com a igreja local e missões em nossas cidades e cidades vizinhas, nos capacitando com cursos disponíveis em nossas igrejas. Fizemos uma escola de treinamento da JOCUM em 2020, uma escola de comunicação em 2021, e eu fiz também uma escola de aconselhamento em 2022. Lideramos juntos uma equipe para o Amazonas nesse mesmo ano, onde trabalhamos com Ribeirinhos e Povos indígenas. Julio também esteve em missões no Sertão de Pernambuco e eu estive no Pantanal antes de nos casarmos. Em janeiro de 2024 trabalhamos com a JAMI no sertão da Paraíba.",
      "Chamados para o campo transcultural, Deus feriu nosso coração com o amor dele pela Ásia, em especial o povo japonês. No final de 2022 à março de 2023 estivemos no Japão, com uma equipe para palestrar sobre aconselhamento. Foi um tempo de espiar a terra e fazer conexões. Em novembro de 2024 nos mudamos de vez para ser resposta para esse povo.",
    ],
    blockquote:
      '"E disse-lhes: Ide por todo o mundo, pregai o evangelho a toda criatura." — Marcos 16:15 ARC',
  },
  {
    id: "visto",
    label: "Como vivemos",
    titulo: "Como vivemos no Japão",
    conteudo: [
      "Tanto eu como meu marido somos missionários em tempo integral. O visto do Júlio é o religioso e o meu visto é o de dependente (dele), tem a duração de 3 anos (vence em 2027), mas temos a pretensão de renovar nossos vistos, pois nosso trabalho missionário nessa nação é a longo prazo. Quanto tempo ficaremos? Não sei, 10, 20, 30 anos? Temos uma Palavra para criar raízes, então não pensamos em retornar para o Brasil, apenas para visitar família, igrejas e amigos, mas é uma viagem de alto custo, logo não sabemos com que frequência isso se dará.",
      "Nos mantemos financeiramente através de apoiadores mensais, exigido pelo próprio governo japonês ao nos dar o visto religioso, pois esse visto não nos permite termos um trabalho no Japão. Nossos apoiadores fazem o compromisso anual (janeiro à dezembro), e todo final do ano buscamos novos apoiadores e/ou convidamos os apoiadores atuais a caminhar conosco no ano seguinte.",
    ],
    blockquote:
      '"Porque eu bem sei os pensamentos que penso de vós, diz o Senhor; pensamentos de paz e não de mal, para vos dar o fim que esperais." — Jeremias 29:11 ARC',
  },
  {
    id: "base",
    label: "Base Missionária",
    titulo: "Base Missionária",
    conteudo: [
      "Atualmente estamos pioneirando a Base Missionária da Organização Rising Sun for Asia. A maioria das igrejas e trabalhos missionários se concentram em regiões onde há mais brasileiros, mas a Base onde moramos é uma localidade bem afastada dos brasileiros, no interior do Japão, o que torna desafiador, porém nosso foco como família é os japoneses, então temos nos dedicado ao estudo do japonês e nos relacionado com nossos vizinhos.",
      "Como Base, por enquanto somos só nós como família morando e cuidando do local. A Base Missionária e a Organização Rising Sun são uma iniciativa da Igreja MEB (Missão Evangélica Bereana), do pastor Inácio, que nos recebeu aqui no Japão e nos cedeu a moradia para realizarmos os trabalhos concernentes a uma Base Missionária interdenominacional.",
    ],
    blockquote: null,
  },
  {
    id: "projetos",
    label: "Nossos projetos",
    titulo: "Nossos projetos",
    conteudo: [
      "Mesmo tendo menos de um ano de trabalho, já tornamos fixo dois acampamentos anuais para jovens e adolescentes das igrejas do Japão, com o intuito de capacitar e despertar o coração dessa geração para fazerem a diferença nessa nação.",
      "Um segundo objetivo como base é receber outros missionários que necessitem de um socorro a curto prazo. O Japão é um país estratégico, por se encontrar próximo de muitos países onde os cristãos são perseguidos. A base está disponível para receber missionários que precisem fugir de situações de perseguição, terem um tempo de descanso e reciclagem.",
      "Por fim, nosso desejo é de abrir uma igreja japonesa nessa região. A longo prazo, semeando o Evangelho nas oportunidades que tivermos, conforme nosso japonês evoluir, queremos oferecer aos japoneses um ambiente de estudo da Palavra e louvor.",
    ],
    blockquote:
      '"O Senhor tinha dito a Abrão: Deixe sua terra natal, seus parentes e a família de seu pai e vá à terra que eu lhe mostrarei." — Gênesis 12:1 NVT',
  },
  {
    id: "japao",
    label: "Por que o Japão?",
    titulo: "Por que o Japão?",
    conteudo: [
      "Essa é a pergunta que todo missionário com o chamado para o Japão mais escuta. O Japão é conhecido como cemitério de missionário, devido à frieza do povo e resistência com o Evangelho.",
      'Como um país de maioria budista e xintoísta, essas religiões fazem parte da cultura, e o cristianismo acaba sendo visto como uma "cultura de fora". O povo japonês é disciplinado e tem a cultura da honra, o que inclui honrar sua própria cultura e tradições.',
      "O Japão é o segundo país menos evangelizado do mundo, mesmo sendo um país aberto ao Evangelho. Cerca de 0,3% apenas são caracterizados como cristãos evangélicos. Nosso objetivo é alcançar japoneses — estudamos o idioma e já conseguimos compartilhar da fé com nossos vizinhos.",
    ],
    blockquote:
      '"A luz brilha na escuridão, e a escuridão nunca conseguiu apagá-la." — João 1:5 NVT',
  },
  {
    id: "apoio",
    label: "Nossos apoiadores",
    titulo: "Quem são nossos apoiadores",
    conteudo: [
      "Igrejas enviadoras: Estamos ligados à Igreja Atos 2 em Maricá - RJ, e à Igreja Batista Monte das Oliveiras em Guararapes - SP. São nossas igrejas de envio, que nos apoiam espiritualmente e também com ofertas mensais.",
      "Igreja recebedora: No Japão, estamos ligados à Igreja MEB, que foi nossa igreja recebedora, e nos apoia com a moradia e espiritualmente.",
      "Igrejas apoiadoras: Igreja Batista da Piedade em Magé – RJ, Igreja Ministério Amar em Maricá - RJ e Igreja Evangélica Cristo Vive no Rio de Janeiro – RJ.",
      "Apoiadores individuais: Além das igrejas, temos também apoiadores individuais, que são pessoas que creem no nosso chamado e decidiram caminhar conosco financeiramente. O pouco de cada um, somado, é o que nos sustenta.",
    ],
    blockquote:
      '"Levai as cargas uns dos outros e assim cumprireis a lei de Cristo." — Gálatas 6:2 ARC',
  },
];

function Sobre() {
  const [ativa, setAtiva] = useState("apresentacao");
  const secao = secoes.find((s) => s.id === ativa)!;

  return (
    <PageLayout>
      <div className="news-border-b px-8 py-4">
        <p className="font-sans-news text-[10px] tracking-[0.3em] uppercase text-destructive mb-1">
          Sobre nós
        </p>
        <h1 className="font-serif font-black text-4xl">Quem Somos</h1>
      </div>

      <div className="news-border-b lg:grid lg:grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <aside className="news-border-b lg:border-b-0 lg:news-border-r">
          <p className="hidden lg:block font-sans-news text-[9px] tracking-[0.3em] uppercase text-muted-foreground px-5 pt-5 pb-2">
            Seções
          </p>
          {/* Mobile: horizontal scroll strip */}
          <div className="flex overflow-x-auto lg:block lg:overflow-x-visible gap-1 lg:gap-0 p-3 lg:p-0 lg:pb-5 lg:space-y-1">
            {secoes.map((s) => (
              <button
                key={s.id}
                onClick={() => setAtiva(s.id)}
                className={`shrink-0 lg:w-full whitespace-nowrap lg:whitespace-normal text-left flex items-center justify-between px-3 py-2 font-sans-news text-[11px] tracking-[0.14em] uppercase border transition-colors ${
                  ativa === s.id
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background text-foreground border-border hover:bg-foreground hover:text-background hover:border-foreground"
                }`}
              >
                {s.label}
                <span className={`ml-2 ${ativa === s.id ? "opacity-100" : "opacity-40"}`}>→</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Content */}
        <div className="p-5 lg:p-8 font-serif text-[14px] leading-relaxed">
          <h2 className="font-serif font-bold text-2xl mb-4 pb-3 news-border-b">{secao.titulo}</h2>
          <div className="space-y-4">
            {secao.conteudo.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
            {secao.blockquote && (
              <blockquote className="border-l-[3px] border-destructive pl-4 italic text-muted-foreground text-[13px] mt-4">
                {secao.blockquote}
              </blockquote>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
