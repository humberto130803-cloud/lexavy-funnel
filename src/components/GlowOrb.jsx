import useScrollAnimation from "../hooks/useScrollAnimation";

export default function GlowOrb({
  size = 400,
  color = "#00C2D1",
  top,
  left,
  right,
  bottom,
  delay = 0,
  opacity = 0.06,
  className = "",
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.05 });

  const positionStyle = {
    width: size,
    height: size,
    ...(top !== undefined && { top }),
    ...(left !== undefined && { left }),
    ...(right !== undefined && { right }),
    ...(bottom !== undefined && { bottom }),
  };

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute z-0 rounded-full transition-all duration-[1800ms] ease-out ${
        isVisible ? "scale-100" : "scale-75 !opacity-0"
      } ${className}`}
      aria-hidden="true"
      style={{
        ...positionStyle,
        opacity: isVisible ? opacity : 0,
        background: `radial-gradient(circle, ${color} 0%, ${color}33 30%, transparent 70%)`,
        filter: `blur(${Math.max(80, size * 0.25)}px)`,
        transitionDelay: `${delay}ms`,
      }}
    />
  );
}
