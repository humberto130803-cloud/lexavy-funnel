import { useLang } from "../LanguageContext";

function LexavyLogo() {
  return (
    <div className="flex flex-col items-center gap-1">
      {/* Owl icon */}
      <svg
        width="40"
        height="32"
        viewBox="0 0 40 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Owl face / shield shape */}
        <path
          d="M20 2L4 10V18C4 24.627 11.163 30 20 30C28.837 30 36 24.627 36 18V10L20 2Z"
          fill="#00C2D1"
          opacity="0.15"
        />
        {/* Left eye */}
        <ellipse cx="14" cy="16" rx="4" ry="4.5" fill="#00C2D1" opacity="0.3" />
        <ellipse cx="14" cy="16" rx="2" ry="2.5" fill="#00C2D1" />
        {/* Right eye */}
        <ellipse cx="26" cy="16" rx="4" ry="4.5" fill="#00C2D1" opacity="0.3" />
        <ellipse cx="26" cy="16" rx="2" ry="2.5" fill="#00C2D1" />
        {/* Beak / V */}
        <path
          d="M17 22L20 26L23 22"
          stroke="#00C2D1"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Ear tufts */}
        <path
          d="M8 8L4 2"
          stroke="#00C2D1"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M32 8L36 2"
          stroke="#00C2D1"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Text */}
      <span className="text-xl font-extrabold tracking-[0.15em] text-[#EAF2F7]">
        LEXAVY
      </span>
    </div>
  );
}

function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function WebIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
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
  );
}

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="relative py-12 px-4 bg-[#0B1620]">
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#1B3A4B] to-transparent" />

      <div className="max-w-md mx-auto flex flex-col items-center gap-6">
        {/* Logo */}
        <LexavyLogo />

        {/* Tagline */}
        <p className="text-xs tracking-[0.2em] text-[#9FB3C8]/50 font-medium">
          {t.footerTagline}
        </p>

        {/* Social icons */}
        <div className="flex items-center gap-5">
          <a
            href="https://www.linkedin.com/company/lexavy-ltd/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9FB3C8]/50 hover:text-[#00C2D1] transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://lexavy.net"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9FB3C8]/50 hover:text-[#00C2D1] transition-colors"
            aria-label="Website"
          >
            <WebIcon />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-[#9FB3C8]/30">
          &copy; {new Date().getFullYear()} Lexavy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
