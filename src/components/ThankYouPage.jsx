import { useLang } from "../LanguageContext";

export default function ThankYouPage() {
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-[#0B1620] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center rounded-2xl border border-[#1B3A4B] bg-[#102635] p-10">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00C2D1]/10">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00C2D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-[#EAF2F7] mb-3">
          {t.qualNotQualifiedTitle}
        </h3>
        <p className="text-sm text-[#9FB3C8] leading-relaxed">
          {t.qualNotQualifiedMsg}
        </p>
      </div>
    </div>
  );
}
