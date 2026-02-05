import { useLang } from "../LanguageContext";
import useScrollAnimation from "../hooks/useScrollAnimation";
import ImagePlaceholder from "./ImagePlaceholder";

function PainPointRow({ point, index }) {
  const anim = useScrollAnimation();
  const imageLeft = index % 2 === 0;

  const imageSlide = imageLeft
    ? anim.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
    : anim.isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12";

  const textSlide = imageLeft
    ? anim.isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
    : anim.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12";

  const imageBlock = (
    <div className={`flex-1 transition-all duration-700 ease-out ${imageSlide}`}>
      <ImagePlaceholder label={`Pain Point ${index + 1}`} aspectRatio="4/3" />
    </div>
  );

  const textBlock = (
    <div className={`flex-1 flex flex-col justify-center transition-all duration-700 ease-out ${textSlide}`}>
      <h3 className="text-xl sm:text-2xl font-bold text-[#EAF2F7] mb-3">
        {point.title}
      </h3>
      <p className="text-sm sm:text-base leading-relaxed text-[#9FB3C8]">
        {point.desc}
      </p>
    </div>
  );

  return (
    <div
      ref={anim.ref}
      className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
    >
      {imageLeft ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </div>
  );
}

export default function PainPointsSection() {
  const { t } = useLang();
  const headlineAnim = useScrollAnimation();
  const ctaAnim = useScrollAnimation();

  return (
    <section className="relative py-20 px-4 bg-[#0B1620]">
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#1B3A4B] to-transparent" />

      {/* Headline */}
      <div
        ref={headlineAnim.ref}
        className={`transition-all duration-700 ease-out ${headlineAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2 className="max-w-4xl mx-auto text-center text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#EAF2F7]">
          {t.painPointsHeadline}
        </h2>
        <p className="max-w-2xl mx-auto mt-5 text-center text-base md:text-lg text-[#9FB3C8] leading-relaxed">
          {t.painPointsSubtitle}
        </p>
      </div>

      {/* Pain point rows */}
      <div className="max-w-5xl mx-auto mt-16 flex flex-col gap-16">
        {t.painPoints.map((point, i) => (
          <PainPointRow key={i} point={point} index={i} />
        ))}
      </div>

      {/* CTA */}
      <div
        ref={ctaAnim.ref}
        className={`mt-16 text-center transition-all duration-700 ease-out ${ctaAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <button className="px-10 py-4 text-base font-bold tracking-wider rounded-lg bg-[#00C2D1] text-[#0B1620] hover:bg-[#00A8B5] transition-colors cursor-pointer shadow-lg shadow-[#00C2D1]/20">
          {t.painPointsCta}
        </button>
      </div>
    </section>
  );
}
