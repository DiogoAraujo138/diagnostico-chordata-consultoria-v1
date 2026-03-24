import { DIMENSIONS } from "@/lib/questionnaire-data";
import { Check } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepTitle?: string;
}

const STEP_LABELS = ["Info", ...DIMENSIONS.map((d) => d.shortName)];

export function ProgressBar({ currentStep, totalSteps, stepTitle }: ProgressBarProps) {
  const pct = Math.round((currentStep / (totalSteps - 1)) * 100);

  return (
    <div className="w-full space-y-3">

      {/* Step title + percentage */}
      <div className="flex items-center justify-between">
        {stepTitle && (
          <p className="text-xs text-muted-foreground">
            Etapa <span className="text-foreground font-semibold">{currentStep + 1}</span>/{totalSteps}
            {" · "}
            <span className="text-blue-400 font-medium">{stepTitle}</span>
          </p>
        )}
        <span className="text-xs font-mono text-muted-foreground ml-auto">{pct}%</span>
      </div>

      {/* Step indicators with connector lines */}
      <div className="relative flex items-center justify-between">
        {/* Connector track */}
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-border/50 z-0" />
        {/* Filled connector */}
        <div
          className="absolute top-4 left-4 h-0.5 bg-gradient-to-r from-blue-500 to-blue-400 z-0 transition-all duration-500 ease-out"
          style={{ width: `calc(${pct}% - 2rem)` }}
        />

        {STEP_LABELS.map((label, i) => {
          const isActive   = i === currentStep;
          const isComplete = i < currentStep;

          return (
            <div key={i} className="relative z-10 flex flex-col items-center gap-1">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                  ${isComplete
                    ? "bg-blue-500 text-white"
                    : isActive
                      ? "bg-blue-500 text-white ring-2 ring-blue-400/40 ring-offset-2 ring-offset-background scale-110"
                      : "bg-card border border-border/60 text-muted-foreground"
                  }
                `}
              >
                {isComplete ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span
                className={`text-[10px] hidden sm:block font-medium transition-colors leading-none ${
                  isActive ? "text-blue-400" : isComplete ? "text-muted-foreground" : "text-muted-foreground/50"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Thin progress bar accent */}
      <div className="relative h-0.5 w-full overflow-hidden rounded-full bg-border/30">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}