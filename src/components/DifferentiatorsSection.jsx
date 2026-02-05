import { useLang } from "../LanguageContext";
import useScrollAnimation from "../hooks/useScrollAnimation";
import ImagePlaceholder from "./ImagePlaceholder";

export default function DifferentiatorsSection() {
  const { t } = useLang();
  const headlineAnim = useScrollAnimation();
  const gridAnim = useScrollAnimation();

  return (
    <section className="relative py-20 px-4 bg-[#102635]">
      {/* Headline */}
      <div
        ref={headlineAnim.ref}
        className={`transition-all duration-700 ease-out ${headlineAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2 className="max-w-4xl mx-auto text-center text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#EAF2F7]">
          {t.diffHeadline}
        </h2>
        <p className="max-w-2xl mx-auto mt-5 text-center text-base md:text-lg text-[#9FB3C8] leading-relaxed">
          {t.diffSubtitle}
        </p>
      </div>

      {/* 3x2 cards grid */}
      <div
        ref={gridAnim.ref}
        className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {t.diffCards.map((card, i) => (
          <div
            key={i}
            className={`rounded-2xl bg-[#0B1620] border border-[#1B3A4B] p-7 hover:border-[#00C2D1]/30 transition-all duration-700 ease-out ${gridAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="mb-4">
              <ImagePlaceholder label="Icon" aspectRatio="1/1" className="w-12 h-12" />
            </div>
            <h3 className="text-lg font-bold text-[#EAF2F7] mb-3">
              {card.title}
            </h3>
            <p className="text-sm leading-relaxed text-[#9FB3C8]">
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
