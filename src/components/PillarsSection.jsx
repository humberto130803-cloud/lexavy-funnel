import { useLang } from "../LanguageContext";

export default function PillarsSection() {
  const { t } = useLang();

  return (
    <section className="relative py-20 px-4 bg-[#102635]">
      {/* Headline */}
      <h2 className="max-w-4xl mx-auto text-center text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#EAF2F7]">
        {t.pillarsHeadline}
      </h2>

      {/* Subtitle */}
      <p className="max-w-2xl mx-auto mt-5 text-center text-base md:text-lg text-[#9FB3C8] leading-relaxed">
        {t.pillarsSubtitle}
      </p>

      {/* Roadmap sub-headline */}
      <p className="max-w-2xl mx-auto mt-10 text-center text-xl sm:text-2xl font-semibold text-[#EAF2F7]">
        {t.pillarsRoadmap}
      </p>

      {/* Cards grid */}
      <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
        {t.pillarsCards.map((card, i) => (
          <div
            key={i}
            className="rounded-2xl bg-[#0B1620] border border-[#1B3A4B] p-7 hover:border-[#00C2D1]/30 transition-colors"
          >
            <h3 className="text-lg font-bold text-[#EAF2F7] mb-3">
              {card.title}
            </h3>
            <p className="text-sm leading-relaxed text-[#9FB3C8]">
              {card.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom CTA bar */}
      <div className="max-w-3xl mx-auto mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl bg-[#0B1620] border border-[#1B3A4B] px-8 py-6">
        <div>
          <p className="text-2xl sm:text-3xl font-bold text-[#EAF2F7]">
            {t.pillarsCtaHeadline}
          </p>
          <p className="mt-1 text-sm text-[#9FB3C8]">{t.pillarsCtaSub}</p>
        </div>
        <button className="shrink-0 px-8 py-3.5 rounded-lg bg-[#00C2D1] text-[#0B1620] font-bold tracking-wider text-sm hover:bg-[#00A8B5] transition-colors cursor-pointer shadow-lg shadow-[#00C2D1]/20">
          {t.pillarsCta}
        </button>
      </div>
    </section>
  );
}
