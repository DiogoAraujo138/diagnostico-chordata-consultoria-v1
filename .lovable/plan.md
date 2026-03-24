

## Plano: Aplicar Design do clinic-health-score no Projeto Atual

### O que o outro projeto tem de diferente (design)

O projeto `clinic-health-score` usa um design system mais refinado:

1. **Tipografia**: Space Grotesk (sans), Lora (serif), Space Mono (mono)
2. **Cores com CSS variables HSL**: background `222 45% 11%`, card `222 40% 14%`, primary `214 60% 57%`, com chart-colors por dimensao (financial, marketing, operations, experience)
3. **Score colors**: `--score-good` (verde), `--score-medium` (amarelo), `--score-bad` (vermelho)
4. **Shadows customizadas**: de `--shadow-2xs` ate `--shadow-2xl` com tons profundos
5. **Framer Motion**: animacoes de entrada/saida entre steps com `AnimatePresence`
6. **Landing Page separada**: formulario de lead com hero, badges de beneficios (Score detalhado, Benchmarking, Gargalos, Relatorio)
7. **DiagnosisWizard**: wizard com steps nomeados, progress bar, logo + simbolo decorativo de fundo
8. **DiagnosisResult**: SVG gauge animado para score geral, radar chart com benchmark do mercado, bottlenecks/opportunities com icones, cards de dimensao com barras coloridas por dimensao
9. **Scoring inteligente**: bottlenecks e opportunities gerados dinamicamente baseados nos valores especificos de cada resposta, nao generico por faixa

### O que muda neste projeto

**1. Atualizar design system (CSS + Tailwind)**
- Importar fontes Space Grotesk, Lora, Space Mono
- Adotar as CSS variables do outro projeto (background, card, shadows, chart-colors, score-colors)
- Adicionar font-family variables

**2. Adicionar Framer Motion**
- Animacoes de transicao entre steps do questionario (fade + slide)
- Animacao de entrada na pagina de resultados

**3. Redesenhar a pagina de resultados inspirada no DiagnosisResult**
- SVG gauge animado para score geral (circulo com stroke animado, nao apenas o ScoreCircle atual)
- Radar chart com linha de **benchmark do mercado** (media do setor) alem do score do usuario
- Cards de dimensao com cores especificas por dimensao (nao apenas cor da faixa)
- Secao de **Top Gargalos** e **Top Oportunidades** com icones e numeracao (como no outro projeto)
- Manter os accordions com insights que ja existem
- Simbolo decorativo Chordata no fundo (imagem semi-transparente)

**4. Adicionar benchmarks de mercado ao scoring**
- Criar constante `BENCHMARKS` com medias e top por dimensao
- Exibir no radar chart e nos cards de dimensao a comparacao com o mercado

**5. Adicionar bottlenecks e opportunities dinamicos ao scoring**
- Expandir `calculateDimensionScores` para gerar listas de bottlenecks e opportunities baseados nas respostas especificas (como o outro projeto faz)
- Exemplo: se inadimplencia > 15%, adicionar bottleneck "Alta inadimplencia comprometendo o fluxo de caixa"

**6. Redesenhar o header do wizard**
- Logo + simbolo decorativo de fundo
- Step indicator com titulo ("Etapa 1 de 7 — Gestao Financeira")

### Arquivos afetados

| Arquivo | Acao |
|---------|------|
| `src/index.css` | Atualizar com design system do outro projeto (fontes, cores, shadows) |
| `tailwind.config.ts` | Adicionar font-families, chart colors, score colors |
| `src/lib/scoring.ts` | Adicionar BENCHMARKS, bottlenecks/opportunities dinamicos |
| `src/components/questionnaire/ResultsPage.tsx` | Redesenhar com gauge SVG, radar com benchmark, bottlenecks/opportunities |
| `src/components/questionnaire/ScoreCircle.tsx` | Refazer como SVG gauge animado |
| `src/components/questionnaire/Questionnaire.tsx` | Header com simbolo decorativo, framer-motion nas transicoes |
| `src/components/questionnaire/ProgressBar.tsx` | Adicionar titulo do step atual |
| `package.json` | Adicionar framer-motion |

### Detalhes tecnicos

**Benchmarks:**
```
financial: { avg: 58, top: 82 }
people: { avg: 50, top: 75 }
operations: { avg: 52, top: 78 }
marketing: { avg: 45, top: 75 }
technology: { avg: 42, top: 70 }
legal: { avg: 55, top: 80 }
```

**Score colors (CSS vars):**
- `--score-good`: verde (>=70)
- `--score-medium`: amarelo (40-69)
- `--score-bad`: vermelho (<40)

**Chart colors por dimensao:**
- financial: teal `168 80% 40%`
- people: azul `214 60% 57%`
- operations: laranja `32 95% 60%`
- marketing: roxo `262 60% 60%`
- technology: cyan `190 80% 50%`
- legal: cinza `215 15% 60%`

