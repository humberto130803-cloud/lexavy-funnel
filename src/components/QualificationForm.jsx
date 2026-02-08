import { useState } from "react";
import { useLang } from "../LanguageContext";
import useScrollAnimation from "../hooks/useScrollAnimation";

const selectClass =
  "w-full rounded-lg border border-[#1B3A4B] bg-[#0B1620] px-4 py-2.5 text-sm text-[#EAF2F7] outline-none focus:border-[#00C2D1]/50 transition-colors appearance-none cursor-pointer";

const inputClass =
  "w-full rounded-lg border border-[#1B3A4B] bg-[#0B1620] px-4 py-2.5 text-sm text-[#EAF2F7] placeholder-[#9FB3C8]/50 outline-none focus:border-[#00C2D1]/50 transition-colors";

function scoreSubmission(form) {
  // Auto-disqualify: small company + low revenue
  if (form.companySize === "1-49" && (form.revenue === "less-5k" || form.revenue === "5k-10k")) {
    return 0;
  }

  let score = 0;

  // Company size scoring (0-3)
  const sizeScores = { "1-49": 0, "50-200": 1, "201-1000": 2, "1001-5000": 3, "5000+": 3 };
  score += sizeScores[form.companySize] || 0;

  // Compliance status scoring (0-4)
  const complianceScores = { none: 2, partial: 2, audit: 3, incident: 4 };
  score += complianceScores[form.compliance] || 0;

  // Region scoring (0-2)
  const regionScores = { us: 1, eu: 2, latam: 1, multi: 2 };
  score += regionScores[form.region] || 0;

  // Role scoring (0-2)
  const roleScores = { gc: 2, ciso: 2, cpo: 2, cro: 1, cto: 1, other: 0 };
  score += roleScores[form.role] || 0;

  // Revenue scoring (0-3)
  const revenueScores = { "less-5k": 0, "5k-10k": 0, "10k-50k": 1, "50k-100k": 2, "100k-250k": 3, "250k+": 3 };
  score += revenueScores[form.revenue] || 0;

  return score;
}

export default function QualificationForm() {
  const { t } = useLang();
  const headlineAnim = useScrollAnimation();
  const contentAnim = useScrollAnimation();

  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    email: "",
    role: "",
    companySize: "",
    region: "",
    industry: "",
    compliance: "",
    revenue: "",
  });
  const [errors, setErrors] = useState({});
  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!form.companyName.trim()) errs.companyName = t.qualErrorRequired;
    if (!form.contactName.trim()) errs.contactName = t.qualErrorRequired;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = t.qualErrorEmail;
    if (!form.role) errs.role = t.qualErrorRequired;
    if (!form.companySize) errs.companySize = t.qualErrorRequired;
    if (!form.region) errs.region = t.qualErrorRequired;
    if (!form.industry) errs.industry = t.qualErrorRequired;
    if (!form.compliance) errs.compliance = t.qualErrorRequired;
    if (!form.revenue) errs.revenue = t.qualErrorRequired;
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      const score = scoreSubmission(form);
      if (score >= 6) {
        window.location.hash = "#/qualified";
      } else {
        window.location.hash = "#/thank-you";
      }
    }
  };

  return (
    <section id="qualification-form" className="relative py-20 px-4 bg-[#0B1620]">
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
            src="/images/ebook-cover.jpg"
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
          className="flex-1 w-full rounded-2xl border border-[#1B3A4B] bg-[#102635] p-8"
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
            <div>
              <label className="block text-xs font-medium text-[#9FB3C8] mb-1.5">{t.qualEmail}</label>
              <input type="email" value={form.email} onChange={update("email")} className={inputClass} />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
            </div>

            {/* Role */}
            <div>
              <label className="block text-xs font-medium text-[#9FB3C8] mb-1.5">{t.qualRole}</label>
              <select value={form.role} onChange={update("role")} className={selectClass}>
                {t.qualRoleOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.role && <p className="mt-1 text-xs text-red-400">{errors.role}</p>}
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

            {/* Region */}
            <div>
              <label className="block text-xs font-medium text-[#9FB3C8] mb-1.5">{t.qualRegion}</label>
              <select value={form.region} onChange={update("region")} className={selectClass}>
                {t.qualRegionOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.region && <p className="mt-1 text-xs text-red-400">{errors.region}</p>}
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

            {/* Monthly Revenue */}
            <div>
              <label className="block text-xs font-medium text-[#9FB3C8] mb-1.5">{t.qualRevenue}</label>
              <select value={form.revenue} onChange={update("revenue")} className={selectClass}>
                {t.qualRevenueOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.revenue && <p className="mt-1 text-xs text-red-400">{errors.revenue}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-[#00C2D1] px-8 py-3.5 text-sm font-bold tracking-wider text-[#0B1620] hover:bg-[#00A8B5] transition-colors cursor-pointer shadow-lg shadow-[#00C2D1]/20"
          >
            {t.qualSubmit}
          </button>
        </form>
      </div>
    </section>
  );
}
