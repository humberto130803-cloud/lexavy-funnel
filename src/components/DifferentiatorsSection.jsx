import { useLang } from "../LanguageContext";
import useScrollAnimation from "../hooks/useScrollAnimation";


// Shield + lock: Data Protection & Privacy
function ShieldLockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00C2D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <rect x="9" y="9" width="6" height="5" rx="1" />
      <path d="M10 9V7a2 2 0 1 1 4 0v2" />
    </svg>
  );
}

// Brain + circuit: AI Governance
function BrainCircuitIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00C2D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 0-4 4c0 1.1.4 2.1 1.1 2.9L12 12l2.9-3.1A4 4 0 0 0 12 2z" />
      <path d="M12 12v6" />
      <circle cx="12" cy="20" r="2" />
      <path d="M6 8H3" />
      <path d="M21 8h-3" />
      <circle cx="2" cy="8" r="1" />
      <circle cx="22" cy="8" r="1" />
      <path d="M7 14l-3 2" />
      <path d="M17 14l3 2" />
      <circle cx="3" cy="17" r="1" />
      <circle cx="21" cy="17" r="1" />
    </svg>
  );
}

// Shield + check: Cybersecurity & Tech Risk
function ShieldCheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00C2D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

const CARD_ICONS = [ShieldLockIcon, BrainCircuitIcon, ShieldCheckIcon];

export default function DifferentiatorsSection() {
  const { t } = useLang();
  const headlineAnim = useScrollAnimation();
  const gridAnim = useScrollAnimation();
  const mechAnim = useScrollAnimation();

  return (
    <section className="relative py-20 px-4 bg-[#102635] overflow-hidden">
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

      {/* 3 service area cards */}
      <div
        ref={gridAnim.ref}
        className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        {t.diffCards.map((card, i) => {
          const Icon = CARD_ICONS[i];
          return (
          <div
            key={i}
            className={`rounded-2xl bg-[#0B1620] border border-[#1B3A4B] p-7 hover:border-[#00C2D1]/30 transition-all duration-700 ease-out ${gridAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="mb-4 w-12 h-12 rounded-xl bg-[#00C2D1]/10 flex items-center justify-center">
              <Icon />
            </div>
            <h3 className="text-lg font-bold text-[#EAF2F7] mb-3">
              {card.title}
            </h3>
            <p className="text-sm leading-relaxed text-[#9FB3C8] mb-4">
              {card.desc}
            </p>
            {card.bullets && (
              <ul className="flex flex-col gap-2">
                {card.bullets.map((bullet, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-[#9FB3C8]">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00C2D1] shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </div>
          );
        })}
      </div>

      {/* How we work mechanism */}
      <div
        ref={mechAnim.ref}
        className={`max-w-3xl mx-auto mt-12 rounded-2xl border border-[#00C2D1]/20 bg-[#0B1620] p-8 text-center transition-all duration-700 ease-out ${mechAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h3 className="text-xl font-bold text-[#00C2D1] mb-3">
          {t.diffMechanism}
        </h3>
        <p className="text-sm leading-relaxed text-[#9FB3C8]">
          {t.diffMechanismDesc}
        </p>
      </div>
    </section>
  );
}
