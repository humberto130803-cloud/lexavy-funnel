import { useLang } from "../LanguageContext";
import useScrollAnimation from "../hooks/useScrollAnimation";
import useTrackVisibility from "../hooks/useTrackVisibility";


const AVATAR_IMAGES = [
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
];

function TestimonialCard({ testimonial, index }) {
  return (
    <div className="rounded-xl bg-[#0d1f2d] border border-[#1B3A4B]/60 p-5 flex flex-col gap-3 hover:border-[#1B3A4B] transition-colors">
      {/* Header: avatar + name + company */}
      <div className="flex items-center gap-3">
        <img
          src={AVATAR_IMAGES[index % AVATAR_IMAGES.length]}
          alt={testimonial.name}
          className="w-10 h-10 rounded-full object-cover shrink-0"
          loading="lazy"
        />
        <div className="min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-semibold text-[#EAF2F7] text-sm">
              {testimonial.name}
            </span>
            <span className="text-[#00C2D1] text-xs font-medium">
              {testimonial.company}
            </span>
          </div>
        </div>
      </div>

      {/* Text content */}
      <div className="text-sm text-[#9FB3C8] leading-relaxed whitespace-pre-line">
        {testimonial.text}
      </div>

      {/* Reactions */}
      <div className="flex items-center gap-3 mt-auto pt-1">
        {testimonial.reactions.map((r, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#102635] text-xs"
          >
            <span>{r.emoji}</span>
            <span className="text-[#9FB3C8]/70">{r.count}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const { t } = useLang();
  const headlineAnim = useScrollAnimation();
  const gridAnim = useScrollAnimation();
  const trackRef = useTrackVisibility("testimonials");

  return (
    <section ref={trackRef} className="relative py-20 px-4 bg-[#0B1620] overflow-hidden">
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#1B3A4B] to-transparent" />

      {/* Label + Headline */}
      <div
        ref={headlineAnim.ref}
        className={`relative z-10 transition-all duration-700 ease-out ${headlineAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <p className="text-center text-xs font-semibold tracking-[0.2em] text-[#9FB3C8]/60 uppercase mb-4">
          {t.testimonialsLabel}
        </p>

        <h2 className="max-w-3xl mx-auto text-center text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#EAF2F7]">
          {t.testimonialsHeadline}
        </h2>
      </div>

      {/* Testimonial grid */}
      <div
        ref={gridAnim.ref}
        className="relative z-10 max-w-5xl mx-auto mt-14 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {t.testimonials.map((testimonial, i) => (
          <div
            key={i}
            className={`transition-all duration-700 ease-out ${gridAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <TestimonialCard testimonial={testimonial} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
