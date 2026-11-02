import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";

export const Route = createFileRoute("/pix-recorrente")({
  head: () => ({
    meta: [
      { title: "Como programar o PIX recorrente — Família Segolin" },
      {
        name: "description",
        content: "Passo a passo para programar uma oferta mensal por PIX para a Família Segolin.",
      },
    ],
  }),
  component: PixRecorrente,
});

const CHAVE = "familiasegolin@gmail.com";

const passos: [string, string][] = [
  ["Abra o app do seu banco", "Entre na área do PIX e escolha fazer uma transferência."],
  ["Use a nossa chave", "Selecione a opção de chave PIX e cole a chave acima."],
  ["Digite o valor", "Coloque o valor que você escolheu ofertar por mês."],
  ["Confira o destinatário", "Antes de continuar, veja se os dados são os da nossa conta."],
  [
    "Programe a repetição",
    "Na tela de confirmação, procure a opção de agendar ou repetir e escolha todo mês.",
  ],
  ["Escolha o dia e confirme", "Defina o dia da oferta e até quando ela deve se repetir."],
];

function PixRecorrente() {
  const [copiada, setCopiada] = useState(false);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(CHAVE);
      setCopiada(true);
      setTimeout(() => setCopiada(false), 2500);
    } catch {
      setCopiada(false);
    }
  }

  return (
    <PageLayout>
      <div className="cabecalho-pagina">
        <p className="font-sans-news text-xs mb-1">Passo a passo</p>
        <h1 className="font-display text-5xl lg:text-7xl">PIX recorrente</h1>
      </div>

      <div className="px-5 lg:px-14 pb-10 max-w-2xl">
        <p className="font-sans-news text-base text-muted-foreground mb-6">
          Com o PIX programado, sua oferta sai todo mês no dia que você escolher, sem precisar
          lembrar. Obrigada por caminhar conosco!
        </p>

        <div className="border-t-[3px] border-t-destructive news-border mb-8">
          <div className="px-5 py-3.5 bg-muted news-border-b">
            <h2 className="font-display text-2xl">Nossa chave PIX</h2>
          </div>
          <div className="p-5 flex flex-wrap items-center justify-between gap-3">
            <span className="font-sans-news text-base font-semibold break-all min-w-0">
              {CHAVE}
            </span>
            <button
              type="button"
              onClick={copiar}
              className="min-h-11 px-4 py-2 font-sans-news text-sm font-semibold border border-foreground bg-foreground text-background hover:bg-destructive hover:border-destructive transition-colors"
            >
              {copiada ? "Chave copiada" : "Copiar chave"}
            </button>
          </div>
        </div>

        <ol className="space-y-4">
          {passos.map(([titulo, texto], i) => (
            <li key={titulo} className="flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-foreground text-background font-sans-news text-sm font-semibold">
                {i + 1}
              </span>
              <div className="min-w-0">
                <h3 className="font-sans-news text-base font-semibold">{titulo}</h3>
                <p className="font-sans-news text-base text-muted-foreground">{texto}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-8 font-sans-news text-sm text-muted-foreground leading-relaxed border-l-[3px] border-l-destructive pl-3 py-1">
          Os nomes das opções mudam de um banco para outro. Se não encontrar, procure por PIX
          agendado na ajuda do app. Você pode alterar ou cancelar quando quiser, pelo próprio banco.
        </p>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-sans-news text-base">
          <Link to="/apoio" className="hover:underline">
            ← Voltar para o formulário
          </Link>
          <Link to="/contato" className="hover:underline">
            Fale conosco →
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
