import { useState } from "react";
import { useLang } from "../LanguageContext";
import useScrollAnimation from "../hooks/useScrollAnimation";
import useTrackVisibility from "../hooks/useTrackVisibility";
import { trackFaqOpen } from "../utils/analytics";


function FaqItem({ question, answer, index, onOpen }) {
  const [open, setOpen] = useState(false);
  const anim = useScrollAnimation();

  return (
    <div
      ref={anim.ref}
      className={`border border-[#1B3A4B] rounded-xl overflow-hidden transition-all duration-700 ease-out hover:border-[#1B3A4B]/80 ${anim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <button
        onClick={() => { if (!open) onOpen(index); setOpen(!open); }}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-[#102635] cursor-pointer group"
      >
        <span className="text-sm sm:text-base font-medium text-[#EAF2F7]">
          {question}
        </span>
        <span
          className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
            open
              ? "bg-[#00C2D1] border-[#00C2D1] rotate-45"
              : "bg-transparent border-[#1B3A4B] group-hover:border-[#00C2D1]/50"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={open ? "#0B1620" : "#9FB3C8"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-5 pt-0 text-sm leading-relaxed text-[#9FB3C8] bg-[#102635]">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const { t } = useLang();
  const titleAnim = useScrollAnimation();
  const trackRef = useTrackVisibility("faq");

  return (
    <section ref={trackRef} className="relative py-20 px-4 bg-[#102635] overflow-hidden">
      {/* Title */}
      <div
        ref={titleAnim.ref}
        className={`transition-all duration-700 ease-out ${titleAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2 className="text-center text-4xl sm:text-5xl font-bold text-[#EAF2F7] mb-12">
          {t.faqTitle}
        </h2>
      </div>

      {/* FAQ list */}
      <div className="max-w-3xl mx-auto flex flex-col gap-3">
        {t.faqs.map((faq, i) => (
          <FaqItem key={i} question={faq.q} answer={faq.a} index={i} onOpen={trackFaqOpen} />
        ))}
      </div>
    </section>
  );
}
