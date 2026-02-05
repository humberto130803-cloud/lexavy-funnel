import { useState } from "react";
import { useLang } from "../LanguageContext";
import useScrollAnimation from "../hooks/useScrollAnimation";

const selectClass =
  "w-full rounded-lg border border-[#1B3A4B] bg-[#0B1620] px-4 py-2.5 text-sm text-[#EAF2F7] outline-none focus:border-[#00C2D1]/50 transition-colors appearance-none cursor-pointer";

const inputClass =
  "w-full rounded-lg border border-[#1B3A4B] bg-[#0B1620] px-4 py-2.5 text-sm text-[#EAF2F7] placeholder-[#9FB3C8]/50 outline-none focus:border-[#00C2D1]/50 transition-colors";

function scoreSubmission(form) {
  let score = 0;

  // Company size scoring (0-3)
  const sizeScores = { "1-10": 0, "11-50": 1, "51-200": 2, "201-500": 3, "500+": 3 };
  score += sizeScores[form.companySize] || 0;

  // Compliance status scoring (0-4)
  const complianceScores = { none: 3, partial: 2, audit: 4, breach: 4 };
  score += complianceScores[form.compliance] || 0;

  // Budget scoring (0-3)
  const budgetScores = { low: 0, mid: 1, high: 2, enterprise: 3 };
  score += budgetScores[form.budget] || 0;

  return score;
}

export default function QualificationForm() {
  const { t } = useLang();
  const headlineAnim = useScrollAnimation();
  const formAnim = useScrollAnimation();

  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    email: "",
    companySize: "",
    industry: "",
    compliance: "",
    budget: "",
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null); // "qualified" | "not-qualified"

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!form.companyName.trim()) errs.companyName = t.qualErrorRequired;
    if (!form.contactName.trim()) errs.contactName = t.qualErrorRequired;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = t.qualErrorEmail;
    if (!form.companySize) errs.companySize = t.qualErrorRequired;
    if (!form.industry) errs.industry = t.qualErrorRequired;
    if (!form.compliance) errs.compliance = t.qualErrorRequired;
    if (!form.budget) errs.budget = t.qualErrorRequired;
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      const score = scoreSubmission(form);
      setResult(score >= 7 ? "qualified" : "not-qualified");
    }
  };

  if (result) {
    const isQualified = result === "qualified";
    return (
      <section className="relative py-20 px-4 bg-[#0B1620]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#1B3A4B] to-transparent" />
        <div className="max-w-lg mx-auto text-center rounded-2xl border border-[#1B3A4B] bg-[#102635] p-10">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00C2D1]/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00C2D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isQualified ? (
                <polyline points="20 6 9 17 4 12" />
              ) : (
                <>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </>
              )}
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-[#EAF2F7] mb-3">
            {isQualified ? t.qualQualifiedTitle : t.qualNotQualifiedTitle}
          </h3>
          <p className="text-sm text-[#9FB3C8] leading-relaxed mb-6">
            {isQualified ? t.qualQualifiedMsg : t.qualNotQualifiedMsg}
          </p>
          {isQualified && (
            <button className="px-8 py-3.5 rounded-lg bg-[#00C2D1] text-[#0B1620] font-bold tracking-wider text-sm hover:bg-[#00A8B5] transition-colors cursor-pointer shadow-lg shadow-[#00C2D1]/20">
              {t.qualQualifiedCta}
            </button>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 px-4 bg-[#0B1620]">
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

      {/* Form */}
      <form
        ref={formAnim.ref}
        onSubmit={handleSubmit}
        className={`max-w-2xl mx-auto mt-12 rounded-2xl border border-[#1B3A4B] bg-[#102635] p-8 transition-all duration-700 ease-out ${formAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Company name */}
          <div>
            <label className="block text-xs font-medium text-[#9FB3C8] mb-1.5">{t.qualCompanyName}</label>
            <input type="text" value={form.companyName} onChange={update("companyName")} className={inputClass} />
            {errors.companyName && <p className="mt-1 text-xs text-red-400">{errors.companyName}</p>}
          </div>

          {/* Contact name */}
          <div>
            <label className="block text-xs font-medium text-[#9FB3C8] mb-1.5">{t.qualContactName}</label>
            <input type="text" value={form.contactName} onChange={update("contactName")} className={inputClass} />
            {errors.contactName && <p className="mt-1 text-xs text-red-400">{errors.contactName}</p>}
          </div>

          {/* Email */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-[#9FB3C8] mb-1.5">{t.qualEmail}</label>
            <input type="email" value={form.email} onChange={update("email")} className={inputClass} />
            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
          </div>

          {/* Company size */}
          <div>
            <label className="block text-xs font-medium text-[#9FB3C8] mb-1.5">{t.qualCompanySize}</label>
            <select value={form.companySize} onChange={update("companySize")} className={selectClass}>
              {t.qualCompanySizeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {errors.companySize && <p className="mt-1 text-xs text-red-400">{errors.companySize}</p>}
          </div>

          {/* Industry */}
          <div>
            <label className="block text-xs font-medium text-[#9FB3C8] mb-1.5">{t.qualIndustry}</label>
            <select value={form.industry} onChange={update("industry")} className={selectClass}>
              {t.qualIndustryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {errors.industry && <p className="mt-1 text-xs text-red-400">{errors.industry}</p>}
          </div>

          {/* Compliance status */}
          <div>
            <label className="block text-xs font-medium text-[#9FB3C8] mb-1.5">{t.qualCompliance}</label>
            <select value={form.compliance} onChange={update("compliance")} className={selectClass}>
              {t.qualComplianceOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {errors.compliance && <p className="mt-1 text-xs text-red-400">{errors.compliance}</p>}
          </div>

          {/* Budget */}
          <div>
            <label className="block text-xs font-medium text-[#9FB3C8] mb-1.5">{t.qualBudget}</label>
            <select value={form.budget} onChange={update("budget")} className={selectClass}>
              {t.qualBudgetOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {errors.budget && <p className="mt-1 text-xs text-red-400">{errors.budget}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-[#00C2D1] px-8 py-3.5 text-sm font-bold tracking-wider text-[#0B1620] hover:bg-[#00A8B5] transition-colors cursor-pointer shadow-lg shadow-[#00C2D1]/20"
        >
          {t.qualSubmit}
        </button>
      </form>
    </section>
  );
}
