import { useLang } from "../LanguageContext";

function TimelineColumn({ title, items, badges, variant }) {
  const isOld = variant === "old";
  const titleBg = isOld ? "bg-red-500" : "bg-[#00C2D1]";
  const titleText = isOld ? "text-white" : "text-[#0B1620]";
  const lineColor = isOld ? "bg-red-500/20" : "bg-[#00C2D1]/20";
  const badgeBg = isOld
    ? "bg-red-500/10 text-red-400 border-red-500/20"
    : "bg-[#00C2D1]/10 text-[#00C2D1] border-[#00C2D1]/20";

  // Build a lookup for which items have a badge
  const badgeMap = {};
  badges.forEach((b) => {
    badgeMap[b.pos] = b.text;
  });

  return (
    <div className="flex-1 min-w-0">
      {/* Title bar */}
      <div className="flex justify-center mb-8">
        <span
          className={`inline-block px-6 py-2.5 rounded-lg font-bold text-sm tracking-widest ${titleBg} ${titleText}`}
        >
          {title}
        </span>
      </div>

      {/* Timeline */}
      <div className="relative pl-6">
        {/* Vertical line */}
        <div
          className={`absolute left-6 top-0 bottom-0 w-px ${lineColor}`}
        />

        <div className="flex flex-col gap-4">
          {items.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={i} className="relative">
                {/* Badge (if any) */}
                {badgeMap[i] !== undefined && (
                  <div
                    className={`mb-2 ml-6 inline-block px-3 py-1 rounded-full text-xs font-medium border ${badgeBg}`}
                  >
                    {badgeMap[i]}
                  </div>
                )}

                {/* Chat bubble */}
                <div
                  className={`relative flex items-start gap-3 ${
                    isLeft ? "ml-0" : "ml-8"
                  }`}
                >
                  {/* Dot on line */}
                  <div
                    className={`absolute left-6 top-3.5 w-2 h-2 rounded-full -translate-x-1/2 ${
                      isOld ? "bg-red-500/50" : "bg-[#00C2D1]/50"
                    }`}
                  />

                  {/* Bubble */}
                  <div className="ml-10 px-4 py-3 rounded-xl bg-[#102635] border border-[#1B3A4B] text-[#EAF2F7] text-sm font-medium shadow-lg shadow-black/10">
                    {item}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function ComparisonSection() {
  const { t } = useLang();

  return (
    <section className="relative py-20 px-4 bg-[#0B1620]">
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#1B3A4B] to-transparent" />

      {/* Headline */}
      <h2 className="max-w-4xl mx-auto text-center text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#EAF2F7]">
        {t.compHeadline}
      </h2>

      {/* Subtitle */}
      <p className="max-w-2xl mx-auto mt-5 text-center text-base md:text-lg text-[#9FB3C8] leading-relaxed">
        {t.compSubtitle}
      </p>

      {/* Comparison columns */}
      <div className="max-w-5xl mx-auto mt-16 flex flex-col md:flex-row gap-12 md:gap-8">
        <TimelineColumn
          title={t.oldWayTitle}
          items={t.oldWayItems}
          badges={t.oldBadges}
          variant="old"
        />

        {/* Center divider (desktop) */}
        <div className="hidden md:block w-px bg-[#1B3A4B] self-stretch" />

        {/* Mobile divider */}
        <div className="md:hidden h-px w-full bg-[#1B3A4B]" />

        <TimelineColumn
          title={t.newWayTitle}
          items={t.newWayItems}
          badges={t.newBadges}
          variant="new"
        />
      </div>
    </section>
  );
}
