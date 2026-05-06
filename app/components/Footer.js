"use client";
import { useState, useEffect } from "react";
import { useLang } from "./LanguageContext";

const C = {
  primary: "#4361EE",
  accent: "#6C8AFF",
  dark: "#1a1a2e",
};

function useMobile(bp = 768) {
  const [m, s] = useState(false);
  useEffect(() => {
    const c = () => s(window.innerWidth < bp);
    c();
    window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, [bp]);
  return m;
}

export default function Footer() {
  const m = useMobile();
  const [bh, sB] = useState(false);
  const { t } = useLang();
  const bg = "#1a1a2e";
  const brd = "rgba(255,255,255,0.08)";
  const dim = "rgba(255,255,255,0.45)";
  const bright = "rgba(255,255,255,0.85)";

  return (
    <>
      {/* CTA Banner */}
      <section style={{ background: C.primary, padding: m ? "40px 20px" : "60px 40px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: m ? "column" : "row", alignItems: m ? "flex-start" : "center", justifyContent: "space-between", gap: "24px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <span style={{ fontSize: "18px", display: "inline-flex" }}><svg width="1em" height="1em" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)" stroke="none"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg></span>
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>{t("cta_label")}</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: m ? "28px" : "clamp(28px, 5vw, 44px)", fontWeight: 700, color: "#fff", lineHeight: 1.15 }}>{t("cta_title")}</h2>
          </div>
          <a href="/inquiry" onMouseEnter={() => sB(true)} onMouseLeave={() => sB(false)} style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            padding: "14px 14px 14px 28px", borderRadius: "999px",
            border: "1.5px solid rgba(255,255,255,0.4)",
            background: bh ? "#fff" : "transparent", color: bh ? C.primary : "#fff",
            fontSize: "14px", fontWeight: 600, cursor: "pointer", transition: "all 0.35s", textDecoration: "none",
          }}>
            {t("cta_btn")}
            <span style={{ width: "36px", height: "36px", borderRadius: "50%", border: bh ? `1.5px solid ${C.primary}` : "1.5px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.35s" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
            </span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: bg, padding: m ? "40px 20px 0" : "64px 40px 0", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1.5fr 1fr 1fr 1.3fr", gap: m ? "32px" : "40px", paddingBottom: "40px", borderBottom: `1px solid ${brd}` }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <img src="/MES-Bear.png" alt="MES" style={{ width: "44px", height: "auto" }} />
                <div style={{ lineHeight: 1.15 }}>
                  <div style={{ fontWeight: 900, fontSize: "16px" }}>{t("school_name")}</div>
                  <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em", color: C.accent, textTransform: "uppercase" }}>{t("school_sub")}</div>
                </div>
              </div>
              <p style={{ fontSize: "13px", lineHeight: 1.7, color: dim, marginBottom: "20px", maxWidth: "280px" }}>{t("footer_desc")}</p>
              <div style={{ display: "flex", gap: "10px" }}>
                {[
                  <svg key="f" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>,
                  <svg key="t" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5 0-.28-.03-.56-.08-.83A7.72 7.72 0 0023 3z" /></svg>,
                  <svg key="i" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg>,
                ].map((ic, i) => (
                  <a key={i} href="#" style={{ width: "34px", height: "34px", borderRadius: "50%", border: `1px solid ${brd}`, display: "flex", alignItems: "center", justifyContent: "center", color: dim }}>{ic}</a>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px", paddingBottom: "10px", borderBottom: `1px solid ${brd}` }}>{t("footer_courses")}</h4>
              {["sub_general", "sub_business", "sub_kids", "sub_ielts", "sub_cambridge", "sub_eiken"].map(k => (
                <a key={k} href="#" style={{ display: "block", fontSize: "13px", color: dim, padding: "5px 0", textDecoration: "none" }}>{t(k)}</a>
              ))}
            </div>

            <div>
              <h4 style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px", paddingBottom: "10px", borderBottom: `1px solid ${brd}` }}>{t("footer_info")}</h4>
              {[
                { key: "footer_about", href: "/about" },
                { key: "footer_teachers", href: "/teachers" },
                { key: "footer_tuition", href: "/tuition" },
                { key: "footer_access", href: "/access" },
                { key: "footer_blog", href: "/blog" },
                { key: "footer_study", href: "/study-in-japan" },
              ].map(x => (
                <a key={x.key} href={x.href} style={{ display: "block", fontSize: "13px", color: dim, padding: "5px 0", textDecoration: "none" }}>{t(x.key)}</a>
              ))}
            </div>

            <div>
              <h4 style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px", paddingBottom: "10px", borderBottom: `1px solid ${brd}` }}>{t("footer_contact")}</h4>
              <div style={{ marginBottom: "14px" }}>
                <div style={{ fontSize: "10px", fontWeight: 600, color: dim, marginBottom: "3px" }}>{t("footer_call")}</div>
                <a href="tel:0643970170" style={{ fontSize: "14px", fontWeight: 600, color: bright, textDecoration: "none" }}>06-4397-0170</a>
              </div>
              <div style={{ marginBottom: "14px" }}>
                <div style={{ fontSize: "10px", fontWeight: 600, color: dim, marginBottom: "3px" }}>{t("hero_tennoji")}</div>
                <div style={{ fontSize: "12px", color: dim, lineHeight: 1.5 }}>{t("hero_tennoji_addr")}</div>
              </div>
              <div style={{ marginBottom: "14px" }}>
                <div style={{ fontSize: "10px", fontWeight: 600, color: dim, marginBottom: "3px" }}>{t("hero_furuichi")}</div>
                <div style={{ fontSize: "12px", color: dim, lineHeight: 1.5 }}>{t("hero_furuichi_addr")}</div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: m ? "flex-start" : "center", justifyContent: "space-between", flexDirection: m ? "column" : "row", padding: "20px 0", gap: "8px" }}>
            <span style={{ fontSize: "11px", color: dim }}>{t("footer_copyright")}</span>
            <span style={{ fontSize: "11px", color: dim }}>{t("footer_powered")}</span>
          </div>
        </div>
      </footer>
    </>
  );
}