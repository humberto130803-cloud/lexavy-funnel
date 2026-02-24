import { useMemo } from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";

export default function MeshWave({
  side = "left",
  variant = 1,
  opacity = 0.10,
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.05 });

  const paths = useMemo(() => {
    const lines = [];
    const rows = 12;
    const cols = 8;
    const w = 800;
    const h = 700;
    const rowH = h / rows;
    const colW = w / cols;

    // Horizontal bezier curves
    for (let r = 0; r <= rows; r++) {
      const y = r * rowH;
      const amplitude = variant === 1 ? 25 : -20;
      const cy = y + amplitude * Math.sin((r * Math.PI) / rows);
      lines.push(
        <path
          key={`h-${r}`}
          d={`M0 ${y} Q${w / 2} ${cy} ${w} ${y}`}
          fill="none"
          stroke="#00C2D1"
          strokeWidth="0.5"
        />
      );
    }

    // Vertical cross-lines
    for (let c = 0; c <= cols; c++) {
      const x = c * colW;
      const amplitude = variant === 1 ? 15 : -12;
      const cx = x + amplitude * Math.cos((c * Math.PI) / cols);
      lines.push(
        <path
          key={`v-${c}`}
          d={`M${x} 0 Q${cx} ${h / 2} ${x} ${h}`}
          fill="none"
          stroke="#00C2D1"
          strokeWidth="0.3"
        />
      );
    }

    return lines;
  }, [variant]);

  const isRight = side === "right";

  return (
    <div
      ref={ref}
      className={`hidden lg:block pointer-events-none absolute z-0 transition-all duration-1000 ease-out ${
        isVisible ? "scale-100" : "scale-95 !opacity-0"
      }`}
      aria-hidden="true"
      style={{
        [isRight ? "right" : "left"]: "-80px",
        top: "50%",
        transform: `translateY(-50%)${isRight ? " scaleX(-1)" : ""}${!isVisible ? " scale(0.95)" : ""}`,
        opacity: isVisible ? opacity : 0,
        animation: isVisible ? "mesh-drift 12s ease-in-out infinite" : "none",
      }}
    >
      <svg
        width="800"
        height="700"
        viewBox="0 0 800 700"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths}
      </svg>
    </div>
  );
}
