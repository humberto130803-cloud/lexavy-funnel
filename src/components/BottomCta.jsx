import { useLang } from "../LanguageContext";
import useScrollAnimation from "../hooks/useScrollAnimation";


export default function BottomCta() {
  const { t } = useLang();
  const anim = useScrollAnimation();

  const scrollToForm = () => {
    document.getElementById("qualification-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-20 px-4 bg-[#0B1620] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#1B3A4B] to-transparent" />
      <div
        ref={anim.ref}
        className={`max-w-2xl mx-auto text-center transition-all duration-700 ease-out ${anim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-[#EAF2F7] leading-tight">
          {t.bottomCtaHeadline}
        </h2>
        <p className="mt-5 text-base text-[#9FB3C8] leading-relaxed">
          {t.bottomCtaSubtitle}
        </p>
        <button
          onClick={scrollToForm}
          className="mt-8 px-10 py-4 text-sm font-bold tracking-wider rounded-lg bg-[#00C2D1] text-[#0B1620] hover:bg-[#00A8B5] transition-colors cursor-pointer shadow-lg shadow-[#00C2D1]/20"
        >
          {t.bottomCtaButton}
        </button>
      </div>
    </section>
  );
}
