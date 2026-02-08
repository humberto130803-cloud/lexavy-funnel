import { useLang } from "../LanguageContext";
import useScrollAnimation from "../hooks/useScrollAnimation";


export default function HeroSection() {
  const { t } = useLang();
  const badgeAnim = useScrollAnimation();
  const contentAnim = useScrollAnimation();
  const rightAnim = useScrollAnimation();

  const scrollToForm = () => {
    document.getElementById("qualification-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 bg-[#0B1620] overflow-hidden">
      {/* Subtle radial glow behind content */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00C2D1]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="relative max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Left column: Badge, Headline, Subtitle, Value Bullets, CTA */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Badge */}
          <div
            ref={badgeAnim.ref}
            className={`transition-all duration-700 ease-out ${badgeAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="inline-block px-5 py-2 mb-8 text-sm font-medium tracking-wide rounded-full border border-[#00C2D1]/40 text-[#00C2D1] bg-[#00C2D1]/5">
              {t.badge}
            </span>
          </div>

          {/* Headline + Subtitle + Value Bullets + CTA */}
          <div
            ref={contentAnim.ref}
            className={`transition-all duration-700 ease-out delay-100 ${contentAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-[#EAF2F7]">
              {t.headline}
              <span className="text-[#00C2D1]">{t.headlineAccent}</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl leading-relaxed text-[#9FB3C8] max-w-xl">
              {t.subtitle}
            </p>

            {/* Credibility strip */}
            <p className="mt-4 text-sm text-[#9FB3C8]/70 max-w-xl italic">
              {t.credibilityStrip}
            </p>

            {/* Value Bullets */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
              {t.valueBullets.map((bullet, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-[#00C2D1]/10 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00C2D1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#EAF2F7]">{bullet.title}</p>
                    <p className="text-xs text-[#9FB3C8]">{bullet.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={scrollToForm}
              className="mt-8 px-10 py-4 text-sm font-bold tracking-wider rounded-lg bg-[#00C2D1] text-[#0B1620] hover:bg-[#00A8B5] transition-colors cursor-pointer shadow-lg shadow-[#00C2D1]/20"
            >
              {t.cta}
            </button>

            {/* Qualifier */}
            <p className="mt-4 text-xs text-[#9FB3C8]/50 max-w-xl">
              {t.qualifier}
            </p>
          </div>

          {/* Scroll hint */}
          <div onClick={scrollToForm} className="mt-12 flex flex-col items-center lg:items-start gap-2 text-[#9FB3C8]/60 text-xs tracking-widest uppercase cursor-pointer">
            <span>{t.scrollLabel}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-bounce"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        {/* Right column: VSL video placeholder with title and description */}
        <div
          ref={rightAnim.ref}
          className={`flex-1 w-full max-w-md lg:max-w-lg flex flex-col gap-5 transition-all duration-700 ease-out delay-200 ${rightAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* VSL Title */}
          <p className="text-base font-semibold text-[#EAF2F7] leading-snug">
            {t.vslTitle}
          </p>

          {/* VSL Video placeholder */}
          <div className="w-full aspect-video rounded-2xl overflow-hidden border border-[#1B3A4B] bg-[#102635] shadow-2xl shadow-[#00C2D1]/5">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Play button overlay */}
              <button className="flex items-center justify-center w-16 h-16 rounded-full bg-[#00C2D1]/10 border-2 border-[#00C2D1]/40 hover:bg-[#00C2D1]/20 transition-colors cursor-pointer group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="#00C2D1"
                  className="ml-1 group-hover:scale-110 transition-transform"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </button>
              {/* Shield motif */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="160"
                  height="160"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#00C2D1"
                  strokeWidth="0.5"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
            </div>
          </div>

          {/* VSL Description bullets */}
          <div className="flex flex-col gap-2">
            {t.vslBullets.map((bullet, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00C2D1] shrink-0" />
                <p className="text-sm text-[#9FB3C8]">{bullet}</p>
              </div>
            ))}
          </div>

          {/* Compliance note */}
          <p className="text-xs text-[#9FB3C8]/50 border-t border-[#1B3A4B] pt-4">
            {t.vslNote}
          </p>
        </div>
      </div>
    </section>
  );
}
