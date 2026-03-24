import { ScoreBand } from "./scoring";

export interface DimensionInsight {
  summary: string;
  attentionPoints: string[];
}

const insights: Record<string, Record<ScoreBand, DimensionInsight>> = {
  financial: {
    critical: {
      summary: "Sua empresa opera sem visibilidade financeira clara. Isso significa que decisões importantes estão sendo tomadas no escuro — sem saber exatamente quanto entra, quanto sai e onde está o lucro real. Essa falta de controle é a principal causa de fechamento de empresas nos primeiros anos.",
      attentionPoints: [
        "Risco de tomar decisões sem base em dados financeiros reais",
        "Dificuldade em identificar onde o dinheiro está sendo desperdiçado",
        "Impossibilidade de planejar investimentos ou crescimento sustentável",
      ],
    },
    regular: {
      summary: "Você tem alguma noção dos seus números, mas ainda depende de intuição para a maioria das decisões financeiras. O fluxo de caixa pode surpreender negativamente e a margem de lucro é uma incógnita em muitos meses.",
      attentionPoints: [
        "Controle de caixa existe mas não é consistente",
        "Margem de lucro pode estar mascarada por custos não mapeados",
        "Falta de planejamento financeiro limita o crescimento",
      ],
    },
    good: {
      summary: "Você já tem controles financeiros funcionando, mas ainda depende de processos manuais que limitam sua capacidade de planejar crescimento com segurança. O próximo passo é automatizar e criar indicadores preditivos.",
      attentionPoints: [
        "Processos manuais consomem tempo e estão sujeitos a erros",
        "Oportunidade de criar dashboards financeiros em tempo real",
        "Planejamento de médio prazo ainda pode ser fortalecido",
      ],
    },
    advanced: {
      summary: "Sua gestão financeira é sólida. Você tem controle real sobre entradas, saídas e margens. O foco agora deve ser em otimização: reduzir custos operacionais, melhorar ciclo de recebimento e investir com base em projeções.",
      attentionPoints: [
        "Explore modelagem financeira para cenários de crescimento",
        "Considere estratégias de precificação dinâmica",
        "Automatize relatórios para liberar tempo estratégico",
      ],
    },
    reference: {
      summary: "Excelente! Sua empresa tem maturidade financeira de referência. Seus números são claros, o planejamento é consistente e as decisões são baseadas em dados. Continue investindo em inteligência financeira para manter essa vantagem competitiva.",
      attentionPoints: [
        "Mantenha a disciplina financeira como cultura da empresa",
        "Compartilhe indicadores-chave com a equipe de liderança",
        "Explore oportunidades de expansão com base nas projeções",
      ],
    },
  },
  people: {
    critical: {
      summary: "Sua equipe opera sem direção clara. Sem organograma, cargos definidos ou programa de desenvolvimento, cada colaborador trabalha com base no que entende ser sua função. Isso gera retrabalho, conflitos e uma rotatividade que custa caro.",
      attentionPoints: [
        "Alta rotatividade gera custos ocultos de recrutamento e treinamento",
        "Falta de clareza nas funções causa sobrecarga e desmotivação",
        "Ausência de liderança estruturada dificulta reter talentos",
      ],
    },
    regular: {
      summary: "Existe alguma organização na equipe, mas as funções ainda se sobrepõem e os treinamentos são esporádicos. A liderança precisa dedicar mais tempo ao desenvolvimento das pessoas para reduzir turnover e aumentar produtividade.",
      attentionPoints: [
        "Treinamentos pontuais não criam competência sustentável",
        "Avaliações de desempenho ajudariam a alinhar expectativas",
        "Investir em liderança gera retorno direto na operação",
      ],
    },
    good: {
      summary: "Sua gestão de pessoas está no caminho certo. Os papéis estão razoavelmente definidos e há alguma iniciativa de desenvolvimento. Estruturar um plano de cargos e salários e fortalecer a cultura de feedback seriam os próximos passos naturais.",
      attentionPoints: [
        "Formalize o plano de cargos para dar perspectiva à equipe",
        "Crie rituais de feedback regular (1:1, reuniões de equipe)",
        "Meça satisfação interna para antecipar problemas",
      ],
    },
    advanced: {
      summary: "Você investe nas pessoas e isso aparece nos resultados. A equipe é estável, engajada e sabe o que se espera dela. Continue fortalecendo a cultura e explore programas de liderança para formar futuros gestores internos.",
      attentionPoints: [
        "Programe planos de sucessão para posições-chave",
        "Invista em liderança distribuída para escalar a gestão",
        "Explore benefícios não-monetários para retenção",
      ],
    },
    reference: {
      summary: "Sua empresa é uma referência em gestão de pessoas. Colaboradores engajados, turnover controlado e uma cultura forte. Isso é uma vantagem competitiva difícil de copiar. Continue investindo nessa base.",
      attentionPoints: [
        "Documente sua cultura para preservá-la durante o crescimento",
        "Considere programas de mentoria e desenvolvimento de lideranças",
        "Sua equipe pode ser um diferencial de marca empregadora",
      ],
    },
  },
  operations: {
    critical: {
      summary: "Sua operação depende de memória e improvisação. Sem processos documentados, cada atendimento é diferente — o que gera inconsistência na qualidade, desperdício de insumos e gargalos que poderiam ser evitados.",
      attentionPoints: [
        "Qualidade do serviço varia conforme quem está atendendo",
        "Sem controle de estoque, compras emergenciais corroem a margem",
        "Equipamentos sem manutenção preventiva causam paradas inesperadas",
      ],
    },
    regular: {
      summary: "Alguns processos já funcionam, mas a maioria não está documentada. A operação roda, mas com ineficiências que consomem tempo e dinheiro. Padronizar os processos-chave traria ganhos rápidos e visíveis.",
      attentionPoints: [
        "Identifique os 3 processos mais críticos e documente-os primeiro",
        "Controle de agenda e ocupação pode revelar capacidade ociosa",
        "Estoque planejado reduz custos em até 20%",
      ],
    },
    good: {
      summary: "Sua operação é funcional e organizada. Os principais processos estão sob controle, mas há espaço para otimização com tecnologia e indicadores de performance operacional.",
      attentionPoints: [
        "Automatize tarefas repetitivas para liberar tempo da equipe",
        "Implemente KPIs operacionais (tempo de atendimento, ocupação)",
        "Revisão periódica dos POPs mantém os processos atualizados",
      ],
    },
    advanced: {
      summary: "Operação bem estruturada com processos claros e indicadores. O foco agora é eficiência máxima: reduzir desperdícios, otimizar tempos e preparar a operação para escalar sem perder qualidade.",
      attentionPoints: [
        "Explore metodologias lean para eliminar desperdícios",
        "Integre operações com sistemas de gestão para visibilidade total",
        "Prepare procedimentos para replicar a operação em novas unidades",
      ],
    },
    reference: {
      summary: "Sua operação é um exemplo de eficiência. Processos documentados, indicadores monitorados e equipe alinhada. Esse nível de organização é o que separa empresas que crescem de forma sustentável.",
      attentionPoints: [
        "Continue evoluindo com base em dados operacionais",
        "Compartilhe boas práticas entre áreas e unidades",
        "Considere certificações de qualidade como diferencial",
      ],
    },
  },
  marketing: {
    critical: {
      summary: "Sua empresa depende quase exclusivamente de indicações para trazer novos clientes. Isso funciona, mas limita brutalmente o crescimento. Sem presença digital e estratégia de captação, você está invisível para a maioria dos potenciais clientes da sua região.",
      attentionPoints: [
        "Clientes buscam serviços online — se você não aparece, seu concorrente aparece",
        "Sem medir custo de aquisição, é impossível saber se o marketing compensa",
        "Fidelização inexistente significa perder clientes para qualquer concorrente",
      ],
    },
    regular: {
      summary: "Você tem alguma presença digital, mas sem estratégia definida. Posts esporádicos e sem métricas não geram resultados previsíveis. Estruturar um plano simples de marketing digital já traria mais visibilidade e clientes.",
      attentionPoints: [
        "Defina metas claras: quantos leads/mês você precisa?",
        "Google Meu Negócio otimizado é o investimento mais rápido",
        "Conteúdo educativo gera confiança e atrai o público certo",
      ],
    },
    good: {
      summary: "Seu marketing funciona mas pode ser potencializado. Você já tem presença digital e alguma consistência. O próximo nível é medir tudo: CAC, ROI por canal, taxa de conversão — e decidir com dados onde investir mais.",
      attentionPoints: [
        "Implemente rastreamento de origem dos clientes",
        "Teste campanhas pagas com orçamento controlado",
        "Crie um funil de relacionamento para leads que não converteram",
      ],
    },
    advanced: {
      summary: "Seu marketing é ativo e gera resultados mensuráveis. Você já está à frente da maioria do mercado veterinário. O foco agora é otimizar: segmentar melhor, automatizar comunicação e explorar novos canais.",
      attentionPoints: [
        "Automatize e-mail marketing e WhatsApp para retenção",
        "Explore parcerias estratégicas como canal de aquisição",
        "Invista em branding para cobrar premium",
      ],
    },
    reference: {
      summary: "Marketing de referência! Estratégia multicanal, métricas claras e presença digital forte. Você atrai, converte e retém clientes de forma consistente. Continue inovando para manter essa vantagem.",
      attentionPoints: [
        "Explore marketing de conteúdo aprofundado (blog, vídeo)",
        "Considere programas de embaixadores e indicação premiada",
        "Mantenha a consistência — é ela que sustenta os resultados",
      ],
    },
  },
  technology: {
    critical: {
      summary: "Sua empresa opera com tecnologia mínima ou nenhuma. Dados de clientes podem estar em cadernos, planilhas soltas ou na memória. Isso significa que você não tem visão real do negócio e está vulnerável a perda de informações.",
      attentionPoints: [
        "Sem sistema de gestão, tarefas manuais consomem horas que poderiam ser produtivas",
        "Dados de clientes desorganizados impedem ações de fidelização",
        "Ausência de backup coloca o negócio em risco real",
      ],
    },
    regular: {
      summary: "Você usa alguma tecnologia, mas de forma fragmentada. Sistemas não se conversam, dados ficam em silos e relatórios dependem de trabalho manual. Integrar as ferramentas certas traria uma visão unificada do negócio.",
      attentionPoints: [
        "Avalie um software de gestão específico para o setor",
        "Centralize dados de clientes em uma única plataforma",
        "Implemente backup automático como prioridade",
      ],
    },
    good: {
      summary: "Sua base tecnológica é funcional. Você já usa software de gestão e tem dados organizados. O próximo passo é criar dashboards automatizados e integrar sistemas para eliminar retrabalho.",
      attentionPoints: [
        "Dashboards em tempo real aceleram decisões",
        "Integração entre agenda, financeiro e marketing economiza horas",
        "Explore automações para tarefas repetitivas",
      ],
    },
    advanced: {
      summary: "Tecnologia bem implementada com sistemas integrados. Você toma decisões com base em dados, e isso é um diferencial competitivo enorme. Continue evoluindo para análises preditivas e automações avançadas.",
      attentionPoints: [
        "Explore inteligência artificial para análise de dados",
        "Automatize comunicação com clientes baseada em eventos",
        "Mantenha a equipe treinada nas ferramentas",
      ],
    },
    reference: {
      summary: "Excelente maturidade tecnológica! Sistemas integrados, dados protegidos e decisões data-driven. Você está na vanguarda do setor e isso se traduz em eficiência e competitividade.",
      attentionPoints: [
        "Explore novas tecnologias que podem diferenciar ainda mais",
        "Compartilhe dados relevantes com a equipe para cultura data-driven",
        "Considere APIs e integrações com parceiros estratégicos",
      ],
    },
  },
  legal: {
    critical: {
      summary: "Sua empresa pode estar exposta a riscos legais significativos. Sem conformidade com LGPD, contratos formalizados e licenças em dia, qualquer fiscalização ou disputa pode resultar em multas pesadas ou até interdição.",
      attentionPoints: [
        "LGPD não é opcional — multas podem chegar a 2% do faturamento",
        "Contratos informais deixam você vulnerável em disputas",
        "Licenças vencidas podem resultar em interdição imediata",
      ],
    },
    regular: {
      summary: "Você tem parte da documentação em ordem, mas há lacunas importantes. É o tipo de situação que não preocupa até que algo aconteça — e quando acontece, o custo é alto. Regularizar agora é muito mais barato do que remediar depois.",
      attentionPoints: [
        "Revise contratos com fornecedores e colaboradores",
        "Verifique prazos de renovação de licenças e alvarás",
        "Inicie o processo de adequação à LGPD",
      ],
    },
    good: {
      summary: "Sua situação jurídica é razoável. A maioria das obrigações está em dia, mas a adequação à LGPD e a formalização completa dos contratos podem precisar de atenção. Uma revisão periódica manteria tudo sob controle.",
      attentionPoints: [
        "Programe revisões jurídicas semestrais",
        "Documente políticas de privacidade e termos de uso",
        "Mantenha um calendário de vencimentos de licenças",
      ],
    },
    advanced: {
      summary: "Você está bem posicionado juridicamente. Contratos formalizados, licenças em dia e boa parte da conformidade regulatória atendida. O próximo passo é criar processos para manter essa organização de forma contínua.",
      attentionPoints: [
        "Automatize alertas de vencimento de documentos",
        "Revise cláusulas contratuais com suporte jurídico especializado",
        "Documente políticas internas de compliance",
      ],
    },
    reference: {
      summary: "Conformidade jurídica exemplar! Sua empresa opera com segurança legal total. Isso transmite credibilidade para clientes, parceiros e colaboradores. Mantenha esse padrão e use-o como diferencial.",
      attentionPoints: [
        "Use a conformidade como argumento comercial",
        "Mantenha atualizações periódicas com assessoria jurídica",
        "Explore certificações que atestem sua conformidade",
      ],
    },
  },
};

export function getDimensionInsight(dimensionId: string, band: ScoreBand): DimensionInsight {
  return insights[dimensionId]?.[band] ?? {
    summary: "Análise não disponível para esta dimensão.",
    attentionPoints: [],
  };
}

export const OVERALL_INSIGHTS: Record<ScoreBand, string> = {
  critical: "Seu negócio precisa de atenção urgente em áreas fundamentais. A boa notícia? Identificar esses pontos é o primeiro passo — e você acaba de dá-lo. Com as intervenções certas, é possível transformar esses indicadores em poucos meses.",
  regular: "Seu negócio tem bases, mas está operando abaixo do potencial. Existem áreas que, com ajustes direcionados, podem gerar resultados rápidos. O diagnóstico mostra exatamente onde concentrar energia para destravar crescimento.",
  good: "Seu negócio está saudável e funcional. Você já superou os desafios mais básicos e agora tem a oportunidade de dar o próximo salto — otimizar processos, investir em tecnologia e fortalecer o que já funciona.",
  advanced: "Parabéns! Sua empresa opera com maturidade acima da média do mercado. Os fundamentos estão sólidos e o foco agora deve ser em refinamento e expansão estratégica.",
  reference: "Excepcional! Sua empresa é referência em maturidade gerencial. Esse nível de organização, controle e visão estratégica coloca você entre os melhores do setor. Continue evoluindo e inspirando o mercado.",
};
