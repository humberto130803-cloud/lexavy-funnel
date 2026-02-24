import useScrollAnimation from "../hooks/useScrollAnimation";

/*
  PCB-style circuit traces inspired by Lexavy.net.
  Features a vertical trunk line with many horizontal branches,
  square junction pads, secondary detail traces at lower opacity,
  and staggered node pulsing — no traveling dots.

  5 genuinely different variants, each with unique branch structure.
*/

function Variant1() {
  return (
    <>
      {/* Primary traces — main trunk + branches */}
      <g fill="none" stroke="#00C2D1" strokeWidth="1.2" opacity="0.55">
        {/* Vertical trunk */}
        <path d="M40 0 V900" />
        {/* Major horizontal branches */}
        <path d="M40 60 H160 V140 H240" />
        <path d="M40 140 H110" />
        <path d="M40 220 H200 V310 H280" />
        <path d="M40 340 H130 V420" />
        <path d="M130 420 H220 V500 H300" />
        <path d="M40 480 H90 V560 H180" />
        <path d="M40 600 H170 V680 H250" />
        <path d="M40 720 H120 V800 H200" />
        <path d="M40 830 H150" />
      </g>

      {/* Secondary detail traces — thinner, lower opacity */}
      <g fill="none" stroke="#00C2D1" strokeWidth="0.5" opacity="0.25">
        <path d="M160 140 V200 H100" />
        <path d="M200 310 V380 H140" />
        <path d="M90 560 V620" />
        <path d="M170 680 V740 H110" />
        <path d="M120 800 V860" />
        <path d="M240 60 V110" />
        <path d="M220 500 V540" />
        <path d="M250 680 V730" />
      </g>

      {/* Square junction pads — filled at low opacity */}
      <g fill="#00C2D1" opacity="0.35">
        <rect x="37" y="57" width="6" height="6" />
        <rect x="157" y="57" width="6" height="6" />
        <rect x="157" y="137" width="6" height="6" />
        <rect x="237" y="137" width="6" height="6" />
        <rect x="37" y="137" width="6" height="6" />
        <rect x="107" y="137" width="6" height="6" />
        <rect x="37" y="217" width="6" height="6" />
        <rect x="197" y="217" width="6" height="6" />
        <rect x="197" y="307" width="6" height="6" />
        <rect x="277" y="307" width="6" height="6" />
        <rect x="37" y="337" width="6" height="6" />
        <rect x="127" y="337" width="6" height="6" />
        <rect x="127" y="417" width="6" height="6" />
        <rect x="217" y="417" width="6" height="6" />
        <rect x="297" y="497" width="6" height="6" />
        <rect x="37" y="477" width="6" height="6" />
        <rect x="87" y="477" width="6" height="6" />
        <rect x="177" y="557" width="6" height="6" />
        <rect x="37" y="597" width="6" height="6" />
        <rect x="167" y="597" width="6" height="6" />
        <rect x="247" y="677" width="6" height="6" />
        <rect x="37" y="717" width="6" height="6" />
        <rect x="197" y="797" width="6" height="6" />
        <rect x="37" y="827" width="6" height="6" />
        <rect x="147" y="827" width="6" height="6" />
      </g>

      {/* Pulsing glow nodes — staggered timing */}
      <g>
        <circle cx="160" cy="60" r="2.5" fill="#00C2D1" opacity="0.8">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3s" repeatCount="indefinite" />
          <animate attributeName="r" values="2.5;3.5;2.5" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="280" cy="310" r="2.5" fill="#00C2D1" opacity="0.8">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3.8s" begin="0.5s" repeatCount="indefinite" />
          <animate attributeName="r" values="2.5;3.5;2.5" dur="3.8s" begin="0.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="300" cy="500" r="2.5" fill="#00C2D1" opacity="0.8">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="4.2s" begin="1.2s" repeatCount="indefinite" />
          <animate attributeName="r" values="2.5;3.5;2.5" dur="4.2s" begin="1.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="250" cy="680" r="2.5" fill="#00C2D1" opacity="0.8">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3.4s" begin="1.8s" repeatCount="indefinite" />
          <animate attributeName="r" values="2.5;3.5;2.5" dur="3.4s" begin="1.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="200" cy="800" r="2.5" fill="#00C2D1" opacity="0.8">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3.6s" begin="2.5s" repeatCount="indefinite" />
          <animate attributeName="r" values="2.5;3.5;2.5" dur="3.6s" begin="2.5s" repeatCount="indefinite" />
        </circle>
      </g>
    </>
  );
}

function Variant2() {
  return (
    <>
      <g fill="none" stroke="#00C2D1" strokeWidth="1.2" opacity="0.55">
        <path d="M50 0 V900" />
        <path d="M50 40 H190 V120" />
        <path d="M50 120 H130 V230 H260" />
        <path d="M50 260 H80 V350 H210 V430" />
        <path d="M50 390 H170" />
        <path d="M50 500 H230 V580 H310" />
        <path d="M50 620 H140 V710 H240" />
        <path d="M50 750 H100 V850 H190" />
        <path d="M50 870 H160" />
      </g>

      <g fill="none" stroke="#00C2D1" strokeWidth="0.5" opacity="0.25">
        <path d="M190 120 H250" />
        <path d="M130 230 V290" />
        <path d="M210 430 H270 V480" />
        <path d="M170 390 V450 H120" />
        <path d="M230 580 V640" />
        <path d="M140 710 V770" />
        <path d="M100 850 V900" />
      </g>

      <g fill="#00C2D1" opacity="0.35">
        <rect x="47" y="37" width="6" height="6" />
        <rect x="187" y="37" width="6" height="6" />
        <rect x="187" y="117" width="6" height="6" />
        <rect x="47" y="117" width="6" height="6" />
        <rect x="127" y="117" width="6" height="6" />
        <rect x="257" y="227" width="6" height="6" />
        <rect x="47" y="257" width="6" height="6" />
        <rect x="77" y="257" width="6" height="6" />
        <rect x="207" y="347" width="6" height="6" />
        <rect x="207" y="427" width="6" height="6" />
        <rect x="47" y="387" width="6" height="6" />
        <rect x="167" y="387" width="6" height="6" />
        <rect x="47" y="497" width="6" height="6" />
        <rect x="227" y="497" width="6" height="6" />
        <rect x="307" y="577" width="6" height="6" />
        <rect x="47" y="617" width="6" height="6" />
        <rect x="237" y="707" width="6" height="6" />
        <rect x="47" y="747" width="6" height="6" />
        <rect x="187" y="847" width="6" height="6" />
        <rect x="47" y="867" width="6" height="6" />
        <rect x="157" y="867" width="6" height="6" />
      </g>

      <g>
        <circle cx="190" cy="40" r="2.5" fill="#00C2D1">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3.2s" repeatCount="indefinite" />
          <animate attributeName="r" values="2.5;3.5;2.5" dur="3.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="260" cy="230" r="2.5" fill="#00C2D1">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="4s" begin="0.7s" repeatCount="indefinite" />
          <animate attributeName="r" values="2.5;3.5;2.5" dur="4s" begin="0.7s" repeatCount="indefinite" />
        </circle>
        <circle cx="310" cy="580" r="2.5" fill="#00C2D1">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3.5s" begin="1.4s" repeatCount="indefinite" />
          <animate attributeName="r" values="2.5;3.5;2.5" dur="3.5s" begin="1.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="240" cy="710" r="2.5" fill="#00C2D1">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3.8s" begin="2s" repeatCount="indefinite" />
          <animate attributeName="r" values="2.5;3.5;2.5" dur="3.8s" begin="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="190" cy="850" r="2.5" fill="#00C2D1">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="4.5s" begin="2.8s" repeatCount="indefinite" />
          <animate attributeName="r" values="2.5;3.5;2.5" dur="4.5s" begin="2.8s" repeatCount="indefinite" />
        </circle>
      </g>
    </>
  );
}

function Variant3() {
  return (
    <>
      <g fill="none" stroke="#00C2D1" strokeWidth="1.2" opacity="0.55">
        <path d="M35 0 V900" />
        <path d="M35 80 H220" />
        <path d="M35 160 H140 V270 H270 V350" />
        <path d="M35 310 H100 V400 H200" />
        <path d="M35 440 H180 V530" />
        <path d="M180 530 H280" />
        <path d="M35 570 H120 V660 H230" />
        <path d="M35 700 H90 V790" />
        <path d="M90 790 H210 V870" />
        <path d="M35 860 H70" />
      </g>

      <g fill="none" stroke="#00C2D1" strokeWidth="0.5" opacity="0.25">
        <path d="M220 80 V140 H160" />
        <path d="M270 350 H310" />
        <path d="M200 400 V460 H150" />
        <path d="M120 660 V720" />
        <path d="M280 530 V590" />
        <path d="M210 870 H260" />
        <path d="M100 400 V440" />
      </g>

      <g fill="#00C2D1" opacity="0.35">
        <rect x="32" y="77" width="6" height="6" />
        <rect x="217" y="77" width="6" height="6" />
        <rect x="32" y="157" width="6" height="6" />
        <rect x="137" y="157" width="6" height="6" />
        <rect x="267" y="267" width="6" height="6" />
        <rect x="267" y="347" width="6" height="6" />
        <rect x="32" y="307" width="6" height="6" />
        <rect x="97" y="307" width="6" height="6" />
        <rect x="197" y="397" width="6" height="6" />
        <rect x="32" y="437" width="6" height="6" />
        <rect x="177" y="437" width="6" height="6" />
        <rect x="177" y="527" width="6" height="6" />
        <rect x="277" y="527" width="6" height="6" />
        <rect x="32" y="567" width="6" height="6" />
        <rect x="117" y="567" width="6" height="6" />
        <rect x="227" y="657" width="6" height="6" />
        <rect x="32" y="697" width="6" height="6" />
        <rect x="87" y="697" width="6" height="6" />
        <rect x="87" y="787" width="6" height="6" />
        <rect x="207" y="787" width="6" height="6" />
        <rect x="207" y="867" width="6" height="6" />
        <rect x="32" y="857" width="6" height="6" />
      </g>

      <g>
        <circle cx="220" cy="80" r="2.5" fill="#00C2D1">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3.6s" repeatCount="indefinite" />
          <animate attributeName="r" values="2.5;3.5;2.5" dur="3.6s" repeatCount="indefinite" />
        </circle>
        <circle cx="270" cy="350" r="2.5" fill="#00C2D1">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="4.2s" begin="0.9s" repeatCount="indefinite" />
          <animate attributeName="r" values="2.5;3.5;2.5" dur="4.2s" begin="0.9s" repeatCount="indefinite" />
        </circle>
        <circle cx="280" cy="530" r="2.5" fill="#00C2D1">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3.3s" begin="1.5s" repeatCount="indefinite" />
          <animate attributeName="r" values="2.5;3.5;2.5" dur="3.3s" begin="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="230" cy="660" r="2.5" fill="#00C2D1">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3.9s" begin="2.2s" repeatCount="indefinite" />
          <animate attributeName="r" values="2.5;3.5;2.5" dur="3.9s" begin="2.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="210" cy="870" r="2.5" fill="#00C2D1">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="4.4s" begin="3s" repeatCount="indefinite" />
          <animate attributeName="r" values="2.5;3.5;2.5" dur="4.4s" begin="3s" repeatCount="indefinite" />
        </circle>
      </g>
    </>
  );
}

function Variant4() {
  return (
    <>
      <g fill="none" stroke="#00C2D1" strokeWidth="1.2" opacity="0.55">
        <path d="M45 0 V900" />
        <path d="M45 50 H250" />
        <path d="M45 130 H170 V210" />
        <path d="M170 210 H290" />
        <path d="M45 280 H110 V370 H220" />
        <path d="M45 420 H80 V510 H200 V590" />
        <path d="M45 550 H150" />
        <path d="M45 650 H190 V740" />
        <path d="M190 740 H270" />
        <path d="M45 780 H130 V870 H230" />
      </g>

      <g fill="none" stroke="#00C2D1" strokeWidth="0.5" opacity="0.25">
        <path d="M250 50 V100" />
        <path d="M290 210 V270 H240" />
        <path d="M220 370 V430 H160" />
        <path d="M200 590 H260" />
        <path d="M150 550 V610" />
        <path d="M270 740 V800" />
        <path d="M130 870 V900" />
        <path d="M110 370 V410" />
      </g>

      <g fill="#00C2D1" opacity="0.35">
        <rect x="42" y="47" width="6" height="6" />
        <rect x="247" y="47" width="6" height="6" />
        <rect x="42" y="127" width="6" height="6" />
        <rect x="167" y="127" width="6" height="6" />
        <rect x="167" y="207" width="6" height="6" />
        <rect x="287" y="207" width="6" height="6" />
        <rect x="42" y="277" width="6" height="6" />
        <rect x="107" y="277" width="6" height="6" />
        <rect x="217" y="367" width="6" height="6" />
        <rect x="42" y="417" width="6" height="6" />
        <rect x="77" y="417" width="6" height="6" />
        <rect x="197" y="507" width="6" height="6" />
        <rect x="197" y="587" width="6" height="6" />
        <rect x="42" y="547" width="6" height="6" />
        <rect x="147" y="547" width="6" height="6" />
        <rect x="42" y="647" width="6" height="6" />
        <rect x="187" y="647" width="6" height="6" />
        <rect x="187" y="737" width="6" height="6" />
        <rect x="267" y="737" width="6" height="6" />
        <rect x="42" y="777" width="6" height="6" />
        <rect x="127" y="777" width="6" height="6" />
        <rect x="227" y="867" width="6" height="6" />
      </g>

      <g>
        <circle cx="250" cy="50" r="2.5" fill="#00C2D1">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3.4s" repeatCount="indefinite" />
          <animate attributeName="r" values="2.5;3.5;2.5" dur="3.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="290" cy="210" r="2.5" fill="#00C2D1">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="4.1s" begin="0.6s" repeatCount="indefinite" />
          <animate attributeName="r" values="2.5;3.5;2.5" dur="4.1s" begin="0.6s" repeatCount="indefinite" />
        </circle>
        <circle cx="220" cy="370" r="2.5" fill="#00C2D1">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3.7s" begin="1.3s" repeatCount="indefinite" />
          <animate attributeName="r" values="2.5;3.5;2.5" dur="3.7s" begin="1.3s" repeatCount="indefinite" />
        </circle>
        <circle cx="270" cy="740" r="2.5" fill="#00C2D1">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="4.3s" begin="2s" repeatCount="indefinite" />
          <animate attributeName="r" values="2.5;3.5;2.5" dur="4.3s" begin="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="230" cy="870" r="2.5" fill="#00C2D1">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3.5s" begin="2.7s" repeatCount="indefinite" />
          <animate attributeName="r" values="2.5;3.5;2.5" dur="3.5s" begin="2.7s" repeatCount="indefinite" />
        </circle>
      </g>
    </>
  );
}

function Variant5() {
  return (
    <>
      <g fill="none" stroke="#00C2D1" strokeWidth="1.2" opacity="0.55">
        <path d="M55 0 V900" />
        <path d="M55 70 H180 V150 H260" />
        <path d="M55 190 H120" />
        <path d="M55 270 H210 V360" />
        <path d="M210 360 H300" />
        <path d="M55 400 H140 V490 H250" />
        <path d="M55 530 H100 V620 H190 V700" />
        <path d="M55 670 H80" />
        <path d="M55 760 H230" />
        <path d="M55 840 H160 V900" />
      </g>

      <g fill="none" stroke="#00C2D1" strokeWidth="0.5" opacity="0.25">
        <path d="M260 150 V210" />
        <path d="M120 190 V250 H80" />
        <path d="M300 360 V420" />
        <path d="M140 490 V540" />
        <path d="M250 490 V550 H200" />
        <path d="M190 700 H240" />
        <path d="M230 760 V820 H180" />
      </g>

      <g fill="#00C2D1" opacity="0.35">
        <rect x="52" y="67" width="6" height="6" />
        <rect x="177" y="67" width="6" height="6" />
        <rect x="177" y="147" width="6" height="6" />
        <rect x="257" y="147" width="6" height="6" />
        <rect x="52" y="187" width="6" height="6" />
        <rect x="117" y="187" width="6" height="6" />
        <rect x="52" y="267" width="6" height="6" />
        <rect x="207" y="267" width="6" height="6" />
        <rect x="207" y="357" width="6" height="6" />
        <rect x="297" y="357" width="6" height="6" />
        <rect x="52" y="397" width="6" height="6" />
        <rect x="137" y="397" width="6" height="6" />
        <rect x="247" y="487" width="6" height="6" />
        <rect x="52" y="527" width="6" height="6" />
        <rect x="97" y="527" width="6" height="6" />
        <rect x="187" y="617" width="6" height="6" />
        <rect x="187" y="697" width="6" height="6" />
        <rect x="52" y="667" width="6" height="6" />
        <rect x="77" y="667" width="6" height="6" />
        <rect x="52" y="757" width="6" height="6" />
        <rect x="227" y="757" width="6" height="6" />
        <rect x="52" y="837" width="6" height="6" />
        <rect x="157" y="837" width="6" height="6" />
      </g>

      <g>
        <circle cx="260" cy="150" r="2.5" fill="#00C2D1">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3.8s" repeatCount="indefinite" />
          <animate attributeName="r" values="2.5;3.5;2.5" dur="3.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="300" cy="360" r="2.5" fill="#00C2D1">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="4.4s" begin="0.8s" repeatCount="indefinite" />
          <animate attributeName="r" values="2.5;3.5;2.5" dur="4.4s" begin="0.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="250" cy="490" r="2.5" fill="#00C2D1">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3.2s" begin="1.6s" repeatCount="indefinite" />
          <animate attributeName="r" values="2.5;3.5;2.5" dur="3.2s" begin="1.6s" repeatCount="indefinite" />
        </circle>
        <circle cx="190" cy="700" r="2.5" fill="#00C2D1">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="4s" begin="2.3s" repeatCount="indefinite" />
          <animate attributeName="r" values="2.5;3.5;2.5" dur="4s" begin="2.3s" repeatCount="indefinite" />
        </circle>
        <circle cx="160" cy="840" r="2.5" fill="#00C2D1">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3.6s" begin="3.1s" repeatCount="indefinite" />
          <animate attributeName="r" values="2.5;3.5;2.5" dur="3.6s" begin="3.1s" repeatCount="indefinite" />
        </circle>
      </g>
    </>
  );
}

const VARIANTS = { 1: Variant1, 2: Variant2, 3: Variant3, 4: Variant4, 5: Variant5 };

export default function CircuitBoard({
  side = "left",
  variant = 1,
  className = "",
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.02 });
  const isLeft = side === "left";
  const V = VARIANTS[variant] || Variant1;

  return (
    <div
      ref={ref}
      className={`hidden md:block pointer-events-none absolute z-0 transition-all duration-[1400ms] ease-out ${
        isVisible
          ? "opacity-100 translate-x-0"
          : isLeft
            ? "opacity-0 -translate-x-[40px]"
            : "opacity-0 translate-x-[40px]"
      } ${className}`}
      aria-hidden="true"
      style={{
        [isLeft ? "left" : "right"]: 0,
        top: 0,
        bottom: 0,
        width: "320px",
      }}
    >
      <svg
        viewBox="0 0 320 900"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMinYMin slice"
        style={isLeft ? undefined : { transform: "scaleX(-1)" }}
      >
        <V />
      </svg>
    </div>
  );
}
