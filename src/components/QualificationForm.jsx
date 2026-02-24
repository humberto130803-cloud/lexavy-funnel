import { useState, useRef, useCallback } from "react";
import { useLang } from "../LanguageContext";
import useScrollAnimation from "../hooks/useScrollAnimation";
import useTrackVisibility from "../hooks/useTrackVisibility";
import { trackFormStart, trackFormError, trackFormSubmit } from "../utils/analytics";

const selectClass =
  "w-full rounded-lg border border-[#1B3A4B] bg-[#0B1620] px-4 py-2.5 text-sm text-[#EAF2F7] outline-none focus:border-[#00C2D1]/50 transition-colors appearance-none cursor-pointer";

const inputClass =
  "w-full rounded-lg border border-[#1B3A4B] bg-[#0B1620] px-4 py-2.5 text-sm text-[#EAF2F7] placeholder-[#9FB3C8]/50 outline-none focus:border-[#00C2D1]/50 transition-colors";

export default function QualificationForm() {
  const { t } = useLang();
  const headlineAnim = useScrollAnimation();
  const contentAnim = useScrollAnimation();
  const trackRef = useTrackVisibility("qualification_form");
  const formStarted = useRef(false);

  const handleFormFocus = useCallback(() => {
    if (!formStarted.current) {
      formStarted.current = true;
      trackFormStart();
    }
  }, []);

  const [form, setForm] = useState({
    contactName: "",
    email: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!form.contactName.trim()) errs.contactName = t.qualErrorRequired;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = t.qualErrorEmail;
    if (!form.role) errs.role = t.qualErrorRequired;
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      trackFormError(Object.keys(errs));
      return;
    }

    trackFormSubmit(form.role);
    setSending(true);
    try {
      await fetch("/api/send-ebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.contactName,
          email: form.email,
          lang: t.lang === "ES" ? "es" : "en",
        }),
      });
    } catch {
      // Still redirect — they can download from the qualified page
    }
    setSending(false);
    window.location.hash = "#/qualified";
  };

  return (
    <section id="qualification-form" ref={trackRef} className="relative py-20 px-4 bg-[#0B1620]">
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#1B3A4B] to-transparent" />

      {/* Headline */}
      <div
        ref={headlineAnim.ref}
        className={`transition-all duration-700 ease-out ${headlineAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2 className="max-w-3xl mx-auto text-center text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#EAF2F7]">
          {t.qualHeadline}
        </h2>
        <p className="max-w-2xl mx-auto mt-5 text-center text-base md:text-lg text-[#9FB3C8] leading-relaxed">
          {t.qualSubtitle}
        </p>
      </div>

      {/* Two-column: ebook left + form right */}
      <div
        ref={contentAnim.ref}
        className={`max-w-6xl mx-auto mt-12 flex flex-col lg:flex-row items-start gap-10 transition-all duration-700 ease-out ${contentAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        {/* Left: ebook image + description */}
        <div className="w-full lg:w-auto lg:max-w-sm shrink-0 flex flex-col items-center lg:items-start gap-6 lg:sticky lg:top-8">
          <img
            src="/images/ebook-cover.png"
            alt={t.ebookImageAlt}
            className="w-full max-w-xs rounded-xl shadow-2xl shadow-[#00C2D1]/10"
            loading="lazy"
          />
          <p className="text-sm text-[#9FB3C8] leading-relaxed text-center lg:text-left">
            {t.ebookDesc}
          </p>
        </div>

        {/* Right: form */}
        <form
          onSubmit={handleSubmit}
          onFocus={handleFormFocus}
          className="flex-1 w-full rounded-2xl border border-[#1B3A4B] bg-[#102635] p-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Contact name */}
            <div>
              <label className="block text-xs font-medium text-[#9FB3C8] mb-1.5">{t.qualContactName} <span className="text-[#00C2D1]">*</span></label>
              <input type="text" value={form.contactName} onChange={update("contactName")} className={inputClass} />
              {errors.contactName && <p className="mt-1 text-xs text-red-400">{errors.contactName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-[#9FB3C8] mb-1.5">{t.qualEmail} <span className="text-[#00C2D1]">*</span></label>
              <input type="email" value={form.email} onChange={update("email")} className={inputClass} />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
            </div>

            {/* Role */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[#9FB3C8] mb-1.5">{t.qualRole} <span className="text-[#00C2D1]">*</span></label>
              <select value={form.role} onChange={update("role")} className={selectClass}>
                {t.qualRoleOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.role && <p className="mt-1 text-xs text-red-400">{errors.role}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={sending}
            className="mt-6 w-full rounded-lg bg-[#00C2D1] px-8 py-3.5 text-sm font-bold tracking-wider text-[#0B1620] hover:bg-[#00A8B5] transition-colors cursor-pointer shadow-lg shadow-[#00C2D1]/20 disabled:opacity-60 disabled:cursor-wait"
          >
            {sending ? "..." : t.qualSubmit}
          </button>
        </form>
      </div>
    </section>
  );
}
