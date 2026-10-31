import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { PageLayout } from "@/components/PageLayout";

export const Route = createFileRoute("/apoio")({
  head: () => ({
    meta: [
      { title: "Torne-se um mantenedor — Família Segolin" },
      {
        name: "description",
        content: "Torne-se um mantenedor mensal da Família Segolin.",
      },
    ],
  }),
  component: Apoio,
});

type Tipo = "fisica" | "juridica" | "igreja" | "grupo" | "";
type Moeda = "reais" | "ienes" | "dolares" | "euro" | "outro";
type Lembrete = "05" | "15" | "25" | "não" | "";

interface FormData {
  tipo: Tipo;
  nome: string;
  aniversario: string;
  whatsapp: string;
  informativo: string;
  valor: string;
  moeda: Moeda;
  lembrete: Lembrete;
  ate_mes: string;
  ate_ano: string;
}

interface Membro {
  nome: string;
  aniversario: string;
}

const etapas = ["Quem", "Seus dados", "Contato", "Valor", "Confirmar"];

const tipos: { valor: Tipo; texto: string; nome: string }[] = [
  { valor: "fisica", texto: "Pessoa física", nome: "Nome e sobrenome" },
  { valor: "juridica", texto: "Pessoa jurídica", nome: "Nome da empresa" },
  { valor: "igreja", texto: "Igreja", nome: "Nome da igreja" },
  { valor: "grupo", texto: "Grupo / Família", nome: "Nome do grupo ou da família" },
];

const moedas: { valor: Moeda; texto: string; simbolo: string }[] = [
  { valor: "reais", texto: "Reais", simbolo: "R$" },
  { valor: "ienes", texto: "Ienes", simbolo: "¥" },
  { valor: "dolares", texto: "Dólares", simbolo: "US$" },
  { valor: "euro", texto: "Euro", simbolo: "€" },
  { valor: "outro", texto: "Outra moeda", simbolo: "" },
];

const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const dataBr = (d: string) => d.split("-").reverse().join("/");

const textoLembrete = (l: Lembrete) => (l === "não" ? "Não receber" : `Dia ${l}`);

const btnBase =
  "inline-flex min-h-12 items-center justify-center px-6 py-3 font-semibold text-base border transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-wait";
const btnOutline = `${btnBase} border-foreground bg-background text-foreground hover:bg-foreground hover:text-background`;
const btnPrimary = `${btnBase} flex-1 sm:flex-none border-foreground bg-foreground text-background hover:bg-destructive hover:border-destructive`;

const sidebarLinks: [string, string][] = [
  [
    "Como programar o PIX recorrente",
    "https://docs.google.com/spreadsheets/d/1n_JPwwq_5Q8L7VKNSJf4jQRtSBOOtEKSFpbkZOQoytQ/edit?usp=sharing",
  ],
  ["Entre no grupo de informativos", "https://chat.whatsapp.com/BfkTFQK31rU9ThG0Ek1Ogu"],
];

const inputCls =
  "block w-full min-w-0 max-w-full min-h-12 mt-1 px-3 py-2 border border-border bg-white text-base outline-none focus:ring-2 focus:ring-foreground transition-shadow";
const labelCls = "block text-sm font-semibold mt-5 first:mt-0";

function Opcao({
  nome,
  valor,
  atual,
  aoEscolher,
  children,
}: {
  nome: string;
  valor: string;
  atual: string;
  aoEscolher: (v: string) => void;
  children: React.ReactNode;
}) {
  const marcada = atual === valor;
  return (
    <label
      className={`flex min-h-12 items-center gap-3 px-4 py-3 border border-foreground text-base cursor-pointer transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-destructive ${
        marcada ? "bg-foreground text-background font-semibold" : "bg-white hover:bg-muted"
      }`}
    >
      <input
        type="radio"
        name={nome}
        value={valor}
        checked={marcada}
        onChange={() => aoEscolher(valor)}
        className="sr-only"
      />
      {children}
    </label>
  );
}

function Apoio() {
  const hoje = new Date();
  const anoAtual = hoje.getFullYear();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [armadilha, setArmadilha] = useState("");
  const chegouNaConfirmacao = useRef(0);
  const [membros, setMembros] = useState<Membro[]>([{ nome: "", aniversario: "" }]);
  const [error, setError] = useState("");
  const [form, setForm] = useState<FormData>({
    tipo: "",
    nome: "",
    aniversario: "",
    whatsapp: "",
    informativo: "",
    valor: "",
    moeda: "reais",
    lembrete: "",
    ate_mes: "12",
    ate_ano: String(anoAtual + 1),
  });

  const set =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  const escolher = (field: keyof FormData) => (v: string) => {
    setError("");
    setForm((f) => ({ ...f, [field]: v }));
  };

  const ehGrupo = form.tipo === "grupo";
  const membrosPreenchidos = membros
    .map((m) => ({ ...m, nome: m.nome.trim() }))
    .filter((m) => m.nome || m.aniversario);
  const mudarMembro = (i: number, campo: keyof Membro, valor: string) =>
    setMembros((l) => l.map((m, n) => (n === i ? { ...m, [campo]: valor } : m)));

  const tipoAtual = tipos.find((t) => t.valor === form.tipo);
  const moedaAtual = moedas.find((m) => m.valor === form.moeda)!;

  const mudarEtapa = (n: number) => {
    setError("");
    if (n === 5) chegouNaConfirmacao.current = Date.now();
    setStep(n);
    window.scrollTo({ top: 0 });
  };

  const next = () => {
    setError("");
    if (step === 1 && !form.tipo) return setError("Escolha uma opção para continuar.");
    if (step === 2 && !form.nome.trim()) return setError("Informe o nome.");
    if (step === 2 && ehGrupo && membrosPreenchidos.some((m) => !m.nome))
      return setError("Informe o nome de cada pessoa com aniversário.");
    if (step === 3 && !form.whatsapp.trim()) return setError("Informe o WhatsApp.");
    if (step === 3 && !form.informativo)
      return setError("Diga se quer entrar no grupo de informativos.");
    if (step === 4 && !(Number(form.valor) > 0)) return setError("Informe o valor mensal.");
    if (step === 4 && Number(form.ate_ano) * 12 + Number(form.ate_mes) < anoAtual * 12 + hoje.getMonth() + 1)
      return setError("Escolha um mês a partir de hoje.");
    if (step === 4 && !form.lembrete) return setError("Escolha uma opção de lembrete.");
    mudarEtapa(step + 1);
  };

  // Envia só pelo botão de confirmar. O toque duplo em "Continuar" cairia nele,
  // que aparece no mesmo lugar, por isso a espera logo depois de chegar à etapa.
  const enviar = async () => {
    if (step < 5 || enviando || Date.now() - chegouNaConfirmacao.current < 1000) return;
    setError("");
    setEnviando(true);
    try {
      const res = await fetch(
        "https://gzjuejmhlriwkrtcwmhi.supabase.co/functions/v1/formulario-mantenedor",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            aniversario: ehGrupo ? "" : form.aniversario,
            membros: ehGrupo ? membrosPreenchidos : [],
            site: armadilha,
          }),
        },
      );
      if (res.ok) {
        setSubmitted(true);
        window.scrollTo({ top: 0 });
      } else {
        setError("Não foi possível enviar. Tente novamente.");
      }
    } catch {
      setError("Sem conexão. Verifique a internet e tente novamente.");
    } finally {
      setEnviando(false);
    }
  };

  const resumo: [string, string, number][] = [
    ["Como", tipoAtual?.texto ?? "", 1],
    ["Nome", form.nome, 2],
    ...(!ehGrupo && form.aniversario
      ? ([["Aniversário", dataBr(form.aniversario), 2]] as [string, string, number][])
      : []),
    ...(ehGrupo && membrosPreenchidos.length
      ? ([
          [
            "Aniversários",
            membrosPreenchidos
              .map((m) => (m.aniversario ? `${m.nome} (${dataBr(m.aniversario)})` : m.nome))
              .join(", "),
            2,
          ],
        ] as [string, string, number][])
      : []),
    ["WhatsApp", form.whatsapp, 3],
    ["Grupo de informativos", form.informativo === "sim" ? "Sim" : "Não", 3],
    ["Valor mensal", `${moedaAtual.simbolo} ${form.valor}${moedaAtual.simbolo ? "" : " (outra moeda)"}`.trim(), 4],
    ["Compromisso até", `${meses[Number(form.ate_mes) - 1]} de ${form.ate_ano}`, 4],
    ["Lembrete", form.lembrete ? textoLembrete(form.lembrete) : "", 4],
  ];

  return (
    <PageLayout>
      <div className="cabecalho-pagina">
        <h1 className="font-display text-5xl lg:text-7xl">Torne-se um mantenedor</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px]">
        {/* FORM COLUMN */}
        <div className="px-5 lg:px-14 pb-10 lg:news-border-r">
          {submitted ? (
            <div aria-live="polite" className="max-w-xl">
              <h2 className="font-display text-4xl mb-3">Obrigada por caminhar conosco!</h2>
              <p className="text-lg leading-relaxed mb-6">
                Recebemos seu compromisso e entraremos em contato pelo WhatsApp.
              </p>
              <Link to="/oferta" className={btnPrimary}>
                Ver dados para ofertar
              </Link>
            </div>
          ) : (
            <div className="max-w-xl">
              {step === 1 && (
                <div className="mb-6">
                  <p className="text-base leading-relaxed mb-3">
                    Este formulário é um compromisso de apoio mensal, e você escolhe até quando quer
                    caminhar conosco. Caso precise encerrar antes, basta nos comunicar. Obrigada por
                    nos ajudar nessa caminhada.
                  </p>
                  <blockquote className="border-l-[3px] border-l-destructive pl-3 italic text-sm text-muted-foreground">
                    &ldquo;Levai as cargas uns dos outros e assim cumprireis a lei de Cristo.&rdquo;
                    — Gálatas 6:2 ARC
                  </blockquote>
                </div>
              )}

              {/* PROGRESSO */}
              <div className="mb-6">
                <p className="text-sm font-semibold mb-2" aria-live="polite">
                  Etapa {step} de {etapas.length}: {etapas[step - 1]}
                </p>
                <div className="grid grid-cols-5 gap-1" aria-hidden="true">
                  {etapas.map((e, i) => (
                    <span
                      key={e}
                      className={`h-1.5 ${i < step ? "bg-[var(--sol)]" : "bg-muted"}`}
                    />
                  ))}
                </div>
              </div>

              <form
                onSubmit={(e) => e.preventDefault()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target instanceof HTMLInputElement && step < 5) {
                    e.preventDefault();
                    next();
                  }
                }}
              >
                {/* Campo invisível para barrar robôs */}
                <input
                  type="text"
                  name="site"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={armadilha}
                  onChange={(e) => setArmadilha(e.target.value)}
                  className="absolute -left-[9999px] h-0 w-0"
                />

                {/* STEP 1 */}
                {step === 1 && (
                  <fieldset className="space-y-2">
                    <legend className="text-lg font-semibold mb-3">Você vai apoiar como?</legend>
                    {tipos.map((t) => (
                      <Opcao
                        key={t.valor}
                        nome="tipo"
                        valor={t.valor}
                        atual={form.tipo}
                        aoEscolher={escolher("tipo")}
                      >
                        {t.texto}
                      </Opcao>
                    ))}
                  </fieldset>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <div>
                    <label className={labelCls} htmlFor="nome">
                      {tipoAtual?.nome}
                    </label>
                    <input
                      id="nome"
                      type="text"
                      autoComplete="name"
                      autoFocus
                      value={form.nome}
                      onChange={set("nome")}
                      className={inputCls}
                    />
                    {ehGrupo ? (
                      <fieldset className="mt-5">
                        <legend className="text-sm font-semibold mb-2">
                          Aniversários do grupo <span className="font-normal">(opcional)</span>
                        </legend>
                        <div className="space-y-3">
                          {membros.map((m, i) => (
                            <div key={i} className="relative border border-foreground p-3 pr-11">
                              <label className="block text-sm" htmlFor={`membro-nome-${i}`}>
                                Nome
                              </label>
                              <input
                                id={`membro-nome-${i}`}
                                type="text"
                                value={m.nome}
                                onChange={(e) => mudarMembro(i, "nome", e.target.value)}
                                className={inputCls}
                              />
                              <label className="block text-sm mt-3" htmlFor={`membro-data-${i}`}>
                                Aniversário
                              </label>
                              <input
                                id={`membro-data-${i}`}
                                type="date"
                                value={m.aniversario}
                                onChange={(e) => mudarMembro(i, "aniversario", e.target.value)}
                                className={inputCls}
                              />
                              {membros.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => setMembros((l) => l.filter((_, n) => n !== i))}
                                  className="absolute right-0 top-0 h-11 w-11 text-lg hover:text-destructive"
                                  aria-label={`Remover pessoa ${i + 1}`}
                                >
                                  ✕
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                        {membros.length < 20 && (
                          <button
                            type="button"
                            onClick={() => setMembros((l) => [...l, { nome: "", aniversario: "" }])}
                            className="mt-3 min-h-11 font-semibold underline underline-offset-4 hover:text-destructive"
                          >
                            + Adicionar pessoa
                          </button>
                        )}
                      </fieldset>
                    ) : (
                      <>
                        <label className={labelCls} htmlFor="aniversario">
                          Aniversário <span className="font-normal">(opcional)</span>
                        </label>
                        <input
                          id="aniversario"
                          type="date"
                          value={form.aniversario}
                          onChange={set("aniversario")}
                          className={inputCls}
                        />
                      </>
                    )}
                  </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <div>
                    <label className={labelCls} htmlFor="whatsapp">
                      WhatsApp
                    </label>
                    <p className="text-sm text-muted-foreground">
                      Com DDD. Fora do Brasil, inclua o código do país.
                    </p>
                    <input
                      id="whatsapp"
                      type="tel"
                      autoComplete="tel"
                      value={form.whatsapp}
                      onChange={set("whatsapp")}
                      placeholder="(21) 99999-9999"
                      className={inputCls}
                    />
                    <fieldset className="mt-6 space-y-2">
                      <legend className="text-sm font-semibold">
                        Quer entrar no grupo de informativos?
                      </legend>
                      <p className="text-sm text-muted-foreground mb-2">
                        O grupo facilita nossa comunicação com vocês.
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <Opcao
                          nome="informativo"
                          valor="sim"
                          atual={form.informativo}
                          aoEscolher={escolher("informativo")}
                        >
                          Sim
                        </Opcao>
                        <Opcao
                          nome="informativo"
                          valor="nao"
                          atual={form.informativo}
                          aoEscolher={escolher("informativo")}
                        >
                          Não
                        </Opcao>
                      </div>
                    </fieldset>
                  </div>
                )}

                {/* STEP 4 */}
                {step === 4 && (
                  <div>
                    <div className="grid grid-cols-2 items-end gap-3">
                      <div>
                        <label className={labelCls} htmlFor="valor">
                          Valor mensal
                        </label>
                        <div className="relative">
                          {moedaAtual.simbolo && (
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base font-semibold">
                              {moedaAtual.simbolo}
                            </span>
                          )}
                          <input
                            id="valor"
                            type="number"
                            inputMode="decimal"
                            min="1"
                            value={form.valor}
                            onChange={set("valor")}
                            className={`${inputCls} ${moedaAtual.simbolo ? "pl-12" : ""}`}
                          />
                        </div>
                      </div>
                      <div>
                        <label className={labelCls} htmlFor="moeda">
                          Moeda
                        </label>
                        <select
                          id="moeda"
                          value={form.moeda}
                          onChange={set("moeda")}
                          className={inputCls}
                        >
                          {moedas.map((m) => (
                            <option key={m.valor} value={m.valor}>
                              {m.texto}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <fieldset className="mt-6">
                      <legend className="text-sm font-semibold mb-1">
                        Até quando vai seu compromisso?
                      </legend>
                      <div className="grid grid-cols-2 items-end gap-3">
                        <select
                          aria-label="Mês"
                          value={form.ate_mes}
                          onChange={set("ate_mes")}
                          className={inputCls}
                        >
                          {meses.map((m, i) => (
                            <option key={m} value={i + 1}>
                              {m}
                            </option>
                          ))}
                        </select>
                        <select
                          aria-label="Ano"
                          value={form.ate_ano}
                          onChange={set("ate_ano")}
                          className={inputCls}
                        >
                          {[0, 1, 2, 3, 4, 5].map((n) => (
                            <option key={n} value={anoAtual + n}>
                              {anoAtual + n}
                            </option>
                          ))}
                        </select>
                      </div>
                    </fieldset>
                    <fieldset className="mt-6">
                      <legend className="text-sm font-semibold mb-2">
                        Quer receber um lembrete mensal no WhatsApp?
                      </legend>
                      <div className="grid grid-cols-2 gap-2">
                        {(["05", "15", "25", "não"] as Lembrete[]).map((v) => (
                          <Opcao
                            key={v}
                            nome="lembrete"
                            valor={v}
                            atual={form.lembrete}
                            aoEscolher={escolher("lembrete")}
                          >
                            {textoLembrete(v)}
                          </Opcao>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                )}

                {/* STEP 5 */}
                {step === 5 && (
                  <div>
                    <h2 className="text-lg font-semibold mb-3">Confira seus dados</h2>
                    <dl className="news-border-t">
                      {resumo.map(([rotulo, valor, etapa]) => (
                        <div
                          key={rotulo}
                          className="flex items-center justify-between gap-4 py-3 news-border-b"
                        >
                          <div className="min-w-0">
                            <dt className="text-sm text-muted-foreground">{rotulo}</dt>
                            <dd className="text-base font-semibold break-words">{valor}</dd>
                          </div>
                          <button
                            type="button"
                            onClick={() => mudarEtapa(etapa)}
                            className="shrink-0 min-h-11 px-2 text-sm underline underline-offset-4 hover:text-destructive"
                            aria-label={`Alterar ${rotulo}`}
                          >
                            Alterar
                          </button>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {error && (
                  <p role="alert" className="mt-4 text-base font-semibold text-destructive">
                    {error}
                  </p>
                )}

                <div className="flex gap-2 mt-6">
                  {step > 1 && (
                    <button type="button" onClick={() => mudarEtapa(step - 1)} className={btnOutline}>
                      ← Voltar
                    </button>
                  )}
                  {step < 5 ? (
                    <button key="continuar" type="button" onClick={next} className={btnPrimary}>
                      Continuar →
                    </button>
                  ) : (
                    <button
                      key="confirmar"
                      type="button"
                      onClick={enviar}
                      disabled={enviando}
                      className={btnPrimary}
                    >
                      {enviando ? "Enviando..." : "Confirmar compromisso"}
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>

        {/* LINKS ÚTEIS */}
        <aside className="flex flex-col gap-6 p-5 lg:p-6 bg-muted/30 news-border-t lg:border-t-0">
          <div>
            <p className="text-sm font-semibold mb-3">Links úteis</p>
            <div className="space-y-3">
              {sidebarLinks.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-2 text-base hover:text-destructive transition-colors group"
                >
                  <span className="text-destructive shrink-0">→</span>
                  <span className="group-hover:underline underline-offset-2">{label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="hidden lg:block news-border-t pt-6">
            <blockquote className="border-l-[3px] border-l-destructive pl-3 italic text-sm text-muted-foreground leading-relaxed">
              &ldquo;E disse-lhes: Ide por todo o mundo, pregai o evangelho a toda criatura.&rdquo;
              <br />
              <span className="not-italic">— Marcos 16:15 ARC</span>
            </blockquote>
          </div>

          <div className="news-border-t pt-5 lg:pt-6 lg:mt-auto">
            <p className="text-sm font-semibold mb-1">Dúvidas?</p>
            <a href="/contato" className="text-base hover:underline">
              Fale conosco →
            </a>
          </div>
        </aside>
      </div>
    </PageLayout>
  );
}
