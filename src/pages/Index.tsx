import { useState, useEffect, useRef } from "react";

const BANNERS = [
  {
    id: 1,
    title: "КОМПЛЕКТ",
    subtitle: "Блок + кабель Type-C + Type-C",
    power: 25,
    time: 45,
    showCharger: true,
    showCable: true,
    tag: "поддержка быстрой зарядки",
    length: "1 метр",
    showBonuses: true,
  },
  {
    id: 2,
    title: "ЗАРЯДНЫЙ БЛОК",
    subtitle: "Разъём Type-C",
    power: 25,
    time: 45,
    showCharger: true,
    showCable: false,
    tag: "быстрая зарядка",
    length: null,
    showBonuses: false,
  },
  {
    id: 3,
    title: "КАБЕЛЬ",
    subtitle: "Type-C + Type-C",
    power: null,
    time: 35,
    showCharger: false,
    showCable: true,
    tag: "поддерживает быструю зарядку",
    length: "1 метр",
    showBonuses: true,
  },
  {
    id: 4,
    title: "КОМПЛЕКТ",
    subtitle: "Блок + кабель Type-C + Type-C",
    power: 45,
    time: 30,
    showCharger: true,
    showCable: true,
    tag: "поддержка быстрой зарядки",
    length: "1 метр",
    showBonuses: true,
  },
  {
    id: 5,
    title: "КОМПЛЕКТ",
    subtitle: "Блок + кабель Type-C + Type-C",
    power: 65,
    time: 20,
    showCharger: true,
    showCable: true,
    tag: "поддержка быстрой зарядки",
    length: "1 метр",
    showBonuses: true,
  },
  {
    id: 6,
    title: "ЗАРЯДНЫЙ БЛОК",
    subtitle: "Разъём Type-C",
    power: 45,
    time: 30,
    showCharger: true,
    showCable: false,
    tag: "быстрая зарядка",
    length: null,
    showBonuses: false,
  },
  {
    id: 7,
    title: "ЗАРЯДНЫЙ БЛОК",
    subtitle: "Разъём Type-C",
    power: 65,
    time: 20,
    showCharger: true,
    showCable: false,
    tag: "быстрая зарядка",
    length: null,
    showBonuses: false,
  },
];

function LightningBolt({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 14 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "inline-block" }}
    >
      <path
        d="M8 0L0 13H6L5 22L14 9H8L8 0Z"
        fill="#22c55e"
        style={{ filter: "drop-shadow(0 0 4px #22c55e)" }}
      />
    </svg>
  );
}

function ChargerSVG() {
  return (
    <svg
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <rect x="38" y="0" width="10" height="34" rx="5" fill="#c9ccd1" />
      <rect x="72" y="0" width="10" height="34" rx="5" fill="#c9ccd1" />
      <rect x="8" y="30" width="104" height="112" rx="30" fill="white" />
      <rect x="8" y="30" width="104" height="112" rx="30" fill="none" stroke="#e5e7eb" strokeWidth="2" />
      <ellipse cx="60" cy="144" rx="44" ry="9" fill="#f3f4f6" />
      <rect x="43" y="128" width="34" height="10" rx="5" fill="#d1d5db" />
      <ellipse cx="43" cy="58" rx="13" ry="22" fill="white" opacity="0.16" />
      <rect x="28" y="72" width="64" height="3" rx="1.5" fill="#22c55e" opacity="0" className="charger-glow-line" />
    </svg>
  );
}

function CableSVG({ dual }: { dual?: boolean }) {
  const cableHeight = dual ? 156 : 132;
  return (
    <svg
      viewBox={`0 0 140 ${dual ? 200 : 175}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <rect x="44" y="0" width="52" height="22" rx="8" fill="white" stroke="#e5e7eb" strokeWidth="2" />
      <rect x="52" y="5" width="36" height="12" rx="4" fill="#d1d5db" />
      <rect x="59" y="9" width="22" height="4" rx="2" fill="#b0b7c3" />

      {dual && (
        <>
          <rect x="44" y={cableHeight + 22} width="52" height="22" rx="8" fill="white" stroke="#e5e7eb" strokeWidth="2" />
          <rect x="52" y={cableHeight + 27} width="36" height="12" rx="4" fill="#d1d5db" />
          <rect x="59" y={cableHeight + 31} width="22" height="4" rx="2" fill="#b0b7c3" />
        </>
      )}

      <rect x="60" y="22" width="20" height={cableHeight} rx="10" fill="#e9eaec" />
      <rect x="63" y="22" width="5" height={cableHeight} rx="2.5" fill="#d4d6db" />
      <rect x="72" y="22" width="5" height={cableHeight} rx="2.5" fill="#d4d6db" />

      {/* flowing current */}
      <rect x="64" y="22" width="2.5" height="22" rx="1.25" fill="#22c55e" className="cable-current" style={{ filter: "drop-shadow(0 0 5px #22c55e)" }} />
      <rect x="73" y="22" width="2.5" height="22" rx="1.25" fill="#22c55e" className="cable-current-2" style={{ filter: "drop-shadow(0 0 5px #22c55e)" }} />

      {!dual && (
        <rect x="54" y={cableHeight + 22} width="32" height="8" rx="4" fill="#d1d5db" />
      )}
    </svg>
  );
}

function PowerCounter({ power, time }: { power: number | null; time: number }) {
  const [displayed, setDisplayed] = useState(power ?? 0);
  const prev = useRef(power);

  useEffect(() => {
    if (power === null) { setDisplayed(0); return; }
    const start = prev.current ?? power;
    prev.current = power;
    let step = 0;
    const steps = 18;
    const interval = setInterval(() => {
      step++;
      setDisplayed(Math.round(start + ((power - start) * step) / steps));
      if (step >= steps) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, [power]);

  return (
    <div className="flex flex-col items-start gap-3">
      {power !== null && (
        <div>
          <div className="flex items-end gap-1">
            <span
              className="font-black leading-none"
              style={{
                fontSize: "clamp(44px, 9vw, 80px)",
                color: "#22c55e",
                fontFamily: "'Montserrat', sans-serif",
                textShadow: "0 0 24px rgba(34,197,94,0.28)",
              }}
            >
              {displayed}
            </span>
            <span
              className="font-bold mb-2"
              style={{
                fontSize: "clamp(18px, 3.5vw, 28px)",
                color: "#374151",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              W
            </span>
          </div>
          <div
            style={{
              fontSize: "clamp(9px, 1.6vw, 13px)",
              color: "#9ca3af",
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            мощность
          </div>
        </div>
      )}

      <div
        className="rounded-2xl px-3 py-2"
        style={{ background: "#111827", minWidth: 90 }}
      >
        <div
          className="font-black"
          style={{
            fontSize: "clamp(20px, 4.5vw, 42px)",
            color: "#22c55e",
            fontFamily: "'Montserrat', sans-serif",
            textShadow: "0 0 14px rgba(34,197,94,0.5)",
            lineHeight: 1.1,
          }}
        >
          100%
        </div>
        <div
          style={{
            fontSize: "clamp(8px, 1.4vw, 11px)",
            color: "#9ca3af",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
          }}
        >
          за {time} минут
        </div>
      </div>
    </div>
  );
}

function BonusIcons() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div
          className="rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{
            width: 42,
            height: 42,
            background: "linear-gradient(135deg, #0077ff 0%, #ff3d8a 100%)",
          }}
        >
          <span style={{ fontSize: 20, color: "white", fontWeight: 900 }}>♫</span>
        </div>
        <div>
          <div style={{ fontSize: "clamp(8px, 1.4vw, 11px)", color: "#6b7280", fontFamily: "'Montserrat', sans-serif", lineHeight: 1.3 }}>
            Подписка<br />VK музыка
          </div>
          <div style={{ fontSize: "clamp(9px, 1.5vw, 12px)", color: "#111827", fontFamily: "'Montserrat', sans-serif", fontWeight: 900 }}>
            в подарок
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div
          className="rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ width: 42, height: 42, background: "#111827" }}
        >
          <span style={{ fontSize: 20, color: "#f5d000" }}>✦</span>
        </div>
        <div>
          <div style={{ fontSize: "clamp(8px, 1.4vw, 11px)", color: "#6b7280", fontFamily: "'Montserrat', sans-serif", lineHeight: 1.3 }}>
            Подписка<br />Я. музыка
          </div>
          <div style={{ fontSize: "clamp(9px, 1.5vw, 12px)", color: "#111827", fontFamily: "'Montserrat', sans-serif", fontWeight: 900 }}>
            в подарок
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const banner = BANNERS[activeIndex];

  const goTo = (i: number) => {
    if (i === activeIndex) return;
    setVisible(false);
    setTimeout(() => {
      setActiveIndex(i);
      setVisible(true);
    }, 200);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: "#f0f4f8", padding: "24px 16px", fontFamily: "'Montserrat', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');

        @keyframes lightning-pulse {
          0%, 100% { opacity: 1; filter: drop-shadow(0 0 4px #22c55e); }
          40% { opacity: 0.3; filter: drop-shadow(0 0 1px #22c55e); }
          60% { opacity: 1; filter: drop-shadow(0 0 8px #22c55e); }
        }
        @keyframes cable-flow {
          0% { transform: translateY(0px); opacity: 1; }
          100% { transform: translateY(150px); opacity: 0; }
        }
        @keyframes cable-flow-2 {
          0% { transform: translateY(0px); opacity: 0.7; }
          100% { transform: translateY(150px); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-9px); }
        }
        @keyframes banner-in {
          from { opacity: 0; transform: scale(0.97) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .lightning-bolt { animation: lightning-pulse 1.6s ease-in-out infinite; }
        .cable-current { animation: cable-flow 1.1s linear infinite; }
        .cable-current-2 { animation: cable-flow 1.1s linear infinite 0.55s; }
        .float-anim { animation: float 3.2s ease-in-out infinite; }
        .banner-visible { animation: banner-in 0.28s ease-out; }

        .tab-btn {
          border: 1.5px solid #e5e7eb;
          border-radius: 999px;
          padding: 5px 14px;
          font-size: 11px;
          font-weight: 700;
          font-family: 'Montserrat', sans-serif;
          cursor: pointer;
          transition: all 0.18s;
          background: white;
          color: #6b7280;
        }
        .tab-btn:hover { border-color: #22c55e; color: #22c55e; }
        .tab-btn.active { background: #22c55e; border-color: #22c55e; color: white; }
      `}</style>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center" style={{ maxWidth: 720 }}>
        {BANNERS.map((b, i) => (
          <button
            key={b.id}
            onClick={() => goTo(i)}
            className={`tab-btn${i === activeIndex ? " active" : ""}`}
          >
            {b.power ? `${b.power}W ` : ""}{b.title}
          </button>
        ))}
      </div>

      {/* Banner card */}
      <div
        className={visible ? "banner-visible" : ""}
        style={{
          width: "100%",
          maxWidth: 720,
          background: "white",
          borderRadius: 36,
          boxShadow: "0 2px 4px rgba(0,0,0,0.04), 0 24px 64px rgba(0,0,0,0.09)",
          padding: "clamp(22px, 5vw, 44px)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.2s ease",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle green glow top-right */}
        <div style={{
          position: "absolute",
          top: -60,
          right: -60,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Header row */}
        <div className="flex items-start justify-between mb-2">
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: "clamp(9px, 1.6vw, 12px)",
              color: "#9ca3af",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 2,
            }}>
              {banner.subtitle}
            </div>
            <div style={{
              fontSize: "clamp(26px, 6vw, 54px)",
              fontWeight: 900,
              color: "#111827",
              lineHeight: 1.0,
              letterSpacing: "-0.025em",
            }}>
              {banner.title}
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <LightningBolt className="lightning-bolt" />
              <span style={{
                fontSize: "clamp(8px, 1.4vw, 11px)",
                color: "#6b7280",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}>
                {banner.tag}
              </span>
              <LightningBolt className="lightning-bolt" />
            </div>
          </div>

          {/* Right top info */}
          <div className="flex flex-col items-end gap-2 ml-4">
            <div className="flex gap-1.5">
              <span style={{ fontSize: 18 }}>🍎</span>
              <span style={{ fontSize: 18 }}>🤖</span>
            </div>
            {banner.length && (
              <div
                className="flex items-center gap-1.5 rounded-xl px-3 py-1.5"
                style={{ background: "#111827" }}
              >
                <span style={{
                  fontSize: "clamp(13px, 2.8vw, 22px)",
                  fontWeight: 900,
                  color: "#22c55e",
                  fontFamily: "'Montserrat', sans-serif",
                  textShadow: "0 0 8px rgba(34,197,94,0.5)",
                }}>
                  {banner.length}
                </span>
                <span style={{ fontSize: "clamp(8px, 1.2vw, 10px)", color: "#9ca3af" }}>длина</span>
              </div>
            )}
            {!banner.showBonuses && (
              <div
                className="rounded-xl px-3 py-2 text-center"
                style={{ background: "#f9fafb", border: "1.5px solid #e5e7eb" }}
              >
                <div style={{ fontSize: "clamp(8px, 1.4vw, 11px)", color: "#9ca3af" }}>Разъём</div>
                <div style={{ fontSize: "clamp(11px, 2vw, 15px)", fontWeight: 900, color: "#22c55e" }}>type-c</div>
              </div>
            )}
          </div>
        </div>

        {/* Main content row */}
        <div className="flex items-center justify-between gap-4 mt-4">
          {/* Left: power */}
          <PowerCounter power={banner.power} time={banner.time} />

          {/* Center: product */}
          <div
            className="float-anim flex items-end justify-center gap-3 flex-1"
            style={{ height: "clamp(140px, 24vw, 210px)" }}
          >
            {banner.showCharger && (
              <div style={{
                height: "100%",
                width: "clamp(65px, 12vw, 115px)",
              }}>
                <ChargerSVG />
              </div>
            )}
            {banner.showCable && (
              <div style={{
                height: "100%",
                width: "clamp(55px, 10vw, 95px)",
              }}>
                <CableSVG dual={!!(banner.showCharger && banner.showCable)} />
              </div>
            )}
          </div>

          {/* Right: bonuses or empty */}
          <div className="flex flex-col items-end">
            {banner.showBonuses && <BonusIcons />}
          </div>
        </div>

        {/* Bottom accent */}
        <div style={{
          marginTop: 20,
          height: 4,
          borderRadius: 2,
          background: "linear-gradient(90deg, #22c55e 0%, #86efac 55%, transparent 100%)",
        }} />
      </div>

      {/* Dots */}
      <div className="flex gap-2 mt-5">
        {BANNERS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === activeIndex ? 26 : 8,
              height: 8,
              borderRadius: 4,
              background: i === activeIndex ? "#22c55e" : "#d1d5db",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s",
              padding: 0,
            }}
          />
        ))}
      </div>

      <div style={{ marginTop: 12, fontSize: 11, color: "#9ca3af" }}>
        {activeIndex + 1} / {BANNERS.length} — {banner.title}
      </div>
    </div>
  );
}
