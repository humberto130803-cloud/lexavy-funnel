import { useEffect, useRef } from "react";
import { useLang } from "../LanguageContext";

function renderBold(text) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="text-[#EAF2F7] font-semibold">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

export default function QualifiedPage() {
  const { t } = useLang();
  const calendlyRef = useRef(null);

  useEffect(() => {
    const initCalendly = () => {
      if (window.Calendly && calendlyRef.current) {
        window.Calendly.initInlineWidget({
          url: "https://calendly.com/andrerv1305/new-meeting?hide_gdpr_banner=1&background_color=102635&text_color=eaf2f7&primary_color=00c2d1",
          parentElement: calendlyRef.current,
        });
      }
    };

    if (window.Calendly) {
      initCalendly();
    } else {
      const check = setInterval(() => {
        if (window.Calendly) {
          clearInterval(check);
          initCalendly();
        }
      }, 200);
      return () => clearInterval(check);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1620] px-4 py-16">
      <div className="max-w-3xl mx-auto">
        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#EAF2F7] leading-tight text-center">
          {t.qualQualifiedTitle}
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base md:text-lg text-[#9FB3C8] leading-relaxed text-center max-w-2xl mx-auto">
          {renderBold(t.qualQualifiedSubtitle)}
        </p>

        {/* Select Your Time */}
        <h2 className="mt-12 text-2xl font-bold text-[#EAF2F7]">
          {t.qualQualifiedCalendlyTitle}
        </h2>

        {/* Calendly embed */}
        <div
          ref={calendlyRef}
          className="mt-4 rounded-xl overflow-hidden border border-[#1B3A4B]"
          style={{ minWidth: "320px", height: "700px" }}
        />

        {/* Why This Matters */}
        <h2 className="mt-14 text-2xl font-bold text-[#EAF2F7]">
          {t.qualQualifiedWhyTitle}
        </h2>
        <p className="mt-3 text-[#9FB3C8] leading-relaxed">
          {t.qualQualifiedWhyIntro}
        </p>

        <ul className="mt-4 space-y-3">
          {t.qualQualifiedWhyBullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-3 text-[#9FB3C8]">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00C2D1]" />
              <span>
                <strong className="text-[#EAF2F7] font-semibold">{bullet.bold}</strong>
                {bullet.rest}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-[#9FB3C8] leading-relaxed">
          {renderBold(t.qualQualifiedWhyOutro)}
        </p>
      </div>
    </div>
  );
}
