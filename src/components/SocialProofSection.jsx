import { useState } from "react";
import { useLang } from "../LanguageContext";
import useScrollAnimation from "../hooks/useScrollAnimation";


const BRAND_LOGOS = [
  { name: "Asian Paints", src: "https://lexavy.net/wp-content/uploads/2025/06/asianpaints.svg" },
  { name: "Mahindra", src: "https://lexavy.net/wp-content/uploads/2025/06/mahindra.svg" },
  { name: "Flipkart", src: "https://lexavy.net/wp-content/uploads/2025/06/flipkart.svg" },
  { name: "Vivo", src: "https://lexavy.net/wp-content/uploads/2025/06/vivo.svg" },
  { name: "SKODA", src: "https://lexavy.net/wp-content/uploads/2025/06/SKODA.svg" },
  { name: "Nike", src: "https://lexavy.net/wp-content/uploads/2025/06/nike.svg" },
];

const TEAM_PHOTOS = [
  "https://lexavy.net/wp-content/uploads/2025/07/807bd856-d9a7-4291-b626-68837e33aa53-2.webp",
  "https://lexavy.net/wp-content/uploads/2025/07/Firefly-20250425111748-2.webp",
  "https://lexavy.net/wp-content/uploads/2025/09/Generated-Image-September-21-2025-7_14PM-1-e1760147961352.png",
];

const TEAM_BADGES = [
  // María Lobato
  [{ type: "dpo" }, { type: "ipstars" }],
  // Luis Navarrete
  [],
  // María Mc Reddie
  [{ type: "dpo" }, { type: "ipstars" }],
];

function ArrowButton({ direction, onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#0B1620]/80 border border-[#1B3A4B] flex items-center justify-center text-[#9FB3C8] hover:text-[#EAF2F7] hover:border-[#00C2D1]/40 transition-colors cursor-pointer"
      style={{ [direction === "left" ? "left" : "right"]: "-1.25rem" }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {direction === "left" ? (
          <polyline points="15 18 9 12 15 6" />
        ) : (
          <polyline points="9 6 15 12 9 18" />
        )}
      </svg>
    </button>
  );
}

export default function SocialProofSection() {
  const { t } = useLang();
  const [activeIndex, setActiveIndex] = useState(0);
  const titleAnim = useScrollAnimation();
  const logosAnim = useScrollAnimation();
  const teamAnim = useScrollAnimation();
  const statsAnim = useScrollAnimation();

  const team = t.socialProofTeam;
  const member = team[activeIndex];
  const photo = TEAM_PHOTOS[activeIndex];
  const badges = TEAM_BADGES[activeIndex];

  const prev = () => setActiveIndex((i) => (i === 0 ? team.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === team.length - 1 ? 0 : i + 1));

  return (
    <section className="relative py-16 px-4 bg-[#0B1620] overflow-hidden">
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#1B3A4B] to-transparent" />

      {/* Title */}
      <div
        ref={titleAnim.ref}
        className={`relative z-10 transition-all duration-700 ease-out ${titleAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-[#EAF2F7] mb-10">
          {t.socialProofLabel}
        </h2>
      </div>

      {/* Brand logos */}
      <div
        ref={logosAnim.ref}
        className={`relative z-10 max-w-4xl mx-auto grid grid-cols-3 sm:grid-cols-6 gap-6 items-center mb-14 transition-all duration-700 ease-out ${logosAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        {BRAND_LOGOS.map((logo, i) => (
          <div
            key={i}
            className={`flex items-center justify-center px-3 py-2 transition-all duration-700 ease-out ${logosAnim.isVisible ? "opacity-70 hover:opacity-100" : "opacity-0"}`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <img
              src={logo.src}
              alt={logo.name}
              className="h-8 sm:h-10 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Team carousel */}
      <div
        ref={teamAnim.ref}
        className={`relative z-10 max-w-5xl mx-auto transition-all duration-700 ease-out ${teamAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="relative">
          <ArrowButton direction="left" onClick={prev} />
          <ArrowButton direction="right" onClick={next} />

          <div className="rounded-2xl border border-[#1B3A4B] bg-[#102635] overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Photo */}
              <div className="md:w-80 shrink-0 relative">
                <img
                  key={activeIndex}
                  src={photo}
                  alt={member.name}
                  className="w-full h-72 md:h-full object-cover object-top"
                  loading="lazy"
                />
                {/* Badges overlay */}
                {badges.length > 0 && (
                  <div className="absolute bottom-4 left-4 flex flex-col gap-2">
                    {badges.map((badge, i) =>
                      badge.type === "dpo" ? (
                        <div key={i} className="flex items-center gap-0 rounded-full overflow-hidden shadow-lg">
                          <span className="bg-white text-[#0B1620] text-xs font-bold px-3 py-1.5">DPO</span>
                          <span className="bg-[#1B3A4B] text-[#EAF2F7] text-xs font-medium px-3 py-1.5">Europe</span>
                        </div>
                      ) : (
                        <div key={i} className="text-white text-sm font-bold tracking-wide">
                          <span className="opacity-80">IP</span> STARS
                          <span className="block text-[10px] font-normal opacity-60">from Managing IP</span>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold text-[#EAF2F7]">
                  {member.name}
                </h3>
                <p className="text-[#00C2D1] font-medium mt-1">
                  {member.role}
                </p>
                <p className="text-sm text-[#9FB3C8] leading-relaxed mt-4">
                  {member.bio}
                </p>
              </div>
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {team.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${i === activeIndex ? "bg-[#00C2D1]" : "bg-[#1B3A4B] hover:bg-[#9FB3C8]/40"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div
        ref={statsAnim.ref}
        className={`relative z-10 max-w-3xl mx-auto mt-10 grid grid-cols-3 gap-4 transition-all duration-700 ease-out ${statsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        {t.socialProofStats.map((stat, i) => (
          <div
            key={i}
            className="text-center py-4 transition-all duration-700 ease-out"
            style={{ transitionDelay: `${i * 150}ms` }}
          >
            <p className="text-4xl md:text-5xl font-bold text-[#00C2D1]">{stat.value}</p>
            <p className="mt-2 text-sm font-medium text-[#9FB3C8]">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
