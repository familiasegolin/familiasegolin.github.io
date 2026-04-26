import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";

export const Route = createFileRoute("/oferta")({
  head: () => ({
    meta: [
      { title: "Como Ofertar — Família Segolin" },
      {
        name: "description",
        content: "Dados bancários para ofertar à Família Segolin em diversas moedas.",
      },
    ],
  }),
  component: Oferta,
});

type MoedaKey = "real" | "dolar" | "iene" | "euro" | "libra" | "aud";

const moedas: { key: MoedaKey; label: string }[] = [
  { key: "real", label: "🇧🇷 Real (BRL)" },
  { key: "dolar", label: "🇺🇸 Dólar (USD)" },
  { key: "iene", label: "🇯🇵 Iene (JPY)" },
  { key: "euro", label: "🇪🇺 Euro (EUR)" },
  { key: "libra", label: "🇬🇧 Libra (GBP)" },
  { key: "aud", label: "🇦🇺 Dólar AU (AUD)" },
];

type Linha = [string, string];

const contas: Record<MoedaKey, { titulo: string; linhas: Linha[]; obs: string | null }> = {
  real: {
    titulo: "🇧🇷 Conta em Reais (BRL)",
    linhas: [
      ["PIX", "familiasegolin@gmail.com"],
      ["Wise tag", "@rebeccag1531"],
    ],
    obs: "Para informações de CPF, TED/DOC do Caixa Econômica, Nubank, Inter e outros bancos, solicite via WhatsApp.",
  },
  dolar: {
    titulo: "🇺🇸 Conta em Dólar (USD)",
    linhas: [
      ["Wise tag", "@rebeccag1531"],
      ["Nome", "Rebecca Gouvêa Segolin"],
      ["Deposit account", "709403822222360"],
      ["Routing number", "084009519"],
      ["Swift/BIC", "TRWIUS35XXX"],
      ["Endereço", "Wise US Inc, 108 W 13th St, Wilmington, DE, 19801, United States"],
    ],
    obs: "Transferências ACH são gratuitas. Transferências Wire e Swift custam 6,11 USD.",
  },
  iene: {
    titulo: "🇯🇵 Conta em Iene (JPY)",
    linhas: [
      ["Wise tag", "@rebeccag1531"],
      ["— Entre contas ゆうちょ —", ""],
      ["記号 (Código)", "12350"],
      ["番号 (Número)", "60138701"],
      ["— De outros bancos —", ""],
      ["Banco", "ゆうちょ銀行 (Japan Post Bank)"],
      ["支店名 (Agência)", "二三八店 (238)"],
      ["口座種別 (Tipo)", "普通"],
      ["口座番号 (Conta)", "6013870"],
      ["名義 (Nome)", "セザール ゴウベア セゴリン ジュリオ"],
    ],
    obs: null,
  },
  euro: {
    titulo: "🇪🇺 Conta em Euro (EUR)",
    linhas: [
      ["Wise tag", "@rebeccag1531"],
      ["Nome", "Rebecca Gouvêa Segolin"],
      ["IBAN", "BE68 9051 5402 9034"],
      ["Swift/BIC", "TRWIBEB1XXX"],
      ["Banco", "Wise, Rue du Trône 100, 3rd floor, Brussels, 1050, Belgium"],
    ],
    obs: "Transferências Swift custam 2,39 EUR. Bancos na zona SEPA podem usar transferência doméstica.",
  },
  libra: {
    titulo: "🇬🇧 Conta em Libra Esterlina (GBP)",
    linhas: [
      ["Wise tag", "@rebeccag1531"],
      ["Nome", "Rebecca Gouvêa Segolin"],
      ["Conta", "83959844"],
      ["Sort Code", "23-14-70"],
      ["IBAN", "GB09 TRWI 2314 7083 9598 44"],
      ["Swift/BIC", "TRWIGB2LXXX"],
      ["Banco", "Wise Payments Limited, 1st Floor, Worship Square, 65 Clifton Street, London"],
    ],
    obs: "Transferências Swift custam 2,39 GBP. Bancos no Reino Unido podem usar transferência doméstica.",
  },
  aud: {
    titulo: "🇦🇺 Conta em Dólar Australiano (AUD)",
    linhas: [
      ["Wise tag", "@rebeccag1531"],
      ["Nome", "Rebecca Gouvêa Segolin"],
      ["Conta", "221782444"],
      ["Código BSB", "774001"],
      ["Swift/BIC", "TRWIAUS1XXX"],
      ["Banco", "Wise Australia Pty Ltd, Suite 1, Level 11, 66 Goulburn Street, Sydney, NSW, 2000"],
    ],
    obs: "Transferências Swift custam 6,24 AUD. Bancos na Austrália podem usar transferência doméstica.",
  },
};

function Oferta() {
  const [selecionada, setSelecionada] = useState<MoedaKey | null>(null);
  const conta = selecionada ? contas[selecionada] : null;

  return (
    <PageLayout>
      <div className="news-border-b px-8 py-4">
        <p className="font-sans-news text-[10px] tracking-[0.3em] uppercase text-destructive mb-1">
          Nossas contas
        </p>
        <h1 className="font-serif font-black text-4xl">Como Ofertar</h1>
      </div>

      <div className="p-8">
        <p className="font-sans-news text-[11px] tracking-[0.15em] text-muted-foreground mb-6">
          Obrigada por contribuir e confiar em nós. Deus te abençoe! Selecione a moeda para ver os
          dados bancários.
        </p>

        <div className="flex flex-wrap gap-1.5 mb-8">
          {moedas.map((m) => (
            <button
              key={m.key}
              onClick={() => setSelecionada(m.key)}
              className={`px-4 py-2 font-sans-news text-[11px] tracking-[0.14em] uppercase border transition-colors ${
                selecionada === m.key
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-foreground border-border hover:bg-foreground hover:text-background hover:border-foreground"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {conta && (
          <div className="max-w-lg border-t-[3px] border-t-destructive news-border">
            <div className="px-5 py-3.5 bg-muted news-border-b">
              <h2 className="font-serif font-bold text-xl">{conta.titulo}</h2>
            </div>
            <div className="p-5 space-y-0">
              {conta.linhas.map(([k, v], i) =>
                v ? (
                  <div key={i} className="flex gap-3 py-2 border-b border-muted last:border-0">
                    <span className="font-sans-news text-[11px] font-semibold text-muted-foreground min-w-[140px] shrink-0">
                      {k}
                    </span>
                    <span className="font-sans-news text-[11px]">{v}</span>
                  </div>
                ) : (
                  <hr key={i} className="border-border my-2" />
                ),
              )}
              {conta.obs && (
                <p className="mt-4 font-sans-news text-[11px] text-muted-foreground leading-relaxed border-l-[3px] border-l-destructive pl-3 py-1">
                  {conta.obs}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
