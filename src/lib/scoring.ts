import { DIMENSIONS } from "./questionnaire-data";

export interface DimensionScore {
  id: string;
  name: string;
  shortName: string;
  score: number;
  weight: number;
  band: ScoreBand;
}

export type ScoreBand = "critical" | "regular" | "good" | "advanced" | "reference";

export interface ScoreBandInfo {
  key: ScoreBand;
  label: string;
  min: number;
  max: number;
  color: string;
}

export const SCORE_BANDS: ScoreBandInfo[] = [
  { key: "critical", label: "Crítico", min: 0, max: 30, color: "hsl(0, 72%, 51%)" },
  { key: "regular", label: "Regular", min: 31, max: 50, color: "hsl(36, 100%, 60%)" },
  { key: "good", label: "Bom", min: 51, max: 70, color: "hsl(48, 96%, 53%)" },
  { key: "advanced", label: "Avançado", min: 71, max: 85, color: "hsl(142, 71%, 45%)" },
  { key: "reference", label: "Referência", min: 86, max: 100, color: "hsl(164, 100%, 42%)" },
];

export function getBand(score: number): ScoreBandInfo {
  return SCORE_BANDS.find((b) => score >= b.min && score <= b.max) ?? SCORE_BANDS[0];
}

// Dimension chart colors (HSL strings matching CSS vars)
export const DIMENSION_COLORS: Record<string, string> = {
  financial: "hsl(168, 80%, 40%)",
  people: "hsl(214, 60%, 57%)",
  operations: "hsl(32, 95%, 60%)",
  marketing: "hsl(262, 60%, 60%)",
  technology: "hsl(190, 80%, 50%)",
  legal: "hsl(215, 15%, 60%)",
};

// Market benchmarks per dimension
export const BENCHMARKS: Record<string, { avg: number; top: number }> = {
  financial: { avg: 58, top: 82 },
  people: { avg: 50, top: 75 },
  operations: { avg: 52, top: 78 },
  marketing: { avg: 45, top: 75 },
  technology: { avg: 42, top: 70 },
  legal: { avg: 55, top: 80 },
};

export interface Bottleneck {
  dimension: string;
  dimensionId: string;
  icon: string;
  title: string;
  description: string;
  score: number;
}

export interface Opportunity {
  dimension: string;
  dimensionId: string;
  icon: string;
  title: string;
  description: string;
  score: number;
}

function generateBottlenecks(answers: Record<string, number>, dimensionScores: DimensionScore[]): Bottleneck[] {
  const bottlenecks: Bottleneck[] = [];

  // Financial bottlenecks
  const fin3 = answers["fin_3"];
  if (fin3 !== undefined && fin3 <= 4) {
    bottlenecks.push({
      dimension: "Gestão Financeira",
      dimensionId: "financial",
      icon: "💰",
      title: "Alta inadimplência comprometendo o fluxo de caixa",
      description: "Seu índice de inadimplência está elevado, o que drena recursos e dificulta o planejamento financeiro.",
      score: dimensionScores.find(d => d.id === "financial")?.score ?? 0,
    });
  }
  const fin4 = answers["fin_4"];
  if (fin4 !== undefined && fin4 <= 2) {
    bottlenecks.push({
      dimension: "Gestão Financeira",
      dimensionId: "financial",
      icon: "💰",
      title: "Fluxo de caixa sem controle estruturado",
      description: "Sem visibilidade do fluxo de caixa, decisões financeiras são tomadas no escuro.",
      score: dimensionScores.find(d => d.id === "financial")?.score ?? 0,
    });
  }

  // People bottlenecks
  const ppl3 = answers["ppl_3"];
  if (ppl3 !== undefined && ppl3 <= 4) {
    bottlenecks.push({
      dimension: "Pessoas e Liderança",
      dimensionId: "people",
      icon: "👥",
      title: "Rotatividade elevada na equipe",
      description: "Alta rotatividade gera custos ocultos de recrutamento, treinamento e perda de qualidade no atendimento.",
      score: dimensionScores.find(d => d.id === "people")?.score ?? 0,
    });
  }
  const ppl1 = answers["ppl_1"];
  if (ppl1 !== undefined && ppl1 <= 2) {
    bottlenecks.push({
      dimension: "Pessoas e Liderança",
      dimensionId: "people",
      icon: "👥",
      title: "Estrutura organizacional indefinida",
      description: "Sem organograma claro, funções se sobrepõem e responsabilidades ficam confusas.",
      score: dimensionScores.find(d => d.id === "people")?.score ?? 0,
    });
  }

  // Operations bottlenecks
  const ops1 = answers["ops_1"];
  if (ops1 !== undefined && ops1 <= 2) {
    bottlenecks.push({
      dimension: "Operações e Processos",
      dimensionId: "operations",
      icon: "⚙️",
      title: "Processos não documentados",
      description: "Sem POPs, a qualidade varia conforme quem executa e erros se repetem.",
      score: dimensionScores.find(d => d.id === "operations")?.score ?? 0,
    });
  }
  const ops3 = answers["ops_3"];
  if (ops3 !== undefined && ops3 <= 4) {
    bottlenecks.push({
      dimension: "Operações e Processos",
      dimensionId: "operations",
      icon: "⚙️",
      title: "Baixa ocupação da agenda",
      description: "Capacidade ociosa significa receita não realizada e custos fixos pesando mais.",
      score: dimensionScores.find(d => d.id === "operations")?.score ?? 0,
    });
  }

  // Marketing bottlenecks
  const mkt1 = answers["mkt_1"];
  if (mkt1 !== undefined && mkt1 <= 2) {
    bottlenecks.push({
      dimension: "Marketing e Captação",
      dimensionId: "marketing",
      icon: "📢",
      title: "Ausência de presença digital",
      description: "Sem marketing digital ativo, seu negócio é invisível para potenciais clientes que buscam online.",
      score: dimensionScores.find(d => d.id === "marketing")?.score ?? 0,
    });
  }

  // Technology bottlenecks
  const tech5 = answers["tech_5"];
  if (tech5 !== undefined && tech5 <= 4) {
    bottlenecks.push({
      dimension: "Tecnologia e Dados",
      dimensionId: "technology",
      icon: "💻",
      title: "Dados sem backup adequado",
      description: "Sem backup em nuvem, uma falha de hardware pode significar perda total de informações.",
      score: dimensionScores.find(d => d.id === "technology")?.score ?? 0,
    });
  }
  const tech3 = answers["tech_3"];
  if (tech3 !== undefined && tech3 <= 2) {
    bottlenecks.push({
      dimension: "Tecnologia e Dados",
      dimensionId: "technology",
      icon: "💻",
      title: "Decisões sem dados automatizados",
      description: "Sem dashboards ou relatórios automáticos, análises dependem de trabalho manual e intuição.",
      score: dimensionScores.find(d => d.id === "technology")?.score ?? 0,
    });
  }

  // Legal bottlenecks
  const leg1 = answers["leg_1"];
  if (leg1 !== undefined && leg1 <= 2) {
    bottlenecks.push({
      dimension: "Jurídico e Conformidade",
      dimensionId: "legal",
      icon: "⚖️",
      title: "Não conformidade com LGPD",
      description: "Multas por violação da LGPD podem chegar a 2% do faturamento. Adequação é urgente.",
      score: dimensionScores.find(d => d.id === "legal")?.score ?? 0,
    });
  }

  return bottlenecks.sort((a, b) => a.score - b.score).slice(0, 5);
}

function generateOpportunities(answers: Record<string, number>, dimensionScores: DimensionScore[]): Opportunity[] {
  const opportunities: Opportunity[] = [];

  // Financial opportunities
  const fin5 = answers["fin_5"];
  if (fin5 !== undefined && fin5 >= 3) {
    opportunities.push({
      dimension: "Gestão Financeira",
      dimensionId: "financial",
      icon: "💰",
      title: "Potencial para planejamento financeiro avançado",
      description: "Você já usa indicadores financeiros. Automatizar dashboards pode liberar tempo estratégico.",
      score: dimensionScores.find(d => d.id === "financial")?.score ?? 0,
    });
  }

  // People opportunities
  const ppl2 = answers["ppl_2"];
  if (ppl2 !== undefined && ppl2 >= 3) {
    opportunities.push({
      dimension: "Pessoas e Liderança",
      dimensionId: "people",
      icon: "👥",
      title: "Programa de treinamento como diferencial",
      description: "Sua equipe já recebe treinamento. Formalizar um programa de desenvolvimento pode reduzir turnover significativamente.",
      score: dimensionScores.find(d => d.id === "people")?.score ?? 0,
    });
  }

  // Operations opportunities
  const ops6 = answers["ops_6"];
  if (ops6 !== undefined && ops6 >= 3) {
    opportunities.push({
      dimension: "Operações e Processos",
      dimensionId: "operations",
      icon: "⚙️",
      title: "Sistema de gestão como alavanca",
      description: "Você já usa software de gestão. Integrar com outras áreas pode eliminar retrabalho e melhorar a visibilidade.",
      score: dimensionScores.find(d => d.id === "operations")?.score ?? 0,
    });
  }

  // Marketing opportunities
  const mkt4 = answers["mkt_4"];
  if (mkt4 !== undefined && mkt4 >= 3) {
    opportunities.push({
      dimension: "Marketing e Captação",
      dimensionId: "marketing",
      icon: "📢",
      title: "Fidelização como motor de crescimento",
      description: "Você já investe em retenção. Automatizar comunicação com clientes pode aumentar o LTV significativamente.",
      score: dimensionScores.find(d => d.id === "marketing")?.score ?? 0,
    });
  }

  // Technology opportunities
  const tech2 = answers["tech_2"];
  if (tech2 !== undefined && tech2 >= 3) {
    opportunities.push({
      dimension: "Tecnologia e Dados",
      dimensionId: "technology",
      icon: "💻",
      title: "Base de dados pronta para inteligência",
      description: "Seus dados já estão digitalizados. O próximo passo é criar análises preditivas e automações.",
      score: dimensionScores.find(d => d.id === "technology")?.score ?? 0,
    });
  }

  return opportunities.sort((a, b) => b.score - a.score).slice(0, 5);
}

export function calculateDimensionScores(answers: Record<string, number>): DimensionScore[] {
  return DIMENSIONS.map((dim) => {
    const questionScores = dim.questions.map((q) => {
      const val = answers[q.id];
      if (val === undefined) return 0;

      if (q.type === "scale") {
        return val * 20;
      }

      return val * 10;
    });

    const score = Math.round(
      questionScores.reduce((a, b) => a + b, 0) / dim.questions.length
    );

    return {
      id: dim.id,
      name: dim.name,
      shortName: dim.shortName,
      score,
      weight: dim.weight,
      band: getBand(score).key,
    };
  });
}

export function calculateOverallScore(dimensionScores: DimensionScore[]): number {
  return Math.round(
    dimensionScores.reduce((sum, ds) => sum + ds.score * ds.weight, 0)
  );
}

export function getBottlenecks(answers: Record<string, number>, dimensionScores: DimensionScore[]): Bottleneck[] {
  return generateBottlenecks(answers, dimensionScores);
}

export function getOpportunities(answers: Record<string, number>, dimensionScores: DimensionScore[]): Opportunity[] {
  return generateOpportunities(answers, dimensionScores);
}

export interface ServiceRecommendation {
  service: string;
  description: string;
  trigger: string;
  justification: string;
  dimensionId: string;
  priority: number;
}

export function getRecommendations(dimensionScores: DimensionScore[]): ServiceRecommendation[] {
  const recs: ServiceRecommendation[] = [];
  
  for (const ds of dimensionScores) {
    if (ds.id === "financial" && ds.score <= 50) {
      recs.push({
        service: "Chordata Consultoria Financeira",
        description: "Auditoria financeira completa com reestruturação de fluxo de caixa e indicadores.",
        trigger: `Score Financeiro: ${ds.score}/100`,
        justification: `Com score ${ds.score} em Gestão Financeira, seu negócio está tomando decisões sem visibilidade real dos números. A consultoria financeira vai estruturar seu fluxo de caixa, mapear custos ocultos e criar indicadores que permitem decisões seguras — para que você saiba exatamente para onde seu dinheiro está indo e como fazê-lo render mais.`,
        dimensionId: ds.id,
        priority: 100 - ds.score,
      });
    }
    if (ds.id === "financial" && ds.score > 50 && ds.score <= 70) {
      recs.push({
        service: "Chordata Analytics — Módulo Financeiro",
        description: "Dashboard de KPIs financeiros com planejamento integrado.",
        trigger: `Score Financeiro: ${ds.score}/100`,
        justification: `Seu controle financeiro já existe, mas ainda é manual e consome tempo. O módulo financeiro automatiza seus relatórios, cria dashboards em tempo real e libera você para focar no que importa: fazer o negócio crescer com previsibilidade.`,
        dimensionId: ds.id,
        priority: 100 - ds.score,
      });
    }
    if (ds.id === "people" && ds.score <= 50) {
      recs.push({
        service: "Chordata RH Estratégico",
        description: "Estruturação de organograma, plano de cargos e programa de treinamento.",
        trigger: `Score Pessoas: ${ds.score}/100`,
        justification: `Com score ${ds.score} em Pessoas, sua equipe provavelmente enfrenta alta rotatividade, funções confusas e falta de desenvolvimento. O RH Estratégico vai criar clareza: quem faz o quê, como crescer na empresa e como manter os melhores talentos — reduzindo custos de turnover e aumentando produtividade.`,
        dimensionId: ds.id,
        priority: 100 - ds.score,
      });
    }
    if (ds.id === "operations" && ds.score <= 50) {
      recs.push({
        service: "Chordata Processos",
        description: "Mapeamento e padronização de processos operacionais com POPs.",
        trigger: `Score Operações: ${ds.score}/100`,
        justification: `Sua operação com score ${ds.score} indica que a qualidade do serviço varia e existem gargalos não mapeados. A padronização de processos vai garantir que cada atendimento tenha o mesmo padrão de excelência, independente de quem executa — reduzindo erros, retrabalho e desperdício.`,
        dimensionId: ds.id,
        priority: 100 - ds.score,
      });
    }
    if (ds.id === "marketing" && ds.score <= 50) {
      recs.push({
        service: "Chordata Marketing Digital",
        description: "Estratégia de captação multicanal com métricas de CAC e ROI.",
        trigger: `Score Marketing: ${ds.score}/100`,
        justification: `Com score ${ds.score} em Marketing, seu negócio está invisível para a maioria dos potenciais clientes. A estratégia de marketing digital vai colocar sua empresa na frente de quem está procurando seus serviços — com métricas claras para saber exatamente quanto cada novo cliente custa e quanto retorna.`,
        dimensionId: ds.id,
        priority: 100 - ds.score,
      });
    }
    if (ds.id === "technology" && ds.score <= 50) {
      recs.push({
        service: "Chordata Analytics",
        description: "Implementação de dashboards e integração de sistemas de gestão.",
        trigger: `Score Tecnologia: ${ds.score}/100`,
        justification: `Seu score ${ds.score} em Tecnologia mostra que dados do negócio estão fragmentados ou inacessíveis. A implementação de dashboards integrados vai reunir todas as informações em um lugar só — para que você tome decisões baseadas em fatos, não em suposições.`,
        dimensionId: ds.id,
        priority: 100 - ds.score,
      });
    }
    if (ds.id === "legal" && ds.score <= 50) {
      recs.push({
        service: "Jurídico Pet Digital",
        description: "Adequação LGPD, regularização de contratos e licenças.",
        trigger: `Score Jurídico: ${ds.score}/100`,
        justification: `Com score ${ds.score} em Jurídico, sua empresa pode estar exposta a multas e riscos legais evitáveis. A adequação jurídica vai regularizar contratos, garantir conformidade com a LGPD e manter todas as licenças em dia — protegendo seu negócio de surpresas desagradáveis.`,
        dimensionId: ds.id,
        priority: 100 - ds.score,
      });
    }
  }
  
  return recs.sort((a, b) => b.priority - a.priority);
}
