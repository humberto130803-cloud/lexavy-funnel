export default function ImagePlaceholder({ className = "", label = "Image", aspectRatio = "16/9" }) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#1B3A4B] bg-[#102635]/50 ${className}`}
      style={{ aspectRatio }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1B3A4B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
      <span className="mt-2 text-xs text-[#1B3A4B] font-medium tracking-wide">
        {label}
      </span>
    </div>
  );
}
