import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScoreCircle } from "./ScoreCircle";
import {
  DimensionScore,
  getBand,
  getRecommendations,
  getBottlenecks,
  getOpportunities,
  SCORE_BANDS,
  DIMENSION_COLORS,
  BENCHMARKS,
  Bottleneck,
  Opportunity,
} from "@/lib/scoring";
import { ContactInfo, DIMENSIONS } from "@/lib/questionnaire-data";
import { getDimensionInsight, OVERALL_INSIGHTS } from "@/lib/dimension-insights";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Mail,
  Loader2,
  CheckCircle,
  RotateCcw,
  Calendar,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Zap,
  Target,
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface ResultsPageProps {
  overallScore: number;
  dimensionScores: DimensionScore[];
  contact: ContactInfo;
  answers: Record<string, number>;
  onRestart: () => void;
}

function DimensionCard({ ds, index }: { ds: DimensionScore; index: number }) {
  const [open, setOpen] = useState(false);
  const band = getBand(ds.score);
  const insight = getDimensionInsight(ds.id, ds.band);
  const dimension = DIMENSIONS.find((d) => d.id === ds.id);
  const dimColor = DIMENSION_COLORS[ds.id] ?? "hsl(var(--primary))";
  const benchmark = BENCHMARKS[ds.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.4 }}
    >
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="rounded-xl border border-border/50 bg-card/60 overflow-hidden transition-all duration-300">
          <CollapsibleTrigger className="w-full p-5 text-left hover:bg-muted/20 transition-colors">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{dimension?.icon}</span>
                  <div>
                    <h3 className="font-semibold text-foreground text-base">{ds.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      Peso: {ds.weight * 100}% · Média do setor: {benchmark?.avg ?? "—"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    className="text-xs font-medium border"
                    style={{
                      backgroundColor: band.color + "15",
                      color: band.color,
                      borderColor: band.color + "40",
                    }}
                  >
                    {band.label}
                  </Badge>
                  <span className="text-2xl font-bold font-mono tabular-nums" style={{ color: band.color }}>
                    {ds.score}
                  </span>
                  {open ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </div>
              {/* Progress bar with dimension color */}
              <div className="h-2 rounded-full bg-background overflow-hidden relative">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${ds.score}%`, backgroundColor: dimColor }}
                />
                {/* Benchmark marker */}
                {benchmark && (
                  <div
                    className="absolute top-0 h-full w-0.5 bg-foreground/30"
                    style={{ left: `${benchmark.avg}%` }}
                    title={`Média do setor: ${benchmark.avg}`}
                  />
                )}
              </div>
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="px-5 pb-5 space-y-4 border-t border-border/30 pt-4">
              <div className="flex items-start gap-2">
                <Lightbulb className="h-4 w-4 text-accent mt-1 shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {insight.summary}
                </p>
              </div>

              {insight.attentionPoints.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    Pontos de atenção
                  </h4>
                  <ul className="space-y-1.5">
                    {insight.attentionPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ArrowRight className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benchmark comparison */}
              {benchmark && (
                <div className="flex gap-4 text-xs">
                  <div className="glass-card rounded-lg px-3 py-2 flex items-center gap-2">
                    <span className="text-muted-foreground">Seu score:</span>
                    <span className="font-bold font-mono" style={{ color: band.color }}>{ds.score}</span>
                  </div>
                  <div className="glass-card rounded-lg px-3 py-2 flex items-center gap-2">
                    <span className="text-muted-foreground">Média setor:</span>
                    <span className="font-bold font-mono">{benchmark.avg}</span>
                  </div>
                  <div className="glass-card rounded-lg px-3 py-2 flex items-center gap-2">
                    <span className="text-muted-foreground">Top 20%:</span>
                    <span className="font-bold font-mono text-score-good">{benchmark.top}</span>
                  </div>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </motion.div>
  );
}

function BottleneckCard({ item, index }: { item: Bottleneck; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.3 }}
      className="flex items-start gap-4 glass-card rounded-xl p-4"
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-destructive/15 text-destructive font-bold text-sm font-mono shrink-0">
        {index + 1}
      </div>
      <div className="space-y-1 min-w-0">
        <div className="flex items-center gap-2">
          <span>{item.icon}</span>
          <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
        <span className="text-xs text-muted-foreground font-mono">{item.dimension} · Score {item.score}</span>
      </div>
    </motion.div>
  );
}

function OpportunityCard({ item, index }: { item: Opportunity; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.3 }}
      className="flex items-start gap-4 glass-card rounded-xl p-4"
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-score-good/15 text-score-good font-bold text-sm font-mono shrink-0">
        {index + 1}
      </div>
      <div className="space-y-1 min-w-0">
        <div className="flex items-center gap-2">
          <span>{item.icon}</span>
          <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
        <span className="text-xs text-muted-foreground font-mono">{item.dimension} · Score {item.score}</span>
      </div>
    </motion.div>
  );
}

export function ResultsPage({ overallScore, dimensionScores, contact, answers, onRestart }: ResultsPageProps) {
  const recommendations = getRecommendations(dimensionScores);
  const bottlenecks = getBottlenecks(answers, dimensionScores);
  const opportunities = getOpportunities(answers, dimensionScores);
  const overallBand = getBand(overallScore);
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const firstName = contact.name.split(" ")[0];
  const overallInsight = OVERALL_INSIGHTS[overallBand.key];

  const radarData = dimensionScores.map((ds) => ({
    dimension: ds.shortName,
    score: ds.score,
    benchmark: BENCHMARKS[ds.id]?.avg ?? 50,
    fullMark: 100,
  }));

  const handleSendEmail = async () => {
    setEmailSending(true);
    try {
      const { error } = await supabase.functions.invoke("send-diagnostic-results", {
        body: {
          recipientEmail: contact.email,
          recipientName: contact.name,
          company: contact.company,
          businessModel: contact.businessModel,
          overallScore,
          dimensionScores,
          recommendations,
        },
      });
      if (error) throw error;
      setEmailSent(true);
      toast.success("Relatório enviado por email com sucesso!");
    } catch (err) {
      console.error("Email error:", err);
      toast.error("Erro ao enviar email. Tente novamente.");
    } finally {
      setEmailSending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-10 max-w-4xl mx-auto"
    >
      {/* Header personalizado */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center space-y-4"
      >
        <img
          src="https://ecossistema-chordata-v2.vercel.app/assets/chordata-logo-white-CWPVcoS7.png"
          alt="Chordata"
          className="h-8 w-auto mx-auto"
        />
        <span className="section-label">Relatório de Maturidade Gerencial</span>
        <h1 className="section-title text-3xl md:text-4xl">
          Olá, <span className="text-blue-400">{firstName}</span>.{" "}
          <span className="font-serif italic font-normal text-foreground/80">Aqui está o diagnóstico do seu negócio.</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          {contact.company} · {contact.businessModel}
        </p>
      </motion.div>

      {/* Overall Score Gauge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex justify-center py-4">
          <ScoreCircle score={overallScore} size={240} label={`Score Geral · ${overallBand.label}`} />
        </div>
        <div className="glass-card rounded-xl p-5 text-center max-w-2xl mx-auto">
          <p className="text-sm text-muted-foreground leading-relaxed font-serif italic">
            {overallInsight}
          </p>
        </div>
      </motion.div>

      {/* Radar Chart with Benchmark */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <Card className="glass-card border-border/40">
          <CardHeader className="pb-2">
            <span className="section-label text-left">Mapa de Maturidade</span>
            <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2 mt-1">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              Visão Geral por Dimensão
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              A área <span className="text-blue-400 font-medium">azul</span> é o seu score. A linha{" "}
              <span className="text-muted-foreground font-medium">pontilhada</span> é a média do mercado.
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis
                    dataKey="dimension"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                  />
                  <Radar
                    name="Média do Mercado"
                    dataKey="benchmark"
                    stroke="hsl(var(--muted-foreground))"
                    fill="none"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                  />
                  <Radar
                    name="Seu Score"
                    dataKey="score"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Bottlenecks & Opportunities */}
      {(bottlenecks.length > 0 || opportunities.length > 0) && (
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <span className="section-label">Análise Estratégica</span>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {bottlenecks.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-base font-semibold text-foreground flex items-center gap-2 border-l-2 border-l-destructive pl-3">
                  <TrendingDown className="h-4 w-4 text-destructive" />
                  Top Gargalos
                </h2>
                <p className="text-xs text-muted-foreground pl-5">
                  Áreas que mais limitam o crescimento do seu negócio agora.
                </p>
                <div className="space-y-3">
                  {bottlenecks.map((b, i) => (
                    <BottleneckCard key={i} item={b} index={i} />
                  ))}
                </div>
              </div>
            )}

            {opportunities.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-base font-semibold text-foreground flex items-center gap-2 border-l-2 border-l-green-500 pl-3">
                  <Zap className="h-4 w-4 text-score-good" />
                  Top Oportunidades
                </h2>
                <p className="text-xs text-muted-foreground pl-5">
                  Pontos fortes que podem ser potencializados rapidamente.
                </p>
                <div className="space-y-3">
                  {opportunities.map((o, i) => (
                    <OpportunityCard key={i} item={o} index={i} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Dimension Breakdown */}
      <div className="space-y-4">
        <div className="space-y-1">
          <span className="section-label">Detalhamento</span>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-400" />
            Análise por Dimensão
          </h2>
          <p className="text-sm text-muted-foreground">
            Toque em cada dimensão para ver a análise completa e comparação com o mercado.
          </p>
        </div>
        {dimensionScores.map((ds, i) => (
          <DimensionCard key={ds.id} ds={ds} index={i} />
        ))}
      </div>

      {/* Score Legend */}
      <div className="glass-card rounded-xl p-4 border border-border/40">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Legenda de classificação
        </h3>
        <div className="flex flex-wrap gap-3">
          {SCORE_BANDS.map((band) => (
            <div key={band.key} className="flex items-center gap-1.5 text-xs">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: band.color }} />
              <span className="text-muted-foreground">
                {band.label} ({band.min}-{band.max})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="section-label">Ecossistema Chordata</span>
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-400" />
              Serviços Recomendados para {contact.company}
            </h2>
            <p className="text-sm text-muted-foreground">
              Baseado nos seus resultados, identificamos onde nossa consultoria pode gerar mais impacto.
            </p>
          </div>
          <div className="space-y-4">
            {recommendations.map((rec, i) => {
              const dimension = DIMENSIONS.find((d) => d.id === rec.dimensionId);
              const ds = dimensionScores.find((d) => d.id === rec.dimensionId);
              const band = ds ? getBand(ds.score) : null;
              const dimColor = DIMENSION_COLORS[rec.dimensionId] ?? "hsl(var(--primary))";

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.3 }}
                >
                  <Card className="glass-card overflow-hidden border-border/40">
                    <div className="h-1" style={{ backgroundColor: dimColor }} />
                    <CardContent className="p-5 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{dimension?.icon}</span>
                          <div>
                            <h4 className="font-semibold text-foreground">{rec.service}</h4>
                            <span className="text-xs text-muted-foreground font-mono">{rec.trigger}</span>
                          </div>
                        </div>
                        {band && (
                          <Badge
                            className="text-xs shrink-0 border"
                            style={{
                              backgroundColor: band.color + "15",
                              color: band.color,
                              borderColor: band.color + "40",
                            }}
                          >
                            Prioridade {i + 1}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{rec.justification}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Closing CTA */}
      <div className="glass-card rounded-xl p-8 text-center space-y-4 border border-blue-500/20 bg-blue-500/5">
        <span className="section-label">Próximo Passo</span>
        <h3 className="section-title text-2xl">
          Quer transformar esses números em{" "}
          <span className="font-serif italic font-normal text-blue-400">resultados reais?</span>
        </h3>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          Agende uma conversa gratuita com nossa equipe. Vamos analisar seu diagnóstico juntos e criar um plano de ação
          personalizado para {contact.company}.
        </p>
      </div>

      {/* CTAs */}
      <div className="grid gap-3 sm:grid-cols-3">
        <Button size="lg" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-lg shadow-blue-500/20">
          <Calendar className="mr-2 h-4 w-4" />
          Agendar Conversa
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="w-full border-blue-500/30 hover:bg-blue-500/10 hover:border-blue-500/60"
          onClick={handleSendEmail}
          disabled={emailSending || emailSent}
        >
          {emailSending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : emailSent ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
              Enviado!
            </>
          ) : (
            <>
              <Mail className="mr-2 h-4 w-4" />
              Enviar por Email
            </>
          )}
        </Button>
        <Button size="lg" variant="outline" className="w-full border-border hover:bg-card" onClick={onRestart}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Novo Diagnóstico
        </Button>
      </div>
    </motion.div>
  );
}
