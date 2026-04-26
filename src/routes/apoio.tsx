import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";

export const Route = createFileRoute("/apoio")({
  head: () => ({
    meta: [
      { title: "Apoie-nos — Família Segolin" },
      {
        name: "description",
        content: "Formulário de compromisso de apoio mensal à Família Segolin 2026.",
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
  message: string;
}

const btnBase =
  "inline-flex items-center px-5 py-2 font-sans-news text-[11px] tracking-[0.22em] uppercase border transition-colors cursor-pointer";
const btnOutline = `${btnBase} border-foreground bg-background text-foreground hover:bg-foreground hover:text-background`;
const btnPrimary = `${btnBase} border-destructive bg-destructive text-background hover:bg-foreground hover:border-foreground`;

const sidebarLinks: [string, string][] = [
  [
    "Como programar o PIX recorrente",
    "https://docs.google.com/spreadsheets/d/1n_JPwwq_5Q8L7VKNSJf4jQRtSBOOtEKSFpbkZOQoytQ/edit?usp=sharing",
  ],
  ["Entre no grupo de informativos", "https://chat.whatsapp.com/BfkTFQK31rU9ThG0Ek1Ogu"],
];

function Apoio() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
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
    message: "",
  });

  const set =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const next = () => {
    setError("");
    if (step === 1 && !form.tipo) return setError("Selecione o tipo de apoio.");
    if (step === 2 && !form.nome.trim()) return setError("Informe o nome.");
    if (step === 3 && !form.whatsapp.trim()) return setError("Informe o WhatsApp.");
    if (step === 4 && (!form.valor || !form.lembrete))
      return setError("Preencha valor e lembrete.");
    setStep((s) => s + 1);
  };

  const prev = () => {
    setError("");
    setStep((s) => s - 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("https://formspree.io/f/mblqrabp", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Erro ao enviar. Tente novamente.");
      }
    } catch {
      setError("Erro de conexão. Tente novamente.");
    }
  };

  const inputCls =
    "block w-full mt-1 px-3 py-2 border border-border bg-background font-sans-news text-[12px] outline-none focus:border-foreground transition-colors";
  const labelCls =
    "block font-sans-news text-[11px] tracking-[0.1em] uppercase text-muted-foreground mt-4 first:mt-0";
  const radioLabel = "flex items-center gap-2 font-sans-news text-[12px] cursor-pointer";

  return (
    <PageLayout>
      <div className="news-border-b px-8 py-4">
        <p className="font-sans-news text-[10px] tracking-[0.3em] uppercase text-destructive mb-1">
          Compromisso anual
        </p>
        <h1 className="font-serif font-black text-4xl">Formulário de Apoio 2026</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px]">
        {/* FORM COLUMN */}
        <div className="p-8 lg:news-border-r">
          {submitted ? (
            <div className="border-l-[3px] border-l-destructive news-border p-5">
              <p className="font-serif text-[15px] mb-4">
                Formulário enviado com sucesso! Agradecemos seu apoio! Entraremos em contato!
              </p>
              <div className="space-y-2">
                {sidebarLinks.map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="block font-sans-news text-[11px] text-destructive underline underline-offset-2 hover:opacity-70"
                  >
                    → {label}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6 pb-5 news-border-b">
                <p className="font-serif text-[14px] leading-relaxed mb-3">
                  Este formulário é um compromisso de apoio mensal que vale de janeiro de 2026 até
                  dezembro de 2026. Caso, no decorrer do ano, precise encerrar esse compromisso,
                  basta nos comunicar. Obrigada por nos ajudar nessa caminhada.
                </p>
                <blockquote className="border-l-[3px] border-l-destructive pl-3 font-serif italic text-[13px] text-muted-foreground">
                  &ldquo;Levai as cargas uns dos outros e assim cumprireis a lei de Cristo.&rdquo; —
                  Gálatas 6:2 ARC
                </blockquote>
                <p className="font-sans-news text-[10px] text-muted-foreground mt-3">
                  Os campos com (*) são obrigatórios.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* STEP 1 */}
                {step === 1 && (
                  <div className="space-y-2">
                    <p className={labelCls}>Você vai apoiar como:*</p>
                    {(["fisica", "juridica", "igreja", "grupo"] as Tipo[]).map((v) => (
                      <label key={v} className={radioLabel}>
                        <input
                          type="radio"
                          name="tipo"
                          value={v}
                          checked={form.tipo === v}
                          onChange={set("tipo")}
                          className="accent-destructive"
                        />
                        {v === "fisica" && "Pessoa física"}
                        {v === "juridica" && "Pessoa jurídica"}
                        {v === "igreja" && "Igreja"}
                        {v === "grupo" && "Grupo / Família"}
                      </label>
                    ))}
                  </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <div className="space-y-1">
                    <label className={labelCls} htmlFor="nome">
                      Nome e sobrenome:*
                    </label>
                    <input
                      id="nome"
                      type="text"
                      value={form.nome}
                      onChange={set("nome")}
                      className={inputCls}
                      required
                    />
                    <label className={labelCls} htmlFor="aniversario">
                      Aniversário:
                    </label>
                    <input
                      id="aniversario"
                      type="date"
                      value={form.aniversario}
                      onChange={set("aniversario")}
                      className={inputCls}
                    />
                  </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <div className="space-y-2">
                    <label className={labelCls} htmlFor="whatsapp">
                      WhatsApp:*
                    </label>
                    <input
                      id="whatsapp"
                      type="tel"
                      value={form.whatsapp}
                      onChange={set("whatsapp")}
                      placeholder="(XX) 99999-9999"
                      className={inputCls}
                      required
                    />
                    <p className={`${labelCls} mt-4`}>Grupo de informativo:*</p>
                    <p className="font-sans-news text-[10px] text-muted-foreground">
                      O grupo facilita nossa comunicação com vocês.
                    </p>
                    {(["sim", "nao"] as const).map((v) => (
                      <label key={v} className={radioLabel}>
                        <input
                          type="radio"
                          name="informativo"
                          value={v}
                          checked={form.informativo === v}
                          onChange={set("informativo")}
                          className="accent-destructive"
                        />
                        {v === "sim" ? "Sim" : "Não"}
                      </label>
                    ))}
                  </div>
                )}

                {/* STEP 4 */}
                {step === 4 && (
                  <div className="space-y-2">
                    <label className={labelCls} htmlFor="valor">
                      Valor:*
                    </label>
                    <input
                      id="valor"
                      type="number"
                      value={form.valor}
                      onChange={set("valor")}
                      className={`${inputCls} max-w-[120px]`}
                      min="1"
                      required
                    />
                    <label className={labelCls} htmlFor="moeda">
                      Moeda:
                    </label>
                    <select
                      id="moeda"
                      value={form.moeda}
                      onChange={set("moeda")}
                      className={inputCls}
                    >
                      <option value="reais">Reais</option>
                      <option value="ienes">Ienes</option>
                      <option value="dolares">Dólares</option>
                      <option value="euro">Euro</option>
                      <option value="outro">Outro</option>
                    </select>
                    <p className={`${labelCls} mt-4`}>Receber lembrete via WhatsApp no dia:*</p>
                    {(["05", "15", "25", "não"] as Lembrete[]).map((v) => (
                      <label key={v} className={radioLabel}>
                        <input
                          type="radio"
                          name="lembrete"
                          value={v}
                          checked={form.lembrete === v}
                          onChange={set("lembrete")}
                          className="accent-destructive"
                        />
                        {v === "não" ? "Não receber" : `Dia ${v}`}
                      </label>
                    ))}
                  </div>
                )}

                {/* STEP 5 */}
                {step === 5 && (
                  <div>
                    <label className={labelCls} htmlFor="message">
                      Mensagem / Observação:
                    </label>
                    <textarea
                      id="message"
                      value={form.message}
                      onChange={set("message")}
                      className={`${inputCls} h-28 resize-vertical`}
                    />
                  </div>
                )}

                {error && (
                  <p className="mt-3 font-sans-news text-[11px] text-destructive">{error}</p>
                )}

                <div className="flex gap-2 mt-6">
                  {step > 1 && (
                    <button type="button" onClick={prev} className={btnOutline}>
                      ← Anterior
                    </button>
                  )}
                  {step < 5 ? (
                    <button type="button" onClick={next} className={btnPrimary}>
                      Próximo →
                    </button>
                  ) : (
                    <button type="submit" className={btnPrimary}>
                      Enviar
                    </button>
                  )}
                </div>

                <p className="font-sans-news text-[10px] text-muted-foreground mt-4">
                  Etapa {step} de 5
                </p>
              </form>
            </>
          )}
        </div>

        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:flex flex-col gap-6 p-6 bg-muted/30">
          <div>
            <p className="font-sans-news text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Links úteis
            </p>
            <div className="space-y-2">
              {sidebarLinks.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-2 font-sans-news text-[11px] hover:text-destructive transition-colors group"
                >
                  <span className="text-destructive mt-0.5 shrink-0">→</span>
                  <span className="group-hover:underline underline-offset-2">{label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="news-border-t pt-6">
            <blockquote className="border-l-[3px] border-l-destructive pl-3 font-serif italic text-[13px] text-muted-foreground leading-relaxed">
              &ldquo;E disse-lhes: Ide por todo o mundo, pregai o evangelho a toda criatura.&rdquo;
              <br />
              <span className="not-italic text-[11px] font-sans-news tracking-[0.1em]">
                — Marcos 16:15 ARC
              </span>
            </blockquote>
          </div>

          <div className="news-border-t pt-6 mt-auto">
            <p className="font-sans-news text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
              Dúvidas?
            </p>
            <a
              href="/contato"
              className="font-sans-news text-[11px] tracking-[0.14em] uppercase hover:underline"
            >
              Fale conosco →
            </a>
          </div>
        </aside>
      </div>
    </PageLayout>
  );
}
