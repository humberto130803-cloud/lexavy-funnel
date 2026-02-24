import { useEffect, useRef } from "react";
import { useLang } from "../LanguageContext";
import { trackEbookDownload, trackCalendlyInteraction } from "../utils/analytics";

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
    const el = calendlyRef.current;

    const initCalendly = () => {
      if (window.Calendly && el) {
        el.innerHTML = "";
        window.Calendly.initInlineWidget({
          url: "https://calendly.com/andrerv1305/new-meeting?hide_gdpr_banner=1&background_color=102635&text_color=eaf2f7&primary_color=00c2d1",
          parentElement: el,
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

    // Calendly fires postMessage events for interactions
    const onCalendlyMessage = (e) => {
      if (e.data?.event === "calendly.event_type_viewed") trackCalendlyInteraction("viewed");
      if (e.data?.event === "calendly.date_and_time_selected") trackCalendlyInteraction("date_selected");
      if (e.data?.event === "calendly.event_scheduled") trackCalendlyInteraction("scheduled");
    };
    window.addEventListener("message", onCalendlyMessage);

    return () => {
      window.removeEventListener("message", onCalendlyMessage);
      if (el) el.innerHTML = "";
    };
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

        {/* Ebook download */}
        <div className="mt-8 flex justify-center">
          <a
            href="/Lexavy%207%20Signals%20E-book.pdf"
            download
            onClick={trackEbookDownload}
            className="inline-flex items-center gap-2 rounded-lg bg-[#00C2D1] px-8 py-3.5 text-sm font-bold tracking-wider text-[#0B1620] hover:bg-[#00A8B5] transition-colors shadow-lg shadow-[#00C2D1]/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {t.qualQualifiedDownload}
          </a>
        </div>

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
