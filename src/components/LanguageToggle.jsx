import { useLang } from "../LanguageContext";

export default function LanguageToggle() {
  const { lang, toggleLang } = useLang();

  return (
    <button
      onClick={toggleLang}
      className="fixed top-5 right-5 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#1B3A4B] bg-[#102635] text-sm font-medium text-[#9FB3C8] hover:border-[#00C2D1] hover:text-[#00C2D1] transition-colors cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      {lang === "es" ? "EN" : "ES"}
    </button>
  );
}
