export interface QuestionOption {
  label: string;
  value: number;
}

export interface Question {
  id: string;
  text: string;
  type: 'select' | 'scale';
  options?: QuestionOption[];
}

export interface Dimension {
  id: string;
  name: string;
  shortName: string;
  weight: number;
  icon: string;
  questions: Question[];
}

export interface ContactInfo {
  name: string;
  email: string;
  company: string;
  businessModel: string;
  phone?: string;
}

export const BUSINESS_MODELS = [
  "Clínica Veterinária",
  "Hospital Veterinário",
  "Pet Shop com Clínica",
  "Pet Shop sem Clínica",
  "Laboratório Veterinário",
  "Centro de Diagnóstico",
  "Clínica de Especialidades",
  "Consultório Individual",
  "Outro",
];

export const SCALE_LABELS: Record<number, string> = {
  0: "Inexistente",
  1: "Muito fraco",
  2: "Fraco",
  3: "Moderado",
  4: "Bom",
  5: "Excelente",
};

export const DIMENSIONS: Dimension[] = [
  {
    id: "financial",
    name: "Gestão Financeira",
    shortName: "Financeiro",
    weight: 0.25,
    icon: "💰",
    questions: [
      {
        id: "fin_1",
        text: "Qual a faixa de faturamento mensal da sua empresa?",
        type: "select",
        options: [
          { label: "Até R$ 50 mil", value: 2 },
          { label: "R$ 50 mil – R$ 100 mil", value: 4 },
          { label: "R$ 100 mil – R$ 200 mil", value: 6 },
          { label: "R$ 200 mil – R$ 500 mil", value: 8 },
          { label: "Acima de R$ 500 mil", value: 10 },
        ],
      },
      {
        id: "fin_2",
        text: "Qual sua margem de lucro líquida atual?",
        type: "select",
        options: [
          { label: "Negativa ou 0%", value: 2 },
          { label: "1% a 5%", value: 4 },
          { label: "6% a 15%", value: 6 },
          { label: "16% a 25%", value: 8 },
          { label: "Acima de 25%", value: 10 },
        ],
      },
      {
        id: "fin_3",
        text: "Qual o índice de inadimplência dos seus clientes?",
        type: "select",
        options: [
          { label: "Acima de 30%", value: 2 },
          { label: "15% a 30%", value: 4 },
          { label: "5% a 15%", value: 7 },
          { label: "Abaixo de 5%", value: 10 },
        ],
      },
      {
        id: "fin_4",
        text: "Você possui controle de fluxo de caixa estruturado?",
        type: "scale",
      },
      {
        id: "fin_5",
        text: "Você utiliza indicadores financeiros (DRE, balanço) para tomada de decisão?",
        type: "scale",
      },
      {
        id: "fin_6",
        text: "Possui planejamento financeiro para os próximos 12 meses?",
        type: "scale",
      },
    ],
  },
  {
    id: "people",
    name: "Gestão de Pessoas e Liderança",
    shortName: "Pessoas",
    weight: 0.20,
    icon: "👥",
    questions: [
      {
        id: "ppl_1",
        text: "Sua empresa possui um organograma definido com funções claras?",
        type: "scale",
      },
      {
        id: "ppl_2",
        text: "Existe um programa de treinamento recorrente para a equipe?",
        type: "scale",
      },
      {
        id: "ppl_3",
        text: "Qual o índice de turnover (rotatividade) anual da equipe?",
        type: "select",
        options: [
          { label: "Acima de 40%", value: 2 },
          { label: "20% a 40%", value: 4 },
          { label: "10% a 20%", value: 7 },
          { label: "Abaixo de 10%", value: 10 },
        ],
      },
      {
        id: "ppl_4",
        text: "Você realiza avaliações de desempenho periódicas?",
        type: "scale",
      },
      {
        id: "ppl_5",
        text: "Existe um plano de cargos e salários estruturado?",
        type: "scale",
      },
      {
        id: "ppl_6",
        text: "A liderança dedica tempo a reuniões de alinhamento com a equipe?",
        type: "scale",
      },
    ],
  },
  {
    id: "operations",
    name: "Operações e Processos",
    shortName: "Operações",
    weight: 0.20,
    icon: "⚙️",
    questions: [
      {
        id: "ops_1",
        text: "Seus processos principais estão documentados (POPs)?",
        type: "scale",
      },
      {
        id: "ops_2",
        text: "Você mede o tempo médio de atendimento por consulta/procedimento?",
        type: "scale",
      },
      {
        id: "ops_3",
        text: "Qual a taxa de ocupação média da sua agenda?",
        type: "select",
        options: [
          { label: "Abaixo de 30%", value: 2 },
          { label: "30% a 50%", value: 4 },
          { label: "50% a 70%", value: 6 },
          { label: "70% a 90%", value: 8 },
          { label: "Acima de 90%", value: 10 },
        ],
      },
      {
        id: "ops_4",
        text: "Possui controle de estoque e insumos com reposição planejada?",
        type: "scale",
      },
      {
        id: "ops_5",
        text: "Seus equipamentos possuem manutenção preventiva programada?",
        type: "scale",
      },
      {
        id: "ops_6",
        text: "Existe um sistema de gestão (ERP/software) integrado nas operações?",
        type: "scale",
      },
    ],
  },
  {
    id: "marketing",
    name: "Marketing e Captação",
    shortName: "Marketing",
    weight: 0.15,
    icon: "📢",
    questions: [
      {
        id: "mkt_1",
        text: "Você tem uma estratégia de marketing digital ativa (redes sociais, Google)?",
        type: "scale",
      },
      {
        id: "mkt_2",
        text: "Qual a principal fonte de novos clientes?",
        type: "select",
        options: [
          { label: "Indicação boca a boca apenas", value: 3 },
          { label: "Indicação + alguma presença digital", value: 5 },
          { label: "Marketing digital ativo + indicação", value: 8 },
          { label: "Estratégia multicanal integrada", value: 10 },
        ],
      },
      {
        id: "mkt_3",
        text: "Você mede o custo de aquisição de clientes (CAC)?",
        type: "scale",
      },
      {
        id: "mkt_4",
        text: "Possui estratégia de retenção e fidelização de clientes?",
        type: "scale",
      },
      {
        id: "mkt_5",
        text: "Qual sua nota para a presença online da empresa (site, Google Meu Negócio)?",
        type: "scale",
      },
    ],
  },
  {
    id: "technology",
    name: "Tecnologia e Dados",
    shortName: "Tecnologia",
    weight: 0.15,
    icon: "💻",
    questions: [
      {
        id: "tech_1",
        text: "Você utiliza um software de gestão específico para o setor?",
        type: "scale",
      },
      {
        id: "tech_2",
        text: "Os dados de clientes e atendimentos estão digitalizados e organizados?",
        type: "scale",
      },
      {
        id: "tech_3",
        text: "Você utiliza dashboards ou relatórios automatizados para tomada de decisão?",
        type: "scale",
      },
      {
        id: "tech_4",
        text: "Possui integração entre seus sistemas (agenda, financeiro, marketing)?",
        type: "scale",
      },
      {
        id: "tech_5",
        text: "Qual o nível de segurança e backup dos seus dados?",
        type: "select",
        options: [
          { label: "Sem backup regular", value: 2 },
          { label: "Backup manual esporádico", value: 4 },
          { label: "Backup automático local", value: 7 },
          { label: "Backup em nuvem com redundância", value: 10 },
        ],
      },
    ],
  },
  {
    id: "legal",
    name: "Jurídico e Conformidade",
    shortName: "Jurídico",
    weight: 0.05,
    icon: "⚖️",
    questions: [
      {
        id: "leg_1",
        text: "Sua empresa está em conformidade com a LGPD (proteção de dados)?",
        type: "scale",
      },
      {
        id: "leg_2",
        text: "Possui contratos formalizados com fornecedores e colaboradores?",
        type: "scale",
      },
      {
        id: "leg_3",
        text: "Está em dia com todas as licenças e alvarás necessários (CRMV, vigilância sanitária)?",
        type: "scale",
      },
    ],
  },
];
