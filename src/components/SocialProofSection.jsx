import { useLang } from "../LanguageContext";
import useScrollAnimation from "../hooks/useScrollAnimation";
import ImagePlaceholder from "./ImagePlaceholder";

export default function SocialProofSection() {
  const { t } = useLang();
  const titleAnim = useScrollAnimation();
  const logosAnim = useScrollAnimation();
  const statsAnim = useScrollAnimation();

  return (
    <section className="relative py-16 px-4 bg-[#0B1620]">
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#1B3A4B] to-transparent" />

      {/* Label */}
      <div
        ref={titleAnim.ref}
        className={`transition-all duration-700 ease-out ${titleAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <p className="text-center text-xs font-semibold tracking-[0.2em] text-[#9FB3C8]/60 uppercase mb-10">
          {t.socialProofLabel}
        </p>
      </div>

      {/* Logos grid */}
      <div
        ref={logosAnim.ref}
        className={`max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12 transition-all duration-700 ease-out ${logosAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        {t.socialProofLogos.map((name, i) => (
          <div
            key={i}
            className="transition-all duration-700 ease-out"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <ImagePlaceholder
              label={name}
              aspectRatio="3/1"
              className={`${logosAnim.isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"} transition-all duration-700 ease-out`}
            />
          </div>
        ))}
      </div>

      {/* Stats bar */}
      <div
        ref={statsAnim.ref}
        className={`max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 transition-all duration-700 ease-out ${statsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        {t.socialProofStats.map((stat, i) => (
          <div
            key={i}
            className="rounded-xl border border-[#1B3A4B] bg-[#102635] px-6 py-5 text-center transition-all duration-700 ease-out"
            style={{ transitionDelay: `${i * 150}ms` }}
          >
            <p className="text-3xl font-bold text-[#00C2D1]">{stat.value}</p>
            <p className="mt-1 text-sm text-[#9FB3C8]">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
