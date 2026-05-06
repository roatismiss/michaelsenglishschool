"use client";
import { useState, useEffect } from "react";

const floatingChars = [
  { char: "ア", x: "10%", y: "15%", size: 28, delay: 0 },
  { char: "え", x: "85%", y: "20%", size: 22, delay: 0.3 },
  { char: "英", x: "20%", y: "70%", size: 34, delay: 0.6 },
  { char: "イ", x: "75%", y: "80%", size: 26, delay: 0.9 },
  { char: "語", x: "50%", y: "10%", size: 30, delay: 0.2 },
  { char: "か", x: "30%", y: "85%", size: 24, delay: 1.1 },
  { char: "学", x: "90%", y: "50%", size: 32, delay: 0.5 },
  { char: "ウ", x: "5%", y: "45%", size: 20, delay: 0.8 },
  { char: "校", x: "65%", y: "35%", size: 28, delay: 1.4 },
  { char: "お", x: "40%", y: "60%", size: 22, delay: 0.4 },
  { char: "本", x: "15%", y: "30%", size: 26, delay: 1.0 },
  { char: "き", x: "80%", y: "65%", size: 24, delay: 1.2 },
];

const wordPops = [
  { text: "Hello!", x: "15%", y: "25%", delay: 1.0, size: 16 },
  { text: "Let's Learn!", x: "70%", y: "30%", delay: 1.3, size: 14 },
  { text: "English", x: "25%", y: "75%", delay: 1.6, size: 18 },
  { text: "大阪", x: "80%", y: "70%", delay: 1.9, size: 16 },
];

export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("mes-loaded")) return;
    sessionStorage.setItem("mes-loaded", "1");
    setVisible(true);
    const fadeTimer = setTimeout(() => setFading(true), 2500);
    const hideTimer = setTimeout(() => setVisible(false), 3000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes lsGlowPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.12; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.2; }
        }
        @keyframes lsCharDrift {
          0% { transform: translateY(-20px); opacity: 0; }
          15% { opacity: 0.12; }
          85% { opacity: 0.12; }
          100% { transform: translateY(40px); opacity: 0; }
        }
        @keyframes lsLogoReveal {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes lsDrawPen {
          from { stroke-dashoffset: 200; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes lsFadeUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes lsWordPop {
          0% { transform: scale(0.5); opacity: 0; }
          30% { transform: scale(1.05); opacity: 0.35; }
          70% { transform: scale(1); opacity: 0.3; }
          100% { transform: scale(0.95); opacity: 0; }
        }
        @keyframes lsProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes lsFadeOut {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(1.02); }
        }
        @media (max-width: 768px) {
          .ls-char-hide { display: none !important; }
        }
      `}</style>

      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          background: "#1a1a2e",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          animation: fading ? "lsFadeOut 500ms ease-in-out forwards" : "none",
        }}
      >
        {/* ── Radial glow ── */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "min(600px, 90vw)",
            height: "min(600px, 90vw)",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(67,97,238,0.25) 0%, transparent 70%)",
            animation: "lsGlowPulse 3s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        {/* ── Floating Japanese characters ── */}
        {floatingChars.map((c, i) => (
          <span
            key={i}
            className={i % 2 === 1 ? "ls-char-hide" : undefined}
            style={{
              position: "absolute",
              left: c.x,
              top: c.y,
              fontSize: `${c.size}px`,
              fontFamily: "'Noto Sans JP', sans-serif",
              fontWeight: 700,
              color: "#6C8AFF",
              opacity: 0,
              animation: `lsCharDrift 3.5s linear ${c.delay}s infinite`,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {c.char}
          </span>
        ))}

        {/* ── English word pops ── */}
        {wordPops.map((w, i) => (
          <span
            key={`w${i}`}
            style={{
              position: "absolute",
              left: w.x,
              top: w.y,
              fontSize: `${w.size}px`,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              color: "#fff",
              opacity: 0,
              animation: `lsWordPop 1.2s ease-out ${w.delay}s forwards`,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {w.text}
          </span>
        ))}

        {/* ── Center content ── */}
        <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          {/* Logo circle with pen */}
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              border: "1px solid rgba(108,138,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 28px",
              opacity: 0,
              animation: "lsLogoReveal 600ms ease-out 300ms forwards",
              background: "rgba(67,97,238,0.06)",
            }}
          >
            {/* Pen SVG with draw-on animation */}
            <svg
              width="44"
              height="44"
              viewBox="0 0 48 48"
              fill="none"
              style={{ overflow: "visible" }}
            >
              {/* Pencil body */}
              <path
                d="M30 6L42 18L16 44H4V32L30 6Z"
                stroke="#4361EE"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="200"
                strokeDashoffset="200"
                style={{ animation: "lsDrawPen 800ms ease-in-out 400ms forwards" }}
              />
              {/* Pencil edit line */}
              <path
                d="M26 10L38 22"
                stroke="#6C8AFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="200"
                strokeDashoffset="200"
                style={{ animation: "lsDrawPen 800ms ease-in-out 600ms forwards" }}
              />
              {/* Writing line (the pen writing) */}
              <path
                d="M4 44H14"
                stroke="#4361EE"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="200"
                strokeDashoffset="200"
                style={{ animation: "lsDrawPen 800ms ease-in-out 800ms forwards" }}
              />
            </svg>
          </div>

          {/* Brand name */}
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "24px",
              fontWeight: 600,
              color: "#fff",
              letterSpacing: "0.02em",
              opacity: 0,
              animation: "lsFadeUp 600ms ease-out 800ms forwards",
            }}
          >
            Michael&apos;s English School
          </div>

          {/* Japanese subtitle */}
          <div
            style={{
              fontFamily: "'Noto Sans JP', sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              color: "#6C8AFF",
              marginTop: "10px",
              letterSpacing: "0.15em",
              opacity: 0,
              animation: "lsFadeUp 600ms ease-out 1000ms forwards",
            }}
          >
            マイケルズ イングリッシュ スクール
          </div>
        </div>

        {/* ── Progress bar ── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "2px",
            background: "linear-gradient(90deg, #4361EE, #6C8AFF)",
            animation: "lsProgress 2500ms linear forwards",
          }}
        />
      </div>
    </>
  );
}
