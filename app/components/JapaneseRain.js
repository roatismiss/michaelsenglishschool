"use client";
import { useEffect, useRef } from "react";

export default function JapaneseRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const katakana = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const hiragana = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";
    const kanji = "雨風雪花月火水木金土空海山川光闇夢愛命心魂力語英話学校先生友達本読書";
    const chars = katakana + hiragana + kanji;
    const fontSize = 16;

    let w, h, columns;
    let drops = [];
    let frame = 0;
    let animId;

    function init() {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      columns = Math.floor(w / fontSize);
      drops = [];
      frame = 0;

      for (let i = 0; i < columns; i++) {
        drops.push({
          y: Math.random() * -80,
          speed: 0.2 + Math.random() * 0.5,
          maxTrail: 6 + Math.floor(Math.random() * 18),
          delay: Math.random() * 120,
        });
      }
    }

    function draw() {
      ctx.fillStyle = "rgba(245, 246, 250, 0.07)";
      ctx.fillRect(0, 0, w, h);
      frame++;

      for (let i = 0; i < columns; i++) {
        const drop = drops[i];
        if (frame < drop.delay) continue;
        drop.y += drop.speed;

        const x = i * fontSize;
        const y = drop.y * fontSize;
        const char = chars[Math.floor(Math.random() * chars.length)];

        ctx.shadowBlur = 8;
        ctx.shadowColor = "#4466ee";
        ctx.font = `bold ${fontSize}px "MS Gothic", "Hiragino Kaku Gothic Pro", monospace`;
        ctx.fillStyle = "#2244cc";
        ctx.fillText(char, x, y);
        ctx.shadowBlur = 0;

        for (let j = 1; j < drop.maxTrail; j++) {
          const trailY = y - j * fontSize;
          if (trailY < 0) break;
          const fade = 1 - j / drop.maxTrail;
          const blue = Math.floor(180 + 60 * (1 - fade));
          const green = Math.floor(100 + 120 * (1 - fade));
          const red = Math.floor(60 + 160 * (1 - fade));

          ctx.font = `${fontSize}px "MS Gothic", "Hiragino Kaku Gothic Pro", monospace`;
          ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${fade * 0.7})`;

          if (Math.random() < 0.015) {
            ctx.shadowBlur = 4;
            ctx.shadowColor = "#6688ff";
          }
          ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, trailY);
          ctx.shadowBlur = 0;
        }

        if (y > h + drop.maxTrail * fontSize) {
          drop.y = Math.random() * -15;
          drop.speed = 0.2 + Math.random() * 0.5;
          drop.maxTrail = 6 + Math.floor(Math.random() * 18);
        }
      }

      animId = requestAnimationFrame(draw);
    }

    init();
    draw();

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <style>{`
        .jr-container {
          position: absolute;
          top: 0;
          right: 0;
          width: 55%;
          height: 52%;
          z-index: 1;
          pointer-events: none;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,1) 40%),
                              linear-gradient(to bottom, black 0%, black 70%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,1) 40%),
                      linear-gradient(to bottom, black 0%, black 70%, transparent 100%);
          -webkit-mask-composite: source-in;
          mask-composite: intersect;
        }
        @media (max-width: 768px) {
          .jr-container {
            width: 100% !important;
            height: 100% !important;
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 20%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.5) 80%, transparent 100%) !important;
            mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 20%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.5) 80%, transparent 100%) !important;
            -webkit-mask-composite: source-over !important;
            mask-composite: add !important;
          }
          .jr-container canvas {
            opacity: 0.08 !important;
          }
        }
      `}</style>
      <div className="jr-container">
        <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%", opacity: 0.12 }} />
      </div>
    </>
  );
}