import { useEffect, useState } from "react";
import { getBand } from "@/lib/scoring";

interface ScoreCircleProps {
  score: number;
  size?: number;
  label?: string;
}

export function ScoreCircle({ score, size = 200, label }: ScoreCircleProps) {
  const [animated, setAnimated] = useState(0);
  const band = getBand(score);

  // Semi-circle gauge (180 degrees)
  const radius = 40;
  const circumference = Math.PI * radius; // half circle
  const offset = circumference - (animated / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative glow-score"
        style={{
          width: size,
          height: size * 0.65,
          "--glow-color": band.color.replace(")", " / 0.4)").replace("hsl(", "hsl("),
        } as React.CSSProperties}
      >
        <svg
          viewBox="0 0 100 60"
          style={{ width: size, height: size * 0.65 }}
        >
          {/* Background arc */}
          <path
            d="M 10 55 A 40 40 0 0 1 90 55"
            fill="none"
            stroke="hsl(var(--card))"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Score arc */}
          <path
            d="M 10 55 A 40 40 0 0 1 90 55"
            fill="none"
            stroke={band.color}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-[1500ms] ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
          <span className="text-5xl font-bold font-mono" style={{ color: band.color }}>
            {animated}
          </span>
          <span className="text-xs text-muted-foreground">/100</span>
        </div>
      </div>
      <div
        className="px-5 py-1.5 rounded-full text-sm font-semibold tracking-wide"
        style={{ backgroundColor: band.color, color: "#0D1117" }}
      >
        {label ?? band.label}
      </div>
    </div>
  );
}
