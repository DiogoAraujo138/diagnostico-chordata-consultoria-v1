import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dimension, Question, SCALE_LABELS } from "@/lib/questionnaire-data";

interface DimensionStepProps {
  dimension: Dimension;
  answers: Record<string, number>;
  onAnswer: (questionId: string, value: number) => void;
}

const DIMENSION_DESCRIPTIONS: Record<string, string> = {
  financial: "Vamos entender como sua empresa lida com números, planejamento e controle financeiro. Um retrato honesto da sua saúde financeira.",
  people: "Como sua equipe está estruturada, treinada e liderada faz toda a diferença nos resultados. Vamos olhar para o coração do seu negócio.",
  operations: "Processos bem definidos significam mais qualidade, menos retrabalho e clientes mais satisfeitos. Vamos analisar sua operação.",
  marketing: "Como seus clientes encontram você? Vamos entender sua estratégia de captação, presença digital e capacidade de reter clientes.",
  technology: "Tecnologia integra e potencializa todas as outras áreas. Vamos ver como sua empresa usa dados e sistemas no dia a dia.",
  legal: "Conformidade legal evita surpresas e transmite credibilidade. Vamos verificar se sua empresa está protegida juridicamente.",
};

const ENCOURAGEMENT_MESSAGES: Record<string, string> = {
  financial: "Ótimo começo! Responda com sinceridade.",
  people: "Você está indo muito bem! Continue com honestidade.",
  operations: "Já passamos da metade! Cada resposta torna o diagnóstico mais preciso.",
  marketing: "Quase lá! Suas respostas estão construindo um retrato valioso.",
  technology: "Penúltima dimensão! Estamos quase finalizando.",
  legal: "Última dimensão! Em breve você terá seu Score completo.",
};

const SCALE_COLORS: Record<number, { bg: string; border: string; text: string; shadow: string }> = {
  0: { bg: "bg-red-500/90",    border: "border-red-500",    text: "text-white", shadow: "shadow-red-500/30" },
  1: { bg: "bg-orange-500/90", border: "border-orange-500", text: "text-white", shadow: "shadow-orange-500/30" },
  2: { bg: "bg-amber-500/90",  border: "border-amber-500",  text: "text-white", shadow: "shadow-amber-500/30" },
  3: { bg: "bg-yellow-400/90", border: "border-yellow-400", text: "text-slate-900", shadow: "shadow-yellow-400/30" },
  4: { bg: "bg-lime-500/90",   border: "border-lime-500",   text: "text-white", shadow: "shadow-lime-500/30" },
  5: { bg: "bg-green-500/90",  border: "border-green-500",  text: "text-white", shadow: "shadow-green-500/30" },
};

function ScaleInput({
  questionId,
  value,
  onAnswer,
}: {
  questionId: string;
  value: number | undefined;
  onAnswer: (id: string, val: number) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex gap-1.5">
        {[0, 1, 2, 3, 4, 5].map((n) => {
          const selected = value === n;
          const colors = SCALE_COLORS[n];
          return (
            <button
              key={n}
              type="button"
              onClick={() => onAnswer(questionId, n)}
              className={`
                flex-1 h-11 rounded-lg font-bold text-base transition-all duration-200
                border focus:outline-none focus:ring-2 focus:ring-primary/50
                ${selected
                  ? `${colors.bg} ${colors.border} ${colors.text} shadow-lg ${colors.shadow} scale-105`
                  : "bg-card border-border text-muted-foreground hover:border-primary/40 hover:text-foreground hover:bg-muted/50"
                }
              `}
            >
              {n}
            </button>
          );
        })}
      </div>
      <div className="flex justify-between text-[11px] text-muted-foreground px-0.5">
        <span className="text-red-400 font-medium">{SCALE_LABELS[0]}</span>
        <span className="text-green-400 font-medium">{SCALE_LABELS[5]}</span>
      </div>
    </div>
  );
}

function QuestionInput({
  question,
  value,
  onAnswer,
}: {
  question: Question;
  value: number | undefined;
  onAnswer: (id: string, val: number) => void;
}) {
  if (question.type === "select" && question.options) {
    return (
      <Select
        value={value?.toString()}
        onValueChange={(v) => onAnswer(question.id, Number(v))}
      >
        <SelectTrigger className="glass-card">
          <SelectValue placeholder="Selecione..." />
        </SelectTrigger>
        <SelectContent>
          {question.options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value.toString()}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
  return <ScaleInput questionId={question.id} value={value} onAnswer={onAnswer} />;
}

export function DimensionStep({ dimension, answers, onAnswer }: DimensionStepProps) {
  const description = DIMENSION_DESCRIPTIONS[dimension.id];
  const encouragement = ENCOURAGEMENT_MESSAGES[dimension.id];
  const answeredCount = dimension.questions.filter((q) => answers[q.id] !== undefined).length;
  const total = dimension.questions.length;

  return (
    <div className="space-y-6 animate-fade-in-up">

      {/* Section header */}
      <div className="space-y-2">
        <span className="section-label">{encouragement}</span>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{dimension.icon}</span>
          <div>
            <h2 className="section-title">{dimension.name}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {answeredCount} de {total} respondidas
              {answeredCount === total && (
                <span className="text-green-400 font-medium ml-2">· Completo ✓</span>
              )}
            </p>
          </div>
        </div>

        {description && (
          <div className="glass-card rounded-xl p-4 border-l-2 border-l-blue-500/60">
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
        )}
      </div>

      {/* Questions */}
      <div className="space-y-5">
        {dimension.questions.map((q, i) => {
          const isAnswered = answers[q.id] !== undefined;
          return (
            <div
              key={q.id}
              className={`rounded-xl p-5 space-y-4 border transition-all duration-300 ${
                isAnswered
                  ? "bg-card/80 border-border/70"
                  : "glass-card border-border/40"
              }`}
            >
              <Label className="text-sm font-medium leading-relaxed text-foreground flex items-start gap-2">
                <span className="text-blue-400 font-bold font-mono text-xs mt-0.5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{q.text}</span>
              </Label>
              <QuestionInput question={q} value={answers[q.id]} onAnswer={onAnswer} />
            </div>
          );
        })}
      </div>
    </div>
  );
}