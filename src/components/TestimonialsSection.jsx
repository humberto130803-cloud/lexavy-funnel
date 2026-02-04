import { useLang } from "../LanguageContext";

const INITIALS_COLORS = [
  "bg-[#00C2D1]",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-sky-500",
];

function Avatar({ name, index }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-[#0B1620] shrink-0 ${INITIALS_COLORS[index % INITIALS_COLORS.length]}`}
    >
      {initials}
    </div>
  );
}

function TestimonialCard({ testimonial, index }) {
  return (
    <div className="rounded-xl bg-[#0d1f2d] border border-[#1B3A4B]/60 p-5 flex flex-col gap-3 hover:border-[#1B3A4B] transition-colors">
      {/* Header: avatar + name + company + date */}
      <div className="flex items-center gap-3">
        <Avatar name={testimonial.name} index={index} />
        <div className="min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-semibold text-[#EAF2F7] text-sm">
              {testimonial.name}
            </span>
            <span className="text-[#00C2D1] text-xs font-medium">
              {testimonial.company}
            </span>
            <span className="text-[#9FB3C8]/50 text-xs">
              {testimonial.date}
            </span>
          </div>
        </div>
      </div>

      {/* Text content */}
      <div className="text-sm text-[#9FB3C8] leading-relaxed whitespace-pre-line">
        {testimonial.text.split("@Lexavy").map((part, i, arr) =>
          i < arr.length - 1 ? (
            <span key={i}>
              {part}
              <span className="text-[#00C2D1] font-semibold">@Lexavy</span>
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </div>

      {/* Highlight badge (if exists) */}
      {testimonial.highlight && (
        <div className="inline-flex self-start items-center gap-2 px-4 py-2.5 rounded-lg bg-[#102635] border border-[#1B3A4B]">
          <div className="w-8 h-8 rounded-full bg-[#00C2D1]/10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00C2D1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-[#9FB3C8]/60 font-medium">Resultado</p>
            <p className="text-sm font-bold text-[#00C2D1]">
              {testimonial.highlight}
            </p>
          </div>
        </div>
      )}

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

  return (
    <section className="relative py-20 px-4 bg-[#0B1620]">
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#1B3A4B] to-transparent" />

      {/* Label */}
      <p className="text-center text-xs font-semibold tracking-[0.2em] text-[#9FB3C8]/60 uppercase mb-4">
        {t.testimonialsLabel}
      </p>

      {/* Headline */}
      <h2 className="max-w-3xl mx-auto text-center text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#EAF2F7]">
        {t.testimonialsHeadline}
      </h2>

      {/* Testimonial grid */}
      <div className="max-w-6xl mx-auto mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {t.testimonials.map((testimonial, i) => (
          <TestimonialCard key={i} testimonial={testimonial} index={i} />
        ))}
      </div>
    </section>
  );
}
