import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "./ProgressBar";
import { ContactStep } from "./ContactStep";
import { DimensionStep } from "./DimensionStep";
import { ResultsPage } from "./ResultsPage";
import { ContactInfo, DIMENSIONS } from "@/lib/questionnaire-data";
import { calculateDimensionScores, calculateOverallScore } from "@/lib/scoring";
import { ArrowLeft, ArrowRight, BarChart3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_STEPS = DIMENSIONS.length + 1;

export function Questionnaire() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [contact, setContact] = useState<ContactInfo>({
    name: "",
    email: "",
    company: "",
    businessModel: "",
    phone: "",
  });
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = useCallback((questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const validateContact = (): boolean => {
    const errs: Record<string, string> = {};
    if (!contact.name.trim()) errs.name = "Nome é obrigatório";
    if (!contact.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email))
      errs.email = "E-mail válido é obrigatório";
    if (!contact.company.trim()) errs.company = "Empresa é obrigatória";
    if (!contact.businessModel) errs.businessModel = "Selecione um modelo";
    setContactErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 0 && !validateContact()) return;
    setDirection(1);
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setShowResults(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleRestart = () => {
    setStep(0);
    setContact({ name: "", email: "", company: "", businessModel: "", phone: "" });
    setAnswers({});
    setShowResults(false);
    setContactErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (showResults) {
    const dimensionScores = calculateDimensionScores(answers);
    const overallScore = calculateOverallScore(dimensionScores);
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <ResultsPage
          overallScore={overallScore}
          dimensionScores={dimensionScores}
          contact={contact}
          answers={answers}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  const currentDimension = step > 0 ? DIMENSIONS[step - 1] : null;
  const stepTitle = step === 0 ? "Informações" : currentDimension?.name ?? "";

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/30 px-4 py-4 bg-background/90 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Brand row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://ecossistema-chordata-v2.vercel.app/assets/chordata-logo-white-CWPVcoS7.png"
                alt="Chordata"
                className="h-8 w-auto object-contain"
              />
              <div className="border-l border-border/50 pl-3">
                <p className="text-xs font-semibold text-foreground leading-none">Chordata Consultoria</p>
                <p className="text-[10px] text-blue-400 mt-0.5">Score de Maturidade Gerencial</p>
              </div>
            </div>
            <span className="text-[10px] text-muted-foreground font-mono bg-card/60 border border-border/40 px-2 py-1 rounded-md">
              {step + 1} / {TOTAL_STEPS}
            </span>
          </div>
          <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} stepTitle={stepTitle} />
        </div>
      </header>

      {/* Content with AnimatePresence */}
      <main className="flex-1 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {step === 0 ? (
                <ContactStep data={contact} onChange={setContact} errors={contactErrors} />
              ) : currentDimension ? (
                <DimensionStep
                  dimension={currentDimension}
                  answers={answers}
                  onAnswer={handleAnswer}
                />
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="border-t border-border/30 px-4 py-4 bg-background/90 backdrop-blur-md sticky bottom-0">
        <div className="max-w-2xl mx-auto flex justify-between gap-3">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 0}
            className="border-border/50 hover:bg-card text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Anterior
          </Button>
          <Button
            onClick={handleNext}
            className="glow-primary bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6"
          >
            {step === TOTAL_STEPS - 1 ? (
              <>
                <BarChart3 className="mr-2 h-4 w-4" />
                Ver Resultado
              </>
            ) : (
              <>
                Próximo
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </footer>
    </div>
  );
}