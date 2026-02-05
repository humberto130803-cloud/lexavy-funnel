import { useState } from "react";
import { useLang } from "../LanguageContext";

export default function LeadCaptureForm() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", company: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = t.leadFormErrorName;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = t.leadFormErrorEmail;
    if (!form.company.trim()) errs.company = t.leadFormErrorCompany;
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-[#00C2D1]/30 bg-[#102635] p-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#00C2D1]/10">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00C2D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h4 className="text-lg font-bold text-[#EAF2F7]">{t.leadFormSuccess}</h4>
        <p className="mt-2 text-sm text-[#9FB3C8]">{t.leadFormSuccessMsg}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-[#1B3A4B] bg-[#102635] p-6">
      <h4 className="text-base font-bold text-[#EAF2F7] mb-1">{t.leadFormTitle}</h4>
      <p className="text-xs text-[#9FB3C8] mb-4">{t.leadFormSubtitle}</p>

      <div className="flex flex-col gap-3">
        <div>
          <input
            type="text"
            placeholder={t.leadFormName}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-[#1B3A4B] bg-[#0B1620] px-4 py-2.5 text-sm text-[#EAF2F7] placeholder-[#9FB3C8]/50 outline-none focus:border-[#00C2D1]/50 transition-colors"
          />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
        </div>
        <div>
          <input
            type="email"
            placeholder={t.leadFormEmail}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border border-[#1B3A4B] bg-[#0B1620] px-4 py-2.5 text-sm text-[#EAF2F7] placeholder-[#9FB3C8]/50 outline-none focus:border-[#00C2D1]/50 transition-colors"
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder={t.leadFormCompany}
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="w-full rounded-lg border border-[#1B3A4B] bg-[#0B1620] px-4 py-2.5 text-sm text-[#EAF2F7] placeholder-[#9FB3C8]/50 outline-none focus:border-[#00C2D1]/50 transition-colors"
          />
          {errors.company && <p className="mt-1 text-xs text-red-400">{errors.company}</p>}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[#00C2D1] px-6 py-3 text-sm font-bold tracking-wider text-[#0B1620] hover:bg-[#00A8B5] transition-colors cursor-pointer shadow-lg shadow-[#00C2D1]/20"
        >
          {t.leadFormSubmit}
        </button>

        <p className="text-center text-xs text-[#9FB3C8]/50">{t.leadFormDisclaimer}</p>
      </div>
    </form>
  );
}
