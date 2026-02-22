import { useState } from "react";
import { useLang } from "../LanguageContext";
import useScrollAnimation from "../hooks/useScrollAnimation";
const inputClass =
  "w-full rounded-lg border border-[#1B3A4B] bg-[#0B1620] px-4 py-2.5 text-sm text-[#EAF2F7] placeholder-[#9FB3C8]/50 outline-none focus:border-[#00C2D1]/50 transition-colors";

export default function EbookSection() {
  const { t } = useLang();
  const anim = useScrollAnimation();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = true;
    if (!form.lastName.trim()) errs.lastName = true;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = true;
    if (!form.company.trim()) errs.company = true;
    if (!form.phone.trim()) errs.phone = true;
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
          name: form.firstName,
          email: form.email,
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
        className={`relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 transition-all duration-700 ease-out ${anim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        {/* Left: ebook image + description */}
        <div className="flex-1 flex flex-col items-center md:items-start gap-6">
          <div className="w-full max-w-xs">
            <img
              src="/images/ebook-cover.png"
              alt={t.ebookImageAlt}
              className="w-full rounded-xl shadow-2xl shadow-[#00C2D1]/10"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#9FB3C8] leading-relaxed max-w-sm text-center md:text-left">
            {t.ebookDesc}
          </p>
        </div>

        {/* Right: form */}
        <div className="flex-1 w-full max-w-md">
          <div className="rounded-2xl border border-[#1B3A4B] bg-[#102635] p-8">
            <h3 className="text-2xl font-bold text-[#EAF2F7] text-center mb-6 uppercase">
              {t.ebookHeadline}
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <input
                  type="text"
                  placeholder={t.ebookFirstName}
                  value={form.firstName}
                  onChange={update("firstName")}
                  className={`${inputClass} ${errors.firstName ? "border-red-400" : ""}`}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder={t.ebookLastName}
                  value={form.lastName}
                  onChange={update("lastName")}
                  className={`${inputClass} ${errors.lastName ? "border-red-400" : ""}`}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder={t.ebookEmail}
                  value={form.email}
                  onChange={update("email")}
                  className={`${inputClass} ${errors.email ? "border-red-400" : ""}`}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder={t.ebookCompany}
                  value={form.company}
                  onChange={update("company")}
                  className={`${inputClass} ${errors.company ? "border-red-400" : ""}`}
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder={t.ebookPhone}
                  value={form.phone}
                  onChange={update("phone")}
                  className={`${inputClass} ${errors.phone ? "border-red-400" : ""}`}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-lg bg-[#00C2D1] px-8 py-3.5 text-sm font-bold tracking-wider text-[#0B1620] hover:bg-[#00A8B5] transition-colors cursor-pointer shadow-lg shadow-[#00C2D1]/20 mt-2 disabled:opacity-60 disabled:cursor-wait"
              >
                {sending ? "..." : t.ebookSubmit}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
