import { useLang } from "../LanguageContext";

export default function HeroSection() {
  const { t } = useLang();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-[#0B1620] overflow-hidden">
      {/* Subtle radial glow behind content */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00C2D1]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Badge */}
      <span className="relative inline-block px-5 py-2 mb-8 text-sm font-medium tracking-wide rounded-full border border-[#00C2D1]/40 text-[#00C2D1] bg-[#00C2D1]/5">
        {t.badge}
      </span>

      {/* Headline */}
      <h1 className="relative max-w-4xl text-center text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-[#EAF2F7]">
        {t.headline}
        <span className="text-[#00C2D1]">{t.headlineAccent}</span>
      </h1>

      {/* Subtitle */}
      <p className="relative max-w-2xl mt-6 text-center text-lg md:text-xl leading-relaxed text-[#9FB3C8]">
        {t.subtitle}
      </p>

      {/* Visual / placeholder for video or image */}
      <div className="relative mt-12 w-full max-w-3xl aspect-video rounded-2xl overflow-hidden border border-[#1B3A4B] bg-[#102635] shadow-2xl shadow-[#00C2D1]/5">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Play button overlay */}
          <button className="flex items-center justify-center w-20 h-20 rounded-full bg-[#00C2D1]/10 border-2 border-[#00C2D1]/40 hover:bg-[#00C2D1]/20 transition-colors cursor-pointer group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="#00C2D1"
              className="ml-1 group-hover:scale-110 transition-transform"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </button>
        </div>
        {/* Shield / data protection motif */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00C2D1"
            strokeWidth="0.5"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
      </div>

      {/* CTA */}
      <button className="relative mt-12 px-10 py-4 text-base font-bold tracking-wider rounded-lg bg-[#00C2D1] text-[#0B1620] hover:bg-[#00A8B5] transition-colors cursor-pointer shadow-lg shadow-[#00C2D1]/20">
        {t.cta}
      </button>

      {/* Scroll hint */}
      <div className="relative mt-16 flex flex-col items-center gap-2 text-[#9FB3C8]/60 text-xs tracking-widest uppercase">
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
    </section>
  );
}
