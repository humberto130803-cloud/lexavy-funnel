import { useState } from "react";
import { useLang } from "../LanguageContext";
import useScrollAnimation from "../hooks/useScrollAnimation";

const inputClass =
  "w-full rounded-lg border border-[#1B3A4B] bg-[#0B1620] px-4 py-2.5 text-sm text-[#EAF2F7] placeholder-[#9FB3C8]/50 outline-none focus:border-[#00C2D1]/50 transition-colors";

const selectClass =
  "w-full rounded-lg border border-[#1B3A4B] bg-[#0B1620] px-4 py-2.5 text-sm text-[#9FB3C8]/50 outline-none focus:border-[#00C2D1]/50 transition-colors appearance-none cursor-pointer";

export default function EbookSection() {
  const { t } = useLang();
  const anim = useScrollAnimation();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    contactName: "",
    corpEmail: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!form.contactName.trim()) errs.contactName = true;
    if (!form.corpEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.corpEmail)) errs.corpEmail = true;
    if (!form.role) errs.role = true;
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSending(true);
    try {
      await fetch("/api/send-ebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.contactName,
          email: form.corpEmail,
          role: form.role,
          lang: t.lang === "ES" ? "es" : "en",
        }),
      });
    } catch {
      // Still show success — the user can download from the thank-you page
    }
    setSending(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="relative py-20 px-4 bg-[#0B1620]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#1B3A4B] to-transparent" />
        <div className="max-w-lg mx-auto text-center rounded-2xl border border-[#1B3A4B] bg-[#102635] p-10">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00C2D1]/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00C2D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="text-lg font-bold text-[#EAF2F7] mb-2">{t.ebookThankYou}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 px-4 bg-[#0B1620] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#1B3A4B] to-transparent" />

      <div
        ref={anim.ref}
        className={`relative z-10 max-w-6xl mx-auto transition-all duration-700 ease-out ${anim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        {/* Two-column: ebook image left, title + form right */}
        <div className="flex flex-col md:flex-row items-start gap-10">
          {/* Left: large ebook image + description */}
          <div className="md:w-[38%] shrink-0 flex flex-col items-center md:items-start gap-6">
            <img
              src="/images/ebook-cover.png"
              alt={t.ebookImageAlt}
              className="w-full rounded-xl shadow-2xl shadow-[#00C2D1]/10"
              loading="lazy"
            />
            <p className="text-sm text-[#9FB3C8] leading-relaxed text-center md:text-left">
              {t.ebookDesc}
            </p>
          </div>

          {/* Right: headline + subtitle + form card */}
          <div className="flex-1 w-full">
            <h3 className="text-3xl md:text-4xl font-bold text-[#EAF2F7] text-center">
              {t.ebookHeadline}
            </h3>
            <p className="mt-4 mb-8 text-base text-[#9FB3C8] text-center">
              {t.ebookSubtitle}
            </p>
            <div className="rounded-2xl border border-[#1B3A4B] bg-[#102635] p-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Name + Email side by side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#9FB3C8] mb-1.5">{t.ebookContactName}</label>
                    <input
                      type="text"
                      value={form.contactName}
                      onChange={update("contactName")}
                      className={`${inputClass} ${errors.contactName ? "border-red-400" : ""}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#9FB3C8] mb-1.5">{t.ebookCorpEmail}</label>
                    <input
                      type="email"
                      value={form.corpEmail}
                      onChange={update("corpEmail")}
                      className={`${inputClass} ${errors.corpEmail ? "border-red-400" : ""}`}
                    />
                  </div>
                </div>

                {/* Role dropdown */}
                <div>
                  <label className="block text-xs font-medium text-[#9FB3C8] mb-1.5">{t.ebookRole}</label>
                  <div className="relative">
                    <select
                      value={form.role}
                      onChange={update("role")}
                      className={`${selectClass} ${form.role ? "text-[#EAF2F7]" : ""} ${errors.role ? "border-red-400" : ""}`}
                    >
                      <option value="" disabled>{t.ebookRolePlaceholder}</option>
                      {t.ebookRoles.map((role, i) => (
                        <option key={i} value={role}>{role}</option>
                      ))}
                    </select>
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9FB3C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full rounded-lg bg-[#00C2D1] px-8 py-3.5 text-sm font-bold tracking-wider text-[#0B1620] hover:bg-[#00A8B5] transition-colors cursor-pointer shadow-lg shadow-[#00C2D1]/20 mt-2 disabled:opacity-60 disabled:cursor-wait uppercase"
                >
                  {sending ? "..." : t.ebookSubmit}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
